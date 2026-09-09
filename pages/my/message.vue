<template>
	<view>
		<block v-if="list.length>0">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="listItem" @click="jump('/pages/my/noticeDetails?id='+item.id+'&type=3')">
					<view class="listTime">{{item.updatetime_text}}</view>
					<view :class="item.is_read ==2 ?'dian':'dian1' "></view>
					<view class="listTitle">{{item.title}}</view>
					<view class="listBtm">
						<view class="listBtmText">查看详情</view>
						<view class="right iconfont el-icon-icon12 unify-rotate90"></view>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="no-data">
				<image class="iconfont" :src="iconRight" mode="widthFix"></image>
				暂无消息
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconRight: this.$mAssetsPath.iconRight,
				list: [], // 列表
				page: 1, // 分页
				lastPage: 1, // 最后一页
			}
		},
		onShow() {
			this.page = 1
			this.list = []
			this.lastPage = 1
			this.goodsLists()
		},
		onReachBottom() {
			if (this.page < this.lastPage) {
				this.page = this.page + 1
				this.goodsLists()
			}
		},
		methods: {
			goodsLists() {
				this.$https({
					url: 'api/index/msg',
					method: 'POST',
					data: {
						page: this.page
					},
					success: res => {
						this.lastPage = res.data.lastPage
						console.log('消息列表', res)
						this.list = this.list.concat(res.data.data)
					}
				})
			},
			jump(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #f5f5f5 !important;
}
.list{
	padding: 30rpx;
	.listItem{
		width: 100%;
		height: 206rpx;
		background: #fff;
		border-radius: 10rpx;
		position: relative;
		.listTime{
			padding: 20rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #555555;
		}
		.dian{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			width: 14rpx;
			height: 14rpx;
			background: #FF1D1D;
			border-radius: 100%;
		}
		.dian1{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			width: 14rpx;
			height: 14rpx;
			background: #999;
			border-radius: 100%;
		}
		.listTitle{
			padding: 0 20rpx 20rpx 20rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #222222;
		}
		.listBtm{
			width: 100%;
			height: 60rpx;
			border-top:1rpx solid #ececec;
			margin-top: 12rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.listBtmText{
				margin-left: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #AAAAAA;
			}
			.iconfont{
				font-size: 20rpx;
				color: #AAAAAA;
				margin-right: 20rpx;
			}
		}
	}
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
</style>
