<template>
	<view class="content">
		<GlobalSidebar />
		<ypp-header></ypp-header>
		<view class="body">
			<view class="body-left">
				<view class="left-shop" v-if="marchantInfo">
					<view class="shop-left">
						<view class="shopImg">
							<image :src="marchantInfo.userAvatar ? marchantInfo.userAvatar : globalstore.upImageuler('/static/profile.png')" mode="aspectFill" style="width: 88rpx;height: 88rpx;"></image>
						</view>
						<view class="shopInfo">
							<view>{{marchantInfo.nickName}}</view>
							<view class="infoImg">
								<image :src="marchantInfo.businessType ? globalstore.upImageuler('/static/slices/march.png') : globalstore.upImageuler('/static/slices/my.png')" mode="heightFix" style="height: 100%;"></image>
							</view>
						</view>
					</view>
					<view class="shop-right">
						<view class="infoLogo">
							<view class="logo">
								<image :src="globalstore.upImageuler('/static/slices/shop.png')" mode="widthFix"></image>
							</view>
							<view>
								店铺
							</view>
						</view>
						<view class="infoLogo" style="margin-left: 72rpx;">
							<view class="logo">
								<image :src="globalstore.upImageuler('/static/slices/phone.png')" mode="widthFix"></image>
							</view>
							<view>
								联系
							</view>
						</view>
					</view>
				</view>
				<view v-if="orderMarch" class="order">
					<view class="left-shop" style="border-radius: 20rpx 20rpx 0 0;margin: 0;">
						<view class="shop-left" >
							<view class="shopImg">
								<image :src="orderMarch.sellerAvatar ? orderMarch.sellerAvatar : globalstore.upImageuler('/static/profile.png') " mode="aspectFill" style="width: 88rpx;height: 88rpx;"></image>
							</view>
							<view class="shopInfo">
								<view>{{orderMarch.sellerNickName}} <text class="march">卖家</text></view>
								<view class="infoImg">
									<image :src=" orderMarch.sellerBusinessType ? globalstore.upImageuler('/static/slices/march.png') : globalstore.upImageuler('/static/slices/my.png')" mode="heightFix" style="height: 100%;"></image>
								</view>
							</view>
						</view>
						<view class="shop-right">
							<view class="infoLogo">
								<view class="logo">
									<image :src="globalstore.upImageuler('/static/slices/shop.png')" mode="widthFix"></image>
								</view>
								<view>
									店铺
								</view>
							</view>
							<view class="infoLogo" style="margin-left: 72rpx;">
								<view class="logo">
									<image :src="globalstore.upImageuler('/static/slices/phone.png')" mode="widthFix"></image>
								</view>
								<view>
									联系
								</view>
							</view>
						</view>
					</view>
					<view class="left-shop" style="border-radius: 0 0 20rpx 20rpx;margin: 0;">
						<view class="shop-left">
							<view class="shopImg">
								<image :src="orderMarch.buyerAvatar ? orderMarch.buyerAvatar : globalstore.upImageuler('/static/profile.png')" mode="aspectFill" style="width: 88rpx;height: 88rpx;"></image>
							</view>
							<view class="shopInfo">
								<view>{{orderMarch.buyerNickName}}<text class="march" style="background-color: #00b0f9;">买家</text></view>
								<view class="infoImg">
									<image :src="orderMarch.buyerBusinessType ? globalstore.upImageuler('/static/slices/march.png') : globalstore.upImageuler('/static/slices/my.png') " mode="heightFix" style="height: 100%;"></image>
								</view>
							</view>
						</view>
						<view class="shop-right">
							<view class="infoLogo">
								<view class="logo">
									<image :src="globalstore.upImageuler('/static/slices/shop.png')" mode="widthFix"></image>
								</view>
								<view>
									店铺
								</view>
							</view>
							<view class="infoLogo" style="margin-left: 72rpx;">
								<view class="logo">
									<image :src="globalstore.upImageuler('/static/slices/phone.png')" mode="widthFix"></image>
								</view>
								<view>
									联系
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="left-content">
					<view class="content-look">
						<view class="img-list" v-if="imgList.length > 1">
							<view v-for="(item,index) in imgList" :class="{active: index === NowIndex}" @click="NowIndex = index">
								<image :src="item" mode="aspectFit"></image>
							</view>
						</view>
						<view class="left-img" id="left">
							<view class="paddingWarp">
								<swiper class="swiper" autoplay circular :current="NowIndex" @change="nowChange">
									<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
										<view class="item-img">
											<image :src="item" mode="aspectFit" lazy-load></image>
										</view>
									</swiper-item>
								</swiper>
								<view class="Row" style="left: 0;" @click="onIndex('backWard')" v-if="imgList.length > 1">
									<uni-icons style="margin: auto;" type="left" size="28" color="#ABABAB" class="RowColor"></uni-icons>
								</view>
								<view class="Row" style="right: 0;" @click="onIndex('forWard')" v-if="imgList.length > 1">
									<uni-icons style="margin: auto;" type="right" size="28" color="#ABABAB" class="RowColor"></uni-icons>
								</view>
							</view>
							<view class="imgIndex" v-if="imgList">
								<view style="color: #FFBA4B;">{{NowIndex + 1}}</view>
								<view>/{{imgList.length}}</view>
							</view>
						</view>
					</view>
					<view class="content-info">
						<view class="body-right-top">
							<view class="success" v-if="orderCode">
								<image :src="globalstore.upImageuler('/static/slices/success.png')" mode="widthFix"></image>
							</view>
							<view class="success" v-if="goodsInfo.orderStatus == 1">
								<image :src="globalstore.upImageuler('/static/index/offShelf.png')" mode="widthFix"></image>
							</view>
							<view class="success" v-if="goodsInfo.orderStatus == 3 && !orderCode">
								<image :src="globalstore.upImageuler('/static/slices/buyOver.png')" mode="widthFix"></image>
							</view>
							<view class="rightName">
								<view class="nameTitle">{{goodsInfo.productName}}
								<image v-if="goodsInfo.currentCargoStatus" style="width: 56rpx;height: 30rpx;" :src="globalstore.upImageuler('/static/slices/preorder.png')" mode="aspectFit"></image>
								<text v-else style="color: #fff;background-color: #43a3f3;font-size: 22rpx;padding: 0 10rpx;border-radius: 6rpx;">求</text>
								</view>
								<view class="nameType" v-for="(item,index) in RightsList" :key="index">
									<view class="img">
										<image :src="globalstore.upImageuler(item.icon)" mode="widthFix"></image>
									</view>
									<view>{{item.name}}</view>
								</view>
							</view>
							<view class="currenShop" v-if="goodsInfo.currentCargoStatus">
								<view class="presale" >
									<view class="presale-price">
										<view><span>¥</span>{{goodsInfo.totalPrice}}</view>
										<view class="unit">
											<view>单价:¥{{goodsInfo.transactionUnitPrice ||  (goodsInfo.totalSellingPrice/goodsInfo.souvenirCoinNumber).toFixed(2) || 0 }}</view>
											<view>数量:{{goodsInfo.souvenirCoinNumber || goodsInfo.identifyQuantity}}{{goodsInfo.unit ? goodsInfo.unit : '张'}}</view>
										</view>
									</view>
									<view class="presale-time">
										<image :src="globalstore.upImageuler('/static/slices/time.png')" mode="aspectFit"></image>
										<view>{{goodsInfo.issuanceDate ? `需${getAfterDays(goodsInfo.issuanceDate,goodsInfo.followReleaseDays)}24点前发货` : `需官方发行后${goodsInfo.followReleaseDays}天内发货` }}</view>
									</view>
									<image :src="globalstore.upImageuler('/static/slices/calendar.png')" mode="aspectFill"></image>
								</view>
								<view class="presale-process">
									<view>预售商品流程</view>
									<view class="process-list">
										<view class="item">
											<image :src="globalstore.upImageuler('/static/slices/one.png')" mode="aspectFit"></image>
											<view>支付保证金</view>
										</view>
										<image :src="globalstore.upImageuler('/static/slices/line.png')" mode="aspectFit"></image>
										<view class="item">
											<image :src="globalstore.upImageuler('/static/slices/tow.png')" mode="aspectFit"></image>
											<view>对方支付保证金</view>
										</view>
										<image :src="globalstore.upImageuler('/static/slices/line.png')" mode="aspectFit"></image>
										<view class="item">
											<image :src="globalstore.upImageuler('/static/slices/three.png')" mode="aspectFit"></image>
											<view>发货日期48小时前对方支付货款</view>
										</view>
									</view>
								</view>
							</view>
							
							<view class="rightPicker" v-if="!goodsInfo.currentCargoStatus">
								<view class="picker" v-if="orderMarch">¥{{orderMarch.totalPrice }}</view>
								<view class="picker" v-else>¥{{goodsInfo.totalSellingPrice ? goodsInfo.totalSellingPrice : goodsInfo.totalPrice }}</view>
								<view class="margin">单价:¥{{goodsInfo.transactionUnitPrice}}</view>
								<view class="margin">数量:{{orderMarch ? orderMarch.totalCount : goodsInfo.identifyQuantity}}{{goodsInfo.unit ? goodsInfo.unit : '张'}}</view>
							</view>
							
							<view class="rightInfo" id="infodom">
								<view class="infoItem">
									<view class="infoLift">有效期</view>
									<view class="infoRight">{{goodsInfo.validityPeriodBeginTime}}-{{goodsInfo.validityPeriodEndTime}}</view>
								</view>
								<view class="infoItem">
									<view class="infoLift">最小确认数量</view>
									<view class="infoRight">{{ goodsInfo.minimumConfirmationQuantity || 1 }}{{ goodsInfo.unit ? goodsInfo.unit : '张' }}</view>
								</view>
								<view class="infoItem">
									<view class="infoLift">价格模式</view>
									<view class="infoRight">{{ goodsInfo.priceModel ? '议价' : '一口价' }}</view>
								</view>
								<view class="infoItem">
									<view class="infoLift">品相评级</view>
									<view class="infoRight">
										<view class="good">{{goodsInfo.appraisalInstitutionName ? goodsInfo.appraisalInstitutionName : productCondition[goodsInfo.productCondition]}}</view>
									</view>
								</view>
								<view class="infoItem">
									<view class="infoLift">保证金</view>
									<view class="infoRight-bont">
									<view class="bond">{{goodsInfo.needTradeMargin ? `${goodsInfo.tradingMarginRatio * 100}%` : '无'}}</view>
									<view class="bondtext" v-if="goodsInfo.needTradeMargin">*此商品采用保证金交易:为保护买卖双方的利益，双方都需要缴纳保证金，如有违约行为，违约方将被扣除保证金</view>
									</view>
								</view>
								<view class="infoItem">
									<view class="infoLift">发货</view>
									<view>
										<view class="infoRight" style="white-space: nowrap;font-size: 28rpx;">
											<view>{{goodsInfo.delivery ? '不包邮' : '包邮' }}</view>
											<view class="pipe">｜</view>
											<view>发货地:{{goodsInfo.shippingProvince}}</view>
										</view>
										<view style="font-size: 20rpx;color: #C2C2C2;">*新疆、西藏、内蒙古、甘肃、宁夏、海南、港澳等偏远地区不包邮</view>
									</view>
								</view>
							</view>
						</view>
						<view class="line"></view>
						<view class="details" >
							<view class="details-name">商品详情</view>
							<view v-if="goodsInfo.descriptionDetails" class="details-title">{{ goodsInfo.descriptionDetails}}</view>
							<view v-else style="color: #999; padding: 12rpx 0 30rpx;">暂无数据</view>
							<view>
								<GoodsTree :pageType="pageType" :labelInfos='goodsInfo.labelInfos' :coinList="coinList">
									<template v-slot:markUnitPrice>{{ goodsInfo.transactionUnitPrice }}</template>
								</GoodsTree>
							</view>
						</view>
						<view class="pay" v-if="goodsInfo.orderStatus == 3">
							<button style="background-color: #ABABAB;cursor: not-allowed;" hover-class="none">已购得</button>
						</view>
						<view class="pay" v-if="goodsInfo.orderStatus == 1">
							<button style="background-color: #ABABAB;cursor: not-allowed;" hover-class="none">已下架</button>
						</view>
						<view class="pay" v-else>
							<button v-if="pageType == 2 && !orderCode && !goodsInfo.currentCargoStatus" style="background-color: #00B0F9;" @click="onSell">立即出售</button>
							<button class="preorder-but" v-if="pageType == 2 && !orderCode && goodsInfo.currentCargoStatus" @click="onOpenFut">
								<view>立即预售</view>
								<view>
									<view>支付保证金</view>
									<view>20%</view>
								</view>
							</button>
							<button v-if="orderCode" style="background-color: #ABABAB;">已成交</button>
						</view>
						<view class="submit-info" @click="goDownApp(orderType)">
							<view class="left">
								<view class="link">
									<image class="icon" :src="globalstore.upImageuler('/static/slices/shop.png')"></image>店铺
								</view>
								<view class="link">
									<image class="icon" :src="globalstore.upImageuler('/static/slices/phone.png')"></image>联系
								</view>
							</view>
							<button class="btn-submit">APP内打开</button>
						</view>
					</view>
				</view>
				
				<view class="body-right">
					<view>为您推荐</view>
					<view>
						<list-sell :sell-list="allList"></list-sell>
						<no-data v-if="allList.length === 0"></no-data>
						<no-more v-if="pageNum >= allTotal"></no-more>
					</view>
				</view>
			</view>
			
		</view>
		
		<YppFooter></YppFooter>
		<popup-futures v-if="is_futures" :type="1" @close="onFuturesclose" @suer="onFuturesSuer"></popup-futures>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import { onLoad,onReady,onReachBottom } from "@dcloudio/uni-app";
	import { details,marchant,detailsBuy,orderDetail,queryUserFloatStock,lookaroundLogin,lookaround } from '../../api/common';
	import GoodsTree from '../../components/GoodsTree/GoodsTree.vue';
	import GoodsNotes from '../../components/GoodsNotes/GoodsNotes.vue';
	import { goDownApp, longAndSheImageList,getAfterDays,infoOrderType } from '../../utils/common';
	import { useGlobalStore } from '../../store/store';
	import PopupFutures from '../../components/PopupFutures/PopupFutures.vue';
	import { ProhibitScroll,TurnOnScrool } from '../../utils/scroll';
	import ListSell from '../../components/ListSell/ListSell.vue';
	import noData from '../../components/noData/noData.vue';
	import noMore from '../../components/noMore/noMore.vue';
	
	
	const is_futures = ref(false)
	const globalstore = useGlobalStore()
	const imgList = ref([])
	const NowIndex = ref(0)
	const pageType = ref(1)
	const orderCode = ref('')
	const RightsList = ref([{
		name: '评级币',
		icon: '/static/slices/pin.png'
	},{
		name: '保证金',
		icon: '/static/slices/bao.png'
	},{
		name: '担保交易',
		icon: '/static/slices/dan.png'
	}])
	const orderType = ref(0)
	const goodsInfo = ref(null)
	const marchantInfo = ref(null)
	const orderMarch = ref(null)
	const productCondition = ref({
		0: '全品',
		1: '上品',
		2: '中品',
		3: '差品',
		4: '个别瑕疵',
		5: '部分瑕疵',
	})
	const coinList = ref([])
	const allList = ref([])
	const pageNum = ref(0)
	const allTotal = ref(0)
	const onIndex = (type) =>{
		if(type === 'forWard') {
			if(NowIndex.value === imgList.value.length - 1) NowIndex.value = 0
			else NowIndex.value += 1
		}else{
			if(NowIndex.value === 0) NowIndex.value = imgList.value.length - 1
			else NowIndex.value -= 1 
		}
	}
	
	const nowChange = (e) =>{
		NowIndex.value = e.detail.current
	}
	
	function getMarchant(userId) {
		marchant({userId}).then(res=>{
			marchantInfo.value = res.data
		})
	}
	
	function getOrderDetail(orderCode) {
		orderDetail({orderCode}).then(res=>{
			orderMarch.value = res.data
		})
	}
	
	function getDetails(id) {
		if(orderType.value == 16 || orderType.value == 18){
			details(id).then(res=>{
			goodsInfo.value = res.data
			const _orderType = res.data.orderType
			if (res.data.labelInfos && (typeof res.data.labelInfos === 'string')) {
				const jsonData = JSON.parse(res.data.labelInfos)
				if (_orderType == 16) {
					const { tagName, spec } = jsonData
					goodsInfo.value.labelInfos = [{ id: '', name: tagName }, { id: '', name: spec }]
				} else if (_orderType == 18) {
					const { tagName } = jsonData
					goodsInfo.value.labelInfos = [{ id: '', name: tagName }]
					queryUserFloatStock({ consignCategoryId: jsonData.consignCategoryId }).then(res => {
						userFloatStock.value = res.data.remainingStock;
					})
				} else {
					goodsInfo.value.labelInfos = jsonData
				}
			}
			if(res.data.itemDTOList.length != 0){
				imgList.value = res.data.itemDTOList.split(',')
			}else if(res.data.firstItemImageUrl){
				imgList.value = res.data.firstItemImageUrl.split(',')
			}else{
				imgList.value.push(longAndSheImageList[res.data.productCategoryId])
			}
			
			if(res.data.publishGoldCoinItemDTOList){
				 res.data.publishGoldCoinItemDTOList.forEach(item=>{
					item.specItemList.forEach(_item=>{
						coinList.value.push(_item)
					})
				})
			}
			RightsList.value[0].name = (!res.data.appraisalInstitutionId ||  res.data.appraisalInstitutionId*1 < 1000 )? '无评级' : '评级币'
			RightsList.value[1].name = res.data.needTradeMargin ? '保证金' : '无保证金'
			RightsList.value[2].name = res.data.transactionMode ? '担保交易' : '非担保交易'
			if(!orderCode.value) getMarchant(res.data.userId)
			})
		}
		if(orderType.value == 0){
			detailsBuy(id).then(res=>{
				
				goodsInfo.value ={...res.data ,...res.data.purchaseOrderItemVOS[0]}
				if(res.data.purchaseOrderItemVOS[0].specItemList.length !== 0){
					res.data.purchaseOrderItemVOS[0].specItemList.forEach(item=>{
						coinList.value.push(item)
						if(item.imageUrl) imgList.value.push(item.imageUrl)
					})
				}else{
					imgList.value.push(longAndSheImageList[res.data.productCategoryId])
				}
				RightsList.value[0].name = (!res.data.purchaseOrderItemVOS[0].appraisalInstitutionId ||  res.data.purchaseOrderItemVOS[0].appraisalInstitutionId*1 < 1000 )? '无评级' : '评级币'
				RightsList.value[1].name = res.data.needTradeMargin ? '保证金' : '无保证金'
				RightsList.value[2].name = res.data.transactionMode ? '担保交易' : '非担保交易'
				
				if(!orderCode.value) getMarchant(res.data.userId)
			})
		}
		
	}
	
	const getLookaround = () => {
		const token = uni.getStorageSync('token')
		if (token) {
			lookaroundLogin({
				pageNum: pageNum.value,
				pageSize: 20,
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.getPublishPackageOrderPageRespDTO) {
						Object.assign(item, item.getPublishPackageOrderPageRespDTO)
						delete item.getPublishPackageOrderPageRespDTO
						if (item.grailCategoryJSON) {
							item.customTag = item.grailCategoryJSON.tagName.split(' ');
						} else if (item.publishGoldCoinItemDTOList?.length) {
							item.customTag = item.publishGoldCoinItemDTOList.flatMap(
								_i => _i.specItemList?.map(tag => tag.specificationsName) || []
							);
						} else {
							item.customTag = []
						}
					}
					if (item.purchaseOrderInfoVO) {
						Object.assign(item, item.purchaseOrderInfoVO);
						delete item.purchaseOrderInfoVO;
						if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
						else if (item.specItemList.length !== 0) {
							item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
						} else item.customTag = []
					}
				})
				allList.value = [...allList.value, ...data]
			})
		} else {
			lookaround({
				pageNum: pageNum.value,
				pageSize: 20,
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.getPublishPackageOrderPageRespDTO) {
						Object.assign(item, item.getPublishPackageOrderPageRespDTO)
						delete item.getPublishPackageOrderPageRespDTO
						if (item.grailCategoryJSON) {
							item.customTag = item.grailCategoryJSON.tagName.split(' ');
						} else if (item.publishGoldCoinItemDTOList?.length) {
							item.customTag = item.publishGoldCoinItemDTOList.flatMap(
								_i => _i.specItemList?.map(tag => tag.specificationsName) || []
							);
						} else {
							item.customTag = []
						}
					}
					if (item.purchaseOrderInfoVO) {
						Object.assign(item, item.purchaseOrderInfoVO);
						delete item.purchaseOrderInfoVO;
						if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
						else if (item.specItemList.length !== 0) {
							item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
						} else item.customTag = []
					}
				})
				allList.value = [...allList.value, ...data]
			})
		}
	}
	
	onReachBottom(() => {
		if (pageNum.value >= allTotal.value) return
		pageNum.value++
		getLookaround()
	})
	
	const onSell = () =>{
		uni.showToast({
			title: '敬请期待',
			icon: 'none'
		})
	}
	
	onLoad((e)=>{
		pageType.value = 2
		if(e.orderCode){
			getOrderDetail(e.orderCode)
			orderCode.value = e.orderCode
		}
		if(e.orderType){
			orderType.value = +e.orderType
		}
		getDetails(e.id)
		getLookaround()
	})
	
	const onOpenFut = () =>{
		if(uni.getStorageSync('is_presale')){
			onSell()
			return
		}
		ProhibitScroll()
		is_futures.value = true
		
	}
	
	const onFuturesclose = () =>{
		TurnOnScrool()
		is_futures.value = false
	}
	
	const onFuturesSuer = () =>{
		TurnOnScrool()
		is_futures.value = false
		onSell()
	}
	
