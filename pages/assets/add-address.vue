<template>
	<view class="content">
		<view class="list">
			<view class="title">
				{{i18n.paymentAddress}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.pPaymentAddress" v-model="address">
			</view>
		</view>
		
		<view class="list line-top">
			<view class="title">
				{{i18n.remarks}}
			</view>
			<view class="input-item">
				<input type="text" :placeholder="i18n.remarks" v-model="remark">
			</view>
		</view>
		
		<button type="default" :loading="loadings" :disabled="shows" class="flash-btn" :class="{'active':!shows}" @tap="comfirm">{{i18n.addAddress}}</button>
		<load v-if="laoding"></load>
	</view>
</template>

<script>
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import {mapGetters, mapMutations} from 'vuex' 
	import Load from '@/components/common/load.vue';
	export default {
		components:{
			Load
		},
		data() {
			return {
				laoding:false,
				loadings:false,
				shows:true,
				address:'',
				remark:'',
				curInfo:'',
				isCheck:false
			}
		},
		onShow(){
			forceUpdate(this.getLangType);
		},
		onLoad(e) {
			this.curInfo = JSON.parse(e.item)
			console.log(JSON.parse(e.item));
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters(['getLoginInfo','getLangType'])
		},
		watch:{
			address(val){
				this.change()
			},
			remark(val){
				this.change()
			}
		},
		methods: {
			change(){
				if(this.address){
					this.shows = false;
					return true;
				}else{
					this.shows = true;
					return false;
				}
			},
			comfirm(){
				if(this.shows) return;
				console.log(this.shows);
				this.loadings = true;
				this.laoding = true;
				if(this.isCheck) return
				this.isCheck  = true;
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					lang_type:this.getLangType=='chs'?1:2,
					token_id:this.curInfo.token_id,
					tag:this.remark,
					address:this.address
				}
				this.laoding = true;
				fetch('/api/wallet/addA',data,'POST')
					.then(res=>{
						this.isCheck  = false;
						this.laoding = false;
						this.loadings = false;
						showToast(res.data.msg)
						if(res.data.code){
							setTimeout(()=>{
								uni.navigateBack({
									delta:2
								})
							},500)
						}
					})
					.catch(err=>{
						this.isCheck  = false;
						this.laoding = false;
						this.loadings = false;
					})
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
				border-bottom: 1upx solid #2B2860;
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
