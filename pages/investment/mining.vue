<template>
	<view class="app-ecology">

			<!-- <uni-nav-bar-new 
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
			</uni-nav-bar-new> -->
		<view class="content">
			<block v-for="(item,index) in list" :key="index">
				<view class="list">
					<image class="list-bg" :src="'../../static/image/ming'+(item.shop_id-1)+'.png'" mode="widthFix" lazy-load></image>
					<view class="list-title">
						<view :style="{'color':item.shop_id==1?'#0063FF':item.shop_id==2?'#21A8F6':item.shop_id==3?'#0DC9FF':'#3F4EAE'}">{{item.title}}</view>
						<text>购买日期:{{item.time}}</text>
					</view>
					<view class="list-li">
						<view class="list-li-item">
							<view :style="{'color':item.shop_id==1?'#FF4539':item.shop_id==2?'#FEA23F':item.shop_id==3?'#FCD45F':'#E67B2D'}">{{item.all_cz}}</view>
							<text>总产值</text>
						</view>
						<view class="list-li-item">
							<view :style="{'color':item.shop_id==1?'#FF4539':item.shop_id==2?'#FEA23F':item.shop_id==3?'#FCD45F':'#E67B2D'}">{{item.ycb_num}}</view>
							<text>已产币</text>
						</view>
						<view class="list-li-item">
							<view :style="{'color':item.shop_id==1?'#FF4539':item.shop_id==2?'#FEA23F':item.shop_id==3?'#FCD45F':'#E67B2D'}">{{item.all_day}}</view>
							<text>剩余天数</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="nodata" v-if="list.length == 0">
			<image src="../../static/image/nodata.png" mode="widthFix" lazy-load></image>
		</view>
		
	</view>
</template>

<script>
	import {showToast,pageto,fetch,pageback,forceUpdate} from "../../common/js/util.js";
	import {mapGetters} from "vuex";
	import Mima from '../../components/wakary-input/wakary-input.vue';
	import uniNavBarNew from '@/components/common/uni-nav-bar-new.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	var _self;	
	export default {
		data() {
			return {
				list: [],
				background:{
					background:"#ffffff"
				}
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
							console.log(JSON.stringify(this.list));
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
		}
	}
</script>

<style lang="scss">
.nav-title{
	width: 100%;
	padding: 0 30rpx;
	.nav-title-box{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.Allet{
			font-size: 40rpx;
			color: #FFFFFF;
		}
		.mi{
			font-size: 26rpx;
			color: #EEA935;
			display: flex;
			align-items: center;
			image{
				width: 14rpx;
				height: 24rpx;
				magrin-left:10rpx;
			}
		}
	}
		
}
.app-ecology {
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
		padding: 20upx 30upx;
		.list{
			border-radius: 20upx;
			position: relative;
			padding-bottom: 80upx;
			.list-bg{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
				width: 100%;
				height: 100%;
			}
			.list-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 88upx;
				padding: 0 30upx;
				view{
					font-size: 40upx;
				}
				text{
					font-size: 24upx;
					color: #58627D;
				}
			}
			.list-li{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 60upx;
				.list-li-item{
					flex: 1;
					text-align: center;
					view{
						font-size: 40upx;
					}
					text{
						font-size: 24upx;
						color: #727C97;
					}
				}
			}
		}
	}
}
</style>
