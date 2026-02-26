<template>
	<view class="PopupOutLogin" v-if="show" @click="close">
		<view class="outlogin" @click.stop>
			<view class="title" v-if="title">{{title}}</view>
			<view class="title" v-else>
				<slot name="title"></slot>
			</view>
			<view class="but">
				<view @click="close">{{closeTitle}}</view>
				<view @click="suer">{{suerTitle}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		suerTitle: {
			type: String,
			default: '确定'
		},
		closeTitle: {
			type: String,
			default: '取消'
		}
	})
	
	const emit = defineEmits(['close','suer'])
	
	const close = () =>{
		emit('close')
	}
	
	const suer = () =>{
		emit('suer')
	}
	
	
</script>

<style scoped lang="scss">
	.PopupOutLogin{
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			inset: 0;
			background: rgba(44, 46, 58, 0.7);
			z-index: 999;
		.outlogin{
			width: 622rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				text-align: center;
				font-size: 30rpx;
				font-weight: 600;
				padding: 66rpx 40rpx;
			}
			.but{
				display: flex;
				align-items: center;
				justify-content: space-between;
				>view{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50%;
					padding: 30rpx 0;
					border-top: 2rpx solid #EAEAEA;
					font-weight: 600;
					cursor: pointer;
				}
				>view:last-child{
					border-left: 2rpx solid #EAEAEA;
					color: #FFC400;
				}
			}
		}
	}
</style>