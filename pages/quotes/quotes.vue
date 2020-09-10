<template>
	<view class="content">
		<block v-for="(item,index) in list" :key="index">
			<market-list :item="item" :index="index"></market-list>
		</block>
		<load v-if="showload"></load>
	</view>
</template>

<script>
	import {pageto, showToast, fetch, _updataTabBar, forceUpdate} from '@/common/js/util.js';
	import {mapGetters,mapMutations} from "vuex";
	import marketList from '@/components/common/market-list.vue';
	import load from '@/components/common/load.vue';
	export default {
		components:{
			marketList,load
		},
		data() {
			return {
				showload:false,
				list:[]
			};
		},
		onShow() {
			this.getMarket()
		},
		methods:{
			getMarket(){
				this.showload = true
				fetch('/api/wallet/getCoinMarket',{},'post')
					.then(res=>{
						this.showload = false
						if(res.data.code){
							this.list = res.data.data;
							this.list.forEach((item,index)=>{
								this.list[index].title_en = item.coin;
								this.list[index].balance = item.last;
								this.list[index].usd_price = item.last;
								this.list[index].zdfisshow = true;
								if(item.percentChange>=0){
									this.list[index].zdf = item.percentChange + '%';
									this.list[index].type = true
								}else{
									this.list[index].zdf = -(item.percentChange) + '%';
									this.list[index].type = false
								}
							})
						}
					})
					.catch(err=>{
						this.showload = false
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 20upx 30upx;
	}
</style>
