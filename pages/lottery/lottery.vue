<template>
	<view class="view-lottery">
		<image class="image-back" @click="onBack" :src="globalstore.upImageuler('/static/lottery/back.png')" />
		<!-- <image class="image-share" :src="globalstore.upImageuler('/static/lottery/share.png')" /> -->
		<view class="view-up">
			<view class="vew-up-up" :style="`background: url(${globalstore.upImageuler('/static/lottery/lottery_background.jpg')})`" style="background-size: 100% 100%;background-repeat: no-repeat;">
				<image class="image-0-yuane" :src="globalstore.upImageuler('/static/lottery/0-yuan-cdj.png')" />
				<image class="image-10-jf" :src="globalstore.upImageuler('/static/lottery/10-jf-ndj.png')" />
				<view class="view-hdgz" @click="onActive">活动规则</view>
				<view class="scroll-dm">
					<view class="view-dm-box danmu-scroll">
						<view class="view-ge-box " v-for="(item,index) in inputList" >
							<image :src="item.userInfo?.avatar ? item.userInfo?.avatar : globalstore.upImageuler('/static/profile.png') " class="image-tx"></image>
							<view class="text-trjf">{{item.userInfo?.userName ? item.userInfo?.userName : '易***' }}投入{{item.point}}积分</view>
						</view>
					</view>
				</view>
				<view class="view-gift" :style="`background: url(${globalstore.upImageuler('/static/lottery/gift.png')})`" style="background-size: 100% 100%;background-repeat: no-repeat;">
					<view class="view-djs center-style" v-if="!currentActivity.open">
						<view class="text-djs-tip">参与截止倒计时&nbsp;</view>
						<uni-countdown :day="countdownVo.day" :hour="countdownVo.hour" :minute="countdownVo.minute" :second="countdownVo.second"></uni-countdown>
					</view>
					<view class="view-djs center-style" v-else>
						<view class="text-djs-tip">本期抽奖已结束</view>
					</view>
					<template v-if="!currentActivity.open">
						<image class="image-award" :src="currentActivity.awardImage" mode="aspectFit" />
						<view class="text-award-name">{{currentActivity.awardName}}</view>
						<view class="view-scj">市场价: ¥{{currentActivity.marketPrice}}</view>
						<view class="view-jdt-big">
							<view class="view-jdt-little" :style="{width: currentActivity.percent}"></view>
						</view>
						<view class="view-bqjd">
							本期进度{{currentActivity.currentCount}}/{{currentActivity.targetCount}}
						</view>
					</template>
					<template v-else>
						<image class="image-award expired" src="/static/logo.png" mode="aspectFit" />
						<view class="text-award-name expired">国气山河</view>
						<view class="view-xccj">
							<text>下次抽奖时间</text>
							<text>2025年10月10日</text>
						</view>
					</template>
				</view>
				<image v-if="!currentActivity.open" @click="onOpenJion" class="image-dwcdj" :src="globalstore.upImageuler('/static/lottery/click-me.gif')" mode="widthFix" />
				<image v-else class="image-zdcdj" @click="showModal" :src="globalstore.upImageuler('/static/lottery/zdcdj.png')" mode="widthFix" />
			</view>
			<view class="view-up-xia">
				<view class="view-wdcjm" :style="`background: url(${globalstore.upImageuler('/static/lottery/wdcjm.png')});`" style="background-size: 100% 100%;background-repeat: no-repeat;">
					<view class="between-style" style="padding: 20rpx 50rpx 0 56rpx;">
						<view class="center-style">
							<view class="text-wdcjm1">我的抽奖码</view>
							<view class="text-wdcjm2">(共{{lotteryCode.lotteryCodeList?.length}}张)</view>
						</view>
						<view class="center-style">
							<image class="image-ice" :src="globalstore.upImageuler('/static/lottery/ice.png')" />
							<view class="text-zjgl">中奖概率: {{lotteryCode.rate}}</view>
						</view>
					</view>
					<view class="view-cjm-box">
						<view v-for="(item,index) in lotteryCode.lotteryCodeList">
							<view class="center-style" v-if="index<4" style="display: flex; align-items: center; justify-content: center;">
								<view class="text-cjm-name">抽奖码:</view>
								<view class="text-cjm-value" :style="`background: url(${globalstore.upImageuler('/static/lottery/cjm.png')});`" style="background-size: contain;background-size: 100% 100%;">{{item}}</view>
							</view>
						</view>
					</view>
					<view class="view-ckqb" @click="showModal">
						<view class="text-ckqb">查看全部</view>
						<image class="image-kz" :src="globalstore.upImageuler('/static/lottery/brown_kuozhan.png')"/>
					</view>
				</view>
				<view class="view-yqhy">
					<image class="image-yqhydjf" :src="globalstore.upImageuler('/static/lottery/yqhydjf.png')" />
					<view class="view-jfrs">已有<text>{{invitation.count}}</text>人免费获得了<text>{{invitation.point}}</text>积分</view>
					<view class="label-ljyq" @click="showModal" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/ljyq_btn.png')});`" style="background-size: contain;background-repeat: no-repeat;">立即邀请</view>
				</view>
				<view class="view-lszj">
					<view class="center-style" style="margin-top: 24rpx; margin-bottom: 32rpx;">
						<image class="image-juxing" :src="globalstore.upImageuler('/static/lottery/juxing-zi.png')" />
						<view class="text-lszj-title">历史中奖</view>
					</view>
					<view v-for="(item,index) in activityPrizeRecordList" >
						<view v-if="(index<6)||(ifShowMore&&index>=6)">
							<view class="view-xu-line" v-if="index>0"></view>
							<view class="between-style" style="padding: 0 16rpx;">
								<view class="center-style">
									<image class="image-avatar" :src="item?.avatar" />
									<view class="text-username">{{item?.userName}}</view>
								</view>
								<view class="view-zjm" :style="`background: url(${globalstore.upImageuler('/static/lottery/zjm.png')});`" style="background-size: contain;background-repeat: no-repeat;">{{item.lotteryCode}}</view>
							</view>
							<view class="text-zjsm">{{item.lotteryTime}} 抽中{{item.awardName}}</view>
						</view>
					</view>
					<view class="center-style" style="justify-content: center; margin: 30rpx 0;" @click="ifShowMore = !ifShowMore"  v-if="activityPrizeRecordList.length > 6">
						<view class="text-jzs">仅展示最近30条中奖记录</view>
						<image class="image-expand-down" :style="ifShowMore?'transform: rotate(180deg)':''" :src="globalstore.upImageuler('/static/lottery/expand-down.png')" />
					</view>
				</view>
				<view class="view-huan">
					<image class="image-left" :src="globalstore.upImageuler('/static/lottery/left-huan.png')" />
					<image class="image-right" :src="globalstore.upImageuler('/static/lottery/right-huan.png')" />
				</view>
			</view>
		</view>
		<view class="view-low" @click="showModal">
			<view class="shu-center-style">
				<image class="image-big" :src="globalstore.upImageuler('/static/lottery/tab-dwcdj.png')" />
				<view class="tab-text">点我抽大奖</view>
			</view>
			<view class="shu-center-style">
				<image class="image-little" :src="globalstore.upImageuler('/static/lottery/tab-wdjp.png')" />
				<view class="tab-text">我的奖品</view>
			</view>
			<view class="shu-center-style">
				<image class="image-little" :src="globalstore.upImageuler('/static/lottery/tab-phb.png')" />
				<view class="tab-text">排行榜</view>
			</view>
			<view class="shu-center-style">
				<image class="image-little" :src="globalstore.upImageuler('/static/lottery/tab-wdjf.png')" />
				<view class="tab-text">我的积分</view>
			</view>
		</view>
		<popup-modal :show='show' title="去APP内打开" @close="onClose" @suer="onSuer"></popup-modal>
		<uni-popup type="center" ref="manyPointRef">
			<view class="view-pop-manypoint">
				<image class="image-close" @click="manyPointRef.close()" :src="globalstore.upImageuler('/static/lottery/white-close.png')"/>
				<view class="view-nr" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/tz-di.png')})`">
					<view class="text-1">每投{{points.wager}}积分 得1张抽奖码</view>
					<view class="text-2">最多投入100000积分</view>
					<view class="view-shu-add">
						<image :src="`/static/lottery/${investmentPoints == 0 ? 'subtract-none' : 'subtract' }.png`" @click="onReducePoints"></image>
						<!-- <view>{{investmentPoints}}</view> -->
						<input style="text-align: center;width: 50%;" type="number" v-model="investmentPoints" @input="onJoin">
						<image :src="`/static/lottery/${investmentPoints + points.wager >= points.totalPoint ? 'add-none' : 'add'}.png`" @click="onAddPoints"></image>
					</view>
					<view class="text-3">您当前剩余{{points.totalPoint}}积分 <text @click="onAllPoints">全部投入</text></view>
					<label class="label-ljtz" :style="`background-image: url(${globalstore.upImageuler('/static/lottery/ljyq_btn.png')})`" @click="onPlace">立即投注</label>
					<view class="center-style" style="margin-top: 32rpx;" @click="isEarnPoints = true">
						<view class="text-zjf">赚积分</view>
						<uni-icons type="right" color="#BF7D2B" size="16"></uni-icons>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="sendCodeRef">
			<view class="view-pop-sendcode">
				<image class="image-close" :src="globalstore.upImageuler('/static/lottery/white-close.png')" @click="onClaim"/>
				<image class="image-sncdj" :src="globalstore.upImageuler('/static/lottery/sncjm.png')" />
				<label class="label-lqck" @click="onClaim">领取查看</label>
			</view>
		</uni-popup>
		<operatePoints v-if="isEarnPoints" @close="isEarnPoints = false"></operatePoints>
	</view>
