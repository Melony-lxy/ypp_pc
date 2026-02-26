<template>
	<view class="ScanToDown" v-if="show">
		<view class="top">
			<image src="/static/index/logo.png" mode="aspectFit"></image>
			<view>每一次收藏都是传承的开始</view>
		</view>
		<view class="bottom">
			<view>
				<image src="/static/download/maskcount.png" mode="aspectFit"></image>
			</view>
			<view>扫码下载艺品品APP</view>
		</view>
		<uni-icons class="close" type="closeempty" size="28" color="#ABABAB" @click="emits('update:show',false)"></uni-icons>
	</view>
</template>

<script setup>
	
	const props = defineProps(['show'])
	const emits = defineEmits(['update:show'])

</script>

<style scoped lang="scss">
	.ScanToDown {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 999;
		padding: 120rpx 200rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 80rpx;
		transform: translate(-50%, -50%);
		box-shadow: 0 4px 6px -1px rgba(47, 83, 109, 0.1) 0 2px 4px -2px rgba(47, 83, 109, 0.06);
		transition: box-shadow 0.3s ease;
		
		&:hover{
			box-shadow: 
			    0 10px 15px -3px rgba(47, 83, 109, 0.2),
			    0 4px 6px -4px rgba(47, 83, 109, 0.1);
		}

		.top {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20rpx;

			>image {
				width: 282rpx;
				height: 81rpx;
			}

			>view {
				font-size: 32rpx;
				font-weight: 400;
				color: #2C2E3A;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20rpx;

			>view:first-child {
				padding: 12rpx;
				box-sizing: border-box;
				background: #FFEACD;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;

				&:hover {
					transform: translateY(-10rpx);
				}

				>image {
					width: 350rpx;
					height: 350rpx;

				}
			}

			>view:last-child {
				font-size: 32rpx;
				font-weight: 400;
				color: #ABABAB;
			}
		}
		
		.close{
			position: absolute;
			top: 40rpx;
			right: 40rpx;
			cursor: pointer;
		}
	}
</style>