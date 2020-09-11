<template>
	<view>
		<view class="wallet-top">
			 <!-- #ifdef APP-PLUS -->
			 <uni-status-bar bgcolor="transparent"></uni-status-bar>
			 <!-- #endif -->
			<!-- <view class="wallet-top-t">
				<text>{{cur.title_en}} 投资额</text>
				<view class="">
					{{lsitcur.num?(lsitcur.num | formatParsefloat):'0'}}
				</view>
			</view> -->
			<view class="nav-title">
				<view class="nav-title-box">
					<view class="Allet">资产</view>
					<view class="mi">
						<text>我的理财</text>
						<image src="../../static/image/back.png"></image>
					</view>
				</view>
			</view>
		
			<!-- <view class="wallet-top-nav">
				<view class="wallet-top-nav-l">
					<text>已收益</text>
					<view>{{lsitcur.total?lsitcur.total:0}}</view>
				</view>
				<view class="wallet-top-nav-r">
					<text>可收益</text>
					<view>{{lsitcur.total?lsitcur.max:0}}</view>
				</view>
			</view> -->
			<view class="assets">
				<view class="assets_image">
					<image src="../../static/image/allet_image.png" class="bg-class" mode="widthFix" lazy-load></image>
					<!-- <view class="assets_content">
						<view class="assets-title assets-public">
							<view class="view">
								<view>总资产</view>
								<view class="">账户余额</view>
							</view>
						</view>
						<view class="assets_num assets-public">
							<view class="view">
								<view>总资产</view>
								<view class="">账户余额</view>
							</view>
						</view>
						<view class="licai assets-public">
							<view class="view">
								<view>理财资产</view>
								<view class="">理财收益</view>
							</view>
						</view>
						<view class="assets-button assets-public">
							<view class="view">
								<view class="Recharge btn">充值</view>
								<view class="Withdraw-money btn">提币</view>
							</view>
						</view>
					</view> -->
					<view class="assets-content">
						<view class="assets-left">
							<view class="assets-color assets-title">总资产</view>
							<view class="assets-color assets_num">2543232</view>
						</view>
						<view class="assets-right">
							<view class="assets-color assets-title">账户余额</view>
							<view class="assets-color assets_num">123442</view>
							
						</view>
					</view>
					<view class="assets-content-center">
						<view class="profit">理财资产 345.88 usdt</view>
						<view class="profit">理财收益 345.88 usdt</view>
					</view>
					<view class="assets-content-bottom">
						<view class="Withdraw-money btn">充币</view>
						<view class="Withdraw-money btn">提币</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nav-content">
			<view class="nav-content-l">
				<view :class="{'active':navIndex==0}" @tap.stop="selectNav('0')">理财记录</view>
				<view :class="{'active':navIndex==1}" @tap.stop="selectNav('1')">收益记录</view>
			</view>
			<view class="nav-content-r">
				<text>查看全部</text>
				<i class="icon iconfont iconxiangyou1"></i>
			</view>
		</view>
		
		<view class="list-content">
			<view class="list">
				<view class="list-l">
					<view>购买至尊套餐X5</view>
					<text>2019/09/10  16:49:09</text>
				</view>
				<view class="list-r">
					<view>75000.00</view>
					<text>金额(USDT）</text>
				</view>
			</view>
			<view class="list">
				<view class="list-l">
					<view>购买至尊套餐X5</view>
					<text>2019/09/10  16:49:09</text>
				</view>
				<view class="list-r">
					<view>75000.00</view>
					<text>金额(USDT）</text>
				</view>
			</view>
		</view>
		
		
		<message 
		:showCancel="showCancelX"
		:shows="showMsg" 
		@close="cancelMsg"
		@jump="jumpMsg"
		:message="dataMsg"></message>
		<pay-pwd
		:maxlength="6" 
		:isPwd="true" 
		:isSHow="showpwd" 
		:isShows="isshows"
		:isShowss="showss"
		@close="close"
		@input-again="inputAgain"
		@finish="finish"></pay-pwd>
		<load v-if="showLoadings"/>
		
		<view class="popule-mask anima fadeIn fast" v-if="showpopule" @tap.stop="cancle">
			<view class="popule-content" @tap.stop="''">
				<view class="popule-content-title">
					<view>{{curInfos.title}}</view>
					<text>售价：{{curInfos.freeze}}</text>
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
				
				<view class="popule-content-btn">
					<button type="default" hover-class="active" @tap.stop="cancle">取消</button>
					<button type="default" hover-class="active" @tap.stop="confrim">下单</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Load from '@/components/common/load.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import Message from '@/components/common/message.vue';
	export default {
		components:{
			uniStatusBar,Load,payPwd,Message
		},
		data() {
			return {
				showpopule:false,
				showLoadings:'',
				zd_type:'',
				curInfo:{},
				num:1,
				total_cny:'',
				b_total:'',
				j_total:'',
				cur:{},
				showCancelX:false,
				showpwd:false,
				isshows:false,
				showss:false,
				showMsg:true,
				dataMsg:'',
				navIndex:0,
				list:[],
				status:2,
				isCheck:false,
				isBack:false,
				curInfos:{},
				lsitcur:{},
				number:1,
				isundo:false,
				tobeUndo:false,
				nopaypwd:false
			};
		},
		computed:{
			relaNum(){
				return parseFloat(this.curInfo.freeze)*parseFloat(this.num);
			},
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
			])
		},
		onShow(){
			this.nopaypwd = false;
			this.tobeUndo = false;
			this.isundo = false;
			this.showCancelX = false
			this.isBack=false;
			this.showMsg = false;
			this.showpwd=false
			this.isshows=false
			this.showss=false
			this.dataMsg = ''
			this.page=1;
			this.isCheck = false;
			this.list = []
			// this.getHistory();
			// this.get_wallet();
			// this.getCheckB();
			uni.showTabBar({
				success: (res) => {
					
				}
			})
		},
		methods:{
			getCheckB(){
				let _url = '/api/Wallet/check_b';
				fetch(_url,{},'POST').then(res=>{
					
				})
			},
			getTipA(){
				fetch('/api/shop/over_prompt',{},'post')
					.then(res=>{
						this.showCancelX = true;
						this.showMsg = true;
						this.dataMsg = res.data.msg
						this.isBack=false;
						this.tobeUndo = true;
						uni.hideTabBar({
							success: (res) => {
								
							}
						})
					})
			},
			get_wallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							let lit = res.data.data.list.filter(item=>{
								return item.id==1;
							})
							this.total_cny = lit[0].balance
							this.cur = lit[0]
						}
					})
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
			buy(){
				this.cancle()
			},
			confrim(){
				this.showpopule = false;
				this.tobeUndo = false;
				this.isundo = false;
				if(!this.getLoginInfo.paypwd){
					this.showCancelX = false;
					this.showMsg = true;
					this.dataMsg = this.getLangType=='en'?'Please set transaction password':'请设置交易密码'
					this.nopaypwd = true;
					return
				}
				if(this.num>this.list[0].copies){
					this.showpopule = false
					this.dataMsg = this.getLangType=='en'?'Not enough times to undo':'可撤消次数不够'
					this.showMsg = true;
					// this.showpwd = false;
					this.isundo = true;
					return
				}
				this.tobeUndo = false
				this.showpwd = true;
				return
				uni.navigateTo({
					url:`/pages/top-up/top-up?num=${this.num}`
				})
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
			jump(url){
				switch (url){
					case '/pages/bill/bili':
					if(!this.zd_type) return
						uni.navigateTo({
							url:`/pages/bill/bili?tab=${JSON.stringify(this.zd_type)}`
						})
						break;
					case 'goumai':
						this.cancle()
						break;
					default:
						if(url=='/pages/balance-withdrawal/balance-withdrawal'){
							uni.navigateTo({
								url:url+`?info=${JSON.stringify(this.cur)}`
							})
							return
						}
						uni.navigateTo({
							url:url
						})
				}
			},
			
			jumpMsg(){
				if(this.nopaypwd){
					this.showMsg=false;
					this.dataMsg=''
					this.showpopule = false;
					uni.navigateTo({
						url:'/pages/modify-pwd/modify-pwd'
					})
					return
				}
				if(this.tobeUndo == true){
					this.showMsg=false;
					this.dataMsg=''
					this.showpopule = true
					return
				}
				if(this.isundo == true){
					this.showMsg=false;
					this.dataMsg=''
					this.num=1
					return
				}
				
				if(this.isBack){
					this.showMsg=false;
					this.dataMsg=''
					return
				}
				this.tobeUndo = false;
				this.isundo == false;
				this.nopaypwd = false;
				this.showpwd = true;
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
					this.showMsg = false;
				}else{
					this.isshows = val;
					this.showpwd = val;
					this.showss = val
					this.showMsg = false;
				}
			},
			inputAgain(val){
				this.isshows = false;
				this.showpwd = true;
			},
			finish(val){
				let data = {
					shopid:this.curInfos.id,
					num:this.num,
					paypwd:val
				}
				this.isundo = false;
				if(this.isCheck) return
				this.isCheck  = true;
				this.laoding = true;
				fetch('/api/shop/over',data,'POST').then(res=>{
					this.laoding = false;
					this.isCheck  = false;
					// showToast(res.data.msg)
					if(res.data.code){
						this.isshows = false;
						this.showss = false;
						this.showpwd = false;
						this.sellnumber='';
						this.sellprice='';
						this.onenumber='';
						this.showMsg = true;
						this.dataMsg = res.data.msg;
						this.page=1;
						this.list=[]
						this.showCancelX = false
						this.isBack=true;
						this.getHistory();
						this.tobeUndo = false;
						this.isundo == false;
						this.nopaypwd = false;
						uni.showTabBar({
							success: (res) => {
								
							}
						})
					}else{
						this.isshows = false;
						this.showss = false;
						this.showpwd = false;
						if(res.data.msg=='支付密码错误！'){
							this.isshows = true;
						}else if(res.data.msg=='usdt不足'){
							this.isshows = false;
							this.showpwd = false;
							this.showMsg = false;
						}else{
							this.showMsg = true;
							this.isBack=true;
							this.dataMsg = res.data.msg;
							uni.showTabBar({
								success: (res) => {
									
								}
							})
						}
					}
				}).catch(error=>{
					this.isCheck  = false;
					this.laoding = false;
				})
			},
			cancelMsg(){
				this.showMsg = false;
				this.dataMsg = ''
				uni.showTabBar({
					success: (res) => {
						
					}
				})
			},
			over(item){
				console.log(item);
				this.curInfos = item
				this.getTipA()
				
			},
			selectNav(index){
				this.navIndex = index;
				return
				 //0驳回 1审核中 2收益中 3已出局
				//0 持有入金  1正在审核中  2已结束  3 已驳回
				this.list = []
				switch (index){
					case '0':
						this.status = 2;
						this.getHistory();
						break;
					case '1':
						this.status = 3;
						this.getHistory();
						break;
				}
				
			},
			getHistory(){
				let _data_ = {
					status:this.status,   //0驳回 1审核中 2收益中 3已出局
				}
				if(this.isCheck) return
				this.isCheck = true;
				fetch('/api/Shop/tz_list',_data_,'post')
					.then(res=>{
						this.isCheck = false;
						if(res.data.data.length ==0){
							if(this.navIndex==0){
								this.lsitcur = []
							}
							uni.hideNavigationBarLoading();
							uni.showToast({
								title:this.i18n.nodata,
								icon:'none'
							})
							return;
						}
						if(res.data.code==1){
							this.list = res.data.data
							this.list.forEach((item,index)=>{
								item.sl = (parseInt(item.sl*10000))/1000000
								this.list[index].copies = parseFloat(item.num)/parseFloat(item.freeze)
							})
							if(this.navIndex==0){
								this.lsitcur = this.list[0]
							}
						}
					})
					.catch(err=>{
						this.isCheck = false;
					})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@flex {
		justify-content:space-between;
		align-items:center;
	}
	@import '@/common/scss/variable.scss';
	.nav-title{
		padding-top: 35rpx;
		height: auto;
		width: 600rpx;
		overflow: hidden;
		.nav-title-box{
			margin: 0 32rpx;
			.Allet{
				float: left;
				font-size: 40rpx;
				color: #FFFFFF;
			}
			.mi{
				float: right;
				font-size: 26rpx;
				color: #EEA935;
				position: relative;
				image{
					width: 14rpx;
					height: 24rpx;
					magrin-left:10rpx;
				}
			}
		}
			
	}
	.assets{
		width:750rpx;
		height: auto;
		margin: 30rpx;
		.assets_image{
			width: 690rpx;
			height: 332rpx;
			position: relative;
			.bg-class{
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
				width: 690rpx;
				height:332rpx;
				// border-radius: 10rpx;
			}
			.assets-content{
				display: flex;
				top:0;
				left:0;
				padding-top:61rpx;
				.assets-left{
					width: 50%;
					height: 100%;
					text-align: left;
					padding-left: 45rpx;
				}
				.assets-right{
					width: 50%;
					height: 100%;
					text-align: right;
					padding-right: 49rpx;
				}
				.assets_num{
					font-size: 48rpx;
					color: #EEA935;
				}
				.assets-title{
					font-size: 22rpx;
					color: #EEA935;
					margin-bottom: 20rpx;
				}
				.profit{
					color: #FFBC49;
					font-size: 48rpx;
				}
			}
			.assets-content-center{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 48rpx;
				.profit{
					color: #FFBC49;
					font-size: 24rpx;
					&:first-of-type{
						margin-right: 84rpx;
					}
				}
			}
			.assets-content-bottom{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 34rpx 0 44rpx;
				.btn{
					background: linear-gradient(to top, #DCB87C , #CE9A55);
					width: 193rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border-radius: 6rpx;
					font-size: 26rpx;
					color: #181617;
					&:first-of-type{
						margin-right: 81rpx;
					}
				}
			}
		}
	}
	.main{
		width: 100%;
		height: auto;
		overflow: hidden;
		.mai-title{
			.all{
				image{
					width: 14rpx;
					height: 24rpx;
				}
			}
		}
	}
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
	.wallet-top{
		// background: linear-gradient(to bottom,#FFE09F,#D3AD6D);
		text-align: center;
		padding: 27rpx 0 0;
		.wallet-top-t{
			padding: 40rpx 0 28rpx;
			text{
				font-size: 26rpx;
			}
			view{
				font-size: 64rpx;
				font-weight: bold;
				margin-top: 15rpx;
			}
		}
		.wallet-top-nav{
			display: flex;
			align-items: center;
			padding: 18rpx 30rpx;
			justify-content: space-between;
			background: linear-gradient(to right,#FFE09F,#D3AD6D);;
			.wallet-top-nav-l{
				text-align: left;
				text{
					font-size: 22rpx;
				}
				view{
					margin-top: 16rpx;
					font-size: 40rpx;
				}
			}
			.wallet-top-nav-r{
				text-align: right;
				text{
					font-size: 22rpx;
				}
				view{
					margin-top: 16rpx;
					font-size: 40rpx;
				}
			}
		}
	}
	
	.no-data{
		font-size: 26rpx;
		text-align: center;
		color: #AAAFBD;
		padding-top: 40rpx;
	}
	.nav-content{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 46rpx 30rpx;
		.nav-content-l{
			display: flex;
			align-items: center;
			view{
				font-size: 30rpx;
				color: #747470;
				margin-right: 33rpx;
				&.active{
					color: #EEA935;
					font-size: 48rpx;
					font-weight: bold;
				}
			}
		}
		.nav-content-r{
			display: flex;
			align-items: center;
			color: #747470;
			text{
				font-size: 30rpx;
			}
		}
	}
	.list-content{
		padding: 0 30rpx;
		.list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #22211E;
			padding: 61rpx 30rpx 53rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.list-l{
				view{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				text{
					font-size: 24rpx;
					color: #77746A;
				}
			}
			.list-r{
				text-align: right;
				view{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}
				text{
					font-size: 24rpx;
					color: #77746A;
				}
			}
		}
	}
	
	
</style>
