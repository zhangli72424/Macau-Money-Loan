<template>
	<view class="content">
		<image src="../../static/image/exchange-bg.png" mode="widthFix" lazy-load class="exchange-bg"></image>
		<view class="container">
			<block v-for="(item,index) in list" :key="index">
				<view class="list" @tap.stop="jumpDetail(item)">
					<view class="list-title">
						<view class="list-title-item-l">
							{{item.title}} 
							<text :class="{'nomar':( parseFloat(item.stock)==0) || parseFloat(item.djs)=='-1' || (parseFloat(item.djs)>0 && parseFloat(infoDjs)>0)}">{{item.djs=='-1'?'暂未开启':item.djs=='0'?(parseFloat(item.stock)==0)?'已售罄':'限时活动':(parseFloat(infoDjs)>0?'倒计时中':'限时活动')}}</text>
						</view>
						<view class="list-title-item-r" v-if="item.djs>0 && infoDjs>0">
							<!-- 倒计时  {{item.time?item.time:'00:00:00'}} -->
							<!-- this.infoDjs -->
							倒计时  {{item.djs>0?sysj:'00:00:00'}}
						</view>
					</view>
					<view class="list-content">
						<view class="list-content-l">
							<view class="_h2">
								{{item.price | formatParsefloat}}
							</view>
							<text class="list-content-t">售价(USDT)</text>
							<view class="list-content-l-b">
								<text>限额 {{item.freeze | formatParsefloat}} EKA</text><text>剩余 {{item.stock | formatParsefloat}} EKA</text>
							</view>
						</view>
						<view class="list-content-r">
							
							<view class="round-txt">
								<text>已兑换</text>
								<view>{{(item.bili*100 | formatParsefloat)+'%'}}</view>
							</view>
							<view class="box">
								<view class="bg1"></view>
								<view class="bg2"></view>
								<view class="pr1" 
								:style="{transform:'rotate('+((item.bili>0.5?'0':((item.bili-1)*180))+'deg)')}"
								></view>
								<view class="pr2"
								:style="{transform:'rotate('+((item.bili>0.5?((item.bili-1.5)*360):'-180')+'deg)'),background:(item.bili>0.5?'#0063ff':'#dbe3fc')}"
								></view>
								<view class="box-content"></view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex';
	let timer;
	export default {
		components:{
			uniStatusBar
		},
		computed:{
			formatParsefloat(val){
				if ((!val && val != 0) || val == null || val == undefined || val == 'undefined') {
					return 0
				}
				return parseFloat(val)
			},
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
		},
		data() {
			return {
				list:'',
				db_balance:'',
				usdt_balance:'',
				sysj:'',
				infoDjs:''
			};
		},
		onUnload() {
			console.log(timer,'unload');
			if (timer != null) {
				clearInterval(timer);
				timer = '';
				console.log(timer,'unload');
			}
			
		},
		onHide(){
			console.log(timer,'hide');
			if (timer != null) {
				clearInterval(timer);
				timer = '';
				console.log(timer,'hide');
			}
		},
		onShow(){
			// #ifdef APP-PLUS
			forceUpdate(this.getLangType)
			// #endif
			this.getList();
			timer = setInterval(()=>{
				if(this.infoDjs>0){
				this.Countdown()
				}else{
					this.sysj = '00:00:00'
					clearInterval(timer);
					timer = '';
				}
			},1000)
			_updataTabBar(this.getTextArr,this.getLangType);
		},
		methods:{
			jumpDetail(val){
				if(parseFloat(val.stock) == 0 ){
					showToast('已售罄')
					return
				}
				if( val.djs=='-1'){
					showToast('暂未开启')
					return
				}
				// if(val.djs >0 && this.infoDjs>0){
				// 	showToast('倒计时中')
				// 	return
				// }
				if((parseFloat(val.stock) > 0 && parseFloat(val.djs)=='0' )|| (parseFloat(val.stock) > 0 && this.infoDjs=='0')){
					pageto(`/pages/exchang/details?info=${JSON.stringify(val)}&db_balance=${this.db_balance}&usdt_balance=${this.usdt_balance}`)
				}
			},
			getList(){
				fetch('/api/Shop/shop_list',{},'post')
					.then(res=>{
						if(res.data.code){
							this.db_balance = res.data.data.db_balance
							this.usdt_balance = res.data.data.usdt_balance
							this.list = res.data.data.shop_list
							console.log(this.infoDjs);
							this.list.forEach((item,index)=>{
							if(item.djs>0){
								this.infoDjs = item.djs
							}
							this.list[index].bili = parseInt((item.all_cz-item.stock)/item.all_cz*10000)/10000
							})
						}
					})
					.catch(err=>{
						
					})
			},
			Countdown(){
				// this.infoDjs = 30
				let times = parseInt(this.infoDjs)
				let  hours = parseInt(times / 3600)
				let mine = parseInt(((times / 3600)-hours)*60)
				let min = times - hours*3600-mine*60
				let h = (hours < 10 ? '0'+hours : hours)+ ':';
				let m = (mine < 10 ? '0'+mine : mine) + ':';
				let s = (min < 10 ? '0'+min : min);
				this.sysj = h+m+s
				this.infoDjs --
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 40upx 30upx 20upx;
		.exchange-bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 750upx;
			z-index: -1;
			height: 380upx;
			flex-shrink: 0;
		}
		.container{
			padding: 100upx 0 0;
			.list{
				background: linear-gradient( to right, #262B39 ,#414757);
				border-radius: 20upx;
				margin-bottom: 30upx;
				.list-title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					line-height: 82upx;
					border-bottom: 1upx solid #60687B;
					padding: 0 30upx;
					view{
						flex: 1;
						text{
							background: linear-gradient( to right, #f934c9 ,#fca862);
							border-top-left-radius: 14upx;
							border-top-right-radius: 14upx;
							border-bottom-right-radius: 14upx;
							padding: 6upx 8upx;
							color: #191448;
							margin-left: 18upx;
							font-size: 20upx;
							&.nomar{
								background:#58627D;
								color: #ffffff;
							}
						}
						&.list-title-item-r{
							text-align: right;
							color: #F93737;
						}
					}
				}
				.list-content{
					padding: 28upx 60upx 40upx 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.list-content-l{
						// width: 330upx;
						._h2{
							font-size: 64upx;
							font-weight: bold;
							background-image: linear-gradient(to right,#F95034,#FCA862);
							-webkit-background-clip:text;
							color: transparent;
						}
						.list-content-t{
							color:#58627D;
							font-size: 24upx;
							padding:  22upx 0 42upx;
							display: block;
						}
						.list-content-l-b{
							text{
								font-size: 26upx;
								padding:  0 15upx 0 0;
								margin-right: 15upx;
								display: block;
							}
						}
					}
					.list-content-r{
						position: relative;
						// flex: 1;
						width: 190upx;
						height: 190upx;
						border-radius: 95upx;
						overflow: hidden;
						margin-left: 40upx;
						.round-txt{
							position: absolute;
							top: 50%;
							left: 0;
							width: 190upx;
							text-align: center;
							transform: translateY(-50%);
							z-index: 10;
							text{
								color: #98A6C2;
								font-size: 27upx;
							}
							view{
								font-size: 48upx;
								font-weight: bold;
							}
						}
						.bg1{
						  position: absolute;
						  width: 95upx;
						  height: 190upx;
						  border-radius: 190upx 0 0 190upx;
						  z-index: 3;
						  left: 0;
						  top: 0;
						  background: #dbe3fc;
						  // transform: translateY(-50%);
						}
						.bg2{
						  left: 95upx;
						  position: absolute;
						  width: 95upx;
						  height: 190upx;
						  border-radius: 0 190upx 190upx 0;
						  z-index: 1;
						  top: 0;
						  background: #dbe3fc;
						  // transform: translateY(-50%);
						}
						.box-content {
						  top: 9upx;
						  left: 8upx;
						  width: 174upx;
						  height: 174upx;
						  border-radius: 50%;
						  position: absolute;
						  background:#383d4d;
						  z-index: 5;
						  // transform: translateY(-50%);
						}
						.pr1 {
						  position: absolute;
						  left: 95upx;
						  width: 95upx;
						  height: 190upx;
						  border-radius: 0px 190upx 190upx 0px;
						  z-index: 4;
						  top: 0;
						  background: #0063FF;
						  // transform: rotate(-108deg);
						  // animation: pr1A 5s infinite linear forwards;
						  transform-origin: 0px 95upx;
						}
						.pr2 {
							position: absolute;
							left: 95upx;
							width: 95upx;
							height: 190upx;
							border-radius: 0px 190upx 190upx 0px;
							z-index: 4;
							top: 0;
							// transform: rotate(-240deg);
							// animation: pr2A 5s infinite linear forwards;
							// background: #ff0;
							transform-origin: 0px 95upx;
						}
					}
				}
			}
		}
	}
</style>
