import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LangEn from './lang/en.js'
import LangChs from './lang/zhCH.js'
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale:  uni.getStorageSync('lang') || 'chs',
    messages: {
        'en': LangEn,
        'chs' : LangChs
    }
});

export default i18n