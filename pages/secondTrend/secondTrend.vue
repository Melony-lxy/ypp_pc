<template>
	<view class="view-second-trend">
		<view class="view-first-header ">
			<view class="center-style view-title">
				<image src="/static/lottery/back.png" @click="clickBack()"></image>
				{{productName}}
			</view>
		</view>
		<z-paging class="view-body" ref="pagingSecondTrend" v-model="dataList" :default-page-no="0" :fixed="false" @query="queryList">
			<template #refresher="{ refresherStatus }">
				<customRefresher :status="refresherStatus" />
			</template>
			<template #loadingMoreNoMore>
				<customNomore />
			</template>
			<view class="view-ms-tou" >
				<view class="between-style" style="margin-top: 30rpx;">
					<view class="text-cplx">{{chaoType}}{{tagName}}</view>
					<text class="text-grey">交易中 {{tradeTime}}</text>
				</view>
				<view class="center-style">
					<text :class="classBigMap[ifUp]">{{volumeLastest||'--'}}</text>
					<image v-if="ifUp !== 0" class="image-up" :src="`/static/images/price/priceTrend/${ifUp === 1 ? 'up' : 'down'}.png`"></image>
				</view>
				<view class="between-style" :class="classLittlegMap[ifUp]" style="margin-top: 12rpx;"> {{chgPrice}} {{chaPercentage}}%</view>
				<view class="view-gdksc" v-if="ifShowCan">
					<view class="between-column-style">
						<view class="between-style">
							<text class="text-grey" style="margin-right: 14rpx;">最高</text>
							<text :class="classMiddleMap[ifUp2]">{{highestDesc||'--'}}</text>
						</view>
						<view class="between-style">
							<text class="text-grey" style="margin-right: 14rpx;">最低</text>
							<text :class="classMiddleMap[ifUp2]">{{lowestDesc||'--'}}</text>
						</view>
					</view>
					<view class="between-column-style">
						<view class="between-style">
							<text class="text-grey" style="margin-right: 14rpx;">今开</text>
							<text :class="classMiddleMap[ifUp2]">{{openDesc||'--'}}</text>
						</view>
						<view class="between-style">
							<text class="text-grey" style="margin-right: 14rpx;">昨收</text>
							<text :class="classMiddleMap[ifUp2]">{{closeDesc||'--'}}</text>
						</view>
					</view>
					<view class="between-column-style">
						<view class="center-style">
							<text class="text-grey" style="margin-right: 14rpx;">成交量</text>
							<text :class="classMiddleMap[ifUp]">{{volumeDesc}}{{danWei}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <view style="width: 100vw; height: 20rpx; background: #F8F8F8;"></view> -->
			<view class="view-charts">
				<uc-charts :option="option" style="width: 100%; height: 100%;">
				</uc-charts>
				<view class="mask" @click="modal.show = true">
					<view v-html="'点击前往app查看'"></view>
				</view>
			</view>
			<view class="view-cjl" @click="clickJumpCj">
				<image style="width: 142rpx; height: 80rpx;" src="/static/images/tray/image-zxcj.png"></image>
				<swiper class="swiper-cj" :autoplay="true" :vertical="true">
					<swiper-item v-for="(cj,index) in cjList" class="swiper-item-cj">
						<text class="text-jg">¥{{cj.f0}}</text>
						<text class="text-dw">/{{cj.unit}}</text>
						<text class="text-sl">{{cj.quantity}}{{cj.unit}}</text>
						<text class="text-sj">{{cj.t0}}</text>
					</swiper-item>
				</swiper>
				<image style="width: 16rpx; height: 24rpx; margin-right: 18rpx;" src="/static/mine/extend-light-grey.png"></image>
			</view>
			<view class="view-nian-tou">
				<view class="between-style view-cs-qg">
					<view>求购</view>
					<view>出售</view>
				</view>
				<view class="center-style view-cs-qg-rate">
					<view>{{purchasePct}}</view>
					<view class="center-style" style="flex: 1; margin: 0 4rpx;">
						<view class="line-blue" :style="{width: purchasePct}"></view>
						<view class="line-red" :style="{width: sellPct}"></view>
					</view>
					<view>{{sellPct}}</view>
				</view>
			</view>

			<view class="view-little-box center-style" v-for="(item,index) in dataList">
				<view class="view-blue between-style" :style="{background: index===0?'#E8F2F9':'#F6F8FC', borderRadius: index === 0 ? '12rpx 0 0 0' : '0'}" @click="clickJumpBuySell(item.purchase,'grail_purchase')">
					<view class="center-style" v-if="item.purchase">
						<text class="text-blue">{{item.purchase?.price}}</text>
						<text class="text-grey">/{{item.purchase?.countUnit}}</text>
					</view>
					<text class="text-black">{{item.purchase?.count}}{{item.purchase?.countUnit}}</text>
				</view>
				<view class="view-red between-style" :style="{background: index===0?'#FFEFF0':'#FFF9F9', borderRadius: index === 0 ? '0 12rpx 0 0' : '0'}" @click="clickJumpBuySell(item.sell,'grail_sell')">
					<view class=" center-style" v-if="item.sell">
						<text class="text-red">{{item.sell?.price}}</text>
						<text class="text-grey">/{{item.sell?.countUnit}}</text>
					</view>
					<text class="text-black">{{item.sell?.count}}{{item.sell?.countUnit}}</text>
				</view>
			</view>
		</z-paging>
		<view class="view-foot">
			<image class="image-button" src="/static/images/hotTopic/publish_buy.png" @click="clickPublish('purchase')"></image>
			<image class="image-button" src="/static/images/hotTopic/publish_sell.png" @click="clickPublish('sell')"></image>
		</view>
		<popup-modal :show="modal.show" title="请前往APP内打开" @suer="modal.suer()" @close="modal.close()"></popup-modal>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	import { onLoad, onUnload } from "@dcloudio/uni-app";
	import customRefresher from '../../components/custom-refresher/custom-refresher.vue';
	import customNomore from '../../components/custom-nomore/custom-nomore.vue';
	import ucCharts from '../../components/uc-charts/uc-charts.vue';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import { closedDPDayDetail, dpRecords, getMoneyItemList} from '../../api/common';
	const pagingSecondTrend = ref(null);
	const dataList = ref([]);
	const selectTab = ref(1);
	const cjList = ref([]);

	const moneyList = ref([]);
	const ifShowCan = ref(false);
	const ifUp = ref(0);
	const ifUp2 = ref(0);
	const tagName = ref('');
	const tagId = ref('');
	const openDesc = ref('');
	const closeDesc = ref('');
	const lowestDesc = ref('');
	const highestDesc = ref('');
	const volumeDesc = ref('');
	const tradeTime = ref('');
	const volumeLastest = ref('');
	const chgPrice = ref('');
	const chaPercentage = ref('');
	const spec = ref('');
	const desc = ref('');
	const grailCategoryId = ref(0);
	const consecutiveType = ref(1);
	const productName = ref('');
	const productCategoryId = ref('');
	const productCategoryType = ref('');
	const panPublishVo = ref(null);
	const purchasePct = ref(null);
	const sellPct = ref(null);
	const danWei = ref(null);
	const chaoType = ref(null);
	const classBigMap = {
		0: 'text-big-black',
		1: 'text-big-red',
		2: 'text-big-green'
	};
	const classLittlegMap = {
		0: 'text-little-black',
		1: 'text-little-red',
		2: 'text-little-green'
	};
	const classMiddleMap = {
		0: 'text-black',
		1: 'text-red',
		2: 'text-green'
	};

	const option = ref({});
	// 定义上涨和下跌的颜色
	const upColor = '#FF5500';
	const downColor = '#29C96E';
	const isCrossMode = ref(false);
	const startShu = ref(0);
	const endShu = ref(0);
	const shuJuList = ref([]);
	
	const modal = ref({
		show: false,
		close(){
			this.show = false
		},
		suer(){
			this.close()
			jump()
		}
	})


	const handleDataIndexChange = (dataIndex) => {
		ifShowCan.value = true;
		let obj = shuJuList.value[dataIndex];
		console.log('进来了', dataIndex);
		console.log('进来了', obj);
		if (Number(obj.f9) < Number(obj.f1)) {
			ifUp2.value = 2;
		} else if (Number(obj.f9) > Number(obj.f1)) {
			ifUp2.value = 1;
		} else {
			if (Number(obj.f9) >= Number(obj.f2)) {
				ifUp2.value = 1;
			} else {
				ifUp2.value = 2;
			}
		}
		openDesc.value = obj.f1;
		closeDesc.value = obj.f2;
		lowestDesc.value = obj.f4;
		highestDesc.value = obj.f3;
		volumeDesc.value = obj.f7;
		tradeTime.value = obj.t0;
		// volumeLastest.value = obj.f0;
		// if (Number(obj.f6) > 0) {
		// 	chgPrice.value = '+' + obj.f6;
		// } else {
		// 	chgPrice.value = obj.f6;
		// }
		// if (Number(obj.f5) > 0) {
		// 	chaPercentage.value = '+' + obj.f5;
		// } else {
		// 	chaPercentage.value = obj.f5;
		// }
	}


	const clickBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	const clickJumpCj = () => {
		modal.value.show = true
		// uni.navigateTo({
		// 	url: `/pages/hotTopic/transacted/transacted?tagNameVo=${tagName.value}&grailCategoryId=${grailCategoryId.value}`
		// })

	}
	const checkSpec = (specVo, descVo) => {
		spec.value = specVo;
		desc.value = descVo;
		pagingSecondTrend.value.reload();
	}
	const clickPublish = (type) => {
		modal.value.show = true
		// if (!moneyList.value || !moneyList.value.length === 0) return
		// console.log(productCategoryId.value);
		// console.log(moneyList.value);

		// const _map = { '1': 'san', '2': 'shi', '3': 'bai' }
		// let publishStr = encodeURIComponent(JSON.stringify(panPublishVo.value));

		// let url = '';
		// if (type === 'purchase') {
		// 	url = `/pages/publish2/purchaseDetailNew/purchaseDetailNew?productCategoryId=${productCategoryId.value}&panHotPublishVo=${publishStr}&ifHotspot=true`
		// } else {
		// 	url = `/pages/publish2/detailNew/detailNew?orderType=1&productCategoryId=${productCategoryId.value}&panHotPublishVo=${publishStr}&ifHotspot=true`;
		// }

		// moneyList.value.forEach(p => {
		// 	if (p.id === productCategoryId.value && p.futureEnabled) {
		// 		url += `&issuanceDate=${p.issuanceDate}&futureEnabled=${p.futureEnabled}`
		// 	}
		// })


		// uni.navigateTo({
		// 	url
		// })
	}
	const clickJumpBuySell = (objVo, productCategoryType) => {
		if (objVo == null) return;
		uni.navigateTo({
			url: `/pages/hotTopic/buySells/buySells?tagNameVo=${tagName.value}&grailCategoryId=${grailCategoryId.value}&productCategoryType=${productCategoryType}&price=${objVo.price}&count=${objVo.count}&countUnit=${objVo.countUnit}`
		})
	}

	const dealKlineOptions2 = (dayKList) => {
		const heng = [];
		const zong = [];
		dayKList.forEach(p => {
			heng.push(p.t1)
			zong.push(p.f9 || 0)
		})
		console.log(heng);
		console.log(zong);
		// 计算基础的最大最小值
		let maxValue = Math.max(...zong) * 1.1;
		let minValue = Math.min(...zong) / 1.1;

		// 向上取整到最接近的10的倍数
		maxValue = Math.ceil(maxValue / 10) * 10;

		// 向下取整到最接近的10的倍数
		minValue = Math.floor(minValue / 10) * 10;
		option.value = {
			xAxis: {
				type: 'category',
				data: heng
			},
			yAxis: {
				type: 'value',
				min: minValue,
				max: maxValue
			},
			grid: {
				right: 50
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
				color: '#F5C142',
			}],
			dataZoom: [{
				type: 'inside',
				start: 50,
				end: 100,
				disabled: false
			}]
		};
	}

	const queryList = (a, b) => {
		closedDPDayDetail({
			grailCategoryId: grailCategoryId.value,
		}).then(res => {
			if (res.code == 200) {
				let obj = res.data;
				if (Number(obj.dayK.f9) < Number(obj.dayK.f1)) {
					ifUp.value = 2;
				} else if (Number(obj.dayK.f9) > Number(obj.dayK.f1)) {
					ifUp.value = 1;
				} else {
					if (Number(obj.dayK.f9) >= Number(obj.dayK.f2)) {
						ifUp.value = 1;
					} else {
						ifUp.value = 2;
					}
				}
				if (Number(obj.dayK.f9) < Number(obj.dayK.f1)) {
					ifUp2.value = 2;
				} else if (Number(obj.dayK.f9) > Number(obj.dayK.f1)) {
					ifUp2.value = 1;
				} else {
					if (Number(obj.dayK.f9) >= Number(obj.dayK.f2)) {
						ifUp2.value = 1;
					} else {
						ifUp2.value = 2;
					}
				}
				productCategoryType.value = obj.productCategoryType;
				purchasePct.value = obj.purchasePct;
				sellPct.value = obj.sellPct;
				openDesc.value = obj.dayK.f1;
				closeDesc.value = obj.dayK.f2;
				lowestDesc.value = obj.dayK.f4;
				highestDesc.value = obj.dayK.f3;
				volumeDesc.value = obj.dayK.f7;
				tradeTime.value = obj.dayK.t0;
				volumeLastest.value = obj.dayK.f0;

				if (Number(obj.dayK.f6) > 0) {
					chgPrice.value = '+' + obj.dayK.f6;
				} else {
					chgPrice.value = obj.dayK.f6;
				}
				if (Number(obj.dayK.f5) > 0) {
					chaPercentage.value = '+' + obj.dayK.f5;
				} else {
					chaPercentage.value = obj.dayK.f5;
				}

				panPublishVo.value = {
					hotspotGrail: obj.hotspotGrail,
					grailCategoryId: obj.grailCategoryId,
					productCategoryId: obj.productCategoryId,
					consecutiveType: obj.consecutiveType,
					tagName: obj.tagName,
					tagId: obj.tagId,
					unit: obj.unit,
					imageUrl: obj.imageUrl,
					priceLimit: obj.priceLimit
				};

				productCategoryId.value = obj.productCategoryId
				tagId.value = obj.tagId
				consecutiveType.value = Number(obj.consecutiveType || '');
				tagName.value = obj.tagName || '';
				const _map2 = { 1: '散钞', 2: '标十', 3: '标百' };
				danWei.value = obj.unit
				chaoType.value = _map2[consecutiveType.value]

				const maxLength = Math.max(obj.purchaseList.length, obj.sellList.length);
				const mergedList = [];
				for (let i = 0; i < maxLength; i++) {
					const item = {
						index: i,
						purchase: obj.purchaseList[i] || null,
						sell: obj.sellList[i] || null,
						hasBoth: Boolean(obj.purchaseList[i] && obj.sellList[i])
					};
					mergedList.push(item);
				}


				shuJuList.value = obj.dayKList;
				dealKlineOptions2(obj.dayKList);
				pagingSecondTrend.value.completeByNoMore(mergedList, true);
			}
		}).catch(res => {
			pagingSecondTrend.value.complete(false);
		});

		try {
			dpRecords({
				grailCategoryId: grailCategoryId.value
			}).then(res => {
				// console.log("res: " + JSON.stringify(res));
				cjList.value = res.data;
			})


		} catch (error) {
			console.log(error);
		};

	}
	
	const jump = (type) =>{
		const data = window.OpenInstall.parseUrlParams()
		let url = `/pages/hotTopic/secondTrend/secondTrend?grailCategoryId=${data.grailCategoryId}&productName=${data.productName}`
		data.jumpUrl = encodeURIComponent(JSON.stringify(url))
		if (window.OpenInstall) {
			const openInstall = new window.OpenInstall({
				appKey: "bxkyti", // 替换为你的 appKey
				onready: function() {
					let that = this;
					that.schemeWakeup();
					that.wakeupOrInstall();
					return false;
				},
			}, data);
		} else {
			console.error('OpenInstall 脚本未加载，请检查引入方式');
		}
	}

	onMounted(() => {
		// queryList();
	})
	onLoad((options) => {
		grailCategoryId.value = options.grailCategoryId || '';
		productName.value = options.productName || '';
		uni.$on('getDataIndex', handleDataIndexChange)

		getMoneyItemList({ type: 1 }).then(res => {
			console.log(res);
			moneyList.value = [...res.data[0].childList[0].childList];
		})
	});
	onUnload(() => {
		uni.$off('getDataIndex', handleDataIndexChange)
	});
