<template>
	<view class="app-ecology">
		<!-- #ifdef APP-PLUS -->
			<uni-status-bar bgcolor="#1b2640"></uni-status-bar>
		<!-- #endif -->
			<uni-nav-bar-new 
			leftIcon="fanhui" 
			title="我的节点" 
			rightTxt="收益记录" 
			bgColor="#1b2640"
			color="#ffffff"
			rightColor="#0063FF"
			@tapNavRight="pages"
			@tapNavLeft="clickClose" >
				<view class="" slot="left" @tap.stop="clickClose">
					<i class="iconfont icon  iconfanhui"></i>
				</view>
			</uni-nav-bar-new>
		<view class="content">
			
		<!-- 	<view class="content-title" v-if="!is_sf">
				<view class="">
					{{i18n.Available_today}}
				</view>
				<text>{{klq}}</text>
			</view> -->
			
			
			
			
			<block v-for="(item, index) in list" :key="index" v-if="list.length > 0">
				<view class="list" :class="{'nomal': item.day ==0}">
					<view class="list-title">{{item.title}}</view>
					<view class="li o1"  :key="index" :class="{gray: item.day ==0}" >
						<view class="left">
							<!-- <view class="percent-top">{{item.day / item.all_day * 100}}%</view> -->
							<view class="circle-progress">
								<view class="ring-wrapper">
									<!-- <ring-countdown :canvasId="index" :day="item.day" :all_day="item.all_day"></ring-countdown> -->
									<canvas :canvas-id="'canvasArcbar'+index" id="'canvasArcbar'+index" class="charts3"></canvas>
								</view>
							</view>
							<view class="data">购买日期: {{item.time}}</view>
						</view>
						<view class="right">
							<view class="progress progress1">
								<view class="long"><view class="short"></view></view>
								<text>总产值 ({{item.all_cz}})</text>
							</view>
		<!-- 					<view class="progress progress2">
								<view class="long"><view class="short"></view></view>
								<text>算力值 ({{item.sl}})</text>
							</view> -->
							<view class="progress progress3">
								<!-- <view class="long"><view class="short"></view></view> -->
							<!-- 	<text>{{i18n.Nissan}} ({{item.day_cb}})</text> -->
							</view>
							<view class="progress progress4">
								<view class="long"><view class="short"></view></view>
								<text>已产币 ({{item.ycb_num}})</text>
							</view>
						</view>
					<!-- 	<view class="order">
							<text class="grade">{{item.title}} <text class="inner-grade">级</text></text>
							<text class="line"></text>
							<text class="inner-order">0{{index+1}}</text>
						</view> -->
					</view>
				</view>
			</block>
			
			
		</view>
		<view class="nodata" v-if="list.length == 0">
			<image src="../../static/image/nodata.png" mode="widthFix" lazy-load></image>
		</view>
		
		
	<!-- 	<view class="daily_release" :class="{'actives':is_sf}" @tap.stop="dailyRelease" hover-class="active">
			{{is_sf?i18n.Received:i18n.Daily_release}}
		</view> -->
		
	</view>
</template>

<script>
	import {showToast,pageto,fetch,pageback,forceUpdate} from "../../common/js/util.js";
	import {mapGetters} from "vuex";
	import Mima from '../../components/wakary-input/wakary-input.vue';
	import uCharts from '../../common/js/u-charts.js';
	import uniNavBarNew from '@/components/common/uni-nav-bar-new.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	var _self;	
	export default {
		data() {
			return {
				list: [],
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				textarea:'',
				is_sf:'',
				klq:'',
				tabInfo:''
			}
		},
		computed: {
			i18n () {
				return this.$t('message')
			},
			...mapGetters([
				'getLoginInfo',
				"getTextArr",
				'getLangType',
				'getRequestUrl'
			])
		},
		onLoad () {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if( res.pixelRatio > 1 ){
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth3=uni.upx2px(230);
			this.cHeight3=uni.upx2px(230);
			this.arcbarWidth=uni.upx2px(8);
			// this.getServerData();
		},
		onShow() {
			forceUpdate(this.getLangType);
			this._getList();
			this.getType();
		},
		methods:{
			getType(){
				fetch('/api/index/index','','post')
					.then(res=>{
						this.tabInfo = res.data.data.zd_type;
					})
					.catch(err=>{
						console.log(err.data.msg);
					})
			},
			dailyRelease(){
				if(this.is_sf){
					showToast(this.i18n.Released_today)
					return
				}
				fetch('/api/shop/spoc_js','','post')
					.then(res=>{
						showToast(res.data.msg)
						// if(res.data.code){
							this._getList();
						// }
					})
					.catch(err=>{
						console.log(err.data.msg);
					})
			},
			showArcbar3(canvasId, chartData){
				new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: false,
					title: {
						name: chartData.series[0].day?chartData.series[0].day:'0',
						color: '#ffffff',
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#a4a4a4',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle: 1.5//整圆类型只需配置起始角度即可
						}
					},
					background: '#434343',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio/1.5,
					height: _self.cHeight3*_self.pixelRatio/1.5,
					dataLabel: true,
				});
			},
			/////////////////////////////////
			/////////////////////////////////
			clickClose() {
				pageback()
			},
			pages(){
				pageto(`/pages/bill/bili?tab=${JSON.stringify(this.tabInfo)}&type=61`)
			},
			getTo(e){
				pageto(`/pages/${e}/${e}`);
			},
			_updataTabBar() {
				_updataTabBar(this.getTextArr, this.getLangType);
			},
			_getList() {
				fetch('/api/shop/spoc_buylist', {}, "post")
					.then(res => {
						if (res.data.code == 1) {
							this.list = res.data.data
							this.list.forEach(item => {
								// item.all_cz = parseFloat(item.all_cz) || parseFloat(item.all_cz) + ' ';
								// item.slk = parseFloat(item.slk) || parseFloat(item.slk) + ' ';
								// item.day_cb = parseFloat(item.day_cb) || parseFloat(item.day_cb) + ' ';
								// item.ycb_num = parseFloat(item.ycb_num) || parseFloat(item.ycb_num) + ' ';
							})
						} else {
							showToast(res.data.msg)
						}
					})
					.catch(err => {
						showToast(this.i18n.request_fail)
					})
			},
			getmima(e) {
				console.log(e)
				this.mima = e;
			}
		},
		components: { 
			Mima,uniNavBarNew,uniStatusBar
		},
		watch: {
			list(newArr) {
				newArr.forEach((item, index) => {
					let Arcbar3 = {
						series: [
							{
								color: "#de3f24",
								data: item.day / item.all_day || 0,
								index: 0,
								legendShape: "circle",
								name:this.i18n.day,
								pointShape: "circle",
								show: true,
								type: "arcbar",
								_proportion_: 0.19999829999999985,
								width: '2',
								day: item.day
							}
						]
					}
					_self.showArcbar3('canvasArcbar'+index, Arcbar3);
				})
			}
		}
	}
