/*
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 * type			跳转的方式 ['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']  不传默认navigateTo
 */
import minRouterConfig from './min.router.config.js'

const router = new minRouterConfig({
	routes: [ // 权限路由 在main.js可实现路由拦截 所以路由都需要注册
		{ // 首页
			name: 'index',
			path: 'pages/index/index',
			type: 'switchTab'
		},
		{ // 个人中心
			name: 'user',
			path: 'pages/user/index',
			type: 'switchTab'
		},
		{ // 登录
			name: 'login',
			path: 'pages/login/login',
			type: 'reLaunch'
		}
	]
})

export default router