</script>

<style scoped lang="scss">
	.center-style {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.between-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.between-column-style {
		display: flex;
		flex-direction: column;
		align-items: space-between;
		justify-content: center;
	}



	.view-second-trend {
		width: 100vw;
		height: 100vh;
		font-family: PingFangSC, PingFang SC;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.view-first-header {
			width: 100vw;
			display: flex;
			flex-direction: column;


			.view-title {
				height: 50rpx;
				margin-top: 20rpx;


				font-weight: 500;
				font-size: 34rpx;
				color: #2C2E3A;
				line-height: 34rpx;

				image {
					width: 48rpx;
					height: 48rpx;
					margin: 0 16rpx;
				}
			}

		}

		.view-body {
			width: 100vw;
			flex: 1;
			overflow-y: hidden;
			position: relative;

			.view-ms-tou {
				display: flex;
				flex-direction: column;
				// border: 1rpx solid;
				padding: 0 28rpx;
				margin-top: 16rpx;

				.text-cplx {
					display: flex;
					margin-bottom: 10rpx;
					padding: 8rpx 24rpx;
					background: linear-gradient(90deg, #BF7D2B 0%, #FF9D24 100%);
					border-radius: 8rpx;
					font-size: 26rpx;
					color: #FFFFFF;
				}

				.text-little-red {
					font-weight: 400;
					font-size: 24rpx;
					color: #FB3520;
					line-height: 24rpx;
				}

				.text-big-red {
					font-weight: 600;
					font-size: 48rpx;
					color: #FF5500;
					line-height: 48rpx;
				}

				.text-little-green {
					font-weight: 400;
					font-size: 24rpx;
					color: #29C96E;
					line-height: 24rpx;
				}

				.text-big-green {
					font-weight: 600;
					font-size: 48rpx;
					color: #29C96E;
					line-height: 48rpx;
				}

				.text-grey {
					font-weight: 400;
					font-size: 24rpx;
					color: #ABABAB;
					line-height: 24rpx;
				}

				.text-little-black {
					font-weight: 400;
					font-size: 24rpx;
					color: #2C2E3A;
					line-height: 24rpx;
				}

				.text-big-black {
					font-weight: 600;
					font-size: 48rpx;
					color: #656565;
					line-height: 48rpx;
				}

				.image-up {
					width: 20rpx;
					height: 30rpx;
					margin-left: 6rpx;
				}
			}

			.view-gdksc {
				display: flex;
				align-items: flex-start;
				gap: 24rpx;
				margin: 20rpx 0 28rpx;
			}

			.view-tab-little-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-left: 30rpx;
				padding-top: 20rpx;


				.tab-column {
					display: flex;
					flex-direction: column;
					width: 70rpx;
					height: 48rpx;
					margin-right: 60rpx;
					align-items: center;
					justify-content: space-between;

					.view-select-yellow {
						width: 40rpx;
						height: 6rpx;
						background: linear-gradient(270deg, #FFF8DF 0%, #FFC400 100%);
						border-radius: 3rpx;
					}
				}

				.text-select {
					font-weight: 600;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 28rpx;
				}

				.text-unselect {
					font-weight: 400;
					font-size: 28rpx;
					color: #ABABAB;
					line-height: 28rpx;
				}

			}

			.view-charts {
				width: 100vw;
				height: 600rpx;
				// padding: 0 2%;
				display: flex;
				flex-direction: column;
				position: relative;
				.mask{
					position: absolute;
					inset: 0;
					background-color: rgba(44,46,58,0.5);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFF;
				}
			}

			.view-cjl {
				margin: 0 28rpx;
				height: 84rpx;
				background: #F8F8F8;
				border-radius: 12rpx;
				display: flex;
				align-items: center;

				.swiper-cj {
					flex: 1;
					// border: 1rpx solid;
					height: 84rpx;

					.swiper-item-cj {
						display: flex;
						align-items: center;

						.text-jg {
							font-weight: 600;
							font-size: 24rpx;
							color: #FF5500;
							line-height: 28rpx;
							margin-left: 6rpx;
						}

						.text-dw {
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							line-height: 24rpx;
						}

						.text-sl {
							font-weight: 400;
							font-size: 26rpx;
							color: #2C2E3A;
							line-height: 26rpx;
							margin-left: 20rpx;
						}

						.text-sj {
							font-weight: 400;
							font-size: 26rpx;
							color: #ABABAB;
							line-height: 26rpx;
							margin-left: 50rpx;
						}
					}
				}
			}

			.view-nian-tou {
				position: sticky;
				top: 0;
				// padding-bottom: 10rpx;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				// border: 1rpx solid;
			}

			.view-cs-qg {
				font-weight: 600;
				font-size: 28rpx;
				color: #2C2E3A;
				line-height: 28rpx;
				margin: 48rpx 28rpx 0;
			}

			.view-cs-qg-rate {
				font-weight: 600;
				font-size: 24rpx;
				line-height: 24rpx;
				margin: 24rpx 28rpx 20rpx;

				.line-blue {
					height: 8rpx;
					background: #00B0F9;
					border-radius: 2rpx;
				}

				.line-red {
					height: 8rpx;
					background: #FF5500;
					border-radius: 2rpx;
					margin-left: 4rpx;
				}
			}

			.view-little-box {
				height: 70rpx;
				margin: 0 28rpx;
				overflow: hidden;

				.view-blue {
					width: 50%;
					height: 100%;

					padding: 0 16rpx;
				}

				.view-red {
					width: 50%;
					height: 100%;
					background: #FFEFF0;
					padding: 0 16rpx;

				}

				.text-red {
					font-weight: 600;
					font-size: 28rpx;
					color: #FF5500;
					line-height: 28rpx;
				}

				.text-blue {
					font-weight: 600;
					font-size: 28rpx;
					color: #00B0F9;
					line-height: 28rpx;
				}

				.text-grey {
					font-weight: 400;
					font-size: 24rpx;
					color: #ABABAB;
					line-height: 24rpx;
				}

				.text-black {
					font-weight: 500;
					font-size: 24rpx;
					color: #2C2E3A;
					line-height: 24rpx;
				}
			}
		}

		.view-foot {
			flex-grow: 0;
			flex-shrink: 0;
			width: 100vw;
			height: 172rpx;
			padding-top: 32rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -1rpx 0rpx 0rpx #EBEBEB;
			display: flex;
			justify-content: center;

			.image-button {
				width: 368rpx;
				height: 84rpx;

				&:last-child {
					margin-left: -42rpx;
				}
			}
		}
	}
</style>