</script>

<style lang="scss">
.app-ecology {
	.daily_release{
		width: 150upx;
		height: 150upx;
		border-radius: 75upx;
		position: fixed;
		z-index: 99;
		right: 50upx;
		bottom: 50upx;
		background: linear-gradient(135deg, #be12ed, #632dfb);
		font-size: 32upx;
		font-weight: bold;
		line-height: 150upx;
		border: 4upx solid #4b47fe;
		box-shadow: rgba(255, 255, 255, 0.3) 4upx 4upx 20upx;
		&.actives{
			background: #8884B7;
			color: #0F0C39;
			border:none;
		}
		text-align: center;
		&.active{
			background: #8884B7;
			color: #0F0C39;
		}
	}
	.current-title {
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.nodata{
		margin-top: 130upx;
		text-align: center ;
		image{
			margin: 0 auto;
			width: 620upx;
			height: 620upx;
			flex-shrink: 0;
		}
	}
	.content {
		padding: 20upx 30upx 0;
		border-radius: 10upx;
		.content-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 30upx;
			line-height: 40upx;
			background-color: #1e1652;
			color: #FFFFFF;
			margin-bottom: 20upx;
			view{
				font-size: 26upx;
			}
			text{
				font-size: 36upx;
				font-weight: bold;
			}
		}
		.list{
			background-color: #1b2640;
			padding: 20upx 0 0;
			&.nomal{
				background-color:#222222;
				.list-title{
					background:#444444;
				}
			}
			.list-title{
				background: linear-gradient(top, #f86b4d, #de3f24);
				border-top-right-radius: 12upx;
				border-bottom-right-radius: 12upx;
				line-height: 60upx;
				font-size: 24upx;
				font-weight: bold;
				padding: 0 30upx;
				text-align: center;
				width: 150upx;
			}
			.li {
				padding: 24upx 30upx;
				display: flex;
				justify-content: space-between;
				position: relative;
				margin-bottom: 30upx;
				// .order {
				// 	position: absolute;
				// 	right: 20upx;
				// 	top: 0;
				// 	width: 70upx;
				// 	color: #FFFFFF;
				// 	text-align: center;
				// 	background: linear-gradient(top, #562FE8, #7965E0);
				// 	border-bottom-left-radius: 8upx;
				// 	border-bottom-right-radius: 8upx;
				// 	display: flex;
				// 	flex-direction: column;
				// 	padding-top: 14upx;
				// 	padding-bottom: 10upx;
				// 	.grade {
				// 		font-size: 20px;
				// 		padding-bottom: 12upx;
				// 		.inner-grade {
				// 			font-size: 14px;
				// 		}
				// 	}
				// 	.line {
				// 		margin: 0 10upx;
				// 		border-bottom: 1upx dashed rgba(255, 255, 255, .5);
				// 	}
				// 	.inner-order {
				// 		font-size: 11px;
				// 		margin-top: 6upx;
				// 	}
				// }
				&.full {
					width: 690upx;
				}
				.left {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.percent-top {
						color: #0063FF;
						font-size: 14px;
						margin-bottom: 16upx;
					}
					.circle-progress {
						width: 216upx;
						min-height: 164upx;
						position: relative;
						.outer {
							position: absolute;
							left: 0;
							top: 0;
							width: 216upx;
							height: 164upx;
						}
						.inner {
							position: absolute;
							width: 120upx;
							height: 120upx;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
						.ring-wrapper {
							position: absolute;
							left: 0;
							top: 0;
							width: 260upx;
						}
					}
					.data {
						color: #939393;
						margin-top: 22upx;
						font-size: 11px;
					}
				}
				.right {
					margin-right: 80upx;
					flex: 1;
					margin-left: 40upx;
					.progress {
						margin-top: 20upx;
						.long {
							background-color: #363434;
							height: 8px;
							width: 100%;
						}
						.short {
							background-color: #0063FF;
							height: 8px;
							width: 8px;
						}
						text {
							color: #FFFFFF;
							margin-top: 8upx;
							font-size: 13px;
						}
					}
				}
				&.gray {
					.order {
						background: #666666;
					}
					.percent-top {
						color: #666666;
					}
					.short {
						background-color: #666666;
					}
				}
			}
		}
	}
}
</style>
