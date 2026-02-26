<template>
	<view class="view-checkin">
		<view class="view-head">
			<image @click="backClick" class="image-head" src="/static/lottery/back.png"></image>
			<view class="text-th">签到有礼</view>
			<view class="view-jf">{{totalPoint}}<text>积分</text></view>
			<label class="label-qd" v-if="!hasCheckIn" @click="dealPostCheck">立即签到</label>
			<label class="label-qd" v-else style="opacity: 0.3;">今日已签到</label>
		</view>
		<view class="view-body">
			<view class="view-content">
				<view class="text-ylq">已连签{{days}}天</view>
				<view class="text-jrqd" v-if="hasCheckIn">今日已签到成功，积分<text>+{{point}}</text></view>
				<view class="text-jrqd" v-else>今日未签到，{{point}}积分待领取</view>
				<view class="between-style" style="margin-top: 44rpx;">
					<image class="image-check" src="/static/lottery/check-left.png" @click="prevMonth"></image>
					<view class="text-dtrq">{{currentYear}}年{{currentMonth}}月</view>
					<image class="image-check" src="/static/lottery/check-right.png" @click="nextMonth"></image>
				</view>
				<view class="week-box">
					<view class="text-week" v-for="(item,index) in weekList" :key="index">
						{{item}}
					</view>
				</view>
				<view class="view-big-box">
					<view class="view-little-box" v-for="(itemBig,indexBig) in dayMonthList" :key="itemBig">
						<view class="text-day" v-for="(item,index) in itemBig" :key="index" @click="clickCheckIn(item)">
							<text v-if="item&&!item.isToday&&!item.isCheckedIn">{{item.day?item.day:''}}</text>
							<image class="image-wqd" v-if="item&&item.isToday&&!item.isCheckedIn" src="/static/lottery/qd-jb.png"></image>
							<image class="image-qd" v-if="item&&item.isCheckedIn" src="/static/lottery/cg-dui.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { myCheckIn,checkIn } from '../../api/common';

	const activityId = ref('');
	const hasCheckIn = ref(false);
	const checkInList = ref([]);
	const point = ref(0);
	const totalPoint = ref(0);
	const days = ref(0);

	const dayMonthList = ref([]);
	const weekList = ref(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
	const currentYear = ref(new Date().getFullYear());
	const currentMonth = ref(new Date().getMonth() + 1);


	const backClick = () => {
		uni.navigateBack({ delta: 1 })
	}

	// 修改获取月份数据的方法，支持指定年月
	const getCurrentMonthDaysGrouped = (year = null, month = null) => {
		// 获取今天日期
		const today = new Date()
		const todayStr = today.getFullYear() + '-' +
			String(today.getMonth() + 1).padStart(2, '0') + '-' +
			String(today.getDate()).padStart(2, '0')

		// 使用传入的年月或当前年月
		const targetYear = year || currentYear.value
		const targetMonth = month || currentMonth.value

		// 获取指定月份天数
		const daysInMonth = new Date(targetYear, targetMonth, 0).getDate()

		// 生成指定月份所有日期
		const allDays = []
		for (let day = 1; day <= daysInMonth; day++) {
			const dateStr = targetYear + '-' +
				String(targetMonth).padStart(2, '0') + '-' +
				String(day).padStart(2, '0')

			const dateObj = new Date(targetYear, targetMonth - 1, day)
			const dayOfWeek = dateObj.getDay() // 0=周日, 1=周一, ..., 6=周六

			// 判断是否已签到
			const isCheckedIn = checkInList.value.includes(dateStr)

			allDays.push({
				date: dateStr, // 具体日期 yyyy-MM-dd
				day: day, // 天号
				isToday: dateStr === todayStr, // 是否是今天
				isCheckedIn: isCheckedIn, // 是否已签到
				dayOfWeek: dayOfWeek, // 周几 (0-6)
				year: targetYear, // 年
				month: targetMonth // 月
			})
		}

		// 按周（行）组织数据
		const weeks = []
		let currentWeek = []

		// 添加第一周的前置占位符
		const firstDayOfWeek = allDays[0].dayOfWeek
		for (let i = 0; i < firstDayOfWeek; i++) {
			currentWeek.push(null) // 占位符
		}

		// 添加所有日期
		allDays.forEach(day => {
			currentWeek.push(day)

			// 如果当前周已满7天，开始新的一周
			if (currentWeek.length === 7) {
				weeks.push([...currentWeek])
				currentWeek = []
			}
		})

		// 如果最后一周不满7天，用占位符补齐
		while (currentWeek.length > 0 && currentWeek.length < 7) {
			currentWeek.push(null)
		}

		// 如果最后一周有数据，添加到结果中
		if (currentWeek.length === 7) {
			weeks.push(currentWeek)
		}

		dayMonthList.value = weeks
		return weeks
	}

	// 添加上个月按钮方法
	const prevMonth = () => {
		if (currentMonth.value === 1) {
			currentMonth.value = 12;
			currentYear.value -= 1;
		} else {
			currentMonth.value -= 1;
		}
		getCurrentMonthDaysGrouped();
	}

	// 添加下个月按钮方法
	const nextMonth = () => {
		if (currentMonth.value === 12) {
			currentMonth.value = 1;
			currentYear.value += 1;
		} else {
			currentMonth.value += 1;
		}
		getCurrentMonthDaysGrouped();
	}


	const clickCheckIn = (item) => {
		if (!item) return
		if (!item.isToday) return
		if (item.isCheckedIn) return
		console.log("item: " + JSON.stringify(item));
		dealPostCheck();
	}
	const dealPostCheck = async () => {
		try {
			uni.showLoading({});
			const res = await checkIn(activityId.value);
			if (res.code == 200) {
				dealInit();
			}
		} catch (error) {
			console.error('操作失败:', error);
		} finally {
			uni.hideLoading();
		}
	}

	const dealInit = () => {
		myCheckIn(activityId.value).then(res => {
			hasCheckIn.value = res.data.hasCheckIn;
			checkInList.value = res.data.checkInList || [];
			point.value = res.data.point;
			totalPoint.value = res.data.totalPoint;
			days.value = res.data.days;
			getCurrentMonthDaysGrouped()
		})
	}

	onLoad((options) => {
		activityId.value = options.activityId
		dealInit();
	})
</script>

<style scoped lang="scss">
	.center-style {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.shu-center-style {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.between-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.view-checkin {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC, PingFang SC;
		background: #FFFFFF;

		.view-head {
			width: 100vw;
			height: 444rpx;
			display: flex;
			justify-content: center;
			position: relative;
			border-bottom: 2rpx solid #F8F8F8;
			background-image: url('/static/lottery/qdyl-di.png');
			background-size: contain;

			.image-head {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 118rpx;
				left: 16rpx;
			}

			.text-th {
				font-weight: 500;
				font-size: 34rpx;
				color: #2C2E3A;
				line-height: 34rpx;
				margin-top: 126rpx;
			}

			.view-jf {
				position: absolute;
				top: 210rpx;
				left: 28rpx;
				font-weight: bold;
				font-size: 54rpx;
				color: #2C2E3A;
				line-height: 74rpx;

				text {
					font-weight: 500;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;
				}
			}

			.label-qd {
				width: 188rpx;
				height: 66rpx;
				position: absolute;
				top: 296rpx;
				left: 28rpx;
				background-image: url('/static/lottery/btn-ljqd.png');
				background-size: contain;
				background-repeat: no-repeat;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 500;
				font-size: 26rpx;
				color: #FFFFFF;
				line-height: 26rpx;
			}
		}

		.view-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			margin-top: -52rpx;
			z-index: 10;
			display: flex;
			align-items: center;

			.view-content {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				padding: 32rpx 28rpx;
				box-sizing: border-box;
				.text-ylq {
					font-weight: 500;
					font-size: 28rpx;
					color: #ABABAB;
					line-height: 28rpx;
				}

				.text-jrqd {
					font-weight: 500;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
					margin-top: 20rpx;
					margin-bottom: 44rpx;

					text {
						color: #FF5500;
					}
				}

				.image-check {
					width: 15rpx;
					height: 26rpx;
				}

				.text-dtrq {
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;
				}

				.week-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 44rpx;

					.text-week {
						width: 100rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 400;
						font-size: 20rpx;
						color: #ABABAB;
						line-height: 20rpx;
					}
				}

				.view-big-box {
					display: flex;
					flex-direction: column;
					row-gap: 8rpx;

					.view-little-box {
						display: flex;
						align-items: center;
						justify-content: space-around;

						.text-day {
							width: 100rpx;
							height: 112rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							background-image: url('/static/lottery/day-di.png');
							background-size: cover;
							background-repeat: no-repeat;

							font-weight: 400;
							font-size: 34rpx;
							color: #2C2E3A;
							line-height: 34rpx;

							.image-wqd {
								width: 80rpx;
								height: 76rpx;
								animation: rotate 2s linear infinite;

								@keyframes rotate {
									from {
										transform: rotate(0deg);
									}

									to {
										transform: rotate(360deg);
									}
								}

							}

							.image-qd {
								width: 36rpx;
								height: 36rpx;
							}
						}
					}
				}
			}
		}


	}
</style>