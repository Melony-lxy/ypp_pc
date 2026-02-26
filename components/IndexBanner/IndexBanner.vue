<template>
	<view class="IndexBanner">
		<view class="special">
			<view class="hotspot">
				<view class="zone">
					<view>
						<image :src="globalstore.upImageuler('/static/index/zhuanqu.png?imageMogr2/thumbnail/x100')" webp mode="heightFix"></image>
					</view>
					<view class="list">
						<view v-for="(item,index) in zoneList" @click="onOpenHot(item.id)">
							<view>
								<image :src="globalstore.upImageuler(item.icon)" mode="aspectFit"></image>
								<view>{{item.name}}</view>
							</view>
							<uni-icons type="right" size="14" color="#ABABAB"></uni-icons>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="zone">
					<view>
						<image :src="globalstore.upImageuler('/static/index/zixun.png?imageMogr2/thumbnail/x100')" webp mode="heightFix"></image>
						<view @click="onPath()">
							查看更多 <uni-icons type="right" size="14" color="#ABABAB"></uni-icons>
						</view>
					</view>
					<view class="list">
						<view v-for="(item,index) in realList" @click="onPath(item.content.noticeLink)">
							<view>
								<view :style="{color: item.color}">{{index + 1}}</view>
								<view>{{item.content.noticeTitle}}</view>
							</view>
							<uni-icons type="right" size="14" color="#ABABAB"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="down">
				<view class="down-title">
					<view>得你所珍 藏你所爱</view>
					<view>汇聚资深藏家<span></span>提供鉴定护航<span></span>买卖便捷更安心</view>
				</view>
				<view class="down-code">
					<view>
						<image :src="globalstore.upImageuler('/static/download/maskcount.png?imageMogr2/thumbnail/x100')" webp mode="aspectFit"></image>
					</view>
					<view class="down-list">
						<view v-for="(item,index) in downList">
							<image :src="globalstore.upImageuler(item.icon)" mode="aspectFit"></image>
							<view>{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="banner">
			<view>
				<view class="banner-list anmination-left">
					<view v-for="(item,index) in bannerList.left" @click="is_show = true">
						<view v-html="item.html"></view>
						<image :src="globalstore.upImageuler(item.img + '?imageMogr2/thumbnail/x200')" webp mode="aspectFit"></image>
						<view class="more-hover">
							<view>
								查看更多 <uni-icons type="right" size="16" color="#A66506"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="banner-list anmination-right">
					<view v-for="(item,index) in bannerList.right" @click="is_show = true">
						<view v-html="item.html"></view>
						<image :src="globalstore.upImageuler(item.img + '?imageMogr2/thumbnail/x200')" webp mode="aspectFit"></image>
						<view class="more-hover">
							<view>
								查看更多 <uni-icons type="right" size="16" color="#A66506"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scan-to-down v-model:show="is_show"></scan-to-down>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		useGlobalStore
	} from '../../store/store'
	import ScanToDown from '../ScanToDown/ScanToDown.vue'
	import {
		hotlist2,
		noticList
	} from '../../api/common'

	const globalstore = useGlobalStore()

	const realList = ref([{
			id: '1',
			color: '#FF5500',
			content: {}
		},
		{
			id: '2',
			color: '#FF9000',
			content: {}
		},
		{
			id: '3',
			color: '#FFBF00',
			content: {}
		}
	])

	const downList = [{
			id: '1',
			title: 'App Store 内搜索“艺品品”下载',
			icon: '/static/index/apple.png'
		},
		{
			id: '2',
			title: '安卓应用市场内搜索“艺品品”下载',
			icon: '/static/index/android.png'
		},
		{
			id: '3',
			title: '华为应用市场内搜索“艺品品”下载',
			icon: '/static/index/huawei.png'
		}
	]

	const bannerList = {
		left: [{
				id: '1',
				html: '<span>全网</span>行情<br />一览无余',
				img: '/static/index/banner1.png'
			},
			{
				id: '2',
				html: '<span>专属</span>顾问<br />资产配置',
				img: '/static/index/banner2.png'
			},
			{
				id: '3',
				html: '<span>官方</span>寄售<br />交易无忧',
				img: '/static/index/banner3.png'
			},
			{
				id: '1',
				html: '<span>全网</span>行情<br />一览无余',
				img: '/static/index/banner1.png'
			},
			{
				id: '2',
				html: '<span>专属</span>顾问<br />资产配置',
				img: '/static/index/banner2.png'
			},
			{
				id: '3',
				html: '<span>官方</span>寄售<br />交易无忧',
				img: '/static/index/banner3.png'
			}
		],
		right: [{
				id: '1',
				html: '<span>智能</span>配号<br />助力增值',
				img: '/static/index/banner4.png'
			},
			{
				id: '2',
				html: '<span>号码</span>管家<br />一键入库',
				img: '/static/index/banner5.png'
			},
			{
				id: '3',
				html: '<span>AR</span>拍卖<br />触手可及',
				img: '/static/index/banner6.png'
			},
			{
				id: '1',
				html: '<span>智能</span>配号<br />助力增值',
				img: '/static/index/banner4.png'
			},
			{
				id: '2',
				html: '<span>号码</span>管家<br />一键入库',
				img: '/static/index/banner5.png'
			},
			{
				id: '3',
				html: '<span>AR</span>拍卖<br />触手可及',
				img: '/static/index/banner6.png'
			}
		]
	}

	const is_show = ref(false)
	const zoneList = ref([])

	const getHotList = () => {
		hotlist2().then(res => {
			const icons = ['/static/index/ma.png', '/static/index/she.png', '/static/index/long.png']
			zoneList.value = res.data.list.slice(0, 3).map((item, index) => ({
				...item,
				icon: icons[index]
			}))
		})

		noticList({
			pageNum: 0,
			pageSize: 15
		}).then(res => {
			const data = res.data.rows.slice(0, 3)
			data.forEach((item, index) => {
				realList.value[index].content = item
			})
			console.log(realList.value);
		})
	}

	const onOpenHot = (id) => {
		window.open('/#/pages/hotspot/hotspot?id=' + id, '_blank')
	}

	const onPath = (url) => {
		if(!url){
			window.open('/#/pages/hotNews/hotNews','_blank')
			return
		}
		window.open(url, '_blank')
	}

	onMounted(() => {
		getHotList()
	})
