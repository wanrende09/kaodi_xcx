<template>
	<view>
		<view class="u-content">
			<view class="title">{{title}}</view>
			<view class="timeFlex">
				<view class="time">{{time}}</view>
			</view>
			<u-parse :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				time:''
			}
		},
		onLoad(e) {
			console.log("cxzcz", e)
			// type 1 为公告 2 关于我们 3 消息详情
			if(e.type == 1){
				this.noticeDetail(e.id)
				uni.setNavigationBarTitle({
					title: '公告详情'
				});
			}else if(e.type == 2){
				this.about()
				uni.setNavigationBarTitle({
					title: '关于我们'
				});
			}else if(e.type == 3){
				this.msgDetail(e.id)
				uni.setNavigationBarTitle({
					title: '消息详情'
				});
			}
			
		},
		methods: {
			noticeDetail(id) {
				this.$https({
					url: 'api/index/notice_detail',
					method: 'POST',
					data: {
						id: id
					},
					success: res => {
						console.log("公告详情", res)
						this.title = res.data.title
						this.time = res.data.updatetime_text
						this.content = res.data.content
					}
				})
			},
			about(id){
				this.$https({
					url: 'api/index/about',
					method: 'POST',
					success: res => {
						console.log("关于我们", res)
						this.title = res.data.title
						this.time = res.data.updatetime_text
						this.content = res.data.content
					}
				})
			},
			msgDetail(id){
				this.$https({
					url: 'api/index/msg_detail',
					method: 'POST',
					data: {
						id: id
					},
					success: res => {
						console.log("关于我们", res)
						this.title = res.data.title
						this.time = res.data.updatetime_text
						this.content = res.data.content
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}
	.timeFlex{
		width: 100%;
		margin: 20rpx auto;
		.time{
			text-align: center;
			font-size: 26rpx;
			color: #999;
		}
	}
	.u-content {
		padding: 24rpx;
	}
</style>