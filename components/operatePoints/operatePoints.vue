<template>
	<view>
		<uni-popup type="bottom" ref="invitePointRef" @change="changePop" :safeArea="false">
			<view class="view-invite">
				<image class="image-close" :src="globalstore.upImageuler('/static/lottery/white-close.png')" @click="invitePointRef.close()" />
				<view class="view-sh" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/zrw-di.png')})`"></view>
				<view class="view-x">
					<view class="little-box" style="margin-top: -100rpx;">
						<view class="center-style">
							<image class="image-txhy" :src="globalstore.upImageuler('/static/lottery/yaoqing.png')" />
							<view>
								<view class="text-yqhy">邀请好友一起玩</view>
								<view class="text-jf">每邀请一位好友<text>积分+100</text></view>
							</view>
						</view>
						<label class="label-qyq" @click="toInviteShare"  :style="`background-image: url(${globalstore.upImageuler('/static/lottery/little-red-btn.png')})`">去邀请</label>
					</view>
					<view class="little-box">
						<view class="center-style">
							<image class="image-txhy" :src="globalstore.upImageuler('/static/lottery/jiaoyi.png')" />
							<view>
								<view class="text-yqhy">每日完成交易满20元</view>
								<view class="text-jf">每日一次完成可得<text>积分+10</text></view>
							</view>
						</view>
						<label class="label-qyq" @click="clickJumpFirst"  :style="`background-image: url(${globalstore.upImageuler('/static/lottery/little-red-btn.png')})`">去完成</label>
					</view>
					<view class="little-box">
						<view class="center-style">
							<image class="image-txhy" :src="globalstore.upImageuler('/static/lottery/qiandao.png')" />
							<view>
								<view class="text-yqhy">每日签到</view>
								<view class="text-jf">完成签到可得<text>积分+5</text></view>
							</view>
						</view>
						<label class="label-qyq" v-if="!hasCheckIn" @click="clickCheckIn"  :style="`background-image: url(${globalstore.upImageuler('/static/lottery/little-red-btn.png')})`">去签到</label>
						<label class="label-qyq" v-else style="opacity: 0.3;" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/little-red-btn.png')})`">已签到</label>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { current, myCheckIn, taskToInvite } from '../../api/common';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	const currentActivity = ref(null);
	const hasCheckIn = ref(false);
	const source = ref('');
	const invitePointRef = ref(null);

	const emit = defineEmits(['close']);

	const clickCheckIn = () => {
		if (!currentActivity.value) return
		uni.navigateTo({
			url: `/pages/chechIn/chechIn?activityId=${currentActivity.value?.id}`
		});
		invitePointRef.value.close();
	};
	const toInviteShare = () => {
	const data = window.OpenInstall.parseUrlParams()
	let url = '/pages/member/lottery/lottery'
	data.jumpUrl = encodeURIComponent(JSON.stringify(url))
	if (window.OpenInstall) {
			const openInstall = new window.OpenInstall({
				appKey: "bxkyti",
				onready: function() {
					let that = this;
					that.schemeWakeup();
					that.wakeupOrInstall();
					return false;
				},
			}, data);
		} else {
			console.error('OpenInstall 脚本未加载，请检查引入方式');
		}
	show.value = false
	};
	const clickJumpFirst = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	};

	const changePop = (e) => {
		if (!e.show) {
			emit('close');
		}
	}


	const dealInit = () => {
		taskToInvite().then(res => {
			source.value = res.data?.source;
		});
		current().then(res => {
			const data = res.data;
			currentActivity.value = data.currentActivity;
			myCheckIn(currentActivity.value.id).then(res => {
				hasCheckIn.value = res.data.hasCheckIn;
			})
		});
	};
	onLoad(() => {
		dealInit();
	});
	onShow(() => {
		// dealInit();
	});
	onMounted(() => {
		invitePointRef.value.open();
	})
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

	.view-invite {
		display: flex;
		flex-direction: column;
		width: 100vw;
		font-family: PingFangSC, PingFang SC;

		.image-close {
			width: 44rpx;
			height: 44rpx;
			margin-left: 674rpx;
		}

		.view-sh {
			width: 100vw;
			height: 308rpx;
			background-size: 750rpx 308rpx;
			background-repeat: no-repeat;
		}

		.view-x {
			width: 100vw;
			height: 591rpx;
			background: #FFE9E5;

			.little-box {
				height: 164rpx;
				margin: 24rpx 28rpx 0;
				background: #FFFFFF;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 16rpx;

				.image-txhy {
					width: 100rpx;
					height: 102rpx;
					margin-right: 12rpx;
				}

				.text-yqhy {
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
					margin-top: 24rpx;

					text {
						font-weight: 600;
						color: #FF5500;
					}
				}

				.label-qyq {
					width: 148rpx;
					height: 66rpx;
					background-size: contain;
					background-repeat: no-repeat;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 500;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 28rpx;
				}
			}
		}
	}
</style>