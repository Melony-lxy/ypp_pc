<template>
	<view class="myasset">
		<view class="taps" v-if="tapList.length != 1">
			<view v-for="(item,index) in tapList" @click="onTap(index)">
				<uni-icons v-if="index != 0" type="right" size="18" color="#ABABAB"></uni-icons>
				<view>{{item}}</view>
			</view>
		</view>
		<view class="wallet" v-if="typeIndex == 0">
			<view class="content">
				<view class="bankItem">
					<view class="itemleft">
						<view class="banktype">结算账户</view>
						<view>账户余额: <span>¥{{bankBalance.accountVOS ? bankBalance.accountVOS[0].balanceAmt : '-' }}</span></view>
					</view>
					<view class="itemright">
						<view @click="checkOutRef.onRecord()">
							<view>记录</view>
							<uni-icons type="down" size="12" color="#ABABAB" style="transition: all .5s ease;" :class="{rotate: checkOutRef.isShow}" ></uni-icons>
						</view>
						<view @click="checkOutRef.onRawal()">提现</view>
					</view>
				</view>
				<view class="record" v-if="checkOutRef.isShow">
					<view class="title">
						<view v-for="(item,index) in cashHistoryRef.list" :class="{active: cashHistoryRef.index == index}" @click="cashHistoryRef.onSelect(index)">
							<view>{{item}}</view>
							<view class="line"></view>
						</view>
					</view>
					<scroll-view class="recordList" v-if="cashHistoryRef.index == 0" scroll-y lower-threshold='100' @scrolltolower='()=>cashHistoryRef.onScroll(0)'>
						<view class="recordItem" v-for="(item,index) in cashHistoryRef.bankRecord[0]" :class="{even: index%2}">
							<view class="left">
								<view class="bankType">
									<image style="width: 140rpx;height: 40rpx;" :src="item.logo" mode="widthFix"></image>
									<view>{{item.cardNo}}</view>
								</view>
								<view class="time">{{item.createTime}}</view>
							</view>
							<view class="right">
								<view class="money">¥{{item.transactionAmt}}</view>
								<view class="type">{{item.transactionStatusDesc}}</view>
							</view>
						</view>
						<view class="end" v-if="cashHistoryRef.bankRecord[0].length === cashHistoryRef.total[0] && cashHistoryRef.total[0] !== 0">
							<image :src="globalstore.upImageuler('/static/mine/no_more.png')" mode="widthFix"></image>
							<view>已经到达宇宙尽头啦~</view>
						</view>
						<view class="nohave" v-if="cashHistoryRef.bankRecord[0].length === 0">
							<image :src="globalstore.upImageuler('/static/mine/no_have.png')" mode="widthFix"></image>
							<view>没有数据哦～</view>
						</view>
					</scroll-view>
					<scroll-view class="recordList" v-if="cashHistoryRef.index == 1" scroll-y lower-threshold='100' @scrolltolower='()=>cashHistoryRef.onScroll(1)'>
						<view class="recordItem" v-for="(item,index) in cashHistoryRef.bankRecord[1]" :class="{even: index%2}">
							<view class="left">
								<view class="bankType">
									<image style="border-radius: 50%;" :src="item.userAvatar" mode="aspectFill"></image>
									<view>{{item.userNickName}}</view>
								</view>
								<view class="time">{{item.createTime}}</view>
							</view>
							<view class="right">
								<view class="addMoney" :style="{color: (item.transactionAmt < 0) ? '#2C2E3A' : '#FF5500' }"><span style="font-size: 40rpx;padding-bottom: 4rpx;">{{item.transactionAmt < 0 ? '-' : '+'}}</span> ¥{{item.transactionAmt}}</view>
								<view class="code" v-if="item.orderCode">订单编号: {{item.orderCode}}</view>
							</view>
						</view>
						<view class="end" v-if="cashHistoryRef.bankRecord[1].length === cashHistoryRef.total[1] && cashHistoryRef.total[1] !== 0">
							<image :src="globalstore.upImageuler('/static/mine/no_more.png')" mode="widthFix"></image>
							<view>已经到达宇宙尽头啦~</view>
						</view>
						<view class="nohave" v-if="cashHistoryRef.bankRecord[1].length === 0">
							<image :src="globalstore.upImageuler('/static/mine/no_have.png')" mode="widthFix"></image>
							<view>没有数据哦～</view>
						</view>
					</scroll-view>
					<scroll-view class="recordList" v-if="cashHistoryRef.index == 2" scroll-y lower-threshold='100' @scrolltolower='()=>cashHistoryRef.onScroll(2)'>
						<view class="recordItem" v-for="(item,index) in cashHistoryRef.bankRecord[2]" :class="{even: index%2}">
							<view class="left">
								<view class="bankType">
									<image style="border-radius: 50%;" :src="item.userAvatar" mode="aspectFill"></image>
									<view>{{item.userNickName}}</view>
								</view>
								<view class="time">{{item.createTime}}</view>
							</view>
							<view class="right">
								<view class="addMoney" :style="{color: item.transactionAmt < 0 ? '#2C2E3A' : '#FF5500' }"><span style="font-size: 40rpx;padding-bottom: 4rpx;">{{item.transactionAmt < 0 ? '-' : '+' }}</span> ¥{{item.transactionAmt}}</view>
								<view class="code" v-if="item.orderCode">订单编号: {{item.orderCode}}</view>
							</view>
						</view>
						<view class="end" v-if="cashHistoryRef.bankRecord[2].length === cashHistoryRef.total[2] && cashHistoryRef.total[2] !== 0">
							<image :src="globalstore.upImageuler('/static/mine/no_more.png')" mode="widthFix"></image>
							<view>已经到达宇宙尽头啦~</view>
						</view>
						<view class="nohave" v-if="cashHistoryRef.bankRecord[2].length === 0">
							<image :src="globalstore.upImageuler('/static/mine/no_have.png')" mode="widthFix"></image>
							<view>没有数据哦～</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="Warehouse" v-if="typeIndex == 1">
			尽情期待
		</view>
		<view class="Consignment" v-if="typeIndex == 2">
			敬请期待
		</view>
		
		<popup-rawal v-if="checkOutRef.isRawal" @close="()=>checkOutRef.onCloseRawal()" :account="bankBalance" :bankList="bankList" @addBank="onAddBank"></popup-rawal>
	</view>
