<template>
	<view class="conter">
		<view class="salesBox" v-for="(item,index) in list" :key="index" v-if="item.show_stock == 1">
			<view class="salesBoxFlex">
				<!-- <view class="salesNum">{{index + 1}}</view> -->
				<view class="salesText">{{item.name}}</view>
				<view class="salesRight">
					<view class="salesRightText">库存</view>
					<view class="salesRightNum">{{item.stock}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.postGoods()
		},
		methods: {
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
	.conter {
		padding:0 30rpx 30rpx 30rpx;
		background: #fff;
	}

	.salesBox {
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		border-top: 1rpx solid #e4e4e4;
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
				// margin-left: 20rpx;
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
	.salesBox:first-child{
		border-top: none;
	}
</style>