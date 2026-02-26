<template>
	<view class="logistics">
		<GlobalSidebar />
		<YppHeader :index="-1"></YppHeader>
		<view class="content" v-if="logisInfo">
			<view class="logistics-content">
				<view>物流详情</view>
				<view class="shop-content">
					<view class="shopment">
						<image :src="orderInfo.sellerAvatar" mode="aspectFill"></image>
						<view class="nickName">
							<view>{{orderInfo.sellerNickName}}</view>
							<view>
								<view>联系卖家</view>
								<uni-icons type="right" color="#FFC400" size="16"></uni-icons>
							</view>
						</view>
					</view>
					<view class="goods">
						<view>
							<image :src="orderInfo?.itemImageUrl || orderInfo.goldCoinSpecList?.[0]?.imageUrl || orderInfo?.pictureDetails?.split(',')?.[0] || longAndSheImageList[orderInfo.productName] || longAndSheImageList[orderInfo.productId]" mode="aspectFit"></image>
						</view>
						<view class="goods-right">
							<view @click="onDetails(orderInfo)">{{orderInfo.productName}}
								<uni-icons type="right" color="#ABABAB" size="16"></uni-icons>
							</view>
							<view>{{orderInfo.descriptionDetails}}</view>
							<view>{{orderInfo.totalPrice}}</view>
						</view>
					</view>
				</view>
				<view class="logistics-info">
					<view>
						<image :src="''" mode="aspectFill"></image>
						<view>{{_tranMap[logisInfo.queryTrackMapResp.com]}} {{logisInfo.queryTrackMapResp.nu}} <span @click="onCopy(logisInfo.queryTrackMapResp.nu)">复制</span> ｜ 联系电话: {{logisInfo.contactNumber}}</view>
					</view>
					<view class="infomation">
						<view class="info-list">
							<view class="item" v-for="(item,index) in logisInfo.queryTrackMapResp.data">
								<view :index="JSON.stringify(index)">
									<view>{{item.status}}</view>
									<view>{{item.time}}</view>
								</view>
								<view>{{item.context}}</view>
							</view>
						</view>
					</view>
					<view>
						<image src="/static/mine/shou.png" mode="scaleToFill"></image>
						<view>
							<view>{{logisInfo.address}}</view>
							<view>{{logisInfo.nickName}} {{logisInfo.phone}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		BuyerOrderDetail,
		sellOrderDetail,
		queryMapView
	} from '../../api/common';
	import {
		ref
	} from 'vue';
	import { onCopy,longAndSheImageList } from '../../utils/common';

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
	
	const _tranMap = ref({
		'shunfeng': '顺丰速运',
		'zhongtong': '中通快递',
		'yuantong': '圆通国际',
		'huitongkuaidi': '百世快递',
		'shentong': '申通快递',
		'yunda': '韵达快递',
		'ems': 'EMS',
		'jd': '京东物流',
		'zhaijisong': '宅急送',
		'debangkuaidi': '德邦快递',
		'shansong': '闪送',
		'kfw': '快服务'
	})

	const prefixMap = {
		1: '', // 订单快递查询
		2: 'reject', // 审批拒绝快递查询
		3: 'refund' // 退货快递查询
	};

	const orderInfo = ref(null)
	const logisInfo = ref(null)
	const trackingType = ref(1)

	const getInfo = (orderCode,type) => {
		//type: 0我买到的，1我卖出的
		if(type == 0){
			BuyerOrderDetail({
				orderCode
			}).then(res => {
				orderInfo.value = res.data[orderSourceMap[res.data.orderSource]]
				loogLog(orderInfo.value)
			})
		}else if(type == 1){
			sellOrderDetail({orderCode}).then(res=>{
				orderInfo.value = res.data[orderSourceMap[res.data.orderSource]]
				loogLog(orderInfo.value)
			})
		}
	
	}

	/**
	 * 查看无物流
	 * trackingType: 1- 订单快递查询 2-审批拒绝快递查询 3-退货快递查询
	 * trackingNumbers: 1-trackingNumber 2-rejectTrackingNumbers 3- refundTrackingNumbers
	 * trackingCompany: 1-trackingCompany 2-rejectTrackingCompany 3- refundTrackingCompany
	 */
	const loogLog = (info) => {
		const prefix = prefixMap[trackingType.value]
		const data = {
			orderCode: info.orderCode,
			trackingType: trackingType.value,
		};
		if (prefix === '') {
			data.trackingCompany = info.trackingCompany;
			data.trackingNumbers = info.trackingNumber;
		} else {
			data[`${prefix}TrackingCompany`] = info[`${prefix}TrackingCompany`];
			data[`${prefix}TrackingNumbers`] = info[`${prefix}TrackingNumbers`];
		}
		queryMapView({...data}).then(res=>{
			logisInfo.value = {
			  ...res.data,
			  phone: res.data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
				contactNumber: res.data.queryTrackMapResp.data[0].context.match(/1[3-9]\d{9}/)[0]
			};
		})
	}
	
	const onDetails = (e) =>{
		window.open(`/#/pages/details/details?id=${e.publishId}&orderCode=${e.orderCode	}`,'_blank')
	}

	onLoad((e) => {
		trackingType.value = +e.trackingType
		getInfo(e.orderCode,e.type)
	})
