/**
 * 校验手机格式
 */
function checkMobile(mobile) {

	return RegExp(
			/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/)
		.test(mobile);
}

/**
 * 校验身份证号
 */
function checkIDNumber(card) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(card) === false) {
		// alert("身份证输入不合法");
		return false;
	} else {
		return true;
	}
}

/**
 * json数据互转
 * @param {Object} params: json
 * @param {Object} type: 0转字符串、1转json
 */
function jsonParse(params, type) {
	let json;
	switch (type) {
		case 0:
			json = JSON.stringify(params)
			break
		case 1:
			json = JSON.parse(params)
			break
		default:
			break
	}

	return json
}

/**
 * 获取当前时间戳
 */
function nowTimestamp() { // 单位：秒
	let timestamp = new Date().getTime() / 1000;

	return timestamp
}

/**
 * 年月日 时分秒转时间戳
 */
function formatTimestamp(str) {
	let time = new Date(str),
		timestamp = time.getTime() / 1000

	return timestamp
}

/**
 * @param {Object} n：数据转化
 */
function formatNumber(n) {
	n = n.toString()

	return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number, format) {
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	var returnArr = [];

	var date = new Date(number * 1000);
	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));

	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}

	return format;
}

/**
 * @param {Object} d1	开始时间
 * @param {Object} d2	结束时间
 * @param {Object} str   返回结果
 * 使用方法： dateDiff("2021-11-1","2021-11-20","相差Y年M月D天");
 */
function dateDiff(d1, d2, str) {
	d1 = new Date(d1.replace(/-/g, '/'));
	d2 = new Date(d2.replace(/-/g, '/'));
	var obj = {},
		M1 = d1.getMonth(),
		D1 = d1.getDate(),
		M2 = d2.getMonth(),
		D2 = d2.getDate();
	obj.Y = d2.getFullYear() - d1.getFullYear() + (M1 * 100 + D1 > M2 * 100 + D2 ? -1 : 0);
	obj.M = obj.Y * 12 + M2 - M1 + (D1 > D2 ? -1 : 0);
	obj.s = Math.floor((d2 - d1) / 1000); //差几秒
	obj.m = Math.floor(obj.s / 60); //差几分钟
	obj.h = Math.floor(obj.m / 60); //差几小时
	obj.D = Math.floor(obj.h / 24); //差几天  
	return str.replace(/\w/g, function(a) {
		return obj[a] ? obj[a] : a !== 'Y' && a !== 'M' && a !== 'D' ? a : 0
	});
}

/**
 * 随机获取8位数
 */
function randNum() {
	let rand = '';
	for (var i = 0; i < 8; i++) {
		rand += Math.floor(Math.random() * 10);
	}

	return rand
}


/**
 * @param {Object} str: 用户名加密*号代替
 */
function formatName(str) {
	// return new Array(str.length).join('*') + str.substr(-1);		// 显示最后一字其他替换成星号
	return str.substring(0, 1) + new Array(str.length).join('*') // 显示第一个字其他替换成星号
}

/**
 * @param {array}  倒序  反之a.time.localeCompare(b.time)正序
 */
function formatYearsSort(array) {

	return array.sort((a, b) => b.time.localeCompare(a.time))
}

/**
 * 返回上一页 
 */
function overBack() {
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
}

/**
 * 拨打电话
 * @param {Object} value：电话号
 */
function dialingPhone(value) { // 拨打电话函数处理事件
	uni.makePhoneCall({
		phoneNumber: value,
		success: res => {
			console.log('回调成功')
		},
		fail: err => {
			uni.showToast({
				title: err,
				icon: 'none'
			})
		}
	})
}

/**
 * 一键复制
 * @param {Object} str  
 */
function copy(str) {
	uni.setClipboardData({
		data: str, // 要复制的内容
		success: res => { // 复制成功回调函数
			uni.showToast({
				title: '复制成功'
			})
		}
	})
}

/**
 * 一键粘贴
 */

