<template>
	<view class="MyBought">
		<view class="Mytop">
			<view>我买到的</view>
			<view class="taps">
				<view v-for="(item,index) in taps" :class="{active: tapsIndex === index}" @click="onTaps(index)">
					<view>{{item}}</view>
					<view class="tpaCount" v-if="onTapCount(item)">{{onTapCount(item)}}</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="tapsType">
				<view v-for="item in tapsType">{{item}}</view>
			</view>
		</view>
		
		<view class="mylist" v-if="orderList.length !== 0" :key="refreshKey">
			<view class="list-item" v-for="(item,index) in orderList" :key="item.orderCode" @click="onGoDetail(item.orderCode,item.orderStatus)">
				<view class="infomation">
					<view class="infomation-top">
						<view class="load" v-if="item.orderStatusDesc == '待支付'">
							<image :src="globalstore.upImageuler('/static/mine/load.png')" mode="scaleToFill"></image>
							<view>{{item.orderStatusDesc}}</view>
						</view>
						<view class="load" v-else-if="item.orderStatusDesc == '待收货' || item.orderStatusDesc == '待签收'">
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
								<image :src="item.sellerAvatar" mode="aspectFill"></image>
								<view>{{item.sellerNickName}}</view>
							</view>
							<view class="contact">
								<view>联系卖家</view>
								<uni-icons type="right" color="#FFC400"></uni-icons>
							</view>
						</view>
						<view class="shop-content">
							<image
								:src="item.itemImageUrl || item?.pictureDetails?.split(',')?.[0] || item?.goldCoinSpecList?.[0]?.imageUrl || longAndSheImageList[item.productId] || longAndSheImageList[item.productName]"
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
					<view class="depositinfo" v-if="item.marginAmount">
						<view>保证金: <span> ¥{{item.marginAmount}}</span></view>
						<view v-if="item.orderStatus == '1'">卖家支付保证金后订单生效</view>
					</view>
					<view class="haveno" v-else>非担保交易</view>
				</view>
				<view class="operation">
					<view class="opertop">
						<view>订单号:{{item.orderCode}}</view>
						<view>{{item.payExpireTime}}</view>
					</view>
					<view class="pay">
						<view class="activebut"
							@click.stop="onPay(item,!diffTime(item.nowTimeStamp,item.payExpireTimeStamp))"
							v-if="item.orderStatus == '1'">{{item.orderStatusDesc==='待支付货款'?'支付货款':'支付保证金'}}</view>
						<view class="activebut" v-if="item.orderStatus == '11'" @click.stop="onMargPay(item.orderCode)">提醒付款</view>
						<view class="activebut" v-if="item.orderStatus == '2'" @click.stop="onShipment(item.orderCode)">提醒发货</view>
						<view class="activebut" v-if="item.orderStatus == '3'" @click.stop="onConfirm(item.orderCode)">确认收货</view>
						<view class="activebut"
							v-if="item.orderStatus == '99001' || item.orderStatus == '99002' || item.orderStatus == '99008'"
							@click.stop="onRevoke(item.afterSaleInfoVO.afterSaleCode)">撤销售后</view>
							<view class="activebut" v-if="item.orderStatus == '99004'" @click.stop="onReturnGood(item)">去退货</view>
						<view class="activebut" v-if="item.orderStatus == '99005'" @click.stop="onRemind(item.afterSaleInfoVO.afterSaleCode)">提醒收货</view>
						<view class="but"
							v-if="item.orderStatus == '3' || item.orderStatus == '99005'" @click.stop="onLooklog(item)">查看物流</view>
						<view class="but" v-if="item.orderStatus == '2' || item.orderStatus == '3'"
							@click.stop="onService(item.orderCode)">申请售后</view>
						<view class="but" v-if="item.orderStatus == '1'|| item.orderStatus == '11'"
							@click.stop="onCancel(item.orderCode)">取消订单</view>
						<view class="but"
							v-if="item.orderStatus == '99001' || item.orderStatus == '99002' || item.orderStatus == '99003'|| item.orderStatus == '99004' || item.orderStatus == '99005'|| item.orderStatus == '99006'"
							@click.stop="onPlatform(item.afterSaleInfoVO.afterSaleCode)">平台介入</view>
						<!-- <view class="but" v-if="item.orderStatus == '99002'">更新售后</view> -->
						
						<view class="but" v-if="item.orderStatus == '99008'" @click.stop="onProof(item.afterSaleInfoVO.platformAfterSalesCode)">去举证</view>
						<view class="but">订单详情</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="nohave" v-else>
			<image :src="globalstore.upImageuler('/static/mine/no_have.png')" mode="widthFix"></image>
			<view>没有数据哦～</view>
		</view>
		<page-bottom v-if="isFlow" :total="total" @change="onChange"></page-bottom>
		
		<PopupModal :show="orederCancel.show" title="是否确定取消订单" @close="orederCancel.onCancel()"
			@suer="orederCancel.onSuer()"></PopupModal>
		<PopupModal :show="orderRevoke.show" title="请确保您的货品已收到或与对方协商一致，您确定要撤销本次操作吗？" @close="orderRevoke.onCancel()"
			@suer="orderRevoke.onSuer()"></PopupModal>
		<PopupModal :show="orderSuer.show" title="确定您已收到货品了吗？" @close="orderSuer.onCancel()" @suer="orderSuer.onSuer()"></PopupModal>
		<BurdenProof v-if="orderProff.show" @close="orderProff.close()" @suer="(e)=>orderProff.suer(e)"></BurdenProof>
		<popup-send v-if="sendCode.show" :order="sendCode.order" @click="(e)=>sendCode.onClick(e)" @close="sendCode.onClose()"></popup-send>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref,
		triggerRef
	} from 'vue';
	import PageBottom from '../PageBottom/PageBottom.vue';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		buyList,
		cancelOrder,
		urgSentItem,
		urgMarginPay,
		platformIntervention,
		cancelAfterSales,
		urgShipAfterSaleItems,
		uploadEvidence,
		receiveOrderItems,
		returnShipment
	} from '../../api/common';
	import {
		longAndSheImageList
	} from '../../utils/common';
	import {
		diffTime
	} from '../../utils/common';
	import PopupModal from '../PopupModal/PopupModal.vue';
	import {
		ProhibitScroll,
		TurnOnScrool
	} from '../../utils/scroll';
	import BurdenProof from '../BurdenProof/BurdenProof.vue';
	import PopupSend from '../PopupSend/PopupSend.vue';
	
	const statusMap = {
		0: '',
		1: '1',
		2: '2',
		3: '3',
		4: '99',
		5: '4',
		6: '9',
		7: '11'
	}

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

	const globalstore = useGlobalStore()

	const taps = ['全部订单', '待支付', '待发货', '待签收', '售后', '交易成功', '异常', '待卖家支付保证金']
	const tapsType = ['订单信息', '保证金', '订单操作']
	
	const tapsIndex = ref(0)
	const total = ref(0)
	const isFlow = ref(true)
	const pageNum = ref(0)
	const orderList = ref([])
	const cancelOrderCode = ref('')
	const countArrar = ref([])
	const refreshKey = ref('key0')

	const onTaps = (index) => {
		tapsIndex.value = index
		isFlow.value = false
		pageNum.value = 0
		setTimeout(() => {
			isFlow.value = true
		}, 0)
		getList()
		refreshKey.value = 'tapkey' + index
	}

	const onPay = (item, isPay) => {
		console.log(item);
		if (isPay) {
			uni.showToast({
				title: '支付已超时，请重新下单',
				icon: 'none'
			})
			return
		}
		uni.navigateTo({
			url: `/pages/getOrder/getOrder?orderCode=${item.orderCode}&type=0&producName=${item.productName}&shopName=${item.sellerNickName}&shopType=${item.sellerBusinessType}` 
		})
	}

	const onChange = (e) => {
		pageNum.value = e - 1
		getList()
		refreshKey.value = 'key' + e
	}

	const onTapCount = (title) => {
		const count = countArrar.value.find(item => item.name == title)?.count
		if (count) {
			return count
		}
	}

	const getList = () => {
		buyList({
			orderStatus: statusMap[tapsIndex.value],
			pageNum: pageNum.value,
			pageSize: 10
		}).then(res => {
			total.value = res.data.total
			countArrar.value = res.data.otherData.jsonArray	
			orderList.value = res.data.rows.map(item => ({
			  ...item[orderSourceMap[item.orderSource]],
			  orderCode: item.orderCode
			}))
		})
	}

	const orederCancel = reactive({
		show: false,
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			this.onCancel()
			cancelOrder({
				orderCode: cancelOrderCode.value
			}).then(res => {
				getList()
				uni.showToast({
					title: '已取消该订单',
					icon: 'none'
				})
			})
		}
	})

	const orderRevoke = reactive({
		show: false,
		orderCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			cancelAfterSales({
				afterSaleCode: this.orderCode
			}).then(res => {
				this.onCancel()
				getList()
				uni.showToast({
					title: '已撤销售后',
					icon: 'none'
				})
			})
		}
	})
	
	const orderSuer = reactive({
		show: false,
		ordercode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			receiveOrderItems({orderCode: this.ordercode}).then(res=>{
				this.onCancel()
				uni.showToast({
					title: '已确认收货',
					icon: 'none'
				})
			})
		}
	})
	
	const orderProff = reactive({
		show: false,
		platformAfterSalesCode: '',
		close() {
			this.show = false
		},
		suer(e) {
			uploadEvidence({
					evidenceDesc: e.content,
					evidencePictUrls: e.imgList,
					platformAfterSalesCode: this.platformAfterSalesCode,
					userId: uni.getStorageSync('userInfo').userId
			}).then(res=>{
				uni.showToast({
					title: '已举证',
					icon: 'none'
				})
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
				getList()
			})
			
		}
	})

	const onShipment = (orederCode) => {
		urgSentItem({
			orderCode: orederCode
		}).then(res => {
			uni.showToast({
				title: '已提醒卖家发货',
				icon: 'none'
			})
		})
	}
	
	const onConfirm = (orderCode) =>{
		ProhibitScroll()
		orderSuer.show = true
		orderSuer.ordercode = orderCode
	}
	
	const onRemind = (afterSaleCode) =>{
		urgShipAfterSaleItems({afterSaleCode}).then(res=>{
			uni.showToast({
				title: '已提醒卖家收货',
				icon: 'none'
			})
		})
	}
	
	const onLooklog = (item) =>{
		console.log(item);
		window.open(`/#/pages/logistics/logistics?orderCode=${item.orderCode}&trackingType=1&type=0`,'_blank')
	}
	
	const onReturnGood = (item) =>{
		sendCode.show = true
		sendCode.order.orderCode = item.orderCode
		sendCode.afterSaleCode = item.afterSaleInfoVO.afterSaleCode
		ProhibitScroll()
	}

	const onRevoke = (orderCode) => {
		orderRevoke.show = true
		orderRevoke.orderCode = orderCode
	}

	const onMargPay = (orderCode) => {
		urgMarginPay({
			orderCode: orderCode
		}).then(res => {
			uni.showToast({
				title: '已提醒卖家支付保证金',
				icon: 'none'
			})
		})
	}

	const onPlatform = (afterSaleCode) => {
		platformIntervention({
			afterSaleCode
		}).then(res => {
			getList()
			uni.showToast({
				title: '已申请平台介入',
				icon: 'none'
			})
		})
	}
	
	const onProof = (code) =>{
		orderProff.show = true
		orderProff.platformAfterSalesCode = code
	}

	const onCancel = (orderCode) => {
		ProhibitScroll()
		orederCancel.show = true
		cancelOrderCode.value = orderCode
	}

	const onService = (orderCode) => {
		uni.navigateTo({
			url: '/pages/saleApply/saleApply?orderCode=' + orderCode
		})
	}

	const onGoDetail = (orderCode, status) => {
		if (status == 99001 || status == 99002 || status == 99003 || status == 99004 || status == 99005 ||
			status == 99006 || status == 99007 || status == 8 || status == 99010){
				window.open( `/#/pages/saleDetail/saleDetail?orderCode=${orderCode}`,'_blank')
			}else{
				//type 0:买到的，1卖出的
				window.open(`/#/pages/order/order?type=0&orderCode=${orderCode}&status=${status}`,'_blank')
			}
			// if(status == 99008){
			// 	console.log('详情')
			// }
			
	}

	onMounted(() => {
		getList()
	})
	onShow(() => {
		getList()
	})
</script>

<style scoped lang="scss">
	.MyBought {
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
			flex: 1;
			overflow-y: scroll;
			scrollbar-width: none;
			.list-item {
				display: flex;
				background-color: #FFFFFF;
				box-shadow: 2rpx 4rpx 8rpx 0 rgba(44, 46, 59, 0.04);
				border-radius: 12rpx;
				margin-top: 24rpx;
				padding: 0 40rpx 30rpx 0;

				.infomation {
					// flex: 1;
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
							width: 100%;
							gap: 20rpx;

							>image {
								width: 180rpx;
								height: 180rpx;
								min-width: 180rpx;
								min-height: 180rpx;
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
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									width: 888rpx;

									@media (min-width: 1601px) and (max-width: 1920px) {
										width: 688rpx;
									}

									@media (min-width: 1281px) and (max-width: 1600px) {
										width: 588rpx;
									}

									@media (max-width: 1280px) {
										width: 500rpx;
									}
								}

								>view:last-child {
									font-weight: 600;
									font-size: 32rpx;
									color: #2C2E3A;

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

		.nohave {
			height: 1486rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #aaa;

			>image {
				width: 300rpx;
				height: 300rpx;
			}
		}

	}
</style>