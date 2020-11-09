<template>
	<view class="content">
		<view class="container">
			<view class="list-t">
				<view>{{title_en}}{{type==1?i18n.recharge:type==2?i18n.Flash_payment:i18n.withdrawal}}</view>
				<text>
				{{info.status==2?i18n.turnDown:info.status==1?i18n.underReview:((info.type==0?(i18n.recharge + i18n.success):info.type==1?(i18n.withdrawal + i18n.success):i18n.success))}}</text>
			</view>
			<view class="list-time">{{info.update_time}}</view>
			<view class="list-c">
				<text>{{type==1?i18n.recharge:type==2?i18n.Flash_payment:i18n.withdrawal}}{{i18n.Amount}}</text>
				<view>{{type=='1'?'+':'-'}}{{ type==2?info.num:info.number}}</view>
			</view>
			<view class="list-c remark">
				<text>{{i18n.remark}}</text>
				<view>{{type==2?info.typeStr:info.remark}}</view>
			</view>
			<view class="list-b" v-if="info.htx">
				<text>{{i18n.hxAddress}}：</text>
				<view>
					{{info.htx}}
				</view>
			</view>
			<view class="copy-btn" v-if="info.htx">
				<button type="default">{{i18n.copy_address}}</button>
			</view>
			<view class="list-l" v-if="info.htx">
				<text>hash：</text>
				<view>
					<qrcode
					:val="info.htx"
					:size="200"
					:lv="3" 
					:onval="true"
					:loadMake="true"
					></qrcode>
				</view>
			</view>
			<view class="list-b" v-if="type!=2">
				<text>{{i18n.paymentAddress}}：</text>
				<view>
					{{info.to}}
				</view>
			</view>
			<view class="list-b" v-if="type!=2">
				<text>{{i18n.fromAddress}}：</text>
				<view>
					{{info.from}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex";
	import {pageto, showToast, fetch, forceUpdate} from '@/common/js/util.js'
	import Qrcode from "../../components/qrcode/qrcode.vue"
	export default {
		components:{
			Qrcode
		},
		data() {
			return {
				info:{},
				type:'',
				title_en:''
			}
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
			]),
		},
		onLoad(e){
			forceUpdate(this.getLangType);
			// console.log(e);
			this.info = JSON.parse(e.info)
			this.type = e.type;
			this.title_en = e.title_en
			if(this.type==1){
				uni.setNavigationBarTitle({
				　　title:'提币记录'
				})
			}else if(this.type==2){
				uni.setNavigationBarTitle({
				　　title:'闪付记录'
				})
			}else{
				uni.setNavigationBarTitle({
				　　title:'充币记录'
				})
			}
			
			// type 0 充币记录  1提币记录  2闪付记录
			console.log(this.info);
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	.content{
		padding: 20upx 30upx;
		.container{
			background-color: #212121;
			border-radius: 20upx;
			padding: 0 30upx 64upx;
			.list-t{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 128upx;
				border-bottom: 1upx solid #929191;
				view{
					font-size: 36upx;
					font-weight: bold;
					color: $white;
				}
				text{
					font-size: 36upx;
					color: #58627D;
				}
			}
			.list-time{
				font-size: 24upx;
				color: #A6A7AB;
				line-height: 60upx;
			}
			.list-c{
				&.remark{
					view{
						color: #58627D;
						border-bottom: 1upx solid #929191;
					}
				}
				text{
					color: $white;
					font-size: 30upx;
					font-weight: bold;
				}
				view{
					margin-top: 20upx;
					color: #15D288;
					font-size: 48upx;
					font-weight: bold;
					padding-bottom: 60upx;
				}
			}
			.list-b{
				padding: 34upx 0 0;
				text{
					font-size: 26upx;
					color: #A6A7AB;
				}
				view{
					margin-top: 20upx;
					background-color: #0f0f0f;
					padding: 26upx 36upx;
					color: $white;
					font-size: 30upx;
					word-break: break-word;
					line-height: 40upx;
				}
			}
			.copy-btn{
				padding: 33upx 0 6upx;
				button{
					width: 160upx;
					height: 50upx;
					text-align: center;
					line-height: 50upx;
					color: $white;
					font-size: 24upx;
					background: $trans-color;
				}
			}
			.list-l{
				padding: 34upx 0 0;
				text{
					font-size: 26upx;
					color: #A6A7AB;
				}
				view{
					margin-top: 20upx;
					text-align: center;
					image{
						width: 200upx;
						height: 200upx;
						flex-shrink: 0;
					}
				}
			}
		}
	}
</style>
