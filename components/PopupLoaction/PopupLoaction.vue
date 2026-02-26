<template>
	<view class="PopupLoaction" @click.stop>
		<view>
			<view>请选择</view>
			<uni-icons type="closeempty" color="#ABABAB" size="20" @click="emits('change')"></uni-icons>
		</view>
		<view class="loaction-list">
			<view v-for="item in list" @click="onClick(item)" :class="{active: item.id === loaction.id}">
				<view>
					{{item.loaction}}
				</view>
				<view class="default" v-if="item.isDefault">默认</view>
				<view>
					{{item.receiverName}} {{item.receiverPhone}}
				</view>
			</view>
		</view>
		<button @click="onAdd">新增/编辑地址</button>
		
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

	
	const props = defineProps(['list','loaction'])
	const emits = defineEmits(['change','update:loaction'])
	
	const loactionId = ref(0)
	
	const onClick = (item) =>{
		emits('update:loaction',item)
		emits('change')
	}

	const onAdd = () =>{
		uni.navigateTo({
			url: '/pages/mine/mine?type=address'
		})
	}
	
</script>

<style scoped lang="scss">
	.PopupLoaction{
		width: 100%;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 2;
		background-color: #FFFFFF;
		box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.2);
		border-radius: inherit;
		border: 2rpx solid #FFC400;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #2C2E3A;
		line-height: normal;
		>view:first-child{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		>button{
			padding: 24rpx;
			box-sizing: border-box;
			font-weight: 400;
			font-size: 26rpx;
			width: 100%;
			line-height: 26rpx;
			border-radius: 50rpx;
			color: #FFFFFF;
			background-color: #FFC400;
			&::after{
				display: none;
			}
		}
		
		.loaction-list{
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			max-height: 340rpx;
			overflow-y: auto;
			>view{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 14rpx;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: #FFF;
				border: 2rpx solid #EFEFEF;
				border-radius: 12rpx;
				font-size: 26rpx;
				line-height: 26rpx;
				position: relative;
				>view:first-child{
					display: flex;
					line-height: 28rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				>view:last-child{
					color: #ABABAB;
				}
				.default{
					position: absolute;
					bottom: 0;
					right: 0;
					background-color: #FFC400;
					padding: 6rpx 10rpx;
					font-size: 24rpx;
					line-height: 24rpx;
					color: #FFF;
					border-radius: 12rpx 0 12rpx 0;
				}
			}
			.active{
				border: 2rpx solid #FFC400;
			}
		}
	}
</style>