<template>
	<view>
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
			</view>
		</template>
		<load v-if="showload"></load>
	</view>
</template>

<script>
	var timer;
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import load from '@/components/common/load.vue';
	export default {
		components:{
			load
		},
		data() {
			return {
				index: 0,
				showload:false,
				page:1,
				curInfo:{},
				list:[],
				isCheck:false
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
		onLoad(e) {
			forceUpdate(this.getLangType);
			this.curInfo = JSON.parse(e.item)
			console.log(this.curInfo);
			this.page =1;
			this.list =[]
			this.getHistory();
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
		methods:{
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
				this.showload = true;
				fetch('/api/wallet/gasRecord',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showload = false;
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
						this.showload = false;
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
				this.showload = true;
				fetch('/api/wallet/gasRecord',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showload = false;
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
						this.showload = false;
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
				this.showload = true;
				if(this.isCheck) return
				this.isCheck  = true;
				fetch('/api/wallet/history',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showload = false;
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
						this.showload = false;
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
				this.showload = true;
				fetch('/api/wallet/history',data,'post')
					.then(res=>{
						this.isCheck  = false;
						this.showload = false;
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
						this.showload = false;
						console.log(error);
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.no-data{
		margin-top: 130upx;
		text-align: center ;
		image{
			margin: 0 auto;
			width: 620upx;
			height: 620upx;
			flex-shrink: 0;
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
				color: #0063FF;
				&::after{
					content:"";
					left: 50%;
					bottom: 0;
					width: 100upx;
					height: 3upx;
					background-color: #0063FF;
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
		background-color: #1b2640;
		.list-l{
			view{
				font-size: 36upx;
				font-weight: bold;
				color: #15D288;
			}
			text{
				color: #4A4B79;
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
				color: #4A4B79;
				font-size: 26upx;
			}
		}
	}
</style>
