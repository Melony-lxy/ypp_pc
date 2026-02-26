<template>
	<view class="noMore">
		<image src="/static/mine/long.png" mode="aspectFit"></image>
		<view>哎呀，到底了~</view>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
	.noMore{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #ABABAB;
		height: 400rpx;
		>image{
			width: 34rpx;
			height: 34rpx;
		
		}
	}
</style>