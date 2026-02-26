<template>
	<view class="parameter" :class="{activeParameter: show}">
		<view class="parameter-top">
			<view>参数</view>
			<view @click="close">
				<image src="/static/close.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="parameter-content">
			<view class="parameter-item">
				<view>标签</view>
				<view class="label-name">{{ labelName.join("、") }}</view>
			</view>
			<view class="parameter-item">
				<view>单位</view>
				<view class="unit-name" @click="changeShowUnit">
					<text>{{ unitName }}</text>
					<uni-icons type="right" size="14" color="#C2C2C2"></uni-icons>
					<view class="unit-selection" v-if="isShowUnit">
						<view class="unit-item" v-for="(item, index) in units" @click="selected(item)">
							<view class="item-name">{{ item.name }}</view>
							<image :src="item.img" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="parameter-item">
				<view>数量</view>
				<view class="input-item">
					<input type="number" placeholder="请输入数量" @input="changeCnt" :value="parameter.count" />
					<text>{{ unitName }}</text>
				</view>
			</view>
			<view class="parameter-item">
				<view>最小确认数量</view>
				<view class="input-item">
					<input type="number" placeholder="请输入最小确认数量" @input="changeMinCnt" :value="parameter.minCnt" />
					<text>{{ unitName }}</text>
				</view>
			</view>
			<view class="parameter-item">
				<view>交易单价</view>
				<view class="input-item">
					<input class="price-input" type="number" placeholder="请输入交易单价" @input="changePrice" :value="parameter.price" />
					<text class="price">¥</text>
				</view>
			</view>
			<view class="parameter-item" v-if="parameter.count && parameter.minCnt && parameter.price">
				<view>总价值</view>
				<view class="total-price">¥{{ totalInteger }}.{{ totalFraction }}</view>
			</view>
		</view>
		<view class="parameter-bottom">
			<view @click="cancel">取消</view>
			<view @click="confirm">确认</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch } from 'vue';
	const unitName = ref('张')
	const isShowUnit = ref(false)
	const units = ref([
		{
			name: '张',
			img: '/static/purchase/checked-w.png'
		},
		{
			name: '组',
			img: '/static/purchase/nochoose.png'
		},
		{
			name: '刀',
			img: '/static/purchase/nochoose.png'
		},
		{
			name: '捆',
			img: '/static/purchase/nochoose.png'
		},
	])
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		labelName: {
			type: Array,
			default: []
		}
	})
	const emit = defineEmits(['close', 'cancel', 'confirm'])
	const close = () =>{
		emit('close',false)
	}
	const cancel = () => {
		emit('cancel', false)
	}
	const confirm = () => {
		emit('confirm', parameter.value)
	}
	const changeShowUnit = () => {
		isShowUnit.value = !isShowUnit.value
	}
	const parameter = ref({
		unit: '张',
		count: '',
		minCnt: '',
		price: ''
	})
	
	const selected = (item) => {
		units.value.forEach(unit => {
			unit.img = '/static/purchase/nochoose.png'
		})
		item.isSelected = true
		item.img = '/static/purchase/checked-w.png'
		unitName.value = item.name
		parameter.value.unit = unitName.value
	}
	const changeCnt = (e) => {
		parameter.value.count = Number(e.detail.value.replace(/[^\d]/g, ''));
	}
	const changeMinCnt = (e) => {
		parameter.value.minCnt = Number(e.detail.value.replace(/[^\d]/g, ''));
	}
	const changePrice = (e) => {
		parameter.value.price = Number(Number(e.detail.value.replace(/[^\d.]|(?<=\..*)\./g, '')).toFixed(2));
	}
	const totalPrice = computed(() => {
	  return Number((parameter.value.price * parameter.value.count).toFixed(2)) 
	})
	const totalInteger = computed(() => {
		return Math.floor(totalPrice.value) 
	})
	const totalFraction = computed(() => {
		if(totalPrice.value - totalInteger.value === 0) {
			return '00'
		}
		else {
			return Number(((totalPrice.value - totalInteger.value) * 100).toFixed(2)) 
		}
	})
	const reset = () => {
		unitName.value = '张'
		parameter.value = ({
			unit: '张',
			count: '',
			minCnt: '',
			price: '',
		})
	}
	defineExpose({
		reset
	})
</script>

<style scoped>
	input {
		font-size: 28rpx;
		text-align: right;
		font-weight: 600;
	}
	::v-deep .uni-input-placeholder {
		color: #ABABAB;
		font-weight: 400;
	}
	::v-deep uni-input {
		line-height: normal;
	}
</style>

<style scoped lang="scss">
	.activeParameter{
		right: 13.5% !important; 
	}
	.parameter{
		position: fixed;
		right: -100%;
		top: 172rpx;
		// width: 19.53125%;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47,83,109,0.08);
		border-radius: 16rpx;
		box-sizing: border-box;
		transition: all 1s ease;
		padding: 32rpx 28rpx;
		.parameter-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			>view:first-child{
				margin-left: 14rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
			}
			>view:last-child{
				width: 36rpx;
				display: flex;
				align-items: center;
				image{
					width: 100%;
					cursor: pointer;
				}
			}
		}
		.parameter-content {
			padding: 0 28rpx;
			background-color: #fff;
			border-radius: 12rpx;
			.parameter-item {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #F3F3F3;
				.input-item {
					display: flex;
					align-items: flex-end;
					gap: 10rpx;
					.price-input {
						color: #FF5500;
					}
					.price {
						color: #FF5500;
					}
				}
				.label-name {
					color: #ABABAB;
				}
				.unit-name {
					position: relative;
					.unit-selection {
						position: absolute;
						top: 50rpx;
						left: -30rpx;
						border: 2rpx solid #FFC400;
						background-color: #FFFFFF;
						padding: 10rpx 20rpx;
						border-radius: 16rpx;
						z-index: 99;
						.unit-item {
							display: flex;
							align-items: center;
							gap: 100rpx;
							padding: 10rpx;
							border-bottom: 1rpx solid #F3F3F3;
							image {
								width: 26rpx;
								height: 26rpx;
							}
							&:last-child {
								border: none;
							}
						}
					}
				}
				.total-price {
					color: #FF5500;
					font-weight: 600;
					font-size: 34rpx;
				}
				&:last-child {
					border: none;
				}
			}
		}
		.parameter-bottom{
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 40rpx;
			>view:first-child{
				width: 47.2%;
				padding: 22rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				font-weight: 600;
				font-size: 30rpx;
				color: #FFC400;
				background: #FFFFFF;
				border-radius: 44rpx;
				border: 2rpx solid #FFC400;
				cursor: pointer;
			}
			>view:last-child{
				width: 47.2%;
				padding: 22rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				font-weight: 600;
				font-size: 30rpx;
				color: #fff;
				background: #FFC400;
				border-radius: 44rpx;
				border: 2rpx solid #FFC400;
				cursor: pointer;
			}
		}
		
	}
</style>