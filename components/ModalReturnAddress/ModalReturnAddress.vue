<template>
	<view class="ModalReturnAddress" @click="emit('close')">
		<view class="container" @click.stop>
			<view>同意退货退款</view>
			<image class="close" src="/static/close.png" mode="aspectFit" @click="emit('close')"></image>
			<view style="flex: 1;overflow-y: scroll;scrollbar-width: none;">
				<view class="addressList">
					<view class="item" v-for="(item,index) in loactionList" :key="item.id" @click="onClick(item)" :class="{active: loactionId == item.id}">
						<view>
							<uni-icons type="location" color="#2a2c3e" size="20"></uni-icons>
							<view>{{item.province}} {{item.city}} {{item.district}}</view>
						</view>
						<view>
							{{item.receiverName}} {{item.receiverPhone}}
						</view>
					</view>
				</view>
				<view class="addressDetails">
					<view>买家退货，请填写您的收货地址</view>
					<view class="detailsList">
						<view class="items">
							<view>收货姓名</view>
							<view class="ipt">
								<input type="text" placeholder="请输入收货姓名" placeholder-class="placeholder" v-model="name">
							</view>
						</view>
						<view class="items">
							<view>手机号</view>
							<view class="ipt">
								<input type="text" placeholder="请输入手机号" placeholder-class="placeholder" v-model="phone">
							</view>
						</view>
						<view class="items">
							<view>所在地区</view>
							<view class="ipt">
								<input disabled type="text" placeholder="选择地区" placeholder-class="placeholder" v-model="addressdata.location"/>
								<uni-icons type="right" class="right" color="#ABABAB" :class="{rotate : is_loaction}"></uni-icons>
								<view class="invit" @click="is_loaction = !is_loaction"></view>
								<region-selection v-if="is_loaction" style="width: 100%;top: 100%;left: 0;box-sizing: border-box;" @region="onAddres"></region-selection>
							</view>
						</view>
						<view class="items" style="flex-direction: column;align-items: flex-start;gap: 10rpx;">
							<view>详细地址</view>
							<view class="ipt">
								<textarea type="text" placeholder="输入详细地址" placeholder-class="placeholder" v-model="address"/>
							</view>
						</view>
					</view>
				</view>
				<view class="but">
					<button @click="onSubmit">确定发送</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import regionSelection from '../regionSelection/regionSelection.vue';
	import { addressList } from '../../api/common';
	
 const emit = defineEmits(['click','close'])

	const is_loaction = ref(false)
	const name = ref('')
	const phone = ref('')
	const address = ref('')
	const addressdata = ref({
		location: '',
		value: []
	})
	const loactionList = ref([])
	const loactionId = ref('') 
	
	const onAddres = (e) =>{
		address.value = ''
		const add = []
		const val = []
		e.forEach(item=>{
			add.push(item.name)
			val.push(item.val)
		})
		addressdata.value.location = add.join(' ')
		addressdata.value.value = val
		if(add.length === 3) is_loaction.value = false
	}
	
	const onClick = (item) =>{
		loactionId.value = item.id
		getDetails(item)
	}
	
	const getDetails = (event) =>{
		name.value = event.receiverName
		phone.value = event.receiverPhone
		address.value = event.detailAddress
		addressdata.value.location = event.province + ' ' + event.city + ' ' + event.district
	}
	
	onMounted(()=>{
		addressList().then(res=>{
			loactionList.value = res.data
			let data = res.data.find(item => item.isDefault)
			loactionId.value = data.id
			getDetails(data)
		})
	})
	
	const onSubmit = () =>{
		let data = {
			name: name.value,
			phone: phone.value,
			address: address.value,
			loaction: addressdata.value.location
		}
		emit('click',data)
	}
</script>

<style scoped lang="scss">
	.ModalReturnAddress {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		z-index: 999;

		.container {
			padding: 20rpx 28rpx 40rpx;
			box-sizing: border-box;
			background-color: #fff;
			width: 800rpx;
			max-height: 1200rpx;
			border-radius: 12rpx;
			position: relative;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			>view:first-child {
				display: flex;
				justify-content: center;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
				line-height: 32rpx;
			}

			.close {
				position: absolute;
				top: 20rpx;
				right: 28rpx;
				width: 32rpx;
				height: 32rpx;
				cursor: pointer;
			}

			.addressList {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				margin: 30rpx 0;

				.item {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					padding: 20rpx;
					box-sizing: border-box;
					border-radius: 12rpx;
					border: 1rpx solid #f0f0f0;
					background-color: #fff;
					cursor: pointer;
					>view:first-child {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						line-height: 28rpx;
					}

					>view:last-child {
						font-size: 26rpx;
						color: #ababab;
					}
				}
				.active {
					border: 1rpx solid #ffc400;
					background-color: #f8f8f8;
				}
			}

			.addressDetails {
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				>view:first-child {
					font-weight: 600;
					font-size: 32rpx;
					color: #656565;
					line-height: 32rpx;
				}

				.detailsList {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;

					.items {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20rpx 0;
						box-sizing: border-box;
						border-bottom: 1rpx solid #f0f0f0;
						position: relative;
						>view:first-child {
							
							padding-left: 20rpx;
						}

						>view:first-child::after {
							content: '*';
							color: #ff6600;
							position: absolute;
							left: 0;
						}

						.ipt {
							display: flex;
							align-items: center;
							
							.invit {
								position: absolute;
								inset: 0;
								background-color: transparent;
								cursor: pointer;
							}

							.right {
								margin-left: 12rpx;
								transition: all .5s ease;
								cursor: pointer;
							}

							.rotate {
								transform: rotate(90deg);
							}

							>input {
								font-size: 28rpx;
								color: #2C2E3A;
								line-height: 28rpx;
								text-align: right;
								width: 540rpx;
							}
							
							>textarea{
								height: 160rpx;
								padding: 10rpx 20rpx;
								box-sizing: border-box;
								font-size: 28rpx;
								color: #2C2E3A;
								line-height: 28rpx;
							}
							.placeholder{
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}
						}
					}
				}
			}
			
			.but{
				margin: 100rpx 0 50rpx;
				>button{
					background: #FFC400;
					border-radius: 80rpx;
					border: 2rpx solid #FFC400;
					color: #FFFFFF;
					font-weight: 500;
					letter-spacing: 4rpx;
				}
				>button::after{
					display: none;
				}
			}
		}
	}
</style>