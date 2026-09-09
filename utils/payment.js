/**
 * 调用示例：
 * this.$mPayment({
 * 	data: res.data.options,
 *  type: 0, // 0小程序微信支付     1app支付宝、微信支付
 * 	success: res => {
 * 		console.log(res)
 * 	},
 * 	fail: err => {
 * 		uni.showModal({
 * 			title: '取消支付',
 * 			content: '确认取消该订单？',
 * 			confirmText: '确认',
 * 			success: res => {
 * 				if(res.confirm) {
 * 					this.$openPage('orderList')
 * 				}
 * 			}
 * 		})
 * 	}
 * })
 */

module.exports = (params) => { // 类型参数type   0小程序微信支付   1app支付宝、微信支付
	if (params.type === 0) {
		uni.requestPayment({
			nonceStr: params.data.nonceStr,
			package: params.data.package, // 这里的值必须是 prepay_id=XXXXXXXXX 的格式，否则也会报错
			signType: params.data.signType,
			timeStamp: params.data.timeStamp, // 时间戳必须是字符串，否则会报错
			paySign: params.data.paySign,
			success: res => {
				// 这里应该是 res.errMsg , 跟公众号的支付返回的参数不一样，公众号是 err_msg, 就因为没注意到这个，折腾了很长时间
				typeof params.success == "function" && params.success(res);
			},
			fail: err => {
				typeof params.fail == "function" && params.fail(err);
			},
			complete: res => {
				typeof params.complete == "function" && params.complete(res);
				// console.log('paycomplete-->', res)
				return false
			}
		})
	} else {
		uni.requestPayment({
			provider: params.provider,
			orderInfo: params.data,
			success: function(res) {
				typeof params.success == "function" && params.success(res);
			},
			fail: function(err) {
				uni.showToast({
					title: err,
					icon: 'none'
				})
				typeof params.fail == "function" && params.fail(err);
			},
			complete: res => {
				uni.showToast({
					title: res,
					icon: 'none'
				})
				console.log('paycomplete1-->', res)
				typeof params.complete == "function" && params.complete(res);
				return false
			}
		})
	}
}
