<template>
	<view class="page-my-award">
		<view class="view-head">
			<image @click="uni.navigateBack()" class="image-head" :src="globalstore.upImageuler('/static/lottery/back.png')"></image>
			<view class="text-th">我的奖品</view>
		</view>
		<view class="view-body">
			<view class="view-item" v-for="(item,index) in 10">
				<view class="center-style">
					<image class="image-award" src="/static/logo.png" mode="aspectFit" />
					<view>
						<view class="text-name">2024年贺岁纪念钞</view>
						<view class="text-jf">中奖时间：2025-10-10 12:30:20</view>
						<view class="text-jf">消耗积分：10</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;" v-if="0">
						<view class="center-style" style=" margin-top: 16rpx;">
							<image style="width: 26rpx; height: 26rpx; margin-right: 4rpx;" :src="globalstore.upImageuler('/static/lottery/clock.png')"></image>
							<view class="notice-text">兑换剩余时间:</view>
							<view>
								<uni-countdown style="white-space: nowrap;" :day="1" :hour="1" :minute="30" :second="58" />
							</view>
						</view>
						<view class="view-button-box">
							<button class="label-yellow">填写地址</button>
						</view>
					</view>
					<image v-if="1" class="image-status" :src="globalstore.upImageuler('/static/lottery/yi-zuofei.png')"></image>
					<view class="center-style" style=" margin-top: 16rpx;" v-if="1">
						<image style="width: 26rpx; height: 26rpx; margin-right: 4rpx;" :src="globalstore.upImageuler('/static/lottery/exclamation-point.png')"></image>
						<view class="notice-text">用户未按规定时间内填写邮寄地址</view>
					</view>
					
					<view class="view-button-box" style="width: 100%;" v-if="0">
						<button class="label-yellow">查看详情</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
</script>

<style scoped lang="scss">
	.center-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}

	.shu-center-style {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.between-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.page-my-award {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC, PingFang SC;
		background: #F8F8F8;

		.view-head {
			width: 100vw;
			height: 206rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: center;
			position: relative;

			.image-head {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 118rpx;
				left: 16rpx;
			}

			.text-th {
				font-weight: 500;
				font-size: 34rpx;
				color: #2C2E3A;
				line-height: 34rpx;
				margin-top: 126rpx;
			}

		}

		.view-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			padding: 28rpx 28rpx 0;

			.view-item {
				background: #FFFFFF;
				margin-bottom: 20rpx;
				padding: 36rpx 20rpx;
				position: relative;

				.image-award {
					width: 156rpx;
					height: 156rpx;
					border-radius: 12rpx;
					margin-right: 16rpx;
					// border: 1rpx solid;
				}

				.text-name {
					font-weight: 500;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
				}

				.text-jf {
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 26rpx;
					margin-top: 22rpx;
				}

				.notice-text {
					font-weight: 400;
					font-size: 28rpx;
					color: #BF7D2B;
					line-height: 28rpx;
					
				}

				.uni-countdown {
					display: inline-block;

					::v-deep {

						.uni-countdown__number,
						.uni-countdown__splitor {
							color: #bf7d2b !important;
							font-size: 26rpx !important;
						}
					}
				}

				.image-status {
					width: 136rpx;
					height: 118rpx;
					position: absolute;
					top: 44rpx;
					right: 24rpx;
				}

				.view-button-box {
					display: flex;
					
					column-gap: 24rpx;
					margin-top: 10rpx;
					justify-content: flex-end;
					.label-yellow {
						background: #FFC400 !important;
						color: #FFFFFF;
					}

					button {
						background: none !important;
						padding: 14rpx 28rpx;
						border-radius: 28rpx;
						margin: 0;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 28rpx;

						&:after {
							display: none;
						}
					}

					::v-deep {
						uni-button[disabled] {
							opacity: 0.3;
						}
					}
				}
			}
		}
	}
</style>