import $mAssetsPath from '@/config/assets.config.js'

/**
 * 相同数据统一管理，避免每个页面都需要定义，该数据挂载到Vue原型中
 * 页面使用：this.$mConstDataConfig.appName
 */

export default {
	// 应用名称
	appName: '单商家',

	// 金额符号
	moneySymbol: '￥',

	// 评价导航-菜单
	appraiseNavMenu: [{
		id: 0,
		name: '全部'
	}, {
		id: 1,
		name: '最新'
	}, {
		id: 2,
		name: '有图',
		value: '0'
	}, {
		id: 3,
		name: '',
		value: '0'
	}, {
		id: 4,
		name: '',
		value: '0'
	}],

	// 确认订单-菜单
	affirmOrderMenu: {
		optionMenu: [{
			id: 0,
			name: '外卖配送'
		}, {
			id: 1,
			name: '到店自取'
		}],
		from1: [{
			id: 0,
			name: '打包费',
			value: '3'
		}, {
			id: 1,
			name: '配送费',
			value: '3',
			discounts: ''
		}],
		from2: [{
			id: 0,
			name: '备注',
			value: '',
			desc: '推荐使用无接触配送',
			url: 'goodsAffirmNoteAdd',
			placeholder: '无接触配送，将商品挂家门口或放前台，地址封闭管理时请电话联系'
		}, {
			id: 1,
			name: '餐具数量',
			value: '',
			desc: '请选择',
			optionMenu: [{
				id: 0,
				name: '商家按餐量提供'
			}, {
				id: 1,
				name: '1',
				unit: '份'
			}, {
				id: 2,
				name: '2',
				unit: '份'
			}, {
				id: 3,
				name: '3',
				unit: '份'
			}, {
				id: 4,
				name: '4',
				unit: '份'
			}, {
				id: 5,
				name: '5',
				unit: '份'
			}, {
				id: 6,
				name: '6',
				unit: '份'
			}, {
				id: 7,
				name: '7',
				unit: '份'
			}]
		}]
	},

	// 个人中心-用户操作
	userOperationMenu: [{
		id: 0,
		name: '订单管理',
		icon: 'el-icon-shouye',
		url: 'userOrderList',
		orderMenu: [{ // 订单菜单
			id: 0,
			name: '全部'
		}, {
			id: 1,
			name: '待付款'
		}, {
			id: 2,
			name: '待收货'
		}, {
			id: 3,
			name: '待使用'
		}, {
			id: 4,
			name: '待评价'
		}, {
			id: 5,
			name: '退款/售后'
		}],
		orderMenu1: [ // 订单菜单新
			 {
			id: 1,
			name: '待发款'
		}, {
			id: 2,
			name: '已配货'
		}, {
			id: 3,
			name: '已取消'
		}],
		orderInfo: [{ // 订单信息
			id: 0,
			name: '订单信息'
		}, {
			id: 1,
			name: '订单号',
			value: '6325632563252'
		}, {
			id: 2,
			name: '消费时间',
			value: '2022.04.21 12:21:39'
		}, {
			id: 3,
			name: '付款时间',
			value: '2022.04.21 12:21:39'
		}, {
			id: 4,
			name: '下单时间',
			value: '2022.04.21 12:21:39'
		}, {
			id: 5,
			name: '实付',
			value: '16:00'
		}]
	}, {
		id: 1,
		name: '配送地址',
		icon: 'el-icon-addrpdizhibiaozhunhua',
		url: 'userShippingAddressList',
		form: [{
			id: 0,
			name: '收货地址',
			value: '',
			placeholder: '点击选择',
			disabled: true
		}, {
			id: 1,
			name: '门牌号',
			value: '',
			placeholder: '详细地址，例6号楼16层1601室'
		}, {
			id: 2,
			name: '收货人',
			value: '',
			placeholder: '请填写收货人姓名'
		}, {
			id: 3,
			isSex: 0,
			array: ['先生', '女士']
		}, {
			id: 4,
			name: '手机号',
			value: '',
			placeholder: '请填写收货人手机号'
		}, {
			id: 5,
			name: '标签',
			isLabel: undefined,
			array: ['家', '公司', '学校']
		}]
	}, {
		id: 2,
		name: '联系我们',
		icon: 'el-icon-lianxiwomen'
	}, {
		id: 3,
		name: '关于我们',
		icon: 'el-icon-guanyuwomen'
	}],

	// 主题列表
	themeList: [{
		title: '阳光橙',
		name: 'df',
		color: '#f8785f',
		tabList: [
			'/static/tabBar/index2.png',
			'/static/tabBar/user2.png'
		]
	}, {
		title: '科技蓝',
		name: 'bf',
		color: '#00BFFF',
		tabList: [
			'/static/tabBar/index3.png',
			'/static/tabBar/user3.png'
		]
	}, {
		title: '热情红',
		name: 'rf',
		color: '#ff1d1d',
		tabList: [
			'/static/tabBar/index6.png',
			'/static/tabBar/user6.png'
		]
	}, {
		title: '生鲜绿',
		name: 'xf',
		color: '#42CA4D',
		tabList: [
			'/static/tabBar/index5.png',
			'/static/tabBar/user5.png'
		]
	}]
}
