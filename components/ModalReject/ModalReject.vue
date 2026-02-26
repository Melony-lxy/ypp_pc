<template>
	<view class="ModalReject" @click="emit('close')">
		<view class="container" @click.stop>
			<view>{{typeOrder}}</view>
			<image class="close" src="/static/close.png" mode="aspectFit" @click="emit('close')"></image>
			<view class="reason">
				<view>添加{{typeOrder}}原因</view>
				<textarea :placeholder="`请输入${typeOrder}的原因`" v-model="respon"></textarea>
			</view>
			<view class="upImage">
				<view>上传照片</view>
				<view class="imglist">
					<image v-if="imgList.length !== 4" src="/static/mine/upload-img-icon.png" mode="aspectFit" @click="upImage"></image>
					<view class="img" v-for="(item,index) in imgList" :key="index">
						<image :src="item" mode="aspectFit" @click="lookImageLsit(item,index)"></image>
						<uni-icons class="icons" type="close" color="#ababab" size="20" @click="onDelete(index)"></uni-icons>
					</view>
					
				</view>
			</view>
			<view class="but">
				<button @click="onSubmit">确定发送</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { uploadImage } from '../../api/upload';
	import { lookImageLsit } from '../../utils/common';
	
	const emit = defineEmits(['click','close'])
	const props = defineProps({
		typeOrder:{
			type: String,//拒绝||拒收
			required: true
		}
	})
	
	const respon = ref('')
	const imgList = ref([])
	
	const upImage = () =>{
		let count = 4 - imgList.value.length
		uploadImage({count}).then(res=>{
			res.forEach(item=>{
				imgList.value.push(item.url)
			})
		})
	}
	
	const onSubmit = () =>{
		if(respon.value === '') {
			uni.showToast({
				title: `请输入${props.typeOrder}原因`,
				icon: 'none'
			})
			return
		}
		let data = {
			respon: respon.value,
			imgList: imgList.value
		}
		emit('click',data)
	}
	
	const onDelete = (index) =>{
		imgList.value.splice(index, 1)
	}

</script>

<style scoped lang="scss">
	.ModalReject {
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		.container {
			padding: 20rpx 28rpx 40rpx;
			box-sizing: border-box;
			background-color: #fff;
			width: 850rpx;
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
			.reason{
				display: flex;
				flex-direction: column;
				gap:  20rpx;
				margin: 30rpx 0 30rpx;
				>view:first-child{
					font-size: 32rpx;
					font-weight: 500;
				}
				>textarea{
					height: 160rpx;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					line-height: 28rpx;
					font-weight: 400;
					color: #2C2E3A;
					line-height: initial;
					border: 1rpx solid #f0f0f0;
					border-radius: 12rpx;
					width: 100%;
				}
				.placeholder{
					font-weight: 400;
					font-size: 28rpx;
					line-height: 28rpx;
					color: #ABABAB;
				}
			}
			.upImage{
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				>view:first-child{
					font-size: 32rpx;
					font-weight: 500;
				}
				>view:first-child::after{
					content: ' *最多上传4张图片';
					font-size: 28rpx;
					font-weight: 400;
					color: #ABABAB;
				}
				.imglist{
					display: flex;
					align-items: center;
					gap: 20rpx;
					>image{
						width: 180rpx;
						height: 180rpx;
						background-color: #f8f8f8;
						border-radius: 12rpx;
						cursor: pointer;
					}
					.img{
						position: relative;
						width: 180rpx;
						height: 180rpx;
						.icons{
							position: absolute;
							top: -18rpx;
							right: -18rpx;
							cursor: pointer;
						}
						>image{
							width: 180rpx;
							height: 180rpx;
							background-color: #f8f8f8;
							border-radius: 12rpx;
							cursor: pointer;
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