</script>

<style scoped lang="scss">
	@mixin column($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}

	@mixin flex-center($gap) {
		display: flex;
		align-items: center;
		gap: $gap;
	}

	.logistics {
		background-color: #fdfdfd;

		.content {
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			gap: 40rpx;
			height: calc(100vh - 232rpx);
			min-height: 1400rpx;

			.logistics-content {
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.08);
				border-radius: 16rpx;
				padding: 50rpx 28rpx;
				box-sizing: border-box;
				@include column(30rpx);

				>view:first-child {
					font-weight: 600;
					font-size: 36rpx;
					color: #2C2E3A;
				}

				.shop-content {
					padding: 20rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					border-radius: 20rpx;
					@include column(16rpx);

					.shopment {
						@include flex-center(8rpx);

						>image {
							width: 56rpx;
							height: 56rpx;
							border-radius: 50%;
						}

						.nickName {
							@include flex-center(16rpx);

							>view:first-child {
								font-weight: 400;
								font-size: 28rpx;
								color: #656565;
							}

							>view:last-child {
								@include flex-center(4rpx);
								font-weight: 600;
								font-size: 26rpx;
								color: #FFC400;
								cursor: pointer;
							}
						}
					}

					.goods {
						display: flex;
						gap: 16rpx;

						>view:first-child {
							width: 160rpx;
							height: 160rpx;
							border-radius: 12rpx;
							background-color: #FFFFFF;

							>image {
								width: 100%;
								height: 100%;
								border-radius: 12rpx;
							}
						}

						.goods-right {
							width: 100%;

							>view:first-child {
								font-weight: 500;
								font-size: 30rpx;
								color: #2C2E3A;
								line-height: 30rpx;
								cursor: pointer;
							}

							>view:nth-child(2) {
								font-weight: 400;
								font-size: 26rpx;
								color: #656565;
								line-height: 26rpx;
								width: 30%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								margin: 20rpx 0 30rpx;
							}

							>view:last-child {
								font-weight: 600;
								font-size: 34rpx;
								color: #2C2E3A;
								line-height: 34rpx;

								&::before {
									content: '¥';
									font-size: 24rpx;
								}
							}
						}
					}
				}

				.logistics-info {
					@include column(30rpx);
					height: 100%;
					overflow: hidden;

					>view:first-child {
						@include flex-center(10rpx);
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;

						>image {
							width: 56rpx;
							height: 56rpx;
							border-radius: 50%;
						}

						>view>span {
							cursor: pointer;
						}
					}

					.infomation {
						padding-left: 28rpx;

						overflow-y: auto;

						.info-list {
							@include column(0);

							.item {
								@include column(16rpx);
								padding-left: 20rpx;
								padding-bottom: 36rpx;
								box-sizing: border-box;
								border-left: 2rpx dashed #979797;

								>view:first-child {
									@include flex-center(10rpx);
									position: relative;

									&::before {
										content: '';
										position: absolute;
										left: -28rpx;
										width: 12rpx;
										height: 12rpx;
										background: #FFFFFF;
										border-radius: 50%;
										border: 1px solid #ABABAB;

									}

									>view:first-child {
										font-weight: 600;
										font-size: 30rpx;
										color: #2C2E3A;
										line-height: 30rpx;
									}

									>view:last-child {
										font-weight: 400;
										font-size: 26rpx;
										color: #ABABAB;
										line-height: 26rpx;
									}
								}

								>view:first-child[index="0"] {
									&::before {
										content: '';
										position: absolute;
										left: -30rpx;
										width: 8px;
										height: 8px;
										background: #FFC400;
										border-radius: 50%;
										border: 1px solid #FFC400;
									}

									&::after {
										content: '';
										position: absolute;
										left: -24rpx;
										top: -3px;
										width: 4px;
										height: 6px;
										background-color: #fff;
									}
								}

								>view:last-child {
									font-weight: 400;
									font-size: 28rpx;
									color: #656565;
									line-height: 44rpx;
								}
							}

							>view:last-child {
								border-left: 2rpx dashed #FFFFFF;
							}
						}
					}

					>view:last-child {
						display: flex;
						gap: 12rpx;

						>image {
							width: 38rpx;
							height: 48rpx;
						}

						>view:last-child {
							@include column(18rpx);

							>view:first-child {
								font-weight: 400;
								font-size: 28rpx;
								color: #2C2E3A;
								line-height: 40rpx;
							}

							>view:last-child {
								font-weight: 400;
								font-size: 26rpx;
								color: #656565;
								line-height: 26rpx;

								&::after {
									content: '号码保护中';
									background: #F8F8F8;
									border-radius: 12rpx;
									padding: 8rpx 10rpx;
									box-sizing: border-box;
									font-weight: 400;
									font-size: 24rpx;
									color: #ABABAB;
									line-height: 24rpx;
									margin-left: 12rpx;
								}
							}
						}
					}
				}
			}
		}

	}
</style>