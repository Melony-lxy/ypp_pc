<template>
	<view class="PageBottom" v-if="total">
		<view class="taps">
			<button class="pageText" :disabled="isPrevious" @click="onPrevious">上一页</button>
			<view class="pageNums">
				<view v-for="(item,index) in pageTotal" :class="{active: pageNum === item}" @click="onNum(item,index)">{{item}}</view>
			</view>
			<button class="pageText" :disabled="isNest" @click="onNext">下一页</button>
			<view class="pageInput">
				<input type="number" v-model="NumValue" @confirm="onJump" />
			</view>
			<button class="pageText" @click="onJump" :disabled="isJump">跳转</button>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		watch
	} from 'vue';

	const props = defineProps({
		total: {
			tpye: Number,
			required: true
		} //总页数
	})

	const emit = defineEmits(['change'])

	const pageTotal = computed(() => {
		const total = props.total;
		const current = pageNum.value;
		const result = [];
		if (total <= 7) {
			for (let i = 1; i <= total; i++) {
				result.push(i);
			}
			return result;
		}
		result.push(1); 
		if (current <= 4) {
			for (let i = 2; i <= 5; i++) {
				result.push(i);
			}
			result.push('...', total);
		}
		else if (current >= total - 3) {
			result.push('...');
			for (let i = total - 4; i <= total - 1; i++) {
				result.push(i);
			}
			result.push(total); 
		}
		else {
			result.push('...');
			for (let i = current - 1; i <= current + 1; i++) {
				result.push(i);
			}
			result.push('...', total);
		}
		return result;
	});

	const pageNum = ref(1)
	const NumValue = ref(pageNum.value)
	const isPrevious = computed(() => {
		if (pageNum.value === 1) return true
		else return false
	})
	const isNest = computed(() => {
		if (pageNum.value === props.total) return true
		else return false
	})

	const isJump = computed(() => {
		if (NumValue.value > props.total || NumValue.value < 1) return true
		else return false
	})

	const onNum = (item, index) => {
	  if (item === '...') {
	    const total = props.total;
	    const current = pageNum.value;
	    const pageArray = pageTotal.value;
	    if (index === 1) { 
	      pageNum.value = Math.max(current - 3, 1); 
	    } else if (index === pageArray.length - 2) { 
	      pageNum.value = Math.min(current + 3, total);
	    }
	  } else {
	    pageNum.value = item;
	  }
	};

	const onPrevious = () => {
		pageNum.value--
	}

	const onNext = () => {
		pageNum.value++
	}

	const onJump = () => {
		if (NumValue.value > props.total || NumValue.value < 1) {
			uni.showToast({
				title: '请输入有效页数',
				icon: 'none'
			})
			return
		}
		pageNum.value = +NumValue.value
	}

	watch(() => pageNum.value, (n) => {
		NumValue.value = n
		emit('change', n)
	})
</script>

<style scoped lang="scss">
	.PageBottom {
		// position: absolute;
		// height: 60rpx;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		// bottom: 20rpx;
		// left: 0;
		display: flex;
		justify-content: center;

		.taps {
			display: flex;
			align-items: center;
			gap: 32rpx;

			>button::after {
				display: none;
			}

			>button {
				margin: 0;
				padding: 12rpx 40rpx 14rpx;
				box-sizing: border-box;
				font-weight: 400;
				font-size: 12px;
				line-height: normal;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #DCDCDC;
			}

			.pageNums {
				display: flex;
				align-items: center;
				gap: 20rpx;

				>view {
					width: 60rpx;
					height: 60rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					border: 2rpx solid #DCDCDC;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					cursor: pointer;
				}

				.active {
					background: #FFC400;
					border: 2rpx solid #FFC400;
					color: #FFFFFF;
				}
			}

			.pageInput {
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #DCDCDC;
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				>input {
					width: 100%;
					text-align: center;
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
				}
			}
		}
	}
</style>