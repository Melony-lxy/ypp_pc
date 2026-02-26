<template>
	<view class="PopupDown" @click="onClick">
		<view class="downApp" @click.stop>
			<view class="conten">
				<view>该功能仅支持手机版</view>
				<view>扫描二维码下载艺品品APP</view>
				<view>
					<image src="/static/download/maskcount.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="button" @click="onClick">
				好的
			</view>
		</view>
	</view>
</template>

<script setup>
	
	const emit = defineEmits(['click'])
	
	const onClick = () =>{
		emit('click')
	}
	
</script>

<style scoped lang="scss">
	.PopupDown{
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
		.downApp{
			width: 560rpx;
			aspect-ratio: 1/1;
			padding: 40rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 36rpx;
			.conten{
				display: flex;
				align-items: center;
				gap: 18rpx;
				flex-direction: column;
				>view:first-child{
					font-weight: 600;
					font-size: 32rpx;
					color: #2C2E3A;
				}
				>view:nth-child(2){
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
				}
				>view:last-child{
					width: 248rpx;
					height: 248rpx;
					background: #FFE2CD;
					border-radius: 20rpx;
					padding: 12rpx 10rpx 10rpx 12rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					>image{
						width: 226rpx;
						height: 226rpx;
					}
				}
			}
			.button{
				background: #FFC400;
				border-radius: 80rpx;
				font-weight: 600;
				font-size: 28rpx;
				color: #FFFFFF;
				padding: 12rpx 60rpx;
				cursor: pointer;
			}
		}
	}
</style>