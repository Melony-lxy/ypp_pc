<template>
	<view class="publicNumber">
		<image @click.stop="onReduce" :src="count <= minCount ? globalstore.upImageuler('/static/number/reduce.png') : globalstore.upImageuler('/static/number/reduceActive.png') " mode="scaleToFill"></image>
		<view>{{count}}</view>
		<image @click.stop="onIncerase" :src="count >= maxCount ? globalstore.upImageuler('/static/number/add.png') : globalstore.upImageuler('/static/number/addActive.png') " mode="scaleToFill"></image>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useGlobalStore } from '../../store/store';
	const globalstore = useGlobalStore()
	const props = defineProps({
		//最大值
		maxCount: {
			type: Number,
			default: 5
		},
		// 最小值
		minCount: {
			type: Number,
			default: 1
		}
	})
	
	const count = ref(props.minCount)
	const emit = defineEmits(['change'])
	
	watch(()=>props.minCount,(n)=>{
		count.value = n
	})
	
	const onReduce = () =>{
		if(count.value <= props.minCount) return
		count.value--
		emit('change',{count: count.value})
	}
	
	const onIncerase = () =>{
		if(count.value >= props.maxCount) return
		count.value++
		emit('change',{count: count.value})
	}
	
</script>

<style scoped lang="scss">
	.publicNumber{
		background: #F8F8F8;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		gap: 50rpx;
		padding: 10rpx 8rpx;
		box-sizing: border-box;
		font-weight: 600;
		font-size: 28rpx;
		color: #2C2E3A;
		line-height: 28rpx;
		>image{
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>