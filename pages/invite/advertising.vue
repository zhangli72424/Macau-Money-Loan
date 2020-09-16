<template>
	<view>
		<view class="addvertising-bg">
			<image :src="imgsrc" mode="widthFix" lazy-load></image>
		</view>
		<view class="add-cont">
			<view class="advertising-content">
				<text>{{i18n.my_code}}</text>
				<view class="my-code">
					<view>{{code}}</view>
					<button type="default" hover-class="active" @tap.stop="copy_code">{{i18n.copy}}</button>
				</view>
				<text>{{i18n.my_share_address}}</text>
				<view class="advertising-content-t">
					<view>{{addressData}}</view>
					<button type="default" hover-class="active" @tap.stop="copy">{{i18n.copy}}</button>
				</view>
				<button class="down-btn" type="default" hover-class="active" @tap.stop="save">{{i18n.Download_poster}}</button>
			</view>
			<view class="advertising-content-btn">
				<image :src="qrSrc" mode="widthFix" lazy-load></image>
			</view>
			
		</view>
	
		<load v-if="showLoadings"></load>
	</view>
</template>

<script>
	import Load from '@/components/common/load.vue';
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js';
	import {mapGetters,mapMutations} from "vuex";
	export default {
		components:{
			Load
		},
		data() {
			return {
				imgsrc:'../../static/image/invite-bg-img.png',
				isfast:false,
				addressData:'',
				qrSrc:'',
				showLoadings:false,
				isCheck:false,
				code:''
			};
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getCoin'
			]),
		},
		onShow(){
			forceUpdate(this.getLangType);
			this._getAddress();
		},
		onLoad(){
			this.qrSrc = this.getRequestUrl+'/static/zhifu_img/username_'+this.getLoginInfo.username+'.png';
		},
		methods:{
			copy_code(){
				if (this.isfast) return;
				this.isfast = true;
				setTimeout(()=> {
					this.isfast = false;
				}, 1500)
				let  _this = this;
				uni.setClipboardData({
					data: this.code,
					success: function () {
						uni.showModal({
							title: _this.i18n.copy,
							content:  _this.i18n.success_copy, 
							showCancel:false,
							success: function(res) {
								if (res.confirm) {											 
									//console.log('用户点击确定');
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			_getAddress() {
				let _data = {
						id: this.getLoginInfo.id,
						token: this.getLoginInfo.token
					}
					if(this.isCheck) return
					this.isCheck  = true;
					this.showLoadings = true
				fetch('/api/user/userQrcode', _data, 'post')
					.then(res => {
						this.isCheck  = false;
						this.showLoadings = false
						if (res.data.code) {
							this.code = res.data.data.user_sn
							this.addressData = res.data.data.qrcode;
						} else {
							showToast(res.data.msg);
						}
					})
					.catch(res=> {
						this.isCheck  = false;
						this.showLoadings = false
						showToast(this.i18n.request_fail);
					})
			},
			copy() {
				if (this.isfast) return;
				this.isfast = true;
				setTimeout(()=> {
					this.isfast = false;
				}, 1500)
				let  _this = this;
				uni.setClipboardData({
					data: this.addressData,
					success: function () {
						uni.showModal({
							title: _this.i18n.copy,
							content:  _this.i18n.success_copy, 
							showCancel:false,
							success: function(res) {
								if (res.confirm) {											 
									//console.log('用户点击确定');
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			save () {
				//#ifdef APP-PLUS
				var pages = getCurrentPages();  
			    var page = pages[pages.length - 1];
			    var bitmap=null;  
				// 获得当前webview对象
			    var currentWebview = page.$getAppWebview();
				// 要绘制的图片对象
			    bitmap = new plus.nativeObj.Bitmap('amway_img');  
			    // 将webview内容绘制到Bitmap对象中  
			    currentWebview.draw(
					bitmap,
					// 成功的回调函数
					function(){
						bitmap.save(
						// 要保存的图片路径 相对路径URL(RelativeURL) - 以"_"开头的相对路径
						// 因为内容可能改变 所以使用随机数作为文件的名字
						"_doc/"+Math.random()+".jpg"  
						// 可设置保存图片的格式，压缩质量等参数。
						,{}  
						,function(i){
							uni.saveImageToPhotosAlbum({  
								filePath: i.target,  
								success: function () {  
									bitmap.clear(); //销毁Bitmap图片  
									uni.showToast({  
										title: '保存图片成功',  
										duration: 1500,
										icon: "none"
									});  
								}  
							});  
						}  
						,function(e){
							uni.showToast({  
								title: '保存图片失败',  
								duration: 1500,
								icon: "none"
							});
						});  
					},
					// 失败的回调函数
					function(e){
						uni.showToast({  
							title: '保存图片失败',
							duration: 1500,
							icon: "none"
						});
					}
				);
				// #endif
			},
		}
	}
</script>
<style>
	page{
		background: #000000 !important;
	}
</style>
<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	
	
	.addvertising-bg{
		position: fixed;
		left: 0;
		top: 0;
		z-index: -1;
		width: 750upx;
		height: 1334upx;
		image{
			width: 750upx;
			height: 100vh;
			flex-shrink: 0;
		}
	}
	.add-cont{
		// background-color: #FFFFFF;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.advertising-content{
			padding: 50upx 30upx 0 30upx;
			text{
				color: #FFAE41;
				font-size: 30upx;
			}
			.my-code{
				line-height: 62upx;
				background: #E6B24F;
				border-radius: 8upx;
				padding-left: 20upx;
				color: $black;
				margin-bottom: 30upx;
				margin-top: 22upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				button{
					margin: 0 0 0 auto !important;
				}
			}
			button{
				background: rgba(63, 65, 142,0);
				// background-color: red;
				width: 140upx;
				line-height: 62upx;
				text-align: center;
				height: 62upx;
				font-size: 24upx;
				color: $black;
				&.active{
					background: rgba(63, 65, 142,.9);
					color: #02051d;
				}
				&.down-btn{
					background: #E6B24F;
					width: 268rpx;
					margin:0 auto 60rpx 0;
				}
			}
			.advertising-content-t{
				margin: 22upx 0 44upx;
				width: 460upx;
				background: #E6B24F;
				border-radius: 8upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view{
					flex: 1;
					line-height: 62upx;
					font-size: 24upx;
					text-align: center;
					padding: 0 20upx;
					overflow: hidden;
					text-overflow:ellipsis; 
					white-space:nowrap;
					color: $black;
				}
				
			}
		}
		.advertising-content-btn{
			text-align: left;
			padding-right: 40rpx;
			image{
				width: 174rpx;
				height: 174rpx;
				flex-shrink: 0;
			}
			button{
				margin-right: 30rpx;
				width: 200upx;
				height: 120upx;
				line-height: 120upx;
				text-align: center;
				border-radius: 8upx;
				font-size: 32upx;
				background: #E6B24F;
				color: $black;
				&.active{
					background: rgba(63, 65, 142,.9);
					color: #02051d;
				}
			}
		}
	}
	.advertising-card{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 200upx;
		width: 254upx;
		margin: 0 auto;
		image{
			width: 254upx;
			height: 254upx;
			background-color: #ffffff;
			flex-shrink: 0;
		}
		view{
			font-size: 26upx;
			color: $white;
			margin-top: 30upx;
			text-align: center;
		}
	}
</style>
