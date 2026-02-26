<template>
	<view class="hotspot">
		<YppHeader />
		<GlobalSidebar />
		<view class="continer">
			<view class="product">
				<view class="product-name">
					<view>
						<view>{{hotInfo.name}}</view>
						<image class="logo" :src="globalstore.upImageuler('/static/index/zhuanqu.png')" mode="heightFix"></image>
						<image class="tagImg" :src="globalstore.upImageuler('/static/hotZone/baiwang.png')" mode="heightFix"></image>
						<view class="text">百万次交易数据</view>
						<image class="tagImg" :src="globalstore.upImageuler('/static/hotZone/hangye.png')" mode="heightFix"></image>
						<view class="text">行业最全</view>
					</view>
					<button>查看价格表</button>
				</view>
				<view class="price">
					<view>{{hotInfo.price}}</view>
					<view>最新市场价</view>
				</view>
				<view class="foundation">
					<view>基础详情</view>
					<view class="foundation-info">
						<view>{{hotInfo.intro}}</view>
						<image :src="globalstore.upImageuler('/static/hotZone/guanfang.png')" mode="aspectFill"></image>
					</view>
				</view>
				<view class="infomation">
					<view>信息展示</view>
					<view class="infomation-info">
						<view class="item" v-for="item in hotInfo.discription">
							<view>{{item.title}}</view>
							<view>{{item.value}}</view>
						</view>
					</view>
				</view>
				<view class="infomation" style="margin-top: 20rpx;">
					<view>参考样图</view>
					<view class="infomation-img">
						<view class="imgItem" v-for="item in hotInfo.displayImages">
							<image :src="item" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="trend">
				<view class="transaction">
					<view class="transaction-title">
						<view v-for="item in transactionList" @click="transaId = item.id">
							<span :class="{active: transaId === item.id}">{{item.title}}</span>
						</view>
					</view>
					<view class="transaction-info">
						<view class="transa-box" v-if="transaId === '0'">
							<hot-transaction :bank-type="Math.abs(hotInfo.sort)" :product-name="hotInfo.name" @click="getHotId"></hot-transaction>
						</view>
						<view class="conditions-box" v-if="transaId === '1'">
							<hot-market @click="onMarket"></hot-market>
						</view>
					</view>
				</view>

				<view class="trend-content">
					<view class="real-time-price" v-if="transaId === '0'">
						<view class="stocks-top">
							<view>{{stockALl.tagName}}</view>
							<view class="release">
								<view>{{stockALl.tagName}}一键发布</view>
								<view class="ploygon">
									<view>发布求购</view>
									<view>发布出售</view>
								</view>
							</view>
						</view>
						<view class="stocks-chart">
							<view class="chart-top">
								<view class="chart-taps">
									<view class="chart-item-price">
										<image :src="stocksNow.f9 >= stocksNow.f1 || stocksNow.f9 >= stocksNow.f2 ? globalstore.upImageuler('/static/images/price/priceTrend/up.png') : globalstore.upImageuler('/static/images/price/priceTrend/down.png') " mode="heightFix"></image>
										<view :style="{color: stocksNow.f9 >= stocksNow.f1 || stocksNow.f9 >= stocksNow.f2 ? '#FF5500' : '#29C96E'}">{{stocksNow.f0}} <span>{{stocksNow.f6 > 0 ? '+' + stocksNow.f6 : stocksNow.f6}} {{stocksNow.f5 > 0 ? '+' + stocksNow.f5 : stocksNow.f5}}%</span></view>
									</view>
									<view class="chart-item-tiem">交易中 {{stocksNow.t1}}</view>
								</view>
		<!-- 						<view class="chart-taps">
									<view class="chart-item">
										<view>最高</view>
										<view>{{stocksNow.f3 || '--'}}</view>
									</view>
									<view class="chart-item">
										<view>最低</view>
										<view>{{stocksNow.f4 || '--'}}</view>
									</view>
								</view>
								<view class="chart-taps">
									<view class="chart-item">
										<view>今开</view>
										<view>{{stocksNow.f1 || '--'}}</view>
									</view>
									<view class="chart-item">
										<view>昨收</view>
										<view>{{stocksNow.f2 || '--'}}</view>
									</view>
								</view>
								<view class="chart-taps">
									<view class="chart-item">
										<view>成交量</view>
										<view>{{stocksNow.f7 || '--'}}{{stockALl.unit}}</view>
									</view>
									<view class="chart-item">
										<view>总库存量</view>
										<view>{{stockALl.allStock || '1000'}}{{stockALl.unit}}</view>
									</view>
								</view> -->
							</view>
							<view class="chart-chart">
								<view class="chart-butList">
									<view>分时</view>
									<view class="active">周K</view>
								</view>
								<view>
									<uc-charts :option="option" style="width: 100%;height: 300px;"></uc-charts>
								</view>
							</view>
						</view>

						<view class="stocks-turnover">
							<view class="details">
								<view>交易详情</view>
								<view class="details-type" v-if="stockALl.purchaseList.length !== 0 || stockALl.sellList.length !== 0 ">
									<view>求购</view>
									<view>出售</view>
								</view>
								<view class="type-line" v-if="stockALl.purchaseList.length !== 0 || stockALl.sellList.length !== 0 ">
									<view :style="{width: stockALl.purchasePct}">
										{{stockALl.purchasePct}} <span></span>
									</view>
									<view :style="{width: stockALl.sellPct}" style="flex: 1;">
										<span></span> {{stockALl.sellPct}}
									</view>
								</view>
								<view class="details-content" v-if="stockALl.purchaseList.length !== 0 || stockALl.sellList.length !== 0 ">
									<view>
										<view class="item" v-for="item in stockALl.purchaseList">
											<view>{{item.price}}<span>/{{item.unit}}</span></view>
											<view>{{item.count}}{{item.unit}}</view>
										</view>
									</view>
									<view>
										<view class="item" v-for="item in stockALl.sellList">
											<view style="color: #FF5500;;">{{item.price}}<span>/{{item.unit}}</span></view>
											<view>{{item.count}}{{item.unit}}</view>
										</view>
									</view>
								</view>
								<no-data v-else></no-data>
							</view>
							<view class="latest">
								<view>最新成交</view>
								<view class="latest-lsit" v-if="latestList.length !== 0">
									<view class="item" v-for="item in latestList" :key="item.buyerUserId">
										<view class="item-left">
											<view>
												<view :style="{'background-color': item.productCategoryType === 'grail_sell' ? '#FF5500' : '#00B0F9' }">{{item.productCategoryType === 'grail_sell' ? '售' : '购' }}</view>
												<view>{{item.f0}}<span>/{{item.unit}}</span></view>
											</view>
											<view>{{item.quantity}}{{item.unit}}</view>
										</view>
										<view>{{item.t0}}</view>
									</view>
								</view>
								<no-data v-else></no-data>
							</view>
						</view>
					</view>

					<view class="condittions-info" v-if="transaId === '1' && Object.keys(marketInfo).length !== 0">
						<view class="title">{{marketInfo.title}}</view>
						<view class="time">{{marketInfo.insertedAt}} 来源: {{marketInfo.source}}</view>
						<view class="description">{{marketInfo.content}}</view>
						<view class="pictureList" v-if="marketInfo.imageLinks && marketInfo.imageLinks.length !== 0">
							<swiper class="swiper" indicator-dots autoplay circular>
								<swiper-item v-for="(item,index) in marketInfo.imageLinks">
									<image :src="item" mode="aspectFit" @click="lookImageLsit(marketInfo.imageLinks,index)"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		hotView,
		closedDPDayDetail,
		dpRecords
	} from '../../api/common'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import HotTransaction from '../../components/HotTransaction/HotTransaction.vue'
	import HotMarket from '../../components/HotMarket/HotMarket.vue'
	import {
		lookImageLsit
	} from '../../utils/common';
	import ucCharts from '../../components/uc-charts/uc-charts.vue'
	import { useGlobalStore } from '../../store/store'
	import noData from '../../components/noData/noData.vue'
	
	const globalstore = useGlobalStore()
	
	const upColor = '#FF5500'
	const downColor = '#29C96E'
	const transactionList = [{
			id: '0',
			title: '实时交易'

		},
		{
			id: '1',
			title: '行业行情'

		}
	]

	const hotInfo = ref({})
	const transaId = ref(transactionList[0].id)
	const marketInfo = ref({})
	const option = ref({})
	const shuJuList = ref([])
	const stocksNow = ref({})
	const stockALl = ref({})
	const latestList = ref([])
	
	const splitData = (rawData) => {
		let categoryData = [];
		let values = [];
		let volumes = [];
		for (let i = 0; i < rawData.length; i++) {
			categoryData.push(rawData[i].splice(0, 1)[0]);
			values.push(rawData[i]);
			let bizhiCode = 0;
			let dayKVo = shuJuList.value[i];
			if (Number(dayKVo.f9) < Number(dayKVo.f1)) {
				bizhiCode = -1;
			} else if (Number(dayKVo.f9) > Number(dayKVo.f1)) {
				bizhiCode = 1;
			} else {
				if (Number(dayKVo.f9) >= Number(dayKVo.f2)) {
					bizhiCode = 1;
				} else {
					bizhiCode = -1;
				}
			}
			volumes.push([i, rawData[i][4], bizhiCode]);
		};
		return {
			categoryData,
			values,
			volumes
		}
	}
	
	const calculateMA = (dayCount, data) => {
		const result = [];
		for (let i = 0, len = data.values.length; i < len; i++) {
			if (i < dayCount) {
				result.push('-');
				continue;
			}
			let sum = 0;
			for (let j = 0; j < dayCount; j++) {
				sum += data.values[i - j][1];
			}
			result.push(+(sum / dayCount).toFixed(3));
		}
		return result;
	}
	
	const dealKlineOptions = (data) => {
		const heng = [];
		const zong = [];
		data.forEach(p => {
			heng.push(p.t1)
			zong.push(p.f9 || 0)
		})
		// 计算基础的最大最小值
		let maxValue = Math.max(...zong) * 1.1;
		let minValue = Math.min(...zong) / 1.1;
		
		// 向上取整到最接近的10的倍数
		maxValue = Math.ceil(maxValue / 10) * 10;
		
		// 向下取整到最接近的10的倍数
		minValue = Math.floor(minValue / 10) * 10;
		
		const total = zong.length;
		const minSpanPercent = Math.min(100, (6 / total) * 100); // 至少显示6个，不超过100%
		option.value = {
			xAxis: {
				type: 'category',
				data: heng
			},
			yAxis: {
				type: 'value',
				min: minValue,
				max: maxValue,
				axisLine: {
					show: true
				},
				splitLine: {
					show: true, // 确保显示分割线（默认通常是 true）
					lineStyle: {
						type: 'dashed', // 虚线
						color: '#F8F8F8', // 颜色（可选）
					}
				}
			},
			grid: {
				top: '15%', // 上边距设为 0
				bottom: '15%', // 下边距设为 0
				left: '10%', // 左右可根据需要调整，避免 y 轴标签被裁剪
				right: '10%'
			},
			tooltip: {
				trigger: 'axis', // 触发类型：坐标轴触发
				show: true, // 显示提示框
				axisPointer: { // 坐标轴指示器
					type: 'cross' // 十字准星指示器
				}
			},
			series: [{
				data: zong,
				type: 'line',
				color: '#FF5500',
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(255, 219, 209, 1)' // 0% 处的颜色
						}, {
							offset: 1,
							color: 'rgba(255, 255, 255, 0.01)' // 100% 处的颜色
						}],
						global: false // 缺省为 false
					}
				},
				symbol: 'none'
			}],
			dataZoom: [{
				type: 'inside',
				start: 50,
				end: 100,
				disabled: false,
				minSpan: minSpanPercent
			}]
		};
		
	}

	const getHotView = (id) => {
		hotView(id).then(res => {
			const {
				discription,
				...restData
			} = res.data
			hotInfo.value = {
				...restData,
				discription: Object.entries(discription).map(([title, value]) => ({
					title,
					value
				}))
			}
		})
	}

	const getStocksList = (id) => {
		closedDPDayDetail({
			grailCategoryId: id
		}).then(res => {
			stockALl.value = res.data
			stocksNow.value = res.data.dayK
			shuJuList.value = res.data.dayKList
			const tempDataList = res.data.dayKList.map(p => [
			    p.t1, 
			    Number(p.f1), 
			    Number(p.f9), 
			    Number(p.f4), 
			    Number(p.f3), 
			    Number(p.f7)
			])
			dealKlineOptions(res.data.dayKList)
		})
		dpRecords({
			grailCategoryId: id
		}).then(res=>{
				latestList.value = res.data
		})
	}

	const onMarket = (e) => {
		marketInfo.value = e
	}
	
	const getHotId = (e) => {
		getStocksList(e)
	}

	onLoad((e) => {
		getHotView(e.id)
	})
