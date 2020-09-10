<template>
	<view class="content">

		
		
		<view class="transfer-nav">
			<view class="items" :class="{'active':tabIndex==0}" @tap.stop="selectTab('0')">
				冻结
			</view>
			<view class="items" :class="{'active':tabIndex==1}" @tap.stop="selectTab('1')">
				解冻
			</view>
		</view>
		
		
		
		
		<view class="list animated bounceInUp fast">
			<image src="../../static/image/transfer-bg.png" mode="widthFix" lazy-load></image>
			<view class="title">
				{{tabIndex==1?'转出':'转入'}}矿池
			</view>
			<view class="input-item">
				<input type="number" :placeholder="plaText" v-model="num">
				<text>{{curInfo.title_en}}</text>
			</view>
			<view class="list-tip animated bounceInUp fast">
				<view>冻结金额：<text>{{curInfo.giving | formatParsefloat}} {{curInfo.title_en}}</text></view>
				<view>余额：<text>{{curInfo.balance | formatParsefloat}} {{curInfo.title_en}}</text></view>
			</view>
		</view>
		
		<button 
		type="default" 
		:loading="loadings" 
		:disabled="shows" 
		class="flash-btn animated bounceInUp fast" 
		:class="{'active':!shows}" 
		@tap="comfirm">{{tabIndex==1?'立即解冻':'立即冻结'}}</button>
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
			plaText(){
				return this.tabIndex==1?'请输入解冻数量':'请输入冻结数量'
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
				tabIndex:0,
				loadings:false,
				shows:true,
				num:'',
				showpwd:false,
				showss:false,
				isshows:false,
				laoding:false,
				curInfo:{},
				addressInfo:{},
				isCheck:false
			}
		},
		onLoad(e){
			this.curInfo = JSON.parse(e.item)
		},
		onShow(){
			forceUpdate(this.getLangType);
		},
		watch:{
			num(val){
				this.change()
			}
		},
		methods: {
			selectTab(val){this.tabIndex=val;},
			...mapMutations(['setCoin']),
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
					token_id:this.curInfo.token_id,
					type:this.tabIndex==1?2:1
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.laoding = true;
				fetch('/api/shop/djAndJd',data,'POST').then(res=>{
					this.laoding = false;
					this.isCheck  = false;
					if(res.data.code){
						showToast(res.data.msg)
						this.isshows = false;
						this.showss = false;
						this.showpwd = false;
						this.number='';
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						showToast(res.data.msg)
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
				if(this.num){
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
		.transfer-nav{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 350upx;
			margin: 0 auto;
			line-height: 80upx;
			border-radius: 10upx;
			// background-color: #1c2541;
			padding: 20upx 0;
			margin-bottom: 20upx;
			.items{
				flex: 1;
				line-height: 80upx;
				color: $white;
				text-align: center;
				font-size: 26upx;
				&.active{
					color: #0063ff;
					position: relative;
					font-size: 32upx;
					&::after{
						content: "";
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 100upx;
						height: 6upx;
						background-color: #0063ff;
					}
				}
			}
		}
		.list{
			padding: 36upx 30upx 0;
			// background-color: #1c2541;
			position: relative;
			image{
				position: absolute;
				left: 0;
				top: 0;
				width: 750upx;
				height: 372upx;
				z-index: -1;
			}
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
				// border-bottom: 1upx solid #25314D;
				input{
					flex: 1;
					line-height: 126upx;
					height: 126upx; 
					font-size: 60upx;
				}
				view{
					font-size: 28upx;
				}
				text{
					font-size: 60upx;
					&.iconfont{
						font-size: 48upx;
					}
				}
			}
			.list-tip{
				display: flex;
				justify-content: space-between;
				align-items: center;
				// background-color: #1c2541;
				border-top: 1upx solid #25314D;
				text-align: right;
				padding: 54upx 0 84upx;
				font-size: 24upx;
				color: #8884B7;
				text{
					font-size: 30upx;
				}
				&:last-of-type{
					padding-bottom: 40upx;
				}
			}
		}
		
		.flash-btn{
			margin: 120upx 30upx 0;
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
