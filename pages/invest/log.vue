<template>
	<view class="app-log">
		<UniStatusBar bgc="transparent"></UniStatusBar>
		<UniNavBar leftIcon="arrow-left" :title="i18n.my_mining" @tapNavLeft="tapnavleft"></UniNavBar>
		
		<view class="nav-title">
			<view class="item" :class="{'active':tabIndex=='0'}" @tap.stop="selectnav('0')">{{i18n.powers}}</view>
			<view class="item" :class="{'active':tabIndex=='1'}" @tap.stop="selectnav('1')">{{i18n.To_be_activated}}</view>
			<view class="item" :class="{'active':tabIndex=='2'}" @tap.stop="selectnav('2')">{{i18n.Failure}}</view>
		</view>
		
		
		<view class="list">
			<block v-for="(item,index) in list" Lkey="index" v-if="list.length > 0">
				<view class="li" @tap.stop="jumpInfo(item)">
					<view class="title">
						<text class="txt-title">{{item.title}}</text>
						<text class="txt-time">{{item.time}}</text>
					</view>
					<view class="content">
						<view class="content-item">
							<view class="txt">{{i18n.invest_num}}: {{item.num | formatParsefloat}} USDT</view>
							<view class="txt">{{i18n.mining_num}}: {{item.total | formatParsefloat}}</view>
							<view class="txt">{{i18n.cumulative_income}}: {{item.ycb_num | formatParsefloat}} BTW</view>
							<view class="txt">{{i18n.Residual_income}}: {{item.dcb_num | formatParsefloat}} BTW</view>
						</view>
						<view class="content-item">
							<view class="txt">
								{{i18n.status}}:
							</view>
							<view
							:class="{'green':item.status==1}"
							class="text-status"> 
							{{item.status==1?i18n.powers:item.status==2?i18n.To_be_activated:i18n.Failure}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="nodata" v-if="list.length == 0">{{i18n.nodata}}</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {fetch, showToast, pageback} from '@/common/js/util.js'
	import UniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import UniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
	export default {
		data() {
			return {
				list: [],
				tabIndex:0,
				status:1
			}
		},
		onShow() {
			this._getList()
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getLoginInfo',
				'getRequestUrl'
			])
		},
		methods: {
			jumpInfo(info){
				uni.navigateTo({
					url:`/pages/invest/detail?info=${JSON.stringify(info)}`
				})
			},
			selectnav(val){
				this.tabIndex = val;
				this.status = (val==0)?1:(val==1)?2:0;
				this._getList();
			},
			_getList () {
				uni.showLoading()
				let _data = {
					id: this.getLoginInfo.id,
					token: this.getLoginInfo.token,
					status:this.status
				}
				fetch('/api/shop/tz_list', _data, "post")
					.then(res => {
						uni.hideLoading()
						if (res.statusCode == 200 && res.data.code == 1) {
							this.list = res.data.data
							// console.log(this.list)
						} else {
							showToast(res.data.msg)
						}
					})
					.catch(err => {
						uni.hideLoading()
						console.log(err)
					})
			},
			tapnavleft() {
				pageback()
			}
		},
		components: {
			UniNavBar,
			UniStatusBar
		}
	}
</script>

<style lang="scss">
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';
page {
	background-color: $page-bg-color2;
}
.app-log {
	.nav-title{
		width: 504upx;
		line-height: 64upx;
		height: 64upx;
		background-color: $white;
		// border: 1upx solid #000000;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15upx auto 0;
		.item{
			flex: 1;
			text-align: center;
			line-height: 64upx;
			height: 64upx;
			font-size: 26upx;
			color: #878787;
			&.active{
				background-color: #009f5e;
				color: $white;
				border-radius: 10upx;
			}
		}
	}
	.list {
		.li {
			background-color: $white;
			padding: 0 30upx 50upx;
			margin: 30upx;
			border-radius: 16upx;
			.title {
				border-bottom: 1upx solid $split-line-color2;
				height: 80upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.txt-title {
					color: $theme-color;
					font-size: 14px;
					font-weight: bold;
				}
				.txt-time {
					color: $adorn-green;
					font-size: 12px;
					font-weight: 300;
				}
			}
			.content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.content-item{
					&:last-of-type{
						text-align: right;
					}
					.txt {
						margin-top: 20upx;
						font-size: 13px;
						color: $section-bg-color1;
					}
					.text-status{
						font-size: 36upx;
						font-weight: bold;
						margin-top: 15upx;
						color: #878787;
						&.green{
							color: #009f5e;
						}
					}
				}
			}
		}
	}
}
</style>
