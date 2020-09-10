<template>
	<view class="app-detail">
		<UniStatusBar bgc="transparent"></UniStatusBar>
		<UniNavBar leftIcon="arrow-left" :title="i18n.Contract_details" @tapNavLeft="tapnavleft"></UniNavBar>
		<view class="content">
			<view class="list">
				<view>{{i18n.Operating_status}}</view>
				<text :class="{'green':info.status==1}">{{info.status==1?i18n.powers:info.status==2?i18n.To_be_activated:i18n.Failure}}</text>
			</view>
			<view class="list">
				<view>{{i18n.__amount__}}</view>
				<text>{{info.total}}</text>
			</view>
			<view class="list">
				<view>{{i18n.Residual_income}}</view>
				<text class="green">{{info.dcb_num}} BTWT</text>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view>{{i18n.Contract_name}}</view>
				<text>{{info.title}}</text>
			</view>
			<view class="list">
				<view>{{i18n.investment}}</view>
				<text class="green">{{info.num}} USDT</text>
			</view>
			<view class="list">
				<view>{{i18n.Cloud_computing_power}}</view>
				<text class="green">{{info.sl}} T</text>
			</view>
			<view class="list">
				<view>{{i18n.buy_time}}</view>
				<text>{{info.time}}</text>
			</view>
			
		</view>
	
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
				info:{}
			}
		},
		onLoad(e) {
			this.info = JSON.parse(e.info)
			console.log(this.info);
			
			// dcb_num: "300.0000"
			// num: 100
			// sl: "1.0000"
			// status: 2
			// time: "2020-04-09 14:52:54"
			// title: "合约算力-100USDT"
			// total: "1.0000"
			// ycb_num: "0.0000"
			
			
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		methods: {
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
<style>
	page {
		background-color: #f1f3f4;
	}
</style>
<style lang="scss" scoped>
	
@import '@/common/scss/variable.scss';
@import '@/common/scss/global.scss';

.app-detail {
	.content{
		margin-top: 30upx;
		background-color: $white;
		.list{
			border-bottom: 1upx solid #E0E0E0;
			display: flex;
			justify-content:space-between;
			align-items: center;
			padding: 0 30upx;
			font-size: 30upx; 
			&:last-of-type{
				border-bottom: none;
			}
			view{
				line-height: 120upx;
			}
			text{
				line-height: 120upx;
				color: #AEAEAE;
				&.green{
					color: #009F5E;
				}
			}
		}
	}
}
</style>