</template>

<script setup>
	import { onMounted, ref, watchEffect } from 'vue';
	import PopupRawal from '../PopupRawal/PopupRawal.vue';
	import { balanceQuery,querySelfBankCard,queryAccountFlow } from '../../api/common';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
	const checkOut ={
		isRawal: false,
		isShow: false,
	}
	
	const cashHistory = {
		list: ['提现记录','交易记录','赔付记录'],
		index: 0,
		transactionType: 2,
		pageNum: [0,0,0],
		bankRecord: [[],[],[]],
		total:[-1,-1,-1]
	}

	const props = defineProps({
		typeIndex: {
			type: Number,
			default: 0
		}
	})
	
	const emit = defineEmits(['close','addBank'])
	const tapList = ref(['我的'])
	watchEffect(()=>{
		if(props.typeIndex == 0) tapList.value.push('我的钱包')
		if(props.typeIndex == 1) tapList.value.push('我的仓库')
		if(props.typeIndex == 2) tapList.value.push('寄售仓库')
			})
			
	const bankBalance = ref({})
	const bankList = ref([])
			
		const onTap = (index) =>{
			if(index == 0) emit('close')
			if(index + 1 != tapList.value.length) {
				tapList.value.splice(index + 1)
			}
		}
		
		const onAccountFlow = (pageNum) =>{
			queryAccountFlow({
				accountId: bankBalance.value.accountVOS[0].accountId,
				pageNum,
				pageSize: 20,
				transactionType: cashHistoryRef.value.transactionType,
				userId: uni.getStorageSync('userInfo').userId
			}).then(res=>{
					if(cashHistoryRef.value.transactionType == 2){
						cashHistoryRef.value.total[0] = res.totalPages
						cashHistoryRef.value.bankRecord[0] = [...cashHistoryRef.value.bankRecord[0],...res.rows]
					}
					if(cashHistoryRef.value.transactionType == 1){
						cashHistoryRef.value.total[1] = res.totalPages
						cashHistoryRef.value.bankRecord[1] = [...cashHistoryRef.value.bankRecord[1],...res.rows]
					}
					if(cashHistoryRef.value.transactionType == 4){
						cashHistoryRef.value.total[2] = res.totalPages
						cashHistoryRef.value.bankRecord[2] = [...cashHistoryRef.value.bankRecord[2],...res.rows]
					}
			})
		}
		
		const checkOutRef = ref({
			...checkOut,
			onRecord(){
				this.isShow = !this.isShow
			},
			onRawal(){
				this.isRawal = true
			},
			onCloseRawal(){
				this.isRawal = false
			}
		})
		
		const cashHistoryRef = ref({
			...cashHistory,
			onSelect(index){
				this.index = index
				if(index === 0) this.transactionType = 2
				if(index === 1) this.transactionType = 1
				if(index === 2) this.transactionType = 4
				if(this.bankRecord[index].length === 0) onAccountFlow()
			},
			onScroll(index){
				this.pageNum[index]++
				if(this.total[index] <= this.bankRecord[index].length) return
				onAccountFlow(this.pageNum[index])
			}
		})
		
		
		
		const getBalance = () =>{
			balanceQuery().then(res=>{
				bankBalance.value = res.data
				onAccountFlow(0)
			})
			querySelfBankCard().then(res=>{
				bankList.value = res.data
			})
		}
		
		onMounted(()=>{
			getBalance()
		})
		
		const onAddBank = () =>{
			emit('addBank')
		}

