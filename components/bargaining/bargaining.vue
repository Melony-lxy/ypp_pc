<template>
	<view class="bargainin">
		<view class="buy" style="box-shadow: 4rpx 0 10rpx 0 #FFF1C3;border-radius: 12rpx;border: 2rpx solid #FFE9A1;">
			<view>我的议价</view>
			<view class="buy-info">
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="buy-item">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/one.png')" mode="scaleToFill"></image>
						</view>
						<view class="price-time">
							<view>¥2888.00</view>
							<view>2024-12-12 10:25</view>
						</view>
					</view>
					
				</view>
				<view v-else>无</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="buy-item">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/two.png')" mode="scaleToFill"></image>
						</view>
						<view class="price-time">
							<view>¥2888.00</view>
							<view>2024-12-12 10:25</view>
						</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="buy-item">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/three.png')" mode="scaleToFill"></image>
						</view>
						<view class="price-time">
							<view>¥2888.00</view>
							<view>2024-12-12 10:25</view>
						</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="buy-item">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/four.png')" mode="scaleToFill"></image>
						</view>
						<view class="price-time">
							<view>¥2888.00</view>
							<view>2024-12-12 10:25</view>
						</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="buy-item">
						<view>
							<image :src="globalstore.upImageuler('/static/Numtra/fiv.png')" mode="scaleToFill"></image>
						</view>
						<view class="price-time">
							<view>¥2888.00</view>
							<view>2024-12-12 10:25</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="buy" style="background: #FFF8E1;">
			<view>买家议价</view>
			<view class="buy-info">
				<view class="dotted-line"></view>
				<view v-if="1">
					<view class="price-sell">
						<view>¥2888.00</view>
						<view>2024-12-12 10:25</view>
					</view>
					
				</view>
				<view v-else>无</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="price-sell">
						<view>¥2888.00</view>
						<view>2024-12-12 10:25</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="price-sell">
						<view>¥2888.00</view>
						<view>2024-12-12 10:25</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="price-sell">
						<view>¥2888.00</view>
						<view>2024-12-12 10:25</view>
					</view>
					
				</view>
				<view v-if="1">
					<view class="dotted-line"></view>
					<view class="price-sell">
						<view>¥2888.00</view>
						<view>2024-12-12 10:25</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useGlobalStore } from '../../store/store';
	const globalstore = useGlobalStore()
	
</script>

<style scoped lang="scss">
	.bargainin{
		display: flex;		
		.buy{
			padding: 24rpx 20rpx;
			width: 50%;
			box-sizing: border-box;
			background: #FFFDF6;
			display: flex;
			flex-direction: column;
			>view:first-child{
				display: flex;
				width: 100%;
				justify-content: center;
				font-weight: 600;
				font-size: 28rpx;
				color: #2C2E3A;
				line-height: 28rpx;
			}

			.buy-info{
				
				.buy-item{
					display: flex;
					align-items: center;
					gap: 16rpx;
					>view:first-child{
						width: 34rpx;
						aspect-ratio: 1/1;
						display: flex;
						align-items: center;
						image{
							width: 29rpx;
							height: 24rpx;
						}
					}
					.price-time{
						display: flex;
						flex-direction: column;
						gap: 12rpx;
						>view:first-child{
							font-weight: 600;
							font-size: 24rpx;
							line-height: 28rpx;
						}
						>view:last-child{
							font-size: 24rpx;
							color: #ABABAB;
							white-space: nowrap;
							line-height: 24rpx;
						}
					}
				}
				
				.price-sell{
					display: flex;
					flex-direction: column;
					gap: 12rpx;
					>view:first-child{
						font-weight: 600;
						font-size: 24rpx;
						color: #BF7D2B;
						line-height: 28rpx;
					}
					>view:last-child{
						font-size: 24rpx;
						color: #ABABAB;
						line-height: 24rpx;
					}
				}
				.dotted-line{
					margin-left: 16rpx;
					width: 100%;
					border-bottom: 2rpx dashed #D8D8D8;
					box-sizing: border-box;
					height: 2rpx;
					margin: 26rpx 0 24rpx 0;
				}
			}
		}
		.sell{
			padding: 24rpx 36rpx 44rpx;
			width: 50%;
			box-sizing: border-box;
		}
	}
</style>