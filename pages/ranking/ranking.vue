<template>
	<view class="view-rank-page">
		<view class="view-header" :style="`background: url(${globalstore.upImageuler('/static/lottery/phb-head.png')});`" style="background-size: 100% 100%;background-repeat: no-repeat;">
			<image class="image-back" @click="uni.navigateBack()" :src="globalstore.upImageuler('/static/lottery/back_white_image.png')"></image>
			<view class="text-title">本场抽奖码排行榜</view>
		</view>
		<view class="view-body">
			<view class="view-tm" :style="`background: url(${globalstore.upImageuler('/static/lottery/phb-mc.png')});`" style="background-size: contain;">
				<view class="shu-center-style text-red">
					<view>我的</view>
					<view>排名</view>
				</view>
				<view class="shu-center-style">
					<view class="text-black">345</view>
					<view class="text-grey">我的排名</view>
				</view>
				<view class="shu-center-style">
					<view class="text-blod-red">10张</view>
					<view class="text-grey">抽奖码数量</view>
				</view>
			</view>
			<view class="view-tmzt">
				<view class="center-style">
					<view>排名</view>
					<view style="margin-left: 32rpx;">用户昵称</view>
				</view>
				<view>抽奖码数量</view>
			</view>
			<view class="view-list">
				<view class="view-item" v-for="(item,index) in 100">
					<view class="center-style">
						<image class="image-pai" v-if="index===0" :src="globalstore.upImageuler('/static/lottery/1-jinpai.png')" mode="aspectFit" />
						<image class="image-pai" v-if="index===1" :src="globalstore.upImageuler('/static/lottery/2-yinpai.png')" mode="aspectFit" />
						<image class="image-pai" v-if="index===2" :src="globalstore.upImageuler('/static/lottery/3-tongpai.png')" mode="aspectFit" />
						<view class="text-mc-zi" v-if="index>2">{{index+1}}</view>
						<view class="text-yhm">用户呢称</view>
					</view>
					<view class="view-gs">100张</view>
				</view>
			</view>
			<view class="text-j-10">仅展示前100名用户</view>
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
		align-items: center;
	}

	.shu-center-style {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.between-style {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.view-rank-page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		font-family: PingFangSC, PingFang SC;

		.view-header {
			width: 100%;
			height: 334rpx;
			position: relative;
			display: flex;
			justify-content: center;

			.image-back {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				left: 16rpx;
				top: 118rpx;
			}

			.text-title {
				font-weight: 500;
				font-size: 34rpx;
				color: #FFFFFF;
				line-height: 34rpx;
				margin-top: 126rpx;
			}
		}

		.view-body {
			flex: 1;
			width: 100%;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			margin-top: -38rpx;
			z-index: 10;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow-y: scroll;

			.view-tm {
				width: 718rpx;
				box-sizing: border-box;
				height: 152rpx;
				margin-top: 14rpx;
				padding: 0 62rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.text-red {
					font-weight: 400;
					font-size: 32rpx;
					color: #FF5500;
					line-height: 44rpx;
				}

				.text-black {
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
				}

				.text-blod-red {
					font-weight: 600;
					font-size: 30rpx;
					color: #FF5500;
					line-height: 30rpx;
				}

				.text-grey {
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 26rpx;
					margin-top: 12rpx;
				}
			}

			.view-tmzt {
				width: 100%;
				box-sizing: border-box;
				height: 74rpx;
				margin-top: 10rpx;
				background: #F8F8F8;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 28rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #ABABAB;
				line-height: 26rpx;
			}

			.view-list {
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow-y: auto;
				width: 100vw;


				.view-item {
					flex-grow: 0;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 102rpx;
					margin: 0 28rpx;
					border-bottom: 1rpx solid #E8E8E8;

					.view-gs {
						width: 130rpx;
						font-weight: 600;
						font-size: 30rpx;
						color: #2C2E3A;
						line-height: 30rpx;
						display: flex;
						justify-content: center;
					}

					.image-pai {
						width: 52rpx;
						height: 46rpx;
					}

					.text-mc-zi {
						width: 52rpx;
						height: 46rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 400;
						font-size: 30rpx;
						color: #ABABAB;
						line-height: 30rpx;
					}

					.text-yhm {
						font-weight: 400;
						font-size: 30rpx;
						color: #2C2E3A;
						line-height: 30rpx;
						margin-left: 32rpx;
					}
				}
			}

			.text-j-10 {
				width: 100vw;
				height: 142rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #ABABAB;
				line-height: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

	}
</style>