import Vue from 'vue'
import Vuex from 'vuex'
import $mConstDataConfig from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';

Vue.use(Vuex)

/**
 * 页面使用：import { mapState, mapMutations } from 'vuex'  引入
 * computed: mapState(['authLogin', 'userInfo'])
 * methods: ...mapMutations(['login']),
 * 实时更新用户状态函数: onMain(user) {this.login(user)},
 */

const THEMECOLOR = uni.getStorageSync('themeColor');
const GLOBALCONFIG = uni.getStorageSync('globalConfig') || {};

const store = new Vuex.Store({
	state: { // 存放状态
		authLogin: false, // 登录状态
		userInfo: { // 用户信息
			userId: '', // 用户ID
			phone: '', // 手机号
			encryptPhone: '', // 加密手机号
			nickName: '', // 用户名
			avatarUrl: '', // 微信头像URL
			referrer: '', // 推荐人
			openId: '', // 微信小程序openid
			token: '', // 登录凭证token
		},
		themeColor: THEMECOLOR, // 主题
		globalConfig: GLOBALCONFIG,	// 全局配置
	},
	getters: {
		// 全局配置
		themeColor: state => {
			let theme = state.themeColor;
			if (!theme) {
				theme = $mConstDataConfig.themeList.filter((item) => item.name === ($mSettingConfig
					.styleType || 'df'))[0];
			}
			return theme;
		},
		// 全局配置
		globalConfig: state => {
			return state.globalConfig;
		},
	},
	mutations: {
		login(state, user) { // 登录
			state.authLogin = true;
			state.userInfo.userId = user.userId || '';
			state.userInfo.phone = user.phone || '';
			state.userInfo.encryptPhone = user.encryptPhone || '';
			state.userInfo.nickName = user.nickName || '';
			state.userInfo.avatarUrl = user.avatarUrl || '';
			state.userInfo.referrer = user.referrer || '';
			state.userInfo.openId = user.openId || '';
			state.userInfo.token = user.token || '';
		},
		logout(state) { // 退出
			state.authLogin = false;
			uni.removeStorage({
				key: 'userInfo'
			})
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; // 当前页面
			let prevPage = pages[pages.length - 2]; // 上一页面
			if (prevPage) {
				uni.navigateBack()
			} else {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		setThemeColor(state, val) {
			state.themeColor = val;
			uni.setStorageSync('themeColor', val);
		}
	}
})

export default store
