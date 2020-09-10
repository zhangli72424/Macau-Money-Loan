<template>
	<view class="">
		<view class="treasure-count">
			<image src="../../static/image/bao-bg.png" mode="widthFix" lazy-load></image>
			<text>藏宝阁余额(STD)</text>
			<view>{{current?current:0}}</view>
		</view>
		
		<view class="treasure-count-t">
			收入明细
		</view>
		
		<view class="history-nav">
			<view :class="{'active':index==0}" @tap.stop="seletNav('0')">{{i18n.RechargeRecord}}</view>
			<view :class="{'active':index==1}" @tap.stop="seletNav('1')">{{i18n.WithdrawalRecords}}</view>
			<!-- <view :class="{'active':index==2}" @tap.stop="seletNav('2')">{{i18n.Flash_payment_record}}</view> -->
		</view>
		<template v-if="list.length>0">
			<block v-for="(item,ind) in list" :key="ind">
				<view class="list" @tap.stop="detail(item)">
					<view class="list-l">
						<view>{{index==0?'+':'-'}}{{index==2?item.num:item.number}}</view>
						<text>{{index==0?(i18n.recharge + i18n.quantity):index==1?(i18n.withdrawal + i18n.quantity):item.typeStr}}</text>
					</view>
					<view class="list-r">
						<view>{{index==2?i18n.success:(item.status==3?((index==0?i18n.recharge:i18n.withdrawal) + i18n.success):item.status==1?i18n.underReview:i18n.turnDown)}}</view>
						<text>{{item.create_time}}</text>
					</view>
				</view>
			</block>
		</template>
		<template v-else>
			<view class="no-data">
				<image src="../../static/image/nodata.png" mode="widthFix" lazy-load></image>
				<text>{{i18n.nodata}}</text>
			</view>
		</template>
		
		
		
		
		<load v-if="showloadings"/>
	</view>
</template>

