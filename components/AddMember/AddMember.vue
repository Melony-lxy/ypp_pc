<template>
	<view class="add-member" v-if="show" @click="close">
		<view style="position: relative;" @click.stop>
			<view class="view-popup-member">
				<view class="view-text-1">
					共创会员<br />
					是艺品品为用户打造的专属权益计划
				</view>
				<view class="view-text-2">
					助您轻松获取专属奖励！
				</view>

				<view class="view-scroll-box">
					<view class="view-text-3">
						3步完成邀请服务
					</view>
					<view class="view-123">
						<image class="image-xu-123" src="/static/mine/xuan.png"></image>
						<view class="view-text-4" style="top: 8rpx;">申请成为共创会员</view>
						<view class="view-text-4" style="top: 76rpx;">分享为您生成唯一的邀请码和二维码</view>
						<view class="view-text-4" style="top: 144rpx;">邀请他人加入艺品品APP</view>
					</view>
					<view class="view-text-3">
						绑定收益
					</view>

					<view class="view-text-5">每位通过您的邀请码或二维码注册的用户都会与您绑定，您将立即获得100点积分作为奖励，相当于10元！积分可用于购买APP内所有增值服务，包括但不限于充值会员、交易帖置顶等。</view>
					<view class="view-text-5">此外，当您邀请的用户充值会员时，您将获得20%的充值金额作为现金奖励！</view>
					<view class="view-text-5">绑定收益永久有效，持续为您创造价值！</view>

					<view class="view-hgsm">
						<view class="view-tou">合规声明</view>
						<view class="view-duan">本计划严格遵循单层级设计，所有权益仅与直接邀请行为绑定，不存在多级关联或衍生收益。</view>
						<view class="view-duan"> *所有权解释权归平台所有</view>
					</view>
					<view class="view-text-jrwm">
						共创会员，共创辉煌！<br />
						加入我们，轻松开启收益之旅！
					</view>


				</view>
				<view class="view-foot">
					<view class="view-button" @click="suer">{{ifMember ? '立即邀请' : '立即加入'}}</view>
				</view>
			</view>
			<image class="image-close" src="/static/mine/guanbi_white.png" @click="close"></image>
		</view>
	</view>


</template>

<script setup>
		
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		}
	})
	
	const emit = defineEmits(['close'])
	const ifMember = uni.getStorageSync('userInfo').ifMember
	
	const suer = () =>{
		if(ifMember){
			console.log('邀请');
		}else{
			console.log('加入')
		}
		emit('close')
	}
	
	const close = () =>{
		emit('close')
	}
	
</script>

<style lang="scss" scoped>
	.add-member{
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(44,46,58,0.7);
		z-index: 999;
		.view-popup-member {
			width: 800rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			background-image: url('/static/mine/up_background.png');
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position: top;
		
			font-family: PingFangSC, PingFang SC;
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			overflow: hidden;
		
			.view-text-1 {
				font-weight: 400;
				font-size: 28rpx;
				color: #C46200;
				line-height: 40rpx;
				margin-top: 36rpx;
			}
		
			.view-text-2 {
				font-weight: 600;
				font-size: 34rpx;
				color: #FFC400;
				line-height: 34rpx;
				margin-top: 14rpx;
			}
		
			.view-scroll-box {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow-y: scroll;
				overflow-x: hidden;
		
		
				.view-text-3 {
					flex-grow: 0;
					flex-shrink: 0;
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
					margin-top: 24rpx;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
		
		
					&::before {
						content: '';
						width: 82rpx;
						height: 4rpx;
						margin-right: 12rpx;
						background: url('/static/mine/bd_left.png') no-repeat center/cover;
					}
		
					&::after {
						content: '';
						width: 82rpx;
						height: 4rpx;
						margin-left: 12rpx;
						background: url('/static/mine/bd_right.png') no-repeat center/cover;
					}
				}
		
				.view-123 {
					flex-grow: 0;
					flex-shrink: 0;
					width: 564rpx;
					height: 174rpx;
					padding-left: 54rpx;
					position: relative;
		
					.view-text-4 {
						font-weight: 400;
						font-size: 26rpx;
						color: #2C2E3A;
						line-height: 26rpx;
						position: absolute;
					}
		
					.image-xu-123 {
						width: 38rpx;
						height: 176rpx;
						position: absolute;
						left: 0;
						top: 0;
					}
				}
		
				.view-text-5 {
					flex-grow: 0;
					flex-shrink: 0;
					width: 550rpx;
					font-weight: 400;
					font-size: 24rpx;
					color: #2C2E3A;
					line-height: 38rpx;
					margin-left: 14rpx;
					position: relative;
		
					&::before {
						content: '';
						width: 8rpx;
						height: 8rpx;
						border-radius: 100%;
						background: #17171A;
						position: absolute;
						left: -10rpx;
						top: 15rpx;
					}
				}
		
				.view-hgsm {
					width: 564rpx;
					height: 170rpx;
					padding: 16rpx 14rpx;
					margin-top: 16rpx;
					background: #F8F8F8;
					flex-grow: 0;
					flex-shrink: 0;
		
		
					font-size: 22rpx;
					color: #ABABAB;
					line-height: 34rpx;
		
					.view-tou {
						font-weight: 600;
					}
		
					.view-duan {
						font-weight: 400;
					}
				}
		
				.view-text-jrwm {
					flex-grow: 0;
					flex-shrink: 0;
					font-weight: 600;
					font-size: 28rpx;
					color: #FFC400;
					line-height: 40rpx;
					width: 550rpx;
					margin-top: 10rpx;
					margin-bottom: 10rpx;
				}
			}
		
			.view-foot {
				height: 120rpx;
				background: #FFFFFF;
				box-shadow: 0rpx -2rpx 0rpx 0rpx #F4F3F3;
				display: flex;
				align-items: center;
				justify-content: center;
		
				.view-button {
					width: 440rpx;
					height: 84rpx;
					background: #FFC400;
					border-radius: 50rpx;
					font-weight: 600;
					font-size: 30rpx;
					color: #FFFFFF;
					line-height: 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
			}
		}
		.image-close {
			width: 56rpx;
			height: 56rpx;
			position: absolute;
			bottom: -80rpx;
			left: 50%;
			transform: translateX(-50%);
			cursor: pointer;
		}
	}
	

	
</style>