<template>
	<view class="MySold">
		<view class="Mytop">
			<view>我卖出的</view>
			<view class="taps">
				<view v-for="(item,index) in taps" :class="{active: tapsIndex === item.id}" @click="onTaps(item.id)">
					<view>{{item.title}}</view>
					<view class="tpaCount" v-if="onTapCount(item.id)">{{onTapCount(item.id)}}</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="tapsType">
				<view v-for="item in tapsType">{{item}}</view>
			</view>
		</view>
		<view class="mylist" v-if="orderList.length != 0" :key="refreshKey">
			<view class="list-item" v-for="(item,index) in orderList" @click="onOrder(item.orderCode,item.orderStatus)" :key="item.orderCode">
				<view class="infomation">
					<view class="infomation-top">
						<view class="load" v-if="item.orderStatusDesc == '待支付'">
							<image :src="globalstore.upImageuler('/static/mine/load.png')" mode="scaleToFill"></image>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="load" v-else-if="item.orderStatusDesc == '待发货' || item.orderStatusDesc == '已发货'">
							<image :src="globalstore.upImageuler('/static/mine/car.png')" mode="scaleToFill"></image>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="load" v-else-if="item.orderStatusDesc == '售后中'">
							<image :src="globalstore.upImageuler('/static/mine/afterSale.png')" mode="scaleToFill"></image>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="load" v-else-if="item.orderStatusDesc == '退费成功'">
							<image :src="globalstore.upImageuler('/static/mine/refund.png')" mode="scaleToFill"></image>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="load" v-else>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="timeEnd" v-if="item.orderStatus == '1'|| item.orderStatus == '11'">
							<image :src="globalstore.upImageuler('/static/mine/tim.png')" mode="scaleToFill"></image>
							<view v-if="diffTime(item.nowTimeStamp,item.payExpireTimeStamp)">支付剩余时间:</view>
							<view v-if="diffTime(item.nowTimeStamp,item.payExpireTimeStamp)">
								<uni-countdown :hour="diffTime(item.nowTimeStamp,item.payExpireTimeStamp).hour"
									:day="diffTime(item.nowTimeStamp,item.payExpireTimeStamp).day"
									:minute="diffTime(item.nowTimeStamp,item.payExpireTimeStamp).minute"
									:second="diffTime(item.nowTimeStamp,item.payExpireTimeStamp).second" color="#BF7D2B"
									splitorColor='#BF7D2B'></uni-countdown>
							</view>
							<view v-if="!diffTime(item.nowTimeStamp,item.payExpireTimeStamp)">支付已超时</view>
						</view>
						<view class="timeEnd" v-if="item.afterSaleInfoVO && item.afterSaleInfoVO.afterSaleStatusDesc != '交易成功'">
							{{item.afterSaleInfoVO.afterSaleStatusDesc}}
						</view>
					</view>
					<view class="shopinfoma">
						<view class="userInfo">
							<view class="avart">
								<image :src="item.buyerAvatar" mode="aspectFill"></image>
								<view>{{item.buyerNickName}}</view>
							</view>
							<view class="contact">
								<view>联系买家</view>
								<uni-icons type="right" color="#FFC400"></uni-icons>
							</view>
						</view>
						<view class="shop-content">
							<image
								:src="item.itemImageUrl || longAndSheImageList[item.productId] || item.pictureDetails?.split(',')?.[0] || item.goldCoinSpecList?.[0]?.imageUrl || longAndSheImageList[item.productName]"
								mode="aspectFit"></image>
							<view class="shopright">
								<view>{{item.productName}}</view>
								<view>{{item.descriptionDetails}}</view>
								<view><span>¥</span>{{item.totalPrice}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="deposit">
					<view class="depositinfo" v-if="item.marginAmount && item.marginAmount != 0">
						<view>保证金: <span> ¥{{item.marginAmount}}</span></view>
						<view v-if="item.orderStatus == '11'">该订单为保证金订单<br />需要卖家支付保证金后生效该订单</view>
					</view>
					<view class="haveno" v-else>非担保交易</view>
				</view>
				<view class="operation">
					<view class="opertop">
						<view>订单号:{{item.orderCode}}</view>
						<view>{{item.payExpireTime}}</view>
					</view>
					<view class="pay">
						<view :class="but_index ? 'but' : 'activebut' " v-for="(but_item,but_index) in butFind(item.orderStatus)"
							@click.stop="onClick(but_item.but_id,item)">{{but_item.but_title}}</view>
						<view class="but">订单详情</view>
					</view>
				</view>
			</view>
		</view>
		<no-data v-else></no-data>
		<page-bottom :total="total" @change="onPage"></page-bottom>
		
		<popup-modal :show="orderCancel.show" title="是否确定取消该订单" @suer="orderCancel.onSuer()"
			@close="orderCancel.onCancel()"></popup-modal>
		<popup-modal :show="cancelShopment.show" @suer="cancelShopment.onSure()" @close="cancelShopment.onCancel()">
			<template #title>
				<view>
					<view>取消发货</view>
					<view style="font-weight: 400;font-size: 28rpx;margin-top: 20rpx;">
						买家已付款，由于您为正常发货，将扣除您支付该商品的保证金¥{{cancelShopment.margin}}元,您确定要取消发货吗？
					</view>
				</view>
			</template>
		</popup-modal>
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
		<popup-modal :show="afterAgree.show" @suer="afterAgree.onSure()" @close="afterAgree.onCancel()">
			<template #title>
				<view class="afterAgree">
					<view>同意售后</view>
					<view class="afterList">
						<view class="item">
							<view>售后原因</view>
							<view>{{afterAgree.reslove.afterSaleInfoVO.afterSaleReasonDesc}}</view>
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
		<modal-reject v-if="responReject.show" :type-order="responReject.type" @click="(e) =>responReject.onClick(e)" @close="responReject.onClose()"></modal-reject>
		<popup-send v-if="sendCode.show" :order="sendCode.order" @click="(e)=>sendCode.onClick(e)" @close="sendCode.onClose()"></popup-send>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
	} from 'vue';
	import PageBottom from '../PageBottom/PageBottom.vue';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		orderSeller,
		soldCancelOrder,
		urgReceiptOrderItems,
		cancelShipOrderItems,
		urgAfterSaleSentItem,
		confirmReturnItem,
		confirmAfterSales,
		sendShipCode
	} from '../../api/common';
	import {
		longAndSheImageList
	} from '../../utils/common';
	import noData from '../noData/noData.vue';
	import {
		diffTime,
		getReasonMapSeller
	} from '../../utils/common';
	import {
		TurnOnScrool,
		ProhibitScroll
	} from '../../utils/scroll';
	import PopupModal from '../PopupModal/PopupModal.vue';
	import {
		onShow
	} from '@dcloudio/uni-app'
	import ModalReturnAddress from '../ModalReturnAddress/ModalReturnAddress.vue';
	import ModalReject from '../ModalReject/ModalReject.vue';
	import PopupSend from '../PopupSend/PopupSend.vue';

	const globalstore = useGlobalStore()
	const taps = [{
			id: '',
			title: '全部订单'
		},
		{
			id: '1',
			title: '已提交'
		},
		{
			id: '2',
			title: '待发货'
		},
		{
			id: '3',
			title: '已发货'
		},
		{
			id: '99',
			title: '售后'
		},
		{
			id: '4',
			title: '交易成功'
		},
		{
			id: '9',
			title: '异常'
		},
		{
			id: '11',
			title: '买家支付保证金'
		}
	]
	//but_id:  -1:取消，0:支付保证金，1:去发货，2:提醒收货，3:查看物流,4:取消发货,5:确认收货同意退款,6:拒收,7:提醒退货,8:同意,9:拒绝
	const butListMap = [{
			id: '11',
			butlist: [{
				but_id: '0',
				but_title: '支付保证金'
			}, {
				but_id: '-1',
				but_title: '取消'
			}],
		},
		{
			id: '2',
			butlist: [{
				but_id: '1',
				but_title: '去发货'
			}, {
				but_id: '4',
				but_title: '取消发货'
			}]
		},
		{
			id: '3',
			butlist: [{
				but_id: '2',
				but_title: '提醒收货'
			}, {
				but_id: '3',
				but_title: '查看物流'
			}]
		},
		{
			id: '99001',
			butlist: [{
				but_id: '8',
				but_title: '同意'
			}, {
				but_id: '9',
				but_title: '拒绝'
			}]
		},
		{
			id: '99005',
			butlist: [{
				but_id: '5',
				but_title: '确认收货同意退款'
			}, {
				but_id: '6',
				but_title: '拒收'
			}]
		},
		{
			id: '99004',
			butlist: [{
				but_id: '7',
				but_title: '提醒退货'
			}]
		},
		{
			id: '4',
			butlist: []
		},
		{
			id: '9',
			butlist: []
		},
		{
			id: '11',
			butlist: [{
				but_id: '0',
				but_title: '支付保证金'
			}, {
				but_id: '-1',
				but_title: '取消'
			}]
		}
	]
	const orderSourceMap = {
		'001': 'bargainOrderInfoVO',
		'002': 'packageOrderInfoVO',
		'003': 'commonOrderInfoVO',
		'004': 'purchaseOrderInfoVO',
		'005': 'grailPurchaseOrderInfoVO',
		'006': 'grailPublishOrderInfoVO',
		'007': 'storagePurchaseOrderInfoVO',
		'008': 'storagePublishOrderInfoVO'
	}
	const tapsType = ['订单信息', '保证金', '订单操作']
	const pageNum = ref(0)
	const tapsIndex = ref(taps[0].id)
	const orderList = ref([])
	const total = ref(0)
	const countArrar = ref([])
	const refreshKey = ref('key0')

	const onTaps = (id) => {
		tapsIndex.value = id
		pageNum.value = 0
		getList()
		refreshKey.value = 'tap' + id
	}

	const getList = () => {
		orderSeller({
			orderStatus: tapsIndex.value,
			pageNum: pageNum.value,
			pageSize: 10
		}).then(res => {
			total.value = res.data.total
			countArrar.value = res.data.otherData.jsonArray
			orderList.value = res.data.rows.map(item => ({
				...item[orderSourceMap[item.orderSource]],
				orderCode: item.orderCode
			}));
		})
	}

	function butFind(status) {
		return butListMap.find(item => item.id == status)?.butlist
	}

	const onPage = (e) => {
		pageNum.value = +e - 1
		getList()
		refreshKey.value = 'key' + e
	}

	const onTapCount = (id) => {
		const count = countArrar.value.find(item => item.code == id)?.count
		if (count) {
			return count
		}
	}

	function onClick(status, item) {
		if (status == '-1') {
			ProhibitScroll()
			Object.assign(orderCancel, {
				show: true,
				orderCode: item.orderCode,
			})
		} else if (status == '0') {
			if (!diffTime(item.nowTimeStamp, item.payExpireTimeStamp)) {
				uni.showToast({
					title: '支付已超时',
					icon: 'none'
				})
				return
			}
			uni.navigateTo({
				url: `/pages/getOrder/getOrder?orderCode=${item.orderCode}&type=1&producName=${item.productName}&shopName=${item.buyerNickName}&shopType=${item.buyerBusinessType}`
			})
		} else if (status == '1') {
			sendCode.show = true
			sendCode.order.orderCode = item.orderCode
			ProhibitScroll()
		} else if (status == '2') {
			urgReceiptOrderItems({
				orderCode: item.orderCode
			}).then(res => {
				uni.showToast({
					title: '已提醒买家收货',
					icon: 'none'
				})
			})
		} else if (status == '3') {
			window.open(`/#/pages/logistics/logistics?orderCode=${item.orderCode}&trackingType=1&type=1`,'_blank')
		} else if (status == '4') {
			cancelShopment.show = true
			cancelShopment.orderCode = item.orderCode
			cancelShopment.margin = item.marginAmount
			ProhibitScroll()
		} else if (status == '5') {
			orderRefund.show = true
			orderRefund.orderCode = item.afterSaleInfoVO.afterSaleCode
			ProhibitScroll()
		} else if (status == '6') {
			responReject.show = true
			responReject.orderCode = item.afterSaleInfoVO.afterSaleCode
			responReject.type = '拒收'
			ProhibitScroll()
		} else if (status == '7') {
			urgAfterSaleSentItem({
				afterSaleCode: item.afterSaleInfoVO.afterSaleCode
			}).then(res => {
				uni.showToast({
					title: '已提醒买家退货',
					icon: 'none'
				})
			})
		} else if (status == '8') {
			afterAgree.show = true
			afterAgree.duty = getReasonMapSeller(item.marginAmount,item.violationRecord)[item.afterSaleInfoVO.afterSaleReasonId]
			afterAgree.reslove = item
			ProhibitScroll()
		} else if (status == '9') {
			responReject.show = true
			responReject.orderCode = item.afterSaleInfoVO.afterSaleCode
			responReject.type = '拒绝'
		} else {
			console.error('no have status')
		}
	}

	const orderCancel = reactive({
		show: false,
		orderCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			soldCancelOrder({
				orderCode: this.orderCode
			}).then(res => {
				this.onCancel()
				getList()
				uni.showToast({
					title: '已取消该订单',
					icon: 'none'
				})
			})
		}
	})

	const cancelShopment = reactive({
		show: false,
		orderCode: '',
		margin: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSure() {
			cancelShipOrderItems({
				orderCode: this.orderCode
			}).then(res => {
				this.onCancel()
				getList()
				uni.showToast({
					title: '已取消发货',
					icon: 'none'
				})
			})
		}
	})

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
				this.onCancel()
				getList()
				uni.showToast({
					title: '已同意退款',
					icon: 'none'
				})
			})
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
				afterSaleCode: afterAgree.reslove.afterSaleInfoVO.afterSaleCode,
				isAgree: 1,
				refundUserAddress: e.loaction + e.address,
				refundUserCity: e.loaction,
				refundUserName: e.name,
				refundUserPhone: e.phone
			}).then(res=>{
				this.onClose()
				getList()
				uni.showToast({
					title: '已同意退款',
					icon: 'none'
				})
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
	
	const sendCode = reactive({
		show: false,
		order: {type: 0,orderCode: ''},//type: 0,我卖出的
		onClose(){
			this.show = false
			TurnOnScrool()
		},
		onClick(e){
			
			sendShipCode({
				orderCode: this.order.orderCode,
				trackingNumber: e.tackNumber,
				sentPictUrls: e.imgList
			}).then(res=>{
				uni.showToast({
					title: '已发货',
					icon: 'none'
				})
				this.onClose()
				getList()
			})
			
		}
	})

	const onOrder = (orderCode, status) => {
		if (status == 99001 || status == 99002 || status == 99003 || status == 99004 || status == 99005 ||
			status == 99006 || status == 99007 || status == 8 || status == 99010 || status == 10) {
			window.open(`/#/pages/saleDetail/merch?orderCode=${orderCode}`,'_blank')
		} else {
			//type 0:买到的，1卖出的
			window.open(`/#/pages/order/order?type=1&orderCode=${orderCode}&status=${status}`,'_blank')
		}
		console.log(orderCode, status)
	}

	onMounted(() => {
		getList()
	})

	onShow(() => {
		getList()
	})
</script>

<style scoped lang="scss">
	.MySold {
		display: flex;
		flex-direction: column;
		height: 100%;
		.Mytop {

			>view:first-child {
				font-weight: 600;
				font-size: 36rpx;
			}

			.taps {
				display: flex;
				align-items: center;
				gap: 100rpx;
				margin: 24rpx 0 20rpx 0;

				>view {
					font-size: 14px;
					color: #656565;
					cursor: pointer;
					position: relative;

					.tpaCount {
						position: absolute;
						top: -15rpx;
						right: -20rpx;
						width: 30rpx;
						aspect-ratio: 1/1;
						background-color: red;
						border-radius: 50%;
						line-height: 22rpx;
						font-size: 22rpx;
						font-weight: 500;
						box-shadow: -2rpx 2rpx 5rpx #ff1b14;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.active {
					font-weight: 600;
					color: #2C2E3A;

					.line {
						width: 70%;
						height: 8rpx;
						background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
						border-radius: 4rpx;
					}
				}
			}

			.tapsType {
				display: flex;
				align-items: center;
				padding: 16rpx;
				margin: 0 -40rpx;
				box-sizing: border-box;
				background: #FEFBEE;
				border-radius: 16rpx 16rpx 0 0;
				color: #ABABAB;

				>view:nth-child(1) {
					// flex: 4;
					width: 40%;
					padding-left: 298rpx;
					box-sizing: border-box;
				}

				>view:nth-child(2) {
					// flex: 2;
					width: 20%;
					display: flex;
					justify-content: center;
				}

				>view:nth-child(3) {
					// flex: 4;
					width: 40%;
					display: flex;
					justify-content: flex-end;
					padding-right: 80rpx;
					box-sizing: border-box;
				}
			}
		}

		.mylist {
			background: #F8F8F8;
			margin: 0 -40rpx;
			height: 100%;
			overflow-y: auto;
			scrollbar-width: none;
			.list-item {
				display: flex;
				background-color: #FFFFFF;
				box-shadow: 2rpx 4rpx 8rpx 0 rgba(44, 46, 59, 0.04);
				border-radius: 12rpx;
				margin-top: 24rpx;
				padding: 0 40rpx 30rpx 0;

				.infomation {
					// flex: 4;
					width: 40%;

					.infomation-top {
						display: flex;
						align-items: center;
						gap: 16rpx;

						.load {
							display: flex;
							align-items: center;
							gap: 8rpx;
							padding: 8rpx 20rpx;
							box-sizing: border-box;
							background: #FFC400;
							border-radius: 12rpx 0 12rpx 0;
							font-weight: 600;
							font-size: 28rpx;
							color: #FFFFFF;

							>image {
								width: 30rpx;
								height: 30rpx;
							}
						}

						.timeEnd {
							display: flex;
							align-items: center;
							font-weight: 400;
							font-size: 28rpx;
							color: #BF7D2B;
							line-height: 28rpx;
							gap: 4rpx;

							>image {
								width: 26rpx;
								height: 26rpx;
							}
						}
					}

					.shopinfoma {
						display: flex;
						flex-direction: column;
						gap: 24rpx;
						padding: 20rpx 20rpx 0;
						box-sizing: border-box;

						.userInfo {
							display: flex;
							align-items: center;
							gap: 16rpx;

							.avart {
								display: flex;
								align-items: center;
								gap: 8rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: #656565;

								>image {
									width: 56rpx;
									height: 56rpx;
									border-radius: 50%;
								}
							}

							.contact {
								display: flex;
								align-items: center;
								gap: 8rpx;
								font-weight: 600;
								font-size: 26rpx;
								color: #FFC400;
								line-height: 26rpx;
								cursor: pointer;
							}
						}

						.shop-content {
							display: flex;
							gap: 20rpx;

							>image {
								width: 180rpx;
								height: 180rpx;
								background: #F8F8F8;
								border-radius: 12rpx;
							}

							.shopright {
								display: flex;
								flex-direction: column;
								gap: 12rpx;

								>view:first-child {
									font-weight: 500;
									font-size: 28rpx;
									color: #2C2E3A;
								}

								>view:nth-child(2) {
									font-weight: 400;
									font-size: 24rpx;
									color: #656565;
								}

								>view:last-child {
									font-weight: 600;
									font-size: 32rpx;
									color: #2C2E3A;

									// line-height: 34rpx;
									>span {
										font-size: 24rpx;
									}
								}
							}
						}
					}


				}

				.deposit {
					// flex: 2;
					width: 20%;
					display: flex;
					align-items: center;
					justify-content: center;

					.depositinfo {
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						gap: 10rpx;

						>view:first-child {
							font-weight: 400;
							font-size: 28rpx;
							color: #2C2E3A;

							>span {
								font-weight: 600;
								font-size: 28rpx;
								color: #FF5500;
							}
						}

						>view:last-child {
							font-weight: 400;
							font-size: 24rpx;
							color: #BF7D2B;
							text-align: center;
						}
					}

					.haveno {
						font-weight: 400;
						font-size: 28rpx;
						color: #FF5500;
					}
				}

				.operation {
					// flex: 4;
					width: 40%;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					gap: 20rpx;
					padding-top: 16rpx;
					box-sizing: border-box;

					.opertop {
						display: flex;
						align-items: center;
						gap: 24rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #656565;
					}

					.pay {
						display: flex;
						gap: 20rpx;
						flex-direction: column;
						align-items: center;

						.activebut {
							padding: 8rpx 28rpx;
							font-weight: 600;
							font-size: 28rpx;
							color: #FFFFFF;
							background: #FFC400;
							border-radius: 38rpx;
							cursor: pointer;
						}

						.but {
							font-weight: 400;
							font-size: 28rpx;
							color: #656565;
							cursor: pointer;
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