</template>

<script setup>
	import { useGlobalStore } from '../../store/store';
	import { current,historyWinners,myLotteryCode,invitedUserStatistic,last10Wagers,toWager,activeJoin,sendLotteryCode, login } from '../../api/common';
	import { onMounted, ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app'
	import { diffTime } from '../../utils/common';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import operatePoints from '../../components/operatePoints/operatePoints.vue';
	
	const globalstore = useGlobalStore()
	const fullPath = window.location.href
	const currentActivity = ref({})
	const countdownVo = ref({})
	const activityPrizeRecordList = ref([])
	const ifShowMore = ref(false)
	const lotteryCode = ref({})
	const invitation = ref({})
	const inputList = ref([])
	const show = ref(false)
	const manyPointRef = ref(null);
	const points = ref({})
	const investmentPoints = ref(0)
	const isEarnPoints = ref(false)
	const sendCodeRef = ref(null)
	
	const onBack = () =>{
		const nowPath = window.location.href
		if(fullPath == nowPath) {
			uni.reLaunch({
				url:'/pages/index/index'
			})
			return
		}
		uni.navigateBack()
	}
	
	const onActive = () =>{
		uni.navigateTo({
			url: '/pages/activeRules/activeRules'
		})
	}
	//  //我的奖品
	// const onMyAward = () =>{
	// 	uni.navigateTo({
	// 		url: '/pages/myAward/myAward'
	// 	})
	// }
	// 	//排行榜
	// const onRanking = () =>{
	// 	uni.navigateTo({
	// 		url: '/pages/ranking/ranking'
	// 	})
	// }
	// 	//我的积分
	// const onPoints = () =>{
	// 	uni.navigateTo({
	// 		url: '/pages/points/points'
	// 	})
	// }
	
	const getCurrent = () =>{
		current().then(res=>{
			currentActivity.value = res.data.currentActivity
			currentActivity.value.percent = (currentActivity.value.currentCount / currentActivity.value.targetCount) * 100 + '%';
			countdownVo.value = diffTime(res.data.timestamp * 1000, currentActivity.value.endTimestamp * 1000);
			myLotteryCode({activityId: res.data.currentActivity.id}).then(res=>{
				lotteryCode.value = res.data
			})
			invitedUserStatistic(res.data.currentActivity.id).then(res=>{
				invitation.value = res.data
			})
			sendLotteryCode({activityId: res.data.currentActivity.id}).then(res=>{
				if(res.data) sendCodeRef.value.open()
			})
			last10Wagers(res.data.currentActivity.id).then(res=>{
				inputList.value = res.data
				inputList.value.forEach(item=>{
					 item.userInfo.userName = item.userInfo.userName.charAt(0) + '******' + item.userInfo.userName.charAt(item.userInfo.userName.length - 1)
				})
			})
			toWager({activityId: res.data.currentActivity.id}).then(res=>{
				points.value = res.data
			})
		})
		historyWinners().then(res=>{
			activityPrizeRecordList.value = res.data.activityPrizeRecordList
			activityPrizeRecordList.value.forEach(item=>{
				item.userName = item.userName.charAt(0) + '******' + item.userName.charAt(item.userName.length - 1);
			})
		})
	
	}
	
	const showModal = () =>{
		show.value = true
	}
	
	const onClose = () =>{
		show.value = false
	}
	
	const onSuer = () =>{
		const data = window.OpenInstall.parseUrlParams()
		let url = '/pages/member/lottery/lottery'
		data.jumpUrl = encodeURIComponent(JSON.stringify(url))
		if (window.OpenInstall) {
				const openInstall = new window.OpenInstall({
					appKey: "bxkyti",
					onready: function() {
						let that = this;
						that.schemeWakeup();
						that.wakeupOrInstall();
						return false;
					},
				}, data);
			} else {
				console.error('OpenInstall 脚本未加载，请检查引入方式');
			}
		show.value = false
	}
	
	const onOpenJion = () =>{
		manyPointRef.value.open()
	}
	
	const onReducePoints = () =>{
		if(investmentPoints.value == 0 ) return
		investmentPoints.value -= points.value.wager
	}
	
	const onJoin = (e) =>{
		let value = e.detail.value
		// if(+value > points.value.totalPoint){
		// 	uni.showToast({
		// 		title: '积分不足，请重新输入',
		// 		icon: 'none'
		// 	})
		// }
	}
	
	const onAddPoints = () =>{
		if(investmentPoints.value + points.value.wager > points.value.totalPoint) return
		investmentPoints.value += points.value.wager
	}
	
	const onAllPoints = () =>{
		if(!points.value.totalPoint%points.value.wager){
			investmentPoints.value = points.value.totalPoint
			return
		}
		investmentPoints.value = points.value.totalPoint - points.value.totalPoint % points.value.wager
	}
	
	const onPlace = () =>{
		if(investmentPoints.value == 0) {
			uni.showToast({
				title: '请投注积分',
				icon: 'none'
			})
			return
		}
		if(+investmentPoints.value > points.value.totalPoint) {
			uni.showToast({
				title: '积分不足，请重新输入',
				icon: 'none'
			})
			investmentPoints.value = '0'
			return
		}
		activeJoin({
			activityId: currentActivity.value.id,
			point: investmentPoints.value
		}).then(res=>{
			manyPointRef.value.close()
			investmentPoints.value = 0
			getCurrent()
			uni.showToast({
				title: '已投注',
				icon: 'none'
			})
		})
	}
	
	const onClaim = () =>{
		getCurrent()
		sendCodeRef.value.close()
	}
	
	onMounted(()=>{
		const token = uni.getStorageSync('token')
		if(!token){
			uni.navigateTo({
				url: '/pages/login/login'
			})
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			})
			return
		}
		getCurrent()
	})
	
	onShow(()=>{
		const token = uni.getStorageSync('token')
		if(!token) return
		getCurrent()
	})
	
