<template>
	<view class="PopupFutures" @click="onClose">
		<view class="container" :style="`background-image: url(${globalstore.upImageuler('/static/slices/futures.png')})`" @click.stop>
			<view class="content">
				<view class="title">{{type ? '立即预售' : '立即预购' }}</view>
				<view class="text">
					该商品为{{type ? '预售' : '预购' }}商品：<br />
					您下单后只需支付商品价格的20%作为保证金即可锁定订单；<br />
					您可在规定发货日期48小时之前的任意时间支付剩余货款。
				</view>
				<view class="warning">
					<uni-icons type="info" color="#FF5500" size="16"></uni-icons>
					<view>如果您超时未支付货款，订单将自动关闭，并赔偿对应保证金。</view>
				</view>
				<view class="butlist">
					<button @click="onClose">取消</button>
					<button @click="onSuer">支付保证金</button>
				</view>
				<view class="chose" @click="onReminder">
					<image :src="is_show ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="aspectFit">
					</image>
					<view>下次打开不在提醒</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue'
	import { useGlobalStore } from '../../store/store'
	const props = defineProps({
		type: {
			type: Number,
			default: 0
		}
	})
	const globalstore = useGlobalStore()
	const emit = defineEmits(['close', 'suer'])
	const is_show = ref(uni.getStorageSync(props.type ? 'is_presale' : 'is_preorder') || false)

	const onClose = () => {
		emit('close')
	}

	const onSuer = () => {
		emit('suer')
	}

	const onReminder = () => {
		is_show.value = !is_show.value
		uni.setStorageSync(props.type ? 'is_presale' : 'is_preorder', is_show.value)
	}
</script>

<style scoped lang="scss">
	.PopupFutures {
		background: rgba(44, 46, 58, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		button::after {
			display: none;
		}

		.container {
			width: 654rpx;
			height: 816rpx;
			background-size: cover;
			padding: 208rpx 28rpx 28rpx;
			box-sizing: border-box;

			.content {

				.title {
					font-weight: 600;
					font-size: 34rpx;
					color: #2C2E3A;
					line-height: 34rpx;
				}

				.text {
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 46rpx;
					margin: 16rpx 0 10rpx;
				}

				.warning {
					padding: 12rpx 16rpx;
					box-sizing: border-box;
					background: #FFF1EB;
					border-radius: 12rpx;
					display: flex;
					align-items: flex-start;
					gap: 8rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #FF5500;
					line-height: 40rpx;
				}

				.butlist {
					margin: 36rpx 0 28rpx 0;
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 50rpx;

					>button:first-child {
						width: 100%;
						background: #FFFFFF;
						border-radius: 50rpx;
						border: 2rpx solid #D8D8D8;
						padding: 28rpx 0 26rpx;
						box-sizing: border-box;
						font-weight: 400;
						font-size: 30rpx;
						color: #2C2E3A;
						line-height: 30rpx;
					}

					>button:last-child {
						width: 100%;
						background: #FFC400;
						border-radius: 50rpx;
						border: 2rpx solid #FFC400;
						padding: 26rpx 0 28rpx;
						box-sizing: border-box;
						font-weight: 400;
						font-size: 30rpx;
						color: #FFFFFF;
						line-height: 30rpx;
					}
				}

				.chose {
					display: flex;
					align-items: center;
					gap: 4rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 36rpx;
					cursor: pointer;

					>image {
						width: 26rpx;
						height: 26rpx;
						margin-top: 4rpx;

					}
				}
			}
		}
	}
</style>