import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 引入全局存储
import store from '@/store'

// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js'
import $mConstDataConfig from '@/config/constData.config.js'
import $mSettingConfig from '@/config/setting.config.js'
import minRouterConfig from '@/config/min.router.config.js'
import routerConfig from '@/config/router.config.js'
import $mUtils from '@/utils/utils.js'
import $https from '@/utils/request.js'
import $mFilter from '@/utils/filter.js'
import $mPayment from '@/utils/payment.js'
import $mHelper from '@/utils/helper.js'

Vue.config.productionTip = false

// 挂在全局自定义方法/配置
Vue.prototype.$store = store;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mSettingConfig = $mSettingConfig;
Vue.prototype.$mUtils = $mUtils;
Vue.prototype.$https = $https;
Vue.prototype.$mFilter = $mFilter;
Vue.prototype.$mPayment = $mPayment;
Vue.prototype.$mHelper = $mHelper;
// 引入uview
import uView from "@/uni_modules/uview-ui";
Vue.use(uView);

App.mpType = 'app'

Vue.mixin({
	computed: {
		themeColor: {
			get () {
				return store.getters.themeColor;
			},
			set (val) {
				store.state.themeColor = val;
			}
		}
	}
});

Vue.use(minRouterConfig)

const app = new Vue({
    ...App,
	store,
	routerConfig
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
	store
  }
}
// #endif