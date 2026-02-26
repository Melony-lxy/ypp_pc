<template>
	<view class="container">
		<view class="view-header" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/invite_head.png')});`" style="background-size: cover;background-position: center;">
			<image @click="uni.navigateBack()" class="back-button" :src="globalstore.upImageuler('/static/lottery/back.png')"></image>
			<text class="title-text">我的积分</text>
		</view>
		<view class="view-zjf">
			<view class="text-zjf-name">总积分</view>
			<view class="text-zjf-value">188</view>
			<view class="view-zjf-ab-hz">
				<image class="image-ydyb" :src="globalstore.upImageuler('/static/lottery/ydyb.png')"></image>
				<view class="text-zjf-btn">赚积分</view>
			</view>
		</view>
		<view class="view-body">
			<view class="text-jfmx">积分明细</view>
			<view class="view-list-box" v-for="item in 10">
				<view class="between-style">
					<view class="text-reason">邀请用户注册</view>
					<view class="text-jf-add" v-if="1">+10</view>
					<view class="text-jf-subtract" v-else>10</view>
				</view>
				<view class="between-style" style="margin-top: 24rpx;">
					<view class="text-sj">时间：2025-10-10</view>
					<view class="center-style" v-if="1">
						<image class="image-touxiang" :src="globalstore.upImageuler('/static/profile.png')" />
						<text class="text-nicheng">未知</text>
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

	.container {
		width: 100vw;
		height: 100vh;
		background: #F8F8F8;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC, PingFang SC;

		.view-header {
			width: 100vw;
			height: 204rpx;
			display: flex;
			justify-content: center;
			position: relative;

			.back-button {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				left: 16rpx;
				top: 122rpx;
			}

			.title-text {
				font-weight: 500;
				font-size: 34rpx;
				color: #2C2E3B;
				line-height: 34rpx;
				margin-top: 128rpx;
			}
		}

		.view-zjf {
			margin: 20rpx 28rpx;
			height: 136rpx;
			background: linear-gradient(180deg, #FFEACD 0%, #FFFFFF 100%);
			border-radius: 24rpx;
			border-radius: 24rpx;
			position: relative;
			padding: 20rpx 28rpx;

			.text-zjf-name {
				font-weight: 400;
				font-size: 28rpx;
				color: #BF7D2B;
				line-height: 40rpx;
			}

			.text-zjf-value {
				font-weight: 600;
				font-size: 44rpx;
				color: #BF7D2B;
				line-height: 48rpx;
				margin-top: 8rpx;
			}

			.view-zjf-ab-hz {
				display: flex;
				align-items: end;
				position: absolute;
				right: 20rpx;
				top: 22rpx;

				.text-zjf-btn {
					width: 182rpx;
					height: 56rpx;
					margin-left: -50rpx;
					margin-bottom: 8rpx;
					background: #FFC400;
					border-radius: 28rpx;
					font-weight: 600;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.image-ydyb {
					width: 74rpx;
					height: 92rpx;
				}
			}
		}

		.view-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			padding: 24rpx 28rpx;

			.text-jfmx {
				font-weight: 400;
				font-size: 28rpx;
				color: #ABABAB;
				line-height: 28rpx;
			}

			.view-list-box {
				flex-grow: 0;
				flex-shrink: 0;
				border-bottom: 2rpx solid #F3F3F3;
				position: relative;
				padding: 28rpx 0;


				.text-reason {
					font-weight: 400;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
				}

				.text-jf-add {
					font-weight: 600;
					font-size: 32rpx;
					color: #FF5500;
					line-height: 32rpx;
				}

				.text-jf-subtract {
					font-weight: 600;
					font-size: 32rpx;
					color: #2C2E3A;
					line-height: 32rpx;
				}

				.text-sj {
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 26rpx;
				}

				.image-touxiang {
					width: 36rpx;
					height: 36rpx;
					border-radius: 100%;
					margin-right: 8rpx;
				}

				.text-nicheng {
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 26rpx;
				}
			}

		}

	}
</style>