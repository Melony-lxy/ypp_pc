<template>
	<view>
		<GlobalSidebar />
		<YppHeader :index="1" />
		<!-- 行情价格 -->
		<view class="macket-price">
			<view class="macket-price-inner">
				<view class="macket-price-title">
					<view class="macket-price-content">
						<!-- <image src="" mode=""></image> -->
						<view class="content-img">
							<image :src="globalstore.upImageuler('/static/qian.png')" mode="widthFix"></image>
						</view>
						<text class="content-text">行情价格</text>
					</view>
					<text class="macket-price-time">{{ currentTime }}</text>
				</view>
				<view class="macket-price-pocket1">
					<view class="pocket-name-outer">
						<text class="pocket-name">龙钞</text>
					</view>
					<view class="changgui">
						<text class="changgui-price">¥{{price.longLow}}</text>
						<text class="changgui-text">散钞常规价格</text>
					</view>
					<view class="biaoshi">
						<text class="biaoshi-price">¥{{price.longIntermediate}}</text>
						<text class="biaoshi-text">标十普通价格</text>
					</view>
					<view class="biaobai">
						<text class="biaobai-price">¥{{price.longHigh}}</text>
						<text class="biaobai-text">标百普通价格</text>
					</view>
				</view>
				<view class="macket-price-pocket2">
					<view class="pocket-name-outer">
						<text class="pocket-name">蛇钞</text>
					</view>
					<view class="changgui">
						<text class="changgui-price">¥{{price.sheLow}}</text>
						<text class="changgui-text">散钞常规价格</text>
					</view>
					<view class="biaoshi">
						<text class="biaoshi-price">¥{{price.sheIntermediate}}</text>
						<text class="biaoshi-text">标十普通价格</text>
					</view>
					<view class="biaobai">
						<text class="biaobai-price">¥{{price.sheHigh}}</text>
						<text class="biaobai-text">标百普通价格</text>
					</view>
				</view>
				<button class="macket-price-btn">查看价格表</button>
			</view>
		</view>
		<!-- 全网行情 -->
		<view class="net-macket">
			<view class="net-macket-left" v-if="scroolList[activeBtn - 1].length !== 0">
				<view class="left-title">
					<text class="left-title-text">全网行情</text>
					<view class="title-color-line"></view>
				</view>
				<view class="left-second-title">
					<text>{{scroolList[activeBtn - 1][infoId[activeBtn - 1]].title}}</text>
				</view>
	<!-- 			<view class="left-small-title" v-if="scroolList[activeBtn - 1][infoId[activeBtn - 1]].brief">
					<view class="first-title-box">
						<text class="first-small-title">无234567</text>
					</view>
					<view class="second-title-box">
						<text class="second-small-title">¥13.8W</text>
					</view>
					<view class="third-title-box">
						<text class="third-small-title">数量1刀</text>
					</view>
					<view class="title-date-box">
						<text class="small-title-date">{{scroolList[activeBtn - 1][infoId[activeBtn - 1]].time}} 来源：{{scroolList[activeBtn - 1][infoId[activeBtn - 1]].source}}</text>
					</view>
				</view>
				<view class="left-warn" v-if="scroolList[activeBtn - 1][infoId[activeBtn - 1]].brief">
					<view class="left-warn-text">*该标签由AI识别，内容仅供参考，请仔细甄别</view>
				</view> -->
				<view class="left-intro">
					<text
						class="left-intro-text">{{scroolList[activeBtn - 1][infoId[activeBtn - 1]].content}}</text>
				</view>
				<view class="left-img-box" v-if="scroolList[activeBtn - 1][infoId[activeBtn - 1]].imageLinks.length !== 0">
					<view class="left-img">
						<swiper indicator-dots autoplay circular style="height: 100%;" v-if="scroolList[activeBtn - 1][infoId[activeBtn - 1]].imageLinks.length !== 0">
							<swiper-item v-for="(item,index) in scroolList[activeBtn - 1][infoId[activeBtn - 1]].imageLinks" :key="index" style="height: 100%;display: flex;align-items: center;justify-content: center;">
								<image :src="item" mode="aspectFit" style="border-radius: 12rpx;"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="net-macket-right" >
				<view class="right-btn-box">
					<button class="right-first-btn" v-for="(item,index) in buttonList" :key="item.type" @click="setActive(item.type)"
						:class="{ 'btnActive': activeBtn === item.type }">{{item.btn}}</button>
				</view>
				<view class="right-macket-column">
					<scroll-view style="height: 1948rpx;" scroll-y @scrolltolower="scrolltolower" lower-threshold="100">
						<view class="right-column-row1" v-for="(item,index) in scroolList[activeBtn - 1]" :key="item.id + index" :class="{'row-active': infoId[activeBtn - 1] == index}"
						@click="onClickInfo(index)">
							<image v-if="item.status" class="row1-superscript" :src="item.status ==='已成交' ? globalstore.upImageuler('/static/images/download/success.png') : globalstore.upImageuler('/static/images/download/che.png') " mode="widthFix"></image>
							<view class="row1-content">
								<view class="row1-text" :style="{width: (item.imageLinks.length !== 1) ? '100%' : '70%' }">
									<view class="row1-title-box">
										<view class="row1-first-title">
											<text class="row-title-text">{{item.title}}</text>
										</view>
										<view class="row1-second-title">
											{{item.content}}
										</view>
										<!-- <view class="row1-small-title" v-if="item.brief">
											<view class="row1-small-title-box1">
												<text class="row1-small-title1">无234567</text>
											</view>
											<view class="row1-small-title-box2">
												<text class="row1-small-title2">¥13.8W</text>
											</view>
											<view class="row1-small-title-box3">
												<text class="row1-small-title3">数量1刀</text>
											</view>
										</view> -->
										<view v-if="item.imageLinks.length > 1" class="row-imglsit" >
											<view v-for="imgurl in item.imageLinks.slice(0,3)">
												<image :src="imgurl" mode="aspectFill"></image>
											</view>
										</view>
										<view class="row1-date-box">
											<text class="row1-title-date">{{item.timeSpan}} 来源：{{item.source}}</text>
										</view>
									</view>
								</view>
								
								<view class="row1-img-box" v-if="item.imageLinks.length == 1">
									<image class="row1-img" :src="item.imageLinks[0]" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="right-column-list">
						<view class="column-list-dot1" :style="{opacity: activeBtn == item.type ? '0.6' : '0.1' }" 
						 @click="setActive(item.type)"
						 v-for="(item,index) in buttonList" :key="item.type"></view>
					</view>
				</view>
			</view>
		</view>


		<YppFooter />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';
	import {
		getLoongBanknoteTagGroups,
		getSheBanknoteTagGroups,
		marketList
	} from '../../api/common';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
	const activeBtn = ref(1)
	const currentTime = ref('');
	const priceId = ref(['6ff569b33fe846ffa2dc7693591f52e2', '771ed34daaee4ac58e6fd7aa440421c1','e34ad8d306604393ab203f5ed669d660',
		'6ff569b33fe846ffa2dc7693591f52e2', '771ed34daaee4ac58e6fd7aa440421c1', 'e34ad8d306604393ab203f5ed669d660',
	])
	const price = ref({
		longLow: '',
		longIntermediate: '',
		longHigh: '',
		sheLow: '',
		sheIntermediate: '',
		sheHigh: ''
	})
	const buttonList = ref([{
			btn: '2024龙钞',
			type: 1
		}, {
			btn: '2025蛇钞',
			type: 2
		},
		{
			btn: '贵金属纪念币',
			type: 3
		}
	])
	const scroolList = ref([[],[],[]])
	const infoId = ref([0,0,0])
	const pageNo = ref([0,0,0])
	
	const showTime = () => {
		var date = new Date();
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		if (D < 10) {
			D = '0' + date.getDate() + ' ';
		}
		var h = date.getHours();
		if (h < 10) {
			h = '0' + date.getHours() + ':';
		} else {
			h = date.getHours() + ':';
		}
		var m = date.getMinutes();
		if (m < 10) {
			m = '0' + date.getMinutes() + ':';
		} else {
			m = date.getMinutes() + ':';
		}
		var s = date.getSeconds();
		if (s < 10) {
			s = '0' + date.getSeconds();
		} else {
			s = date.getSeconds();
		}
		return Y + M + D + h + m + s;
	}

	let timer = null

	const getPrice = () => {
		getLoongBanknoteTagGroups({
			evaluateMenuId: priceId.value[0],
			pc: 1
		}).then(res => {
			price.value.longLow = res.data
		})
		getLoongBanknoteTagGroups({
			evaluateMenuId: priceId.value[1],
			pc: 1
		}).then(res => {
			price.value.longIntermediate = res.data
		})
		getLoongBanknoteTagGroups({
			evaluateMenuId: priceId.value[2],
			pc: 1
		}).then(res => {
			price.value.longHigh = res.data
		})
		getSheBanknoteTagGroups({
			evaluateMenuId: priceId.value[3],
			pc: 1
		}).then(res => {
			price.value.sheLow = res.data
			
		})
		getSheBanknoteTagGroups({
			evaluateMenuId: priceId.value[4],
			pc: 1
		}).then(res => {
			price.value.sheIntermediate = res.data
		})
		getSheBanknoteTagGroups({
			evaluateMenuId: priceId.value[5],
			pc:1
		}).then(res => {
			price.value.sheHigh = res.data
		})
	}

	const getMarktList = (type,pageNo) => {
		marketList({
			pageNo: pageNo[type - 1],
			pageSize: 10,
			type
		}).then(res => {
			res.data.rows.forEach(item=>{
				scroolList.value[type - 1].push(item)
			})
		})
	}
	
	const onClickInfo = (index) =>{
		infoId.value[activeBtn.value - 1] = index
	}
	
	const scrolltolower = () =>{
		pageNo.value[activeBtn.value - 1] += 1
		getMarktList(activeBtn.value,pageNo.value)
	}

	onMounted(() => {
		getPrice()
		getMarktList(activeBtn.value,pageNo.value)
		currentTime.value = showTime();
		timer = setInterval(() => {
			currentTime.value = showTime();
		}, 1000);

	});

	onUnmounted(() => {
		clearInterval(timer);
	});

	const setActive = (typeId) => {
		activeBtn.value = typeId
		if(scroolList.value[typeId - 1].length == 0) getMarktList(typeId,pageNo.value)
	}
