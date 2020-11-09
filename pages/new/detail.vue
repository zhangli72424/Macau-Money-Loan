<template>
	<view class="app-aboutus">
		<view class="content">
			<view class='title' v-if="getBulletin.title">{{getBulletin.title}}</view>
			<rich-text class="p" :nodes="modifiedContent"></rich-text>
			
			<rich-text class="p" :nodes="content"></rich-text>
			
			
		</view>
	</view>
</template>

<script>
import {mapGetters} from 'vuex'
import {pageback} from '../../common/js/util.js'
export default {
	data() {
		return {
			title: '',
			modifiedContent:'',
			content:''
		}
	},
	computed: {
		// modifiedContent() {
		// 	let str = this.getBulletin.content
		// 	return str.replace(/(\<img|\<image)/ig, '<img style="max-width:100% !important;width: 98% !important;"')
		// },
		...mapGetters([
			'getBulletin',
			'getLoginInfo',
			'getRequestUrl',
			'getLangType'
		])
	},
	onShow(){
		this.getDetialsrere()
	},
	methods: {
		tapNavLeft() {
			pageback();
		},
		getDetialsrere(){
			let _this = this
			uni.request({
				url:'https://api2.shenxuanche.com/getHomeNewsInfo_V2.aspx?newsId=460346',
				success:function(res){
					let content = res.data.items.data.content
					_this.content = content
					console.log(content);
				}
			})
		}
	},
	onLoad(e) {
		if(this.getLangType!='chs'){
			uni.setNavigationBarTitle({
				title:'Details'
			})
		}
		this.title = this.getBulletin.title;
		this.modifiedContent = this.getBulletin.content;
		this.modifiedContent.replace(/(\<img|\<image)/ig, '<img style="max-width:100% !important;width: 98% !important;"')
		console.log(typeof this.modifiedContent);
	},
	components: {
	}
}
</script>

<style lang="scss">
@import '@/common/scss/global.scss';
@import '@/common/scss/variable.scss';
.app-aboutus {
	.index-top-nav-title{
		// padding-left: 30upx;
		width: 100%;
		font-size: 36upx;
		text-align: center;
		background: #FFFFFF;
		color: #FFFEFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.leftIcon{
			width: 80upx;
		}
		.rightIcon{
			width: 80upx;
		}
		.index-top-nav-title-content{
			flex: 1;
		}
	}
	.content{
		margin: 30upx;
		.title{
			padding: 66upx 0 40upx 0;
			line-height: 1;
			font-size: 15px;
			font-weight: bold;
			text-align: center;
			color: #FFFEFF;
		}
		.p{
			color: #999999;
			font-size: 14px;
			line-height: 22px;
			margin-bottom: 30upx;
			width: 750upx;
		}
	}
	image {
		width: 750upx !important;
	}
	img {
		width: 750upx !important;
	}
}
</style>
