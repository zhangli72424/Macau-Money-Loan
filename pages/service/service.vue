<template>
	<view>
		<load v-if="showLoadings"/>
	</view>
</template>

<script>
	import Load from '@/components/common/load.vue';
	import {pageto, showToast, fetch, updownLine, forceUpdate, diff_txt, _updataTabBar} from '@/common/js/util.js'
	import {mapGetters, mapMutations} from 'vuex' 
	export default {
		data() {
			return {
				showLoadings:false,
				code_img:'',
				kefuweixin:''
			};
		},
		onShow(){
			this.getKefu()
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
				'getTextArr',
				'getFirstTeam'
			])
		},
		methods:{
			getKefu(){
				fetch('/api/User/kefu',{},'post')
					.then(res=>{
						if(res.data.code==1){
							this.code_img = res.data.data.code_img
							this.kefuweixin = res.data.data.kefuweixin
						}
					})
					.catch(err=>{
						
					})
			}
		}
	}
</script>

<style lang="scss">

</style>
