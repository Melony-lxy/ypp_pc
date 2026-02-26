<template>
	<view class="saleDetail">
		<GlobalSidebar />
		<YppHeader :index="-1"></YppHeader>
		<view class="content">
			<view class="salecon">
				<view class="left">
					<view>售后详情</view>
					<view class="flow">
						<view class="flow-content">
							<view class="item" v-for="(item,index) in process">
								<image v-if="index !==0" :src="globalstore.upImageuler('/static/mine/jiatou.png')" mode="scaleToFill">
								</image>
								<view class="title">
									<view v-if="step == index" style="background: #FFC400">{{index + 1}}</view>
									<image v-if="step > index" :src="globalstore.upImageuler('/static/mine/cheng.png')" mode="scaleToFill"
										style="width: 40rpx;height: 40rpx;"></image>
									<view v-if="step < index" style="background:#ABABAB">{{index + 1}}</view>
									<view>{{item}}</view>
								</view>
							</view>
						</view>
						<view class="one" v-if="step == 0">
							<view>等待卖家处理</view>
							<view>卖家将在48小时内为您处理，请您耐心等待</view>
						</view>
						<view class="two" v-if="step == 1">
							<view class="merchat">
								<image :src="globalstore.upImageuler('/static/mine/ju.png')" mode="scaleToFill"></image>
								{{orderDetail.afterSaleDetailVO.afterSaleStatusDesc}}
							</view>
							<view>卖家拒绝理由</view>
							<view class="imglist">
								<view class="lefts">
									<view>上传图片/视频</view>
									<view>
										<image class="item" :src="globalstore.upImageuler('/static/about/she.png')" mode="aspectFill"
											v-for="item in 2"></image>
									</view>
								</view>
								<view class="rights">
									历史举证
								</view>
							</view>
						</view>
						<view class="therr" v-if="step == 2">
							<view class="tui">
								<image :src="globalstore.upImageuler('/static/mine/jie.png')" mode="scaleToFill"></image>
								<view>退款成功 <span>¥{{orderDetail.totalPrice}}</span></view>
							</view>
							<view class="time-lu" style="margin: 26rpx 0 36rpx;">
								<view>退款路径</view>
								<view>支付宝</view>
							</view>
							<view class="time-lu">
								<view>退款时间</view>
								<view>{{orderDetail.afterSaleDetailVO?.interceptionTime}}</view>
							</view>
						</view>
						<image :src="globalstore.upImageuler('/static/mine/time.png')" mode="widthFix"></image>
					</view>
					<view class="butlist">
						<view v-for="(item,index) in butlist" :class="{defa: !index}" @click="item.click">{{item.title}}</view>
					</view>
					<view class="infoDetail">
						<view class="shopitem">
							<image :src="orderDetail.itemImageUrl || orderDetail?.pictureDetails?.split(',')?.[0] || longAndSheImageList[orderDetail.productName] || longAndSheImageList[orderDetail.productId]" mode="aspectFit"></image>
							<view class="right">
								<view @click="onDetail(orderDetail)">
									<view>{{orderDetail.productName}}</view>
									<uni-icons type="right" color="#ABABAB"></uni-icons>
								</view>
								<view>保证金: ¥{{orderDetail.marginAmount}}</view>
								<view class="price">
									<view><span>¥</span>{{orderDetail.totalPrice}}</view>
									<view>包邮</view>
								</view>
							</view>
						</view>
						<view class="reason">
							<view>退款原因</view>
							<view style="font-weight: 600;">{{orderDetail.afterSaleDetailVO?.afterSaleReasonDesc}}</view>
						</view>
						<view class="upimg" v-if="orderDetail.afterSaleDetailVO?.submitAfterReasonPictUrls.length != 0">
							<view>退款上传图片</view>
							<view class="imgls">
								<image :src="item" mode="aspectFill"
									v-for="(item,index) in orderDetail.afterSaleDetailVO?.submitAfterReasonPictUrls" @click="lookImageLsit(orderDetail.afterSaleDetailVO?.submitAfterReasonPictUrls,index)"></image>
							</view>
						</view>
						<view class="reason">
							<view>退款金额</view>
							<view style="font-weight: 600;font-size: 34rpx;">¥{{orderDetail.afterSaleDetailVO?.refundAmt}}</view>
						</view>
						<view class="reason">
							<view>申请时间</view>
							<view style="color: #ABABAB;">{{orderDetail.afterSaleDetailVO?.createTime}}</view>
						</view>
						<view class="reason" v-if="orderDetail.afterSaleDetailVO?.finishTime">
							<view>处理时间</view>
							<view style="color: #ABABAB;">{{orderDetail.afterSaleDetailVO?.finishTime}}</view>
						</view>
					</view>
				</view>
				<view class="right">
					<order-info :status="1" :info="orderDetail"></order-info>
				</view>
			</view>
		</view>
		<PopupModal :show="orderRevoke.show" title="请确保您的货品已收到或与对方协商一致，您确定要撤销本次操作吗？" @close="orderRevoke.onCancel()"
			@suer="orderRevoke.onSuer()"></PopupModal>
		<popup-send v-if="sendCode.show" :order="sendCode.order" @click="(e)=>sendCode.onClick(e)" @close="sendCode.onClose()"></popup-send>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		useGlobalStore
	} from '../../store/store';
	import orderInfo from '../../components/orderInfo/orderInfo.vue';
	import {
		lookImageLsit
	} from '../../utils/common';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		BuyerOrderDetail,
		cancelAfterSales,
		returnShipment,
		urgShipAfterSaleItems,
		platformIntervention
	} from '../../api/common';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import { TurnOnScrool, ProhibitScroll} from '../../utils/scroll';
	import { longAndSheImageList } from '../../utils/common';
	import PopupSend from '../../components/PopupSend/PopupSend.vue';

	const globalstore = useGlobalStore()
	const process = ['商家处理', '寄回商品', '退款结束']
	
	// but_id: 0:撤销申请，1:联系卖家，2:平台介入，3:提醒收货，4:退货
	const butListMap = [
		{
			id: '99001',
			content: [{but_id: '0',title: '撤销申请',click(){ClickMap.revoke(orderDetail.value.afterSaleDetailVO.afterSaleCode)}},{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}},
			{but_id: '2',title: '平台介入',click(){ClickMap.platform(orderDetail.value)}}]
		},
		{
			id: '99002',
			content: [{but_id: '0',title: '撤销申请',click(){ClickMap.revoke(orderDetail.value.afterSaleDetailVO.afterSaleCode)}},{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}},
			{but_id: '2',title: '平台介入',click(){ClickMap.platform(orderDetail.value)}}]
		},
		{
			id: '99003',
			content: [{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99004',
			content: [{but_id: '4',title: '退货',click(){ClickMap.returnShip(orderDetail.value)}},{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}},
			{but_id: '2',title: '平台介入',click(){ClickMap.platform(orderDetail.value)}}]
		},
		{
			id: '99005',
			content: [{but_id: '3',title: '提醒收货',click(){ClickMap.reminder(orderDetail.value)}},{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}},{but_id: '2',title: '平台介入',click(){ClickMap.platform(orderDetail.value)}}]
		},
		{
			id: '99006',
			content: [{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99007',
			content: [{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99009',
			content: [{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99010',
			content: [{but_id: '1',title: '联系卖家',click(){ClickMap.contact(orderDetail.value)}}]
		}
	]
	
	const orderSourceMap = {
		'001': 'bargainDetailOrderInfoVO',
		'002': 'packageDetailOrderInfoVO',
		'003': 'commonDetailOrderInfoVO',
		'004': 'purchaseDetailOrderInfoVO',
		'005': 'grailPurchaseDetailOrderInfoVO',
		'006': 'grailPublishDetailOrderInfoVO',
		'007': 'storagePurchaseDetailOrderInfoVO',
		'008': 'storagePublishDetailOrderInfoVO'
	}
	const orderCoder = ref('')
	const orderDetail = ref({})
	const step = ref(0)
	const butlist = ref(null)

	const getOrder = (orderCode) => {
		BuyerOrderDetail({
			orderCode
		}).then(res => {
			step.value = res.data[orderSourceMap[res.data.orderSource]].afterSaleDetailVO.processNodeInfoVO?.buyerNodes
				.findIndex(item => item.ifExec)
			orderDetail.value = res.data[orderSourceMap[res.data.orderSource]]
			butlist.value = butListMap.find(item=>item.id == orderDetail.value.orderStatus).content
			console.log(butlist.value)
			console.log(orderDetail.value);
		})
	}
	
	const orderRevoke = reactive({
		show: false,
		afterSaleCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
		cancelAfterSales({
			afterSaleCode: this.afterSaleCode
		}).then(res => {
			this.onCancel()
			uni.showToast({
				title: '已撤销售后',
				icon: 'none'
			})
			window.close()
		})
		}
	})
	
	const sendCode = reactive({
		show: false,
		order: {type: 1,orderCode: ''},//type: 0,我卖出的;1,我买到的
		afterSaleCode: '',
		onClose(){
			this.show = false
			TurnOnScrool()
		},
		onClick(e){
			console.log(e)
			returnShipment({
				afterSaleCode: this.afterSaleCode,
				refundTrackingNumbers: e.tackNumber,
				returnShipmentUrls: e.imgList
			}).then(res=>{
				uni.showToast({
					title: '已退货',
					icon: 'none'
				})
				this.onClose()
				getOrder(orderCoder.value)
			})
			
		}
	})
	
	const ClickMap = {
		//撤销售后
		revoke(afterSaleCode){
			orderRevoke.show = true
			orderRevoke.afterSaleCode = afterSaleCode
			ProhibitScroll()
		},
		//联系对方
		contact(e){
			console.log('联系对方')
		},
		//平台介入
		platform(e){
			platformIntervention({
				afterSaleCode: e.afterSaleDetailVO.afterSaleCode
			}).then(res => {
				uni.showToast({
					title: '已申请平台介入',
					icon: 'none'
				})
				uni.redirectTo({
					url: `/pages/order/order?type=0&orderCode=${e.orderCode}&status=${e.orderStatus}`
				})
			})
		},
		//提醒收货
		reminder(e){
			urgShipAfterSaleItems({afterSaleCode: e.afterSaleDetailVO.afterSaleCode}).then(res=>{
				uni.showToast({
					title: '已提醒卖家收货',
					icon: 'none'
				})
			})
		},
		//退货
		returnShip(item){
			sendCode.show = true
			sendCode.order.orderCode = item.orderCode
			sendCode.afterSaleCode = item.afterSaleDetailVO.afterSaleCode
			ProhibitScroll()
		}
	}

	onLoad((option) => {
		orderCoder.value = option.orderCoder
		getOrder(option.orderCode)
	})
	
	const onDetail = (e) =>{
		console.log('买家退货');
		uni.navigateTo({
			url: '/pages/details/details?id=' + e.publishId
		})
	}
</script>

<style scoped lang="scss">
	.saleDetail {
		background-color: #fdfdfd;

		.content {
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			gap: 40rpx;
			height: calc(100vh - 232rpx);

			.salecon {
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.08);
				border-radius: 16rpx;
				padding: 50rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				gap: 40rpx;

				.left {
					display: flex;
					flex-direction: column;
					width: calc(100% - 27.3001% - 40rpx);

					>view:first-child {
						font-weight: 600;
						font-size: 36rpx;
					}

					.flow {
						padding: 28rpx 24rpx 36rpx;
						box-sizing: border-box;
						background: #FFFDF6;
						border-radius: 12rpx;
						position: relative;
						margin: 20rpx 0 32rpx;

						.flow-content {
							display: flex;
							align-items: center;
							gap: 12rpx;

							.item {
								display: flex;
								align-items: center;
								gap: 12rpx;
								font-weight: 600;
								font-size: 30rpx;
								color: #2C2E3A;

								.title {
									display: flex;
									align-items: center;
									gap: 6rpx;

									>view:first-child {
										height: 40rpx;
										width: 40rpx;
										font-weight: 600;
										font-size: 28rpx;
										color: #FFFFFF;
										background: #FFC400;
										border-radius: 50%;
										display: flex;
										align-items: center;
										justify-content: center;
										text-align: center;
									}
								}

								span {}

								>image {
									width: 44rpx;
									height: 24rpx;
								}
							}

						}

						.one {
							>view:nth-child(1) {
								font-weight: 600;
								font-size: 44rpx;
								color: #2C2E3A;
								margin: 20rpx 0 8rpx;
							}

							>view:nth-child(2) {
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}
						}

						.two {
							margin-top: 20rpx;

							.merchat {
								display: flex;
								align-items: center;
								gap: 12rpx;
								font-weight: 600;
								font-size: 44rpx;
								color: #2C2E3A;

								>image {
									width: 44rpx;
									height: 44rpx;
								}
							}

							>view:nth-child(2) {
								margin: 16rpx 0 24rpx;
								font-weight: 600;
								font-size: 28rpx;
								color: #BF7D2B;
								line-height: 28rpx;
							}

							.imglist {
								display: flex;
								justify-content: space-between;
								align-items: flex-end;

								.lefts {
									display: flex;
									flex-direction: column;
									gap: 16rpx;

									>view:first-child {
										font-weight: 600;
										font-size: 24rpx;
										color: #ABABAB;
										line-height: 24rpx;
									}

									>view:last-child {
										display: flex;
										align-items: center;
										gap: 40rpx;

										.item {
											width: 134rpx;
											height: 134rpx;
											border-radius: 12rpx;
											background-color: #fff;
										}
									}
								}

								.rights {
									background: #FFFFFF;
									border-radius: 42rpx;
									border: 2rpx solid #D8D8D8;
									padding: 12rpx 28rpx;
									box-sizing: border-box;
									cursor: pointer;
								}
							}
						}

						.therr {
							margin-top: 20rpx;

							.tui {
								display: flex;
								align-items: center;
								gap: 12rpx;

								>image {
									width: 44rpx;
									height: 44rpx;
								}

								>view {
									font-weight: 600;
									font-size: 44rpx;
									color: #2C2E3A;

									>span {
										font-weight: 600;
										font-size: 34rpx;
										color: #2C2E3A;
										line-height: 28rpx;
									}
								}
							}

							.time-lu {
								display: flex;
								align-items: center;
								gap: 28rpx;
								line-height: 28rpx;

								>view:last-child {
									color: #ABABAB;
								}
							}
						}

						>image {
							width: 148rpx;
							height: 148rpx;
							position: absolute;
							top: 12rpx;
							right: 10rpx;
						}
					}

					.butlist {
						display: flex;
						align-items: center;
						gap: 28rpx;

						>view {
							background: #FFFFFF;
							border-radius: 42rpx;
							border: 2rpx solid #D8D8D8;
							padding: 12rpx 24rpx;
							box-sizing: border-box;
							cursor: pointer;
						}

						.defa {
							font-weight: 600;
							color: #FFFFFF;
							background: #FFC400;
							border: 2rpx solid #FFC400;
						}
					}

					.infoDetail {
						display: flex;
						flex-direction: column;
						gap: 40rpx;
						margin-top: 40rpx;

						.shopitem {
							display: flex;
							align-items: center;
							gap: 16rpx;
							margin-top: 4rpx;

							>image {
								width: 156rpx;
								height: 156rpx;
								border-radius: 12rpx;
								background-color: #F8F8F8;
							}

							.right {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								height: 100%;

								>view:first-child {
									font-weight: 500;
									font-size: 30rpx;
									color: #2C2E3A;
									line-height: 30rpx;
									display: flex;
									align-items: center;
									gap: 8rpx;
									cursor: pointer;
									>view{
										flex: 1;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
									}
								}

								>view:nth-child(2) {
									font-weight: 400;
									font-size: 26rpx;
									color: #656565;
									line-height: 26rpx;
									margin: 20rpx 0 30rpx;
								}

								.price {
									display: flex;
									align-items: center;
									gap: 40rpx;

									>view:first-child {
										font-weight: 600;
										font-size: 34rpx;
										color: #2C2E3A;
										line-height: 34rpx;

										>span {
											font-size: 24rpx;
										}
									}

									>view:last-child {
										font-weight: 400;
										font-size: 26rpx;
										color: #2C2E3A;
										line-height: 26rpx;
									}
								}
							}
						}

						.reason {
							display: flex;
							align-items: center;
							gap: 24rpx;
							line-height: 28rpx;
						}

						.upimg {
							display: flex;
							flex-direction: column;
							gap: 20rpx;
							line-height: 28rpx;

							.imgls {
								display: flex;
								align-items: center;
								gap: 40rpx;

								>image {
									width: 134rpx;
									height: 134rpx;
									border-radius: 12rpx;
									cursor: pointer;
								}
							}
						}
					}
				}

				.right {
					width: 27.3001%;

					.orderInfo {
						background: #FFFFFF;
						border-radius: 20rpx;
						border: 2rpx solid #EFEFEF;
						width: 100%;
						aspect-ratio: 0.625/1;
						box-sizing: border-box;
						padding: 32rpx 28rpx;

						>view:first-child {
							font-weight: 600;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
						}

						.gap {
							display: flex;
							flex-direction: column;
							margin-top: 30rpx;
							gap: 36rpx;

							.total {
								display: flex;
								justify-content: space-between;
								align-items: center;
								line-height: 28rpx;

								.price {
									font-weight: 600;
								}

								.copy {
									display: flex;
									align-items: center;
									gap: 8rpx;

									>view:first-child {
										font-weight: 400;
										color: #ABABAB;
									}

									>view:last-child {
										cursor: pointer;
										font-weight: 400;
									}
								}

								.time {
									color: #ABABAB;
									font-weight: 400;
								}
							}

							.upim {
								display: flex;
								flex-direction: column;
								gap: 20rpx;

								>view:last-child {
									display: flex;
									gap: 20rpx;
									align-items: center;
									flex-wrap: wrap;

									>image {
										width: 206rpx;
										height: 206rpx;
										border-radius: 12rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>