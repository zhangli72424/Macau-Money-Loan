<template>
	<view class="app-setting">
		<view class="list">
			<view class="header" :class="{ lastColor:lvShow}">
				<view class="head-img">
					<image :src="`../../static/image/avatar.png`" mode=""></image>
				</view>
				<p class="fonts">{{name1}}</p>
			</view>
			<view class="menuList">
				<view class="item" @tap="toTeam(3)">
					<view class="_div">直推业绩</view>
					<view class="_p" :class="{ acolor:lvShow}">{{ztyeji?(ztyeji):'0'}}</view>
					
				</view>
				<view class="item">
					<view class="_div">团队人数</view>
					<view class="_p" :class="{ acolor:lvShow}">{{tdrs?(tdrs):0}}</view>
					
				</view>
				
				<view class="item" @tap="toTeam(3)">
					<view class="_div">{{i18n.Team_performance}}</view>
					<view class="_p" :class="{ acolor:lvShow}">{{yeji?(yeji):'0'}}</view>
					
				</view>
			</view>
			
		<!-- 	<view class="lever-tip" v-if="showMesageShow">
				{{message}}
			</view> -->
			
			<view class="level-wrapper">
				<view class="inner-content">
					<mix-tree :list="list"></mix-tree>
				</view>
			</view>
		</view>
		<load v-if="showLoad"></load>
		<!-- <message 
		:shows="showMesageShow" 
		:message="message" 
		@close="closeMessage" 
		@jump="closeMessage"/> -->
	</view>
</template>

