<template>
	<view class="saleDetail">
		<GlobalSidebar />
		<YppHeader :index="-1"></YppHeader>
		<view class="content">
			<view class="salecon">
				<view class="left">
					<view class="taps">
						<view class="tap" v-for="(item,index) in taps">
							<uni-icons v-if="index !== 0" type="right" color="#ABABAB" size="18"></uni-icons>
							<view style="cursor: pointer;" @click="onBack(index)">{{item}}</view>
						</view>
					</view>
					<view class="content-info" v-if="status === 0">
						<view class="load">{{info.orderStatusDesc}}</view>
						<view class="address" v-if="info.address">
							<view class="ress">
								<uni-icons type="location" size="18"></uni-icons>
								<view>{{info.address}}</view>
							</view>
							<view class="name">
								<view>{{info.addressUserName}}</view>
								<view>{{info.addressUserPhone}}</view>
							</view>
						</view>
						<view class="payDeposit">
							<view  v-for="item in getButList(info.orderStatus)" @click="item.click()">{{item.title}}</view>
						</view>
						<view class="shop">
							<view class="top">
								<image :src="info.sellerAvatar" mode="scaleToFill"></image>
								<view>{{ +type ? info.buyerNickName : info.sellerNickName}}</view>
								<view>
									<view>{{+type ? '联系买家' : '联系卖家' }}</view>
									<uni-icons type="right" color="#FFC400"></uni-icons>
								</view>
							</view>
							<view class="shopitem">
								<image :src="info?.itemImageUrl || info.goldCoinSpecList?.[0]?.imageUrl || info?.pictureDetails?.split(',')?.[0] || longAndSheImageList[info.productName] || longAndSheImageList[info.productId]" mode="aspectFit"></image>
								<view class="right">
									<view @click="onDetail(info)">
										<view>{{info.productName}}</view>
										<uni-icons type="right" color="#ABABAB"></uni-icons>
									</view>
									<view>保证金: ¥{{info.marginAmount}}</view>
									<view class="price">
										<view><span>¥</span>{{info.totalPrice}}</view>
										<view>包邮</view>
									</view>
								</view>
							</view>
						</view>
						<view class="notes">
							<pubilc-notes :type="info.goldCoinVOList?.length == 0 ? 0 : 1 " :info="info"></pubilc-notes>
						</view>
					</view>
					<view class="abnormal" v-if="status === 1">
						<view class="oreder-abnormal">
							<view>异常订单</view>
							<view>此订单显示异常，如有疑问，请致电客服，我们将为您提供帮助。感谢您的理解与支持！</view>
							<view class="phone">
								<image :src="globalstore.upImageuler('/static/mine/phone.png')" mode="scaleToFill"></image>
								<view>客服电话：400-6080-660</view>
							</view>
							<image class="position" :src="globalstore.upImageuler('/static/mine/jingao.png')" mode="scaleToFill"></image>
						</view>
						<view>商品名称：{{info.productName}}</view>
						<pubilc-notes :type="info.goldCoinVOList && info.goldCoinVOList.length == 0 ? 0 : 1 " :info="info"></pubilc-notes>
						<!-- <view class="select">
							<view class="total" :style="`background-image: url(${globalstore.upImageuler('/static/mine/bg.png')})`">选择冠号(共12张)</view>
							<view>J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608、J012345608</view>
						</view> -->
					</view>
					<view class="bargain" v-if="status === 2">
						<view class="load">{{info.orderStatusDesc}}</view>
						<view class="address">
							<view class="ress">
								<uni-icons type="location" size="18"></uni-icons>
								<view>{{info.address}}</view>
							</view>
							<view class="name">
								<view>{{info.addressUserName}}</view>
								<view>{{info.addressUserPhone}}</view>
							</view>
						</view>
						<view class="payDeposit"s>
							<view v-for="item in getButList(info.orderStatus)">{{item.title}}</view>
						</view>
						<view class="top">
							<image :src="info.sellerAvatar" mode="scaleToFill"></image>
							<view>{{ +type ? info.buyerNickName : info.sellerNickName}}</view>
							<view>
								<view>{{+type ? '联系买家' : '联系卖家' }}</view>
								<uni-icons type="right" color="#FFC400"></uni-icons>
							</view>
						</view>
						<view class="shopname">商品名称：{{info.productName}}</view>
						<view class="bargaining">
							<view class="bar-left">
								<view class="bar-tap">
									<view style="margin-left: 20rpx;">已选冠号</view>
									<view>参考价格</view>
								</view>
								<view class="left-box">
									<view class="item" v-for="(item,index) in 3" :style="{borderTop: !index ? 'none' : '1rpx solid #eee'}">
										<view class="numbe">
											<view>J012345601…J012345610</view>
											<view class="baar-list">
												<view v-for="item in 2">全品</view>
											</view>
										</view>
										<view>¥1990.00</view>
									</view>
								</view>
							</view>
							<view class="bar-right">
								<view class="bar-tap">相关议价记录</view>
								<view>
									<bargaining></bargaining>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<order-info :status="status" :info="info"></order-info>
				</view>
			</view>
		</view>
		<PopupModal :show="orederCancel.show" title="是否确定取消订单" @close="orederCancel.onCancel()"
			@suer="orederCancel.onSuer()"></PopupModal>
		<PopupModal :show="orderRevoke.show" title="请确保您的货品已收到或与对方协商一致，您确定要撤销本次操作吗？" @close="orderRevoke.onCancel()"
			@suer="orderRevoke.onSuer()"></PopupModal>
		<PopupModal :show="orderSuer.show" title="确定您已收到货品了吗？" @close="orderSuer.onCancel()" @suer="orderSuer.onSuer()"></PopupModal>
		<BurdenProof v-if="orderProff.show" @close="orderProff.close()" @suer="(e)=>orderProff.suer(e)"></BurdenProof>
		
		<popup-modal :show="sellOrderCancel.show" title="是否确定取消该订单" @suer="sellOrderCancel.onSuer()" @close="sellOrderCancel.onCancel()"></popup-modal>
		<popup-send v-if="sellSendCode.show" :order="sellSendCode.order" @click="(e)=>sellSendCode.onClick(e)" @close="sellSendCode.onClose()"></popup-send>
	</view>