function stickup() {
	return new Promise((resolve, reject) => {
		uni.getClipboardData({
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

/**
 * 防止快速连续点击,节流函数
 */
function throttle(fun, delay) {
	let oadDate = Date.now();
	return function() {
		let _this = this;
		let args = arguments;
		let newDate = Date.now();
		if (newDate - oadDate > delay) {
			fun.apply(_this, args);
			oadDate = Date.now();
		} else {
			uni.showToast({
				title: '请不要频繁点击哦~',
				icon: 'none'
			})
		}
	}
}

/**
 * 根据某字段查找在当前数组所在索引
 */
function arrayIndex(arr, dst) {
	let i = arr.length;
	while ((i -= 1) > -1) {
		if (arr[i].goods_id === dst) {
			return i
		}
	}
	return false
}

/**
 * sku组合算法
 */
function cartesianProductOf() {

	return Array.prototype.reduce.call(arguments, function(a, b) {
		var ret = [];
		a.forEach(function(a) {
			b.forEach(function(b) {
				ret.push(a.concat([b]));
			})
		})
		return ret
	}, [
		[]
	]);
}

// 点击跳转其他小程序
function jumpApplet(params) {
	uni.navigateToMiniProgram({
		appId: params,
		envVersion: 'develop', // develop（开发版），trial（体验版），release（正式版）
		success: res => {
			console.log('打开成功')
		},
		fail: err => {
			console.log('打开失败')
		}
	})
}

/**
 * 数字转换中文
 */
function formatSection(num) {
	let numChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	let arr = (num + '').split('').reverse();
	let str = ''
	for (let i = 0; i < arr.length; i++) { //将0-9转化为零到九
		let char = arr[i] == 0 ? numChar[0] : numChar[arr[i]] //当数字为0时不加权位，非零加权位 
		str = char + str;
	}

	return str
}

/**
 * 贝塞尔曲线
 * 0、以三个控制点为例，点A、B、C，AB上设置点D，BC上设置点E，DE连线上设置点F，则最终的贝塞尔曲线是点F的坐标轨迹
 * 1、计算相邻控制点间距
 * 2、根据完成时间，计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离
 * 3、时间每递增100ms，则D、E在指定方向上发生位移，F在DE上的位移则可通过AD/AB = DF/DE得出
 * 4、根据DE的正余弦值和DE的值计算出F的坐标
 */
function bezier(points, times) {
	// 邻控制点AB点的间距
	var bezier_points = [];
	var points_D = [];
	var points_E = [];
	const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'],
		2));
	// 邻控制BC点间距
	const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'],
		2));
	// D每次在AB方向上移动的距离
	const EACH_MOVE_AD = -(DIST_AB / times);
	// E每次在BC方向上移动的距离
	const EACH_MOVE_BE = -(DIST_BC / times);
	// 点AB的正切
	const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
	// 点BC的正切
	const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
	// 点AB的弧度值
	const RADIUS_AB = Math.atan(TAN_AB);
	// 点BC的弧度值
	const RADIUS_BC = Math.atan(TAN_BC);
	// 每次执行
	for (var i = 1; i <= times; i++) {
		// AD的距离
		var dist_AD = EACH_MOVE_AD * i;
		// BE的距离
		var dist_BE = EACH_MOVE_BE * i;
		// D点的坐标
		var point_D = {};
		point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
		point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
		points_D.push(point_D);
		// E点的坐标
		var point_E = {};
		point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
		point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
		points_E.push(point_E);
		// 此时线段DE的正切值
		var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
		// tan_DE的弧度值
		var radius_DE = Math.atan(tan_DE);
		// 地市DE的间距
		var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']),
		2));
		// 此时DF的距离
		var dist_DF = (dist_AD / DIST_AB) * dist_DE;
		// 此时DF点的坐标
		var point_F = {};
		point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
		point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
		bezier_points.push(point_F);
	}
	return {
		'bezier_points': bezier_points
	};
}


module.exports = {
	checkMobile, // 校验手机格式
	checkIDNumber, // 校验身份证号
	jsonParse, // json数据互转
	nowTimestamp, // 获取当前时间戳
	formatTimestamp, // 年月日 时分秒转时间戳
	formatTime, // 时间戳转化为年 月 日 时 分 秒
	dateDiff, // 计算时间戳相差
	randNum, // 随机获取8位数
	formatName, // 用户名加密*号代替
	overBack, // 返回上一页
	dialingPhone, // 拨打电话
	copy, // 一键复制
	stickup, // 一键粘贴
	throttle, // 防止快速连续点击,节流函数
	arrayIndex, // 根据某字段查找在当前数组所在索引
	cartesianProductOf,
	jumpApplet, // 点击跳转其他小程序
	formatSection, // 数字转换中文
	bezier, //贝塞尔曲线
}
