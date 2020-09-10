<template>
	<view class="content">
		<uni-nav-bar
		statusBar="true"
		:fixed="true" 
		:border="false" 
		backgroundColor="#0f0c39">
			<view class="nav-bar-title _flex _flex_align_items_center _flex_justify_content">
				<view></view>
				<view></view>
					<view class="right _flex _flex_align_items_center" @tap.stop="toLogin">
						<text>{{usernames}}</text>
						<image src="../../static/image/img.png" mode=""></image>
					</view>
			</view>
		</uni-nav-bar>
		
		<view class="index-content _padding_30">
			
			<bw-swiper :swiperList="bannerList" @clickItem="clickItem" :autoplay="true"></bw-swiper>
			
			<view class="bulletin">
				<image src="../../static/image/notice.png"></image>
				<swiper circular="true" vertical="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item, index) in news" :key="index">
						<view class="swiper-item" @tap.stop="jumDetail(index)">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="Mining-pool">
				<view class="Mining-pool-title">
					{{i18n.pool_data}}
				</view>
				<view class="Mining-pool-content  animated bounceInUp fast">
					
					<view class="Mining-pool-item-top _flex _flex_align_items_center _flex_justify_content">
						<view class="items">
							<text>{{i18n.pool_power}}(EH/S)</text>
							<view class="">{{shopList.user_maket}}</view>
						</view>
						<view class="items">
							<text>{{i18n.daily_earnings}}</text>
							<view class="red">
								{{shopList.day_shouyi}}
							</view>
						</view>
					</view>
					
					<view class="Mining-pool-item-bottom _flex _flex_align_items_center _flex_justify_content">
						<view class="items  _flex _flex_align_items_center">
							{{i18n.network_computing_power}}<text>{{shopList.quanwang}} EH/S</text>
						</view>
						<view class="items  _flex _flex_align_items_center">
							{{i18n.Current_difficulty}}<text>{{shopList.nandu}} T</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="index-market">
				
				<view class="index-market-title">
					{{i18n.quotes}}
				</view>
				
				<block v-for="(item,index) in list" :key="index">
					<market-list :item="item" :index="index"></market-list>
				</block>
			</view>
		</view>
		<load v-if="isLoading"></load>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import marketList from '@/components/common/market-list.vue';
	import Load from '@/components/common/load.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
	export default {
		data() {
			return {
				isLoading:false,
				bannerList:[],
				news:[],
				list:[],
				current: 0,
				swiperCurrent: 0,
				noLogin:true,
				username:'',
				shopList:{}
			}
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getTextArr'
			]),
			usernames(){
				if(this.getLoginInfo.token){
					this.noLogin = false
					// this.username = this.getLoginInfo.username
					return this.getLoginInfo.username;
				}else{
					this.noLogin = true
					return this.i18n.no_login
				}
			}
		},
		components:{
			uniNavBar,Load,marketList,bwSwiper
		},
		onShow() {
			console.log(this.getLoginInfo);
			forceUpdate(this.getLangType);
			_updataTabBar(this.getTextArr,this.getLangType);
			if(this.getLoginInfo.token){
				this.noLogin = false
				this.username = this.getLoginInfo.username
			}
			this.getLun();
			this.getMarket();
			this.getNotice();
			this.getShopList();
		},
		methods: {
			...mapMutations([
				'setBulletin'
			]),
			jumDetail(e){
				this.setBulletin(this.news[e]);
				uni.navigateTo({
					url:'/pages/new/detail'
				})
			},
			getShopList(){
					type: 2
				}
				 fetch('/api/Game/shop_list',data,'post')
					.then(res=>{
						if(res.data.code){
							this.shopList = res.data.msg;
						}
					})
					.catch(err=>{
						
					})
			},
			getNotice(){
				this.showLoad = true;
				fetch('/api/User/notice', {}, "post", '/pages/index/index').then(res=>{
					this.showLoad = false;
					if(res.data.code){
						res.data.data.forEach(item => {
							item.time = diff_txt(item.time, this.i18n.today, this.i18n.yesterday, this.i18n.b_yesterday);
						})
						this.news = res.data.data;
						this.news.forEach(item=>{
							item.content = item.content
							  .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
							  .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
							  .replace(/<p>/ig, '<p class="p_class">')
							  .replace(/\<img/gi, '<img style="max-width:98%;height:auto" ')
							
						})
						
						
					}
				}).catch(err=>{ 
					this.showLoad = false;
				})
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			clickItem(){
				uni.navigateTo({
					url:'/pages/new/new'
				})
			},
			toLogin(){
				if(this.noLogin ){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}else{
					uni.switchTab({
						url:'/pages/mine/mine'
					})
				}
				
			},
			getLun(){
				this.showLoad = true;
				fetch('/api/user/lun', {}, "post").then(res=>{
					this.showLoad = false;
					if(res.data.code){
						this.bannerList = res.data.data
						this.bannerList.forEach((item,index)=>{
							this.bannerList[index].img = this.getRequestUrl+'/uploads/'+item.img
						})
					}
				}).catch(err=>{ 
					this.showLoad = false;
				})
			},
			getMarket(){
				this.showLoad = true;
				fetch('/api/wallet/getCoinMarket', {}, "post").then(res=>{
					this.showLoad = false;
					if(res.data.code){
						this.list = res.data.data;
						this.list.forEach((item,index)=>{
							this.list[index].title_en = item.coin;
							this.list[index].balance = item.last;
							this.list[index].usd_price = item.last;
							this.list[index].zdfisshow = true;
							if(item.percentChange>=0){
								this.list[index].zdf = item.percentChange + '%';
								this.list[index].type = true
							}else{
								this.list[index].zdf = -(item.percentChange) + '%';
								this.list[index].type = false
							}
						})
					}
				}).catch(err=>{
					this.showLoad = false;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.nav-bar-title{
			padding-left:30upx;
			.right{
				color: #FFFFFF;
				image{
					width: 80upx;
					height: 80upx;
					flex-shrink: 0;
				}
			}
		}
		.index-content{
			.bulletin {
				z-index: 10;
				height: 58upx;
				padding: 21upx 0;
				line-height: 58upx;
				display: flex;
				overflow: hidden;
				margin-bottom: 40upx;
				background-color: #1B164C;
				border-bottom-left-radius: 20upx;
				border-bottom-right-radius: 20upx;
				image {
					width: 146upx;
					height: 34upx;
					margin: 22upx 22upx 22upx 28upx;
				}
				swiper {
					height: 74upx;
					flex: 1;
					overflow: hidden;
					display: flex;
					align-items: center;
					text-overflow: ellipsis;
					white-space: nowrap;
					.swiper-item {
						font-size: 24upx;
						height: 74upx;
						line-height: 74upx;
					}
				}
			}
			.Mining-pool{
				.Mining-pool-title{
					font-size: 34upx;
					font-weight: bold;
					color: #e9e9f4;
					padding-bottom: 30upx;
				}
				.Mining-pool-content{
					background-color: #1d184f;
					border-radius: 20upx;
					.Mining-pool-item-top{
						padding: 38upx 32upx 40upx;
						border-bottom: 1upx solid #2B2860;
						.items{
							text{
								color: #464788;
								font-size: 25upx;
							}
							view{
								color: #5631FD;
								font-weight: bold;
								font-size: 45upx;
								margin-top: 20upx;
								&.red{
									color: #F12323;
								}
							}
						}
					}
					.Mining-pool-item-bottom{
						padding: 38upx 30upx;
						position: relative;
						&::after{
							content: "";
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							top: 0;
							width: 1upx;
							height: 100%;
							background-color: #2B2860;
						}
						.items{
							color: #464788;
							font-size: 25upx;
							text{
								color: #E9E9F4;
								margin-left: 15upx;
							}
						}
					}
				}
			}
			.index-market{
				padding-top: 40upx;
				// border-top: 2upx #2b2860 solid;
				.index-market-title{
					font-size: 34upx;
					font-weight: bold;
					color: #e9e9f4;
					padding-bottom: 30upx;
				}
			}
		}
	}
</style>
