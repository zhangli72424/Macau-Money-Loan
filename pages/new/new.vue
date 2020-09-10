<template>
	<view class="app-community">
		<!-- <view class="pagetitle">市场</view> -->
		<view class="community-content">
		<!-- 	<view class="tabs">
				<view class="tab" @tap="clickTip(0)"><text :class="{active: currentTab}">市场</text></view>
				<view class="tab" @tap="clickTip(1)"><text :class="{active: !currentTab}">新闻</text></view>
			</view> -->
			<view class="list">
				<view class="li" v-for="(item,index) in list" :key="index" v-if="item.time && item.title && item.content && list.length > 0" @tap="clickBullentin(item)">
					<view class="time"><view>{{item.time}}</view></view>
					<view class="name">{{item.title}}</view>
					<view class="content" v-html="item.content"></view>
					<view class="btns" v-if="item.labels && item.labels.length > 0" @tap="clickBullentin(item)">
						<view class="btn" v-for="(label, idx) in item.labels" :key="idx">
							{{label.name}}
							<text class="iconfont" :class="label.num > 0 ? 'red icon-top-arrow' : 'green icon-down-arrow'"></text>
							<text :class="label.num > 0 ? 'red' : 'green'">{{label.num}} </text>
						</view>
					</view>
					<image src="/static/image/community-dot.png"></image>
					<view class="line"></view>
				</view>
				<view class="nodata" v-if="list.length == 0">
					{{i18n.nodata}}
				</view>
			</view>
		</view>
		<load v-if="isLoading"></load>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, diff_txt} from '@/common/js/util.js';
	import Load from '@/components/common/load.vue';
	export default {
		data() {
			return {
				// true的时候是节点, false的时候是官方新闻
				currentTab: true,
				list: [],
				isLoading:false
			}
		},
		computed: {
			i18n () {
				return this.$t('message')
			},
			...mapGetters([
				'getLangType',
				'getRequestUrl',
				'getLoginInfo',
				'getLang',
				'getTextArr'
			])
		},
		onShow() {
			this._render_news()
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			clickBullentin(e) {
				// console.log(e) 没有title content time 是不会显示出来的
				this.setBulletin(e);
				uni.navigateTo({
					url:'/pages/new/detail'
				})
				},
			clickTip(e) {
				this.list = []
				if (e) {
					this.currentTab = false;
					this._render_news();
					return;
				}
				this.currentTab = true;
				this._render_news();
			},
			_get_news() {
				// uni.showLoading();
				this.isLoading = true;
				let _data = {
					type: this.getLang
				}
				fetch('/api/index/news', _data, "post")
					.then(res => {
						// uni.hideLoading()
						this.isLoading = false;
						if (this.currentTab) {
							if (res.data.code) {
								if (res.data.data.length > 0) {
										res.data.data.forEach(item => {
											if (!item) return {};
											item.time = diff_txt(item.time, this.i18n.today, this.i18n.yesterday, this.i18n.b_yesterday);
											
										})
										this.list = res.data.data.filter(item => {
											if (!item) return false;
											return item.time && item.title && item.content
										});
										this.list.forEach(item=>{
											item.content = item.content
											  .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
											  .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
											  .replace(/<p>/ig, '<p class="p_class">')
											  .replace(/\<img/gi, '<img style="max-width:98%;height:auto" ')
											
										})
									
								} else {
									showToast(this.i18n.nodata);
								}
							} else {
								showToast(res.data.msg)
							}
						}
					})
					.catch(res => {
						uni.hideLoading()
						console.log(res)
					})
			},
			_get_notice() {
				// uni.showLoading();
				this.isLoading = true;
				let _data = {
					type: this.getLang
				}
				fetch('/api/User/notice', _data, "post")
					.then(res => {
						// console.log(res)
						// uni.hideLoading()
						this.isLoading = false;
						if (!this.currentTab) {
							if (res.data.code) {
								if (res.data.data.length > 0) {
										res.data.data.forEach(item => {
											item.time = diff_txt(item.time, this.i18n.today, this.i18n.yesterday, this.i18n.b_yesterday);
										})
										this.list = res.data.data;
										this.list.forEach(item=>{
											item.content = item.content
											  .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
											  .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
											  .replace(/<p>/ig, '<p class="p_class">')
											  .replace(/\<img/gi, '<img style="max-width:98%;height:auto" ')
											
										})
								} else {
									showToast(this.i18n.nodata);
								}
							} else {
								showToast(res.data.msg)
							}
						}
					})
					.catch(res => {
						uni.hideLoading()
						console.log(res)
					})
			},
			_render_news() {
				if (this.currentTab) {
					this._get_news();
				} else {
					this._get_notice();
				}
			},
			...mapMutations([
				'setBulletin',
				'setLoginInfo'
			]),
		},
		components: {
			Load
		}
	}
