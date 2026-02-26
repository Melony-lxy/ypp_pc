<template>
	<view class="noData">
		<image :src="globalstore.upImageuler('/static/mine/no_have.png')" mode="widthFix"></image>
		<view>没有数据哦～</view>
	</view>
</template>

<script setup>
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()

</script>

<style scoped lang="scss">
	.noData {
		height: 1486rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #aaa;

		>image {
			width: 300rpx;
			height: 300rpx;
		}
	}
</style>