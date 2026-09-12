/**
 * 封装网络请求
 */

import indexConfig from '@/config/index.config'

module.exports = (params) => {
	let url = '';
	console.log("token",uni.getStorageSync('token'))
	let token = uni.getStorageSync('token'); // 获取token
	url = indexConfig.baseUrl + params.url; // 线上环境中开启
	// let url = "/dpc/" + params.url;									// 本地访问时开启
	let method = params.method;
	let header = params.header || {
		'content-type': 'application/json;charset=utf-8',
		'token': token 
	};
	let data = params.data || {};

	// 请求方式 get post
	if (method) {
		method = method.toUpperCase(); // 小写转大写
		if (method === "POST" || method === "GET") {
			header = {
				'Content-Type': 'application/json',
				'token': token 
			};
		}
	}
	//	发起请求 加载动画
	if (!params.hideLoading) {
		uni.showNavigationBarLoading()
	}

	//	发起网络请求
	uni.request({
		url: url,
		data: data,
		dataType: 'text',
		sslVerify: false,
		method: method || "GET",
		header: header,
		success: res => {
			let responseData = res.data
			if (typeof responseData === 'string') {
				try {
					responseData = JSON.parse(responseData)
				} catch (error) {
					console.error('接口返回的不是 JSON', url, res.statusCode)
					uni.showModal({
						content: '服务器响应异常，请稍后再试~',
						showCancel: false
					})
					typeof params.fail == "function" && params.fail({
						statusCode: res.statusCode,
						message: 'Invalid JSON response'
					})
					return
				}
			}
			console.log("接口请求", responseData)
			if (res.statusCode === 401 || (responseData && Number(responseData.code) === 401)) {
				// this.$openPage({
				// 	name: 'login'
				// })
				console.log(11111)
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return;
			}
			if (res.statusCode && res.statusCode != 200) {
				//	api错误
				uni.showModal({
					// content: res.msg
					content: '网络错误, 请稍后再试~'
				})
				return;
			}
			typeof params.success == "function" && params.success(responseData);
		},
		fail: err => {
			uni.showModal({
				content: '加载失败, 稍后再试~'
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			// console.log("请求完成", e);
			uni.hideNavigationBarLoading()
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}
