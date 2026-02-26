<template>
	<view class="saleApply">
		<GlobalSidebar />
		<YppHeader></YppHeader>
		<view class="content">
			<view class="salecon">
				<view>申请售后</view>
				<view class="shop">
					<view class="top">
						<image :src="orderInfo.sellerAvatar" mode="aspectFit"></image>
						<view>{{orderInfo.sellerNickName}}</view>
						<view>
							<view>联系买家</view>
							<uni-icons type="right" color="#FFC400"></uni-icons>
						</view>
					</view>
					<view class="shopitem">
						<image :src="orderInfo.buyerAvatar" mode="aspectFit"></image>
						<view class="right">
							<view>
								<view>{{orderInfo.productName}}</view>
								<uni-icons type="right" color="#ABABAB"></uni-icons>
							</view>
							<view>保证金: ¥{{orderInfo.marginAmount}}</view>
							<view class="price">
								<view><span>¥</span>{{orderInfo.totalPrice}}</view>
								<view>包邮</view>
							</view>
						</view>
					</view>
				</view>
				<view class="selectype">
					<view>选择售后类型</view>
					<view class="typelist">
						<view class="item" v-for="(item,index) in typeList" :class="{active: typeIndex === index}" @click="onSelect(index)">
							<image :src="globalstore.upImageuler(item.icon)" mode="widthFix"></image>
							<view>
								<view>{{item.title1}}</view>
								<view>{{item.title2}}</view>
							</view>
						</view>
					</view>
					<view class="reason">
						<view>请选择退货原因</view>
						<view class="reasonList">
							<view class="item" v-for="(item,index) in typeList[typeIndex].list" @click="onReason(index,item.id)">
								<image :src="reasonIndex === index ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="widthFix"></image>
								<view>{{item.title}}</view>
							</view>
						</view>
						<view class="upimage">
							<view>上传图片 <span>*最多上传四张图片(选填)</span></view>
							<view class="add">
								<image :src="globalstore.upImageuler('/static/mine/add.png')" mode="scaleToFill" @click="upImage" v-if="imgList.length !== 4"></image>
								<view class="imglist" v-for="(item,index) in imgList" @click="lookImageLsit(imgList,index)">
									<image :src="item" mode="aspectFit"></image>
									<image class="delete" :src="globalstore.upImageuler('/static/mine/de.png')" mode="scaleToFill" @click.stop="onDete(index)"></image>
								</view>
							</view>
							<view class="request" v-if="typeIndex == 1 && reasonIndex == 2">
								<view>申请退款总金额</view>
								<view class="ipt">
									<input type="digit" placeholder="输入金额" placeholder-class="placeholder" v-model="saleAmonut" @blur="InputBlur" @input="InputIpt"/>
								</view>
								<view>最多¥{{orderInfo.totalPrice}}</view>
							</view>
							<view>退款总金额： <span> {{typeIndex == 1 && reasonIndex == 2 ? (saleAmonut == '' ? '--' : '¥' + saleAmonut ) : `¥${orderInfo.totalPrice}` }}</span></view>
						</view>
						<button class="but" :disabled="isDisabled" @click="onSubmit" :class="{none: isDisabled}">提交申请</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { useGlobalStore } from '../../store/store';
	import { uploadImage } from '../../api/upload';
	import { lookImageLsit } from '../../utils/common';
	import { BuyerOrderDetail,submitAfterSales } from '../../api/common';
	
	 const orderSourceMap = {
	 	'001': 'bargainDetailOrderInfoVO',
	 	'002': 'packageDetailOrderInfoVO',
	 	'003': 'commonDetailOrderInfoVO',
	 	'004': 'purchaseDetailOrderInfoVO',
	 	'006': 'grailPublishDetailOrderInfoVO', //大盘出售
	 	'005': 'grailPurchaseDetailOrderInfoVO', //大盘求购
	 	'007': 'storagePurchaseDetailOrderInfoVO', //寄售求购
	 	'008': 'storagePublishDetailOrderInfoVO', //寄售出售
	 }
	
	const globalstore = useGlobalStore()

	const isDisabled = computed(()=>{
		if(typeIndex.value == 1 && reasonIndex.value == 2 && saleAmonut.value == '') return true
		else return false
	})
	
	const typeList = [
		{
			icon: '/static/mine/huo.png',
			title1: '退货退款',
			title2: '已收到物品',
			list:[{
				id: 11,
				title: '与描述不符'
			},{
				id: 12,
				title: '物品损坏'
			},{
				id: 13,
				title: '不想要了'
			},{
				id: 14,
				title: '与商家协商一致'
			}]
		},
		{
			icon: '/static/mine/kuan.png',
			title1: '仅退款',
			title2: '未收到物品',
			list: [{
				id: 21,
				title: '未发货'
			},{
				id: 22,
				title: '未收到货'
			},{
				id: 23,
				title: '与商家协商一致'
			}]
		}
	]
	
	const typeIndex = ref(0)
	const reasonIndex = ref(-1)
	const imgList = ref([])
	const saleAmonut = ref('')
	const orderInfo = ref({})
	const typeId = ref(1)
	const orderCode = ref('')
	const reasonId = ref(0)
	
	const onSelect = (index) =>{
		typeIndex.value = index
		typeId.value = index == 0 ? 1 : 2 
		reasonIndex.value = -1
		saleAmonut.value = ''
		imgList.value.length = 0
	}
	
	const getOrderDetail = (orderCode) =>{
		BuyerOrderDetail({orderCode}).then(res=>{
			orderInfo.value = res.data[orderSourceMap[res.data.orderSource]]
			console.log(orderInfo.value);
		})
	}
	
	const onReason = (index,id) =>{
		reasonIndex.value = index
		reasonId.value = id
	}
	
	const upImage = () =>{
		let count = 4 - imgList.value.length
		uploadImage({count}).then(res=>{
			res.forEach(item=>{
				imgList.value.push(item.url)
			})
		})
	}
	
	const onDete = (index) =>{
		imgList.value.splice(index,1)
	}
	
	const InputBlur = () =>{
		saleAmonut.value = saleAmonut.value.replace(/^(\d+\.\d{0,2}).*$/, '$1')
	}
	
	const InputIpt = (e) =>{
		if(+e.detail.value > +orderInfo.value.totalPrice) {
			uni.showToast({
				title: `最多${orderInfo.value.totalPrice}元`,
				icon: 'none'
			})
		}
	}
	
	const onSubmit = () =>{
		const isAmount = typeIndex.value == 1 && reasonIndex.value == 2 ? true : false
		if(reasonId.value == -1){
			uni.showToast({
				title: '请选择退货原因',
				icon: 'none'
			})
			return
		}

		uni.showLoading({
			title: '提交中...'
		})
		submitAfterSales({
			afterSaleTypeId: typeId.value,
			afterSaleReasonId: reasonId.value,
			orderCode: orderCode.value,
			submitAfterReasonPictUrls: imgList.value,
			refundAmt: isAmount ? saleAmonut.value : orderInfo.value.totalPrice
		}).then(res=>{
			uni.hideLoading()
			uni.showToast({
				title: '提交成功!',
			})
			uni.redirectTo({
				url: '/pages/saleDetail/saleDetail?orderCode=' + orderCode.value
			})
		})
	}
	
	onLoad((options)=>{
		orderCode.value = options.orderCode
		getOrderDetail(options.orderCode)
	})
	
