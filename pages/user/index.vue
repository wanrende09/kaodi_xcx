<template>
	<view class="content unify-relative">
		<!-- #ifdef H5 -->
		<u-navbar title="个人中心" leftIcon="" bgColor="none" :titleStyle="titleStyle"></u-navbar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar title="个人中心" :leftIcon="none" bgColor="none" :titleStyle="titleStyle"></u-navbar>
		<!-- #endif -->
		<image src="../../static/userBg.png" class="bg"></image>
		<!--  -->
		<view class="userContent">
			<view class="userContentFlex">
				<!-- 用户信息 -->
				<view class="userInfo">
					<image src="../../static/logo.png" class="userImage"></image>
					<view class="userRight">
						<view class="userName">合肥烤帝·专业烤腿</view>
						<view class="userAddress">{{userInfo.store.shopname}}</view>
					</view>
				</view>
				<!-- 用户收入 -->
				<view class="userIncome">
					<view class="userIncomeTop">
						<view class="topText1">
							<view>今日营业额（元）</view>
							<view class="topText1Num">{{statistics[0].value}}</view>
						</view>
						<image src="../../static/user1.png" class="topImg"></image>
						<view class="topText2">
							<view>昨日营业额</view>
							<view class="topText1Num1">{{statistics[1].value}}</view>
						</view>
						<view class="topText3">
							<view>耗损</view>
							<view class="topText1Num1">{{statistics[2].value}}</view>
						</view>
						<view class="topText4">
							<view>耗损率</view>
							<view class="topText1Num1">{{statistics[3].value}}%</view>
						</view>
					</view>
				</view>
				<!-- 生意报表 -->
				<view class="userReport">
					<view class="userReportTop">
						<image src="../../static/user2.png" class="reportImg"></image>
						<view class="reportText">生意报表</view>
						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
					<view class="charts-box">
						<qiun-data-charts type="column" background="#19233e" :opts="opts" :chartData="chartData"
							:ontouch="true" />
					</view>
				</view>



				<!-- 用户操作菜单 -->

				<view class="user-operation-menu unify-background-color unify-radius">
					<view class="user-operation-menu-item unify-flex" @tap="jump('/pages/my/project')">
						<view class="left unify-flex">
							<!-- <view class="iconfont el-icon-shouye"></view> -->
							<image src="../../static/user3.png" class="operationImg"></image>
							<view class="unify-weight">进货</view>
						</view>

						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
					<view class="user-operation-menu-item unify-flex" @tap="jump('/pages/my/statistics')">
						<view class="left unify-flex">
							<!-- <view class="iconfont el-icon-shouye"></view> -->
							<image src="../../static/user4.png" class="operationImg"
								style="width: 36rpx;height: 36rpx;"></image>
							<view class="unify-weight">统计</view>
						</view>

						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
					<view class="user-operation-menu-item unify-flex" @tap="jump('/pages/my/escalation')">
						<view class="left unify-flex">
							<!-- <view class="iconfont el-icon-shouye"></view> -->
							<image src="../../static/user5.png" class="operationImg"
								style="width: 36rpx;height: 34rpx;"></image>
							<view class="unify-weight">上报数据</view>
						</view>

						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>

					<view class="user-operation-menu-item unify-flex" @tap="jump('/pages/my/message')">
						<view class="left unify-flex">
							<image src="../../static/user7.png" class="operationImg"
								style="width: 36rpx;height: 36rpx;"></image>
							<view class="unify-weight">消息列表</view>
						</view>

						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
					<view class="user-operation-menu-item unify-flex" @tap="jump('/pages/my/inventory')">
						<view class="left unify-flex">
							<image src="../../static/user8.png" class="operationImg"
								style="width: 36rpx;height: 38rpx;"></image>
							<view class="unify-weight">剩余库存</view>
						</view>
					
						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @click="exit()">退出登录</view>
		<view class="zw"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					color: "#fff"
				},
				iconHead: this.$mAssetsPath.iconHead,
				userBg: this.$mAssetsPath.userBg, // 顶部背景装饰
				userOperationMenu: this.$mConstDataConfig.userOperationMenu, // 用户操作菜单
				userInfo: {
					nickname: '',
					mobile: ''
				},
				statistics: [],
				chartData: {},
				opts: {
					fontSize: 10,
					fontColor: "#ffffff",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: true,
					touchMoveLimit: 24,
					legend: {
						show: false
					},
					xAxis: {
						fontSize: 10,
						disableGrid: true,
						titleFontColor: "#fff",
						fontColor: "#fff",
						itemCount: 4

					},
					yAxis: {
						disabled: false,
						showTitle: false,
						data: [{
							min: 0,
							axisLine: false,
							calibration: false
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 10,
							activeBgColor: "#ffffff",
							activeBgOpacity: 0.08
						}
					}
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.userInfoCilck()
		},
		methods: {
			// getServerData() {
			// 	//模拟从服务器获取数据时的延时
			// 	setTimeout(() => {
			// 		//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			// 		let res = {
			// 			categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
			// 			series: [{
			// 				name: "目标值",
			// 				data: [35, 36, 31, 33, 13, 34]
			// 			}]
			// 		};
			// 		this.chartData = JSON.parse(JSON.stringify(res));
			// 	}, 500);
			// },
			// 用户信息
			userInfoCilck() {
				this.$https({
					url: 'api/erp/user/info',
					method: 'POST',
					success: res => {
						console.log("用户信息", res)
						this.userInfo = res.data
						this.getStatistics()
					}
				})
			},
			//统计数据
			getStatistics() {
				this.$https({
					url: 'api/erp/user/statistics',
					method: 'GET',
					success: res => {
						console.log("统计数据", res)
						this.statistics = res.data.statistics
						const arr = []
						res.data.chart.forEach(value => arr.push(value.date))
						const arr1 = []
						res.data.chart.forEach(value => arr1.push(value.value))
						console.log("arr", arr)
						let res1 = {
							categories: arr,
							series: [{
								name: "目标值",
								data: arr1
							}]
						}
						this.chartData = JSON.parse(JSON.stringify(res1));
					}
				})
			},
			// 操作
			jump(e) {
				uni.navigateTo({
					url: e
				})
			},
			// 退出登录
			exit() {
				uni.clearStorage();
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		},
		// #ifdef APP-PLUS
		onBackPress(e) {
			uni.showModal({
				content: '确定要退出程序？',
				success: res => {
					if (res.confirm) {
						// 退出当前应用，改方法只在App中生效
						plus.runtime.quit();
					}
				}
			})
			return true;
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	// 顶部背景
	.bg {
		width: 100%;
		height: 360rpx;
	}

	.userContent {
		position: sticky;
		margin-top: -102rpx;
		width: 100%;
		height: auto;
		background: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;

		.userContentFlex {
			padding: 26rpx 30rpx;

			.userInfo {
				display: flex;

				.userImage {
					width: 104rpx;
					height: 104rpx;
					border-radius: 100%;
				}

				.userRight {
					margin-left: 28rpx;

					.userName {
						font-size: 32rpx;
						font-family: PingFang SC-Heavy, PingFang SC;
						font-weight: 800;
						color: #222222;
						margin-top: 4rpx;
					}

					.userAddress {
						margin-top: 10rpx;
						font-size: 26rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}

			}

			// 用户收入
			.userIncome {
				margin-top: 34rpx;
				width: 100%;
				height: 175rpx;
				background: #19233E;
				border-radius: 20rpx;
				color: #fff;
				font-size: 26rpx;
				padding-top: 1rpx;

				.userIncomeTop {
					display: flex;
					justify-content: space-between;
					margin-top: 34rpx;
					padding: 0 28rpx;

					.topImg {
						width: 34rpx;
						height: 24rpx;
						margin-top: 6rpx;
						margin-right: 10rpx;
					}

					.topText1 {
						text-align: center;

						.topText1Num {
							font-size: 40rpx;
							font-family: DIN-Bold, DIN;
							font-weight: 500;
							color: #FF1D1D;
							margin-top: 20rpx;
						}
					}

					.topText2 {
						text-align: center;

					}

					.topText3 {
						text-align: center;
					}

					.topText4 {
						text-align: center;
					}

					.topText1Num1 {
						font-size: 32rpx;
						font-family: DIN-Bold, DIN;
						font-weight: 500;
						color: #FFFFFF;
						margin-top: 20rpx;
					}
				}
			}

			// 生意报表
			.userReport {
				width: 100%;
				height: 340rpx;
				background: #19233E;
				border-radius: 20rpx;
				margin-top: 22rpx;
				overflow: hidden;

				.userReportTop {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 14rpx;
					color: #fff;

					.reportImg {
						width: 30rpx;
						height: 30rpx;
						display: block;
					}

					.reportText {
						font-size: 24rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-left: 14rpx;
					}

					.iconfont {
						font-size: 24rpx;
					}
				}

				.charts-box {
					width: 100%;
					height: 274rpx;
				}
			}


			// 用户操作菜单
			.user-operation-menu {
				margin-top: 20rpx;
				font-size: $uni-font-size-base;

				.user-operation-menu-item {
					height: 96rpx;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2rpx solid rgba($color: $uni-border-color, $alpha: .3);
				}

				.operationImg {
					width: 36rpx;
					height: 30rpx;
					margin-right: 16rpx;
				}

				.left {
					align-items: center;

					.iconfont {
						font-size: 40rpx;
						margin-right: 20rpx;
					}
				}

				.user-operation-menu-item:last-child {
					border-bottom: none;
				}

				.iconfont {
					color: $uni-text-color-grey;
				}
			}




		}
	}

	.footer {
		width: 260rpx;
		height: 80rpx;
		background: #FF1D1D;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		margin: 30rpx auto;
		border-radius: 40rpx;
	}

	.zw {
		width: 100%;
		height: auto;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
