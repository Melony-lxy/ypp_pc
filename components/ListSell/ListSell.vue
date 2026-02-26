<template>
	<view class="ListSell">
		<view class="container">
			<view class="item" v-for="(item,index) in sellList" :key="JSON.stringify(item.id)" @click="imageSell(item)">
				<view>
					<image :src="(item.firstItemImageUrl || item.specItemList?.[0]?.imageUrl || longAndSheImageList[item.productCategoryId]) + '?imageMogr2/thumbnail/x300'" webp mode="aspectFit"></image>
				</view>
				<view class="item-info">
					<view class="title">
						<view class="type" v-if="item.isType === 'sell'">
							<view sell v-if="!item.currentCargoStatus">售</view>
							<image v-else src="/static/yushou.png" mode="aspectFit"></image>
						</view>
						<view class="type" v-else>
							<view v-if="!item.currentCargoStatus">求</view>
							<image v-else src="/static/yugou.png" mode="aspectFit"></image>
						</view>
						<view>{{item.productName}}</view>
					</view>
					<view>{{item.descriptionDetails}} </view>
					<view class="price">{{ item.totalSellingPrice || item.transactionUnitPrice  }}<span>/{{ item.unit || '张' }}</span></view>
					<view class="taplist">
						<view  v-for="_tap in item.customTag">{{_tap}}</view>
					</view>
					<view class="user">
						<image :src="item.avatar" mode="aspectFill"></image>
						<view>{{ item.nickName }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { longAndSheImageList } from '../../utils/common'
	
	const props = defineProps({
		sellList:{
			type: Object,
			default: ()=>{}
		}
	})
	
	const imageSell = (item) => {
		let url = item.isType === 'sell' ? `/pages/details/details?id=${item.id}` : `/pages/details/detailsPurchase?id=${item.id}` 
		// #ifdef H5
		window.open(`/#${url}`, '_blank')
		// #endif
	
		// #ifndef H5
		uni.navigateTo({
			url
		})
		// #endif
	}
	
</script>

<style scoped lang="scss">
	.ListSell{
		width: 100%;
		.container{
			display: grid;
			grid-template-columns: repeat(6,1fr);
			gap: 50rpx;
			@media screen and (max-width: 1920px) {
				grid-template-columns: repeat(5,1fr);
			}
			@media screen and (max-width: 1600px) {
				grid-template-columns: repeat(4,1fr);
				gap: 40rpx;
			}
			@media screen and (max-width: 1280px) {
				grid-template-columns: repeat(3,1fr);
				gap: 30rpx;
			}
			@media screen and (max-width: 960px) {
				grid-template-columns: repeat(2,1fr);
				gap: 20rpx;
			}
			
			.item{
				display: flex;
				flex-direction: column;
				width: 100%;
				border-radius: 12rpx;
				padding: 4rpx;
				box-sizing: border-box;
				background-color: #fff;
				box-shadow: 0 4rpx 24rpx 0 rgba(47,83,109,0.08);
				overflow: hidden;
				cursor: pointer;
				>view:first-child{
					width: 100%;
					aspect-ratio: 1/1;
					background-color: #fff;
					border-radius: 12rpx;
					>image{
						width: 100%;
						height: 100%;
						border-radius: 12rpx;
					}
				}
				.item-info{
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 16rpx;
					padding: 28rpx 18rpx;
					box-sizing: border-box;
					.title{
						font-weight: 500;
						font-size: 32rpx;
						color: #2C2E3A;
						line-height: 32rpx;
						display: flex;
						gap: 10rpx;
						align-items: center;
						>view:last-child{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.type{
							>view{
								font-size: 24rpx;
								line-height: 24rpx;
								padding: 4rpx 10rpx;
								color: #fff;
								font-weight: 400;
								background-color: #43a3f3;
								border-radius: 6rpx;
								&[sell]{
									background-color: #FF5500;
								}
							}
							>image{
								width: 60rpx;
								height: 34rpx;
								
							}
						}
					}
					>view:nth-child(2){
						width: 100%;
						height: 28rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #656565;
						line-height: 28rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.total{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-weight: 500;
						font-size: 28rpx;
						color: #ABABAB;
						line-height: 28rpx;
					}
					.price{
						font-weight: 600;
						font-size: 48rpx;
						color: #FF5500;
						&::before{
							content: '¥';
							color: inherit;
							font-size: 30rpx;
							font-weight: inherit;
						}
						>span{
							font-size: 30rpx;
						}
					}
					.taplist{
						display: flex;
						align-items: center;
						font-size: 26rpx;
						line-height: 26rpx;
						color: #d38400;
						gap: 10rpx;
						height: 42rpx;
						overflow: auto;
						>view{
							padding: 8rpx 12rpx;
							box-sizing: border-box;
							background-color: #fff7ef;
							border-radius: 6rpx;
							white-space: nowrap;
						}
					}
					.user{
						display: flex;
						align-items: center;
						gap: 8rpx;
						font-weight: 400;
						font-size: 24rpx;
						color: #ABABAB;
						>image{
							width: 44rpx;
							height: 44rpx;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}

</style>