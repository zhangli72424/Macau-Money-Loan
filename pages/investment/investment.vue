<template>
	<view class="content">
	<!-- #ifdef APP-PLUS -->
		<uni-status-bar bgcolor="#1b2640"></uni-status-bar>
	<!-- #endif -->
		<uni-nav-bar-new 
		leftIcon="fanhui" 
		title="EKN节点" 
		rightTxt="我的节点" 
		bgColor="#1b2640"
		color="#ffffff"
		rightColor="#0063FF"
		@tapNavLeft="back" 
		@tapNavRight="pages">
			<view class="" slot="left" @tap.stop="back">
				<i class="iconfont icon  iconfanhui"></i>
			</view>
		</uni-nav-bar-new>
		<view class="container">
			
			
			<block v-for="(item,index) in list" :key="index">
				<view class="list">
					<image :src="'../../static/image/invite0'+(index+1)+'.png'"></image>
					<view class="list-title">
						<view class="list-title-i">{{item.title}}</view>
						
						<view class="list-title-t" :style="{'color':index==0?'#196CDA':index==1?'#7A5BC7':index==2?'#E14429':'#FF5060'}">
							有效天数:{{item.day_yx | formatParsefloat}}
						</view>
						
						
				<!-- 		<text>算力值</text>
						<text>低风险</text>
						<text>稳定增长</text> -->
					</view>
					<view class="list-content">
						<view class="list-content-l">
							
							<view class="list-content-l-items">
								需要:{{item.freeze | formatParsefloat}} USDT+{{item.slk | formatParsefloat}}EKA
							</view>
							<view class="list-content-l-items-t">
								(≈{{item.ekn_need | formatParsefloat}} EKN+{{item.slk | formatParsefloat}}EKA)
							</view>
							<!-- <view class="list-content-l-items">
								日产币:{{item.day_cb | formatParsefloat}} EKN
							</view> -->
							<!-- <view class="list-content-l-items">
								有效天数:{{item.day_yx | formatParsefloat}}
							</view> -->
							<!-- <view>5.4%~6.5%</view>
							<text>收益率</text> -->
						</view>
						<view class="list-content-r">
							<button hover-class="active" :style="{'color':index==0?'#196CDA':index==1?'#7A5BC7':index==2?'#E14429':'#FF5060'}" @tap.stop="toInvestment(item)">成为节点</button>
						</view>
					</view>
				</view>
			</block>
			
		
		</view>

	<view class="popule" v-if="showpopule" :class="{'animated bounceInUp ':showpopule}" @tap.stop="showpopule=!showpopule;num=1">
		<view class="popule-content" @tap.stop="''">
			<view class="popule-list">
				<view>{{balace_info.title}}</view>
				<text>{{i18n.Price}}：{{balace_info.ekn_need | formatParsefloat}} EKN + {{balace_info.slk | formatParsefloat}} EKA</text>
			</view>
			
			<view class="popule-list-info">
				<!-- <view></view> -->
				<!-- <text>算力值 13676.21 CPD</text> -->
				<view>矿机总产值 <text>{{balace_info.all_cz | formatParsefloat}}</text> U</view>
		<!-- 		<view>日产币 <text>{{balace_info.day_cb | formatParsefloat}}</text> EKN</view> -->
				<view>产币天数 <text>{{balace_info.day_yx | formatParsefloat}}</text> 天</view>
				<view>剩余可购买数量 <text>{{balace_info.user_xz | formatParsefloat}}</text> </view>
			</view>
			
			
			<view class="popule-list-real">
				<text>{{i18n.Actual_price_paid}}</text>
				<view>{{remaleNum}}</view>
			</view>
			<view class="popule-num-content">
				<text>{{i18n.Purchase_quantity}}（T）</text>
				<view class="popule-num">
					<button type="default" @tap.stop="less" hover-class="active">-</button>
					<input type="number" v-model="num">
					<button type="default" @tap.stop="add" hover-class="active">+</button>
				</view>
			</view>
	<!-- 		<view class="popule-list-real">
				<text>{{i18n.total}}</text>
				<view>{{num*info.price}} CPD</view>
			</view> -->
			<view class="popule-meg">
				<text>{{i18n.Account_Balance}}：</text>
				<view >{{balace_info.ekn_balance | formatParsefloat}} EKN + {{balace_info.eka_balance | formatParsefloat}} EKA</view>
			</view>
			<view class="popule-nav">
				<view>
					<button type="default" hover-class="active" @tap.stop="showpopule=!showpopule;num=1">{{i18n.cancel}}</button>
				</view>
				<view>
					<button type="default" hover-class="active" :loading="loadings" @tap.stop="comfirm">{{i18n.Place_an_order}}</button>
				</view>
			</view>
		</view>
	</view>
		<view class="bottom-btn">
			<button type="default" hover-class="active" @tap.stop="pages">我的节点</button>
		</view>

		<pay-pwd 
		:maxlength="6" 
		:isPwd="true" 
		:isSHow="shows" 
		:isShows="isshows"
		:isShowss="showss"
		@close="close"
		@input-again="inputAgain"
		@finish="finish"></pay-pwd>
		<message
		:shows="showMess" 
		:message="i18n.no_paypwd_mes"
		@jump="toModifypwd"
		@close="closeMess"></message>
		<view class="show-mes-popule" v-if="showPo" @tap.stop="showPo=!showPo" :class="{'animated bounceInUp fast':showPo}">
			<view class="show-mes-popule-content" @tap.stop="''">
				<view class="show-mes-popule-con">
					<view class="show-mes-popule-close" @tap.stop="showPo=!showPo">
						<i class="icon iconfont icon-cha"></i>
					</view>
					<view class="show-mes-popule-con-title">
						提示
					</view>
					<view class="show-mes-popule-con-c">
						{{showMesg}}
					</view>
					<view class="show-mes-popule-button">
						<button type="default" hover-class="active" @tap.stop="showPo=!showPo">取消</button>
						<button type="default" hover-class="active" @tap.stop="pagebacks">前往C2C</button>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	import Load from '@/components/common/load.vue';
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import Message from '@/components/common/message.vue';
	import uniNavBarNew from '@/components/common/uni-nav-bar-new.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import validator from '@/common/js/validator.js';
	export default{
		components:{
			Load,uniNavBarNew,uniStatusBar,payPwd,Message
		},
		data() {
			return {
				showMess:false,
				list:[],
				showpopule:false,
				num:1,
				shows:false,
				isshows:false,
				showss:false,
				info:'',
				normal:'',
				balace_info:'',
				loadings:false,
				showMesg:'',
				showPo:false
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				console.log('我点击了按钮');
			}
		},
		computed:{
			remaleNum(){
				return this.num?(this.num*this.balace_info.ekn_need+' EKN +'+ this.num*this.balace_info.slk+'EKA'):'0';
			},
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo'
			]),
		},
		onShow(){
			this.showMess = false;
			forceUpdate(this.getLangType);
			this.getSpoc();
		},
		methods:{
			pagebacks(){
				uni.switchTab({
					url:'/pages/market/market'
				})
			},
			toModifypwd(){
				uni.navigateTo({
					url:'/pages/modify-pwd/modify-pwd'
				})
			},
			closeMess(){this.showMess = !this.showMess;this.showpopule=!this.showpopule;this.loadings = false;},
			toInvestment(val){
				this.balace_info = val;
				this.showpopule = !this.showpopule
			},
			getSpoc(){
				fetch('/api/Shop/spockj_list','','post')
					.then(res=>{
						if(res.data.code){
							this.list = res.data.data
						}
					})
					.catch(err=>{
						console.log(err.data.msg);
					})
			},
			pages(){
				console.log('my Finanving');
				uni.navigateTo({
					url:'/pages/investment/mining'
				})
				
			},
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			close(val){
				if(val==1){
					this.shows = false;
					this.showss = false;
					this.showpwd = false;
					this.loadings = false;
				}else{
					this.shows = val;
					this.showpwd = val;
					this.showss = val
				}
			},
			inputAgain(val){
				this.shows = false;
				this.showpwd = true;
				this.loadings = false;
			},
			less(){
				if(this.num>1){
					this.num--;
					return
				}
				this.num=1
			},
			add(){
				this.num++
			},
			comfirm(){
				if(!this.getLoginInfo.paypwd){
					this.showMess = !this.showMess
					return
				}
				// console.log(validator.posPattern(this.num));
				
				if(this.num==0 || !this.num){
					showToast(this.i18n.computing_power_tip04)
					return;
				}
				let mstacs = /^\d+$/
				if(!mstacs.test(this.num)){
					showToast(this.i18n.p_enter_zh)
					return
				}
				if(this.balace_info.ekn_need*(parseFloat(this.num))>parseFloat(this.balace_info.ekn_balance) && this.balace_info.slk*(parseFloat(this.num))<parseFloat(this.balace_info.eka_balance)){
					this.showMesg = this.getLangType=='chs'?'EKN余额不足请立即前往C2C':'If the EKN balance is insufficient, please go to C2C immediately';
					this.showpopule=false
					this.loadings = false
					this.showPo = true
					return
				}
				if(this.balace_info.slk*(parseFloat(this.num))>parseFloat(this.balace_info.eka_balance) && this.balace_info.ekn_need*(parseFloat(this.num))<parseFloat(this.balace_info.ekn_balance)){
					this.showMesg = this.getLangType=='chs'?'EKA余额不足请立即前往C2C':'If EKA balance is insufficient, please go to C2C immediately';
					this.showpopule=false
					this.loadings = false
					this.showPo = true
					return
				}
				
				if(this.balace_info.slk*(parseFloat(this.num))>parseFloat(this.balace_info.eka_balance) && this.balace_info.ekn_need*(parseFloat(this.num))>parseFloat(this.balace_info.ekn_balance)){
					this.showMesg = this.getLangType=='chs'?'EKA,EKN余额都不足请立即前往C2C':'EKA, EKN balance are insufficient, please go to C2C immediately';
					this.showpopule=false
					this.loadings = false
					this.showPo = true
					return
				}
				
				// if(!this.yzm){
				// 	showToast(this.i18n.enter_vcode)
				// 	return;
				// }
				if(this.shows) return;
				// console.log(this.shows);
				this.showpopule=!this.showpopule
				this.loadings = true;
				this.shows  = true;
				this.isCheck = false;
			},
			finish(val){
				this.loadings = false;
				let data = {
					shopid:this.balace_info.id,
					num:this.num,
					paypwd:val,
					// yzm:this.yzm,
					token_id:11
				}
				this.laoding = true;
				if(this.isCheck) return;
				this.isCheck = true;
				fetch('/api/shop/spoc_buy',data,'POST')
					.then(res=>{
						this.isCheck = false;
						this.laoding = false;
						showToast(res.data.msg)
						if(res.data.code){
							this.getSpoc();
							// this.showpopule=!this.showpopule
							this.num = 1;
							// this.yzm=''
						}
					})
					.catch(err=>{
						this.isCheck = false;
						this.laoding = false;
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/scss/variable.scss';
	.show-mes-popule{
		position: fixed;
		top:0;  
		left:0;  
		z-index:22;  
		width:100%;  
		height:100vh;  
		background:rgba(0,0,0,0.4); 
		.show-mes-popule-content{
			position: fixed;
			top:50%;  
			left:50%;  
			z-index:22;  
			width:600upx;  
			background: #1B2640;
			color: $white;
			transform: translate(-50%,-50%);
			border-radius: 20upx;
			overflow: hidden;
			.show-mes-popule-con{
				position: relative;
				padding: 20upx 0 0;
				.show-mes-popule-close{
					position: absolute;
					right: 20upx;
					top: 20upx;
				}
				.show-mes-popule-con-title{
					line-height: 88upx;
					font-size: 28upx;
					text-align: center;
					border-bottom: 1upx solid #454C5D;
				}
				.show-mes-popule-con-c{
					font-size: 36upx;
					padding: 40upx 0 ;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.show-mes-popule-button{
					display: flex;
					justify-content: space-between;
					align-items: center;
					button{
						flex: 1;
						line-height: 78upx;
						font-size: 26upx;
						border: none;
						border-radius: 0;
						&.active{
							background-color: $text-gray-color3;
						}
						&::after{
							border: none;
							border-radius: 0;
						}
						&:last-of-type{
							color: $white;
							background: linear-gradient(to right,#3083FF,#001EFF);
							&.active{
								background: #58627D;
								color: #0F0C39;
							}
						}
					}
				}
			}
		}
	}
	.bottom-btn{
		width: 400upx;
		position: fixed;
		z-index: 1;
		left : 175upx;
		bottom: 40upx;
		button{
			width: 400upx;
			line-height: 88upx;
			text-align: center;
			border-radius: 44upx;
			background: linear-gradient(to right, #3083FF ,#001EFF);
			color: $white;
			&.active{
				background: #58627D;
				color: #0F0C39;
			}
		}
	}
	.popule{
		position: fixed;
		top:0;  
		left:0;  
		z-index:8;  
		width:100%;  
		height:100vh;  
		background:rgba(0,0,0,0.4); 
		.popule-content{
			width: 630upx;
			position: fixed;
			z-index: 9;
			left: 0;
			bottom: 0;
			padding: 40upx 60upx 20upx;
			background-color: #1b2640;
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			.popule-list{
				padding-bottom: 20upx;
				border-bottom: 1upx solid #2B2860;
				view{
					font-size: 36upx;
					font-weight: bold;
					padding-bottom: 25upx;
				}
				text{
					font-size: 26upx;
					color: #4A4B79;
				}
			}
			.popule-list-info{
				padding: 34upx  0 54upx;
				border-bottom: 1upx solid #2B2860;
				view{
					font-size: 26upx;
					margin-top: 10upx;
					text{
						color: #0063FF;
						margin: 0 15upx;
					}
				}
			}
			.popule-list-real{
				padding: 20upx 0 10upx;
				text{
					font-size: 26upx;
					color: #4A4B79;
				}
				view{
					margin-top: 10upx;
					font-size: 46upx;
					font-weight: bold;
				}
			}
			.list{
				padding: 20upx 0 0;
				&:last-of-type{
					.input-item{
						border-bottom: none;
					}
				}
				.title{
					font-size: 30upx;
					color: $white;
					background: #0063FF;
				}
				.input-item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1upx solid #3673FD;
					input{
						line-height: 88upx;
						height: 88upx; 
						font-size: 28upx;
					}
					text{
						font-size: 28upx;
					}
				}
			}
			.popule-num-content{
				text{
					font-size: 26upx;
					color: #4A4B79;
				}
				.popule-num{
					margin-top: 15upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 475upx;
					line-height: 80upx;
					height: 80upx;
					border: 1upx solid #0358e0;
					border-radius: 8upx;
					overflow: hidden;
					button{
						&:first-of-type{
							border-right: 1upx solid #0358e0;
						}
						&:last-of-type{
							border-left: 1upx solid #0358e0;
						}
						&.active{
							background: #58627D;
							color: #0F0C39;
						}
						font-size: 60upx;
						border-radius: 0; 
						width: 80upx;
						height: 80upx;
						color: #FFFFFF;
						line-height: 80upx;
						text-align: center;
						font-weight: normal;
						background: linear-gradient(to right, #3083FF, #001EFF);

					}
					input{
						font-size: 40upx;
						font-weight: normal;
						flex: 1;
						line-height: 80upx;
						color:$white;
						text-align: center;
					}
				}
			}
			.popule-voucher{
				padding: 30upx 0;
				text{
					font-size: 26upx;
					color: #4A4B79; 
				}
				.popule-voucher-content{
					border-radius: 8upx;
					margin-top: 22rpx;
					background: linear-gradient(to right, #3083FF, #001EFF);
					padding: 16upx 40upx;
					font-size: 36upx;
					font-weight: normal;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: $white;
					view{
						font-weight: bold;
					} 
					text{
						color: $white;
						font-size: 36upx;
						font-weight: bold;
					}
				}
			}
			.popule-meg{
				padding: 20upx 0;
				text{
					font-size: 26upx;
					color: $white;
				}
			}
			.popule-nav{
				display: flex; 
				justify-content: space-between;
				align-items: center;
				padding: 10upx 0 0;
				view{
					flex: 1;
					text-align: center;
					&:first-of-type{
						button{
							background: #8884B7;
						}
					}
					&:last-of-type{
						button{
							background: linear-gradient(to right, #2f82ff, #0222ff);
						}
					}
					button{
						width: 240upx; 
						line-height: 72upx;
						height:72upx;
						text-align: center;
						color: $white;
						font-size: 34upx;
						font-weight: bold;
						&.active{
							background: #58627D;
							color: #0F0C39;
						}
					}
				}
			}
		}
	}
	.content{
		.container{
			padding: 20upx 30upx 100upx;
			.list{
				border-radius: 20upx;
				overflow: hidden;
				position: relative;
				padding:  32upx 34upx 44upx 33upx;
				margin-bottom: 20upx;
				// &::after{
				// 	content: "";
				// 	background-color: #1b2640;
				// 	width: 690upx;
				// 	height: 260upx;
				// 	position: absolute;
				// 	z-index: -2;
				// 	left: 0;
				// 	top:0;
				// }
				image{
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
					align-items: center;
					z-index: 2;
					.list-title-i{
						color: $white;
						font-size: 40upx;
						font-weight: bold;
						margin-right: 39upx;
					}
					.list-title-t{
						font-size: 20upx;
						line-height: 34upx;
						padding: 0 10upx;
						border-radius: 4upx;
						background-color: $white;
					}
					text{
						margin-right: 16upx;
						padding: 10upx 20upx;
						border-radius: 4upx;
						font-size: 20upx;
						background-color: #FF6C00;
					}
				}
				.list-content{
					z-index: 2;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 8upx;
					.list-content-l{
						width: 540upx;
						display: flex;
						align-items: center;
						flex-flow:row wrap;
						.list-content-l-items{
							// width: 200upx;
							font-size: 32upx;
							color: $white;
							font-weight: bold;
							margin: 50upx 0 30upx;
						}
						.list-content-l-items-t{
							color: rgba(255,255,255,.8);
							font-size: 26upx;
						}
						// view{
						// 	color: #F12323;
						// 	font-weight: bold;
						// 	font-size: 56upx;
						// }
						// text{
						// 	font-size: 26upx;
						// 	   color: #4A4B79;
						// }
					}
					// #196CDA':index==1?'#7A5BC7':index==2?'#E14429':'#FF5060'
					.list-content-r{
						text-align: right;
						&:nth-child(0){
							.active{
								color: $white;
								background: #196CDA;
							}
							
						}
						&:nth-child(2){
							.active{
								color: $white;
								background: #7A5BC7;
							}
						}
						&:nth-child(4){
							.active{
								color: $white;
								background: #E14429;
							}
							
						}
						&:nth-child(6){
							.active{
								color: $white;
								background: #FF5060;
							}
							
						}
						button{
							line-height: 60upx;
							height: 60upx;
							width: 160upx;
							text-align: center;
							font-size: 24upx;
							padding: 0;
							background: $white;
							
						}
					}
				}
			}
		}
	}
</style>
