<template>
	<view>
		<image src="../../static/image/them-bg.gif"
		:style="'height:'+ screenHeight +'px !important;'"
		 lazy-load class="ethq-index-bg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:''
			};
		},
		 onLoad() {
			 this.screenHeight = uni.getSystemInfoSync().windowHeight;
			 setTimeout(()=>{
				uni.switchTab({
					url:'/pages/index/index'
				})
			 },2140)
		},
		onShow(){
		},
		methods:{
			
		}
	}
</script>
<style>
	page{
		background: #000 !important;
		width: 750upx;
		height: 100vh;
	}
</style>
<style lang="scss">
	
	.ethq-index-bg{
		width: 100%;
		min-height: 100%;
	}
</style>