<script>
	import Load from '../../components/common/load.vue';
	import {pageto, pageback, fetch, showToast} from "../../common/js/util.js"
	import {mapGetters, mapMutations} from 'vuex';
	import mixTree from '@/components/mix-tree/mix-tree';
	import Message from '@/components/common/message.vue';
	export default{
		data(){
			return{
				message:'',
				showMesageShow:false,
				background:{
					background:"#0669DC"
				},
				showLoad:false,
				ztyeji:'',
				ths:'',
				list: [],
				tdrs: 0,
				yeji: 0,
				ztrs: 0,
				avatar: '',
				yeji1: '',
				yeji2:'',
				name1: '',
				freeze1: '',
				lvShow:false,
				myzt:'',
				tdsl:'',
				ekn_tr:'',
				ekn_xqyj:'',
				xqyj:'',
				dqyj:'',
				zjtr:''
			}
		},
		computed:{
			formatParsefloat(val){
				if ((!val && val != 0) || val == null || val == undefined || val == 'undefined') {
					return 0
				}
				return parseFloat(val)
			},
			i18n () {  
				return this.$t('message')
			},
			...mapGetters([
				'getTextArr',
				'getLangType',
				'getLoginInfo',
				'getRequestUrl',
				'getFirstTeam'
			])
		},
		// onLoad(e) {
			// console.log(e);
			// let infos = JSON.parse(e.item)
			// this.avatar = infos.avatar ? infos.avatar : '';
			// this.yeji1 = infos.yeji;
			// this.name1 = infos.name;
			// this.freeze1 = infos.freeze;
		// },
		onShow(){
			this.showMesageShow = false;
			this.list=null;
			this.list=[];
			if(this.getFirstTeam){
				this._getTeamInfo();
			}
		},
		methods:{
			...mapMutations(['setFirstTeam']),
			closeMessage(){
				this.showMesageShow = !this.showMesageShow
			},
			_getTeam() {
				let _data = {
					id: this.getLoginInfo.id,
					token: this.getLoginInfo.token,
					lang_type: this.getLangType=='chs'?2:1
				}
				// uni.showLoading()
				this.showLoad = true;
				fetch('/api/User/two_user', _data, "post")
					.then(res => {
						this.setFirstTeam(false)
						// uni.hideLoading()
						this.showLoad = false;
						let _tmp = {
								id: this.getLoginInfo.id,
								username: this.getLoginInfo.username,
								name: this.name1,
								yeji2: this.yeji2,
								freeze: this.freeze1,
								tdrs:this.tdrs,
								ekn_tr:this.ekn_tr,
								ekn_xqyj:this.ekn_xqyj,
								ztyeji:this.ztyeji,
								ths:this.ths,
							};
							console.log(_tmp);
						this.list = [_tmp];
						if (res.data.code==1) {
							if (res.data.data.length > 0) {
								this.list = [
									Object.assign(this.list[0], {
										xj: res.data.data
									})
								];
							}
						} else if(res.data.code ==2){
							showToast(res.data.msg)
							uni.navigateTo({
								url:"/pages/login/login"
							})
						}else {
								showToast(res.data.msg);
						}
					}).catch(err=>{
						this.showLoad = false;
					})
			},
			_getTeamInfo() {
				let _data =  {
					id: this.getLoginInfo.id,
					token: this.getLoginInfo.token
				}
				// uni.showLoading()
				this.showLoad = true;
				fetch('/api/User/team', _data, 'post') 
					.then(res => {
						// uni.hideLoading()
						this.showLoad = false;
						if (res.data.code) {
							let {tdrs, yeji, ztrs, myzt, ztyeji, ths, freeze, tdsl, name, ekn_xqyj, ekn_tr, yeji2, ekn_dqyj} = res.data.data;
							this.myzt = myzt;
							this.ztyeji = ztyeji;
							this.ths = ths;
							this.tdrs = tdrs;
							this.yeji = yeji;
							this.ztrs = ztrs;
							this.freeze1 = freeze;
							this.name1 = name;
							this.tdsl = tdsl;
							this.ekn_tr = ekn_tr;
							this.ekn_xqyj = ekn_xqyj;
							this.yeji2 = yeji2;
							this.xqyj = ekn_xqyj;
							this.dqyj = ekn_dqyj;
							this.zjtr = ekn_tr;
							
							if(this.ths<=0){
								this.message = this.getLangType=='chs'?'本帐户未激活，未能享受团队业绩':'This account is not activated and fails to enjoy team performance';
								this.showMesageShow = true;
							}
							
							this._getTeam();
						} else {
							showToast(res.data.msg);
						}
					}).catch(err=>{
						this.showLoad = true;
					})
			}
		},
		components: {
			mixTree,Load,Message
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/variable.scss';
	// page {
	// 	background-color: #f1f1f1;
	// }
	.lever-tip{
		background: $adorn-red;
		color: $white;
		text-align: center;
		line-height: 65rpx;
	}
	.app-setting {
		.list {
			.level-wrapper {
				// background: #181a29;
				padding-top: 1upx;
				.inner-content {
					width: 690upx;
					background:$page-bg-color5;
					border-radius: 10upx;
					margin: 30upx;
					padding: 30upx;
					padding-left: 0;
					overflow: hidden;
					.grade1 {
						.piece {
							padding-left: 48upx !important;
							margin-top: 0 !important;
						}
						.title {
							margin-left: 40upx !important;
							font-weight: bold !important;
							color: $white !important;
						}
						.info {
							margin-left: 40upx !important;
						}
						.btn {
							width: 48upx !important;
							height: 48upx !important;
							font-size: 20px !important;
							bordr-radius: 20upx !important;
						}
					}
					.grade2 {
						margin-left: 78upx;
						&:first-child {
							border: 1px solid red !important;
							background-color: #2daaff !important;
							.vline{
								height: 114upx !important;
								top: -78upx !important;
							}
						}
					}
					.grade3 {
						margin-left: 146upx;
						.vline {
							top: -79upx !important;
							height: 114upx !important;
						}
						.piece {
							padding-left: 0 !important;
						}
					}
					.piece {
						position: relative;
						padding-left: 36upx;
						margin-top: 70upx;
						.btn {
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							width: 36upx;
							height: 36upx;
							border-radius: 10upx;
							color: $default-color;
							background-color: #f00;
							border-radius: 8upx;
							font-size: 16px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.vline {
							position: absolute;
							height: 228upx;
							width: 1upx;
							background-color: #f00;
							left: -52upx;
							top: -192upx;
						}
						.hline {
							position: absolute;
							width: 52upx;
							height: 1upx;
							background-color: #f00;
							left: -52upx;
							top: 33upx;
						}
						.title {
							font-size: 14px;
							color: #626262;
							margin-left: 16upx;
						}
						.info {
							font-size: 10px;
							color: #f00;
							margin-top: 20upx;
							margin-left: 16upx;
						}
						.two {
							width: 50upx;
							height: 26upx;
							font-size: 13px;
							color: rgba(79, 194, 149, 1);
							background-color: rgba(79, 194, 149, .2);
							padding: 4upx 12upx;
							margin-left: 16upx;
							border-radius: 6upx;
						}
						.three {
							width: 50upx;
							height: 26upx;
							font-size: 13px;
							color: rgba(255, 145, 64, 1);
							background-color: rgba(255, 145, 64, .2);
							padding: 4upx 12upx;
							margin-left: 16upx;
							border-radius: 6upx;
						}
					}
				}
			}
			.header{
				display: flex;
				flex-flow:row wrap;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 268upx;
				background: #ab9169;
				&.lastColor{
					background-color: #c4aa6e;
				}
				.head-img{
					width: 144upx;
					height: 144upx;
					background-color: #fff;
					border-radius:72upx;
					text-align: center;
					image{
						width: 144upx;
						height: 144upx;
					}
				}
				.fonts{
					width: 100%;
					text-align: center;
					font-size: 28upx;
					margin-top:-50upx;
					color: #fff;
					font-weight: bold;
				}
			}
			.menuList{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				// height: 176upx;
				justify-content: space-between;
				align-items: center;
				padding-top:44upx;
				padding-bottom:52upx;
				width: 100%;
				background-color: #22211e;
				.item{
					width: 33.33%;
					text-align: center;
					._p{
						font-size: 20px;
						color: $white;
						font-weight: bold;
						&.acolor{
							color:#c4aa6e;
						}
					}
					._div{
						font-size: 14px;
						margin-top: 10upx;
						color: $white;
						margin-bottom: 20rpx;
					}
				}
			}
		}
	}
</style>
