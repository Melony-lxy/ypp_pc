<template>
	<scroll-view class="HotMarket" scroll-y lower-threshold="100" @scrolltolower="scrolltolower" :show-scrollbar="false">
		<view class="market" :class="{active: markIndex === index}" v-for="(item,index) in marketListInfo" @click="onMarket(item,index)"
		:style="{ paddingTop: item.status ? '48rpx': '30rpx'}">
			<view class="row" v-if="item.imageLinks.length <= 1">
				<view class="flex-start">
					<view>{{item.title}}</view>
					<view @click="getTextWidth(item.content)">{{item.content}}</view>
					<view>{{item.timeSpan}} 来源:{{item.source}}</view>
					<view class="spec" v-if="item.brief && item.brief != null">
						<view>¥{{item.brief[0].price}}</view>
						<view>数量:{{item.brief[0].quantity}}</view>
					</view>
				</view>
				<image v-if="item.imageLinks.length != 0" :src="item.imageLinks[0]" mode="aspectFill"></image>
			</view>
			<view class="column" v-else>
				<view>{{item.title}}</view>
				<view @click="getTextWidth(item.content)">{{item.content}}</view>
				<view class="spec" v-if="item.brief && item.brief != null">
					<view>¥{{item.brief[0].price}}</view>
					<view>数量:{{item.brief[0].quantity}}</view>
				</view>
				<view class="imglist">
					<image v-for="(img,index) in item.imageLinks.slice(0,3)" :src="img" mode="aspectFit"></image>
				</view>
				<view>{{item.timeSpan}} 来源:{{item.source}}</view>
			</view>
			<image v-if="item.status" :src="item.status ==='已成交' ? globalstore.upImageuler('/static/images/download/success.png') : globalstore.upImageuler('/static/images/download/che.png') " mode="aspectFit"></image>
		</view>
		<noMore v-if="is_noMore"/>
	</scroll-view>
</template>

<script setup>
	import { ref, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import noMore from '../noMore/noMore.vue';
	import { marketList } from '../../api/common';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	const windonWidth = window.innerWidth
	
	const emits = defineEmits(['click'])
	
	const pageNo = ref(0)
	const totalPages = ref(0)
	const marketListInfo = ref([])
	const is_noMore = ref(false)
	const fontSize = window.innerWidth/750*26 + 'px'
	const markIndex = ref(0)
	
	const getMarketList = (pageNo) =>{
		marketList({
			pageNo,
			pageSize: 10,
			type: 1
		}).then(res=>{
			totalPages.value = res.data.totalPages - 1
			res.data.rows.forEach(item => marketListInfo.value.push(item))
			if(pageNo === 0) emits('click',res.data.rows[0])
		})
	}
	
	const scrolltolower = () =>{
		if(pageNo.value <= totalPages.value){
			pageNo.value++
			getMarketList(pageNo.value)
		}else{
			is_noMore.value = true
		}
	}
	
	function getTextWidth(text){
		const span = document.createElement('span')
		span.style.visibility = 'hidden'
		span.style.whiteSpace = 'nowrap'
		span.style.fontSize = fontSize
		span.textContent = text
		document.body.appendChild(span)
		const width = span.offsetWidth
		document.body.removeChild(span)
	}
	
	const onMarket = (item,index) =>{
		if(windonWidth > 960) {
			markIndex.value = index
			emits('click',item)
		}
	}
	
	onLoad(()=>{
		getMarketList(0)
		
	})
	
</script>

<style scoped lang="scss">
	.HotMarket {
		padding: 26rpx;
		box-sizing: border-box;
		height: 100%;
		background-color: #FFF;
		.market {
			display: flex;
			flex-direction: column;
			padding: 30rpx 24rpx 26rpx 24rpx;
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			border: 2rpx solid rgba(47,83,109,0.08);
			border-radius: 16rpx;
			margin-bottom: 24rpx;
			position: relative;
			cursor: pointer;
			
			>image {
				position: absolute;
				width: 112rpx;
				height: 32rpx;
				top: 0;
				left: 0;
			}

			.row {
				display: flex;
				flex-direction: row;
				// justify-content: space-between;
				width: 100%;
				gap: 20rpx;

				.flex-start {
					display: flex;
					flex-direction: column;
					gap: 18rpx;
					flex: 1;
					overflow: hidden;

					>view:first-child {
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-weight: 500;
						font-size: 28rpx;
						color: #2C2E3A;
						line-height: 28rpx;
					}

					>view:nth-child(2) {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						font-weight: 400;
						font-size: 26rpx;
						color: #656565;
						line-height: 26rpx;
					}

					>view:nth-child(3) {
						font-weight: 400;
						font-size: 22rpx;
						color: #ABABAB;
						line-height: 22rpx;
					}
					
					.spec{
						display: flex;
						align-items: center;
						gap: 12rpx;
						>view{
							padding: 12rpx 14rpx;
							box-sizing: border-box;
							font-weight: 400;
							font-size: 22rpx;
							color: #FF5500;
							line-height: 22rpx;
							background: #FFF5F6;
							border-radius: 8rpx;
						}
					}
				}

				>image {
					width: 180rpx;
					height: 180rpx;
					border-radius: 6rpx;
					background-color: #f8f8f8;
				}
			}

			.column {
				display: flex;
				flex-direction: column;
				width: 100%;
				overflow: hidden;
				gap: 18rpx;

				>view:first-child {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-weight: 500;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;
				}

				>view:nth-child(2) {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-weight: 400;
					font-size: 26rpx;
					color: #656565;
					line-height: 26rpx;
				}
				
				.spec{
					display: flex;
					align-items: center;
					gap: 12rpx;
					>view{
						padding: 12rpx 14rpx;
						box-sizing: border-box;
						font-weight: 400;
						font-size: 22rpx;
						color: #FF5500;
						line-height: 22rpx;
						background: #FFF5F6;
						border-radius: 8rpx;
					}
				}

				>view:last-child {
					font-weight: 400;
					font-size: 22rpx;
					color: #ABABAB;
					line-height: 22rpx;
					margin-bottom: 8rpx;
				}

				.imglist {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					height: 188rpx;
					gap: 10rpx;

					>image {
						width: 100%;
						height: 188rpx;
						background-color: #f8f8f8;
						border-radius: 6rpx;
					}
				}
			}
		}
		
		.active{
			background: #FEFBEE;
			box-shadow: 0px 2px 12px 0px rgba(47,83,109,0.08);
			border-radius: 16rpx;
			border: 2rpx solid #FFC400;
		}
	}
</style>