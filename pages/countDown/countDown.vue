<template>
	<view class="container" :style="{height: height + 'px'}">
		<view class="bgimg">
			<image :src="globalstore.upImageuler('/static/down/bgimg.png')" mode="scaleToFill"></image>
		</view>
		<view class="bgimg-code">
			<image :src="inviteCode ? globalstore.upImageuler('/static/down/bgimgcode.png') : globalstore.upImageuler('/static/down/bgimgnone.png') " mode="widthFix">
			</image>
			<view class="code" v-if="inviteCode">
				<view class="codeH">
					<view class="line"></view>
					<view class="text">邀请码</view>
					<view class="line" style="transform: scaleX(-1);"></view>
				</view>
				<view class="codeInput">
					<view style="white-space: nowrap;">{{inviteCode}}</view>
					<view>复制</view>
				</view>
			</view>
			<view v-else style="position: absolute;top: 50%;width: 100%; transform: translateY(-50%);">
				<image @click="onDown" :src="globalstore.upImageuler('/static/down/button.png')" mode="widthFix"></image>
			</view>
		</view>
		<view class="bg-button" v-if="inviteCode">
			<image @click="onDown" :src="globalstore.upImageuler('/static/down/button.png')" mode="widthFix"></image>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	const inviteCode = ref(false)
	
	const onDown = () => {
		var data = window.OpenInstall.parseUrlParams();
		new OpenInstall({
			appKey: "bxkyti",
			channelCode: 'webpage',
			fastInstall: false,
			onready: function() {
				this.schemeWakeup();
				this.wakeupOrInstall();
			}
		}, data)
	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		width: 100%;
		position: relative;
		z-index: 1;
		box-sizing: border-box;
		overflow: hidden;

		.bgimg {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.bgimg-code {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 2;
			display: flex;
			image {
				width: 100%;
			}

			.code {
				position: absolute;
				top: 24rpx;
				left: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				gap: 24rpx;

				.codeH {
					display: flex;
					align-items: center;

					gap: 16rpx;

					.line {
						width: 112rpx;
						height: 4rpx;
						background: linear-gradient(90deg, rgba(255, 234, 214, 0) 0%, #A66506 100%);
						border-radius: 10rpx;
					}

					.text {
						font-weight: 500;
						font-size: 34rpx;
						color: #A66506;
					}
				}

				.codeInput {
					display: flex;
					align-content: center;
					font-weight: 500;
					font-size: 30rpx;
					color: #FF6E16;
					gap: 14rpx;

					>view:first-child {
						background-color: #fff;
						color: #A66506;
						width: 210rpx;
						height: 48rpx;
						background: #FFFFFF;
						border-radius: 24rpx;
						opacity: 0.9;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}

		.bg-button {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 3;
			width: 100%;
			display: flex;
			
			image {
				width: 100%;
			}
		}
	}
</style>