<template>
	<view class="UnityNum" @click.stop v-if="show">
		<view>请选择</view>
		<view class="unit-list">
			<view v-for="(item,index) in list" @click="onClick(item,index)" :class="{active: listIndex === index}">{{item}}</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

	
	const props = defineProps(['type','show','unity'])
	const emits = defineEmits(['update:unity','click'])
	
	const unitList = [
		{
			type: 'paper_money',
			list: ['张', '组', '刀', '捆']
		},
		{
			type: 'gold_coin',
			list: ['枚', '板', '套', '对']
		},
		{
			type: 'common_coin',
			list: ['枚', '对', '套', '卷', '盒', '件', '本(册)', '包']
		},
		{
			type: 'stamp',
			list: ['枚', '套', '版', '本']
		}
	]
	
	const list = computed(()=>unitList.find(item=>item.type === props.type)?.list || unitList[0].list)
	const listIndex = ref(0)
	
	watch(()=>props.type,(n)=>{
		emits('update:unity',list.value[0])
	},{immediate: true})
	
	const onClick = (item,index) =>{
		listIndex.value = index
		emits('update:unity',item)
		emits('click')
	}
	
</script>

<style scoped lang="scss">
	.UnityNum{
		width: 100%;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 2;
		background-color: #FFFFFF;
		box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.2);
		border-radius: inherit;
		border: 2rpx solid #FFC400;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #2C2E3A;
		line-height: normal;
		>view:first-child{
			padding-bottom: 8rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #F2F2F2;
		}
		.unit-list{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 32rpx;
			>view{
				padding: 8rpx 16rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #F8F8F8;
				border-radius: 12rpx;
			}
			.active{
				font-weight: 600;
				color: #BF7D00;
				background: #FFF0DC;
			}
		}
	}
</style>