<template>
	<view>
		<view class="nav-content">
			<block v-for="(item,index) in RechargeMethod" :key="index">
				<view class="nav-li" :class="{'active':navIndex==index}" @tap.stop="selectNav(index)">{{item.bankname}}</view>
			</block>
		</view>
		
		<view class="tips">
			入金收款信息
		</view>
		<view class="li-item">
			<view>充值入金方式</view>
			<text>{{methodCur.bankname}}</text>
		</view>
		<view class="li-item">
			<view>入金金额</view>
			<input type="text" placeholder="请输入充值金额" v-model="nornum" disabled="true">STD
		</view>
		<view class="li-item">
			<view>收款账号姓名</view>
			<text>{{methodCur.usname}}</text>
		</view>
		<view class="li-item-img">
			<view class="li-item-img-t">收款账号二维码 <text>(点击可查看大图并保存)</text></view>
			<image @tap.stop="seeImg(methodCur.img)" :src="methodCur.img" mode="widthFix" lazy-load></image>
		</view>
		<view class="li-item-img li-item-img-tips" >
			<view class="li-item-img-t">上传充值凭证</view>
			<view class="li-item-img-c" @tap.stop="uploadimgs">
				<template v-if="!curImg">
					<view>+</view>
					<text>上传转账信息</text>
				</template>
				<template v-if="curImg">
					<image :src="curImg" mode="" ></image>
				</template>
			</view>
		</view>
		<view class="li-button">
			<button type="default" @tap.stop="comfirm">立即充值</button>
		</view>
		<message
		:shows="showMesss" 
		:message="meg"
		@jump="closeMess"
		@close="closeMess"></message>
		<load v-if="showLoadings"/>
	</view>
</template>

<script>
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	import { pathToBase64, base64ToPath } from '@/common/js/img-tools.js';
	import Load from '@/components/common/load.vue';
	import Message from '@/components/common/message.vue';
	export default {
		components:{
			Load,Message
		},
		computed:{
			nornum(){
				return parseFloat(this.num)*parseFloat(this.curInfo.freeze)
			},
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLangType',
				'getLogin',
				'getLoginInfo',
				'getPlan'
			])
		},
		data() {
			return {
				showMesss:false,
				meg:'',
				RechargeMethod:[],
				showLoadings:false,
				navIndex:0,
				num:'',
				curInfo:'',
				curImg:'',
				methodCur:{},
				isok:false
			};
		},
		onLoad(e) {
			this.num = e.num;
			this.curInfo = JSON.parse(this.getPlan)
		},
		onShow(){
			this.isok = false
			this.getInfo();
		},
		methods:{
			closeMess(){
				console.log(this.isok);
				if(this.isok){
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
					this.showMesss = false;
					return
				}
				this.showMesss = !this.showMesss
			},
			seeImg(url){
				  uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							uni.downloadFile({
							    url: url, //仅为示例，并非真实的资源
							    success: async res => {
							        if (res.statusCode === 200) {
										let img = res.tempFilePath
										uni.saveImageToPhotosAlbum({
											filePath: img,
											success: function () {
												showToast('下载成功')
												console.log('save success');
											}
										});
							        }
							    }
							});
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					success: function (res) {
						console.log(res);
						
					}
				});
			},
			getInfo(){
				this.showLoadings = true;
				fetch('/api/Wotc/admin_bank',{},'post')
					.then(res=>{
						this.showLoadings = false;
						if(res.data.code==1){
							this.RechargeMethod = res.data.data
							this.RechargeMethod.forEach(item=>{
								item.img = this.getRequestUrl+'/uploads/'+item.img
							})
							this.methodCur = this.RechargeMethod[0]
						}
					})
					.catch(err=>{
						this.showLoadings = false;
					})
			},
			comfirm(){
				this.showLoadings = true;
				this.isok  = false;
				let _data_ = {
					shopid:this.curInfo.id,
					num:this.num,
					type:this.methodCur.smsid,
					credentials:this.curImg
				}
				fetch('/api/Shop/buy_shop',_data_,'post')
					.then(res=>{
						this.showLoadings = false;
						this.showMesss = true;
						this.meg = res.data.msg
						if(res.data.code==1){
							this.isok  = true;
							return
						}
						this.isok  = false;
					})
					.catch(err=>{
						this.isok  = false;
						this.showLoadings = false;
					})
				// _this.curImg
			},
			selectNav(index){
				this.navIndex=index
				this.methodCur = this.RechargeMethod[index]
			},
			uploadimgs(){
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						let file = res.tempFiles[0]
						let reg = /.+\.(jpeg|jpg|png)$/g
						if (file.size > 1024 * 1024) {
							showToast(_this.i18n.The_file_is_too_large)
							return
						} else if(!reg.test(file.path)) {
							showToast(_this.i18n.File_format_error)
							return
						} else {
							pathToBase64(file.path)
								.then(res => {
									_this.curImg = res
								})
								.catch(err => {
									console.log(err)
								})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.nav-content{
		background: #3D3B3B;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx 0;
		.nav-li{
			line-height: 80rpx;
			color: #AAAFBD;
			font-size: 30rpx;
			&.active{
				color: #FFD785;
				position: relative;
				&::after{
					content: '';
					position: absolute;
					width: 68rpx;
					height: 6rpx;
					border-radius: 6rpx;
					background: #FFD785;
					left: 50%;
					bottom: 6rpx;
					transform: translateX(-50%);
				}
			}
		}
	}
	.tips{
		line-height: 95rpx;
		padding: 0 30rpx;
		font-size: 30rpx;
		color: #C0C0C0;
	}
	.li-item{
		background-color: $theme-dark-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 110rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #4F4D4D;
		font: 30rpx;
		input{
			background: #211d1e;
			border-radius: 4rpx;
			line-height: 90rpx;
			height: 90rpx;
			padding: 0 20rpx;
			text-align: center;
		}
	}
	.li-item-img{
		background-color: $theme-dark-color;
		padding: 0 30rpx 40rpx;
		&.li-item-img-tips{
			margin-top: 18rpx;
			.li-item-img-c{
				width: 300rpx;
				height: 300rpx;
				flex-shrink: 0;
				background: #525252;
				border-radius: 20rpx;
				text-align: center;
				color: #C0C0C0;
				view{
					margin-top: 40rpx;
					font-size: 150rpx;
				}
				text{
					font-size: 26rpx;
				}
			}
		}
		.li-item-img-t{
			line-height: 150rpx;
			text{
				font-size: 26rpx;
				color: #929191;
			}
		}
		image{
			width: 300rpx;
			height: 300rpx;
			background: #525252;
			flex-shrink: 0;
			border-radius: 20rpx;
		}
	}
	.li-button{
		margin: 34rpx 0 50rpx;
		padding: 0 30rpx;
		button{
			&::after{
				display: none; 
			}
			border-radius: 6rpx;
			color: $white;
			background: $trans-color;
		}
	}
</style>
