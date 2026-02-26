<template>
	<view class="NumTransaction">
		<GlobalSidebar />
		<YppHeader :index="0"></YppHeader>
		<view class="transaction">
			<view class="transaction-box">
				<view class="tran-top">
					<view class="retreat" @click="retreat">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/retreat.png')" mode="widthFix"></image>
						</view>
						<view>返回</view>
					</view>
				</view>
				<view class="tranDetail" v-if="tranInfo">
					<view class="tranDetail-left">
						<view>商品名称：{{tranInfo.productName}}</view>
						<view>成交时间：{{tranInfo.payTime}}</view>
						<view class="left-box">
							<view class="left-box-top">
								<view>已选冠号(共12张)</view>
								<view>{{getCrownNumbers(tranInfo.crownNumbers)}}</view>
							</view>
							<view class="left-box-bottom">成交总价:<text>¥{{tranInfo.totalPrice}}</text></view>
						</view>
					</view>
					<view class="tranDetail-right">
						<view>相关议价记录</view>
						<view class="bargain">
							<view class="buy" style="box-shadow: 4rpx 0 10rpx 0 #FFF1C3;border-radius: 12rpx;border: 2rpx solid #FFE9A1;">
								<view>买家议价</view>
								<view class="buy-name">
									<view>
										<image :src="tranInfo.buyerAvatar" mode="aspectFill"></image>
									</view>
									<view>
										{{tranInfo.buyerNickName}}
									</view>
								</view>
								<view class="buy-info">
									<view v-if="tranInfo.bargainOrderRecordVO.buyerQuotedPrice1">
										<view class="buy-item">
											<view>
												<image :src="globalstore.upImageuler('/static/Numtra/one.png')" mode="scaleToFill"></image>
											</view>
											<view class="price-time">
												<view>¥{{tranInfo.bargainOrderRecordVO.buyerQuotedPrice1}}</view>
												<view>{{tranInfo.bargainOrderRecordVO.buyerQuotedTime1}}</view>
											</view>
										</view>
										
									</view>
									<view v-else>无</view>
									<view v-if="tranInfo.bargainOrderRecordVO.buyerQuotedPrice2">
										<view class="dotted-line"></view>
										<view class="buy-item">
											<view>
												<image :src="globalstore.upImageuler('/static/Numtra/two.png')" mode="scaleToFill"></image>
											</view>
											<view class="price-time">
												<view>¥{{tranInfo.bargainOrderRecordVO.buyerQuotedPrice2}}</view>
												<view>{{tranInfo.bargainOrderRecordVO.buyerQuotedTime2}}</view>
											</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.buyerQuotedPrice3">
										<view class="dotted-line"></view>
										<view class="buy-item">
											<view>
												<image :src="globalstore.upImageuler('/static/Numtra/three.png')" mode="scaleToFill"></image>
											</view>
											<view class="price-time">
												<view>¥{{tranInfo.bargainOrderRecordVO.buyerQuotedPrice3}}</view>
												<view>{{tranInfo.bargainOrderRecordVO.buyerQuotedTime3}}</view>
											</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.buyerQuotedPrice4">
										<view class="dotted-line"></view>
										<view class="buy-item">
											<view>
												<image :src="globalstore.upImageuler('/static/Numtra/four.png')" mode="scaleToFill"></image>
											</view>
											<view class="price-time">
												<view>¥{{tranInfo.bargainOrderRecordVO.buyerQuotedPrice4}}</view>
												<view>{{tranInfo.bargainOrderRecordVO.buyerQuotedTime4}}</view>
											</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.buyerQuotedPrice5">
										<view class="dotted-line"></view>
										<view class="buy-item">
											<view>
												<image :src="globalstore.upImageuler('/static/Numtra/fiv.png')" mode="scaleToFill"></image>
											</view>
											<view class="price-time">
												<view>¥{{tranInfo.bargainOrderRecordVO.buyerQuotedPrice5}}</view>
												<view>{{tranInfo.bargainOrderRecordVO.buyerQuotedTime5}}</view>
											</view>
										</view>
									</view>
									
								</view>
							</view>
							<view class="buy" style="background: #FFF8E1;">
								<view>卖家议价</view>
								<view class="buy-name">
									<view>
										<image :src="tranInfo.sellerAvatar" mode="aspectFill"></image>
									</view>
									<view>
										{{tranInfo.sellerNickName}}
									</view>
								</view>
								<view class="buy-info">
									<view v-if="tranInfo.bargainOrderRecordVO.sellerQuotedPrice1">
										<view class="price-sell">
											<view>¥{{tranInfo.bargainOrderRecordVO.sellerQuotedPrice1}}</view>
											<view>{{tranInfo.bargainOrderRecordVO.sellerQuotedTime1}}</view>
										</view>
										
									</view>
									<view v-else>无</view>
									<view v-if="tranInfo.bargainOrderRecordVO.sellerQuotedPrice2">
										<view class="dotted-line"></view>
										<view class="price-sell">
											<view>¥{{tranInfo.bargainOrderRecordVO.sellerQuotedPrice2}}</view>
											<view>{{tranInfo.bargainOrderRecordVO.sellerQuotedTime2}}</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.sellerQuotedPrice3">
										<view class="dotted-line"></view>
										<view class="price-sell">
											<view>¥{{tranInfo.bargainOrderRecordVO.sellerQuotedPrice3}}</view>
											<view>{{tranInfo.bargainOrderRecordVO.sellerQuotedTime3}}</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.sellerQuotedPrice4">
										<view class="dotted-line"></view>
										<view class="price-sell">
											<view>¥{{tranInfo.bargainOrderRecordVO.sellerQuotedPrice4}}</view>
											<view>{{tranInfo.bargainOrderRecordVO.sellerQuotedTime4}}</view>
										</view>
										
									</view>
									<view v-if="tranInfo.bargainOrderRecordVO.sellerQuotedPrice5">
										<view class="dotted-line"></view>
										<view class="price-sell">
											<view>¥{{tranInfo.bargainOrderRecordVO.sellerQuotedPrice5}}</view>
											<view>{{tranInfo.bargainOrderRecordVO.sellerQuotedTime5}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<YppFooter></YppFooter>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { queryOrderDetail } from '../../api/common';
	import {onLoad} from '@dcloudio/uni-app'
	import { getPublishPackageItemDTOList } from '../../utils/common';
	import { useGlobalStore } from '../../store/store';
	const globalstore = useGlobalStore()
	
	const tranInfo = ref(null)
	
	const retreat = () =>{
		uni.navigateBack()
	}
	
	function getDetail(orderCode){
		queryOrderDetail({orderCode}).then(res=>{
			tranInfo.value = res.data.bargainDetailOrderInfoVO
		})
	}
	
	const getCrownNumbers = (arr = []) => {
		let str = ''
		arr.forEach(item => {
			const { crownType, numDetails } = item
			str += `、${getPublishPackageItemDTOList(item.crownType, item.numDetails)}`
		})
		return str.substr(1)
	}
	
	onLoad((e)=>{
		getDetail(e.orderCode)
	})
	
</script>

<style scoped lang="scss">
	.NumTransaction{
		
		.transaction{
			padding: 40rpx 13.5% 60rpx;
			width: 100%;
			box-sizing: border-box;
			@media (max-width: 960px) {
				padding: 20rpx;
			}
			.transaction-box{
				width: 100%;
				height: calc(100vh - 232rpx);
				background: #FFFFFF;
				box-shadow: 0px 4rpx 24rpx 0px rgba(47,83,109,0.08);
				border-radius: 16rpx;
				padding: 28rpx 40rpx;
				box-sizing: border-box;
				
				@media (max-width: 960px) {
					padding: 20rpx;
				}
				
				.tran-top{
					display: flex;
					.retreat{
						display: flex;
						align-items: center;
						font-weight: 600;
						font-size: 40rpx;
						gap: 10rpx;
						cursor: pointer;
						@media (max-width: 960px) {
							gap: 0rpx;
						}
						>view:first-child{
							width: 48rpx;
							aspect-ratio: 1/1;
							display: flex;
							align-items: center;
							
							image{
								width: 100%;
								
							}
						}
					}
				}
				.tranDetail{
					display: flex;
					width: 100%;
					gap: 40rpx;
					justify-content: space-between;
					margin-top: 16rpx;
					@media (max-width: 960px) {
						flex-direction: column;
					}
					.tranDetail-left{
						width: 72.12%;
						display: flex;
						flex-direction: column;
						gap: 20rpx;
						@media (max-width: 960px) {
							width: 100%;
						}
						>view:first-child{
							font-weight: 500;
							font-size: 32rpx;
						}
						
						>view:nth-child(2){
							color: #ABABAB;
						}
						
						.left-box{
							width: 100%;
							aspect-ratio: 3.08805;
							background-color: #FFFDF6;
							border-radius: 12rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.left-box-top{
								display: flex;
								flex-direction: column;
								align-items: flex-start;
								>view:first-child{
									background-image: url('/static/Numtra/bgimg.png');
									background-size: cover;
									background-position: center;
									background-repeat: no-repeat;
									padding: 10rpx 20rpx;
									box-sizing: border-box;
									width: 284rpx;
									color: #BF7D2B;
									white-space: nowrap;
								}
								>view:last-child{
									padding: 16rpx 20rpx;
									box-sizing: border-box;
								}
							}
							.left-box-bottom{
								display: flex;
								justify-content: flex-end;
								align-items: center;
								font-size: 13px;
								color: #BF7D2B;
								padding: 32rpx 40rpx;
								box-sizing: border-box;
								background: #FFF8E1;
								@media (max-width: 960px) {
									padding: 16rpx 20rpx;
								}
								>text{
									font-weight: 600;
									font-size: 17px;
									color: #FF5500;
								}
							}
						}
					}
					
					.tranDetail-right{
						width: calc(100% - 72.12% - 40rpx);
						@media (max-width: 960px) {
							width: 100%;
						}
						>view:first-child{
							font-size: 30rpx;
							background: url('/static/Numtra/pen.png');
							background-size: auto;
							background-repeat: no-repeat;
							background-position: left center;
							padding: 0 6rpx;
							box-sizing: border-box;
						}
						.bargain{
							margin-top: 30rpx;
							display: flex;
							
							.buy{
								padding: 24rpx 36rpx 44rpx;
								width: 50%;
								box-sizing: border-box;
								background: #FFFDF6;
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								>view:first-child{
									display: flex;
									width: 100%;
									justify-content: center;
								}
								.buy-name{
									display: flex;
									align-items: center;
									gap: 8rpx;
									font-size: 24rpx;
									color: #ABABAB;
									>view:first-child{
										width: 40rpx;
										aspect-ratio: 1/1;
										display: flex;
										align-items: center;
										image{
											width: 100%;
											height: 100%;
											border-radius: 50%;
										}
									}
								}
								.buy-info{
									
									.buy-item{
										display: flex;
										align-items: center;
										gap: 16rpx;
										>view:first-child{
											width: 34rpx;
											aspect-ratio: 1/1;
											display: flex;
											align-items: center;
											image{
												width: 100%;
												height: 100%;
											}
										}
										.price-time{
											display: flex;
											flex-direction: column;
											gap: 12rpx;
											>view:first-child{
												font-weight: 600;
												font-size: 24rpx;
											}
											>view:last-child{
												font-size: 24rpx;
												color: #ABABAB;
												white-space: nowrap;
											}
										}
									}
									
									.price-sell{
										display: flex;
										flex-direction: column;
										gap: 12rpx;
										>view:first-child{
											font-weight: 600;
											font-size: 24rpx;
											color: #BF7D2B;
										}
										>view:last-child{
											font-size: 24rpx;
											color: #ABABAB;
										}
									}
									.dotted-line{
										margin-left: 16rpx;
										width: 100%;
										border-bottom: 2rpx dashed #D8D8D8;
										height: 2rpx;
										margin: 26rpx 0 24rpx 0;
									}
								}
							}
							.sell{
								padding: 24rpx 36rpx 44rpx;
								width: 50%;
								box-sizing: border-box;
							}
						}
					}
				}
			}
		}
	}
</style>
