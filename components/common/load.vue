<template>
	<view class="request-loading-view">
		<view class="loading-view">
			<view class="loading">
				<image src="../../static/image/40x40.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        }
    }
</script>
<style scoped>
.request-loading-view {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 198903060;
	background-color: rgba(0, 0, 0, 0.001);
	display: flex;
	justify-content: center;
	align-items: center;
}
.loading-view {
	width: 160upx;
	height: 160upx;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* 动画样式 */
.loading {
	/* border: 10upx solid rgba(0, 0, 0, 0.01); */
	/* border-radius: 50%; */
	/* border-top: 10upx solid #fff; */
	/* border-right: 10upx solid #fff; */
	/* border-bottom: 10upx solid #fff; */
	width: 80upx;
	height: 80upx;
	-webkit-animation: spin .8s linear infinite;
	animation: spin .8s linear infinite;
}
.loading image{
	width: 80upx;
	height: 80upx;
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: translate(0,0);
	}
	25% {
		-webkit-transform: translate(0,-25%);
	}
	50% {
		-webkit-transform: translate(0,0);
	}
	75% {
		-webkit-transform: translate(0,25%);
	}
	100% {
		-webkit-transform: translate(0,1%);
	}
}

@keyframes spin {
	0% {
		transform: translate(0,0);
	}
	25% {
		transform: translate(0,-25%);
	}
	50% {
		transform: translate(0,0);
	}
	75% {
		transform: translate(0,25%);
	}
	100% {
		transform: translate(0,1%);
	}
}
</style>