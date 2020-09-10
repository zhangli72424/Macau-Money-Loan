<template>
	<view class="content">
		
		<view class="nav_contant">
			<view class="nav_item active" >USDT充币</view>
			<view class="nav_item" @tap.stop="noOpen">微信充币</view>
			<view class="nav_item" @tap.stop="noOpen">支付宝充币</view>
		</view>
		
		
		<view class="container animated bounceInUp fast">
			<!-- <view class="title">{{title_en}}充币</view> -->
			<view class="qr-code">
				<image :src="eImg" mode="widthFix" lazy-load></image>
			</view>
			<view class="save-btn">
				<button type="default" hover-class="active" @tap.stop="save">{{i18n.save}}</button>
			</view>
			<view class="address">
				<view class="address-title">USDT ERC20{{i18n.address}}：</view>
				<view class="address-content">
					{{address}}
				</view>
				<button type="default" hover-class="active" @tap.stop="copy">{{i18n.copy_address}}</button>
			</view>
		</view>
		<view class="tip animated bounceInUp fast">
			{{i18n.recarge_tip0}}{{title_en}}{{i18n.recarge_tip1}}
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	import Load from '@/components/common/load.vue';
	export default {
		data() {
			return {
				tokenId:'',
				address:'',
				eImg:'',
				title_en:''
			}
		},
		components:{
			Load
		},
		computed:{
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo'
			])
		},
		onShow(){
			forceUpdate(this.getLangType);
			uni.setNavigationBarTitle({
				title:`${this.title_en}${this.i18n.Deposit}`
			})
		},
		onLoad(e){
			this.tokenId = JSON.parse(e.item).id;
			this.title_en = JSON.parse(e.item).title_en;
			if(!JSON.parse(e.item).address){
				this.getAddress();
			}else{
				this.address = JSON.parse(e.item).address;
				this.eImg = this.getRequestUrl+'/static/zhifu_img/'+this.address+'.png'
			}
		},
		methods:{
			noOpen(){
				let mas = this.getLangType=='en'?'Not yet open':'暂未开放'
				showToast(mas)
			},
			save(){
				// #ifdef APP-PLUS
				let _self = this;
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
										title: _self.i18n.save_img_success,  
										duration: 1500,
										icon: "none"
									});  
								}  
							});  
						}  
						,function(e){
							uni.showToast({  
								title: _self.i18n.save_img_fail,  
								duration: 1500,
								icon: "none"
							});
						});  
					},
					// 失败的回调函数
					function(e){
						uni.showToast({  
							title: _self.i18n.save_img_fail, 
							duration: 1500,
							icon: "none"
						});
					}
				);
				// #endif
			},
			copy(){
				let _this = this
				uni.setClipboardData({
					data: _this.address,
					success: function () {
						uni.showToast({
							title:_this.i18n.success_copy
						})
					}
				});
			},
			getAddress(){
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					token_id:this.tokenId
				}
				let result = fetch('/api/wallet/create_address', data, "POST");
				this.showLoad = true;
				result.then(res=>{
					// console.log(res);
					this.showLoad = false;
					if(res.data.code){
						// this.coinslist = res.data.data
						this.address = res.data.data.address;
						this.eImg = this.getRequestUrl+'/static/zhifu_img/'+res.data.data.address+'.png'
					}
				}).catch(err=>{
					this.showLoad = false;
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/scss/variable.scss';
	.content{
		padding: 40upx 30upx;
		.nav_contant{
			display: flex;
			align-content: center;
			justify-content: center;
			background: #212121;
			line-height: 80rpx;
			margin-bottom: 40rpx;
			.nav_item{
				margin-right: 40rpx;
				&.active{
					color: #ffd785;
					position: relative;
					&::after{
						content: "";
						position: absolute;
						width: 68rpx;
						height: 6rpx;
						transform: translateX(-50%);
						background: #FFD785;
						left: 50%;
						bottom: 0;

					}
				}
				&:last-of-type{
					margin-right: 0;
				}
			}
		}
		.container{
			padding: 40upx 0 40upx;
			background-color: $default-color;
			border-radius:10upx;
			.title{
				line-height: 114upx;
				font-size: 40upx;
				text-align: center;
				color: $white;
			}
			.qr-code{
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 364upx;
					height: 360upx;
					flex-shrink: 0;
					background-color: $white;
				}
			}
			.save-btn{
				padding: 30upx 0 50upx;
				button{
					width: 160upx;
					height: 50upx;
					margin: 0 auto;
					line-height: 50upx;
					text-align: center;
					background: $trans-color;
					color: $white;
					font-size: 26upx;
					&.active{
						background: #58627D;
						color: #0F0C39;
					}
				}
			}
			.address{
				padding: 0 22upx;
				.address-title{
					color: #A6A7AB;
					font-size: 26upx;
					margin-bottom: 18upx;
				}
				.address-content{
					color: $white;
					font-size: 30upx;
					padding: 26upx;
					background-color: #0f0f0f;
					text-align: center;
					border-radius: 10upx;
					word-wrap:break-word;
				}
				button{
					width: 160upx;
					height: 50upx;
					line-height: 50upx;
					margin: 20upx auto 0;
					font-size: 24upx;
					color: $white;
					background: $trans-color;
					&.active{
						background: #58627D;
						color: #0F0C39;
					}
				}
			}
		}
		.tip{
			margin-top: 30upx;
			font-size: 24upx;
			color: #A6A7AB;
			line-height: 40upx;
		}
	}
</style>
