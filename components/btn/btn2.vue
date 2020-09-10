<template>
	<view class="app-btn" hover-class="hover-transform1" @tap="handleclick" :style="{backgroundColor: backgroundColor}">
		{{txt}}
	</view>
</template>

<script>
	export default {
		props: {
			txt: {
				type: String,
				default: '确认'
			},
			backgroundColor: {
				type: String,
				default: ""
			}
		},
		methods: {
			handleclick() {
				this.$emit("tapbtn")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	@import '@/common/scss/global.scss';
	.app-btn {
		width: 360upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		color: $white;
		background: linear-gradient(to right, #32B9FF, #1D7DFF);
		border-radius: 80upx;
		margin: 0 auto;
		font-size: 15px;
		transition: all .2s linear;
		box-shadow: 0 3px 20px rgba($color: #2FB1FF, $alpha: .5);
	}
</style>
