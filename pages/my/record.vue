<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="menu-data unify-flex unify-padding unify-background-color unify-ceiling">
			<view class="menu-data-item unify-relative" :style="{'color': tabIndex === item.id? '#333333': ''}"
				v-for="(item,index) in orderMenu" :key="index" @tap="tapMenu(item.id)">
				{{item.name}}

				<view class="menu-surbase unify-absolute" :class="'bg-' + themeColor.name"
					:style="{'width': item.name.length * 23 + 'rpx'}" v-if="tabIndex === item.id"></view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="swiper-list" :style="{'height': windowHeight - 48 + 'px'}">
			<scroll-view scroll-y="true" :style="{'height': windowHeight - 48 + 'px'}" @scrolltolower="tolower">
				<block v-if="list.length>0">
					<view class="list" v-for="(item,index) in list" :key="index">
						<view class="listItem"  @click="jump(item)">
							<block v-if="tabIndex === 1">
								<view class="listItemHx"></view>
								<view class="listItemConter">
									<view class="listItemView">
										<view class="time">{{item.project_name}}进货 · {{item.updatetime_text}}</view>
										<view class="viewRight green">待配送</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货数量</view>
										<view class="viewTwoNum">{{item.totalNum}}</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货总额</view>
										<view class="viewTwoNum">{{item.totalMoney}}元</view>
										<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">运输状态</view>
										<view class="viewTwoAsh">
											<view class="viewTwoAshText">预计明天到达</view>
										</view>
									</view>
								</view>

							</block>
							<block v-if="tabIndex === 2">
								<view class="listItemHx1"></view>
								<view class="listItemConter">
									<view class="listItemView">
										<view class="time">{{item.project_name}}进货 · {{item.updatetime_text}}</view>
										<view class="viewRight red">已配送</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货数量</view>
										<view class="viewTwoNum">{{item.totalNum}}</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货总额</view>
										<view class="viewTwoNum">{{item.totalMoney}}元</view>
										<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">运输状态</view>
										<view class="viewTwoAsh">
											<view class="viewTwoAshText">已送达</view>
										</view>
									</view>
								</view>
							</block>
							<block v-if="tabIndex === 3">
								<view class="listItemHx2"></view>
								<view class="listItemConter">
									<view class="listItemView">
										<view class="time">{{item.project_name}}进货 · {{item.updatetime_text}}</view>
										<view class="viewRight blue">已取消</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货数量</view>
										<view class="viewTwoNum">{{item.totalNum}}</view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">进货总额</view>
										<view class="viewTwoNum">{{item.totalMoney}}元</view>
										<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
									</view>
									<view class="listItemView">
										<view class="viewTwoLeft">运输状态</view>
										<view class="viewTwoAsh">
											<view class="viewTwoAshText">已取消</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="no-data">
						<image class="iconfont" :src="iconRight" mode="widthFix"></image>
						暂无订单
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconRight: this.$mAssetsPath.iconRight,
				orderMenu: [ // 订单菜单新
					{
						id: 1,
						name: '待配送'
					}, {
						id: 2,
						name: '已配送'
					}, {
						id: 3,
						name: '已取消'
					}
				],
				tabIndex: 1,
				list: [],
				windowHeight: 0,
				page: 1,
				lastPage: 0,
				projectId: '',
				projectName: ''
			}
		},
		mounted() {
			console.log("orderMenu", this.orderMenu)
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
		},
		onShow() {
			this.page = 1
			this.list = []
			this.orderList()
		},
		onLoad(options) {
			this.projectId = options.project_id || ''
			this.projectName = options.project_name ? decodeURIComponent(options.project_name) : ''
			if (this.projectName) {
				uni.setNavigationBarTitle({ title: this.projectName + '进货记录' })
			}
		},
		methods: {
			// 跳转页面
			jump(e){
				console.log("eeeee",e)
				uni.navigateTo({
					url:'/pages/my/details?id=' + e.id
				})
			},
			tolower() {
				console.log(11111)
				if (this.page < this.lastPage) {
					this.page = this.page + 1
					this.orderList()
				}
			},
			// 订单列表
			orderList() {
				this.$https({
					url: 'api/erp/jinhuo/index',
					data: {
						status: this.tabIndex,
						page: this.page,
						project_id: this.projectId
					},
					method: 'POST',
					success: res => {
						console.log("xczcxc", res)
						this.lastPage = res.data.last_page
						this.list = this.list.concat(res.data.data)
					}
				})
			},
			// 菜单切换
			tapMenu(e) {
				this.tabIndex = e;
				this.page = 1
				this.list = []
				this.orderList()
				console.log("菜单切换", e)
			},

			// 滑动处理
			change(e) {
				console.log("cxzczc123213", e)
				// this.tabIndex = e.detail.current;
				this.tapMenu(e.detail.current)
				// this.page = 1
				// this.list = []
				// this.orderList()
			}
		}
	}
