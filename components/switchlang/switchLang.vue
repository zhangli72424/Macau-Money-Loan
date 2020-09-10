<template>
	<view class="app-lang" v-if="isSHow" @tap="isClick">
		<view class="content" @tap.stop="">
			<view class="title">{{i18n.select_lang}}</view>
			<view class="langs">
				<view class="lang" @tap="changeLang('chs')" :class="{active: curlang == 'chs'}">{{i18n.chs_chs}}</view>
				<view class="lang" @tap="changeLang('en')" :class="{active: curlang == 'en'}">{{i18n.en_en}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
	props: {
		isSHow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			curlang: 'chs'
		}
	},
	computed: {
		i18n() {
			return this.$t('message')
		},
		...mapGetters([
			'getLangType',
			'getLang'
		])
	},
	created() {
		this.curlang = this.getLangType
	},
	methods: {
		isClick(){
			this.$emit('cancel')
		},
		changeLang(str) {
			this.curlang = str
			this.$emit('cancel')
			this.$i18n.locale = this.curlang
			this.setLangType(str)
		},
		...mapMutations([
			'setLangType'
		])
	}
}
</script>

<style lang="scss">
@import  '@/common/scss/variable.scss';
@import  '@/common/scss/global.scss';
.app-lang {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba($color: $black, $alpha: .3);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	.content {
		width: 600upx;
		background-color: $default-color;
		border-radius: 16upx;
	}
	.title {
		text-align: center;
		height: 90upx;
		line-height: 90upx;
		font-size: 14px;
		color: $white;
	}
	.langs {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 56upx 46upx 50upx;
		border-top: 1upx solid #525050;
		.lang {
			width: 156upx;
			height: 66upx;
			background: #E9E9F4;
			border-radius: 10upx;
			text-align: center;
			line-height: 66upx;
			color: #666;
			margin-bottom: 20upx;
			font-size: 14px;
			&.active {
				background: $trans-color !important;
				color: $white;
			}
		}
		.lang + .lang {
			margin-left: 20upx;
		}
	}
}
</style>
