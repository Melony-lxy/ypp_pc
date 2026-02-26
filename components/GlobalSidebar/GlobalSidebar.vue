<template>
	<view class="GlobalSidebar">
		<view class="item" v-for="(item,index) in list" :key="item.id" @mouseover="onHover(item.id)" @mouseleave="hoverId = '-1'" @click="item.click()">
			<image class="sidebar-icon" :src="hoverId === item.id ? globalstore.upImageuler(item.hover_icon) : globalstore.upImageuler(item.icon)" mode="scaleToFill"></image>
			<view>{{item.title}}</view>
			<view class="app-code" v-if="item.id === '3'">
				<view>
					<image :src="globalstore.upImageuler('/static/download/maskcount.png')" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		onUnmounted,
		ref
	} from 'vue';
	import { onPageScroll } from '@dcloudio/uni-app'
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
	const listMap = [
		{
			id: '0',
			icon: '/static/sidebar/purchase.png',
			hover_icon: '/static/sidebar/purchase_hover.png',
			title: '发求购',
			click(){
			const token = uni.getStorageSync('token')
			if(!token){
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				globalstore.updataShow(true)
				return
			}
			uni.navigateTo({
				url: '/pages/mine/mine?type=purchase'
			})
			}
		},
		{
			id: '1',
			icon: '/static/sidebar/sell.png',
			hover_icon: '/static/sidebar/sell_hover.png',
			title: '发出售',
			click(){
				const token = uni.getStorageSync('token')
				if(!token){
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					globalstore.updataShow(true)
					return
				}
				uni.navigateTo({
					url: '/pages/mine/mine?type=sell'
				})
			}
		},
		{
			id: '2',
			icon: '/static/sidebar/msg.png',
			hover_icon: '/static/sidebar/msg_hover.png',
			title: '消息',
			click(){
				const token = uni.getStorageSync('token')
				uni.showToast({
					title: '尽情期待',
					icon: 'none'
				})
				// if(!token){
				// 	uni.showToast({
				// 		title: '请先登录',
				// 		icon: 'none'
				// 	})
				// 	globalstore.updataShow(true)
				// 	return
				// }
				// uni.reLaunch({
				// 	url: '/pages/message/message'
				// })
			}
		},
		{
			id: '3',
			icon: '/static/sidebar/app.png',
			hover_icon: '/static/sidebar/app_hover.png',
			title: 'APP',
			click(){
				uni.reLaunch({
					url: '/pages/download/download'
				})
			}
		},
		{
			id: '4',
			icon: '/static/sidebar/up.png',
			hover_icon: '/static/sidebar/up_hover.png',
			title: '回顶部',
			click(){
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
			}
		}
	]

	const list = ref(listMap.slice(0,listMap.length - 1))
	const hoverId = ref('-1')
	
	const onHover = (id) => {
		if (hoverId.value === id) return
		hoverId.value = id
	}
	
	onPageScroll((e)=>{
		if(e.scrollTop<=600) list.value = listMap.slice(0,listMap.length - 1)
		else list.value = listMap
	})
	
	
</script>

<style scoped lang="scss">
	.GlobalSidebar {
		position: fixed;
		top: 50%;
		right: 40rpx;
		z-index: 10;
		display: flex;
		flex-direction: column;
		padding: 24rpx 26rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0 2px 12px 0px rgba(47, 83, 109, 0.08);
		border-radius: 68rpx;
		transform: translateY(-50%);
		@media screen and (max-width: 960px) {
			display: none;
		}

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-weight: 500;
			font-size: 24rpx;
			color: #2C2E3A;
			padding: 24rpx 0;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .3s ease;
			position: relative;
			&:not(:first-child) {
				border-top: 2rpx solid #d8d8d8;
			}

			>image {
				width: 60rpx;
				height: 60rpx;
			}
			&:hover{
				.app-code{
					display: flex;
				}
			}
		
			.app-code{
				display: none;
				background-color: transparent;
				width: 264rpx;
				height: 240rpx;
				padding-right: 24rpx;
				box-sizing: border-box;
				position: absolute;
				left: -264rpx;
				top: 0;
				z-index: 100;
				transform: translateY(-60rpx);
				>view{
					width: 100%;
					height: 100%;
					box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.2);
					border-radius: 16rpx;
					border: 2rpx solid #FFC400;
					background-color: #FFFFFF;
					box-sizing: border-box;
					font-weight: 400;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>