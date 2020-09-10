<template>
	<view>
		<view class="nav">
			<!-- //0驳回 1审核中 2收益中 3已出局 
			0 持有入金  1正在审核中  2已提现  3 已驳回
			-->
			
			<view class="nav-item" :class="{'active':navIndex==0}" @tap.stop="selectNav('0')">持有入金</view>
			<view class="nav-item" :class="{'active':navIndex==1}" @tap.stop="selectNav('1')">正在审核中</view>
			<view class="nav-item" :class="{'active':navIndex==2}" @tap.stop="selectNav('2')">已结束</view>
			<view class="nav-item" :class="{'active':navIndex==3}" @tap.stop="selectNav('3')">已驳回</view>
		</view>
		<view class="content">
			<template v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="list">
						<view class="list-top">
							<view class="list-top-l">{{item.title}} </view>
							<!-- 0 持有入金  1正在审核中  2已结束  3 已驳回 -->
							<view class="list-top-l">
								{{navIndex==3?item.content:'投入金额'+(item.num | formatParsefloat)}}
								</view>
						</view>
						<view class="list-top-tlt">
							<text>
							{{item.status==1?'正在审核中':item.status==2?'已结束':item.status==3?'已驳回':'持有入金'}}
							</text>
							
							<text>{{item.time}}</text>
						</view>
						<view class="list-bottom">
							<view class="list-bottom-item">
								<view>{{item.total | formatParsefloat}}</view>
								<text>累计收益（STD）</text>
							</view>
							<view class="list-bottom-item">
								<view>{{item.sl | formatParsefloat}}</view>
								<text>每日算力</text>
							</view>
							<view class="list-bottom-item">
								<view>{{item.all_day}}</view>
								<text>已收益天数</text>
							</view>
							<view class="list-bottom-item">
								<view>{{item.max | formatParsefloat}}</view>
								<text>总收益（STD）</text>
							</view>
						</view>
						<!-- num  投资额
						all_day 已收益天数
						total 已收益
						max 可收益 -->
						<view class="list-bottom-but" v-if="navIndex==0">
						<!-- <view class="list-bottom-but"> -->
							<!-- <button type="default" hover-class="active">收益明细</button> -->
							<button type="default" @tap.stop="over(item)" hover-class="active">撤销</button>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<view class="no-data">{{i18n.nodata}}</view>
			</template>
			
		</view>
		<message 
		:showCancel="showCancelX"
		:shows="showMsg" 
		@close="cancelMsg"
		@jump="jumpMsg"
		:message="dataMsg"></message>
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
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import Load from '@/components/common/load.vue';
	import payPwd from '@/components/pay-pwd/pay-pwd.vue';
	import Message from '@/components/common/message.vue';
	let timer;
	export default {
		components:{
			Load,payPwd,Message
		},
		data() {
			return {
				showCancelX:false,
				showpwd:false,
				isshows:false,
				showss:false,
				laoding:false,
				showMsg:true,
				dataMsg:'',
				navIndex:0,
				list:[],
				status:2,
				page:1,
				isCheck:false,
				curInfo:{},
				isBack:false
			}
		},
		onShow(){
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
			this.getHistory();
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
			])
		},
		onReachBottom(){
			let _self = this
				//触底的时候请求数据，即为上拉加载更多
				//为了更加清楚的看到效果，添加了定时器
			if (timer != null) {
			    clearTimeout(timer);
			}
			timer = setTimeout(function() {
				
					_self.getHistory();
					
			    // _self.getThings();
			}, 1000);
		},
		methods:{
			jumpMsg(){
				if(this.isBack){
					this.showMsg=false;
					this.dataMsg=''
					return
				}
				this.showpwd = true;
			},
			close(val){
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
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					lang_type:this.getLangType=='chs'?1:2,
					shopid:this.curInfo.id,
					paypwd:val
				}
				if(this.isCheck) return
				this.isCheck  = true;
				this.laoding = true;
				fetch('/api/Shop/over',data,'POST').then(res=>{
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
			},
			over(item){
				console.log(item);
				this.showCancelX = true;
				this.isBack=false;
				this.curInfo = item
				this.showMsg = true;
				this.dataMsg = '违约手续费 '+this.curInfo.zz_sxf
			},
			selectNav(index){
				this.navIndex = index;
				 //0驳回 1审核中 2收益中 3已出局
				//0 持有入金  1正在审核中  2已结束  3 已驳回
				this.page = 1;
				this.list = []
				switch (index){
					case '0':
						this.status = 2;
						this.getHistory();
						break;
					case '1':
						this.status = 1;
						this.getHistory();
						break;
					case '2':
						this.status = 3;
						this.getHistory();
						break;
					case '3':
						this.status = 0;
						this.getHistory();
						break;
				}
				
			},
			getHistory(){
				let _data_ = {
					status:this.status,   //0驳回 1审核中 2收益中 3已出局
					page:this.page,
					rows:15
				}
				if(this.isCheck) return
				this.isCheck = true;
				fetch('/api/Shop/tz_list',_data_,'post')
					.then(res=>{
						this.isCheck = false;
						if(res.data.data.length ==0){
							uni.hideNavigationBarLoading();
							uni.showToast({
								title:this.i18n.nodata,
								icon:'none'
							})
							return;
						}
						if(res.data.code==1){
							if(this.page==1){
								this.list = res.data.data
							}else{
								this.list = this.list.concat(res.data.data)
							}
							this.page++
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
	@import '@/common/scss/variable.scss';
	.no-data{
		font-size: 26rpx;
		text-align: center;
		color: #AAAFBD;
		padding-top: 40rpx;
	}
	.nav{
		position: fixed;
		left: 0;
		top: 0;
		width: 750rpx;
		background-color: #3c393a;
		display: flex;
		align-items: center;
		.nav-item{
			flex: 1;
			text-align: center;
			line-height: 110rpx;
			color: #AAAFBD;
			font-size: 30rpx;
			&.active{
				color: $theme-color;
				position: relative;
				&::after{
					content: '';
					position: absolute;
					background: $theme-color;
					width: 68rpx;
					height: 6rpx;
					left: 50%;
					transform: translateX(-50%);
					bottom: 4rpx;
				}
			}
		}
	}
	.content{
		margin-top: 140rpx;
		padding: 0 30rpx;
		.list{
			background: $theme-dark-color;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			.list-top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 80rpx;
				padding: 0 30rpx;
				view{
					font-size: 30rpx;
					color:$white;
					&:first-of-type{
						font-size: 36rpx;
						color:$theme-color;
					}
				}
			}
			.list-top-tlt{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #929191;
				line-height: 50rpx;
				padding: 0 30rpx 20rpx;
				text{
					font-size: 22rpx;
					line-height: 50rpx;
					color: #A6A7AB;
				}
			}
			.list-bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 30rpx 60rpx;
				.list-bottom-item{
					text-align: center;
					&:first-of-type{
						text-align: left;
					}
					&:last-of-type{
						text-align: right;
					}
					view{
						font-size: 32rpx;
						color: $white;
						margin-bottom: 32rpx;
					}
					text{
						color: #A6A7AB;
						font-size: 26rpx;
					}
				}
			}
			.list-bottom-but{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: 40rpx;
				button{
					width: 200rpx;
					line-height: 60rpx;
					height: 60rpx;
					padding: 0;
					font-size: 30rpx;
					&.active{
						opacity: .95;
						transform: scale(.95);
					}
					&::after{
						display: none;
					}
					&:first-of-type{
						background: rgba(0,0,0,0);
						color: $theme-color;
						border: 1rpx solid $theme-color;
						margin-right: 72rpx;
					}
					&:last-of-type{
						background: linear-gradient(to right, #FFD272, #FFB21E);
						color: $white;
					}
				}
			}
		}
	}
</style>
