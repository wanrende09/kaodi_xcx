<template>
	<view>
		<view class="news">
			<block v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="newsFlexItem" @click="jump('/pages/my/noticeDetails?id='+item.id+'&type=1')">
						<image :src="item.image" class="newsFlexItemImg"></image>
						<view class="newsFlexItemRight">
							<view class="ItemTitle">{{item.title}}</view>
							<view class="ItemTime">{{item.updatetime_text}}</view>
						</view>
					</view>
				</block>
			</block>
			<block v-else>
				<view class="no-data">
					<image class="iconfont" :src="iconRight" mode="widthFix"></image>
					暂无公告
				</view>
			</block>
		</view>
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
		onLoad() {
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
					url: 'api/index/notice',
					method: 'POST',
					data: {
						page: this.page
					},
					success: res => {
						this.lastPage = res.data.lastPage
						console.log('右侧分类', res)
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

<style lang="scss" scoped>
	.news {
		width: 92%;
		height: auto;
		margin: 0 auto;
		margin-top: 50rpx;

		.newsFlex {
			display: flex;
			align-items: center;

			.newsFlexTilte {
				font-size: 34rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #000000;

				text {
					font-size: 24rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #888888;
					margin-left: 4rpx;
				}
			}

			.newsFlexRight {
				font-size: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #888888;
				margin-left: auto;
			}

			.iconfont {
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}

		// 资讯样式
		.newsFlexItem {
			width: 100%;
			height: auto;
			display: flex;
			align-items: center;
			margin-top: 14rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			overflow: hidden;

			.newsFlexItemImg {
				width: 252rpx;
				height: 170rpx;
			}

			.newsFlexItemRight {
				width: 438rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;

				.ItemTitle {
					font-size: 32rpx;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #222222;
					line-height: 38rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden; //溢出内容隐藏
					text-overflow: ellipsis; //文本溢出部分用省略号表示
					display: -webkit-box; //特别显示模式
					-webkit-line-clamp: 2; //行数
					line-clamp: 2;
					-webkit-box-orient: vertical; //盒子中内容竖直排列
				}

				.ItemTime {
					font-size: 24rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #555555;
					line-height: 28rpx;
					margin-top: 14rpx;
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