</script>
	
<style scoped lang="scss">
	
	.content{
		background-color: #F8F8F8;
		button::after{
			display: none;
		}
		
		.body {
			width: 100%;
			box-sizing: border-box;
			padding: 40rpx 13.5%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: 50rpx;
		
			@media (max-width: 960px) {
				flex-direction: column;
				padding: 0;
			}
		
			.body-left {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 30rpx;
		
				@media (max-width: 960px) {
					width: 100%;
					display: flex;
					flex-direction: column;
				}
		
				.order {
					@media (max-width:960px) {
						order: 3;
						margin: 20rpx;
		
					}
				}
		
				.left-shop {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 24rpx;
					box-sizing: border-box;
					background: #fff;
					border-radius: 20rpx;
		
					@media (max-width: 960px) {
						order: 3;
						margin: 20rpx;
						padding: 20rpx;
					}
		
					.shop-left {
						display: flex;
						justify-content: center;
		
						.shopImg {
							width: 88rpx;
							height: 88rpx;
		
							image {
								width: 100%;
								border-radius: 50%;
								height: 88rpx;
							}
						}
		
						.shopInfo {
							margin-left: 16rpx;
							font-weight: 600;
							display: flex;
							flex-direction: column;
							justify-content: center;
		
							.march {
								background-color: #FF5500;
								color: #fff;
								padding: 2rpx 10rpx;
								font-size: 24rpx;
								margin-left: 10rpx;
								border-radius: 10rpx;
								font-weight: 400;
							}
		
							.infoImg {
								width: 68rpx;
								height: 30rpx;
							}
						}
		
					}
		
					.shop-right {
						display: flex;
		
						@media (max-width: 960px) {
							opacity: 0;
						}
		
						.infoLogo {
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 24rpx;
							color: #656565;
		
							.logo {
								width: 44rpx;
								height: 44rpx;
		
								image {
									width: 100%;
									height: 44rpx;
								}
							}
						}
					}
		
				}
		
				.left-content {
					padding: 24rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 20rpx;
					height: 1448rpx;
					width: 100%;
					display: flex;
					gap: 48rpx;
		
					>view {
						flex: 1;
					}
		
					.content-look {
						display: flex;
						width: 100%;
						height: 100%;
						gap: 26rpx;
		
						.img-list {
							width: 22%;
							height: 100%;
							overflow: auto;
							scrollbar-width: none;
							display: flex;
							flex-direction: column;
							gap: 28rpx;
		
							>view {
								width: 100%;
								min-height: 248rpx;
								background: #F8F8F8;
								border-radius: 20rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								box-sizing: border-box;
								overflow: hidden;
								cursor: pointer;
								>image {
									width: 100%;
									height: 100%;
								}
							}
		
							.active {
								box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.2);
								border-radius: 16rpx;
								border: 2rpx solid #FFC400;
								
							}
						}
		
						.left-img {
							display: flex;
							align-items: center;
							justify-content: center;
							box-sizing: border-box;
							position: relative;
							background: #FEFBEE;
							border-radius: 20rpx;
							flex: 1;
		
							.paddingWarp {
								height: 100%;
								width: 100%;
								position: relative;
		
								.swiper {
									height: 100%;
		
									.swiper-item {
										height: 100%;
		
										.item-img {
											display: flex;
											align-items: center;
											justify-content: center;
											width: 100%;
											height: 100%;
		
											image {
												width: 100%;
												height: 100%;
											}
										}
									}
								}
		
								.Row {
									position: absolute;
									top: calc(50% - 50rpx);
									width: 100rpx;
									height: 100rpx;
									background: #FFFFFF;
									box-shadow: 0px 3px 16px 0px rgba(47, 83, 109, 0.12);
									border-radius: 50%;
									display: flex;
									justify-content: center;
									transition: all 1s ease;
									cursor: pointer;
		
									@media (max-width: 960px) {
										display: none;
									}
		
									.RowColor:active {
										color: #2C2E3A !important;
									}
								}
		
								.Row:hover {
									transform: scale(1.1);
								}
		
							}
		
							.imgIndex {
								display: flex;
								align-items: center;
								position: absolute;
								right: 3%;
								bottom: 10%;
								background: #2C2E3C;
								opacity: 0.5;
								border-radius: 20rpx;
								color: #fff;
								padding: 2rpx 20rpx;
								font-size: 24rpx;
							}
						}
					}
		
					.content-info {
						height: 100%;
						display: flex;
						flex-direction: column;
						gap: 40rpx;
		
						.line {
							width: 100%;
							height: 0;
							border-bottom: 2rpx solid #F3F3F3;
						}
		
						.body-right-top {
							position: relative;
							padding-bottom: 40rpx;
		
							.success {
								position: absolute;
								right: -118rpx;
								top: -42rpx;
								width: 20%;
								z-index: 9;
								@media (max-width: 960px) {
									right: -20rpx;
									top: -30px;
								}
		
								image {
									width: 100%;
								}
							}
		
							.currenShop {
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								
								.presale {
									display: flex;
									flex-direction: column;
									gap: 20rpx;
									padding: 28rpx;
									box-sizing: border-box;
									background: linear-gradient(90deg, #FF5500 0%, #6D04C4 100%);
									border-radius: 12rpx;
									margin-top: 32rpx;
									position: relative;
								
									@media (max-width: 960px) {
										order: 2;
										margin-top: 0;
									}
								
									>image {
										width: 150rpx;
										height: 146rpx;
										position: absolute;
										top: 0;
										right: 14rpx;
									}
								
									.presale-price {
										display: flex;
										align-items: flex-end;
										gap: 50rpx;
								
										>view:first-child {
											>span {
												font-weight: 600;
												font-size: 32rpx;
												color: #FFFFFF;
												line-height: 24rpx;
											}
								
											font-weight: bold;
											font-size: 52rpx;
											color: #FFFFFF;
											line-height: 48rpx;
										}
								
										.unit {
											display: flex;
											
											gap: 32rpx;
											font-weight: 400;
											font-size: 26rpx;
											color: #FFFFFF;
											line-height: normal;
										}
									}
								
									.presale-time {
										display: flex;
										align-items: center;
										gap: 6rpx;
										font-weight: 400;
										font-size: 26rpx;
										color: #FFFFFF;
										line-height: 26rpx;
								
										>image {
											width: 26rpx;
											height: 26rpx;
										}
									}
								}
		
								.presale-process {
									display: flex;
									flex-direction: column;
									gap: 24rpx;
									padding: 20rpx 32rpx;
									box-sizing: border-box;
									background: #FFF0DC;
									border-radius: 12rpx;
									margin-bottom: 20rpx;
		
									>view:first-child {
										font-weight: 600;
										font-size: 28rpx;
										color: #BF7D2B;
										line-height: 28rpx;
									}
		
									.process-list {
										display: flex;
										align-items: center;
										justify-content: space-between;
										gap: 16rpx;
		
										>image {
											width: 48rpx;
											height: 4rpx;
											// transform: translateY(26rpx);
										}
		
										.item {
											display: flex;
											align-items: center;
											font-weight: 400;
											font-size: 24rpx;
											color: #BF7D2B;
											line-height: 24rpx;
											white-space: nowrap;
											gap: 16rpx;
		
											>image {
												width: 38rpx;
												height: 38rpx;
											}
										}
									}
								}
							}
		
							.rightName {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								font-weight: 600;
								font-size: 44rpx;
		
								@media (max-width: 960px) {
									margin: 0 20rpx;
									font-size: 32rpx;
									flex-wrap: wrap;
								}
		
								.nameTitle {
									display: flex;
									align-items: center;
									text-align: center;
									white-space: nowrap;
									gap: 10rpx;
		
									@media (max-width: 960px) {
										width: 100%;
									}
								}
		
								.nameType {
									display: flex;
									align-items: center;
									margin: 0 12rpx;
									font-size: 24rpx;
									color: #ABABAB;
									font-weight: 400;
		
									@media (max-width: 960px) {
										margin: 0 24rpx 0 0;
										font-size: 28rpx;
										color: #333;
									}
		
									.img {
										width: 40rpx;
										aspect-ratio: 1/1;
										display: flex;
										align-items: center;
										justify-content: center;
										margin: 0 2rpx;
		
										image {
											width: 100%;
											height: 40rpx;
										}
									}
								}
							}
		
							.rightPicker {
								display: flex;
								justify-content: flex-start;
								align-items: center;
		
								font-weight: 600;
								font-size: 56rpx;
								color: #FF5500;
		
								@media (max-width: 960px) {
									justify-content: space-between;
									margin: 10rpx 20rpx;
								}
		
								.picker {
									@media (max-width: 960px) {
										width: 50%;
										font-size: 52rpx;
									}
								}
		
								.margin {
									margin: 0 12rpx;
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
								}
							}
		
							.rightInfo {
		
								border-radius: 20rpx;
								box-sizing: border-box;
								color: #ABABAB;
		
								@media (max-width: 960px) {
									margin: 0 20rpx;
								}
		
								.infoItem {
									display: flex;
									align-items: center;
									padding: 16rpx 0;
		
									@media (max-width: 960px) {
										align-items: flex-start;
										padding: 10rpx 0;
									}
		
									.infoLift {
										width: 20%;
		
										@media (max-width: 960px) {
											width: 28%;
										}
									}
		
									.infoRight {
										width: 85%;
										margin-left: 20rpx;
										color: #2C2E3A;
										display: flex;
		
										@media (max-width: 960px) {
											width: 72%;
											margin: 0;
										}
		
		
										.good {
											background-color: #FFF0DC;
											padding: 4rpx 14rpx;
											color: #BF7D2B;
											font-size: 24rpx;
											border-radius: 16rpx;
										}
		
										.pipe {
											color: #D8D8D8;
											margin: 0 8rpx;
										}
									}
		
									.infoRight-bont {
										width: 85%;
										margin-left: 20rpx;
										color: #2C2E3A;
										display: flex;
										align-items: center;
		
										@media (max-width: 960px) {
											flex-direction: column;
											align-items: flex-start;
										}
		
										.bond {
											font-weight: 400;
											font-size: 28rpx;
											color: #2C2E3A;
										}
		
										.bondtext {
											font-size: 20rpx;
											color: #C2C2C2;
										}
									}
								}
							}
		
						}
		
						.details {
							width: 100%;
							box-sizing: border-box;
							flex: 1;
							overflow: auto;
							scrollbar-width: none;
		
							.details-name {
								font-weight: 500;
								font-size: 32rpx;
								color: #2C2E3A;
								padding-bottom: 12rpx;
								box-sizing: border-box;
								position: sticky;
								top: 0;
								left: 0;
								background-color: #FFFFFF;
								z-index: 2;
		
								@media (max-width: 960px) {
									font-size: 30rpx;
								}
							}
		
							.details-title {
								margin-bottom: 24rpx;
							}
		
							.details-num {
								.details-info {
									font-weight: 600;
									color: #ABABAB;
									margin-bottom: 18rpx;
								}
							}
		
						}
		
						.pay {
							width: 100%;
							display: flex;
							justify-content: center;
		
							@media (max-width: 960px) {
								display: none;
							}
		
							.preorder-but {
								display: flex;
								align-items: center;
								justify-content: center;
								background: linear-gradient(90deg, #FF5500 0%, #6D04C4 100%);
								padding: 19rpx;
		
								>view:first-child {
									padding: 0 80rpx;
									box-sizing: border-box;
									font-size: 36rpx;
									line-height: 36rpx;
									font-weight: 600;
									border-right: 1rpx dashed #FFF;
								}
		
								>view:last-child {
									display: flex;
									flex-direction: column;
									padding: 0 80rpx;
									box-sizing: border-box;
									gap: 10rpx;
									font-size: 24rpx;
									font-weight: 400;
									line-height: 24rpx;
								}
							}
		
							button {
								width: 50%;
								background-color: #FFC400;
								color: #fff;
								border-radius: 112rpx;
								font-size: 36rpx;
								font-weight: 600;
								line-height: 36rpx;
								padding: 30rpx;
								box-sizing: border-box;
		
								@media (max-width: 960px) {
									margin: 0 20rpx;
								}
		
							}
						}
		
						.submit-info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: fixed;
							bottom: 0;
							background-color: #fff;
							width: 100%;
							box-sizing: border-box;
							padding: 20rpx;
		
							@media (min-width: 960px) {
								display: none;
							}
		
							.left {
								flex: 1;
								padding-left: 28rpx;
		
								.link {
									display: inline-block;
									text-align: center;
									color: #656565;
									font-size: 22rpx;
									margin-right: 48rpx;
		
									image {
										width: 44rpx;
										height: 44rpx;
										display: block;
										margin: 0 auto 8rpx;
									}
								}
							}
		
							.btn-submit {
								height: 84rpx;
								line-height: 84rpx;
								background: #FF5500;
								border-radius: 200rpx;
								font-weight: 600;
								font-size: 30rpx;
								color: #FFFFFF;
								width: 400rpx;
								margin-right: 28rpx;
								display: inline-block;
		
								&.btn-gray {
									background: #FFFFFF;
									color: #000;
									border: 1px solid #D8D8D8;
									width: 200rpx;
								}
		
								&.btn-blue {
									background: #00B0F9;
								}
		
								&:active {
									opacity: 0.9;
								}
		
								&:after {
									display: none;
								}
							}
						}
					}
		
				}
		
			}
		
.body-right {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 36rpx;
				width: 100%;

				>view:first-child {
					font-weight: 600;
					font-size: 40rpx;
					color: #2C2E3A;
					position: relative;
					display: flex;

					&::after {
						content: '';
						position: absolute;
						top: 100%;
						left: 0;
						width: 100%;
						height: 10rpx;
						border-radius: 12rpx;
						background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
					}
				}
			}
		}
	}
	
</style>