</script>

<style scoped lang="scss">
	@mixin row($gap) {
		display: flex;
		gap: $gap;
	}

	@mixin colum($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}

	@mixin row-center($gap) {
		display: flex;
		align-items: center;
		gap: $gap;
	}

	@mixin row-center-between($gap) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $gap;
	}

	@mixin center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@mixin button {
		margin: 0;
		line-height: normal;
		font-weight: 600;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #FFC400;
		border-radius: 60rpx;
		padding: 12rpx 24rpx;
		box-sizing: border-box;

		&::after {
			display: none
		}
	}

	@mixin title-AB {
		font-weight: 400;
		font-size: 28rpx;
		color: #ABABAB;
	}

	@mixin title-blod {
		font-weight: 600;
		font-size: 28rpx;
		color: #2C2E3A;
		line-height: 28rpx;
	}


	.hotspot {

		.continer {
			@include colum(40rpx);
			padding: 20rpx 13.5% 60rpx;
			box-sizing: border-box;

			.product {
				@include colum(20rpx);
				padding: 32rpx 24rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 16rpx;
				border: 2rpx solid rgba(219, 220, 224, 0.4);

				.product-name {
					@include row-center-between(20rpx);

					>view:first-child {
						@include row(8rpx);
						align-items: flex-end;
						line-height: normal;

						>view:first-child {
							font-weight: 600;
							font-size: 44rpx;
							color: #2C2E3A;
							line-height: 44rpx;
						}

						.logo {
							width: 136rpx;
							height: 32rpx;
						}

						.tagImg {
							height: 32rpx;
							width: 32rpx;
						}

						.text {
							font-weight: 400;
							font-size: 28rpx;
							color: #E6C9A5;
						}
					}

					>button {
						@include button();
					}
				}

				.price {
					@include row(8rpx);
					align-items: flex-end;
					line-height: 56rpx;

					>view:first-child {
						font-weight: 600;
						font-size: 56rpx;
						color: #FF5500;

						&::before {
							content: '¥';
							color: inherit;
							font-size: 32rpx;
							font-weight: inherit;
						}
					}

					>view:last-child {
						@include title-AB();
					}
				}

				.foundation {
					@include colum(24rpx);

					>view:first-child {
						@include title-blod();
					}

					.foundation-info {
						padding: 32rpx 20rpx;
						box-sizing: border-box;
						background: linear-gradient(90deg, rgba(255, 248, 221, 0.39) 0%, rgba(255, 196, 0, 0.17) 48.1%, rgba(255, 247, 219, 0.26) 100%);
						border-radius: 12rpx;
						position: relative;

						>view {
							font-weight: 300;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 40rpx;
							position: relative;
							z-index: 2;
							white-space: pre-wrap;
						}

						>image {
							position: absolute;
							top: 10rpx;
							right: 20rpx;
							width: 84rpx;
							height: 84rpx;
							z-index: 1;
						}
					}
				}

				.infomation {
					@include colum(36rpx);

					>view:first-child {
						@include title-blod();
					}

					.infomation-info {
						display: grid;
						grid-template-columns: 3fr 3fr 2fr 2fr;
						gap: 48rpx;

						@media screen and (max-width:1600px) {
							grid-template-columns: 3fr 3fr 2fr;
						}

						.item {
							@include row-center(24rpx);
							width: 100%;

							>view:first-child {
								@include title-AB();
								line-height: 28rpx;
								white-space: nowrap;
								width: 20%;
							}

							>view:last-child {
								@include title-AB();
								color: #2C2E3A;
								line-height: 28rpx;
								white-space: nowrap;
							}
						}
					}

					.infomation-img {
						@include row-center(30rpx);
						flex-wrap: wrap;
					}
				}
			}

			.trend {
				@include row(40rpx);
				width: 100%;
				height: 1800rpx;
				.transaction {
					@include colum(0);
					background: #FFFFFF;
					border-radius: 16rpx;
					border: 2rpx solid rgba(219, 220, 224, 0.4);
					width: 30%;
					min-width: 700rpx;
					overflow: hidden;

					.transaction-title {
						@include row-center-between(20rpx);
						box-sizing: border-box;
						border-bottom: 2rpx solid #F2F2F2;
						padding: 20rpx;

						>view {
							@include center();
							flex: 1;
							font-weight: 500;
							font-size: 32rpx;
							color: #ABABAB;
							cursor: pointer;

							>span {
								display: flex;
							}

							.active {
								font-size: 32rpx;
								color: #2C2E3A;
								position: relative;

								&::after {
									content: '';
									position: absolute;
									top: 100%;
									width: 100%;
									height: 8rpx;
									background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
									border-radius: 12rpx;
								}
							}
						}
					}

					.transaction-info {
						flex: 1;
						overflow: hidden;

						.transa-box {
							height: 100%;
						}

						.conditions-box {
							height: 100%;
						}

					}
				}

				.trend-content {
					flex: 1;
					@include row(0);

					.real-time-price {
						flex: 1;
						@include colum(40rpx);

						.stocks-top {
							@include row-center-between(20rpx);

							>view:first-child {
								font-weight: 600;
								font-size: 40rpx;
								color: #2C2E3A;
								position: relative;

								&::after {
									content: '';
									position: absolute;
									top: 100%;
									left: 0;
									width: 100%;
									height: 8rpx;
									background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
									border-radius: 12rpx;
								}
							}

							.release {
								@include row-center(10rpx);

								>view:first-child {
									font-weight: 400;
									font-size: 24rpx;
									color: #ABABAB;
									transform: translateX(15%);

									&:before {
										content: '*';
									}
								}

								.ploygon {
									@include row-center(0);

									>view {
										padding: 12rpx 60rpx;
										box-sizing: border-box;
										font-weight: 600;
										font-size: 28rpx;
										color: #FFFFFF;
										line-height: normal;
										cursor: pointer;

										&:first-child {
											background: #00B0F9;
											border-radius: 64rpx 0 0 64rpx;
											clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
											transform: translateX(15%);
										}

										&:last-child {
											background: #FF5500;
											border-radius: 0 64rpx 64rpx 0;
											clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);

										}
									}
								}
							}
						}

						.stocks-chart {
							@include colum(40rpx);
							padding: 40rpx 24rpx 28rpx;
							box-sizing: border-box;
							background: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid rgba(219, 220, 224, 0.4);
							
							.chart-top {
								@include row(80rpx);

								.chart-taps {
									@include colum(20rpx);

									.chart-item-price {
										@include row-center(0);

										>image {
											width: 24rpx;
											height: 34rpx;
											transform: translateY(-6rpx);
										}

										>view {
											font-weight: 600;
											font-size: 24px;
											color: #FF5500;
											line-height: 28rpx;

											&::before {
												content: '¥';
												font-size: 14px;
											}

											>span {
												font-weight: 400;
												font-size: 14px;
											}
										}
									}

									.chart-item-tiem {
										font-weight: 400;
										font-size: 28rpx;
										color: #ABABAB;
										line-height: 28rpx;
									}

									.chart-item {
										@include row-center(50rpx);

										>view:first-child {
											font-weight: 400;
											font-size: 28rpx;
											color: #ABABAB;
											line-height: 28rpx;

										}

										>view:last-child {
											font-weight: 400;
											font-size: 28rpx;
											color: #2C2E3A;
											line-height: 28rpx;
										}
									}
								}
							}
							.chart-chart{
								@include colum(20rpx);
								.chart-butList{
									@include row-center(70rpx);
									>view{
										@include title-AB();
										line-height: 28rpx;
										cursor: pointer;
									}
									.active{
										@include title-blod();
										position: relative;
										&::after{
											content: '';
											position: absolute;
											bottom: -10rpx;
											left: 0;
											width: 100%;
											height: 6rpx;
											background: linear-gradient( 270deg, #FFF8DF 0%, #FFC400 100%);
											border-radius: 4rpx;
										}
									}
								}
							}
						}
						
						.stocks-turnover{
							@include row(36rpx);
							flex: 1;
							overflow: hidden;
							>view{
								flex: 1;
								padding: 30rpx 28rpx;
								box-sizing: border-box;
								background: #FFFFFF;
								border-radius: 16rpx;
								border: 2rpx solid rgba(219,220,224,0.4);
								
								>view:first-child{
									font-weight: 600;
									font-size: 36rpx;
									color: #000000;
									line-height: 36rpx;
								}
							}
							
							.details{
								@include colum(24rpx);
								
								.details-type{
									@include row-center-between(20rpx);
									@include title-blod();
								}
								.type-line{
									width: 100%;
									@include row-center(2rpx);
									$blue: #00B0F9;
									$orange: #FF5500;
									>view{
										@include row-center(4rpx);
										font-weight: 600;
										font-size: 24rpx;
										>span{
											width: 100%;
											height: 8rpx;
											border-radius: 14rpx;
										}
										&:first-child{
											color: $blue;
											>span{
												background-color: $blue;
											}
										}
										&:last-child{
											color: $orange;
											
											>span{
												background-color: $orange;
											}
										}
										
									}
								}
								.details-content{
									flex: 1;
									@include row(0);
									overflow: hidden;
									>view{
										flex: 1;
										overflow-y: auto;
										scrollbar-width: none;
										&:first-child{
											background: #F6F8FC;
											border-radius: 12rpx 0 0 12rpx;
											>view:first-child{
												background-color: #E8F2F9;
											}
										}
										&:last-child{
											background: #FFF9F9;
											border-radius: 0 12rpx 12rpx 0;
											>view:first-child{
												background-color: #FFEFF0;
											}
										}
										.item{
											padding: 20rpx 16rpx;
											box-sizing: border-box;
											@include row-center-between(20rpx);
											>view:first-child{
												font-weight: 600;
												font-size: 28rpx;
												color: #00B0F9;
												line-height: 28rpx;
												>span{
													font-weight: 400;
													font-size: 24rpx;
													color: #ABABAB;
													line-height: 24rpx;
												}
											}
											>view:last-child{
												font-weight: 400;
												font-size: 28rpx;
												color: #2C2E3A;
												line-height: 28rpx;
											}
										}
									}
								}
							}
							.latest{
								@include colum(0rpx);
								.latest-lsit{
									@include colum(0rpx);
									overflow-y: auto;
									scrollbar-width: none;
									.item{
										padding: 28rpx 0;
										box-sizing: border-box;
										@include row-center-between(20rpx);
										border-bottom: 2rpx solid #F2F2F2;
										.item-left{
											@include row-center(48rpx);
											>view:first-child{
												@include row-center(12rpx);
												>view:first-child{
													padding: 6rpx 10rpx;
													font-size: 28rpx;
													font-weight: 500;
													color: #FFFFFF;
													line-height: 28rpx;
													background-color: #FF5500;;
													border-radius: 12rpx;
												}
												>view:last-child{
													@include title-blod();
													>span{
														font-weight: 400;
														font-size: 24rpx;
														color: #ABABAB;
														line-height: 24rpx;
													}
												}
											}
											>view:last-child{
												font-weight: 500;
												font-size: 28rpx;
												color: #2C2E3A;
												line-height: 28rpx;
											}
										}
										>view:last-child{
											font-weight: 400;
											font-size: 28rpx;
											color: #ABABAB;
											line-height: 28rpx;
										}
									}
								}
							}
						}
					}

					.condittions-info {
						flex: 1;
						@include colum(20rpx);
						background: #FFFFFF;
						border-radius: 16rpx;
						border: 2rpx solid rgba(219, 220, 224, 0.4);
						padding: 32rpx 24rpx;
						box-sizing: border-box;

						.title {
							font-weight: 600;
							font-size: 40rpx;
							color: #2C2E3A;
						}

						.time {
							font-weight: 400;
							font-size: 28rpx;
							color: #ABABAB;
						}

						.description {
							font-weight: 400;
							font-size: 32rpx;
							color: #2C2E3A;
							line-height: 52rpx;
							text-align: left;
						}

						.pictureList {
							width: 40%;
							aspect-ratio: 0.8;

							.swiper {
								width: 100%;
								height: 100%;
								background: #D9D9D9;
								border-radius: 16rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}
			}

		}
	}
</style>