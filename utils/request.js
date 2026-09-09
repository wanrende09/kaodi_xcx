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
		if (method == "POST" || "GET") {
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
		dataType: 'json', // 'json' : 'sting'
		sslVerify: false,
		method: method || "GET",
		header: header,
		success: res => {
			console.log("接口请求",res)
			if (res.statusCode === 401) {
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
			typeof params.success == "function" && params.success(res.data);
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