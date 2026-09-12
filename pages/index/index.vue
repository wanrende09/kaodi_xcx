<template>
	<view>
		<!-- #ifdef H5 -->
		<u-navbar title="合肥烤帝" leftIcon="" bgColor="none" :titleStyle="titleStyle"></u-navbar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar title="合肥烤帝" :leftIcon="none" bgColor="none" :titleStyle="titleStyle"></u-navbar>
		<!-- #endif -->
		<!-- <u-navbar title="合肥烤帝" leftIcon="" bgColor="none" :titleStyle="titleStyle"></u-navbar> -->
		<view class="content">
			<!-- <image src="/static/index_bg.png" class="bg"></image> -->
			<u-swiper :list="bannerList" keyName="image" height="314" :circular="true" :interval="5000" radius="0"></u-swiper>
			<view class="topImg">
				<view class="topView">
					<image src="../../static/logo.png" class="logo"></image>
					<view class="topViewCenter">
						<view class="centerText1">合肥烤帝·专业烤腿</view>
						<view class="centerText2">{{userInfo.store.shopname}}</view>
					</view>
				</view>
			</view>
			<!-- 最新资讯 -->
			<view class="news" v-if="noticeString.title">
				<view class="newsFlex" >
					<view class="newsFlexTilte">公告<text>notice</text></view>
					<view class="newsFlexRight" @click="jump('/pages/my/noticeList')">查看更多</view>
					<view class="right iconfont el-icon-icon12 unify-rotate90" @click="jump('/pages/my/noticeList')"></view>
				</view>
				<view class="newsFlexItem" @click="jump('/pages/my/noticeDetails?id='+noticeString.id+'&type=1')">
					<image :src="noticeString.image" class="newsFlexItemImg"></image>
					<view class="newsFlexItemRight">
						<view class="ItemTitle">{{noticeString.title}}</view>
						<view class="ItemTime">{{noticeString.updatetime_text}}</view>
					</view>
				</view>
			</view>
			<!-- 关于我们 -->
			<view class="news">
				<view class="newsFlex">
					<view class="newsFlexTilte">关于我们<text>about</text></view>
					<!-- <view class="newsFlexRight" @click="jump('/pages/my/noticeDetails?type=2')">查看详情</view>
					<view class="right iconfont el-icon-icon12 unify-rotate90" @click="jump('/pages/my/noticeDetails?type=2')"></view> -->
				</view>
				<image src="../../static/index1.png" class="aboutImg" @click="jump('/pages/my/noticeDetails?type=2')"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					color: "#fff"
				},
				bannerList: [],
				noticeString: {},
				userInfo: {
					store: {
						shopname: ''
					}
				}
			}
		},
		onLoad(e) {
			this.userInfoCilck()
		},
		onShow() {

		},
		onReachBottom() {

		},
		methods: {
			userInfoCilck() {
				this.$https({
					url: 'api/erp/user/info',
					method: 'POST',
					success: res => {
						console.log("用户信息", res)
						if (res && Number(res.code) === 1 && res.data) {
							this.userInfo = Object.assign({}, this.userInfo, res.data)
							this.userInfo.store = res.data.store || { shopname: '' }
							this.advert()
							this.notice()
						}
					}
				})
			},
			advert() {
				this.$https({
					url: 'api/index/advert',
					method: 'POST',
					success: res => {
						console.log("banner", res)
						this.bannerList = res && Number(res.code) === 1 && Array.isArray(res.data) ? res.data : []
					}
				})
			},
			notice() {
				this.$https({
					url: 'api/index/notice',
					method: 'POST',
					success: res => {
						console.log("notice", res)
						const notices = res && Number(res.code) === 1 && res.data && Array.isArray(res.data.data)
							? res.data.data
							: []
						this.noticeString = notices[0] || {}

					}
				})
			},
			jump(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #ffffff !important;
	}

	.bg {
		width: 100%;
		height: 628rpx;
	}

	.topImg {
		width: 100%;
		height: 194rpx;
		background: url(../../static/indexBg.png);
		margin: 0 auto;
		// margin-top: -116rpx;
		// position: sticky;
		// z-index: 999;

		.topView {
			padding: 22rpx 30rpx;
			display: flex;
			// align-items: center;

			.logo {
				width: 148rpx;
				height: 148rpx;
				border-radius: 100%;
			}

			.topViewCenter {
				margin-left: 20rpx;

				.centerText1 {
					font-size: 32rpx;
					font-family: PingFang SC-Heavy, PingFang SC;
					font-weight: 800;
					color: #fff;
					line-height: 38rpx;
					margin-top: 24rpx;
				}

				.centerText2 {
					margin-top: 20rpx;
					font-size: 26rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #fff;
					line-height: 30rpx;
				}
			}

		}
	}

	// 最新资讯
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

	.aboutImg {
		margin-top: 14rpx;
		width: 100%;
		height: 258rpx;
	}
</style>
