<template>
	<view>
		<view class="menu-data unify-flex unify-padding unify-background-color unify-ceiling">
			<view class="menu-data-item unify-relative" :style="{'color': tabIndex === item.id? '#333333': ''}"
				v-for="(item,index) in orderMenu" :key="index" @tap="tapMenu(item.id)">
				{{item.name}}

				<view class="menu-surbase unify-absolute" :class="'bg-' + themeColor.name"
					:style="{'width': item.name.length * 23 + 'rpx'}" v-if="tabIndex === item.id"></view>
			</view>
		</view>
		<view class="calendar" @click="showCilck()" v-if="tabIndex == 4">
			<view v-if="!start_time">选择日期</view>
			<view v-else>{{start_time}}至{{end_time}}</view>
			<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
		</view>
		<view class="conter" v-if="tabIndex != 4">
			<view class="stockFlex">
				<view class="stockHx"></view>
				<view class="stockName">销售情况</view>
				<image src="../../static/user4.png" class="stockImg1"></image>
				<!-- <view class="time">2022/08/22</view> -->
			</view>
			<view class="conterView">
				<view class="conterViewFlex">
					<view class="conterViewText">营业额</view>
					<!-- <image src="../../static/my1.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.income_money || '0'}}元</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">销售量</view>
					<!-- <image src="../../static/my1.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.sell_money|| '0'}}</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">损耗额</view>
					<!-- <image src="../../static/my2.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.depletion_money|| '0'}}元</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">损耗率</view>
					<!-- <image src="../../static/my2.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.haosunlv|| '0'}}%</view>
				</view>
				<view class="stockFlex" style="margin-top: 30rpx;">
					<view class="stockHx"></view>
					<view class="stockName">收款情况</view>
					<image src="../../static/my3.png" class="stockImg2"></image>
					<!-- <view class="time">2022/08/22</view> -->
				</view>
				<!-- 数据 -->
				<view class="box">
					<view class="boxFlex">
						<view class="charts-box">
							<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
						</view>
						<view class="boxFlexRight">
							<view class="rightTitle">营业额</view>
							<view class="rightFlex">
								<view class="dian"></view>
								<!-- <view class="rightFlexBl">{{}}%</view> -->
								<view class="rightFlexMoeny">{{reportStr.income_money|| '0'}}元</view>
							</view>
							<view class="rightTitle">损粍额</view>
							<view class="rightFlex">
								<view class="dian1"></view>
								<view class="rightFlexBl">{{reportStr.haosunlv|| '0'}}%</view>
								<view class="rightFlexMoeny">{{reportStr.depletion_money || '0'}}元</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="stockFlex" style="margin-top: 30rpx;">
				<view class="stockHx"></view>
				<view class="stockName">单品销售排名</view>
				<image src="../../static/my4.png" class="stockImg3"></image>
			</view> -->
			<!-- <view class="salesBox" v-for="(item,index) in list" :key="index">
				<view class="salesBoxFlex">
					<view class="salesNum">{{index + 1}}</view>
					<view class="salesText">{{item.name}}</view>
					<view class="salesRight">
						<view class="salesRightText">销售量</view>
						<view class="salesRightNum">{{item.sales}}</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="conter" v-if="tabIndex == 4 && start_time && end_time">
			<view class="stockFlex">
				<view class="stockHx"></view>
				<view class="stockName">当日销售情况</view>
				<image src="../../static/user4.png" class="stockImg1"></image>
				<!-- <view class="time">2022/08/22</view> -->
			</view>
			<view class="conterView">
				<view class="conterViewFlex">
					<view class="conterViewText">营业额</view>
					<!-- <image src="../../static/my1.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.income_money || '0'}}元</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">销售量</view>
					<!-- <image src="../../static/my1.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.sell_money|| '0'}}</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">损耗额</view>
					<!-- <image src="../../static/my2.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.depletion_money|| '0'}}元</view>
				</view>
				<view class="conterViewFlex">
					<view class="conterViewText">损耗率</view>
					<!-- <image src="../../static/my2.png" class="conterViewImg"></image> -->
					<view class="conterViewMoney">{{reportStr.haosunlv|| '0'}}%</view>
				</view>
				<view class="stockFlex" style="margin-top: 30rpx;">
					<view class="stockHx"></view>
					<view class="stockName">收款情况</view>
					<image src="../../static/my3.png" class="stockImg2"></image>
					<!-- <view class="time">2022/08/22</view> -->
				</view>
				<!-- 数据 -->
				<view class="box">
					<view class="boxFlex">
						<view class="charts-box">
							<qiun-data-charts  type="ring" :opts="opts" :chartData="chartData" :canvas2d="true"/>
						</view>
						<view class="boxFlexRight">
							<view class="rightTitle">营业额</view>
							<view class="rightFlex">
								<view class="dian"></view>
								<!-- <view class="rightFlexBl">{{}}%</view> -->
								<view class="rightFlexMoeny">{{reportStr.income_money|| '0'}}元</view>
							</view>
							<view class="rightTitle">损粍额</view>
							<view class="rightFlex">
								<view class="dian1"></view>
								<view class="rightFlexBl">{{reportStr.haosunlv|| '0'}}%</view>
								<view class="rightFlexMoeny">{{reportStr.depletion_money || '0'}}元</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="stockFlex" style="margin-top: 30rpx;">
				<view class="stockHx"></view>
				<view class="stockName">单品销售排名</view>
				<image src="../../static/my4.png" class="stockImg3"></image>
			</view>
			<view class="salesBox" v-for="(item,index) in list" :key="index">
				<view class="salesBoxFlex">
					<view class="salesNum">{{index + 1}}</view>
					<view class="salesText">{{item.name}}</view>
					<view class="salesRight">
						<view class="salesRightText">销售量</view>
						<view class="salesRightNum">{{item.sales}}</view>
					</view>
				</view>
			</view> -->
		</view>
		<u-calendar :show="show" :defaultDate="calendar.defaultDate" :minDate="calendar.minDate"
			:monthNum="calendar.monthNum" :mode="mode" @confirm="confirm" @close="close"
			allowSameDay="true" style="z-index: 9999;"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderMenu: [ // 订单菜单新
					{
						id: 1,
						name: '日报'
					}, {
						id: 2,
						name: '周报'
					}, {
						id: 3,
						name: '月报'
					}, {
						id: 4,
						name: '自定义'
					}
				],
				type: 'day',
				tabIndex: 1,
				list: [],
				reportStr: {},
				windowHeight: 0,
				page: 1,
				lastPage: 0,
				show: false,
				show1:true,
				mode: 'range',
				calendar: {
					minDate: '',
					maxDate: '',
					defaultDate: '',
					monthNum: 14
				},
				start_time: '',
				end_time: '',
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					rotate: false,
					rotateLock: false,
					color: ["#4283FF", "#fb6464", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					dataLabel: false,
					enableScroll: false,
					legend: {
						show: false,
						position: "right",
						lineHeight: 25
					},
					title: {
						name: "",
						fontSize: 15,
						color: "#666666"
					},
					subtitle: {
						name: "",
						fontSize: 25,
						color: "#7cb5ec"
					},
					extra: {
						ring: {
							ringWidth: 10,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							offsetAngle: -90
						}
					}
				}
			}
		},
		onLoad() {
			this.getReport()
			this.postGoods()
			this.chooseTimed()
		},
		methods: {
			showCilck(){
				this.show = true
			},
			// 设置默认日期，最大值为今天，最小值为去年今天
			chooseTimed() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month <= 9) {
					month = '0' + month;
				}
				if (day <= 9) {
					day = '0' + day;
				}
				let minyear = year - 1;
				this.calendar.minDate = minyear + '-' + month + '-' + day;
				this.calendar.maxDate = year + '-' + month + '-' + day;
				this.calendar.defaultDate = year + '-' + month + '-' + day;
			},
			close() {
				this.show = false
				const that = this
			},
			confirm(e) {
				console.log(e.length);
				this.start_time = e[0]
				this.end_time = e[e.length - 1]
				console.log(e[0], e[e.length - 1])
				this.show = false
				this.getReport()
			},
			// 菜单切换
			tapMenu(e) {
				this.tabIndex = e;
				if (e == 1) {
					this.type = 'day'
					this.getReport()
				} else if (e == 2) {
					this.type = 'week'
					this.getReport()
				} else if (e == 3) {
					this.type = 'month'
					this.getReport()
				} else if (e == 4) {
					this.type = 'custom'
				}
				this.page = 1
			},
			// 固定报表查询
			getReport() {
				this.$https({
					url: 'api/erp/elevate/index',
					method: 'POST',
					data: {
						type: this.type,
						start_time: this.start_time,
						end_time: this.end_time
					},
					success: res => {
						console.log("固定报表查询", res)
						this.reportStr = res.data.saleinfo
						//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
						let res1 = {
							series: [{
								data: [{
									"name": "营业额",
									"value": res.data.saleinfo.income_money
								}, {
									"name": "损粍额",
									"value": res.data.saleinfo.depletion_money
								}]
							}]
						};
						this.chartData = JSON.parse(JSON.stringify(res1));
					}
				})
			},
			// 所有商品列表
			postGoods() {
				this.$https({
					url: 'api/erp/elevate/goods',
					method: 'POST',
					data: {
						page: this.page
					},
					success: res => {
						console.log("所有商品列表", res)
						this.list = res.data
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #f4f4f4 !important;
	}

	.calendar {
		padding: 30rpx;
		display: flex;
		align-items: center;
		background: #fff;
		justify-content: space-between;
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

	.time {
		margin-left: auto;
		font-size: 24rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #777777;
	}

	.conter {
		padding: 30rpx;
		margin-top: 30rpx;
		background: #fff;

		.stockFlex {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 6rpx;

			.stockHx {
				width: 8rpx;
				height: 48rpx;
				background: #FF1D1D;
			}

			.stockName {
				font-size: 34rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #222222;
				margin-left: 14rpx;
			}

			.stockImg1 {
				width: 36rpx;
				height: 36rpx;
				margin-left: 14rpx;
				display: block;
			}

			.stockImg2 {
				width: 36rpx;
				height: 34rpx;
				margin-left: 14rpx;
				display: block;
			}

			.stockImg3 {
				width: 36rpx;
				height: 33rpx;
				margin-left: 14rpx;
				display: block;
				margin-top: 5rpx;
			}
		}

		.conterView {
			width: 100%;
			height: auto;
			border-top: 1rpx solid #dbdbdb;
			margin-top: 30rpx;

			.conterViewFlex {
				width: 100%;
				height: auto;
				display: flex;
				align-items: center;
				margin-top: 30rpx;

				.conterViewText {
					font-size: 30rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
				}

				.conterViewImg {
					width: 14rpx;
					height: 18rpx;
					display: block;
					margin-left: 22rpx;
				}

				.conterViewMoney {
					margin-left: auto;
					font-size: 34rpx;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #333333;
				}
			}
		}

		.box {
			width: 100%;
			height: auto;
			border-top: 1rpx solid #dbdbdb;
			margin-top: 30rpx;

			.boxFlex {
				display: flex;

				.charts-box {
					width: 268rpx;
					height: 268rpx;
					position: relative;
				}

				.boxFlexRight {
					width: 330rpx;
					height: auto;
					margin-left: auto;

					.rightTitle {
						font-size: 34rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-top: 42rpx;
					}

					.rightFlex {
						display: flex;
						align-items: center;
						margin-top: 12rpx;

						.dian {
							width: 22rpx;
							height: 22rpx;
							background: #4283FF;
							border-radius: 100%;
						}

						.dian1 {
							width: 22rpx;
							height: 22rpx;
							background: #FB6464;
							border-radius: 100%;
						}

						.rightFlexBl {
							margin-left: 20rpx;
							font-size: 30rpx;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #666666;
						}

						.rightFlexMoeny {
							font-size: 30rpx;
							font-family: DIN-Bold, DIN;
							font-weight: bold;
							color: #555555;
							margin-left: auto;
						}
					}
				}
			}
		}

		.salesBox {
			width: 100%;
			height: auto;
			margin-top: 30rpx;

			.salesBoxFlex {
				display: flex;
				align-items: center;

				.salesNum {
					font-size: 30rpx;
					font-family: DingTalk JinBuTi-Regular, DingTalk JinBuTi;
					font-weight: 400;
					color: #CF9B4A;
					font-style: italic;
				}

				.salesText {
					font-size: 34rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-left: 20rpx;
				}

				.salesRight {
					margin-left: auto;
					margin-right: 28rpx;

					.salesRightText {
						font-size: 26rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-left: 16rpx;
					}

					.salesRightNum {
						text-align: center;
						font-size: 32rpx;
						font-family: DIN-Bold, DIN;
						font-weight: bold;
						color: #333333;
					}
				}
			}
		}

	}
</style>
