<script>
	import {mapGetters, mapMutations} from 'vuex' 
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			// this.exit();
		},
		methods:{
			...mapMutations(['setLoginInfo']),
			exit(){
				this.setLoginInfo('');
			}
		}
	}
</script>

<style>
	@import "./common/css/animate.css";
	@import '/static/font/font.css';
	@import '/common/css/common.css';
	/*每个页面公共css */
	page{
		background-color: #0f0f0f;
		color: #FFFFFF;
	}
</style>