</script>

<style scoped lang="scss">
	.saleApply{
		background-color: #fdfdfd;
		button::after{
			display: none;
		}
		.content{
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			gap: 40rpx;
			height: calc(100vh - 232rpx);
			
			.salecon{
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.08);
				border-radius: 16rpx;
				padding: 50rpx 28rpx;
				box-sizing: border-box;
				>view:first-child{
					font-weight: 600;
					font-size: 36rpx;
					color: #2C2E3A;
				}
				
				.shop{
					margin-top: 32rpx;
					display: flex;
					flex-direction: column;
					gap: 16rpx;
					padding: 24rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					border-radius: 16rpx;
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
							background-color: #fff;
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
				
				.selectype{
					display: flex;
					flex-direction: column;
					gap: 24rpx;
					margin-top: 46rpx;
					>view:first-child{
						font-weight: 600;
						font-size: 30rpx;
						color: #2C2E3A;
						line-height: 30rpx;
					}
					.typelist{
						display: flex;
						align-items: center;
						gap: 64rpx;
						.item{
							padding: 42rpx 44rpx;
							box-sizing: border-box;
							width: 714rpx;
							background: #FDFDFD;
							border-radius: 12rpx;
							border: 2rpx solid #E8E8E9;
							display: flex;
							align-items: center;
							gap: 24rpx;
							cursor: pointer;
							>image{
								width: 60rpx;
								height: 60rpx;
							}
							>view{
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								gap: 16rpx;
								>view:first-child{
									font-weight: 600;
									font-size: 32rpx;
									color: #2C2E3A;
								}
								>view:last-child{
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
								}
							}
						}
						.active{
							border: 2rpx solid #FFC400;
							background: rgba(255,196,0,0.05);
						}
					}
					.reason{
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						gap: 32rpx;
						margin-top: 16rpx;
						>view:first-child{
							font-weight: 600;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
						}
						.reasonList{
							display: flex;
							flex-direction: column;
							gap: 40rpx;
							.item{
								display: flex;
								align-items: center;
								gap: 8rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: #2C2E3A;
								line-height: 28rpx;
								cursor: pointer;
								>image{
									width: 28rpx;
									height: 28rpx;
								}
							}
						}
						
						.upimage{
							display: flex;
							flex-direction: column;
							gap: 24rpx;
							>view:first-child{
								font-weight: 600;
								line-height: 28rpx;
								>span{
									color: #ABABAB;
									font-weight: 400;
								}
							}
							.add{
								display: flex;
								align-items: center;
								gap: 24rpx;
								>image{
									width: 134rpx;
									height: 134rpx;
									cursor: pointer;
								}
								.imglist{
									width: 134rpx;
									height: 134rpx;
									border-radius: 12rpx;
									position: relative;
									>image{
										background-color: #F8F8F8;
										width: 134rpx;
										height: 134rpx;
									}
									.delete{
										position: absolute;
										top: -15rpx;
										right: -15rpx;
										width: 32rpx;
										height: 32rpx;
										cursor: pointer;
									}
								}
							}
							.request{
								display: flex;
								align-items: center;
								gap: 20rpx;
								font-weight: 600;
								font-size: 30rpx;
								color: #2C2E3A;
								line-height: 30rpx;
								.ipt{
									padding: 20rpx;
									box-sizing: border-box;
									background: #FFFFFF;
									border-radius: 16rpx;
									border: 2rpx solid #D8D8D8;
								}
								>view:last-child{
									font-weight: 400;
									font-size: 28rpx;
									color: #FF5500;
								}
							}
							
							>view:last-child{
								display: flex;
								align-items: center;
								font-weight: 600;
								font-size: 30rpx;
								color: #2C2E3A;
								line-height: 30rpx;
								margin-top: 16rpx;
								>span{
									font-weight: 600;
									font-size: 34rpx;
									color: #FF5500;
									line-height: 24rpx;
								}
							}
						}
						.but{
							font-weight: 600;
							font-size: 28rpx;
							color: #FFFFFF;
							line-height: 32rpx;
							padding: 28rpx 180rpx;
							background: #FFC400;
							border-radius: 90rpx;
							margin:  36rpx 0 0;
						}
						
						.none{
							opacity: 0.3;
						}
					}
				}
			}
		}
	}
</style>