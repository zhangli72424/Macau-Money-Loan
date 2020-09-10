<template>
	<view class="">
		<view class="title">
			<!-- #ifdef APP-PLUS -->
			<uni-status-bar bgcolor="transparent"></uni-status-bar>
			<!-- #endif -->
			<view class="title-text">
				{{i18n.in_development}}
			</view>
		</view>
		<view class="content">
			<image src="../../static/image/developing.png" mode="widthFix" lazy-load></image>
			
			<button type="default" @tap.stop="back">{{i18n.returns}}</button>
		</view>
		
		<load v-if="laoding"></load>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import {pageto, showToast, fetch} from '@/common/js/util.js';
	import Load from '@/components/common/load.vue';
	export default {
		components:{
			uniStatusBar,Load
		},
		data() {
			return {
				laoding:false,
				index:0
			}
		},
		computed:{
			i18n() {
				return this.$t('message')
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.title{
		background: #1B2640;
		color: $white;
		.title-text{
			line-height: 78upx;
			text-align: center;
		}
	}
	.content{
		padding: 20upx 50upx;
		image{
			width: 650upx;
			height: 650upx;
			flex-shrink: 0;
		}
		button{
			width: 250upx;
			height: 72upx;
			line-height: 72upx;
			text-align: center;
			margin:0 auto;
			border-radius: 36upx;
			border: 1upx solid $theme-color;
			color: $theme-color;
			background: rgba(0,0,0,0);
		}
		
	}
</style>
