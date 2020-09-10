<template>
	<view class="app-info">
		<view class="title">
			<!-- #ifdef APP-PLUS -->
			<uni-status-bar bgcolor="transparent"></uni-status-bar>
			<!-- #endif -->
			<view class="title-text">
				{{i18n.Modify_nickname_avatar}}
			</view>
		</view>
		<view class="content">
			<view class="txt">{{i18n.nickname}}</view>
			<view class="inp">
				<input type="text" :placeholder="i18n.p_enter_nikename" v-model="username">
				<text class="iconfont icon-cha" @tap="del('user')"></text>
			</view>
			<!-- 	<view class="txt">{{i18n.modify_phone}}</view>
				<view class="inp">
				<input type="text" :placeholder="i18n.enter_phone" v-model="phone">
				<text class="iconfont icon-cha" @tap="del"></text>-->
			<view class="txt">{{i18n.modifyavatar}}</view> 
			 <view class="imgs">
			 	<image @tap="clickimg(idx)" v-for="(item, idx) in 6" :key="idx" :class="{active: curimg == idx}" :src="'/static/image/avatar'+(idx=='0'?'':idx)+'.png'"></image>
			 </view>
		</view>
		<Btn :txt="i18n.confirm" @tapbtn="rechange"></Btn>
		<load v-if="showLoadings"></load>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import Load from "../../components/common/load.vue"
	import {pageback,showToast,fetch} from '@/common/js/util.js'
	import Btn from '@/components/btn/btn.vue'
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				showLoadings:false,
				username: '',
				phone: '',
				curimg: 0,
				isCheck:false
			}
		},
		onLoad(e){
			uni.setNavigationBarTitle({
				title:`${this.i18n.Modify_nickname_avatar}`
			})
			this.curimg = e.imgCode
			this.username = this.getLoginInfo.nickname;
		},
		methods: {
			clickimg(e) {
				this.curimg = e
			},
			back() {
				pageback()
			},
			rechange(){
				this.showLoadings = true
				let url_ = '/api/User/upname'
				let data = {
					id:this.getLoginInfo.id,
					token:this.getLoginInfo.token,
					nickname:this.username,
					img: this.curimg
				}
				if(this.isCheck) return
				this.isCheck  = true;
				fetch(url_, data, 'POST')
					.then(res=>{
						this.isCheck  = false;
						console.log(res)
						// uni.hideLoading()
						this.showLoadings = false
						showToast(res.data.msg)
						if(res.data.code){
							let obj = {...this.getLoginInfo}
							obj.nickname = this.username;
							this.username = ''
							this.setLoginInfo(obj)
							setTimeout(()=>{
								pageback()
							},500)
						}
					})
					.catch(err=>{
						this.isCheck  = false;
						// uni.hideLoading()
						this.showLoadings = false
						showToast(err.data.msg)
					})
			},
			del(str) {
				if(str == 'user') {
					this.username = ''
					return
				}
				this.phone = ''
			},
			...mapMutations([
				'setLoginInfo'
			])
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			...mapGetters([
				'getRequestUrl',
				'getLang',
				'getLoginInfo'
			])
		},
		components: {
			Btn,
			Load,
			uniStatusBar
		}
	}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.title{
		background: #1D184F;
		color: #FFFEFF;
		.title-text{
			line-height: 78upx;
			text-align: center;
		}
	}
.app-info {
	.content {
		padding: 0 30upx;
		margin-bottom: 150upx;
		.txt {
			margin-top: 50upx;
			font-size: 15px;
			color: $white;
			margin-bottom: 24upx;
		}
		.inp {
			display: flex;
			justify-content: space-between;
			background-color: #ededed;
			border-radius: 10upx;
			input {
				flex: 1;
				width: 690upx;
				height: 88upx;
				font-size: 15px;
				color: #333;
				padding: 0 40upx;
				box-sizing: border-box;
			}
			.iconfont {
				width: 88upx;
				height: 88upx;
				text-align: center;
				color: #5631fd;
				line-height: 88upx;
				font-size: 18px;
			}
		}
		.imgs {
			image {
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
				overflow: hidden;
				margin-right: 48upx;
				margin-bottom: 30upx;
				border: 8upx solid #2B2860;
				&:nth-child(4n) {
					margin-right: 0;
				}
				&.active {
					border: 8upx solid #5631FD;
				}
			}
		}
	}
}
</style>
