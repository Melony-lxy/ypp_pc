<template>
	<view class="buy">
		<GlobalSidebar />
		<ypp-header></ypp-header>
		<view class="buy-content" v-if="!count">
			<view class="buy-content-left">
				<view>
					<image :src="+shopType ? globalstore.upImageuler('/static/slices/march.png') : globalstore.upImageuler('/static/slices/my.png') " mode="widthFix"></image>
					<view>{{shopName}}</view>
				</view>
				<view class="title">{{producName}}</view>
				<view class="funcList">
					<view class="item" v-for="(item,index) in payFunctionList" @click="onPay(item)" :style="{borderColor: item.id == payIndex ? '#FFC400' : '#F2F2F2' }">
						<view>
							<image class="selece" :src="payIndex == item.id ? globalstore.upImageuler('/static/purchase/checked-w.png') : globalstore.upImageuler('/static/purchase/nochoose.png')" mode="widthFix"></image>
							<image class="pay" :src="globalstore.upImageuler(item.img)" mode="widthFix"></image>
							<view>{{item.title}}</view>
						</view>
						<view v-if="payIndex == item.id">支付: <span>¥</span><span>{{orderInfo.trans_amt}}</span></view>
					</view>
				</view>
			</view>
			<view class="buy-content-right">
				<view>
					<image style="width: 32rpx;height: 30rpx;" :src="globalstore.upImageuler('/static/mine/code.png')" mode="widthFix"></image>
					<view>使用{{payIndex === '1' ? '微信' : '支付宝' }}APP扫码付款</view>
				</view>
				<view class="code">
					<image :src="imgQrcode" mode="scaleToFill"></image>
				</view>
				<view>扫一扫快速付款</view>
				<button @click="count++">我已支付</button>
			</view>
		</view>
		<view class="success" v-if="count">
			<view class="content">
				<view class="top">
					<view>您已成功付款</view>
				</view>
				<view class="look">
					<view @click="onLook">查看已买到的宝贝</view>
					<view class="lookOrder" @click="lookInfo">
						<view>查看订单详情</view>
						<uni-icons type="right" color="#FFC400"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { useGlobalStore } from '../../store/store';
	import { payScan,accessMarginPaymentPage } from '../../api/pay';
	import { getPayChannelConfig } from '../../api/common';
	import QRcode from 'qrcode-generator'
	
	const globalstore = useGlobalStore()
	const count = ref(0)
	
	const payType = {
		0: 'ALIPAY',
		1: 'WECHAT'
	}
	
	const payFunctionList = ref([
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
	])
	
	const imgQrcode = ref('')
	const payIndex = ref('0')
	const orderCode = ref('')
	const orderInfo =ref({})
	const type = ref('0')
	const producName = ref('')
	const shopName = ref('')
	const shopType = ref('0')
	
	const onPay = (item) =>{
		payIndex.value = item.id
		imgQrcode.value = ''
		if(type.value == '0') getPay(orderCode.value,item.type)
		else if(type.value == '1') getMarginPay(orderCode.value,item.type)
	}
	 
	const getQrcode = (url) =>{
		const reslut = QRcode(0,'M')
		reslut.addData(url)
		reslut.make()
		imgQrcode.value = reslut.createDataURL(4)
	}
	
	const getPay = (orderCode,type) =>{
		payScan({
			orderCode,
			payType: type
		}).then(res=>{
			orderInfo.value = res.data
			getQrcode(res.data.qr_code)
		})
	}
	
	const getMarginPay = (orderCode,type) =>{
		accessMarginPaymentPage({
			orderCode,
			payType: type
		}).then(res=>{
			orderInfo.value = res.data
			getQrcode(res.data.qr_code)
		})
	}
	
	const onLook = () =>{
		uni.reLaunch({
			url: '/pages/mine/mine?type=mybought'
		})
	}
	
	const getPayType = () =>{
		getPayChannelConfig().then(res=>{
			const {supportWechat, supportAliPay} = res.data
			const payList = []
			if(supportAliPay === 'Y'){
				payList.push({
					id: '0',
					img: '/static/mine/zhifubao.png',
					title: '支付宝支付',
					type: 'ALIPAY'
				})
			}
			if(supportWechat === 'Y'){
				payList.push({
					id: '1',
					img: '/static/mine/wx.png',
					title: '微信支付',
					type: 'WECHAT'
				})
			}
			payFunctionList.value = payList
		})
	}
	
	onLoad((e)=>{
		getPayType()
		//支付方式:payType:0:支付宝，1:微信
		//订单编号:orderCode,必传
		//支付模式:type: 0:混合支付,1:保证金支付,必传
		//商品名称:producName,
		//商家名称:shopName,必传
		//商家类型:shopType:0:个人,1:商家,必传
		 if(e.payType) payIndex.value = e.payType
			orderCode.value = e.orderCode
			type.value = e.type || '0'
			producName.value = e.producName == 'undefined' ? '' : e.producName 
			shopName.value = e.shopName
			shopType.value = e.shopType
		if(e.type == '0'){
			getPay(orderCode.value,payType[+payIndex.value])
			return
		}
		if(e.type == '1'){
			getMarginPay(orderCode.value,payType[+payIndex.value])
			return
		}
	})
	
	const lookInfo = () =>{
		// uni.redirectTo({
		// 	url: ''
		// })
		console.log('查看订单详细');
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
				>view:first-child{
					display: flex;
					align-items: center;
					gap: 8rpx;
					>image{
						width: 68rpx;
						height: 30rpx;
					}
				}
				.title{
					font-weight: 500;
					margin: 24rpx 0 32rpx;
				}
				.funcList{
					display: flex;
					flex-direction: column;
					gap: 40rpx;
					.item{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 64rpx 30rpx;
						box-sizing: border-box;
						border-radius: 16rpx;
						border: 2rpx solid #f2f2f2;
						font-weight: 600;
						font-size: 28rpx;
						color: #2C2E3A;
						cursor: pointer;
						>view:first-child{
							display: flex;
							align-items: center;
							gap: 16rpx;
							.selece{
								width: 32rpx;
								height: 32rpx;
							}
							.pay{
								width: 40rpx;
								height: 40rpx;
							}
						}
						>view:last-child{
							font-weight: 500;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 28rpx;
							>span:first-child{
								font-weight: 600;
								font-size: 28rpx;
								color: #FF5500;
							}
							>span:last-child{
								font-weight: 600;
								font-size: 40rpx;
								color: #FF5500;
							}
						}
					}
				}
			}
			
			.buy-content-right{
				width: calc(100% - 71.703% - 40rpx);
				height: 100%;
				display: flex;
				align-items: center;
				padding: 96rpx;
				flex-direction: column;
				gap: 32rpx;
				font-weight: 500;
				>view:first-child{
					display: flex;
					align-items: center;
					gap: 10rpx;
				}
				.code{
					padding: 20rpx;
					box-sizing: border-box;
					width: 360rpx;
					height: 360rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2rpx solid #f2f2f2;
					border-radius: 16rpx;
					>image{
						width: 320rpx;
						height: 320rpx;
					}
				}
				>button{
					background: #FFC400;
					border-radius: 52rpx;
					font-weight: 600;
					font-size: 30rpx;
					color: #FFFFFF;
					line-height: 30rpx;
					padding: 30rpx 120rpx;
					box-sizing: border-box;
					margin: 0;
					white-space: nowrap;
				}
				>button::after{
					display: none;
				}
			}
		}
		
		.success{
			padding: 40rpx 13.5% 60rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			gap: 40rpx;
			height: calc(100vh - 232rpx);
			
			.content{
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.08);
				border-radius: 16rpx;
				padding: 220rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				.top{
					width: 486rpx;
					height: 486rpx;
					background-image: url('/static/mine/suc.png');
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 600;
					font-size: 40rpx;
					color: #FFC400;
					>view{
						transform: translatey(40rpx);
					}
				}
				.look{
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 44rpx;
					transform: translatey(-90rpx);
					>view:first-child{
						background: #FFC400;
						border-radius: 52rpx;
						padding: 30rpx 187rpx;
						box-sizing: border-box;
						font-weight: 500;
						font-size: 40rpx;
						line-height: 44rpx;
						color: #FFFFFF;
						cursor: pointer;
					}
					.lookOrder{
						display: flex;
						align-items: center;
						cursor: pointer;
						font-weight: 600;
						font-size: 32rpx;
						color: #FFC400;
						line-height: 32rpx;
						gap: 8rpx;
					}
				}
			}
		}
		
	}
</style>
