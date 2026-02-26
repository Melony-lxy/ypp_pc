<template>
	<view class="MyTransactions">
		<MyBought v-if="TransaIndex === 0"></MyBought>
		<MySold v-if="TransaIndex === 1"></MySold>
		<MyNegotia v-if="TransaIndex === 2"></MyNegotia>
		<MyPost v-if="TransaIndex === 3"></MyPost>
	</view>
</template>

<script setup>
	import MyBought from '../MyBought/MyBought.vue';
	import MySold from '../MySold/MySold.vue';
	import MyNegotia from '../MyNegotia/MyNegotia.vue';
	import MyPost from '../MyPost/MyPost.vue';
	
	const props = defineProps({
		TransaIndex: {
			type: Number,
			default: 0
		}
	})
	
</script>

<style scoped lang="scss">
	.MyTransactions{
		padding: 50rpx 40rpx 0;
		box-sizing: border-box;
		height: 100%;
		position: relative;
	}
</style>