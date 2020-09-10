<template>
	<view class="content">
		<view class="details-title">
			<image src="../../static/image/exchang-detail.png" mode="widthFix" lazy-load></image>
			<text>{{info.title}}</text>
		</view>
		
		<view class="list">
			<view class="list-title">
				<view class="">
					{{info.title}}
				</view>
			</view>
			<view class="list-content">
				<view class="list-content-l">
					<view class="_h2">
						{{info.price | formatParsefloat}}
					</view>
					<text class="list-content-t">EKA单价(USDT)</text>
					<view class="list-content-l-b">
						<text>限额 {{info.freeze | formatParsefloat}} EKA</text><text>剩余 {{(info.buy_cash) | formatParsefloat}} EKA</text>
					</view>
				</view>
				<view class="list-content-r">
					
					<view class="round-txt">
						<text>已兑换</text>
						<view>
						{{ (info.bili*100 | formatParsefloat) +'%'}}
						</view>

					</view>
					<view class="box">
						<view class="bg1"></view>
						<view class="bg2"></view>
						<view class="pr1" 
						:style="{transform:'rotate('+((info.bili>0.5?'0':((info.bili-1)*180))+'deg)')}"
						></view>
						<view class="pr2"
						:style="{transform:'rotate('+((info.bili>0.5?((info.bili-1.5)*360):'-180')+'deg)'),background:(info.bili>0.5?'#0063ff':'#dbe3fc')}"
						></view>
						<view class="box-content"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="exchange-bottom">
			<image src="../../static/image/exchang-detail-bg.png" mode="widthFix" lazy-load></image>
			<text class="exchange-bottom-title">买入数量</text>
			<view class="exchange-bottom-input">
				<input type="number" value="" placeholder="请输入购买数量" v-model="num" maxlength="12" disabled="true"/>
				<text>个</text>
			</view>
			<view class="exchange-bottom-txt">
				<view>
					当前可用(USDT): <text>{{usdt_balance | formatParsefloat}}</text>
				</view>
				<view>
					需支付(USDT): <text>{{total}}</text>
				</view>
			</view>
		</view> 
		<view class="exchange-btn">
			<button type="default"
			 :class="{'active':!disab}"
			:loading="loadings" 
			:disabled="disab" @tap.stop="comfirm">立即购买</button>
		</view>
		<load v-if="laoding"></load>
		<pay-pwd
		:maxlength="6" 
		:isPwd="true" 
		:isSHow="showpwd" 
		:isShows="isshows"
		:isShowss="showss"
		@close="close"
		@input-again="inputAgain"
		@finish="finish"></pay-pwd>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import Load from '@/components/common/load.vue';
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	let timer;
	export default {
		components:{
			UniNavBar,payPwd,Load
		},
		data() {
			return {
				laoding:false,
				info:{},
				time:'',
				type:'',
				title_en:'',
				num:'',
				disab:true,
				loadings:false,
				showpwd:false,
				isshows:false,
				showss:false,
				isCheck:false,
				db_balance:0,
				usdt_balance:0
				
			}
		},
		computed:{
			formatParsefloat(val){
				if ((!val && val != 0) || val == null || val == undefined || val == 'undefined') {
					return 0
				}
				return parseFloat(val)
			},
			total(){
				return this.num?this.num*this.info.price:'0';
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
		watch:{
			num(val){
				this.change();
			}
		},
		onLoad(e){
			this.db_balance = e.db_balance
			this.usdt_balance = e.usdt_balance
			forceUpdate(this.getLangType);
			// console.log(e);
			this.info = JSON.parse(e.info)
			this.num = parseFloat(this.info.freeze)
		},
		onShow(){

		},
		methods:{
			change(){
				if(this.num){
					this.disab = false;
					return false;
				}
				this.disab = true;
			},
			comfirm(){
				this.showpwd = true;
				this.loadings = true;
				setTimeout(()=>{this.loadings = false;},3000)
			},
			close(val){
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
				let data = {
					num:this.num,
					paypwd:val,
					token_id:3,
					shopid:this.info.id,
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.laoding = true;
				fetch('/api/shop/buy_shop',data,'POST')
					.then(res=>{
						showToast(res.data.msg)
						this.laoding = false;
						this.isCheck  = false;
						if(res.data.code){
							this.num =''
							this.showpwd = false;
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},500)
						}
					})
					.catch(err=>{
						this.laoding = false;
						this.isCheck  = false;
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.content{
		padding: 20upx 0;
		.details-title{
			line-height: 100upx;
			display: flex;
			align-items: center;
			padding:  0 30upx;
			background-color: #1B2640;
			margin-bottom: 20upx;
			image{
				width: 48upx;
				height: 48upx;
				flex-shrink: 0;
				margin-right: 34upx;
			}
			text{
				color: #0063FF;
				font-size: 36upx;
				font-weight: bold;
			}
		}
		.list{
			background: #1B2640;
			margin-bottom: 30upx;
			.list-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 82upx;
				padding: 0 30upx;
				view{
					padding-left: 15upx;
					
					position: relative;
					&::before{
						content: "";
						width: 4upx;
						height: 32upx;
						background: #0063FF;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
			.list-content{
				padding: 28upx 30upx 40upx 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.list-content-l{
					width: 440upx;
					._h2{
						font-size: 64upx;
						font-weight: bold;
						background-image: $white;
					}
					.list-content-t{
						color:#58627D; 
						font-size: 24upx;
						padding:  22upx 0 42upx;
						display: block;
					}
					.list-content-l-b{
						display: flex;
						align-items: center;
						text{
							font-size: 26upx;
							padding:  0 15upx 0 0;
							margin-right: 15upx;
							color: #58627D;
							&:first-of-type{
								position: relative;
								&::after{
									content:"";
									position: absolute;
									width: 2upx;
									height: 26upx;
									background-color: #58627D ;
									right: 0;
									top: 50%;
									transform: translateY(-50%);
								}
							}
						}
					}
				}
				.list-content-r{
					position: relative;
					flex: 1;
					width: 190upx;
					height: 190upx;
					border-radius: 95upx;
					overflow: hidden;
					margin:  -48upx auto 0;
					.round-txt{
						position: absolute;
						top: 51%;
						left: 35%;
						text-align: center;
						transform: translate(-50%,-50%);
						z-index: 10;
						text{
							color: #98A6C2;
							font-size: 27upx;
						}
						view{
							font-size: 48upx;
							font-weight: bold;
							&.remaining-time{
								margin-top: 45upx;
								font-weight: normal;
								font-size: 26upx;
								color: #F93737;
							}
						}
					}
					.bg1{
					  position: absolute;
					  width: 95upx;
					  height: 190upx;
					  border-radius: 190upx 0 0 190upx;
					  z-index: 3;
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
						// transform: rotate(-240deg);
						// animation: pr2A 5s infinite linear forwards;
						// background: #ff0;
						transform-origin: 0px 95upx;
					}
				}
			}
		}
		.exchange-bottom{
			position: relative;
			overflow: hidden;
			padding:  0 30upx;
			image{
				width: 750upx;
				height: 373upx;
				position: absolute;
				flex-shrink: 0;
				left: 0;
				top: 0;
				z-index: -1;
			}
			.exchange-bottom-title{
				line-height: 126upx;
				display: block;
				color: $white;
				font-size: 28upx;
			}
			.exchange-bottom-input{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1upx solid #25314D;
				text{
					width: 160upx;
					font-size: 70upx;
					text-align: center;
					line-height: 116upx;
				}
				input{
					flex: 1;
					font-size: 70upx;	
					line-height: 116upx;
					height: 116upx;
					color: #0063FF;
				}
			}
			.exchange-bottom-txt{
				display: flex;
				justify-content: space-between;
				align-items: center;
				view{
					font-size: 24upx;
					color: #58627D;
					padding: 34upx 0 ;
					text{
						color: $white;
						font-size: 40upx;
						margin-left: 10upx;
					}
					&:last-of-type{
						text-align: right;
						
					}
				}
			}
		}
		.exchange-btn{
			padding: 0 30upx;
			margin-top: 112upx;
			button{
				line-height: 88upx;
				height: 88upx;
				font-size:32upx;
				color: $white;
				background:#58627D;
				&.active{
					background: linear-gradient(to right, #3083FF,#001EFF);
				}
			}
		}
	}
</style>