<script>
	var timer;
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import Load from '@/components/common/load.vue';
	export default {
		components:{Load},
		data() {
			return {
				showloadings:false,
				index: 0,
				page:1,
				curInfo:{},
				list:[],
				isCheck:false,
				std_curInfo:{},
				lsitcur:'',
				current:''
			}
		},
		onShow(){
			console.log('***');
			this.getTzList();
			this.getWallet();
			
		},
		onPullDownRefresh() {
			this.page =1;
			this.list =[]
			if(this.index!=2){
				this.getHistory();
			}else{
				this.getEchaglist()
			}
		},
		onReachBottom() {
			let _self = this
		    if (timer != null) {
		        clearTimeout(timer);
		    }
		    timer = setTimeout(function() {
				if(this.index!=2){
					_self.getMoreHistory();
				}else{
					_self.getMoreEchaglist()
				}
				uni.stopPullDownRefresh()
		    }, 1000);
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getTextArr',
				'getPlan'
			])
		},
		methods:{
			getTzList(){
				let _data_ = {
					status:2
				}
				if(this.isCheck) return
				this.isCheck = true;
				fetch('/api/Shop/tz_list',_data_,'post')
					.then(res=>{
						this.isCheck = false;
						if(res.data.code==1){
							let list = res.data.data
							this.lsitcur = list[0]
							if(   (parseInt(list[0].num*1000000))/1000000  > (parseInt(list[0].total*1000000))/1000000){
								this.current = (parseInt(list[0].num*1000000))/1000000  - (parseInt(list[0].total*1000000))/1000000
							}else{
								this.current = 0
							}
						}
					})
					.catch(err=>{
						this.isCheck = false;
					})
			},
			getWallet(){
				console.log(111);
				fetch('/api/wallet/wallet_list',{},'post')
					.then(res=>{
						if(res.data.code==1){
							let list = res.data.data.list
							
							let std = list.filter(item=>{
								return item.title_en=='STD'
							})
							this.std_curInfo = std[0]
							
							let usdt = list.filter(item=>{
								return item.title_en=='USDT'
							})
							this.curInfo = usdt[0]
							this.page =1;
							this.list =[]
							this.getHistory();
						}
					})
			},
			seletNav(val){
				this.index= val;
				this.list = [];
				this.page = 1;
				if(val!=2){
					this.getHistory();
				}else{
					this.getEchaglist()
				}
			},
			detail(item){
				pageto(`/pages/assets/detail?info=${JSON.stringify(item)}&type=${this.index}&title_en=${this.curInfo.title_en}`)
			},
			getEchaglist(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					page:this.page,
					rows:10,
					token_id:this.curInfo.token_id
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.showloadings = true;
				fetch('/api/wallet/gasRecord',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showloadings = false;
						if(res.data.data.data.length==0){
							return
						}
						if(res.data.code){
							this.page++;
							this.list = res.data.data.data;
						}
					})
					.catch(error=>{
						this.isCheck  = false;
						this.showloadings = false;
						console.log(error);
					})
			},
			getMoreEchaglist(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					page:this.page,
					rows:10,
					token_id:this.curInfo.token_id
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.showloadings = true;
				fetch('/api/wallet/gasRecord',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showloadings = false;
						if(res.data.data.data.length==0){
							return
						}
						if(res.data.code){
							this.page++;
							this.list = this.list.concat(res.data.data.data);
						}
					})
					.catch(error=>{
						this.isCheck  = false;
						this.showloadings = false;
						console.log(error);
					})
			},
			getHistory(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					page:this.page,
					rows:10,
					type:this.index==1?2:1,
					token_id:this.curInfo.token_id
				}
				this.showloadings = true;
				if(this.isCheck) return
				this.isCheck  = true;
				fetch('/api/wallet/history',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showloadings = false;
						if(res.data.data.data.length==0){
							return
						}
						if(res.data.code){
							this.page++;
							this.list = res.data.data.data;
						}
					})
					.catch(error=>{
						this.isCheck  = false;
						this.showloadings = false;
						console.log(error);
					})
			},
			getMoreHistory(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					page:this.page,
					rows:10,
					type:this.index==1?2:1,
					token_id:this.curInfo.token_id
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.showloadings = true;
				fetch('/api/wallet/history',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showloadings = false;
						if(res.data.data.data.length==0){
							return
						}
						if(res.data.code){
							this.page++;
							this.list = this.list.concat(res.data.data.data);
						}
					})
					.catch(error=>{
						this.isCheck  = false;
						this.showloadings = false;
						console.log(error);
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.treasure-count{
		position: relative;
		width: 690rpx;
		margin: 43rpx auto 22rpx;
		height: 222rpx;
		text-align: center;
		padding-top: 78rpx;
		text{
			color: $white;
		}
		view{
			margin-top: 31rpx;
			color: $white;
			font-size: 52rpx;
			font-weight: bold;
		}
		image{
			z-index: -1;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			width: 690rpx;
			height: 300rpx;
			flex-shrink: 0;
			position: absolute;
		}
	}
	.treasure-count-t{
		color: #FFD785;
		padding: 0 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		line-height: 100rpx;
	}
	.no-data{
		margin-top: 130upx;
		text-align: center ;
		image{
			margin: 0 auto;
			width: 620upx;
			height: 620upx;
			flex-shrink: 0;
		}
		text{
			color: #A6A7AB;
			display: block;
			margin-top: -200rpx;
			text-align: center;
		}
	}
	.history-nav{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $default-color;
		padding-top: 20upx;
		view{
			flex: 1;
			text-align: center;
			color: $white;
			line-height: 72upx;
			font-size: 34upx;
			&.active{
				position: relative;
				color: #ffd785;
				&::after{
					content:"";
					left: 50%;
					bottom: 0;
					width: 100upx;
					height: 3upx;
					background-color: #ffd785;
					position: absolute;
					transform: translateX(-50%);
				}
			}
		}
	}
	.list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 22upx 30upx 0;
		border-radius: 10upx;
		padding: 40upx;
		background-color: #212121;
		.list-l{
			view{
				font-size: 36upx;
				font-weight: bold;
				color: #ffd785;
			}
			text{
				color: #A6A7AB;
				font-size: 26upx;
			}
		}
		.list-r{
			text-align: right;
			view{
				color: #58627D;
				font-size: 36upx;
			}
			text{
				color: #A6A7AB;
				font-size: 26upx;
			}
		}
	}
	
	
	
	
	
	
</style>
