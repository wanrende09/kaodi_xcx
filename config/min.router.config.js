/**
 * 使用方法
 * 示例：this.$openPage({name: 'my', query: {id: 123}, type: 'navigateTo'})		传参方式
 * 示例 this.$openPage('my')    不传参数可以简写 
 * @param name			字符串地址名
 * @param query			传递的参数
 * @param type			跳转的方式 ['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']  不传默认navigateTo
 * 
 * 
 * this.$parseURL()		解析路由参数
 * 使用方法在接收参数页this.$parseURL(options)
 */

const toString = Object.prototype.toString

function isObject(value) {
	return toString.call(value) === '[object Object]'
}

function isString(value) {
	return toString.call(value) === '[object String]'
}

function isDefault(value) {
	return value === void 0
}

function openPage(args) {
	let name, query = {},
		queryStr = null,
		path, type, isName = false
	switch (true) {
		case isObject(args):
			({
				name,
				query = {}
			} = args)
			break
		case isString(args):
			name = args
			break
		default:
			throw new Error('参数必须是对象或者字符串')
	}
	if (isObject(query)) {
		queryStr = encodeURIComponent(JSON.stringify(query))
	} else {
		throw new Error('query数据必须是Object')
	}
	this.$routerConfig.forEach(item => {
		if (item.name === name) {
			path = item.path
			type = item.type || 'navigateTo'
			isName = true
		}
	})
	if (!isName) {
		throw new Error(`没有${name}页面`)
	}
	if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
		throw new Error(`name:${name}里面的type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`)
	}
	return new Promise((resolve, reject) => {
		uni[type]({
			url: `/${path}?query=${queryStr}`,
			success: resolve,
			fail: reject
		})
	})
}

function parseURL() {
	const query = this.$root.$mp.query.query
	if (query) {
		return JSON.parse(decodeURIComponent(query))
	} else {
		return {}
	}
}

function install(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (!isDefault(this.$options.routerConfig)) {
				Vue._routerConfig = this.$options.routerConfig
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$routerConfig', {
		get: function() {
			return Vue._routerConfig._router
		}
	})
	Object.defineProperty(Vue.prototype, '$parseURL', {
		get: function() {
			return Vue._routerConfig.parseURL
		}
	})
	Object.defineProperty(Vue.prototype, '$openPage', {
		get: function() {
			return Vue._routerConfig.openPage
		}
	})
}

function minRouterConfig(options) {
	if (!(this instanceof minRouterConfig)) {
		throw Error("minRouterConfig是一个构造函数，应该用`new`关键字调用")
	}
	isDefault(options) && (options = {})
	this.options = options
	this._router = options.routes || []
}
minRouterConfig.install = install
minRouterConfig.prototype.openPage = openPage
minRouterConfig.prototype.parseURL = parseURL
export default minRouterConfig