</script>

<style scoped lang="scss">
	.center-style {
		display: flex;
		align-items: center;
	}

	.shu-center-style {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.between-style {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.view-lottery {
		width: 100%;
		overflow: hidden;
		padding-bottom: 170rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		font-family: PingFangSC, PingFang SC;
		box-sizing: border-box;
		.image-back {
			width: 48rpx;
			height: 48rpx;
			position: fixed;
			left: 16rpx;
			top: 118rpx;
			z-index: 100;
		}

		.image-share {
			width: 48rpx;
			height: 48rpx;
			position: fixed;
			right: 22rpx;
			top: 118rpx;
			z-index: 100;
		}

		.view-up {
			flex: 1;
			display: flex;
			width: 100%;
			flex-direction: column;

			.vew-up-up {
				width: 100%;
				height: 1390rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				flex-grow: 0;
				flex-shrink: 0;
				position: relative;

				.image-0-yuane {
					width: 472rpx;
					height: 99rpx;
					margin-top: 182rpx;
				}

				.image-10-jf {
					width: 630rpx;
					height: 64rpx;
					margin-top: 32rpx;
				}

				.scroll-dm {
					position: absolute;
					left: calc((100% - 690rpx)/2);
					top: 416rpx;
					width: 690rpx;
					height: 50rpx;

					.view-dm-box {
						height: 50rpx;
						display: flex;
						align-items: center;
						white-space: nowrap;

						&.danmu-scroll {
							animation: scroll-left 20s linear infinite;
						}

						.view-ge-box {
							display: flex;
							align-items: center;
							height: 42rpx;
							background: rgba(44, 46, 58, 0.4);
							border-radius: 22rpx;
							margin-right: 34rpx;
							flex-shrink: 0;

							.image-tx {
								width: 42rpx;
								height: 42rpx;
								border-radius: 100%;
								margin-right: 10rpx;
							}

							.text-trjf {
								font-weight: 400;
								font-size: 24rpx;
								color: #FFFFFF;
								line-height: 34rpx;
								white-space: nowrap;
								margin-right: 12rpx;
							}
						}
					}
				}

				@keyframes scroll-left {
					0% {
						transform: translateX(100%);
					}

					100% {
						transform: translateX(-100%);
					}
				}


				.view-hdgz {
					width: 124rpx;
					height: 51rpx;
					background: #FFF7D4;
					box-shadow: 2rpx 2rpx 20rpx 0rpx #E4A749;
					border-radius: 200rpx 0rpx 0rpx 200rpx;
					font-weight: 500;
					font-size: 24rpx;
					color: #BF7D2B;
					line-height: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 0;
					top: 208rpx;
				}

				.view-gift {
					width: 690rpx;
					height: 685rpx;
					margin-top: 40rpx;

					background-size: 100% 100%;
					background-repeat: no-repeat;
					display: flex;
					flex-direction: column;
					align-items: center;

					.view-djs {
						width: 450rpx;
						height: 52rpx;
						margin-top: 108rpx;
						display: flex;
						justify-content: center;

						.text-djs-tip {
							font-weight: 600;
							font-size: 24rpx;
							color: #B52F14;
							line-height: 34rpx;
						}

						::v-deep {
							.uni-countdown__number {
								background: rgba(44, 46, 58, 0.5) !important;
								border-radius: 4rpx;
							}

							.uni-countdown__splitor {
								color: #B52F14 !important;
							}

							.uni-countdown__number {
								font-weight: 600 !important;
								color: #FFFFFF !important;
							}
						}
					}

					.image-award {
						width: 344rpx;
						height: 196rpx;
						margin-top: 56rpx;

						&.expired {
							opacity: 0.3;
						}
					}

					.text-award-name {
						font-weight: 600;
						font-size: 24rpx;
						color: #951F07;
						line-height: 34rpx;
						margin-top: 14rpx;

						&.expired {
							opacity: 0.3;
						}
					}

					.view-xccj {
						width: 416rpx;
						height: 96rpx;
						margin-top: 16rpx;
						background: rgba(255, 255, 255, 0.8);
						border-radius: 12rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						color: #B52F14;

						text:first-child {
							font-weight: 400;
							font-size: 24rpx;
						}

						text:last-child {
							font-weight: 600;
							font-size: 28rpx;
						}
					}

					.view-scj {
						width: 226rpx;
						height: 40rpx;
						margin-top: 12rpx;
						background: rgba(255, 255, 255, 0.8);
						border-radius: 12rpx;
						font-weight: 600;
						font-size: 28rpx;
						color: #FF5500;
						line-height: 28rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.view-jdt-big {
						width: 450rpx;
						height: 8rpx;
						background: #DEBEFF;
						border-radius: 4rpx;
						margin-top: 26rpx;

						.view-jdt-little {
							height: 8rpx;
							background: linear-gradient(90deg, #9043EF 0%, #F74C2E 100%);
							border-radius: 4rpx;
						}
					}

					.view-bqjd {
						width: 450rpx;
						margin-top: 6rpx;
						font-weight: 600;
						font-size: 22rpx;
						color: #951F07;
						line-height: 32rpx;
					}
				}

				.image-dwcdj {
					width: 500rpx;
				}

				.image-zdcdj {
					width: 460rpx;
					margin-top: 14rpx;
				}
			}

			.view-up-xia {
				width: 100%;
				background: #FCB48B;
				flex-grow: 0;
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				.view-wdcjm {
					width: 718rpx;
					height: 342rpx;
					
					margin-top: -120rpx;

					.text-wdcjm1 {
						font-weight: 600;
						font-size: 32rpx;
						color: #FFFFFF;
						line-height: 44rpx;
					}

					.text-wdcjm2 {
						font-weight: 600;
						font-size: 26rpx;
						color: #FFFFFF;
						line-height: 36rpx;
					}

					.image-ice {
						width: 48rpx;
						height: 46rpx;
					}

					.text-zjgl {
						font-weight: 600;
						font-size: 28rpx;
						color: #FF5500;
						line-height: 40rpx;
					}

					.view-cjm-box {
						height: 132rpx;
						margin: 40rpx auto 0;
						width: 700rpx;
						display: grid;
						grid-template-columns: 1fr 1fr;
						grid-template-rows: 1fr 1fr;
						row-gap: 28rpx;

						.text-cjm-name {
							font-weight: 400;
							font-size: 26rpx;
							color: #ABABAB;
							line-height: 36rpx;
						}

						.text-cjm-value {
							width: 218rpx;
							height: 52rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 400;
							font-size: 26rpx;
							color: #2C2E3A;
						}
					}

					.view-ckqb {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 30rpx;

						.text-ckqb {
							font-weight: 400;
							font-size: 26rpx;
							color: #BD6D00;
							line-height: 26rpx;
						}

						.image-kz {
							width: 16rpx;
							height: 24rpx;
							margin-left: 6rpx;
						}
					}
				}

				.view-yqhy {
					width: 694rpx;
					height: 248rpx;
					background: linear-gradient(180deg, #FFFFFF 0%, #FFF4E5 100%);
					box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
					border-radius: 20rpx;
					margin-top: -10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.image-yqhydjf {
						width: 534rpx;
						height: 50rpx;
						margin-top: 22rpx;
					}

					.view-jfrs {
						font-weight: 600;
						font-size: 28rpx;
						color: #2C2E3A;
						line-height: 40rpx;
						margin-top: 12rpx;

						text {
							color: #FF5500;
						}
					}

					.label-ljyq {
						width: 326rpx;
						height: 70rpx;
						margin-top: 26rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 500;
						font-size: 30rpx;
						color: #FFFFFF;
						line-height: 42rpx;
					}
				}

				.view-lszj {
					width: 694rpx;
					margin-top: 15rpx;
					margin-bottom: 22rpx;
					padding-bottom: 28rpx;
					background: linear-gradient(180deg, #FFF7EC 0%, #FFFFFF 100%);
					box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
					border-radius: 20rpx;

					.image-juxing {
						width: 8rpx;
						height: 40rpx;
						margin-right: 8rpx;
					}

					.text-lszj-title {
						font-weight: 500;
						font-size: 32rpx;
						color: #2C2E3A;
						line-height: 44rpx;
					}

					.image-avatar {
						width: 56rpx;
						height: 56rpx;
						border-radius: 100%;
						margin-right: 16rpx;
					}

					.text-username {
						font-weight: 500;
						font-size: 28rpx;
						color: #2C2E3A;
						line-height: 28rpx;
					}

					.view-zjm {
						width: 196rpx;
						height: 54rpx;
						font-weight: 600;
						font-size: 20rpx;
						color: #FF5500;
						line-height: 28rpx;
						display: flex;
						align-items: center;
						padding-left: 20rpx;
					}

					.view-xu-line {
						width: 2rpx;
						height: 40rpx;
						border: 2rpx dashed #DDDDDD;
						margin-left: 44rpx;
						margin-top: 6rpx;
					}

					.text-zjsm {
						font-weight: 400;
						font-size: 24rpx;
						color: #ABABAB;
						line-height: 24rpx;
						margin-left: 24rpx;
						margin-top: 8rpx;
					}

					.text-jzs {
						font-weight: 400;
						font-size: 26rpx;
						color: #BD6D00;
						line-height: 26rpx;
					}

					.image-expand-down {
						width: 24rpx;
						height: 16rpx;
						margin-left: 2rpx;
					}
				}

				.view-huan {
					width: 694rpx;
					padding: 0 36rpx;
					display: flex;
					justify-content: space-between;
					position: absolute;
					top: 180rpx;

					.image-left {
						width: 14rpx;
						height: 56rpx;
					}

					.image-right {
						width: 14rpx;
						height: 56rpx;
					}
				}
			}
		}

		.view-low {
			width: 100%;
			box-sizing: border-box;
			padding: 12rpx 54rpx 64rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -1rpx 0rpx 0rpx #EBEBEB;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			.image-big {
				width: 72rpx;
				height: 72rpx;
			}

			.image-little {
				width: 48rpx;
				height: 48rpx;
			}

			.tab-text {
				font-weight: 400;
				font-size: 20rpx;
				color: #2C2E3A;
				line-height: 20rpx;
			}
		}
		
		.view-pop-manypoint {
			display: flex;
			flex-direction: column;
			align-items: end;
		
			.image-close {
				width: 44rpx;
				height: 44rpx;
				margin-bottom: 28rpx;
			}
		
			.view-nr {
				width: 654rpx;
				height: 618rpx;
				background-size: contain;
				display: flex;
				align-items: center;
				flex-direction: column;
		
				.text-1 {
					font-weight: 600;
					font-size: 40rpx;
					color: #2C2E3A;
					line-height: 40rpx;
					margin-top: 62rpx;
				}
		
				.text-2 {
					font-weight: 400;
					font-size: 30rpx;
					color: #ABABAB;
					line-height: 30rpx;
					margin-top: 22rpx;
					margin-bottom: 40rpx;
				}
		
				.text-3 {
					width: 508rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;
					margin-top: 36rpx;
		
					text {
						font-weight: 600;
						color: #FF5500;
					}
				}
		
				.view-shu-add {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 508rpx;
					height: 96rpx;
					background: #F8F8F8;
					border-radius: 12rpx;
					padding: 0 16rpx;
					font-weight: 600;
					font-size: 32rpx;
					color: #2C2E3A;
					line-height: 32rpx;
		
					image {
						width: 64rpx;
						height: 64rpx;
					}
				}
		
				.label-ljtz {
					width: 456rpx;
					height: 98rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 56rpx;
					font-weight: 600;
					font-size: 32rpx;
					color: #FFFFFF;
					line-height: 32rpx;
				}
		
				.text-zjf {
					font-weight: 600;
					font-size: 28rpx;
					color: #BF7D2B;
					line-height: 28rpx;
				}
		
				.image-zjf {
					width: 16rpx;
					height: 24rpx;
				}
			}
		}
		
		.view-pop-sendcode {
			display: flex;
			flex-direction: column;
			position: relative;
		
			.image-close {
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				right: 0;
				z-index: 10;
			}
		
			.image-sncdj {
				width: 522rpx;
				height: 606rpx;
			}
		
			.label-lqck {
				width: 442rpx;
				height: 94rpx;
				background: linear-gradient(180deg, #FFFDED 0%, #FFCA10 53%, #FFC400 100%);
				border-radius: 48rpx;
				font-weight: 600;
				font-size: 34rpx;
				color: #FFFFFF;
				line-height: 34rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 auto;
			}
		}

	}
</style>