</template>

<script setup>
	import { onMounted, reactive, ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import orderInfo from '../../components/orderInfo/orderInfo.vue';
	// import GoodsNotes from '../../components/GoodsNotes/GoodsNotes.vue';
	// import GoodsTree from '../../components/GoodsTree/GoodsTree.vue';
	import bargaining from '../../components/bargaining/bargaining.vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { BuyerOrderDetail, noteNumberDetail,urgMarginPay,cancelAfterSales,cancelOrder,receiveOrderItems,sellOrderDetail,soldCancelOrder,
	urgReceiptOrderItems,sendShipCode, uploadEvidence	} from '../../api/common';
	import { longAndSheImageList, diffTime } from '../../utils/common';
	import PubilcNotes from '../../components/PubilcNotes/PubilcNotes.vue';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import PopupSend from '../../components/PopupSend/PopupSend.vue';
	import BurdenProof from '../../components/BurdenProof/BurdenProof.vue';
	import { ProhibitScroll,TurnOnScrool } from '../../utils/scroll';
	
	const globalstore = useGlobalStore()
	const firstTap = ['我买到的','我卖出的']
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
	const taps = ref(['我买到的','订单详情'])
	//id: 1:待支付，2:待发货，3待签收，99008：售后，4:交易成功，9：异常，11:待支付保证金
	//but_id: -1:取消订单，0:去支付，1:申请售后，2:提醒发货，3:确认收货，4撤销申请，5：平台介入，6:去举证，7:支付保证金,8:查看物流
	//我买到的
	const clickButtonList = [
		{
			id: '1',
			button: [
				{
					but_id: '0',
					title: '去支付',
					click(){
						clickList.onPay(info.value)
					}
				},
				{
					but_id: '-1',
					title: '取消订单',
					click(){
						clickList.onCancel(info.value.orderCode)
					}
				}
			]
		},
		{
			id: '2',
			button: [
				{
					but_id: '2',
					title: '提醒发货',
					click(){
						clickList.onMargPay(info.value.orderCode)
					}
				},
				{
					but_id: '1',
					title: '申请售后',
					click(){
						clickList.onService(info.value.orderCode)
					}
				}
			]
		},
		{
			id: '3',
			button: [
				{
					but_id: '3',
					title: '确认收货',
					click(){
						clickList.onConfirm(info.value.orderCode)
					}
				},
				{
					but_id: '8',
					title: '查看物流',
					click(){
						clickList.onLook(info.value.orderCode)
					}
				},
				{
					but_id: '1',
					title: '申请售后',
					click(){
						clickList.onService(info.value.orderCode)
					}
				}
			]
		},
		{
			id: '99008',
			button: [
				{
					but_id: '4',
					title: '撤销申请',
					click(){
						clickList.onRevoke(info.value.afterSaleDetailVO.afterSaleCode)
					}
				},
				{
					but_id: '6',
					title: '去举证',
					click(){
						clickList.onProff(info.value.afterSaleDetailVO.platformAfterSalesCode)
					}
				}
			]
		},
		{
			id: '4',
			button: []
		},
		{
			id: '9',
			button: []
		},
		{
			id: '11',
			button: [
				{
					but_id: '7',
					title: '支付保证金',
					click(){
						clickList.onPay(info.value)
					}
				},
				{
					but_id: '-1',
					title: '取消订单',
					click(){
						clickList.onCancel(info.value.orderCode)
					}
				}
			]
		}
	]
	
	
	//我卖出的
	const sellButListMap = [
		{
			id: '11',
			butlist:[{but_id: '0',title: '支付保证金',click(){sellClickList.onPay(info.value)}},{but_id: '-1',title: '取消',click(){sellClickList.onCancel(info.value.orderCode)}}],
		},
		{
			id: '2',
			butlist:[{but_id: '1',title: '去发货',click(){sellClickList.onSend(info.value.orderCode)}},{but_id: '-1',title: '取消',click(){sellClickList.onCancel(info.value.orderCode)}}]
		},
		{
			id: '3',
			butlist:[{but_id: '2',title: '提醒收货',click(){sellClickList.onReminder(info.value.orderCode)}},{but_id: '3',title: '查看物流',click(){sellClickList.onLook(info.value.orderCode)}}]
		},
		{
			id: '99008',
			butlist:[{but_id: '0',title: '支付保证金',click(){sellClickList.onPay(info.value)}},{but_id: '-1',title: '取消',click(){sellClickList.onCancel(info.value.orderCode)}}]
		},
		{
			id: '4',
			butlist:[]
		},
		{
			id: '9',
			butlist:[]
		},
		{
			id: '11',
			butlist:[{but_id: '0',title: '支付保证金',click(){sellClickList.onPay(info.value)}},{but_id: '-1',title: '取消',click(){sellClickList.onCancel(info.value.orderCode)}}]
		}
	]
	
	const status = ref(0)
	const info = ref({})
	const type = ref(0)
	
	const clickList = reactive({
		onPay(item){
			uni.navigateTo({
				url: `/pages/getOrder/getOrder?orderCode=${item.orderCode}&type=0&producName=${item.productName}&shopName=${item.sellerNickName}&shopType=${item.sellerBusinessType}` 
			})
		},
		onMargPay(orderCode){
			urgMarginPay({
				orderCode: orderCode
			}).then(res => {
				uni.showToast({
					title: '已提醒卖家支付保证金',
					icon: 'none'
				})
			})
		},
		onService(orderCode){
			uni.navigateTo({
				url: '/pages/saleApply/saleApply?orderCode=' + orderCode
			})
		},
		onRevoke(orderCode){
			ProhibitScroll()
			orderRevoke.show = true
			orderRevoke.orderCode = orderCode
		},
		onCancel(orderCode){
			ProhibitScroll()
			orederCancel.show = true
			orederCancel.cancelOrderCode = orderCode
		},
		onConfirm(orderCode){
			ProhibitScroll()
			orderSuer.show = true
			orderSuer.ordercode = orderCode
		},
		onProff(platformAfterSalesCode){
			orderProff.show = true
			orderProff.platformAfterSalesCode = platformAfterSalesCode
		},
		onLook(orderCode){
			window.open(`/#/pages/logistics/logistics?orderCode=${orderCode}&trackingType=1&type=0`,'_blank')
		}
	})
	
	const sellClickList = {
		onPay(item){
			if(!diffTime(item.nowTimeStamp,item.payExpireTimeStamp)){
				uni.showToast({
					title: '支付已超时',
					icon: 'none'
				})
				return
			}
			uni.navigateTo({
				url: `/pages/getOrder/getOrder?orderCode=${item.orderCode}&type=1&producName=${item.productName}&shopName=${item.buyerNickName}&shopType=${item.buyerBusinessType}`
			})
		},
		onCancel(orderCode){
			ProhibitScroll()
			sellOrderCancel.show = true
			sellOrderCancel.cancelOrderCode = orderCode
		},
		onReminder(orderCode){
			urgReceiptOrderItems({orderCode}).then(res=>{
				uni.showToast({
					title: '已提醒买家收货',
					icon: 'none'
				})
			})
		},
		onSend(orderCode){
			sellSendCode.show = true
			sellSendCode.order.orderCode = orderCode
			console.log(sellSendCode);
			ProhibitScroll()
		},
		onLook(orderCode){
			window.open(`/#/pages/logistics/logistics?orderCode=${orderCode}&trackingType=1&type=1`,'_blank')
		}
	}
	
	const getOderDetail = (orderCode) =>{
		if(type.value == 0){
			BuyerOrderDetail({orderCode}).then(res=>{
				info.value = res.data[orderSourceMap[res.data.orderSource]]
				status.value = (info.value.orderStatus == 9 || info.value.orderStatus == 6) ? 1 : 0
				console.log(info.value);
			})
		}
		if(type.value == 1){
			sellOrderDetail({orderCode}).then(res=>{
				info.value = res.data[orderSourceMap[res.data.orderSource]]
				status.value = (info.value.orderStatus == 9 || info.value.orderStatus == 6) ? 1 : 0
				console.log(info.value);
			})
		}
	}
	
	function getButList(id){
		if(type.value == 0) return clickButtonList.find(item => item.id == id)?.button
		if(type.value == 1) return sellButListMap.find(item => item.id == id)?.butlist
	}
	
	const onBack = (index) =>{
		if(index == 0) window.close()	
	}
	
	const orederCancel = reactive({
		show: false,
		cancelOrderCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			this.onCancel()
			cancelOrder({
				orderCode: this.cancelOrderCode
			}).then(res => {
				uni.showToast({
					title: '已取消该订单',
					icon: 'none'
				})
				window.close()	
			})
		}
	})
	
	const sellOrderCancel = reactive({
		show: false,
		cancelOrderCode: '',
		onCancel() {
			this.show = false
			TurnOnScrool()
		},
		onSuer() {
			this.onCancel()
			soldCancelOrder({
				orderCode: this.cancelOrderCode
			}).then(res => {
				uni.showToast({
					title: '已取消该订单',
					icon: 'none'
				})
				window.close()	
			})
		}
	})
	
	const sellSendCode = reactive({
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
				window.close()	
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
				uni.showToast({
					title: '已撤销售后',
					icon: 'none'
				})
				window.close()	
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
	
	onLoad((option)=>{
		taps.value[0] = firstTap[option.type]
		type.value = +option.type || 0
		getOderDetail(option.orderCode)
	})
	
	const onDetail = (e) =>{
		console.log(type.value === 0 ? '我买到的' : '我卖出的');
		window.open(`/#/pages/details/details?id=${e.publishId}&orderCode=${e.orderCode	}`,'_blank')
	}
	
</script>

<style scoped lang="scss">
	.saleDetail{
		background-color: #fdfdfd;
		.content{
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			gap: 40rpx;
			height: calc(100vh - 232rpx);
			min-height: 1400rpx;
			.salecon{
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.08);
				border-radius: 16rpx;
				padding: 50rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				gap: 40rpx;
				
				.left{
					width: calc(100% - 27.3001% - 40rpx);
					.taps{
						display: flex;
						align-items: center;
						gap: 16rpx;
						font-weight: 600;
						font-size: 36rpx;
						.tap{
							display: flex;
							align-items: center;
							gap: 16rpx;
						}
					}
					
					.content-info{
						margin-top: 40rpx;
						.load{
							font-weight: 600;
							font-size: 44rpx;
							color: #2C2E3A;
						}
						
						.address{
							display: flex;
							gap: 12rpx;
							flex-direction: column;
							margin-top: 24rpx;
							.ress{
								display: flex;
								align-items: center;
								gap: 6rpx;
								line-height: 44rpx;
							}
							.name{
								display: flex;
								align-items: center;
								gap: 20rpx;
								color: #ABABAB;
								line-height: 28rpx;
								margin-left: 26rpx;
							}
						}
						
						.payDeposit{
							display: flex;
							align-items: center;
							gap: 28rpx;
							margin-top: 28rpx;
							font-weight: 600;
							>view{
								padding: 8rpx 28rpx;
								box-sizing: border-box;
								background: #FFFFFF;
								border-radius: 40rpx;
								border: 2rpx solid #D8D8D8;
								cursor: pointer;
							}
							>view:first-child{
								background: #FFC400;
								border: 2rpx solid #FFC400;
								color: #FFFFFF;
							}
						}
						.shop{
							margin-top: 32rpx;
							display: flex;
							flex-direction: column;
							gap: 16rpx;
							
							.top{
								display: flex;
								align-items: center;
								gap: 8rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: #656565;
								line-height: 28rpx;
								>image{
									width: 56rpx;
									height: 56rpx;
									border-radius: 50%;
								}
								>view:last-child{
									display: flex;
									align-items: center;
									font-weight: 600;
									cursor: pointer;
									margin-left: 8rpx;
									font-size: 26rpx;
									color: #FFC400;
									line-height: 26rpx;
								}
							}
							
							.shopitem{
								display: flex;
								align-items: center;
								gap: 16rpx;
								margin-top: 4rpx;
								>image{
									width: 156rpx;
									height: 156rpx;
									border-radius: 12rpx;
									background-color: #F5f5f5;
								}
								.right{
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									height: 100%;
									>view:first-child{
										font-weight: 500;
										font-size: 30rpx;
										color: #2C2E3A;
										line-height: 30rpx;
										display: flex;
										align-items: center;
										gap: 8rpx;
										cursor: pointer;
										display: flex;
										flex: 1;
										>view:first-child{
												
												overflow: hidden;
												white-space: nowrap;
												text-overflow: ellipsis;
										}
									}
									>view:nth-child(2){
										font-weight: 400;
										font-size: 26rpx;
										color: #656565;
										line-height: 26rpx;
										margin: 20rpx 0 30rpx;
									}
									.price{
										display: flex;
										align-items: center;
										gap: 40rpx;
										>view:first-child{
											font-weight: 600;
											font-size: 34rpx;
											color: #2C2E3A;
											line-height: 34rpx;
											>span{
												font-size: 24rpx;
											}
										}
										>view:last-child{
											font-weight: 400;
											font-size: 26rpx;
											color: #2C2E3A;
											line-height: 26rpx;
										}
									}
								}
							}
						}
						.notes{
							margin-top: 20rpx;
						}
					}
					
					.abnormal{
						display: flex;
						flex-direction: column;
						gap: 30rpx;
						margin-top: 40rpx;
						.oreder-abnormal{
							padding: 26rpx 20rpx 30rpx;
							box-sizing: border-box;
							background: #FFFDF6;
							border-radius: 12rpx;
							position: relative;
							>view:first-child{
								font-weight: 600;
								font-size: 44rpx;
							}
							
							>view:nth-child(2){
								line-height: 40rpx;
								margin: 12rpx 0 24rpx;
							}
							
							.phone{
								display: flex;
								align-items: center;
								gap: 6rpx;
								font-weight: 500;
								font-size: 28rpx;
								color: #BF7D2B;
								line-height: 28rpx;
								>image{
									width: 28rpx;
									height: 28rpx;
								}
							}
							.position{
								position: absolute;
								top: 0;
								right: 0;
								width: 156rpx;
								height: 156rpx;
							}
						}
						>view:nth-child(2){
							font-weight: 500;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
						}
						.select{
							padding: 62rpx 20rpx;
							box-sizing: border-box;
							background: #FFFDF6;
							border-radius: 12rpx;
							position: relative;
							line-height: 44rpx;
							.total{
								position: absolute;
								top: 0;
								left: 0;
								padding: 8rpx 20rpx;
								box-sizing: border-box;
								width: 342rpx;
								background-size: 100% 100%;
								background-position: left;
								background-repeat: no-repeat;
								font-weight: 400;
								font-size: 26rpx;
								color: #BF7D2B;
								line-height: 26rpx;
							}
						}
					}
					
					.bargain{
						margin-top: 40rpx;
						.load{
							font-weight: 600;
							font-size: 44rpx;
							color: #2C2E3A;
						}
						
						.address{
							display: flex;
							gap: 12rpx;
							flex-direction: column;
							margin-top: 24rpx;
							.ress{
								display: flex;
								align-items: center;
								gap: 6rpx;
								line-height: 44rpx;
							}
							.name{
								display: flex;
								align-items: center;
								gap: 20rpx;
								color: #ABABAB;
								line-height: 28rpx;
								margin-left: 26rpx;
							}
						}
						
						.payDeposit{
							display: flex;
							align-items: center;
							gap: 28rpx;
							margin-top: 28rpx;
							font-weight: 600;
							>view{
								padding: 8rpx 28rpx;
								box-sizing: border-box;
								background: #FFFFFF;
								border-radius: 40rpx;
								border: 2rpx solid #D8D8D8;
								cursor: pointer;
							}
							>view:first-child{
								background: #FFC400;
								border: 2rpx solid #FFC400;
								color: #FFFFFF;
							}
						}
						.top{
							display: flex;
							align-items: center;
							gap: 8rpx;
							font-weight: 400;
							font-size: 28rpx;
							color: #656565;
							line-height: 28rpx;
							margin: 32rpx 0;
							>image{
								width: 56rpx;
								height: 56rpx;
								border-radius: 50%;
							}
							>view:last-child{
								display: flex;
								align-items: center;
								font-weight: 600;
								cursor: pointer;
								margin-left: 8rpx;
								font-size: 26rpx;
								color: #FFC400;
								line-height: 26rpx;
							}
						}
						.shopname{
							font-weight: 500;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
						}
						.bargaining{
							display: flex;
							gap: 40rpx;
							margin-top: 36rpx;
							.bar-left{
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								width: 812rpx;
								.bar-tap{
									display: flex;
									align-items: center;
									justify-content: space-between;
									font-size: 26rpx;
									color: #ABABAB;
									line-height: 26rpx;
								}
								.left-box{
									width: 100%;
									height: 656rpx;
									padding: 0 20rpx;
									box-sizing: border-box;
									background: #FFFDF6;
									border-radius: 12rpx;
									.item{
										display: flex;
										align-items: center;
										justify-content: space-between;
										padding: 24rpx 0;
										box-sizing: border-box;
										border-top: 1rpx solid #eee;
										.numbe{
											display: flex;
											gap: 12rpx;
											flex-direction: column;
											>view:first-child{
												font-weight: 600;
												font-size: 28rpx;
												color: #2C2E3A;
												line-height: 28rpx;
											}
											.baar-list{
												display: flex;
												align-items: center;
												gap: 10rpx;
												>view{
													padding: 4rpx 14rpx;
													box-sizing: border-box;
													background: #FFF0DC;
													border-radius: 16rpx;
													font-weight: 400;
													font-size: 22rpx;
													color: #BF7D2B;
													line-height: 22rpx;
													
												}
											}
										}
										>view:last-child{
											font-weight: 400;
											font-size: 28rpx;
											color: #2C2E3A;
											line-height: 28rpx;
										}
									}
									
								}
							}
							.bar-right{
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								width: 654rpx;
								.bar-tap{
									font-size: 26rpx;
									color: #ABABAB;
									line-height: 26rpx;
								}
								
							}
						}
					}
				}
				
				.right{
					width: 27.3001%;
					.orderInfo{
						background: #FFFFFF;
						border-radius: 20rpx;
						border: 2rpx solid #EFEFEF;
						width: 100%;
						aspect-ratio: 0.625/1;
						box-sizing: border-box;
						padding: 32rpx 28rpx;
						>view:first-child{
							font-weight: 600;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
							
						}
						.gap{
							display: flex;
							flex-direction: column;
							margin-top: 30rpx;
							gap: 36rpx;
							.total{
								display: flex;
								justify-content: space-between;
								align-items: center;
								line-height: 28rpx;
								.price{
									font-weight: 600;
								}
								.copy{
									display: flex;
									align-items: center;
									gap: 8rpx;
									>view:first-child{
										font-weight: 400;
										color: #ABABAB;
									}
									>view:last-child{
										cursor: pointer;
										font-weight: 400;
									}
								}
								.time{
									color: #ABABAB;
									font-weight: 400;
								}
							}
							.upim{
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								>view:last-child{
									display: flex;
									gap: 20rpx;
									align-items: center;
									flex-wrap: wrap;
									>image{
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
