<template>
	<view class="uni-nav-bar" :style="{background:bgColor}" :class="{'uni-navbar--fixed':!!fixed}">
		<view class="left top-btn" @tap="handleClick('left')" :style="{color: color}">
			<text v-if="leftIcon.length > 0" class="iconfont" :class="'icon-'+leftIcon"></text>
			<text v-if="leftTxt.length > 0" class="txt">{{leftTxt}}</text>
			<slot name="left"></slot>
		</view>
		<view class="middle top-title" :style="{color: color}">
			<text v-if="title.length > 0">{{title}}</text>
			<slot name="center"></slot>
		</view>
		<view class="right top-btn" @tap="handleClick('right')" :style="{color: rightColor}">
			<text v-if="rightTxt.length > 0" class="txt">{{rightTxt}}</text>
			<text v-if="rightIcon.length > 0" class="iconfont" :class="'icon-'+rightIcon"></text>
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			fixed:{
				type: [Boolean, String],
				default: false
			},
			bgColor:{
				type: String,
				default: '#000000'
			},
			leftTxt: {
				type: String,
				default: ''
			},
			rightTxt: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			leftIcon: {
				type: String,
				default: ''
			},
			rightIcon: {
				type: String,
				default: ''
			},
			rightColor:{
				type: String,
				default: '#000000'
			},
			color: {
				type: String,
				default: '#000000'
			}
		},
		methods: {
			handleClick(e) {
				if (e === 'left') {
					this.$emit('tapNavLeft')
				} else {
					this.$emit('tapNavRight')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/variable.scss";
	@import "@/common/scss/global.scss";
	.uni-navbar--fixed {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 9998
	}
	.uni-nav-bar {
		display: flex;
		flex-direction: row;
		width: 750upx;
		padding: 0 30upx;
		padding-top: 20upx;
		background-color: #100a3c;
		.top-btn {
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			color: $text-gray-color4;
			height: 72upx;
			line-height: 72upx;
			@include over-txt;
			font-size: 16px;
			&.left {
				text-align: left;
				justify-content: flex-start;
				.iconfont {
					margin-right: 10upx;
				}
			}
			&.right {
				text-align: right;
				justify-content: flex-end;
				.iconfont {
					margin-left: 10upx;
				}
			}
			.iconfont {
				margin-bottom: -2px;
			}
		}
		.top-title {
			flex: 2;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: $text-gray-color4;
			height: 72upx;
			@include over-txt;
			font-size: 18px;
		}
	}
</style>
