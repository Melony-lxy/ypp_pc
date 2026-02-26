<template>
	<view class="PopupInstruct" v-if="show">
		<view class="instruct" @click.stop>
			<image :src="globalstore.upImageuler('/static/Instruction.png')" mode="widthFix" style="width: 100%;"></image>
			<view class="content">
				 <view @click="sure">好的</view>
				 <view class="readio">
					 <radio style="transform: scale(0.6);cursor: pointer;" borderColor="#2C2E3A" activeBorderColor='#FFC400'
							activeBackgroundColor="#FFC400" :checked="is_radio" @click="onRadio"></radio>
					 <text style="font-size: 13px;color: #353741;white-space: nowrap;" >下次打开不再提醒</text>
				 </view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {onReady,onLoad} from '@dcloudio/uni-app'
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()

	const show = ref(true)
	const is_radio = ref(false)
	
	const sure = () =>{
		show.value = false
	}
	
	const onRadio = () =>{
		is_radio.value = !is_radio.value
		if(is_radio.value){
			uni.setStorageSync('isShow','0')
		}else{
			uni.setStorageSync('isShow','1')
		}
	}
	
	onLoad(()=>{
		const _isShow = uni.getStorageSync('isShow')
		if(_isShow){
			show.value = _isShow == '0' ? false : true 
		}
	})
	
</script>

<style scoped lang="scss">
	.PopupInstruct{
		background: rgba(44,46,58,0.7);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		.instruct{
			width: 1860rpx;
			position: relative;
			@media (max-width: 960px) {
				width: 930rpx;
			}
			image{
				width: 100%;
			}
			.content{
				position: absolute;
				bottom: 610rpx;
				left: 610rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 524rpx;
				gap: 28rpx;
				@media (max-width: 960px) {
					bottom: 232rpx;
					left: 224rpx;
					width: 260rpx;
					gap: 4rpx;
				}
				>view:first-child{
					width: 100%;
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					background: #FFC400;
					color: #fff;
					border-radius: 50rpx;
					padding: 22rpx 0 20rpx 0;
					cursor: pointer;
					@media (max-width: 960px) {
						padding: 2rpx 0;
					}
				}
			}
		}
	}
</style>