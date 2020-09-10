<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<uni-status-bar bgcolor="transparent"></uni-status-bar>
		<!-- #endif -->
		<!-- <view class="index-top-bg">
			<image src="../../static/image/index-top-bg.png" mode="widthFix" lazy-load></image>
		</view> -->
		
		
		
		<bw-swiper :swiperList="bannerList" :autoplay="true"></bw-swiper>
		<view class="bulletin">
			<view class="bulletin-img">
				<image src="../../static/image/bulletin-img.png" mode="widthFix" lazy-load></image>
			</view>
			<swiper circular="true" vertical="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item, index) in news" :key="index">
					<view class="swiper-item" @tap.stop="jumDetail(item)">
						<view class="swiper-item-c">
							{{item.title}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
<!-- 		<view class="index-nav-content">
			<view class="index-nav-l">
				<image src="../../static/image/app03.png" mode="widthFix" @tap.stop="buy" lazy-load></image>
			</view>
			<view class="index-nav-r">
				<image src="../../static/image/app04.png" @tap.stop="imgJump('/pages/balance-withdrawal/balance-withdrawal')" mode="widthFix" lazy-load></image>
				<image src="../../static/image/app05.png" @tap.stop="imgJump('/pages/invite/advertising')" mode="widthFix" lazy-load></image>
			</view>
		</view> -->
		
		
		
		
		<view class="nav-list">
			
			<block v-for="(item,index) in navList" :key="index">
				<view class="nav-list-item" @tap.stop="imgJump(item.url)">
					<image :src="item.img" mode="widthFix" lazy-load></image>
					<view>{{item.title}}</view>
				</view>
			</block>
			
		</view>
		
		
		
		
		
		<view class="index-banners">
			<view class="index-banners-t">
				<image src="../../static/image/index-b-t-01.png" mode="widthFix" lazy-load></image>
			</view>
			<view class="index-banners-c" @tap.stop="buy" style="background-image: url(../../static/image/index00.png);">
				<!-- <view class="index-banners-c-l">
					<text>{{curInfo.title}}</text>
					<view class="index-banners-c-l-c">
						<view>{{curInfo.freeze}} STD</view>
						<text>随时提现 不设期限</text>
					</view>
				</view>
				<view class="index-banners-c-r" hover-class="active" @tap.stop="buy">
					立即入金
				</view> -->
			</view>
		</view>
		
		
		<view class="index-banners no-tips"> 
			<view class="index-banners-t">
				<image src="../../static/image/index-b-t-02.png" mode="widthFix" lazy-load></image>
			</view>
		</view>
		
		<view class="aboute">
			<block v-for="(item,index) in imgList" :key="index">
				<view class="img-list" @tap.stop="imgJump(item.url)">
					<image :src="item.img" mode="widthFix" lazy-load></image>
				</view>
			</block>
		</view>
		<load v-if="isLoading"></load>
		<view class="popule-mask anima fadeIn fast" v-if="showpopule" @tap.stop="cancle">
			<view class="popule-content" @tap.stop="''">
				<view class="popule-content-title">
					<view>{{curInfo.title}}</view>
					<text>售价：{{curInfo.freeze}}</text>
				</view>
				<view class="popule-content-li">
					<text>实际支付价格</text>
					<view class="popule-content-li-n">{{curInfo.freeze*num}} {{std_info.title_en}}</view>
				</view>
				<view class="popule-content-li">
					<text>选择购买份数</text>
					<view class="popule-content-li-num">
						<button type="default" 
						:disabled="num==1"
						hover-class="active"
						 @tap.stop="lower">-</button>
						<input type="text" placeholder="请输入数量" v-model="num">
						<button type="default" hover-class="active" @tap.stop="add">+</button>
					</view>
				</view>
				<view class="popule-content-li">
					<text>STD可用余额:</text>
					<view class="popule-content-li-n">{{std_info.balance}}</view>
				</view>
				
				<view class="popule-content-btn">
					<button type="default" hover-class="active" @tap.stop="cancle">取消</button>
					<button type="default" hover-class="active" @tap.stop="confrim">下单</button>
				</view>
			</view>
		</view>
		<load v-if="showloadings"/>
		<pay-pwd
		:maxlength="6" 
		:isPwd="true" 
		:isSHow="showpwd" 
		:isShows="isshows"
		:isShowss="showss"
		@close="close"
		@input-again="inputAgain"
		@finish="finish"></pay-pwd>
		<message
		:shows="showMesss" 
		:message="meg"
		@jump="closeMess"
		@close="closeMess"></message>
	</view>
</template>

<script>
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import Load from '@/components/common/load.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
	import Message from '@/components/common/message.vue';
	export default {
		data() {
			return {
				showMesss:false,
				meg:'',
				showpwd:false,
				showss:false,
				isshows:false,
				laoding:false,
				showloadings:false,
				showpopule:false,
				isLoading:false,
				imgList:[],
				news:[],
				bannerList:[],
				num:1,
				curInfo:{},
				navList:[],
				usdt_info:{},
				std_info:{},
				isok:false,
				nopaypwd:false
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
				'getTextArr',
				'getPlan'
			])
		},
		components:{
			uniStatusBar,Load,bwSwiper,payPwd,Message
		},
		onShow() {
			this.showMesss = false;
			this.isok = false;
			this.nopaypwd = false
			this.showpopule = false;
			this.getCheckB();
			uni.showTabBar({
				success: (res) => {
					
				}
			})
			this.navList = [
				{
					img:'../../static/image/nav01.png',
					title:'充值USDT',
					url:'/pages/assets/recharge'
				},
				{
					img:'../../static/image/nav02.png',
					title:'USDT提现',
					url:'/pages/assets/coin'
				},
				{
					img:'../../static/image/nav03.png',
					title:'USDT闪兑',
					url:'/pages/assets/flash-payment'
				},
				{
					img:'../../static/image/nav04.png',
					title:'邀请好友',
					url:'/pages/invite/advertising'
				},
			]
			this.imgList = [
				{
					img:'../../static/image/index01.png',
					// url:'/pages/index/pool'
					url:'/pages/developing/developing'
				},
				{
					img:'../../static/image/index02.png',
					// url:'/pages/investment/investment'
					url:'/pages/developing/developing'
				},
				{
					img:'../../static/image/index03.png',
					// url:'/pages/investment/investment'
					url:'/pages/developing/developing'
				}
			]

			forceUpdate(this.getLangType);
			_updataTabBar(this.getTextArr,this.getLangType);
			this.getNotice();
			this.getLun();
			this.getShopList();
			this.getWallet();
		},
		methods: {
			...mapMutations([
				'setPlan'
			]),
			getCheckB(){
				let _url = '/api/Wallet/check_b';
				fetch(_url,{},'POST').then(res=>{
					
				})
			},
			closeMess(){
				if(this.nopaypwd){
					this.showMsg=false;
					this.dataMsg=''
					this.showpopule = false;
					uni.navigateTo({
						url:'/pages/modify-pwd/modify-pwd'
					})
					return
				}
				console.log(this.isok);
				if(this.isok){
					// setTimeout(()=>{
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },500)
					uni.showTabBar({
						success: (res) => {
							
						}
					})
					this.showpopule = false
					this.showMesss = false;
					return
				}
				this.showMesss = !this.showMesss
			},
			close(val){
				uni.showTabBar({
					success: (res) => {
						
					}
				})
				if(val==1){
					this.isshows = false;
					this.showss = false;
					this.showpwd = false;
				}else{
					this.isshows = val;
					this.showpwd = val;
					this.showss = val
				}
			},
			inputAgain(val){
				this.isshows = false;
				this.showpwd = true;
			},
			finish(val){
				let _data_ = {
					shopid:this.curInfo.id,
					num:this.num,
					paypwd:val
				}
				fetch('/api/Shop/buy_shop',_data_,'post')
					.then(res=>{
						this.showLoadings = false;
						this.showMesss = true;
						this.meg = res.data.msg
						if(res.data.code==1){
							this.isok  = true;
							return
						}
						this.isok  = false;
						uni.showTabBar({
							success: (res) => {
								
							}
						})
					})
					.catch(err=>{
						this.isok  = false;
						this.showLoadings = false;
					})
			},
			getWallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							
							let list = res.data.data.list
							let li = list.filter(item=>{
								return item.title_en=='USDT'
							})
							let std = list.filter(item=>{
								return item.title_en=='STD'
							})
							this.usdt_info = li[0]
							this.std_info = std[0]
						}
					})
			},
			getShopList(){
				this.showloadings=true
				fetch('/api/Shop/shop_list',{},'post')
					.then(res=>{
						this.showloadings = false;
						if(res.data.code==1){
							this.curInfo = res.data.data[0]
							this.setPlan(JSON.stringify(this.curInfo))
						}
					})
					.catch(err=>{
						this.showloadings = false;
					})
			},
			confrim(){
				this.showpopule = false
				console.log(this.getLoginInfo.paypwd);
				if(!this.getLoginInfo.paypwd){
					this.showMesss = true;
					this.meg = this.getLangType=='en'?'Please set transaction password':'请设置交易密码'
					this.nopaypwd = true;
					return
				}
				if(parseFloat(this.curInfo.freeze*this.num)>this.std_info.balance){
					showToast(this.getLangType=='en'?'Not enough available balance':'可用余额不足')
					return
				}
				this.showpwd = true;
				// uni.navigateTo({
				// 	url:`/pages/top-up/top-up?num=${this.num}`
				// })
			},
			lower(){
				if(this.num>1){
					this.num--;
					return
				}
				this.num=1
			},
			add(){
				this.num++
			},
			cancle(){
				if(this.showpopule==false){
					this.showpopule = true
					uni.hideTabBar({
						success: (res) => {
							
						}
					})
				}else{
					this.showpopule=false
					uni.showTabBar({
						success: (res) => {
							
						}
					})
				}
			},
			buy(){
				this.cancle()
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
			...mapMutations(['setBulletin']),
			imgJump(val){
				if(val=='/pages/assets/recharge'){
					uni.navigateTo({
						url:`/pages/assets/recharge?item=${JSON.stringify(this.usdt_info)}`
					})
					return
				}
				if(val=='/pages/assets/coin'){
					uni.navigateTo({
						url:`/pages/assets/coin?item=${JSON.stringify(this.usdt_info)}`
					})
					return
				}
				uni.navigateTo({
					url:val
				})
			},
			jumDetail(e){
				this.setBulletin(e);
				uni.navigateTo({
					url:'/pages/new/detail'
				})
			},
			getNotice(){
				fetch('/api/User/notice',{},'post')
					.then(res=>{
						if(res.data.code){
							this.news = res.data.data
							// this.info = res.data.data
							
							this.news.forEach(item=>{
								item.content = item.content
								  .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
								  .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
								  .replace(/<p>/ig, '<p class="p_class">')
								  .replace(/\<img/gi, '<img style="max-width:98%;height:auto" ')
								
							})
						}
					})
					.catch(err=>{
						
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/scss/variable.scss';
	
	.popule-mask{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.3);
		z-index: 9;
		.popule-content{
			background-color: $theme-dark-color;
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 10;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			padding: 60rpx;
			.popule-content-title{
				border-bottom: 1rpx solid #929191;
				padding-bottom: 38rpx;
				view{
					font-size: 36rpx;
					margin-bottom: 25rpx;
				}
				text{
					font-size: 26rpx;
				}
			}
			.popule-content-li{
				padding-top: 50rpx;
				text{
					color: #929191;
					font-size: 26rpx;
				}
				.popule-content-li-n{
					font-size: 46rpx;
					margin-top: 28rpx;
				}
				.popule-content-li-num{
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 475rpx;
					border-radius: 8rpx;
					border: 1rpx solid #929191;
					button{
						width: 80rpx;
						line-height: 80rpx;
						height: 80rpx;
						text-align: center;
						color: #929191;
						background: transparent;
						border-radius: 0;
						&:first-of-type{
							border-right: 1rpx solid #929191;
						}
						&:last-of-type{
							border-left: 1rpx solid #929191;
						}
						&.active{
							border: none;
							color: $white;
							background: $trans-color;
						}
						&::after{
							display: none;
						}
					}
					input{
						text-align: center;
						flex: 1;
					}
				}
				
			}
			.popule-content-btn{
				padding-top: 77rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				button{
					border-radius: 8rpx;
					width: 240rpx;
					font-size: 34rpx;
					&:first-of-type{
						background-color: #929191;
						color: #E9E9F4;
					}
					&:last-of-type{
						background: linear-gradient(to left, #d4ae6d, #fedf9d);;
						color: $white;
					}
					&.active{
						opacity: .95;
						transform: scale(.95);
					}
					&::after{
						display: none;
					}
				}
			}
		}
	}
	.content {
		.bulletin {
			z-index: 10;
			height: 58upx;
			// padding: 21upx 0;
			line-height: 58upx;
			display: flex;
			overflow: hidden;
			margin: 10px 25upx;
			padding-left: 30upx;
			.bulletin-img{
				width: 34upx;
				margin-right: 12upx;
				image{
					width: 34upx;
					height: 34upx;
					flex-shrink: 0;
				}
			}
			swiper {
				// height: 74upx;
				flex: 1;
				.swiper-item {
					font-size: 30upx;
					line-height: 34upx;
					color: #FEFEFE;
					view{
						line-height: 50upx;
					}
				}
			} 
		}
		.index-top-bg{
			width: 750upx;
			height: 350upx;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
			image{
				width: 750upx;
				height: 350upx;
				flex-shrink: 0;
			}
		}
		.nav-list{
			display: flex;
			align-items: center;
			margin: 60rpx 0 68rpx;
			.nav-list-item{
				flex: 1;
				text-align: center;
				image{
					width: 86rpx;
					height: 97rpx;
					flex-shrink: 0;
				}
				view{
					color: #E1C782;
					font-size: 26rpx;
				}
			}
		}
		.index-banners{
			margin: 60rpx 30rpx 0;
			// border-top: 1upx solid #3C393A;
			&.no-tips{
				border-top: none;
			}
			.index-banners-t{
				width: 195rpx;
				height: 46rpx;
				margin: 46rpx auto 33rpx;
				image{
					width: 195rpx;
					height: 46rpx;
					flex-shrink: 0;
				}
			}
			.index-banners-c{
				background-size: 100%;
				background-position: left top;
				background-repeat: no-repeat;
				width: 630rpx;
				height: 300rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				.index-banners-c-l{
					text{
						color: #a5a5a5;
						font-size: 30rpx;
					}
					.index-banners-c-l-c{
						view{
							color: $theme-color;
							font-size: 64rpx;
						}
						text{
							color: $theme-color;
							font-size: 26rpx;
						}
					}
				}
				.index-banners-c-r{
					width: 100rpx;
					height: 126rpx;
					font-size: 40rpx;
					color: #3c393a;
					border-radius: 20rpx;
					text-align: center;
					line-height: 60rpx;
					padding: 0 40rpx;
					background: $trans-color;
					&.active{
						background:$theme-color;
					}
				}
			}
		}
		.aboute{
			margin: 26upx 30upx;
			.img-list{
				margin-top: 25upx;
				image{
					width: 690upx;
					height: 00upx;
					flex-shrink: 0;
				}
			}
		}
		.index-nav-content{
			display: flex;
			// align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.index-nav-l{
				image{
					width: 342rpx;
					height: 338rpx;
					flex-shrink: 0;
				}
			}
			.index-nav-r{
				text-align: right;
				image{
					width: 330rpx;
					height: 160rpx;
					flex-shrink: 0;
					&:first-of-type{
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
</style>
