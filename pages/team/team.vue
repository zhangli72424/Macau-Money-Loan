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
				<view class="item">
					<div>直推人数</div>
					<p :class="{ acolor:lvShow}">{{ztrs?ztrs:'0'}}</p>
					
				</view>
				
				<view class="item" @tap="toTeam(3)">
					<div>团队人数</div>
					<p :class="{ acolor:lvShow}">{{tdrs?tdrs:'0'}}</p>
					
				</view>
				<view class="item">
					<div>业绩</div>
					<p :class="{ acolor:lvShow}">{{yeji?yeji:'0'}}</p>
					
				</view>
				
				<view class="item" @tap="toTeam(3)">
					<div>投资额</div>
					<p :class="{ acolor:lvShow}">{{freeze?freeze:'0'}}</p>
					
				</view>
			
			</view>
			<view class="level-wrapper">
				<view class="inner-content">
					<mix-tree :list="list"></mix-tree>
				</view>
			</view>
		</view>
		<load v-if="showLoad"></load>
	</view>
</template>

<script>
	import Load from '../../components/common/load.vue';
	import {pageto, pageback, fetch, showToast} from "../../common/js/util.js"
	import {mapGetters,mapMutations} from 'vuex';
	import mixTree from '@/components/mix-tree/mix-tree';
	export default{
		data(){
			return{
				showLoad:false,
				list: [],
				tdrs: 0,
				yeji: 0,
				ztrs: 0,
				avatar: '',
				yeji1: '',
				yeji2:'',
				name1: '',
				freeze: '',
				lvShow:false,
				myzt:'',
				tdsl:'',
				ekn_tr:'',
				ekn_xqyj:'',
				xqyj:'',
				dqyj:'',
				zjtr:'',
				lv:''
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
		onShow(){
			this.list=null;
			this.list=[];
			this._getTeamInfo();
			this.isCheck = false
		},
		methods:{
			...mapMutations(['setFirstTeam']),
			_getTeam() {
				if(this.getFirstTeam) return;
				this.setFirstTeam(true)
				let _data = {
					id: this.getLoginInfo.id,
					token: this.getLoginInfo.token,
					lang_type: this.getLangType=='chs'?2:1
				}
				// uni.showLoading()
				this.showLoad = true;
				fetch('/api/User/two_user', _data, "post")
					.then(res => {
						// uni.hideLoading()
						this.showLoad = false;
						let _tmp = {
								id: this.getLoginInfo.id,
								username: this.getLoginInfo.username,
								name: this.name1,
								lv: this.lv,
								freeze: this.freeze,
								yeji:this.yeji
							};
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
							let {tdrs, yeji, ztrs, myzt, lv, freeze, tdsl, name, ekn_xqyj, ekn_tr, yeji2, ekn_dqyj} = res.data.data;
							this.myzt = myzt;
							this.tdrs = tdrs;
							this.yeji = yeji;
							this.ztrs = ztrs;
							this.freeze = freeze;
							this.name1 = name;
							this.tdsl = tdsl;
							this.ekn_tr = ekn_tr;
							this.ekn_xqyj = ekn_xqyj;
							this.yeji2 = yeji2;
							this.xqyj = ekn_xqyj;
							this.dqyj = ekn_dqyj;
							this.zjtr = ekn_tr;
							this.lv=lv;
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
			mixTree,Load
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/variable.scss';
	// page {
	// 	background-color: #f1f1f1;
	// }
	.app-setting {
		.list {
			.level-wrapper {
				// background: #181a29;
				padding-top: 1upx;
				.inner-content {
					width: 660upx;
					background:$theme-dark-color;
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
							color: $white;
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
				background: $trans-color;
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
						border-radius: 72rpx;
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
				background-color: $theme-dark-color;
				.item{
					width: 50%;
					text-align: center;
					p{
						font-size: 20px;
						color: $white;
						font-weight: bold;
						&.acolor{
							color:#c4aa6e;
						}
					}
					div{
						font-size: 14px;
						margin-top: 10upx;
						color: #A6A7AB;
					}
				}
			}
		}
	}
</style>
