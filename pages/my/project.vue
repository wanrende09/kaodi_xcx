<template>
	<view class="project-page">
		<view class="page-title">请选择进货项目</view>
		<view class="page-tip">每张进货单只包含一个项目的商品</view>

		<view v-if="projects.length" class="project-list">
			<view class="project-card" v-for="item in projects" :key="item.id" @click="openProject(item)">
				<image v-if="item.icon" class="project-icon" :src="item.icon" mode="aspectFill"></image>
				<view v-else class="project-icon project-icon-text">{{item.name.slice(0, 1)}}</view>
				<view class="project-content">
					<view class="project-name">{{item.name}}进货</view>
					<view class="project-desc">{{item.description || ('共 ' + item.goods_count + ' 种可进货商品')}}</view>
				</view>
				<view class="project-arrow iconfont el-icon-icon12 unify-rotate90"></view>
			</view>
		</view>

		<view v-else-if="!loading" class="empty">当前门店暂无可用的进货项目，请联系管理员</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				projects: [],
				loading: false
			}
		},
		onShow() {
			this.loadProjects()
		},
		methods: {
			loadProjects() {
				this.loading = true
				this.$https({
					url: 'api/erp/jinhuo/projects',
					method: 'POST',
					success: res => {
						this.projects = res.code == 1 && Array.isArray(res.data) ? res.data : []
					},
					complete: () => {
						this.loading = false
					}
				})
			},
			openProject(item) {
				uni.navigateTo({
					url: '/pages/my/stock?project_id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.project-page {
		min-height: 100vh;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		background: #f5f5f5;
	}
	.page-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #222;
	}
	.page-tip {
		margin-top: 12rpx;
		font-size: 26rpx;
		color: #888;
	}
	.project-list {
		margin-top: 34rpx;
	}
	.project-card {
		display: flex;
		align-items: center;
		min-height: 150rpx;
		margin-bottom: 24rpx;
		padding: 26rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, .05);
	}
	.project-icon {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #ffeded;
	}
	.project-icon-text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #ff1d1d;
	}
	.project-content {
		flex: 1;
		margin-left: 24rpx;
	}
	.project-name {
		font-size: 34rpx;
		font-weight: bold;
		color: #222;
	}
	.project-desc {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #888;
	}
	.project-arrow {
		font-size: 28rpx;
		color: #aaa;
	}
	.empty {
		margin-top: 180rpx;
		padding: 0 50rpx;
		text-align: center;
		font-size: 28rpx;
		line-height: 44rpx;
		color: #999;
	}
</style>
