<template>
	<view>
		<!-- <view class="stock" @click="jump('/pages/my/record')">
			<view class="stockTitle">进货记录</view>
			<image src="../../static/my.png" class="stockImg"></image>
		</view> -->
		<view class="stockContent">
			<view class="stockFlex">
				<view class="stockHx"></view>
				<view class="stockName">商品采购</view>
				<image src="../../static/user3.png" class="stockImg1"></image>
			</view>
			<view class="stockItem" v-for="(item,index) in list" :key="index">
				<view class="dian"></view>
				<view class="stockItemName">
					{{item.goods.name}}<text>（{{item.goods.quantity}}个/{{item.goods.unit}}）</text></view>
				<view class="stockItemRight">
					<view class="rightTop">
						<view class="rightTopInt">
							<input v-model="item.quantity" @input="inputCilck()" type="number" placeholder="请输入数量"
								placeholder-class="int" />
						</view>
						<view class="rightTopText">{{item.goods.unit}}</view>
					</view>
					<view class="rightBootom">
						<view class="rightBootomMoney">
							价格<text>{{item.quantity * item.goods.price * item.goods.quantity  || '0'}}元</text>
						</view>
						<view class="rightBootomNum">共{{item.quantity * item.goods.quantity  || '0'}}个</view>
					</view>
				</view>

			</view>
			<view class="textareaBox">
				<view class="boxText">备注</view>
				<view class="textarea">
					<textarea placeholder="请输入备注" class="taea" placeholder-class="taea1" v-model="remark" />
				</view>
			</view>
		</view>
		<view class="zw"></view>
		<view class="footer">
			<view class="footerText">合计<text>￥{{totalPrice || 0}}元</text></view>
			<view class="footerBtn" @click="confirm()">修改提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1, // 分页
				lastPage: 1, // 最后一页
				totalPrice: '',
				id: '',
				remark:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.postGoods(e.id)
		},
		onReachBottom() {
			if (this.page < this.lastPage) {
				this.page = this.page + 1
				this.postGoods()
			}
		},
		methods: {
			// 操作
			jump(e) {
				uni.navigateTo({
					url: e
				})
			},
			// 可进货商品列表
			postGoods(id) {
				this.$https({
					url: 'api/erp/jinhuo/edit',
					method: 'GET',
					data: {
						id: id
					},
					success: res => {
						console.log("可进货商品列表", res)
						this.lastPage = res.data.lastPage
						this.list = this.list.concat(res.data.goods)
						this.totalPrice = res.data.totalMoney
						this.remark = res.data.remark
					}
				})
			},
			inputCilck() {
				let total = 0
				this.list.forEach((item) => {
					console.log(item)
					total += Number(item.quantity * item.goods.price * item.goods.quantity)
				})
				this.totalPrice = total
			},
			confirm(){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定修改提交吗？',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							that.placeOrder()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			placeOrder() {
				const goods = {}
				this.list.forEach((item, index) => {
					goods[item.goods_id] = Number(item.quantity)
					return JSON.stringify(goods)
				})
				this.$https({
					url: 'api/erp/jinhuo/edit',
					method: 'POST',
					data: {
						id: this.id,
						goods,
						remark:this.remark
					},
					success: res => {
						console.log("tijiao", res)
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						if (res.code == 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)

						}
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.stock {
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
		background: #f4f4f4;

		.stockTitle {
			font-size: 30rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-left: auto;
		}

		.stockImg {
			margin-left: 8rpx;
			margin-right: 38rpx;
			width: 27rpx;
			height: 32rpx;
		}
	}

	.stockContent {
		height: auto;
		padding: 20rpx 30rpx;

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
				height: 30rpx;
				margin-left: 6rpx;
				display: block;
			}
		}

		.stockItem {
			width: 100%;
			height: 136rpx;
			border-bottom: 1rpx solid #dcdcdc;
			display: flex;
			align-items: center;

			.dian {
				width: 10rpx;
				height: 10rpx;
				background: #FF1D1D;
				border-radius: 100%;
			}

			.stockItemName {
				margin-left: 22rpx;
				font-size: 34rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #222222;

				text {
					font-size: 26rpx;
				}
			}

			.stockItemRight {
				width: 320rpx;
				height: auto;
				margin-left: auto;

				.rightTop {
					display: flex;
					align-items: center;

					.rightTopInt {
						display: block;
						width: 260rpx;
						height: 60rpx;
						background: #F4F4F4;
						border-radius: 6rpx 6rpx 6rpx 6rpx;

						input {
							padding: 0 34rpx;
							height: 60rpx;
							font-size: 36rpx;
							font-family: DIN-Bold, DIN;
							font-weight: bold;
							color: #222222;
						}

						.int {
							font-size: 30rpx;
							font-weight: 500;
							color: #999;
						}
					}

					.rightTopText {
						margin-left: auto;
						font-size: 34rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #555555;
					}
				}

				.rightBootom {
					display: flex;
					align-items: center;
					margin-top: 14rpx;

					.rightBootomMoney {
						margin-left: auto;
						font-size: 24rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #888888;

						text {
							font-size: 24rpx;
							font-family: DIN-Bold, DIN;
							font-weight: bold;
							color: #666666;
						}
					}

					.rightBootomNum {
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #888888;
						margin-left: 20rpx;
					}
				}
			}
		}
	}

	.textareaBox {
		padding: 30rpx 0;
		color: #222222;

		.boxText {
			font-size: 34rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: bold;
			color: #222;
			margin-bottom: 20rpx;
		}

		.textarea {
			padding: 20rpx;
			font-size: 30rpx;
			color: #222;
			font-weight: 500;
			height: 200rpx;
			background: #f5f5f5;

			.taea {
				width: 100%;
				height: 100%;
			}

			.taea1 {
				font-size: 30rpx;
				font-weight: 100;
			}
		}
	}

	.zw {
		width: 100%;
		height: 140rpx;
	}

	.footer {
		width: 100%;
		height: auto;
		background: #fff;
		padding: 30rpx 0;
		border-top: 1rpx solid #B6B6B6;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		z-index: 999;

		.footerText {
			font-size: 36rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #000000;
			margin-left: 36rpx;

			text {
				font-size: 36rpx;
				font-family: DIN-Bold, DIN;
				font-weight: bold;
				color: #FF1D1D;
				margin-left: 34rpx;
			}
		}

		.footerBtn {
			width: 272rpx;
			height: 80rpx;
			background: #FF1D1D;
			border-radius: 40rpx;
			font-size: 36rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: auto;
			line-height: 80rpx;
			text-align: center;
			margin-right: 30rpx;
		}
	}
</style>