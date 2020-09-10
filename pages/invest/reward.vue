<template>
	<view class="app-log">
		<UniStatusBar bgc="transparent"></UniStatusBar>
		<UniNavBar leftIcon="arrow-left" :title="i18n.Community_rewards" @tapNavLeft="tapnavleft"></UniNavBar>
		
		<view class="content">
			<image :src="urlImg" mode="widthFix" lazy-load></image>
			<!-- <image src="../../static/imgs/reward-img.png" mode="widthFix" lazy-load></image> -->
		</view>
		
		 
		<!-- <view class="nodata" v-if="list.length == 0">{{i18n.nodata}}</view> -->
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
				status:1,
				urlImg:''
			}
		},
		onLoad() {
			// this._getList()
			this.urlImg = this.getRequestUrl + '/static/img/huodong.png'
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
	
	.content{
		width: 750upx;
		margin: 0 auto;
		image{
			width: 750upx;
			flex-shrink: 0;
			margin: 0;
			padding: 0;
		}
	}
}
</style>