</script>
<style lang="scss">
	@import '@/common/scss/variable.scss';
	@import '@/common/scss/global.scss';
	.tab-nav{
		display: flex;
		margin-left: 12%;
	}
	rich-text {
	  width: 100%;
	  word-break: break-word;
	  .p_class {
		line-height: 46rpx;
		// text-indent: 60rpx;
		margin-bottom: 20rpx;
		// word-break: break-word;
		width: 100%;
		ord-break: break-all;
	  }

	  .pho {
		display: block;
		word-break: break-word;
		width: 100% !important;
		height: auto;
		border-radius: 20rpx;
	  }
	
	}
	.app-community {
		overflow: hidden;
		.community-content {
			padding-bottom: 50px;
			.tabs {
				display: flex;
				padding: 0 30upx;
				position: relative;
				z-index: 2;
				.tab {
					color: $text-gray-color7;
					text-align: left;
					width: 120px;
					padding: 10upx 0 20upx;
					text {
						font-size: 14px;
						&.active {
							color: #1D7DFF;
							position: relative;
							font-weight: bold;
							&::after {
								position: absolute;
								left: 50%;
								top: 110%;
								transform: translateX(-50%);
								content: "";
								display: block;
								width: 70upx;
								height: 4upx;
								background-color: #1D7DFF;
								border-radius: 4upx;
							}
						}
					}
				}
			}
			.list {
				padding: 0 24upx;
				.li {
					position: relative;
					display: flex;
					flex-direction: column;
					padding-left: 38upx;
					padding-top: 64upx;
					overflow: hidden;
					.time {
						position: relative;
						height: 50upx;
						view {
							position: absolute;
							background: linear-gradient(to right,#E407E8,#5631FD);
							border-radius: 10upx;
							font-size: 12px;
							padding: 12upx 20upx 12upx;
							color: $white;
						}
					}
					.name {
						margin-top: 30upx;
						font-size: 15px;
						color: #FFFFFF;
					}
					.content {
						font-size: 11px;
						color: #8884B7;
						margin-top: 20upx;
						line-height: 18px;
						letter-spacing: 1px;
						word-break:break-all;
						display:-webkit-box;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.btns {
						display: flex;
						padding-top: 24upx;
						.btn {
							padding: 16upx 12upx;
							border-radius: 10upx;
							margin-right: 20upx;
							background-color: #262626;
							font-size: 10px;
							color: #A4A4A4;
							.red {
								color: #FF2828;
							}
							.green {
								color: #2DFF28;
								transform: rotateX(100deg);
							}
							.iconfont {
								font-size: 10px;
								margin-left: 10upx;
								margin-right: 6upx;
							}
						}
					}
					image {
						position: absolute;
						left: 9upx;
						top: 82upx;
						width: 12upx;
						height: 12upx;
					}
					.line {
						position: absolute;
						width: 1upx;
						height: 100%;
						background-color: rgba(#2188FF, .2);
						left: 14upx;
						top: 94upx;
					}
					&:last-child {
						.line {
							height: calc(100% - 130upx);
						}
					}
					&:first-child {
						margin-top: -34upx;
					}
				}
			}
		}
		img {
			width: 100%;
		}
	}
</style>
	