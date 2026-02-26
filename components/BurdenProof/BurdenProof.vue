<template>
	<view class="BurdenProof">
		<view class="box">
			<uni-icons class="close" type="closeempty" size="20" color="#ccc" @click="emit('close')"></uni-icons>
			<view class="content">
				<view>添加举证描述</view>
				<view class="textare">
					<textarea placeholder="请输入更加详细的举证原因" placeholder-class="placeholder" maxlength="-1" v-model="content"></textarea>
				</view>
			</view>
			<view class="content">
				<view>添加照片/图片</view>
				<view class="img">
					<image @click="onupImage" :src="globalstore.upImageuler('/static/mine/add.png')" mode="aspectFit" v-if="imgList.length != 9"></image>
					<view v-for="(item,index) in imgList">
						<image :src="item" mode="aspectFit" @click="lookImageLsit(imgList,index)"></image>
						<uni-icons class="detail" type="close" size="18" color="red" @click="onDetailImg(index)"></uni-icons>
					</view>
				</view>
			</view>
			<view class="but">
				<button @click="onsubmit()">确定发送</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, vShow } from 'vue';
	import { uploadImage } from '../../api/upload';
	import { useGlobalStore } from '../../store/store';
	import { lookImageLsit } from '../../utils/common';
	
	const emit = defineEmits(['close','suer'])
	
	const globalstore = useGlobalStore()
	const content = ref('')
	const imgList = ref([])
	const count = ref(9)
	
	const onupImage = () =>{
		count.value -= imgList.value.length
		uploadImage({count: count.value}).then(res=>{
			res.forEach(item=>{
				imgList.value.push(item.url)
			})
		})
	}
	
	const onDetailImg = (index) =>{
		imgList.value.splice(index,1)
	}
	
	const onsubmit = () =>{
		if(content.value == ''){
			uni.showToast({
				title: '请输入举证原因',
				icon: 'none'
			})
			return
		}
		// if(imgList.value.length === 0){
			
		// }
		let data = {imgList:imgList.value,content:content.value}
		emit('suer',data)
		emit('close')
	}
	
</script>

<style scoped lang="scss">
	.BurdenProof{
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
	
		.box{
			width: 720rpx;
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			gap: 40rpx;
			position: relative;
			.close{
				position: absolute;
				top: 30rpx;
				right: 20rpx;
				cursor: pointer;
			}
			.content{
				display: flex;
				flex-direction: column;
				gap: 30rpx;
				>view:first-child{
					font-weight: 600;
					font-size: 32rpx;
				}
				.textare{
					border: 1rpx solid #ccc;
					border-radius: 10rpx;
					padding: 20rpx;
					box-sizing: border-box;
					>textarea{
						font-size: 28rpx;
						width: 100%;
						font-weight: 400;
					}
				}
				.img{
					display: grid;
					grid-template-columns: repeat(4,1fr);
					gap: 20rpx;
					>image{
						width: 140rpx;
						height: 140rpx;
						background-color: #f8f8f8;
						border-radius: 10rpx;
						cursor: pointer;
					}
					>view{
						position: relative;
						.detail{
							position: absolute;
							top: -10rpx;
							right: -10rpx;
							cursor: pointer;
						}
					}
					>view>image{
						width: 140rpx;
						height: 140rpx;
						background-color: #f8f8f8;
						border-radius: 10rpx;
						cursor: pointer;
					}
				}
			}
			.but{
				padding: 60rpx;
				>button{
					background-color: #ffc400;
					border-radius: 50rpx;
					color: #fff;
				}
				>button::after{
					display: none;
				}
			}
		}
	}
</style>