</script>

<style lang="scss" scoped>
	.macket-price {
		width: 100%;
		// height: 200rpx;
		background-color: #FCF1E3;
		padding: 40rpx 13.5%;
		box-sizing: border-box;
		position: sticky;
		left: 0;
		top: 132rpx;
		z-index: 10;
		@media (max-width: 960px) {
			top: 0;
		}
		.macket-price-inner {
			display: flex;
			// height: 200rpx;
			align-items: center;

			.macket-price-title {
				display: flex;
				flex-direction: column;

				// margin-left: 140rpx;
				.macket-price-content {
					.content-img {
						width: 67.2rpx;
						height: 58.12rpx;
						display: inline-block;
						vertical-align: middle;

						image {
							width: 100%;
						}
					}

					.content-text {
						font-weight: 600;
						font-size: 20px;
						margin-left: 12rpx;
						vertical-align: middle;
					}
				}

				.macket-price-time {
					width: 282rpx;
					font-size: 28rpx;
					white-space: nowrap;
					color: #BF7D2B;
				}
			}

			.macket-price-pocket1,
			.macket-price-pocket2 {
				width: 814rpx;
				height: 126rpx;
				background-color: #fff;
				border-radius: 16rpx;
				display: flex;
				margin-left: 60rpx;

				.pocket-name-outer {
					height: 120rpx;
					line-height: 120rpx;
					margin-left: 40rpx;

					.pocket-name {
						font-size: 32rpx;
						white-space: nowrap;
					}
				}

				.changgui,
				.biaoshi,
				.biaobai {
					display: flex;
					justify-content: center;
					flex-direction: column;
					padding: 0 40rpx;
					color: #B6802B;

					.changgui-price,
					.biaoshi-price,
					.biaobai-price {
						font-size: 28rpx;
					}

					.changgui-text,
					.biaoshi-text,
					.biaobai-text {
						font-size: 24rpx;
					}
				}

				.biaoshi,
				.biaobai {
					padding: 0 40rpx;
					border-left: 2rpx dotted #BF7D2B;
				}
			}

			.macket-price-pocket2 {
				margin-left: 100rpx;
			}

			.macket-price-btn {
				font-size: 32rpx;
				width: 216rpx;
				height: 68rpx;
				line-height: 68rpx;
				border-radius: 60rpx;
				background-color: #FFC400;
				color: #fff;
				margin-left: 40rpx;
			}
			button::after{
				border: none;
			}
		}
	}

	.net-macket {
		width: 100%;
		margin-bottom: 100rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 13.5%;
		box-sizing: border-box;
		margin-top: 60rpx;
		.net-macket-left {
			width: 67.7785%;
			.left-title {
				.left-title-text {
					font-size: 40rpx;
					font-weight: 600;
				}

				.title-color-line {
					width: 120rpx;	
					height: 10rpx;
					border-radius: 12rpx;
					background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFC400 100%);
				}
			}

			.left-second-title {
				font-size: 80rpx;
				font-weight: 600;
				padding-top: 40rpx;
				padding-bottom: 26rpx;
			}

			.left-small-title {
				display: flex;
				margin-top: 36rpx;

				.first-title-box {
					width: 212rpx;
					color: #BF7D2B;
					background-color: #FFF7EF;
					border-radius: 12rpx;
					height: 58rpx;
					text-align: center;
					line-height: 58rpx;
					font-size: 24rpx
				}

				.second-title-box,
				.third-title-box {
					width: 180rpx;
					height: 58rpx;
					color: #FF5500;
					background-color: #FFF5F6;
					border-radius: 8rpx;
					margin-left: 20rpx;
					text-align: center;
					line-height: 58rpx;
					font-size: 24rpx
				}

				.title-date-box {
					margin-left: 20rpx;
					height: 58rpx;
					line-height: 58rpx;
					order: 1;
					flex-basis: 100%;

					.small-title-date {
						font-size: 22rpx;
						color: #ABABAB;
						flex-basis: 100%;
					}
				}
			}

			.left-warn {
				margin-top: 20rpx;

				.left-warn-text {
					font-size: 24rpx;
					color: #ABABAB;
				}
			}

			.left-intro {
				margin-top: 40rpx;

				.left-intro-text {
					font-size: 32rpx;
					line-height: 52rpx;
				}
			}

			.left-img-box {
				margin-top: 60rpx;

				.left-img {
					// width: 720rpx;

					width: 55.157895%;
					aspect-ratio: 0.721/1;
					background: #D9D9D9;
					margin: 0 auto;
					border-radius: 16rpx;
					padding: 20rpx;
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
				}
			}
		}

		.net-macket-right {
			width: 27.82486%;
			border-radius: 16rpx;
			
			.right-btn-box {
				display: flex;
				justify-content: space-between;
				button::after {
					border: none;
				}

				.right-first-btn,
				.right-second-btn {
					// width: 198rpx;
				}

				.right-third-btn {
					// width: 248rpx;
					// margin-left: 40rpx;
				}

				.right-first-btn,
				.right-second-btn,
				.right-third-btn {
					margin: 0;
					font-weight: 500;
					color: #656565;
					font-size: 32rpx;
					height: 68rpx;
					line-height: 68rpx;
					border-radius: 60rpx;
					background-color: #FFF;
					// border: 2rpx solid #ABABAB;
					// border: none;
				}

				.right-first-btn.btnActive,
				.right-second-btn.btnActive,
				.right-third-btn.btnActive {
					font-weight: 600;
					font-size: 32rpx;
					color: #2C2E3A;
					background: #F8F8F8;
					border: none;
				}
			}
		}

		.right-macket-column {
			padding-top: 22rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.right-column-row1,
			.right-column-row2 {
				width: calc(100% - 20rpx);
				box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.08);
				border-radius: 16rpx 16rpx 16rpx 16rpx;
			}

			.row1-superscript,
			.row2-superscript {
				height: 40rpx;
				width: 16.6%;
			}

			.row1-first-title,
			.row2-first-title {
				width: 100%;
				font-size: 32rpx;
				font-weight: 600;
				margin-top: 8rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.row1-second-title,
			.row2-second-title {
				width: 100%;
				margin-top: 12rpx;
				font-size: 28rpx;
				color: #656565;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.row-title-text {
				white-space: nowrap !important;
				overflow: hidden !important;
				text-overflow: ellipsis !important;
			}

			.row1-small-title,
			.row2-small-title {
				display: flex;
				margin-top: 16rpx;
			}
			
			.row-imglsit{
				margin-top: 16rpx;
				display: flex;
				width: 100%;
				aspect-ratio: 3.893/1;
				
				>view{
					width: 32.241%;
					height: 100%;
					margin: 0 4rpx;
					image{
						border-radius: 12rpx;
						width: 100%;
						height: 100%;
					}
				}
			}

			.row1-small-title-box1,
			.row2-small-title-box1 {
				width: 142rpx;
				height: 58rpx;
				color: #BF7D2B;
				background-color: #FFF7EF;
				border-radius: 8rpx;
				text-align: center;
				line-height: 58rpx;
				font-size: 24rpx;
				.row1-small-title1{
					white-space: nowrap;
				}
			}

			.row1-small-title-box2,
			.row1-small-title-box3,
			.row2-small-title-box2,
			.row2-small-title-box3 {
				width: 142rpx;
				height: 58rpx;
				color: #FF5500;
				background-color: #FFF5F6;
				border-radius: 8rpx;
				margin-left: 20rpx;
				text-align: center;
				line-height: 58rpx;
				font-size: 24rpx;
			}

			.row1-date-box,
			.row2-date-box {
				margin-top: 16rpx;
				height: 34rpx;
				line-height: 34rpx;
			}

			.row1-title-date,
			.row2-title-date {
				font-size: 24rpx;
				color: #ABABAB;
			}

			.right-column-row1 {
				margin: 28rpx 0;
				

				.row1-content {
					display: flex;
					justify-content: space-between;
					// align-items: center;
					padding: 0 24rpx 24rpx 24rpx;
					width: 100%;
					box-sizing: border-box;
					cursor: pointer;
					.row1-text {
						width: 70%;
						// height: 200rpx;
					}
					
					.row1-img-box {
						width: 28%;
						height: 228rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						.row1-img {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}

				}
			}
			
			.row-active {
				background: #FEFBEE;
				border: 2rpx solid #FFC400;
			}
			
			.right-column-row2 {
				width: 100%;
				margin-top: 28rpx;

				.row2-content {
					padding: 24rpx;
					padding-top: 0;
				}
			}

			.right-column-list {
				width: 96rpx;
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				padding: 36rpx 0 120rpx 0;

				.column-list-dot1,
				.column-list-dot2,
				.column-list-dot3 {
					width: 16rpx;
					height: 16rpx;
					background: #2C2E3A;
					border-radius: 100%;
					opacity: 0.1;
					cursor: pointer;
				}
			}
		}
	}

	@media (max-width: 960px) {

		// 行情价格适配
		.macket-price {
			width: 100%;
			height: auto;
			padding-bottom: 40rpx;

			.macket-price-inner {
				display: block;
				height: auto;
				overflow: hidden;

				.macket-price-title {
					margin-top: 20rpx;
					text-align: left;
					margin-left: 40rpx;
				}

				.macket-price-pocket1,
				.macket-price-pocket2 {
					width: 90%;
					height: 100rpx;
					display: flex;
				}

				.macket-price-pocket1,
				.macket-price-pocket2 {
					margin-left: 40rpx;
					margin-top: 20rpx;

					.pocket-name-outer {
						margin-left: 20rpx;

						.pocket-name {
							font-size: 25rpx;
						}
					}

					.changgui,
					.biaoshi,
					.biaobai {

						.changgui-price,
						.biaoshi-price,
						.biaobai-price {
							font-size: 25rpx;
						}

						.changgui-text,
						.biaoshi-text,
						.biaobai-text {
							font-size: 20rpx
						}
					}

					.biaoshi,
					.biaobai {
						padding: 0 32rpx;
					}
				}

				.macket-price-btn {
					font-size: 30rpx;
					width: 90%;
					margin-top: 40rpx;
				}
			}
		}

		// 全网行情适配
		.net-macket {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			margin-top: 0rpx;
			padding: 40rpx 20rpx 40rpx 20rpx;

			.net-macket-left {
				width: 100%;
				height: auto;
				padding-bottom: 40rpx;

				.left-second-title {
					font-size: 40rpx;
				}

				.left-small-title {
					display: flex;
					margin-top: 0;

					.first-title-box {
						width: 180rpx;
						height: 40rpx;
						line-height: 40rpx;
					}

					.second-title-box,
					.third-title-box {
						width: 150rpx;
						height: 40rpx;
						line-height: 40rpx;
					}

					.first-small-title,
					.second-small-title,
					.third-small-title {
						font-size: 16rpx
					}

					.title-date-box {
						margin-left: 20rpx;
						height: 40rpx;
						line-height: 40rpx;
						flex-wrap: wrap;

						.small-title-date {

							font-size: 22rpx;
							color: #999;
						}
					}
				}

				.left-warn {
					margin-top: 40rpx;
				}

				.left-intro {
					margin-top: 20rpx;
					width: 100%;

					.left-intro-text {
						font-size: 30rpx;
					}
				}

				.left-img-box {
					margin-top: 20rpx;

					.left-img {
						width: 370rpx;
						height: 470rpx;
						background-color: #999;
						margin: 0 auto;
						border-radius: 16rpx;
					
					}
				}
			}

			.net-macket-right {
				width: 100%;
				// height: 1760rpx;
				margin-left: 0;
				
				.right-btn-box {
					width: 100%;
					display: flex;
				}

				.right-macket-column {
					margin-top: 30rpx;

					.right-column-row1,
					.right-column-row2 {
						margin: 0 auto;
						margin-top: 20rpx;
					}
				}

				.right-column-list {
					padding-bottom: 20rpx;
				}
			}
		}
	}
</style>