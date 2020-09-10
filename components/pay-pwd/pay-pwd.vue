<!-- 
自定义验证码输入、密码输入使用
 
使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<view>
		<view class="popule" v-if="isSHow">
			<view class="popule-content">
				<view class="close" @tap.stop="clear"><i class="iconfont icon icon-cha"></i></view>
				<view class="title">
					{{i18n.p_paypwd}}
				</view>
				<view class="pwd-content">
					<input
					    :value="val"
						type="number"
						:focus="isSHow"
						:maxlength="maxlength"
						class="hide-input"
						@input="getVal"></input
					>
					<view :class="['item', { active: codeIndex == 1 }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 1">
							<text class="dot">.</text>
						</block>
						<block v-else>	{{ codeArr[0] ? codeArr[0] : ''}}</block>
					</view>
					<view v-bind:class="['item', { active: codeIndex == 2 }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 2">
							<text class="dot">.</text>
						</block>
						<block v-else>	{{ codeArr[1] ? codeArr[1] : ''}}</block>
					</view>
					<view v-bind:class="['item', { active: codeIndex == 3 }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 3">
							<text class="dot">.</text>
						</block>
						<block v-else>	{{ codeArr[2] ? codeArr[2] : ''}}</block>
					</view>
					<view v-bind:class="['item', { active: codeIndex == 4 }]">
						<view class="line"></view>
						<block v-if="isPwd && codeArr.length >= 4">
							<text class="dot">.</text>
						</block>
						<block v-else>	{{ codeArr[3] ? codeArr[3] : ''}}</block>
					</view>
					<block v-if="maxlength === 6">
						<view v-bind:class="['item', { active: codeIndex == 5 }]">
							<view class="line"></view>
							<block v-if="isPwd && codeArr.length >= 5">
								<text class="dot">.</text>
							</block>
							<block v-else>	{{ codeArr[4] ? codeArr[4] : ''}}</block>
						</view>
						<view v-bind:class="['item', { active: codeIndex == 6 }]">
							<view class="line"></view>
							<block v-if="isPwd && codeArr.length >= 6">
								<text class="dot">.</text>
							</block>
							<block v-else>	{{ codeArr[5] ? codeArr[5] : ''}}</block>
						</view>
					</block>
				</view>
				<view class="pwd-forget" @tap.stop="forget">{{i18n.forget}}？</view>
			</view>
		</view>
		
		<view class="mask"  v-if="isSHow || isShows || isShowss"></view>
		
		
		
		<view class="popule-pwd-err" v-if="isShows">
			<view class="popule-pwd-err-content">
				<view class="close" @tap.stop="clear"><i class="iconfont icon icon-cha"></i></view>
				<view class="popule-pwd-err-c">
					{{i18n.pay_pwd_tip0}}
				</view>
				<view class="popule-pwd-err-nav">
					<view hover-class="active" @tap.stop="forget">{{i18n.forget}}</view><view  hover-class="active" @tap.stop="inputAgain">{{i18n.pay_pwd_requier}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="popule-pwd-err02" v-if="isShowss">
			<view class="popule-pwd-err-content">
				<view class="close" @tap.stop="clear"><i class="iconfont icon icon-cha"></i></view>
				<view class="popule-pwd-err-c">
					{{i18n.pay_pwd_tip1}}
				</view>
				<view class="popule-pwd-err-nav">
					<view  hover-class="active" @tap.stop="clear">{{i18n.confirm}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props:{
			isSHow:{
				type: Boolean,
				default: false
			},
			isPwd:{
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number,
				default: 4
			},
			isShows:{
				type: Boolean,
				default: false
			},
			isShowss:{
				type: Boolean,
				default: false
			}
		},
		computed:  {
			i18n() {
				return this.$t('message');
			}
		},
		data() {
			return {
				codeIndex: 1, //下标
				codeArr: [],
				val:'',//输入框的值
			};
		},
		methods:{
			forget(){
				uni.navigateTo({
					url:"/pages/modify-pwd/modify-pwd"
				})
			},
			//取值
			getVal(e) {
				let { value } = e.detail;
				this.val=value;
				// console.log('验证码:', value);
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				// console.log(this.codeIndex, this.pwdArr);
				if (this.codeIndex > Number(this.maxlength)) {
					//输入完成
					this.$emit('finish',this.codeArr.join(''));
					this.clear('1');
				}
			},
			//清除验证码或者密码
			clear(elemt){
				this.codeIndex=1;
				this.codeArr=[];
				this.val="";
				if(elemt==1){
					this.$emit('close','1');
				}else if(elemt==2){
					this.$emit('close','2');
				}else{
					this.$emit('close',false);
				}
			},
			inputAgain(){
				this.$emit('input-again',true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}
	
	.dot{
		font-size: 80upx;
		line-height: 40upx;
	}
	.mask{
		content: "";
		position: fixed;  
		top:0;  
		left:0;  
		z-index:22;  
		width:100%;  
		height:100vh;  
		background:rgba(0,0,0,0.4);  
	}
	.popule{
		position: fixed;
		left: 50%;
		top: 30%;
		transform: translate(-50%);
		z-index: 24;
		.popule-content{
			background-color: $white;
			border-radius: 20upx;
			width: 640upx;
			padding: 90upx 10upx 54upx;
			position: relative;
			.pwd-forget{
				text-align: right;
				font-size: 26upx;
				color: $theme-color;
				margin-top: 34upx;
			}
			.title{
				text-align: center;
				font-size: 32upx;
				color: #252528;
				margin-bottom: 66upx;
			}
			.close{
				position: absolute;
				right: 30upx;
				top: 30upx;
				color: #a6a7ab;
			}
			.pwd-content{
				display: flex;
				flex-wrap: wrap;
				position: relative;
				justify-content: center;
				.hide-input {
					position: absolute;
					top: 0;
					left: -100%;
					width: 200%;
					height: 100%;
					text-align: left;
					z-index: 9;
					opacity: 1;
				}
				.item {
					position: relative;
					width: 100upx;
					height: 100upx;
					text-align: center;
					font-size: 30upx;
					font-weight: bold;
					color: #333333;
					line-height: 100upx;
					box-sizing: border-box;
					border: 2upx solid #cccccc;
						&:last-child {
							margin-right: 0;
						}
						&.line{
							display: none;
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							width: 2upx;
							height: 40upx;
							background: $theme-color;
							animation: twinkling 1s infinite ease;
						}
						&.active {
							border-color: $theme-color;
							&.line {
								display: block;
							}
						}
						
				}
			}
		}
	}
	.popule-pwd-err{
		position: fixed;
		left: 50%;
		top: 30%;
		transform: translate(-50%);
		z-index: 24;
		.popule-pwd-err-content{
			background-color: $white;
			border-radius: 20upx;
			width: 640upx;
			padding: 94upx 0 0;
			position: relative;
			overflow: hidden;
			.close{
				position: absolute;
				right: 30upx;
				top: 30upx;
				color: #a6a7ab;
			}
			.popule-pwd-err-c{
				font-size: 34upx;
				color: #333333;
				width: 440upx;
				margin: 0 auto;
				margin-bottom: 56upx;
				text-align: center;
			}
			.popule-pwd-err-nav{
				display: flex;
				align-items: center;
				position: relative;
				border-top: 1upx solid #ACACAC;
				&::after{
					content: "";
					position: absolute;
					left: 50%;
					top: 0;
					transform: translateX(-50%);
					height: 100%;
					width: 2upx;
					background-color: #ACACAC;
				}
				view{
					line-height: 100upx;
					flex: 1;
					font-size: 34upx;
					color: #5631FD;
					text-align: center;
					&:active{
						background: linear-gradient(to right, #7965E0,#562FE8);
						color: $white;
					}
				}
			}
		}
	}
	
	.popule-pwd-err02{
		position: fixed;
		left: 50%;
		top: 30%;
		transform: translate(-50%);
		z-index: 24;
		.popule-pwd-err-content{
			background-color: $white;
			border-radius: 20upx;
			width: 640upx;
			padding: 94upx 0 0;
			position: relative;
			overflow: hidden;
			.close{
				position: absolute;
				right: 30upx;
				top: 30upx;
				color: #a6a7ab;
			}
			.popule-pwd-err-c{
				font-size: 34upx;
				color: #333333;
				width: 440upx;
				margin: 0 auto;
				margin-bottom: 56upx;
				text-align: center;
			}
			.popule-pwd-err-nav{
				display: flex;
				align-items: center;
				position: relative;
				border-top: 1upx solid #ACACAC;
				view{
					line-height: 100upx;
					flex: 1;
					font-size: 34upx;
					color: #5631FD;
					text-align: center;
					&:active{
						background: linear-gradient(to right, #7965E0,#562FE8);
						color: $white;
					}
				}
			}
		}
	}
</style>
