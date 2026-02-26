<template>
	<view class="saleDetail">
		<GlobalSidebar />
		<YppHeader></YppHeader>
		<view class="content">
			<view class="salecon">
				<view class="left">
					<view>处理售后</view>
					<view class="flow">
						<view class="flow-content">
							<view class="item" v-for="(item,index) in process" @click="step = index">
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
						<view v-if="step == 0" style="margin-top: 20rpx;font-weight: 600;
								font-size: 44rpx;">
							买家申请退款
						</view>
						<view class="two" v-if="step == 1">
							<view class="merchat">
								<image :src="globalstore.upImageuler('/static/mine/hcha.png')" mode="scaleToFill"></image>
								{{orderDetail.afterSaleDetailVO.afterSaleStatusDesc}}
							</view>
							<view>{{orderDetail.afterSaleDetailVO.afterSaleReasonDesc}}</view>
							<view class="imglist">
								<view class="lefts">
									<view>举证上传图片/视频</view>
									<view>
										<image class="item" :src="globalstore.upImageuler('/static/about/she.png')" mode="aspectFill"
											v-for="item in 2"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="one" v-if="step == 2">
							<view>买家退货信息</view>
							<view class="danhao">
								<view>快递单号</view>
								<view>
									<view>{{orderDetail.afterSaleDetailVO.refundTrackingNumbers}} |</view>
									<view @click="onCopy(orderDetail.afterSaleDetailVO.refundTrackingNumbers)">复制</view>
								</view>
							</view>
							<view class="updata">
								<view>上传照片</view>
								<view>
									<image :src="item" mode="aspectFit" v-for="(item,index) in orderDetail.afterSaleDetailVO.returnShipmentUrls">
									</image>
								</view>
							</view>

						</view>
						<view class="therr" v-if="step == 3">
							<view class="tui">
								<image :src="globalstore.upImageuler('/static/mine/jie.png')" mode="scaleToFill"></image>
								<view>退款成功 <span>¥{{orderDetail.afterSaleDetailVO.refundAmt}}</span></view>
							</view>
							<view class="time-lu" style="margin: 26rpx 0 36rpx;">
								<view>退款路径</view>
								<view>支付宝</view>
							</view>
							<view class="time-lu">
								<view>退款时间</view>
								<view>{{orderDetail.finishTime}}</view>
							</view>
						</view>
						<image :src="globalstore.upImageuler('/static/mine/time.png')" mode="widthFix"></image>
					</view>
					<view class="butlist">
						<view v-for="(item,index) in butList" :class="{defa: !index}" @click="item.click">{{item.title}}</view>
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
							<view style="font-weight: 600;">{{orderDetail.afterSaleDetailVO.afterSaleReasonDesc}}</view>
						</view>
						<view class="upimg" v-if="orderDetail.afterSaleDetailVO.submitAfterReasonPictUrls.length !== 0">
							<view>退款上传图片</view>
							<view class="imgls">
								<image :src="item" mode="aspectFit" v-for="(item,index) in orderDetail.afterSaleDetailVO.submitAfterReasonPictUrls" @click="lookImageLsit(orderDetail.afterSaleDetailVO.submitAfterReasonPictUrls,index)">
								</image>
							</view>
						</view>
						<view class="reason">
							<view>退款金额</view>
							<view style="font-weight: 600;font-size: 34rpx;">¥{{orderDetail.afterSaleDetailVO.refundAmt}}</view>
						</view>
						<view class="reason">
							<view>申请时间</view>
							<view style="color: #ABABAB;">{{orderDetail.afterSaleDetailVO.createTime}}</view>
						</view>
						<view class="reason" v-if="orderDetail.afterSaleDetailVO.refundTime">
							<view>处理时间</view>
							<view style="color: #ABABAB;">{{orderDetail.afterSaleDetailVO.refundTime}}</view>
						</view>
					</view>
				</view>
				<view class="right">
					<order-info :status="1" :info="orderDetail"></order-info>
				</view>
			</view>
		</view>
		
		<popup-modal :show="orderRefund.show" @suer="orderRefund.onSure()" @close="orderRefund.onCancel()">
			<template #title>
				<view>
					<view>售后确认</view>
					<view style="font-weight: 400;font-size: 28rpx;margin-top: 20rpx;">
						请确保您的货品已收到或与对方协商一直,您确定要同意本次售后操作吗？
					</view>
				</view>
			</template>
		</popup-modal>
		<modal-reject v-if="responReject.show" :type-order="responReject.type" @click="(e) =>responReject.onClick(e)" @close="responReject.onClose()"></modal-reject>
		<popup-modal :show="afterAgree.show" @suer="afterAgree.onSure()" @close="afterAgree.onCancel()">
			<template #title>
				<view class="afterAgree">
					<view>同意售后</view>
					<view class="afterList">
						<view class="item">
							<view>售后原因</view>
							<view>{{afterAgree.reslove.afterSaleDetailVO.afterSaleReasonDesc}}</view>
						</view>
						<view class="item">
							<view>{{afterAgree.duty.marginTitle}}</view>
							<view>{{afterAgree.duty.marginAmount}}</view>
						</view>
						<view>
							<view class="item">
								<view>退款金额</view>
								<view style="color: #ff5500;">¥{{afterAgree.reslove.totalPrice}}</view>
							</view>
							<view style="font-size: 26rpx;font-weight: 400;color: #BF7D2B;text-align: right;">{{afterAgree.duty.msg1}}</view>
						</view>
					</view>
					<view style="text-align: left;">是否确定同意该订单售后？</view>
				</view>
			</template>
		</popup-modal>
		<modal-return-address v-if="addressSelect.show" @click="addressSelect.onClick" @close="addressSelect.onClose()"></modal-return-address>
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
		onLoad
	} from '@dcloudio/uni-app'
	import {
		sellOrderDetail,
		confirmReturnItem,
		urgAfterSaleSentItem,
		confirmAfterSales
	} from '../../api/common';
	import { onCopy,lookImageLsit,longAndSheImageList,getReasonMapSeller } from '../../utils/common';
	import { ProhibitScroll,TurnOnScrool } from '../../utils/scroll';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import ModalReject from '../../components/ModalReject/ModalReject.vue';
	import ModalReturnAddress from '../../components/ModalReturnAddress/ModalReturnAddress.vue';
	
	const globalstore = useGlobalStore()
	const process = ref(null)	
	//but_id: 0:联系买家，1:确认收货同意退款,2:拒收，3:提醒退货,4:同意 ,5:拒绝
	const butListMap = [
		{
			id: '99001',
			content: [{but_id: '4',title: '同意',click(){ClickMap.saleAgree(orderDetail.value)}},{but_id: '5',title: '拒绝',click(){ClickMap.saleRefuse(orderDetail.value)}}
			,{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99002',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99003',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99004',
			content: [{but_id: '3',title: '提醒退货',click(){ClickMap.remind(orderDetail.value)}},{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99005',
			content: [{but_id: '1',title: '确认收货同意退款',click(){ClickMap.agreeRefund(orderDetail.value)}},{but_id: '2',title: '拒收',click(){ClickMap.reject(orderDetail.value)}},
			{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99006',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99007',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99009',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		},
		{
			id: '99010',
			content: [{but_id: '0',title: '联系买家',click(){ClickMap.contact(orderDetail.value)}}]
		}
	]
	
	const ClickMap = {
		//联系对方
		contact(e){
			console.log('联系对方')
		},
		//同意收货确认退款
		agreeRefund(e){
			orderRefund.show = true
			orderRefund.orderCode = e.afterSaleDetailVO.afterSaleCode
			ProhibitScroll()
		},
		//拒收
		reject(e){
			responReject.show = true
			responReject.orderCode = e.afterSaleDetailVO.afterSaleCode
			ProhibitScroll()
		},
		//提醒退货
		remind(e){
			urgAfterSaleSentItem({
				afterSaleCode: e.afterSaleDetailVO.afterSaleCode
			}).then(res => {
				uni.showToast({
					title: '已提醒买家退货',
					icon: 'none'
				})
			})
		},
		//同意售后
		saleAgree(e){
			afterAgree.show = true
			afterAgree.duty = getReasonMapSeller(e.marginAmount,e.violationRecord)[e.afterSaleDetailVO.afterSaleReasonId]
			afterAgree.reslove = e
			ProhibitScroll()
		},
		//拒绝售后
		saleRefuse(e){
			responReject.show = true
			responReject.orderCode = e.afterSaleDetailVO.afterSaleCode
			responReject.type = '拒绝'
		}
	}
	
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
	const step = ref(0)
	const orderCode = ref('')
	const orderDetail = ref({})
	const butList = ref(null)
	
	const orderRefund = reactive({
		show: false,
		orderCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSure() {
			confirmReturnItem({
				afterSaleCode: this.orderCode,
				isAccept: 1 //1同意0拒绝
			}).then(res => {
				uni.showToast({
					title: '已同意退款',
					icon: 'none'
				})
				this.onCancel()
				window.close()
			})
		}
	})
	
	const responReject = reactive({
		show: false,
		orderCode: '',
		type: '',
		onClose(){
			this.show = false
			TurnOnScrool()
		},
		onClick(e) {
			if(this.type === '拒收'){
				confirmReturnItem({
						afterSaleCode: this.orderCode,
						isAccept: 0,
						rejectAcceptReason: e.respon,
						rejectAcceptUrls: e.imgList
					}).then(res=>{
						this.onClose()
						getList()
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
				})
			}
			if(this.type === '拒绝'){
				confirmAfterSales({
					afterSaleCode: this.orderCode,
					isAgree: 0,
					reason: e.respon,
					unAgreePictUrls: e.imgList
				}).then(res=>{
					this.onClose()
					getList()
					uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
				})
			}
	
		}
	})
	
	const afterAgree = reactive({
		show: false,
		reslove: {},
		duty: {},
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSure() {
			addressSelect.show = true
			this.show = false
		}
	})
	
	const addressSelect = reactive({
		show: false,
		onClose(){
			this.show = false
			TurnOnScrool()
		},
		onClick(e) {
			confirmAfterSales({
				afterSaleCode: afterAgree.reslove.afterSaleDetailVO.afterSaleCode,
				isAgree: 1,
				refundUserAddress: e.loaction + e.address,
				refundUserCity: e.loaction,
				refundUserName: e.name,
				refundUserPhone: e.phone
			}).then(res=>{
				this.onClose()
				getOrder(orderCode.value)
				uni.showToast({
					title: '已同意退款',
					icon: 'none'
				})
			})
		}
	})

	const getOrder = (orderCode) => {
		sellOrderDetail({
			orderCode
		}).then(res => {
			const orderSource = orderSourceMap[res.data.orderSource];
			const sourceData = res.data[orderSource].afterSaleDetailVO.processNodeInfoVO?.sellerNodes;
			step.value = sourceData.findIndex(item => item.ifExec);
			process.value = sourceData.map(item => item.desc);
			orderDetail.value = res.data[orderSource];
			butList.value = butListMap.find(item=>orderDetail.value.orderStatus == item.id).content
			console.log(orderDetail.value);
		})
	}
	
	onLoad((e) => {
		orderCode.value = e.orderCode
		getOrder(e.orderCode)
	})
	
	const onDetail = (e) =>{
		console.log('我卖出的')
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
							display: flex;
							flex-direction: column;
							gap: 20rpx;
							margin-top: 20rpx;

							>view:first-child {
								font-weight: 600;
								font-size: 44rpx;
								color: #2C2E3A;
							}

							.danhao {
								display: flex;
								align-items: center;
								gap: 28rpx;
								line-height: 28rpx;

								>view:last-child {
									color: #ABABAB;
									display: flex;
									align-items: center;
									gap: 8rpx;

									>view:last-child {
										color: #2C2E3A;
										cursor: pointer;
									}
								}
							}

							.updata {
								display: flex;
								flex-direction: column;
								gap: 16rpx;

								>view:last-child {
									display: flex;
									align-items: center;
									gap: 40rpx;

									>image {
										width: 134rpx;
										height: 134rpx;
										background-color:#f8f8f8 ;
										border-radius: 12rpx;
									}
								}
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
								background-color: #f8f8f8;
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
		.afterAgree{
			width: 100%;
			.afterList{
				display: flex;
				flex-direction: column;
				gap: 10rpx;
				padding: 20rpx 16rpx;
				box-sizing: border-box;
				background-color: #F8F8F8;
				border-radius: 12rpx;
				margin: 20rpx 0;
				width: 100%;
				.item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					>view:first-child{
						font-weight: 400;
					}
					>view:last-child{
						font-weight: 500;
					}
				}
			}
		}
	}
</style>