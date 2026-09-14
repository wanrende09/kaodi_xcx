<template>
	<view>
		<view class="hx"></view>
		<view class="conter">
			<view class="box">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="boxTime">
						<view class="uni-input">{{date}}</view>
						<image src="../../static/xiala.png" class="boxTimeImg"></image>

					</view>
				</picker>
				<view class="stockFlex">
					<view class="stockHx"></view>
					<view class="stockName">当日销售金额</view>
					<image src="../../static/my5.png" class="stockImg1"></image>
				</view>
				<view class="itemFlex">
					<view class="itemFlexText">收钱吧金额</view>
					<view class="itemFlexInt">
						<input placeholder="自动计算" v-model="money" disabled="false" type="number" />
					</view>
					<view class="itemFlexMoeny">元</view>
				</view>
				<view class="stockFlex">
					<view class="stockHx"></view>
					<view class="stockName">库存余量</view>
					<image src="../../static/my6.png" class="stockImg2"></image>
				</view>
				<view v-if="loadError" class="loadError" @click="postGoods">商品列表加载失败，点击重试</view>
				<view v-else-if="goodsLoaded && visibleGoods.length === 0" class="emptyGoods">暂无可上报商品</view>
				<view class="listFlex" v-for="item in visibleGoods" :key="item.id">
					<view class="dian"></view>
					<view class="listFlexText">{{item.name}}<text>（{{item.quantity}}{{item.base_unit || '个'}}/{{item.unit}}）</text></view>
					<view class="listFlexRight">
						<view class="rightFlex">
							<view class="itemFlexInt">
								<input v-model="item.num" @input="handleInputChange()" type="number" placeholder="请输入数量"
									placeholder-class="int" />
							</view>
							<view class="itemFlexMoeny">{{item.base_unit || '个'}}</view>
						</view>
						<view class="rightBootom">
							<view class="rightBootomText">共{{item.num || '0'}}{{item.base_unit || '个'}}</view>
						</view>
					</view>
				</view>
				<view class="itemFlex" style="padding: 20rpx 0;">
					<view class="itemFlexText">损耗金额</view>
					<view class="itemFlexInt">
						<input placeholder="请输入损耗" v-model="depletion_money" @input="handleInputChange()" type="number" />
					</view>
					<view class="itemFlexMoeny">元</view>
				</view>
			</view>
		</view>
		<view class="zw"></view>
		<view class="footer">
			<view class="footerBtn" :class="{ disabled: !canSubmit }" @click="confirm">立即上报</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				money: '',
				list: [],
				date: currentDate,
				depletion_money: '',
				inputTimer: null,
				goodsLoading: false,
				goodsLoaded: false,
				loadError: false,
				isSubmitting: false,
				calculationVersion: 0
			}
		},
		computed: {
			visibleGoods() {
				return this.list.filter(item => Number(item.show_stock) === 1)
			},
			canSubmit() {
				return this.goodsLoaded && !this.goodsLoading && !this.loadError && !this.isSubmitting &&
					this.visibleGoods.length > 0 &&
					this.visibleGoods.every(item => this.isValidNumber(item.num)) &&
					this.isValidNumber(this.depletion_money) && this.money !== '' && isFinite(Number(this.money))
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onShow() {
			this.postGoods()
		},
		onUnload() {
			if (this.inputTimer) clearTimeout(this.inputTimer)
			this.calculationVersion++
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.detail.value
				this.handleInputChange()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			isValidNumber(value) {
				if (value === '' || value === null || typeof value === 'undefined') return false
				const number = Number(value)
				return isFinite(number) && number >= 0
			},
			buildGoodsPayload() {
				if (!this.visibleGoods.length || !this.visibleGoods.every(item => this.isValidNumber(item.num))) {
					return null
				}
				const goods = {}
				this.visibleGoods.forEach(item => {
					goods[item.id] = Number(item.num)
				})
				return goods
			},
			isGoodsStateError(message) {
				return /不存在|已下架|取消计数|无需上报/.test(message || '')
			},
			showMessage(message) {
				uni.showToast({
					title: message,
					icon: 'none',
					duration: 2000
				})
			},
			handleGoodsLoadError() {
				this.list = []
				this.money = ''
				this.goodsLoading = false
				this.goodsLoaded = false
				this.loadError = true
				this.showMessage('商品列表加载失败，请重试')
			},
			// 可上报商品列表
			postGoods() {
				if (this.goodsLoading) return
				const previousValues = {}
				this.list.forEach(item => {
					previousValues[String(item.id)] = item.num
				})
				if (this.inputTimer) clearTimeout(this.inputTimer)
				this.calculationVersion++
				this.money = ''
				this.goodsLoading = true
				this.goodsLoaded = false
				this.loadError = false
				this.$https({
					url: 'api/erp/elevate/goods',
					method: 'POST',
					success: res => {
						if (Number(res.code) !== 1 || !Array.isArray(res.data)) {
							this.handleGoodsLoadError()
							return
						}
						this.list = res.data.map(item => {
							const key = String(item.id)
							return Object.assign({}, item, {
								num: Object.prototype.hasOwnProperty.call(previousValues, key) ? previousValues[key] : ''
							})
						})
						this.goodsLoading = false
						this.goodsLoaded = true
						this.loadError = false
						this.handleInputChange()
					},
					fail: () => {
						this.handleGoodsLoadError()
					},
					complete: () => {
						if (this.goodsLoading) this.handleGoodsLoadError()
					}
				})
			},
			handleInputChange() {
				if (this.inputTimer) clearTimeout(this.inputTimer)
				this.money = ''
				const version = ++this.calculationVersion
				this.inputTimer = setTimeout(() => {
					if (this.buildGoodsPayload() && this.isValidNumber(this.depletion_money)) {
						this.getData(version)
					} else {
						this.money = ''
					}
				}, 500)
			},
			getData(version) {
				const goods = this.buildGoodsPayload()
				if (!goods || !this.isValidNumber(this.depletion_money)) {
					this.money = ''
					return
				}
				this.$https({
					url: 'api/erp/elevate/income_money',
					method: 'POST',
					data: {
						depletion_money: this.depletion_money,
						goods,
						elevatetime: this.date
					},
					success: res => {
						if (version !== this.calculationVersion) return
						if (Number(res.code) === 1) {
							this.money = res.data
							return
						}
						this.money = ''
						this.showMessage(res.msg || '金额计算失败，请重试')
						if (this.isGoodsStateError(res.msg)) this.postGoods()
					},
					fail: () => {
						if (version === this.calculationVersion) this.money = ''
					}
				})
			},
			confirm() {
				if (!this.canSubmit) {
					this.showMessage(this.loadError ? '商品列表加载失败，请重试' : '请完整填写最新商品库存和损耗金额')
					return
				}
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定上报' + this.date + '的数据吗？',
					success: function(res) {
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
				if (!this.canSubmit || this.isSubmitting) return
				const goods = this.buildGoodsPayload()
				if (!goods) return
				this.isSubmitting = true
				this.$https({
					url: 'api/erp/elevate/add',
					method: 'POST',
					data: {
						depletion_money: this.depletion_money,
						goods,
						elevatetime: this.date
					},
					success: res => {
						this.showMessage(res.msg || (Number(res.code) === 1 ? '上报成功' : '上报失败'))
						if (Number(res.code) === 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						} else if (this.isGoodsStateError(res.msg)) {
							this.postGoods()
						}
					},
					complete: () => {
						this.isSubmitting = false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.hx {
		width: 100%;
		height: 20rpx;
		background: #f4f4f4;
	}

	.conter {
		padding: 30rpx;

		.box {
			width: 100%;
			height: auto;

			.boxTime {
				font-size: 34rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #222222;
				display: flex;
				align-items: center;

				.boxTimeImg {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.stockFlex {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

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
					width: 30rpx;
					height: 36rpx;
					margin-left: 14rpx;
					display: block;
				}
			}

			.itemFlex {
				width: 100%;
				height: auto;
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

				.itemFlexText {
					font-size: 34rpx;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #555555;
				}

				.itemFlexInt {
					width: 260rpx;
					height: 60rpx;
					background: #F4F4F4;
					border-radius: 6rpx;
					margin-left: auto;

					input {
						width: 200rpx;
						display: block;
						height: 100%;
						margin: 0 auto;
					}
				}

				.itemFlexMoeny {
					margin-left: 16rpx;
				}
			}

			.listFlex {
				width: 100%;
				height: 136rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #dbdbdb;

				.dian {
					width: 10rpx;
					height: 10rpx;
					background: #FF1D1D;
					border-radius: 100%;
				}

				.listFlexText {
					margin-left: 22rpx;
					font-size: 34rpx;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #222222;

					text {
						font-size: 26rpx;
					}
				}

				.listFlexRight {
					width: 350rpx;
					height: auto;
					margin-left: auto;

					.rightFlex {
						display: flex;
						align-items: center;

						.itemFlexInt {
							width: 260rpx;
							height: 60rpx;
							background: #F4F4F4;
							border-radius: 6rpx;
							margin-left: auto;

							input {
								width: 200rpx;
								display: block;
								height: 100%;
								margin: 0 auto;
							}
						}

						.itemFlexMoeny {
							margin-left: 16rpx;
						}
					}

					.rightBootom {
						display: flex;
						margin-top: 12rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #888888;

						.rightBootomText {
							margin-left: auto;
						}
					}
				}
			}

			.loadError,
			.emptyGoods {
				padding: 48rpx 0;
				text-align: center;
				font-size: 28rpx;
				color: #888888;
			}

			.loadError {
				color: #FF1D1D;
			}

		}
	}

	.zw {
		width: 100%;
		height: 140rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.footer {
		width: 100%;
		height: 140rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #B6B6B6;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		background: #fff;
		z-index: 999;

		/*兼容 IOS>11.2*/
		.footerBtn {
			width: 272rpx;
			height: 80rpx;
			background: #FF1D1D;
			border-radius: 40rpx;
			margin: 30rpx auto;
			font-size: 36rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;

			&.disabled {
				opacity: 0.5;
			}
		}
	}
</style>
