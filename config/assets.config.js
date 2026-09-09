import indexConfig from './index.config.js'
const PATH = indexConfig.assetsPath

/*
 * 图片静态资源表，所有图片资源路径在这统一管理，不应该写死在页面中，该数据挂载到Vue原型中。
 * 页面使用：this.$mAssetsPath.grid_1
 * CSS背景：应尽量使用:style="" 行内样式设置背景图
 * PATH说明：本地路径或者服务器路径
 *
 * 举例：<image :src="grid_1">  需要在data中映射 grid_1: this.$mAssetsPath.grid_1
 *
 * 特别注意：经测试小程序中不支持 <image :src="$mAssetsPath.grid_1"> 该用法
 */

export default {
	// logo
	appLogo: PATH + '/logo.png',
	
	// 默认头像
	iconHead: PATH + '/icon-head.png',
	
	// 图片加载失败填充
	errorImage: PATH + '/errorImage.jpg',
	
	// 个人中心-顶部装饰
	userBg: PATH + '/user-bg.png',
	
	// 右侧-暂无数据
	iconRight: PATH + '/icon-right.png',
	
	// 更多
	iconMore: PATH + '/icon-more.png',
}
