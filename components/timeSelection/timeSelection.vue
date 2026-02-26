<template>
	<view class="container">
		<view class="date-box">
			<view>
				<view style="font-weight: 500;">年</view>
				<view class="">月</view>
				<view class="">日</view>
			</view>
			<view class="date-data">
				<scroll-view class="date-item" scroll-y :scroll-into-view="'year' + (yearId - 3)">
					<view class="data-item-inner" v-for="(item, index) in yearData" :key="index" @click="onYearClick(item, index)" 
					:style="{ background: yearId === index ? '#FFC400' : ''}" :id="'year' + index">{{ item }}</view>
				</scroll-view>
				<scroll-view class="date-item" scroll-y :scroll-into-view="'month' + (monthId - 3)">
					<view class="data-item-inner" v-for="(item, index) in months" @click="onMonthClick(item, index)"
					:style="{ background: monthId === index ? '#FFC400' : ''}" :id="'month' + index">{{ item }}</view>
				</scroll-view>
				<scroll-view class="date-item" scroll-y :scroll-into-view="'day' + (dayId - 3)" style="padding-left: 14rpx;">
					<view class="data-item-inner" v-for="(item, index) in days" @click="onDayClick(item, index)"
					:style="{ background: dayId === index ? '#FFC400' : ''}" :id="'day' + index">{{ item }}</view>
				</scroll-view>
			</view>
		</view>
		<view style="padding: 20rpx 36rpx;text-align: right;cursor: pointer;" @click="sure">确定</view>
	</view>
</template>

<script setup>
	import { computed, nextTick, onMounted, ref } from 'vue'
	
	const months = ref(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
	const days = ref(['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'])
	const yearData = computed(() => {
		var date = new Date();
		var Y = date.getFullYear()
		const year = ref([Y])
		for(let i = 1; i < 151; i++) {
			year.value.unshift(Y - i)
		}
		for(let i = 1; i < 151; i++) {
			year.value.push(Y + i)
		}
		return year.value
	})
	const yearId = ref(0)
	const monthId = ref(0)
	const dayId = ref(0)
	const emit = defineEmits(['ascertain'])
	const date = ref([yearData.value[yearId.value], months.value[monthId.value], days.value[dayId.value]])
	const isLeap = yearData.value[0] % 400 === 0 || (yearData.value[0] % 4 === 0 && yearData.value[0] % 100 !== 0)
	const isLeapYear = ref(isLeap);
	const isFebr = ref(false)
	const onYearClick = (item, index) => {
		yearId.value = index
		date.value[0] = item
		if(item % 400 === 0 || item % 4 === 0 && item % 100 != 0) {
			isLeapYear.value = true
			if(isFebr.value == true) {
				days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28', '29']
			}
		} else {
			isLeapYear.value = false
			if(isFebr.value == true) {
				days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
			}
		}
	}
	
	const onMonthClick = (item, index) => {
		monthId.value = index
		date.value[1] = item
		if(item === '02') {
			isFebr.value = true
			if(isLeapYear.value == true) {
				days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28', '29']
			} else {
				days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
			}
			return
		}
		if(Number(item) % 2 != 0 || item == '08' || item == '10') {
			days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30', '31']
			isFebr.value = false
		} else {
			isFebr.value = false
			days.value = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
		}
	}
	
	const onDayClick = (item, index) => {
		dayId.value = index
		date.value[2] = item
	}
	
	const sure = () => {
		emit('ascertain', date.value)
	}
	
	onMounted(() => {
		var dateTime = new Date()
		var Y = dateTime.getFullYear()
		var M = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1)
		var D = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
		setTimeout(()=>{
			yearId.value = yearData.value.indexOf(Y)
			monthId.value = months.value.indexOf(String(M))
			dayId.value = days.value.indexOf(String(D))
			date.value = [Y, M, D]
		})
	})
</script>

<style lang="scss" scoped>
	.container {
		width: 28.333333333%;
		max-height: 650rpx;
		background-color: #FFFFFF;
		box-shadow: 0 4rpx 24rpx 0 rgba(202,155,0,0.1);
		border-radius: 16rpx;
		border: 2rpx solid #FFC400;
		// box-sizing: border-box;
		position: absolute;
		top: 88rpx;
		left: 204rpx;
		z-index: 99;
		.date-box {
			padding: 24rpx 68rpx 0 72rpx;
			border-bottom: 2rpx solid #F0F3F9;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			>view:first-child {
				// margin: 0 auto;
				display: flex;
				gap: 150rpx;
				font-weight: 500;
				font-size: 24rpx;
				color: #004065;
				padding: 0 64rpx 18rpx 70rpx;
				border-bottom: 2rpx solid #F0F3F9;
			}
			.date-data {
				height: 472rpx;
				overflow: hidden;
				padding: 20rpx 52rpx 0 42rpx;
				display: flex;
				gap: 100rpx;
				.date-item {
					::v-deep .uni-scroll-view-content {
						display: flex;
						flex-direction: column;
						gap: 24rpx;
					}
					::-webkit-scrollbar {
					  display: none;
					  width: 0 !important;
					  height: 0 !important;
					  -webkit-appearance: none;
					  background: transparent;
					  color: transparent;
					}
					.data-item-inner {
						padding: 4rpx 8rpx;
						cursor: pointer;
						border-radius: 8rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
