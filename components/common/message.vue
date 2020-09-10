<template>
	<view class="popule-message">
		<view class="popule-pwd-err02" v-if="shows" @tap.stop="''">
			<view class="popule-pwd-err-content">
				<view class="close" @tap.stop="clear"><i class="iconfont icon icon-cha"></i></view>
				<view class="popule-pwd-err-c">
					{{message}}
				</view>
				<view class="popule-pwd-err-nav">
					<view  hover-class="active" class="cancel-class" v-if="showCancel" @tap.stop="jump('cancel')">{{i18n.cancel}}</view>
					<view  hover-class="active" @tap.stop="jump('comfirm')">{{i18n.confirm}}</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="shows" @tap.stop="clear"></view>
	</view>
</template>

<script>
	export default {
		props:{
			showCancel:{
				type: Boolean,
				default: false
			},
			shows:{
				type: Boolean,
				default: false
			},
			message:{
				type: String,
				default: ''
			}
		},
		computed:  {
			i18n() {
				return this.$t('message');
			}
		},
		methods:{
			clear(){
				this.$emit('close',1);
			},
			jump(item){
				if(item=='cancel'){
					this.$emit('close',1);
					return
				}
				this.$emit('jump',1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.popule-message{
		.mask{
			position: fixed;
			top:0;  
			left:0;  
			z-index:8;  
			width:100%;  
			height:100vh;  
			background:rgba(0,0,0,0.4); 
		}
		.popule-pwd-err02{
			position: fixed;
			left: 50%;
			top: 30%;
			transform: translate(-50%);
			z-index: 9;
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
					view{
						line-height: 100upx;
						border-top: 1upx solid #ACACAC;
						flex: 1;
						font-size: 34upx;
						color: $text-gray-color5;
						text-align: center;
						&.cancel-class{
							background: #e3e3e3;
							border-right: 1upx solid #ACACAC;
							&.active{
								background: #d0d0d0;
							}
						}
						&.active{
							background: $trans-color;
							color: $white;
						}
					}
				}
			}
		}
	}
	
</style>