</script>

<style scoped lang="scss">
	.myasset{
		padding: 50rpx 40rpx;
		box-sizing: border-box;
		
		.taps {
			font-weight: 600;
			font-size: 36rpx;
			color: #2C2E3A;
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			>view {
				display: flex;
				align-items: center;
				cursor: pointer;
			}
		}
		
		.wallet{
			
			.content{
				
				.bankItem {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 40rpx 40rpx 40rpx 24rpx;
					border-radius: 12rpx;
					background: rgba(255,196,0,0.05);
					border: 1px solid #FFC400;
					box-sizing: border-box;
					position: relative;
				
					.itemleft {
						display: flex;
						flex-direction: column;
						font-weight: 500;
						font-size: 34rpx;
						color: #2C2E3A;
						gap: 20rpx;
						.banktype {
							display: flex;
							align-items: flex-end;
							font-weight: 600;
							font-size: 32rpx;
							color: #2C2E3A;	
						}
						>view:last-child {
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
							>span{
								font-weight: 600;
								font-size: 28rpx;
								color: #FF5D0C;
							}
						}
					}
				
					.itemright {
						display: flex;
						align-items: center;
						gap: 40rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
				
						>view {
							padding: 12rpx 60rpx;
							background: #FFFFFF;
							border-radius: 80rpx;
							border: 2rpx solid #D8D8D8;
							cursor: pointer;
						}
						
						>view:first-child{
							display: flex;
							align-items: center;
							gap: 8rpx;
							.rotate {
								transform: rotate(180deg);
							}
						}
				
						>view:last-child {
							font-weight: 500;
							color: #fff;
							background: #FFC400;
							border: 2rpx solid #FFC400;
						}
					}
				}
				
				.record{
					margin-top: 34rpx;
					.title{
						display: flex;
						align-items: center;
						gap: 44rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #656565;
						cursor: pointer;
						
						.active{
							font-weight: 600;
							font-size: 28rpx;
							color: #2C2E3A;
							.line{
								width: 72%;
								height: 8rpx;
								background: linear-gradient( 270deg, #FFFFFF 0%, #FFC400 100%);
								border-radius: 4rpx;
							}
						}
					}
					.recordList{
							max-height: 1486rpx;
						.recordItem{
							padding: 42rpx 20rpx;
							box-sizing: border-box;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.left{
								display: flex;
								flex-direction: column;
								gap: 24rpx;
								.bankType{
									display: flex;
									align-items: center;
									gap: 8rpx;
									>image{
										width: 40rpx;
										height: 40rpx;
									}
									>view{
										font-weight: 500;
										font-size: 28rpx;
										color: #2C2E3A;
										line-height: 28rpx;
									}
								}
								.time{
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
									line-height: 28rpx;
								}
							}
							.right{
								display: flex;
								align-items: flex-end;
								flex-direction: column;
								gap: 28rpx;
								.money{
									font-weight: 600;
									font-size: 32rpx;
									color: #2C2E3A;
									line-height: 32rpx;
								}
								.type{
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
									line-height: 28rpx;
								}
								.addMoney{
									font-weight: 600;
									font-size: 32rpx;
									color: #FF5500;
									line-height: 32rpx;
									display: flex;
									align-items: center;
									gap: 8rpx;

								}
							}
						}
						
						.end{
							color: #222963;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							margin: 40rpx;
							>image{
								width: 300rpx;
								height: 208rpx;
							}
						}
						
						.nohave{
							height: 1486rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							color: #aaa;
							>image{
								width: 300rpx;
								height: 300rpx;
							}
						}
						
						.even{
							background: #F8F8F8;
						}
					}
				}
			}
		}
	}
</style>