</script>
<style>
	page {
		background: #f4f4f4 !important;
	}
</style>
<style lang="scss" scoped>
	.red {
		color: #FF1D1D;
	}

	.blue {
		color: #4283FF;
	}

	.green {
		color: #06CD32;
	}

	.top {
		width: 100%;
		height: 20rpx;
	}

	// 菜单
	.menu-data {
		background: #fff;
		height: 48px;
		align-items: center;
		justify-content: space-between;
		font-size: $uni-font-size-sm;

		.menu-data-item {
			flex: 1;
			text-align: center;
			color: $uni-text-color-grey;

			.menu-surbase {
				height: 4rpx;
				bottom: -32rpx;
				left: 0;
				right: 0;
				margin: auto;
			}
		}
	}

	// 列表
	.swiper-list {}

	.swiper-item {
		// margin-top: 10px;
	}

	.no-data {
		margin: 48rpx 0;
		color: #909399;
		display: flex;
		justify-content: center;
		align-items: center;

		.iconfont {
			margin-right: 20rpx;
			width: 50rpx;
			height: 52rpx;
		}
	}

	.list {
		padding: 20rpx 30rpx 0 30rpx;
		margin: 0 auto;

		.listItem {
			width: 100%;
			// height: 248rpx;
			height: auto;
			padding-bottom: 20rpx;
			background: #fff;
			border-radius: 10rpx;
			display: flex;

			.listItemHx {
				width: 16rpx;
				height: 248rpx;
				background: #06CD32;
				border-radius: 10rpx 0rpx 0rpx 10rpx;
			}

			.listItemHx1 {
				width: 16rpx;
				height: 248rpx;
				background: #ff1d1d;
				border-radius: 10rpx 0rpx 0rpx 10rpx;
			}

			.listItemHx2 {
				width: 16rpx;
				height: 248rpx;
				background: #4283FF;
				border-radius: 10rpx 0rpx 0rpx 10rpx;
			}

			.listItemConter {
				width: 616rpx;
				height: auto;
				margin-left: 28rpx;

				.listItemView {
					display: flex;
					align-items: center;
					margin-top: 10rpx;
					.time{
						font-size: 26rpx;
						color: #999;
					}
					.viewRight {
						margin-left: auto;
						margin-top: 8rpx;
						font-size: 34rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
					}

					.viewTwoLeft {
						font-size: 34rpx;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #333333;
					}

					.viewTwoNum {
						font-size: 34rpx;
						font-family: DIN-Bold, DIN;
						font-weight: bold;
						color: #222222;
						margin-left: auto;
					}
					.viewTwoNum1{
						padding: 10rpx 24rpx;
						border-radius: 10rpx;
						background-color: #f39c12;
						color: #fff;
						margin-left: auto;
						
					}
					.viewTwoNum2{
						padding: 10rpx 24rpx;
						border-radius: 10rpx;
						background-color: #f00;
						color: #fff;
						margin-left: auto;
						
					}
					.iconfont {
						width: 20rpx;
						height: 20rpx;
						margin-left: 14rpx;
					}

					.viewTwoAsh {
						width: 450rpx;
						height: 44rpx;
						background: #F4F4F4;
						margin-left: auto;
						margin-top: 5rpx;

						.viewTwoAshText {
							line-height: 44rpx;
							font-size: 30rpx;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #777777;
							margin-left: 10rpx;
						}
					}
				}
			}

		}
	}
</style>
