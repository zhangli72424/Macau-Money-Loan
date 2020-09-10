<template>
	<view class="content">
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.Counterparty_username}}
			</view>
			<view class="input-item">
				<input type="text" :disabled="isCheck" :placeholder="i18n.Please_enter_their_username" v-model="username" @blur="testUsername">
				<text v-if="isCheck" class="blue">{{i18n.Verification_succeeded}}</text>
			</view>
		</view>
		
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.Amount_paid}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.Please_enter_the_amount_of_flash_payment" v-model="num">
				<text @tap.stop="num=curInfo.balance">{{i18n.all}}</text>
			</view>
		</view>
		<view class="list-tip animated bounceInUp fast">
			{{i18n.AvailableBalance}}：{{curInfo.balance}} {{curInfo.title_en}}
		</view>
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.sxf}}
			</view>
			<view class="input-item">
				<input type="text" placeholder="" :value="curInfo.fee" disabled="true">
				<text>{{curInfo.title_en}}</text>
			</view>
		</view>
		
		<view class="list animated bounceInUp fast">
			<view class="title">
				{{i18n.yanzhengma}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.enter_vcode" v-model="yzm" maxlength="6">
				<view>
					<vcode :account="phone"></vcode>
				</view>
			</view>
		</view>
		<!-- <view class="list-tip animated bounceInUp fast">
			可用：{{curInfo.balance-(num*(1+curInfo.fee))}} {{curInfo.title_en}}
		</view> -->
		<button type="default" 
		:loading="loadings" 
		:disabled="shows" 
		class="flash-btn animated bounceInUp fast" 
		:class="{'active':!shows}" 
		@tap="comfirm">{{i18n.pay_immediately}}</button>
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
	import {mapGetters} from "vuex";
	import Load from '@/components/common/load.vue';
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import vcode from '@/components/vcode/vcode.vue';
	export default {
		components:{
			payPwd,Load,vcode
		},
		data() {
			return {
				loadings:false,
				shows:true,
				username:'',
				num:'',
				showpwd:false,
				showss:false,
				isshows:false,
				laoding:false,
				isCheck:false,
				curInfo:{},
				yzm:'',
				phone:'',
				isChecks:false
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
				'getLoginInfo'
			]),
		},
		watch:{
			username(val){
				this.change();
			},
			num(val){
				this.change();
			},
			yzm(val){
				this.change();
			}
		},
		onLoad(item){
			forceUpdate(this.getLangType);
			this.phone = this.getLoginInfo.email;
			console.log(item);
			this.curInfo = JSON.parse(item.item)
		},
		methods: {
			change(){
				if(this.username && this.num && this.yzm){
					this.shows = false;
					return true;
				}else{
					this.shows = true;
					return false;
				}
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
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					suser:this.username,
					num:this.num,
					paypwd:val,
					yzmtype:1,
					yzm:this.yzm,
					token_id:this.curInfo.token_id
				}
				if(this.isChecks) return
				this.isChecks  = true;
				this.laoding = true;
				this.loadings = false;
				fetch('/api/wallet/gasZ',data,'POST').then(res=>{
					this.laoding = false;
					showToast(res.data.msg)
					this.isChecks  = false;
					if(res.data.code){
						this.isshows = false;
						this.showss = false;
						this.shows = false;
						this.num='';
						this.yzm='';
						this.username='';
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						this.isshows = false;
						this.showss = false;
						this.shows = false;
						if(res.data.msg=='支付密码错误！'){
							this.isshows = true;
						}else if(res.data.msg=='usdt不足'){
							this.isshows = false;
							this.shows = false;
							this.showss = true;
						}
					}
				}).catch(error=>{
					this.isChecks  = false;
					this.laoding = false;
				})
			},
			//检查用户是否存在
			testUsername(e){
				console.log(e);
				if(this.isChecks) return;
				console.log(e.detail.value);
				this.isChecks = true;
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					suser:e.detail.value
				}
				fetch('/api/wallet/checkGasZ',data,'post')
					.then(res=>{
						showToast(res.data.msg)
						if(res.data.code){
							this.isChecks = false;
							this.isCheck = true;
							return
						}
						this.isChecks = false;
						this.isCheck = false;
					})
					.catch(err=>{
						this.isChecks = false;
					})
			},
			comfirm(){
				if(!(this.num.match(/^\d+$/))){
					showToast(this.i18n.p_enter_zh)
					return
				}
				if(!this.isCheck){
					showToast(this.i18n.sendCard_tip00)
					return
				}
				if(this.num>this.curInfo.balance){
					showToast(this.i18n.false_tip0)
					return
				}
				if(this.shows) return;
				console.log(this.shows);
				this.loadings = true;
				this.showpwd  = true;
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
			background-color: #1a144a;
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
				border-bottom: 1upx solid #2B2860;
				input{
					line-height: 88upx;
					height: 88upx; 
					font-size: 28upx;
				}
				text{
					font-size: 28upx;
					&.blue{
						color: blue;
					}
				}
			}
		}
		.list-tip{
			background-color: #1a144a;
			padding: 20upx 0 20upx 30upx;
			font-size: 24upx;
			color: #8884B7;
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
				background: linear-gradient(to right,#3083FF,#001EFF);
				color: $white;
			}
		}
	}
</style>
