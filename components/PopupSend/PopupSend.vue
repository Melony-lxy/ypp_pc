<template>
	<view class="PopupSend" @click="emit('close')">
		<view class="container" @click.stop>
			<view class="nav">
				<view>{{ order.type == 0 ? '发货' : '退货'}}</view>
				<uni-icons type="closeempty" size="26" color="#2C2E3A" style="cursor: pointer;" @click="emit('close')"></uni-icons>
			</view>
			<view class="content">
				<view>收件人信息 <span @click="onCopy(`${address.userName} ${address.userPhone} \n${address.address}`)">复制</span></view>
				<view v-if="address !== null ">
					<view>{{address.userName}} {{address.userPhone}}</view>
					<view>{{address.address}}</view>
				</view>
			</view>
			<view class="from">
				<view class="from-input">
					<view>物流信息</view>
					<view class="ipt">
						<input type="text" placeholder-class="placeholder" placeholder="请输入快递单号" v-model="inputCode"/>
					</view>
				</view>
				<view class="from-image">
					<view>上传照片</view>
					<view class="uplodImage">
						<view cursor @click="upImage" v-if="imgList.length < 5">
							<image src="/static/mine/upload-img-icon.png" mode="aspectFit"></image>
						</view>
						<view v-for="(item,index) in imgList">
							<image :src="item" mode="aspectFit" @click="lookImageLsit(imgList,index)"></image>
							<uni-icons class="close" type="close" size="24" color="#f00" @click="imgList.splice(index,1)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="submit">
				<button @click="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import { uploadImage } from '../../api/upload';
	import { onCopy,lookImageLsit,orderSourceMap } from '../../utils/common';
	import { sellOrderDetail,BuyerOrderDetail } from '../../api/common';
	
	const props = defineProps({
		order:{
			type: Object,
			required: true
		}
	})
	
	const emit = defineEmits(['click','close'])
	
	const inputCode = ref('')
	const imgList = ref([])
	const address = ref(null)
	
	const upImage = () =>{
		let count = 5 -imgList.value.length		
		uploadImage({count}).then(res=>{
			res.forEach(item=>imgList.value.push(item.url))
		})
	}
	
	const submit = () =>{
		if(inputCode.value === ''){
			uni.showToast({
				title: '请输入快递单号',
				icon: 'none'
			})
			return
		}
		let reslove = {tackNumber: inputCode.value,imgList: imgList.value}
		emit('click',reslove)
	}
	
	const getAddress = (orderCode) =>{
		if(props.order.type == 0){
			sellOrderDetail({orderCode}).then(res=>{
				let data = res.data[orderSourceMap[res.data.orderSource]]
				address.value = {
				  address: data.address,
				  userName: data.addressUserName,
				  userPhone: data.addressUserPhone
				};
				console.log(address.value);
			})
		}else{
			BuyerOrderDetail({orderCode}).then(res=>{
				let data = res.data[orderSourceMap[res.data.orderSource]].afterSaleDetailVO
				address.value = {
				  address: data.refundUserAddress,
				  userName: data.refundUserName,
				  userPhone: data.refundUserPhone
				};
				console.log(address.value);
			})
		}
	
	}
	
	onMounted(()=>{
		getAddress(props.order.orderCode)
	})
	
</script>

<style scoped lang="scss">
	$while: #FFF;
	$fontColor: #2C2E3A;
	@mixin whileBox {
		background: $while;
		border-radius: 12rpx;
		padding: 28rpx 20rpx;
		box-sizing: border-box;
		width: 820rpx;
		min-height: 500rpx;
	}
	
	@mixin cou-gap($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}
	
	@mixin space-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	@mixin title {
		font-size: 28rpx;
		font-weight: 600;
		color: #2C2E3A;
	}

	.PopupSend {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		z-index: 999;

		.container {
			@include whileBox;
			@include cou-gap(20rpx);
			.nav{
				@include space-between;
				font-size: 32rpx;
				font-weight: 600;
				color: $fontColor;
			}
			.content{
				@include cou-gap(10rpx);
				>view:first-child{
					font-size: 30rpx;
					font-weight: 600;
					color: $fontColor;
					>span{
						color: #BF7D2B;
						cursor: pointer;
						font-size: 28rpx;
					}
				}
				>view:nth-child(2){
					@include cou-gap(8rpx);
					font-size: 28rpx;
					font-weight: 600;
					color: $fontColor;
					>view:last-child{
						font-weight: 400;
						color: #656565;
					}
				}
			}
			.from{
				@include cou-gap(10px);
				.from-input{
					@include cou-gap(10px);
					>view:first-child{
						@include title;
						&::before{
							content: '*';
							color: red;
						}
					}
					.ipt{
						padding: 16rpx 20rpx;
						box-sizing: border-box;
						border-radius: 6rpx;
						border: 1rpx solid #dfe0e3;
						>input{
							width: 100%;
							font-size: 28rpx;
							font-weight: 400;
						}
					}
				}
				.from-image{
					@include cou-gap(10px);
					>view:first-child{
						@include title;
						&::after{
							content: ' *最多上传五张照片';
							font-size: 26rpx;
							font-weight: 400;
							color: #ababab;
						}
					}
					.uplodImage{
						display: grid;
						grid-template-columns: repeat(4,1fr);
						gap: 20rpx;
						
						>view{
							width: 100%;
							aspect-ratio: 1/1;
							position: relative;
							display: flex;
							align-items: center;
							justify-content: center;
							&[cursor]{
								cursor: pointer;
							}
							.close{
								position: absolute;
								top: -20rpx;
								right: -18rpx;
								cursor: pointer;
							}
							>image{
								width: 100%;
								height: 100%;
								background-color: #f0f0f0;
								border-radius: 12rpx;
							}
						}
					}
				}
			}
			.submit{
				padding: 50px;
				box-sizing: border-box;
				>button::after{
					display: none;
				}
				>button{
					width: 100%;
					padding: 6rpx 0;
					background: #FFC400;
					border-radius: 60rpx;
					font-weight: 600;
					font-size: 36rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
			}
		}
	}
</style>