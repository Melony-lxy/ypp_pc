<template>
	<view class="HotTransaction">
		<view class="taps">
			<view v-for="item in taps" :class="{active: tapsId == item.id}" @click="onTap(item.id)">
				<view>{{item.title}}</view>
				<view class="line"></view>
			</view>
		</view>
		<view class="table">
			<view class="table-title">
				<view class="width1">标签</view>
				<view class="width2"></view>
				<view class="width3">最新成交价(元)</view>
				<view class="width4">
					<view>涨跌幅</view>
				</view>
			</view>
			<view class="table-scroll" v-if="tempList.length !== 0">
				<view class="item" :class="{active: tempId === item.grailCategoryId}" v-for="item in tempList" @click="onpage(item)" :key="item.grailCategoryId">
					<view class="width1 label">{{item.tagName}}</view>
					<view class="width2 chart">
						<qiun-data-charts type="line" :opts="item.opts" :chartData="item.chartData" />
					</view>
					<view class="width3 price" :style="{ color: item.trendColor }">{{item.dayK.f0}}</view>
					<view class="width4">
						<view class="amplifcation" :style="{ backgroundColor: item.trendColor }">{{item.dayK.f5}}%</view>
					</view>
				</view>
				<noMore />
			</view>
			<noData v-else />
		</view>
	</view>
</template>

<script setup>
	import { ref, watch } from 'vue';
	import noMore from '../noMore/noMore.vue';
	import noData from '../noData/noData.vue';
	import { bankClosedDay } from '../../api/common';
	
	const props = defineProps({
		bankType:{
			type: Number,
			required: true
		},
		productName:{
			type: String,
			default: '2025年龙年'
		}
	})
	
	const emits = defineEmits(['click'])
	
	const taps = [
		{
			id: 1,
			title: '散钞'
		},
		{
			id: 2,
			title: '标十'
		},
		{
			id: 3,
			title: '标百'
		}
	]
	
	const tapsId = ref(taps[0].id)
	const tempList = ref([])
	const windowWidth = window.innerWidth
	const tempId = ref('')
	
	const onTap = (id) =>{
		tapsId.value = id
		getList(id)
	}
	
	const getList = (id) =>{
		bankClosedDay({
			consecutiveType: id,
			type: props.bankType
		}).then(res=>{
			tempList.value = res.data.map(item => {
			  // 1. 设置趋势颜色和格式化 f5
			  const trendColor = 
			    item.dayK.f5 > 0 ? '#FF5500' : 
			    item.dayK.f5 < 0 ? '#29C96E' : 
			    '#656565';
			  
			  const formattedF5 = item.dayK.f5 > 0 ? `+${item.dayK.f5}` : item.dayK.f5;
			
			  // 2. 提取 dayList 和 priceList
			  const dayList = item.dayKList.map(d => d.date);
			  const priceList = item.dayKList.map(d => Number(d.f9));
			
			  // 3. 返回处理后的对象
			  return {
			    ...item,
			    dayK: {
			      ...item.dayK,
			      f5: formattedF5
			    },
			    trendColor,
			    chartData: {
			      categories: dayList,
			      series: [{
			        name: "",
			        data: priceList
			      }]
			    },
			    opts: {
			      padding: [5, 5, 5, 5],
			      color: [trendColor],
			      dataPointShape: false,
			      dataLabel: false,
			      enableScroll: false,
			      legend: { show: false },
			      xAxis: {
			        disableGrid: true,
			        disabled: true,
			        axisLine: false
			      },
			      yAxis: {
			        disableGrid: true,
			        disabled: true
			      },
			      extra: {
			        tooltip: { showBox: false, splitLine: false },
			        line: { type: 'straight', width: 1 }
			      }
			    }
			  };
			});
			if(windowWidth > 960){
				 tempId.value = tempList.value[0].grailCategoryId
				 emits('click',tempId.value)
			}
		})
	}
	
	const onpage = (item) =>{
		if(windowWidth <= 960){
			uni.navigateTo({
				url:`/pages/secondTrend/secondTrend?grailCategoryId=${item.grailCategoryId}&productName=${props.productName}`
			})
			return
		}
		tempId.value = item.grailCategoryId	
		emits('click',item.grailCategoryId)
	}
	
	watch(()=>props.bankType,(n)=>{
		if(n) getList(tapsId.value)
	},{immediate: true})
	
</script>

<style scoped lang="scss">
	.HotTransaction{
		display: flex;
		flex-direction: column;
		height: 100%;
		.taps{
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			display: flex;
			gap: 60rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #ABABAB;
			line-height: 28rpx;
			>view{
				transition: all .3s ease;
				cursor: pointer;
				.line{
					transition: all .3s ease;
					width: 0;
				}
			}
			.active{
				font-weight: 600;
				font-size: 32rpx;
				color: #2C2E3A;
				line-height: 32rpx;
				position: relative;
				.line{
					position: absolute;
					bottom: -12rpx;
					left: 0;
					width: 78%;
					height: 8rpx;
					background: linear-gradient( 270deg, #FFF8DF 0%, #FFC400 100%);
					border-radius: 4rpx;
				}
			}
		}
		
		.table{
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.width1{
				width: 30%;
				
			}
			
			.width2{
				width: 22%;
				display: flex;
				justify-content: flex-end;
			}
			
			.width3{
				width: 26%;
				display: flex;
				justify-content: center;
			}
			
			.width4{
				width: 22%;
				display: flex;
				justify-content: flex-end;
			}
			.table-title{
				display: flex;
				align-items: center;
				padding: 26rpx 28rpx 24rpx;
				box-sizing: border-box;
				border-radius: 12rpx 12rpx 0rpx 0rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #ABABAB;
				line-height: 24rpx;
				width: 100%;
				background: linear-gradient( 180deg, #FFF6E9 0%, #FFFFFF 100%);
			}
			
			.table-scroll{
				padding: 0 28rpx 30rpx;
				box-sizing: border-box;
				flex: 1;
				overflow-y: scroll;
				scrollbar-width: none;
				.item{
					display: flex;
					align-items: center;
					padding: 30rpx 0 40rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #d8d8d8;
					cursor: pointer;
					.label{
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
						line-height: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.chart{
						display: flex;
						align-items: center;
						flex: 1;
						height: 60rpx;
					}
					.price{
						font-weight: 500;
						font-size: 28rpx;
						color: #FF5500;
						line-height: 28rpx;
					}
					.amplifcation{
						padding: 10rpx 12rpx;
						box-sizing: border-box;
						min-width: 128rpx;
						text-align: center;
						background: #FF5500;
						border-radius: 4rpx;
						font-weight: 500;
						font-size: 24rpx;
						color: #FFFFFF;
						line-height: 24rpx;
					}
				}
				.active{
					background: #FEFBEE;
					box-shadow: 0px 2px 12px 0px rgba(47,83,109,0.08);
					border-radius: 16rpx;
					border: 2rpx solid #FFC400;
					box-sizing: border-box;
					margin-left: -28rpx;
					padding-left: 28rpx;
					margin-right: -28rpx;
					padding-right: 28rpx;
				}
			}
		}
	}
</style>