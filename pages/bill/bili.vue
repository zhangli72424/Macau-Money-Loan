<template>
	<view class="app-bill">
			<view class="content">
				<view class="tab-navs">
					<scroll-view class="scroll-term_H" scroll-x="true"  :scroll-left="[index>3?(index-3)*140:0]">
						<block v-for="(item,ind) in tabObjectList" :key="ind">
							<view class="scroll-term-item_H" :class="index == ind ?'act':''" @tap="changItem(item,ind)">
								{{item[1]}}
							</view>
						</block>
					</scroll-view>
				</view>
				<template v-if="lists.length > 0">
					<view class="list" >
						<block v-for="(item,index) in lists" :key="index" v-if="lists.length">
							<view class="list-item">
								<view class="list-item-i">
									<view class="item-t">
										<!-- <image src="../../static/imgs/purse-top-logo.png" mode=""></image> -->
										<view class="item-h">
											<text>{{item.time}}</text>
											<text>{{item.typeStr}}</text>
										</view>
									</view>
								</view>
								<view class="list-item-i">
									<text>{{item.num}} </text>
									<!-- <text v-if="item.amount && !(incomeId==61 ||incomeId==62 || incomeId==64|| incomeId==71)">≈ {{item.amount}}</text> -->
								</view>
							</view>
						</block>
					</view>
				</template>
				<template v-else>
					<view class="no-data">
						{{i18n.nodata}}
					</view>
				</template>
			</view>
			
		<load v-if="showLoadings"></load>
	</view>
</template>

<script>
	import Load from "../../components/common/load.vue"
	import {fetch, showToast, pageback, pageto, forceUpdate, checkLogin} from '@/common/js/util.js'
	import {mapGetters} from 'vuex' 
	let timer;
	export default {
		computed:  {
			i18n() {
				return this.$t('message');
			},
			...mapGetters([
				'getRequestUrl',
				"getLoginInfo",
				'getTextArr',
				'getLangType',
				'getLang'
			])
		},
		data() {
			return {
				showLoadings:false,
				index: 0,
				tabObjectList: [],
				page:1,
				rows:10,
				incomeId:10,
				lists:[],
				isCheck:false,
				type:''
			}
		},
		onLoad(e){
			this.type = e.type;
			this.page = 1;
			this.lists =[];
			
			this.tabObjectList = Object.entries(JSON.parse(e.tab))
			// this.page = 1;
			// this.lists =[];
			
			if(this.type){
				this.incomeId = this.type
				this.tabObjectList.forEach((item,index)=>{
					if(item[0]==this.type){
						this.index = index
					}
				})
				this.getJhings()
				// this.index = 
			}else{
				this.incomeId = this.tabObjectList[0][0]
				this.getJhings()
			}
			// this.getThings(this.page,this.rows);
		},
		onShow(){
			if(this.getLangType=='chs'){
				uni.setNavigationBarTitle({
					title:'我的账单'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'My bill'
				})
			}
			forceUpdate(this.getLangType);
			// this.getList();
		},
		onPullDownRefresh() {
					//下拉刷新的时候请求一次数据
					// console.log('下拉了')
			this.page =1;
			this.lists =[]
			// if(this.incomeId=='13'){
				this.getJhings();
				// return false;
			// }
		    // this.getThings();
		},
		onReachBottom() {
			let _self = this
				//触底的时候请求数据，即为上拉加载更多
				//为了更加清楚的看到效果，添加了定时器
		    if (timer != null) {
		        clearTimeout(timer);
		    }
		    timer = setTimeout(function() {
				
					_self.getJhings();
					
		        // _self.getThings();
		    }, 1000);
					
					// 正常应为:
					// _self.getmorenews();
		},
		methods: {
			back() {
				pageback()
			},
			changItem(e,i){
				this.index = i;
				this.page=1;
				this.lists =[]
				this.incomeId = e[0];
				// if(this.incomeId=='13'){
				// 	this.getJhings(this.page,this.rows);
				// 	return false;
				// }
				this.getJhings(this.page,this.rows);
				// this.getThings(this.page,this.rows);
			},
			objectChange(e){
				// console.log(e.tab.indexA);
				this.page=1;
				this.lists =[]
				this.incomeId = e.tab.indexA;
				this.getThings(this.page,this.rows);
			},
			getJhings(page = 1, rows = this.rows){
				let url_ = "/api/User/detailed";
				let data_ ={
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					type: this.incomeId,
					rows,
					page:this.page
				}
				if(this.isCheck) return;
				this.isCheck=true;
				// uni.showLoading()
				this.showLoadings = true;
				fetch(url_,data_,'POST').then(res=>{
					// console.log(res)
					// uni.hideLoading()
					this.isCheck = false;
					this.showLoadings = false;
					// this.tabObjectList = Object.entries(res.data.data.type)
					// this.incomeId = this.tabObjectList[0][0]
					// console.log(res.data.data.data.data.length);
					// checkLogin(this.getLoginInfo,this.getRequestUrl);
					if(res.data.data.data.length ==0){
						
						uni.hideNavigationBarLoading();
						uni.showToast({
							title:this.i18n.nodata,
							icon:'none'
						})
						return;
					}
					if(res.data.code==1){
						if(this.page ==1){
							this.page ++;
							uni.stopPullDownRefresh();
							this.lists = res.data.data.data.data;
							this.lists.forEach((item,index)=>{
								// this.lists[index].num = parseFloat(item.num)
								// item.amount = parseFloat(item.amount)
								// this.lists[index].pcs = _self.i18n.BlockPackage
							})
						}else{
							this.page ++;
							let lists = res.data.data.data.data;
							lists.forEach((item,index)=>{
								// lists[index].num = parseFloat(item.num)
								// item.amount = parseFloat(item.amount)
								// lists[index].pcs = _self.i18n.BlockPackage
							})
							// this.day_sum = res.data.data.day_sum+"";
							this.lists = this.lists.concat(lists)
							// console.log(this.lists)
						}
					}else{
						uni.showToast(res.data.msg)
					}
				}).catch(err=>{
					this.isCheck = false;
					// uni.hideLoading()
					this.showLoadings = false;
					uni.showToast(this.i18n.request_fail)
				})
			},
			getThings(page = 1, rows = this.rows){
				let url_ = "/api/User/detailed";
				let data_ ={
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					type: this.incomeId,
					rows,
					page:this.page
				}
				if(this.isCheck) return;
				this.isCheck=true;
				// uni.showLoading()
				this.showLoadings = true;
				fetch(url_,data_,'POST').then(res=>{
					// console.log(res)
					// uni.hideLoading()
					this.isCheck = false;
					this.showLoadings = false;
					// this.tabObjectList = Object.entries(res.data.data.type)
					// this.incomeId = this.tabObjectList[0][0]
					// console.log(res.data.data.data.data.length);
					// checkLogin(this.getLoginInfo,this.getRequestUrl);
					if(res.data.data.data.data.length ==0){
						// showToast(this.i18n.nodata)
						
						uni.hideNavigationBarLoading();
						uni.showToast({
							title:this.i18n.nodata,
							icon:'none'
						})
						return;
					}
					
					if(res.data.code==1){
						if(this.page ==1){
							this.page ++; 
							uni.stopPullDownRefresh();
							this.lists = res.data.data.data.data;
							console.log(res);
							this.lists.forEach((item,index)=>{
								this.lists[index].num = item.num
								// this.lists[index].pcs = _self.i18n.BlockPackage
							})
						}else{
							this.page ++;
							let lists = res.data.data.data.data;
							lists.forEach((item,index)=>{
								lists[index].num = item.num
								// lists[index].pcs = _self.i18n.BlockPackage
							})
							// this.day_sum = res.data.data.day_sum+"";
							this.lists = this.lists.concat(lists)
							// console.log(this.lists)
						}
					}else{
						uni.showToast(res.data.msg)
					}
				}).catch(err=>{
					this.isCheck = false;
					// uni.hideLoading()
					this.showLoadings = false;
					uni.showToast(this.i18n.request_fail)
				})
			}
		},
		components: {
			Load
		}
	}
