<script>
	/* eslint-disable */
	import Vue from 'vue';
	
	export default {
		async onLaunch() {
			await this.initData();
		},
		methods: {
			// 初始化数据
			async initData() {
				uni.setTabBarStyle({
					selectedColor: this.themeColor.color,
					borderStyle: 'white'
				});

				this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
					uni.setTabBarItem({
						index,
						selectedIconPath
					});
				});
				
				// 获取系统信息
				await this.initSystemInfo();
			},
			
			// 初始化系统信息
			initSystemInfo() {
				uni.getSystemInfo({
					success: res => {
						Vue.prototype.windowHeight = res.windowHeight;
						Vue.prototype.windowWidth = res.windowWidth;
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	@import url("/static/css/iconfont.css");
	@import url("/static/css/mall-base.css");
	@import url("/static/css/main.css");
	@import "@/uni_modules/uview-ui/index.scss";
	/* 全局设置背景 */
	page {
		background-color: #fff;
		color: #333333;
		font-family: "Alibaba Puhuiti Ping Fang";
		letter-spacing: 1rpx;
	}
	
	/* 全局隐藏滚动条 */
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		color: transparent;
	}
</style>
