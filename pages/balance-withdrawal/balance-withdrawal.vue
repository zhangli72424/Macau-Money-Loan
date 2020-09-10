<template>
	<view>
		<view class="nav-content">
			<block v-for="(item,index) in RechargeMethod" :key="index">
				<view class="nav-li" :class="{'active':navIndex==index}" @tap.stop="selectNav(index)">{{item.bankname}}</view>
			</block>
		</view>
		
		<view class="tips">
			提现收款信息
		</view>
		<view class="li-item">
			<view>提现方式</view>
			<text>{{methodCur.bankname}}收款</text>
		</view>
		<view class="li-item">
			<view>可提现金额</view>
			<text>{{cur.balance}}</text>
		</view>
		<view class="li-item">
			<view>提现金额</view>
			<input type="text" placeholder="请输入提现金额" v-model="num">
		</view>
		<view class="li-item">
			<view>收款人姓名</view>
			<input type="text" placeholder="请输入收款人姓名" v-model="username">
		</view>
		<view class="li-item">
			<view>收款账号/地址</view>
			<input type="text" placeholder="请输入收款账号/地址" v-model="account">
		</view>
		<view class="li-item more-top">
			<view>验证码</view>
			<view class="li-item-div">
				<input type="text" placeholder="请输入验证码" v-model="yzm">
				<view class="li-input-code-l"><vcode :account="phone"></vcode></view>
			</view>
		</view>
		<view class="li-item ">
			<view>交易密码</view>
			<input type="text" placeholder="请输入交易密码" v-model="paypwd">
		</view>
		
		<view class="li-item">
			<view>备注</view>
			<input type="text" placeholder="请输入备注" v-model="remark">
		</view>
		<view class="li-item-img li-item-img-tips" >
			<view class="li-item-img-t">上传提现二维码</view>
			<view class="li-item-img-c" @tap.stop="uploadimgs">
				<template v-if="!curImg">
					<view>+</view>
					<text>上传提现信息</text>
				</template>
				<template v-if="curImg">
					<image :src="curImg" mode=""></image>
				</template>
			</view>
		</view>
		
		<view class="li-button">
			<button type="default" @tap.stop="getWithdrawal">立即提现</button>
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
	import Vcode from '@/components/vcode/vcode.vue';
	export default {
		components:{
			Load,Message,Vcode
		},
		data() {
			return {
				showLoadings:false,
				showMesss:false,
				meg:'',
				navIndex:0,
				num:'',
				username:'',
				account:'',
				curImg:'',
				paypwd:'',
				code:'',
				yzm:'',
				remark:'',
				RechargeMethod:[],
				methodCur:{},
				cur:{},
				phone:'',
				isok:false
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
				'getTextArr'
			])
		},
		onShow(){
			this.isok = false
			this.phone = this.getLoginInfo.email
			this.getInfo()
		},
		onLoad(e){
			this.cur = JSON.parse(e.info)
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
			getWithdrawal(){
				if(!this.account || this.account==null){
					showToast('请输入收款账号')
					return
				}
				if(!this.num || this.num==null){
					showToast('请输入收款数量')
					return
				}
				if(!this.username || this.username==null){
					showToast('请输入收款人姓名')
					return
				}
				if(!this.curImg || this.curImg==null){
					showToast('请上传收款码')
					return
				}
				if(!this.paypwd || this.paypwd==null){
					showToast('请输入交易密码')
					return
				}
				if(!this.yzm || this.yzm==null){
					showToast('请输入验证码')
					return
				}
				let _data_ = {
					id      : this.getLoginInfo.id,
					token   : this.getLoginInfo.token,
					lang_type : this.getLangType == "chs" ? 1 : 2,
					token_id: this.cur.id,    //默认 1   平台币
					to      : this.account, // 收款账号
					number  : this.num,    // 数量
					from    : this.username,//  收款人姓名
					tx      : this.curImg,//  收款码
					paypwd  : this.paypwd, // 交易密码
					type    : this.methodCur.smsid,
					yzm     : this.yzm, // 验证码
					remark  : this.remark // 备注
				}
				this.showLoadings = true;
				fetch('/api/Wallet/transfer',_data_,'post')
					.then(res=>{
						this.showLoadings = false;
						this.showMesss = true;
						this.meg = res.data.msg
						if(res.data.code==1){
							this.isok = true;
						}
					})
					.catch(err=>{
						this.showLoadings = false;
					})
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
			},
			seeImg(url){
				  uni.previewImage({
					urls: [url],
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
		&.more-top{
			margin-top: 20rpx;
		}
		.li-item-div{
			display: flex;
			align-items: center;
			.li-input-code-l{
				width: 144rpx;
				text-align: center;
			}
		}
		input{
			background: #211d1e;
			border-radius: 4rpx;
			line-height: 90rpx;
			height: 90rpx;
			padding: 0 20rpx;
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
