<template>
	<view>
		<view class="hx"></view>
		<view class="conter">
			<view class="stockFlex">
				<view class="stockHx"></view>
				<view class="stockName">进货列表</view>
				<image src="../../static/user3.png" class="stockImg1"></image>
			</view>
			<view class="detailFlex" v-for="(item,index) in list" :key="index">
				<view class="dian"></view>
				<view class="detailFlexText">{{item.goods_name}}<text>（{{item.quantity}}个/{{item.unit}}）</text></view>
				<view class="detailFlexNum">数量<text class="text1">{{item.totalNum}}个</text>价格<text>{{item.totalPrice}}元</text></view>
			</view>
			<view class="textareaBox">
				<view class="boxText">备注</view>
				<view class="textarea">
					<!-- <textarea placeholder="请输入备注" class="taea" placeholder-class="taea1" v-model="remark" /> -->
					<view class="taea">{{remark}}</view>
				</view>
			</view>
			<view class="footer">
				<view class="footerText">共<text>{{totalMoney}}元</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				totalMoney:'',
				remark:''
			}
		},
		onLoad(e) {
			console.log("页面传值",e)
			this.postDetail(e.id)
		},
		methods: {
			postDetail(id){
				this.$https({
					url: 'api/erp/jinhuo/detail',
					data: {
						id:id
					},
					method: 'POST',
					success: res => {
						console.log("xczcxc", res)
						this.list = res.data.goods
						this.totalMoney = res.data.totalMoney
						this.remark = res.data.remark
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5 !important;
	}

	.hx {
		width: 100%;
		height: 30rpx;
	}

	.conter {
		height: auto;
		background: #fff;
		padding: 30rpx;

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

		.detailFlex {
			display: flex;
			width: 100%;
			height: auto;
			align-items: center;
			margin-top: 32rpx;

			.dian {
				width: 10rpx;
				height: 10rpx;
				background: #FF1D1D;
				border-radius: 100%;
			}

			.detailFlexText {
				font-size: 34rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #222222;
				margin-left: 22rpx;

				text {
					font-size: 26rpx;
					font-weight: 500;
				}
			}

			.detailFlexNum {
				font-size: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #888888;
				margin-left: auto;
				text {
					margin-left: 10rpx;
					font-size: 36rpx;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #666666;
				}
				.text1{
					margin-right: 20rpx;
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
		.footer{
			width: 100%;
			height: auto;
			border-top: 1rpx solid #dbdbdb;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			.footerText{
				margin-left: auto;
				margin-top: 30rpx;
				text{
					font-size: 38rpx;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #FF1D1D;
				}
			}
			
		}
	}
</style>