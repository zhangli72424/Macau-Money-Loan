<template>
	<view class="content">
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.paymentAddress}}(USDT ERC20)
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.pPaymentAddress" v-model="address">
				<text class="icon iconfont iconhuaban" @tap.stop="jumpAddresslist"></text>
			</view>
		</view>
		
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.withdrawalAmount}}
			</view>
			<view class="input-item">
				<input type="number" :placeholder="i18n.pWithdrawalAmount" v-model="num">
				<text @tap.stop="num=curInfo.balance">{{i18n.all}}</text>
			</view>
		</view>
		<view class="list-tip animated bounceInUp fast">
			{{i18n.AvailableBalance}}：{{curInfo.balance>=0?curInfo.balance:'-'}} {{curInfo.title_en?curInfo.title_en:'-'}}
		</view>
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.sxf}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.WithdrawalFee" :value="txsxf" disabled="true">
				<text>{{curInfo.title_en}}</text>
			</view>
		</view>
		
		<view class="list line-top animated bounceInUp fast">
			<view class="title">
				{{i18n.miniAmount}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.pWithdrawalAmount"  :value="curInfo.txmini" disabled="true">
				<text>{{curInfo.title_en}}</text>
			</view>
		</view>

		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.yanzhengma}}
			</view>
			<view class="input-item">
				<input type="number" :placeholder="i18n.enter_vcode" v-model="yzm">
				<view><vcode :account="phone"></vcode></view>
			</view>
		</view>
		<view class="list-tip animated bounceInUp fast">
			{{i18n.account_}}:{{phone}}
		</view>
		
		<view class="list line-top animated bounceInUp fast">
			<view class="title">
				{{i18n.remark}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.remarks" v-model="remark">
			</view>
		</view>
		
		
		<button 
		type="default" 
		:loading="loadings" 
		:disabled="shows" 
		class="flash-btn animated bounceInUp fast" 
		:class="{'active':!shows}" 
		@tap="comfirm">{{i18n.withdrawal}}</button>
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
	import vcode from '@/components/vcode/vcode.vue';
	import Load from '@/components/common/load.vue';
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import {mapGetters,mapMutations} from "vuex";
	export default {
		components:{
			vcode,Load,payPwd
		},
		computed:{
			txsxf(){
				if(!this.num) return this.curInfo.txsxf;
				// console.log(this.curInfo.txsxf.indexOf('%'));
				if(this.curInfo.txsxf.indexOf('%')=='-1'){
					return (parseFloat(this.curInfo.txsxf))
				} 
				console.log(this.curInfo.txsxf,this.num,typeof this.curInfo.txsxf,);
				return (this.num*(parseFloat(this.curInfo.txsxf))/100)
			},
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getCoin'
			]),
		},
		data() {
			return {
				loadings:false,
				shows:true,
				address:'',
				num:'',
				remark:'',
				yzm:'',
				phone:'',
				showpwd:false,
				showss:false,
				isshows:false,
				laoding:false,
				curInfo:{},
				addressInfo:{},
				isCheck:false
			}
		},
		onLoad(){
			
			// console.log(this.curInfo);
			this.phone = this.getLoginInfo.email;
		},
		onShow(){
			forceUpdate(this.getLangType);
			this.getWallet()
			if(this.getCoin){
				this.addressInfo = this.getCoin;
				this.address = this.addressInfo.address
				this.setCoin('')
			}
			console.log(this.getCoin);
		},
		watch:{
			address(val){
				this.change()
			},
			num(val){
				this.change()
			},
			yzm(val){
				this.change()
			}
		},
		methods: {
			...mapMutations(['setCoin']),
			getWallet(){
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							
							let list = res.data.data.list
							let li = list.filter(item=>{
								return item.id==3
							})
							
							this.curInfo = li[0]
							console.log(this.curInfo);
							// let std = list.filter(item=>{
							// 	return item.title_en=='STD'
							// })
							// this.usdt_info = li[0]
							// this.std_info = std[0]
						}
					})
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
			_judgeEmail(str) {
				let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
				return reg.test(str)
			},
			inputAgain(val){
				this.isshows = false;
				this.showpwd = true;
			},
			finish(val){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					lang_type:this.getLangType=='chs'?1:2,
					number:this.num,
					paypwd:val,
					to:this.address,
					remark:this.remark,
					yzm:this.yzm,
					token_id:this.curInfo.token_id,
					type:this._judgeEmail(this.phone)?1:2
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.laoding = true;
				fetch('/api/wallet/transfer',data,'POST').then(res=>{
					this.laoding = false;
					this.isCheck  = false;
					showToast(res.data.msg)
					if(res.data.code){
						this.isshows = false;
						this.showss = false;
						this.showpwd = false;
						this.sellnumber='';
						this.sellprice='';
						this.onenumber='';
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						this.isshows = false;
						this.showss = false;
						this.showpwd = false;
						if(res.data.msg=='支付密码错误！'){
							this.isshows = true;
						}else if(res.data.msg=='usdt不足'){
							this.isshows = false;
							this.showpwd = false;
							this.showss = true;
						}
					}
				}).catch(error=>{
					this.isCheck  = false;
					this.laoding = false;
				})
			},
			jumpAddresslist(){
				uni.navigateTo({
					url:`/pages/assets/address-list?item=${JSON.stringify(this.curInfo)}`
				})
			},
			change(){
				if(this.address && this.num && this.yzm){
					this.shows = false;
					return false;
				}
				this.shows = true;
			},
			comfirm(){
				if(this.shows) return;
				if(!(this.num.match(/^\d+$/))){
					showToast(this.i18n.p_enter_zh)
					return
				}
				console.log(this.shows);
				this.showpwd = true;
				this.loadings = true;
				setTimeout(()=>{this.loadings = false;},3000)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.content{
		padding-top: 20upx;
		.list{
			padding: 36upx 30upx 0;
			background-color: $default-color;
			&.line-top{
				padding-bottom: 40upx;
				margin-bottom: 20upx;
			}
			&:last-of-type{
				.input-item{
					border-bottom: none;
				}
			}
			.title{
				font-size: 30upx;
				color: $white;
			}
			.input-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1upx solid #929191;
				input{
					flex: 1;
					line-height: 88upx;
					height: 88upx; 
					font-size: 28upx;
				}
				view{
					font-size: 28upx;
				}
				text{
					font-size: 28upx;
					&.iconfont{
						font-size: 48upx;
						&.iconai-eye{
							font-size: 36upx;
						}
						&.iconyanjing-bi{
							font-size: 36upx;
						}
					}
				}
			}
		}
		.list-tip{
			background-color: $default-color;
			padding: 20upx 0 20upx 30upx;
			font-size: 24upx;
			color: #A6A7AB;
			&:last-of-type{
				padding-bottom: 40upx;
			}
		}
		.flash-btn{
			margin: 50upx 30upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 34upx;
			background: #58627D;
			color: #0F0C39;
			&.active{
				background: $trans-color;
				color: $white;
			}
		}
	}
</style>