</script>

<style scoped lang="scss">
	@font-face {
		font-family: 'kuaikanshijieti';
		src: url('/static/font/kuaikanshijieti.ttf') format('truetype');
	}

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

	.IndexBanner {
		width: 100%;
		height: 952rpx;
		background: #FCF1E3;
		padding: 0 13.5%;
		box-sizing: border-box;
		@include row-center-between(0);

		@media screen and (max-width: 1600px) {
			padding: 0 8.5%;
		}

		.special {
			height: 100%;
			padding: 82rpx 0;
			box-sizing: border-box;
			@include row-center(100rpx);

			@media screen and (max-width: 1600px) {
				gap: 60rpx;
			}

			.hotspot {
				width: 420rpx;
				height: 100%;
				padding: 44rpx 24rpx;
				box-sizing: border-box;
				@include colum(44rpx);
				background-color: transparentize($color: #FFFFFF, $amount: 0.6);
				border-radius: 24rpx;

				.zone {
					@include colum(36rpx);

					>view:first-child {
						@include row-center-between(20rpx);

						>image {
							width: 144rpx;
							height: 34rpx;
						}

						>view {
							@include row-center(0);
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							cursor: pointer;
						}
					}

					.list {
						@include colum(48rpx);
						width: 100%;

						>view {
							@include row-center-between(10rpx);
							cursor: pointer;

							>view:first-child {
								@include row-center(8rpx);
								flex: 1;
								overflow: hidden;

								>image {
									width: 46rpx;
									height: 46rpx;
								}

								>view:first-child {
									width: 46rpx;
									height: 46rpx;
									box-sizing: border-box;
									border-radius: 50%;
									background: #FFEFD9;
									display: flex;
									align-items: center;
									justify-content: center;
									font-weight: 900;
									font-size: 32rpx;
									line-height: normal;
									color: #FF5500;

								}

								>view:last-child {
									flex: 1;
									font-weight: 400;
									font-size: 28rpx;
									line-height: 28rpx;
									color: #2C2E3A;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								}
							}
						}
					}

				}

				.line {
					display: block;
					width: 100%;
					height: 0px;
					box-sizing: border-box;
					border: 2rpx solid;
					border-image: linear-gradient(90deg, rgba(254, 249, 244, 1), rgba(255, 232, 200, 1), rgba(254, 249, 244, 1)) 1 1;
				}
			}

			.down {
				@include colum(60rpx);

				.down-title {
					>image {
						height: 180rpx;
						width: 978rpx;
					}

					>view:first-child {
						font-family: 'kuaikanshijieti';
						font-weight: 400;
						font-size: 100rpx;
						line-height: normal;
						color: #BF7D2B;

						@media screen and (max-width: 1600px) {
							font-size: 70rpx;
						}
					}

					>view:last-child {
						@include row-center(30rpx);
						font-weight: 300;
						font-size: 48rpx;
						color: #A66506;

						@media screen and (max-width: 1600px) {
							font-size: 32rpx;
						}

						>span {
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							background-color: #B97E29;
						}
					}
				}

				.down-code {
					@include row-center(28rpx);
					padding: 32rpx 24rpx;
					box-sizing: border-box;
					border-radius: 24rpx;
					background-color: transparentize($color: #FFFFFF, $amount: 0.5);

					>view:first-child {
						padding: 12rpx;
						box-sizing: border-box;
						background: #FFEACD;
						border-radius: 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.3s ease;

						&:hover {
							transform: translateY(-10rpx);
						}

						>image {
							width: 256rpx;
							height: 256rpx;

							@media screen and (max-width: 1600px) {
								width: 200rpx;
								height: 200rpx;
							}
						}
					}

					.down-list {
						@include colum(56rpx);

						@media screen and (max-width: 1600px) {
							gap: 30rpx;
						}

						>view {
							@include row-center(12rpx);

							>image {
								width: 32rpx;
								height: 32rpx;
							}

							>view {
								font-weight: 300;
								font-size: 30rpx;
								color: #A66506;
							}
						}
					}
				}
			}

		}

		.banner {
			@include row(128rpx);
			overflow: hidden;
			height: 100%;
			position: relative;

			@media screen and (max-width: 1600px) {
				gap: 30rpx;
			}

			&::before,
			&::after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				height: 40rpx;
				z-index: 1;
				pointer-events: none;
			}

			&::before {
				top: 0;
				background: linear-gradient(to bottom, #FCF1E3 0%, transparent 100%);
			}

			&::after {
				bottom: 0;
				background: linear-gradient(to top, #FCF1E3 0%, transparent 100%);
			}


			>view {
				height: 100%;
				overflow: hidden;

				.banner-list {
					@include colum(72rpx);

					&:hover {
						animation-play-state: paused;
					}

					>view {
						padding: 20rpx;
						box-sizing: border-box;
						background: #DFC9AE;
						border-radius: 24rpx;
						position: relative;
						cursor: pointer;

						>view {
							font-weight: 400;
							font-size: 32rpx;
							line-height: normal;
							color: #FFFFFF;
							font-family: 'kuaikanshijieti';

							::v-deep>span {
								color: #BF7D2B;
							}
						}

						>image {
							width: 296rpx;
							height: 290rpx;
						}

						.more-hover {
							display: none;
							position: absolute;
							width: 100%;
							left: 0;
							bottom: 0;
							height: 144rpx;
							background-color: red;
							border-radius: inherit;
							font-weight: 400;
							font-size: 32rpx;
							color: #A66506;
							align-items: flex-end;
							padding: 20rpx;
							box-sizing: border-box;
							background: linear-gradient(180deg, rgba(223, 201, 174, 0) 0%, #DFC9AE 100%);
							font-family: PingFang SC, PingFang SC;

							>view {
								width: 100%;
								@include row-center-between(0);
								justify-content: center;
							}
						}

						&:hover .more-hover {
							display: flex;
						}
					}

				}

				@keyframes seamlessUp {
					0% {
						transform: translateY(0);
					}

					100% {
						transform: translateY(calc(-50% - 36rpx));
					}
				}

				@keyframes seamlessDown {
					0% {
						transform: translateY(calc(-50% - 36rpx));
					}

					100% {
						transform: translateY(0);
					}
				}

				.anmination-left {
					animation: seamlessUp 14s linear infinite;
				}

				.anmination-right {
					animation: seamlessDown 14s linear infinite;
					animation-delay: -7s;
				}

			}


		}
	}
</style>