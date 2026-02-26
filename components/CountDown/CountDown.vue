<template>
	<view class="countdown">
		<view @click="handleClick">{{textCountdown}}</view>
	</view>
</template>

<script setup>
	import { computed, onUnmounted, ref } from 'vue';
	
	const props = defineProps({
		count: {
			type: Number,
			default: 60,
		},
		initText: {
			type: String,
			default: '获取验证码'
		},
		countText: {
			type: String,
			default: '{count}秒后重新获取'
		}
	})
	
	const emit = defineEmits(['click'])
	
	const isCounting = ref(false)
	const remainingTime = ref(0)
	let timer = null
	
	const textCountdown = computed(()=>{
		if(!isCounting.value){
			return props.initText
		}
		return props.countText.replace('{count}',remainingTime.value)
	})
	
	const startCountdown = () =>{
		if(isCounting.value) return
		isCounting.value = true
		remainingTime.value = props.count
		timer = setInterval(()=>{
			remainingTime.value--
			if(remainingTime.value <= 0){
				clearInterval(timer)
				isCounting.value = false
			}
		},1000)
	}
	
	const handleClick = () =>{
		if(isCounting.value) return
		emit('click',()=>{
		    startCountdown()
		  })
	}
	
	onUnmounted(()=>{
		if(timer){
			clearInterval(timer)
			timer = null
		}
	})
	
</script>

<style scoped lang="scss">
	.countdown{
		color: #2C2E3B;
		cursor: pointer;
		white-space: nowrap;
	}
</style>