</script>

<style lang="scss">
	@import  '@/common/scss/variable.scss';
	@import  '@/common/scss/global.scss';
	.no-data{
		margin-top: 130upx;
		text-align: center ;
		font-size: 26rpx;
		color: #AAAFBD;
		image{
			margin: 0 auto;
			width: 620upx;
			height: 620upx;
			flex-shrink: 0;
		}
	}
	.app-bill {
		.content {
			.tab-navs{
				display: flex;
				border-bottom:2upx solid $split-line-color1;
				font-size: 16px;
				padding-left: 5upx;
				// justify-content: space-between;
				
				.scroll-term-item_H {
					display: inline-block;
					box-sizing: border-box;
					margin-right: 30upx;
					padding:0 5upx;
					color: $white;
					&.act{
						color: $theme-color;
						// border-bottom:6upx solid $theme-color;
						position: relative;
						&::after{
							content: '';
							width: 80upx;
							height: 6upx;
							background-color: $theme-color;
							position: absolute;
							left: 50%;
							bottom:0;
							transform: translate(-50%,0);
						}
					}
				}
				.scroll-term_H {
					white-space: nowrap;
					width: 100%;
					box-sizing: border-box;
					.fund-term-item-title{
						color: #FFFFFF;
						font-size: 26upx;
						font-weight: bold;
						margin-bottom: 34upx;
					}
					text{
						display: block;
						color: #FFFFFF;
						font-size:22upx;
					}
				}
				
				
				view{
					flex:1;
					text-align: center;
					line-height: 84upx;
					font-size: 12px;
					&.act{
						color: $theme-color;
						// border-bottom:6upx solid $theme-color;
						position: relative;
						&::after{
							content: '';
							width: 150upx;
							height: 6upx;
							background-color: $theme-color;
							position: absolute;
							left: 50%;
							bottom:0;
							transform: translate(-50%,0);
						}
					}
				}
			}
			.list{
				margin: 40upx 30upx 0;
				
				.list-item{
					background-color: #3d3b3b;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 130upx;
					margin-bottom: 20upx;
					border-radius: 10upx;
					padding: 20upx;
					// border-bottom:2upx solid #2B2860;
					&:last-child{
						border-bottom:none;
					}
					.list-item-i{
						flex: 1;
						&:last-child{
							text-align: right;
						}
						text{
							display: block;
							font-size: 14px;
							color: $white;
						}
						.item-t{
							overflow: hidden;
							display: flex;
							align-items: center;
							image{
								width: 48upx;
								height: 48upx;
								margin-right: 30upx;
							}
							.item-h{
								text{
									display: block;
									font-size: 12px;
									color: #A6A7AB;
									margin-bottom: 16upx;
									&:last-child{
										font-size: 14px;
										color: $theme-color;
										font-weight: bold;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
