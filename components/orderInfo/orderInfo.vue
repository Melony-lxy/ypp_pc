<template>
	<view class="orderInfo">
		<view>订单详情</view>
		<view class="gap">
			<view class="total" v-if="status">
				<view>成交总价:</view>
				<view class="price">¥{{info.totalPrice}}</view>
			</view>
			<view class="deposit" v-if="!status">
				<view class="total">
					<view>成交总价:</view>
					<view class="price">¥{{info.totalPrice}}</view>
				</view>
				<view>*当前商品交易为保证金交易，将以部分货款<span>(共{{info.marginAmount}}元)</span>做为商品交易的保证金。</view>
			</view>
			<view class="total">
				<view>单价:</view>
				<view class="price">¥{{info.unitPrice}}</view>
			</view>
			<view class="total">
				<view>订单编号:</view>
				<view class="copy">
					<view>{{info.orderCode}} |</view>
					<view @click="onCopy(info.orderCode)">复制</view>
				</view>
			</view>
			<view class="total">
				<view>创建时间:</view>
				<view class="time">{{info.createTime}}</view>
			</view>
			<view class="total" v-if="info.payTime || info.marginCoolingOffTime">
				<view>付款时间:</view>
				<view class="time">{{info.payTime || info.marginCoolingOffTime}}</view>
			</view>
			<view class="total" v-if="status && info.afterSaleDetailVO?.refundTrackingNumbers">
				<view>快递单号:</view>
				<view class="copy">
					<view>{{info.afterSaleDetailVO?.refundTrackingNumbers}} |</view>
					<view @click="onCopy(info.afterSaleDetailVO?.refundTrackingNumbers)">复制</view>
				</view>
			</view>
			<view class="upim" v-if="status && Object.keys(info?.afterSaleDetailVO || {}).length  != 0 && info.afterSaleDetailVO?.submitAfterReasonPictUrls.length != 0 ">
				<view>上传照片:</view>
				<view>
					<view v-for="(item,index) in info.afterSaleDetailVO?.submitAfterReasonPictUrls">
						<image :src="item" mode="aspectFit" @click="lookImageLsit(info.afterSaleDetailVO?.submitAfterReasonPictUrls,index)"></image>
					</view>
				</view>
			</view>
			<view class="upim" v-if="info.orderStatus === 99 && info.sentPictUrls.length !== 0">
				<view>上传照片:</view>
				<view>
					<view v-for="(item,index) in info.sentPictUrls">
						<image :src="item" mode="aspectFit" @click="lookImageLsit(info.sentPictUrls,index)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {onCopy,lookImageLsit} from '../../utils/common.js' 

	const props = defineProps({
		status: {
			type: Number,
			default: 0,//0正常，1异常，2议价
		},
		info: {
			type: Object,
			default: () =>({})
		}
	})

</script>

<style scoped lang="scss">
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
			
			.deposit{
				display: flex;
				flex-direction: column;
				gap: 16rpx;
				.total{
					display: flex;
					justify-content: space-between;
					align-items: center;
					line-height: 28rpx;
					.price {
						font-weight: 600;
					}
				}
				>view:last-child{
					font-weight: 400;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 38rpx;
					>span{
						color: #FF5500;
					}
				}
			}

			.upim {
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				>view:last-child {
					display: grid;
					gap: 20rpx;
					grid-template-columns: repeat(3,1fr);
					>view{
						width: 100%;
						aspect-ratio: 1/1;
						display: flex;
						background-color: #f8f8f8;
						border-radius: 12rpx;
						>image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}
				}
			}
		}
	}
</style>