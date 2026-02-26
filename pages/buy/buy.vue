<template>
	<view class="buy">
		<GlobalSidebar />
		<ypp-header></ypp-header>
		<view class="buy-content">
			<view class="buy-content-left">
				<view class="title">
					<view>确认收获地址</view>
					<view class="title-item">
						<view @click="onNewAddress">使用新地址</view>
						<view @click="onManagement">管理地址</view>
					</view>
				</view>
				<view class="addList">
					<view class="additem" v-for="(item,index) in addList.slice(0,addLength)" :style="{borderColor: addresIndex == index ? '#FFC400' : '' }" @click="onAddress(index)">
						<view>{{item.province + item.city + item.district + item.detailAddress}}</view>
						<view>{{item.receiverName}} {{item.receiverPhone}}</view>
						<view class="default" v-if="item.isDefault">默认</view>
					</view>
				</view>
				<view class="open" @click="onOpen" v-if="addList.length > 3">
					<view>{{isOpen ? '收起' : '展开' }}全部地址</view>
					<uni-icons style="transition: all .3s ease;" type="right" color="#ABABAB" :class="{roata: isOpen}"></uni-icons>
				</view>
				<view class="product">
					<view class="merchat">
						<image :src="+result.businessType ? globalstore.upImageuler('/static/slices/march.png') : globalstore.upImageuler('/static/slices/my.png')" mode="widthFix"></image>
						<view>{{result.nickName}}</view>
					</view>
					<view class="shop">
						<image :src="commodity.firstItemImageUrl" mode="aspectFit"></image>
						<view class="right">
							<view>{{commodity.productName}}</view>
							<view style="display: flex;align-items: center;gap: 20rpx;">
								<view>总数量: {{commodity.identifyQuantity}}{{ commodity.unit }}</view>
								<view>单价: ¥{{commodity.transactionUnitPrice}}</view>
							</view>
							<view class="price">
								<view><span>¥</span>{{commodity.totalSellingPrice}}</view>
								<view>包邮</view>
							</view>
						</view>
					</view>
					<view class="num">
						<view>{{commodity.descriptionDetails}}</view>
					</view>
					<view class="numLsit" v-if="commodity.itemDTOList">
						<view class="num" v-for="(item,index) in commodity.itemDTOList">
							<view style="font-size: 26rpx;">{{item.horizontalTagName}}</view>
							<view>{{getPublishPackageItemDTOList(item.consecutiveNumType,item.headTailBookNoteNumDetailsList)}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="buy-content-right">
				<view>价格明细</view>
				<view class="total">
					<view class="justify">
						<view>藏品总价:</view>
						<view>¥{{AmountPadi}}</view>
					</view>
					<view class="justify">
						<view>单价:</view>
						<view>¥{{commodity.transactionUnitPrice}}</view>
					</view>
					<view class="justify">
						<view>最小确认数量:</view>
						<view>{{commodity.minimumConfirmationQuantity}}{{commodity.unit}}</view>
					</view>
					<view class="justify">
						<view>个数:</view>
						<view style="display: flex;align-items: center;gap: 20rpx;">
							<public-number :max-count="commodity.identifyQuantity" :min-count="commodity.minimumConfirmationQuantity" @change="changeNumeber"></public-number>
							<view>{{commodity.unit}}</view>
						</view>
					</view>
					<view style="display: flex;flex-direction: column;gap: 16rpx;">
						<view class="justify">
							<view>保证金:</view>
							<view style="color: #FF5500;">¥{{marginDeposit}}</view>
						</view>
						<view style="font-weight: 400;font-size: 26rpx;color: #ABABAB;text-align: justify;">*当前商品交易为保证金交易，将以部分货款<span style="color: #FF5500;">(共{{marginDeposit}}元)</span>做为商品交易的保证金。</view>
					</view>
					<view class="justify">
						<view>油费:</view>
						<view style="color: #FF5500;">{{commodity.delivery == 0 ? '包邮' : `¥${commodity.delivery}` }}</view>
					</view>
					<view class="justify">
						<view>合计:</view>
						<view>¥{{AmountPadi}}</view>
					</view>
					<view class="function">
						<view>支付方式</view>
						<view class="funcList">
							<view class="item" @click="onPay(0)" v-if="ispayFuncton[0]">
								<view>
									<image :src="globalstore.upImageuler(payFunctionList[0].img)" mode="widthFix"></image>
									<view>{{payFunctionList[0].title}}</view>
								</view>
								<image :src="payIndex == 0 ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="widthFix"></image>
							</view>
							<view class="item" @click="onPay(1)" v-if="ispayFuncton[1]">
								<view>
									<image :src="globalstore.upImageuler(payFunctionList[1].img)" mode="widthFix"></image>
									<view>{{payFunctionList[1].title}}</view>
								</view>
								<image :src="payIndex == 1 ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="pay">
					<view>
						<view>实付款</view>
						<view><span>¥</span>{{commodity.currentCargoStatus ? marginDeposit :  AmountPadi}}</view>
					</view>
					<button @click="onsubmit()">提交订单</button>	
				</view>
			</view>
		</view>
		<ModalAddress v-if="isAdd" @close="onClose" @suer="onSuer"></ModalAddress>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import { addressList,details,savePublishOrder,getPayChannelConfig,saveAddress } from '../../api/common';
	import { getPublishPackageItemDTOList } from '../../utils/common';
	import ModalAddress from '../../components/ModalAddress/ModalAddress.vue';
	import { ProhibitScroll,TurnOnScrool } from '../../utils/scroll';
	import publicNumber from '../../components/publicNumber/publicNumber.vue';
	
	const globalstore = useGlobalStore()
	const isOpen = ref(false)
	const payFunctionList = [
		{
			id: '0',
			img: '/static/mine/zhifubao.png',
			title: '支付宝支付',
			type: 'ALIPAY'
		},
		{	
			id: '1',
			img: '/static/mine/wx.png',
			title: '微信支付',
			type: 'WECHAT'
		}
	]
	const payIndex = ref(0)
	const result = ref({})
	const addList = ref([])
	const addresIndex = ref(0)
	const commodity = ref({})
	const ispayFuncton = ref([1,1])
	const isAdd = ref(false)
	const addLength = ref(3)
	const marginDeposit = computed(()=>{
		let margin = commodity.value.tradingMarginRatio * commodity.value.transactionUnitPrice * count.value
		return margin.toFixed(2)
	})
	const AmountPadi = computed(()=>{
		let amount = 0
		if(commodity.value.delivery == 0){
			amount = commodity.value.transactionUnitPrice * count.value
		}else{
			amount = commodity.value.transactionUnitPrice * count.value + commodity.value.delivery
		}
		return amount.toFixed(2)
	})
	const count = ref(0)
	
	const onOpen = () =>{
		isOpen.value = !isOpen.value
		addLength.value = isOpen.value ? addList.value.length : 3
	}
	
	const onPay = (index) =>{
		payIndex.value = index
	}
	
	const onAddress = (index) =>{
		addresIndex.value = index
	}
	
	const onNewAddress = () =>{
		isAdd.value = true
		ProhibitScroll()
	}
	
	const onManagement = () =>{
		uni.navigateTo({
			url: `/pages/mine/mine?type=address`
		})
	}
	
	const onClose = () =>{
		isAdd.value = false
		TurnOnScrool()
	}
	
	const onSuer = (e) =>{
	const newEventAddress = e.location.split(' ')
	saveAddress({
		receiverName: e.name,
		receiverPhone: e.mobile,
		province: newEventAddress[0],
		provinceCode: e.value[0],
		city: newEventAddress[1],
		cityCode: e.value[1],
		district: newEventAddress[2],
		districtCode: e.value[2],
		detailAddress: e.address,
		isDefault: e.isDefault,
		id: e.id
	}).then(res=>{
		getAddressList()
	})
	}
	
	const getAddressList = () =>{
		addressList().then(res=>{
			addList.value = res.data
		})
		getPayChannelConfig().then(res=>{
			ispayFuncton.value[0] = res.data.supportAliPay == 'Y' ? 1 : 0
			ispayFuncton.value[1] = res.data.supportWechat == 'Y' ? 1 : 0
		})
	}
	
	const getDetail = (id) =>{
		details(id).then(res=>{
			commodity.value = res.data
			count.value = res.data.minimumConfirmationQuantity
		})
	}
	
	const onsubmit = () =>{
		savePublishOrder({
			publishId: result.value.id,
			quantity: count.value,
			userAddressId: addList.value[addresIndex.value].id
		}).then(res=>{
				uni.navigateTo({
					url: `/pages/getOrder/getOrder?orderCode=${res.data.orderCode}&payType=${payIndex.value}&type=0&producName=${commodity.value.productName}&shopName=${result.value.nickName}&shopType=${result.value.businessType}`
				})
		})
	}
	
	onLoad((e)=>{
		result.value = e
		getDetail(e.id)	
		getAddressList()
	})
	
	onShow(()=>{
		getAddressList()
	})
	
	const changeNumeber = (e) =>{
		count.value = e.count
	}
	
</script>

<style scoped lang="scss">
	.buy{
		background-color: #fdfdfd;
		.buy-content{
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			gap: 40rpx;
			height: calc(100vh - 232rpx);
			
			>view{
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.08);
				border-radius: 16rpx;
				padding: 28rpx 32rpx;
				box-sizing: border-box;
			}
			
			.buy-content-left{
				width: 71.703%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.title{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-weight: 600;
					font-size: 36rpx;
					color: #2C2E3A;
					width: 100%;
					.title-item{
						display: flex;
						align-items: center;
						gap: 48rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
						>view{
							cursor: pointer;
						}
					}
				}
				
				.addList{
					display: grid;
					grid-template-columns: repeat(3,1fr);
					gap: 40rpx 74rpx;
					margin-top: 28rpx;
					.additem{
						padding: 30rpx 20rpx;
						box-sizing: border-box;
						border-radius: 16rpx;
						border: 2rpx solid #EFEFEF;
						height: 200rpx;
						display: flex;
						flex-direction: column;
						gap: 22rpx;
						justify-content: space-between;
						position: relative;
						cursor: pointer;
						>view:first-child{
							font-weight: 600;
							font-size: 30rpx;
							line-height: 44rpx;							
						}
						>view:nth-child(2){
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
							line-height: 28rpx;
						}
						.default{
							position: absolute;
							bottom: 0;
							right: 0;
							font-weight: 600;
							font-size: 24rpx;
							color: #FFFFFF;
							padding: 8rpx 16rpx;
							box-sizing: border-box;
							background: #FFC400;
							border-radius: 16rpx 0 16rpx 0;
						}
					}
				}
				
				.open{
					display: flex;
					align-items: center;
					gap: 8rpx;
					margin-top: 24rpx;
					font-weight: 600;
					font-size: 26rpx;
					color: #ABABAB;
					line-height: 26rpx;
					cursor: pointer;
					.roata{
						transform: rotate(90deg);
					}
				}
				
				.product{
					margin-top: 60rpx;
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					.merchat{
						display: flex;
						align-items: center;
						gap: 8rpx;
						>image{
							width: 68rpx;
							height: 30rpx;
						}
						>view{
							font-weight: 400;
							font-size: 28rpx;
							color: #656565;
							line-height: 28rpx;
						}
					}
					
					.shop{
						display: flex;
						align-items: center;
						gap: 16rpx;
						margin-top: 4rpx;
						>image{
							width: 156rpx;
							height: 156rpx;
							border-radius: 12rpx;
							background-color: #FFF7DE;
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
					
					.num{
						font-weight: 400;
						font-size: 24rpx;
						color: #ABABAB;
						line-height: 36rpx;
					}
					.numLsit{
						display: flex;
						flex-direction: column;
						gap: 20rpx;
						.num{
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							line-height: 36rpx;
							
						}
					}
				}
				
			}
			
			.buy-content-right{
				width: calc(100% - 71.703% - 40rpx);
				height: 100%;
				min-width: 700rpx;
				>view:first-child{
					font-weight: 600;
					font-size: 36rpx;
					color: #2C2E3A;
				}
				
				.total{
					margin-top: 28rpx;
					display: flex;
					flex-direction: column;
					gap: 36rpx;
					.justify{
						display: flex;
						align-items: center;
						justify-content: space-between;
						>view{
							font-weight: 500;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 28rpx;
						}
						>view:last-child{
							font-weight: 600;
						}
					}
					.function{
						display: flex;
						flex-direction: column;
						gap: 24rpx;
						.funcList{
							padding: 40rpx 20rpx;
							box-sizing: border-box;
							background: #F8F8F8;
							border-radius: 16rpx;
							display: flex;
							flex-direction: column;
							gap: 44rpx;
							.item{
								display: flex;
								align-items: center;
								justify-content: space-between;
								font-weight: 600;
								font-size: 28rpx;
								color: #2C2E3A;
								cursor: pointer;
								>view{
									display: flex;
									align-items: center;
									gap: 16rpx;
									>image{
										width: 40rpx;
										height: 40rpx;
									}
								}
								>image{
									width: 32rpx;
									height: 32rpx;
								}
							}
						}
					}
				}
				
				.pay{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 48rpx;
					width: 100%;
					>view:first-child{
						display: flex;
						flex-direction: column;
						gap: 12rpx;
						>view:first-child{
							font-weight: 500;
							font-size: 28rpx;
							line-height: 28rpx;
							color: #2C2E3A;
						}
						>view:last-child{
							font-weight: 600;
							font-size: 52rpx;
							color: #FF5500;
							line-height: normal;
							>span{
								font-size: 28rpx;
							}
						}
					}
					>button{
						background: #FF5500;
						border-radius: 52rpx;
						font-weight: 600;
						font-size: 30rpx;
						color: #FFFFFF;
						line-height: 30rpx;
						padding: 30rpx 15%;
						box-sizing: border-box;
						margin: 0;
						white-space: nowrap;
					}
					>button::after{
						display: none;
					}
				}
			}
		}
		
	}
</style>
