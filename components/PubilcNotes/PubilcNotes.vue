<template>
	<view class="PubilcNotes">
		<!-- 纸币 -->
		<view class="banknote" v-if="type == 0 && labelInfo">
			<view class="banknote-top">
				<view>{{labelInfo.name}}</view>
				<!-- <view class="reference">
					<image :src="globalstore.upImageuler('/static/slices/jia.png')" mode="widthFix"></image>
					<view>参考单价:¥530</view>
				</view> -->
			</view>
			<view class="quantity">
				<view>数量: {{labelInfo.count}}</view>
				<view>单价: <span>¥{{labelInfo.price}}</span></view>
			</view>
			<view class="serial" v-if="labelInfo.content">
				<view class="content">{{labelInfo.content}}</view>
			</view>
		</view>
		
		<!-- <view class="bill" v-if="type == 0">
			<view class="billimg">
				<image :src="info.itemImageUrl || longAndSheImageList[info.productId] || info.pictureDetails?.split(',')?.[0] || longAndSheImageList[info.productName]" mode="aspectFit"></image>
			</view>
			<view class="bill-content">
				<view>{{info.productName}}</view>
				<view>¥{{info.unitPrice}}</view>
				<view>保证金: ¥{{info.marginAmount}}</view>
			</view>
		</view> -->
		<!-- 硬币 -->
		<view v-if="type == 1 && coinList.length != 0" style="border-radius: 12rpx;background-color: #FFF8EE;">
			<view class="coin" v-for="(item,index) in coinList">
				<view class="coin-top">
					<image :src="item.imageUrl" mode="aspectFit"></image>
					<view>{{item.specificationsName}}</view>
				</view>
				<view class="coin-type">
					<view class="type">
						<view>封装类型</view>
						<view>{{MAP_TYPE[item.packageType] || '无封装'}}</view>
					</view>
					<view class="type">
						<view>评级级别</view>
						<view>{{item.packageCompany ? item.packageCompany : '无评级'}}</view>
					</view>
					<view class="type" v-if="item.certificateNo">
						<view>证书编号</view>
						<view>{{item.certificateNo}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import { longAndSheImageList } from '../../utils/common';
	
	const globalstore = useGlobalStore()
	
	const props = defineProps({
		type: {
			type: Number,
			default: 0
		},
		info: {
			type: Object,
			default: () =>({})
		}
	})
	
	const MAP_TYPE = ref({
	  0: '无封装',
	  1: '封装',
	  2: '评级',
	})
	
	const coinList = computed(() => {
	  return Object.keys(props.info).length !== 0
	    ? props.info.goldCoinVOList.flatMap(item => item.specItemList)
	    : []
	})
	
	const labelInfo = computed(()=>{
		try{
			const data = props.info.labelInfos ? JSON.parse(props.info.labelInfos) : [];
			return {
				name: data[0].name,
				price: props.info.unitPrice,
				count: props.info.totalCount,
				content: ''
			}
		}catch(err){
			console.log(err);
		}
	
	})
	
</script>

<style scoped lang="scss">
	.PubilcNotes{
		
		.banknote{
			padding: 26rpx 20rpx 20rpx 20rpx;
			box-sizing: border-box;
			background-color: #FFF8EE;
			border-radius: 12rpx;
			.banknote-top{
				display: flex;
				align-items: center;
				gap: 12rpx;
				>view:first-child{
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
				}
				.reference{
					display: flex;
					align-items: flex-end;
					gap: 4rpx;
					font-weight: 600;
					font-size: 24rpx;
					color: #ABABAB;
					line-height: 24rpx;
					>image{
						width: 33rpx;
						height: 30rpx;
					}
				}
			}
			.quantity{
				display: flex;
				align-items: center;
				gap: 20rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #656565;
				line-height: 28rpx;
				margin: 24rpx 0rpx 20rpx;
				>view>span{
					font-weight: 600;
					font-size: 28rpx;
					color: #FF5500;
				}
			}
			.serial{
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				.content{
					padding: 24rpx 20rpx;
					 box-sizing: border-box;
					 background: #FFFFFF;
					 border-radius: 12rpx;
					 font-weight: 400;
					 font-size: 28rpx;
					 color: #2C2E3A;
					 line-height: 40rpx;
				}
			}
		}
		.bill{
			display: flex;
			gap: 30rpx;
			.billimg{
				width: 200rpx;
				height: 200rpx;
				background-color: #f8f8f8;
				>image{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
			.bill-content{
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				>view:first-child{
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
		
		.coin{
			padding: 26rpx 20rpx 20rpx 20rpx;
			box-sizing: border-box;
			
			
			.coin-top{
				display: flex;
				align-items: center;
				gap: 20rpx;
				>image{
					width: 60rpx;
					height: 60rpx;
				}
			}
			.coin-type{
				display: flex;
				gap: 30rpx;
				margin-top: 20rpx;
				background-color: #fff;
				padding: 20rpx 20rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				.type{
					>view:first-child{
						color: #ABABAB;
					}
					>view:last-child{
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>