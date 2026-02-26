<template>
	<view class="container">
		<GlobalSidebar />
		<YppHeader :index="3" />
		<view class="download">
			<view class="down" :style="`background: url(${globalstore.upImageuler('/static/download/top.png')});`">
				<view class="down-title">
					<view>让藏品管理与交易前所未有的简单</view>
					<view>从识别、管理到交易，全面助力您的藏品升值之路</view>
					<view class="down-img">
						<view class="img-item">
							<view>
								<image :src="globalstore.upImageuler('/static/download/maskcount.png')" mode="widthFix"></image>
							</view>
							<view>艺品品APP下载二维码</view>
						</view>
					</view>
				</view>
				<view class="downRinght-img">
					<view class="img" style="z-index: 9;">
						<image :src="globalstore.upImageuler('/static/download/left.png')" mode="scaleToFill"></image>
					</view>
					<view class="img" style="z-index: 10;transform: translate(-240rpx,-200rpx);">
						<image :src="globalstore.upImageuler('/static/download/right.png')" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="body-top" :style="`background: url(${globalstore.upImageuler('/static/download/bgtop.png')});`">
				<view class="head">
					<view>让藏品价值被精准看见</view>
					<view></view>
					<view class="title">
						<view>智能配号</view>
						<view class="dian"></view>
						<view>趋势分析</view>
						<view class="dian"></view>
						<view>精准补缺，助您洞察升值潜力</view>
					</view>
				</view>
				<view class="domain">
					<view class="item" v-for="(item,index) in domainList" :key="index">
						<view class="img">
							<image :src="globalstore.upImageuler(item.imgurl)" mode="heightFix"></image>
						</view>
						<view>{{item.name}}</view>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="show" :style="`background: url(${globalstore.$dispose('/static/download/show.png')});`">
				<view class="head">
					<view>功能页面展示</view>
					<view></view>
					<view class="title">
						<view>功能清晰</view>
						<view class="dian"></view>
						<view>轻松上手</view>
					</view>
				</view>
				<view class="show-body">
					<view class="left">
						<view class="mark">
							<image :src="globalstore.upImageuler('/static/download/mark.png')" mode="widthFix"></image>
						</view>
						<view class="content">
							<view class="content-swiper" @click="topage">
								<swiper class="swiper" autoplay circular :current="showIndex" @change="changeShow">
									<swiper-item v-for="(item,index) in showList" :key="index">
										<view class="swiper-item" style="cursor: pointer;">
											<view class="swiper-item-text">
												<view>{{item.name}}</view>
												<view>{{item.title}}</view>
											</view>
											<image class="swiper-item-img" :src="globalstore.upImageuler(item.img)" mode=""></image>
										</view>

									</swiper-item>
								</swiper>
							</view>

							<view class="dots">
								<view class="line" v-for="(item,index) in showList.length" :key="index" @click="clickShow(index)"
									:class="{activeline : showIndex == index}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="commet" :style="`background: url(${globalstore.upImageuler('/static/download/comment.png')});`">
				<view class="head">
					<view>藏友评价</view>
					<view></view>
					<view class="title">
						<view>藏友口碑</view>
						<view class="dian"></view>
						<view>如实呈现</view>
					</view>
				</view>
				<view class="commet-content">
					<swiper autoplay circular style="height: 100%;" :current="commentIndex" @change="changComment">
						<swiper-item v-for="(item,index) in 3" :key="index">
							<view class="content">
								<view class="commet-item" v-for="item in 3">
									<view class="item-top">
										<view class="top">
											<view class="top-img">
												<image :src="globalstore.upImageuler('/static/download/Vector.png')" mode="widthFix"></image>
											</view>
											<view class="item-title">
												从拍照识别到入库寄售，一整套流程非常顺畅，几千张钞票都能轻松管理，真正解放双手，省时又省心。
											</view>
										</view>
										<view class="top-mall"></view>
									</view>
									<view class="item-bottom">
										<view>
											<image :src="globalstore.upImageuler('/static/profile.png')" mode="widthFix"></image>
										</view>
										<view>
											<view>龙钞玩家</view>
											<view>资生藏家></view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>

					</swiper>
				</view>
				<view class="dots">
					<view class="line" v-for="(item,index) in 3" :key="index" @click="clickComment(index)"
						:class="{activeline: commentIndex == index}"></view>
				</view>
			</view>
			<view class="root" :style="`background: url(${globalstore.upImageuler('/static/download/root.png')});`">
				<view>
					<image :src="globalstore.upImageuler('/static/download/bottomlogo.png')" mode="widthFix"></image>
				</view>
				<view>每一次收藏都是传承的开始</view>
				<view class="yellow">
					<view class="line"></view>
					<view>开启智慧藏品管理新体验，做更懂行的收藏家</view>
					<view class="line"></view>
				</view>
				<view class="taps">
					<view class="taps-item" v-for="(item,index) in bottomList" :key="index">
						<view>
							<image :src="globalstore.upImageuler(item.imgurl)" mode="widthFix"></image>
						</view>
						<view>{{item.name}}</view>
					</view>
				</view>
				<view class="code">
					<view class="code-item" v-for="(item,index) in codeList" :key="index">
						<view>
							<image :src="globalstore.upImageuler(item.code)" mode="widthFix"></image>
						</view>
						<view style="white-space: nowrap;">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<YppFooter />
	</view>
	
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useGlobalStore
	} from '../../store/store';

	const globalstore = useGlobalStore()

	const domainList = ref([{
		name: '一键拍照入库',
		title: '图像识别，自动提取号码信息，无需手动录入。批量入库，实现标签归档，真正让数字化藏品管理不再繁琐。',
		imgurl: '/static/download/photo.png'
	}, {
		name: '智能配号系统',
		title: '大数据算法，为您自动匹配所缺号码组合。平台同步趋势行情、稀缺指数及市场参考价，助您判断入手时机，把握升值机会。',
		imgurl: '/static/download/zhi.png'
	}, {
		name: '云端加密、寄售交易',
		title: '寄售仓库，系统自动展示实时市场价格与交易动态。平台采用银行级加密技术，确保信息与资金安全，安心又省心。',
		imgurl: '/static/download/yun.png'
	}])
	const bottomList = ref([{
		name: '一键查价',
		imgurl: '/static/download/mony.png'
	}, {
		name: '便捷管理',
		imgurl: '/static/download/manage.png'
	}, {
		name: '实时行情',
		imgurl: '/static/download/hang.png'
	}, {
		name: '安全保障',
		imgurl: '/static/download/an.png'
	}])
	const codeList = ref([{
		title: '艺品品APP下载二维码',
		code: '/static/download/maskcount.png'
	}, {
		title: '微信公众号二维码',
		code: '/static/download/gong.png'
	}])
	const showList = ref([{
		name: '识别号码精准报价！',
		title: '拍照或输入纪念钞号码，即可自动识别，系统同步更新数据库，提供精准报价，并智能匹配该号码的收藏标签（如顺子号、豹子号、生日号等）。不仅快速得知其价值，还能了解该号码在市场中的稀缺度与受欢迎程度，轻松掌握买卖决策依据。',
		img: '/static/images/download/Group 318.png'
	}, {
		name: '行情速递，一览动向！',
		title: '实时汇聚用户发布的龙钞、蛇钞以及贵金属纪念币的交易帖子，搭配权威价格区间表，助你把握市场脉动，发现潜在价值。无论是买入还是出手，一眼看清行情，决策快人一步。',
		img: '/static/images/download/Group 319.png'
	}, {
		name: '全同号大盘，尽览行情全貌！',
		title: '专为龙钞、蛇钞全同号打造的大盘页面，实时呈现最新成交价、最高/最低价、昨收与今开数据，配套专业K线图走势分析，助你洞察价格趋势。页面同步展示最新成交列表， 快速掌握市场流动性， 同时提供全同号求购与出售价格排序表， 买卖意向一目了然， 让你高效对接需求， 把握最佳交易窗口。 ',
		img: '/static/images/download/Group 322.png'
	}, {
		name: '智能仓库，轻松管理，惊喜配对！',
		title: '将你的龙钞与蛇钞一键录入个人专属仓库，系统自动识别号码尾8位，精准匹配配对关系——当龙蛇钞尾8相同时，即提示“八同号配对成功”，收藏价值瞬间跃升！支持随时增删查改， 结构清晰、 分类明确， 让你轻松管理所有钞票藏品， 配号、 补漏、 规划一步到位， 打造专属于你的智能收藏空间。 ',
		img: '/static/images/download/Group 324.png'
	}])
	const showIndex = ref(0)
	const commentIndex = ref(0)

	const clickShow = (index) => {
		showIndex.value = index
	}
	const changeShow = (e) => {
		showIndex.value = e.detail.current
	}

	const clickComment = (index) => {
		commentIndex.value = index
	}
	const changComment = (e) => {
		commentIndex.value = e.detail.current
	}
	const topage = () => {
		uni.navigateTo({
			url: '/pages/display/display'
		})
	}
</script>

<style scoped lang="scss">
	.container {

		.download {
			.down {
				width: 100%;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				padding: 10.20833% 13.5% 6.14583% 13.5%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				@media (max-width:960px) {
					padding: 20rpx;
					flex-direction: column;
				}

				.down-title {
					width: 46.803%;

					@media (max-width:960px) {
						width: 100%;
					}

					>view:first-child {
						font-weight: normal;
						font-size: 128rpx;

						@media (max-width:960px) {
							font-size: 36rpx;
						}
					}

					>view:nth-child(2) {
						font-weight: 300;
						font-size: 58rpx;
						margin: 30rpx 0 74rpx 0;

						@media (max-width:960px) {
							font-size: 30rpx;
							margin: 30rpx 0;
						}
					}

					.down-img {
						display: flex;

						@media (max-width:960px) {
							justify-content: center;
						}

						.img-item {
							display: flex;
							flex-direction: column;
							align-items: center;

							>view:first-child {
								display: flex;
								width: 28.964%;
								width: 380rpx;
								// aspect-ratio: 1/1;
								padding: 20rpx;
								box-sizing: border-box;
								background: #FFE2CD;
								border-radius: 20rpx;
								transition: all 1s ease;

								&:hover {
									transform: translateY(-20rpx) scale(1.01);
								}

								image {
									width: 100%;
								}
							}

							>view:last-child {
								font-weight: 300;
								font-size: 32rpx;
								margin-top: 16rpx;

								@media (max-width:960px) {
									font-size: 30rpx;
								}
							}
						}


					}

				}

				.downRinght-img {
					width: 50.44%;
					display: flex;

					@media (max-width:960px) {
						width: 100%;
						transform: translate(30px, 100px);
						display: none;
					}

					.img {
						width: 50.2243%;
						aspect-ratio: 0.5461538/1;

						image {
							width: 100%;
							height: 100%;
						}
					}

				}
			}

			.body-top {
				width: 100%;
				background-size: 100% 100%;
				padding: 3.125% 13.5% 8.80283% 13.5%;
				box-sizing: border-box;

				@media (max-width:960px) {
					padding: 20rpx;
				}

				.head {

					display: flex;
					flex-direction: column;
					align-items: center;

					>view:first-child {
						font-size: 68rpx;
						font-weight: 500;

						@media (max-width:960px) {
							font-size: 36rpx;
						}
					}

					>view:nth-child(2) {
						width: 27.112%;
						border: 2rpx solid #000;
						margin: 16rpx 0;

						@media (max-width:960px) {
							width: 60%;
						}
					}

					.title {
						font-size: 32rpx;
						color: #656565;
						display: flex;
						align-items: center;

						@media (max-width:960px) {
							font-size: 28rpx;
						}

						.dian {
							width: 8rpx;
							height: 8rpx;
							background-color: #2C2E3A;
							margin: 0 16rpx;

							@media (max-width:960px) {
								width: 6rpx;
								height: 6rpx;
								margin: 0 8rpx;
							}
						}
					}
				}

				.domain {
					margin-top: 202rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;

					@media (max-width:960px) {
						margin-top: 20rpx;
						flex-wrap: wrap;
					}

					.item {
						background: rgba(255, 255, 255, 0.3);
						box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.08);
						border-radius: 32rpx;
						width: 29.96524%;
						aspect-ratio: 0.83499/1;
						padding: 5.6364% 1.2843% 5.708% 0.85615%;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						transition: all 1s ease;

						&:hover {
							transform: translateY(-20rpx) scale(1.01);
						}

						@media (max-width:960px) {
							width: 48%;
							margin: 10rpx 0;
						}

						.img {
							height: 37.791%;

							image {
								height: 100%;
							}
						}

						>view:nth-child(2) {
							margin-top: 142rpx;
							margin-bottom: 40rpx;
							font-size: 56rpx;
							font-weight: 600;

							@media (max-width:960px) {
								margin-top: 40rpx;
								margin-bottom: 30rpx;
								font-size: 32rpx;
							}
						}

						>view:last-child {
							font-weight: 300;
							font-size: 36rpx;

							@media (max-width:960px) {
								font-size: 30rpx;
							}
						}
					}
				}
			}

			.show {
				width: 100%;
				background-size: 100% 100%;
				padding: 3.125% 13.5% 6.25% 13.5%;
				box-sizing: border-box;

				@media (max-width:960px) {
					padding: 20rpx;
				}

				.head {

					display: flex;
					flex-direction: column;
					align-items: center;

					>view:first-child {
						font-size: 68rpx;
						font-weight: 500;

						@media (max-width:960px) {
							font-size: 36rpx;
						}
					}

					>view:nth-child(2) {
						width: 17.4084%;
						border: 2rpx solid #000;
						margin: 16rpx 0;

						@media (max-width:960px) {
							width: 36%;
						}
					}

					.title {
						font-size: 32rpx;
						color: #656565;
						display: flex;
						align-items: center;

						@media (max-width:960px) {
							font-size: 28rpx;
						}

						.dian {
							width: 8rpx;
							height: 8rpx;
							background-color: #2C2E3A;
							margin: 0 16rpx;

							@media (max-width:960px) {
								width: 6rpx;
								height: 6rpx;
								margin: 0, 8rpx;
							}
						}
					}
				}

				.show-body {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;

					@media (max-width:960px) {
						flex-direction: column;
					}

					.left {
						// width: 60%;
						width: 100%;
						display: flex;
						justify-content: space-between;

						@media (max-width:960px) {
							width: 100%;
						}

						.mark {
							width: 6.849168%;
							margin-top: 450rpx;

							@media (max-width:960px) {
								display: none;
							}

							image {
								width: 100%;
							}
						}

						.content {
							// width: 100%;
							width: 91.00346%;
							transform: translateY(120rpx);
							display: flex;
							flex-direction: column;

							@media (max-width:960px) {
								width: 100%;
								transform: translateY(0);
							}

							.content-swiper {
								display: flex;
								width: 100%;
								aspect-ratio: 4/1;
								// min-height: 500rpx;
								min-height: 1500rpx;

								@media (max-width:960px) {
									min-height: 400rpx;

								}

								.swiper {
									width: 100%;
									height: 100%;

									.swiper-item {
										display: flex;

										@media (max-width: 960px) {
											flex-direction: column;
										}

										.swiper-item-text {
											width: 56.21105%;
											height: 100%;
											margin-top: 450rpx;

											@media (max-width: 960px) {
												margin: 0;
												width: 100%;
											}

											>view:first-child {
												font-size: 80rpx;
												color: #000;
												font-weight: 500;

												@media (max-width:960px) {
													font-size: 32rpx;
												}
											}

											>view:last-child {
												font-weight: 300;
												font-size: 40rpx;
												color: #000000;
												margin-top: 40rpx;

												@media (max-width:960px) {
													font-size: 30rpx;
													margin-top: 20rpx;
												}
											}
										}

										.swiper-item-img {
											width: 499.55px;
											height: 695px;

											@media (max-width: 960px) {
												width: 100%;
												display: none;
											}
										}
									}

								}
							}

							.dots {

								display: flex;
								align-items: center;

								@media (max-width:960px) {
									justify-content: center;
								}

								.line {
									margin-right: 60rpx;
									width: 5.31%;
									height: 16rpx;
									background: #FFC400;
									border-radius: 24rpx;
									opacity: 0.2;
									cursor: pointer;
								}

								.activeline {
									opacity: 1;
								}
							}

						}
					}

				}
			}

			.commet {
				width: 100%;
				background-size: 100% 100%;
				padding: 3.125% 13.5% 2.448% 13.5%;
				box-sizing: border-box;

				@media (max-width:960px) {
					padding: 20rpx;
				}

				.head {

					display: flex;
					flex-direction: column;
					align-items: center;

					>view:first-child {
						font-size: 68rpx;
						font-weight: 500;

						@media (max-width:960px) {
							font-size: 36rpx;
						}
					}

					>view:nth-child(2) {
						width: 12.5569%;
						border: 2rpx solid #000;
						margin: 16rpx 0;

						@media (max-width:960px) {
							width: 26%;
						}
					}

					.title {
						font-size: 32rpx;
						color: #656565;
						display: flex;
						align-items: center;
						font-size: 28rpx;

						.dian {
							width: 8rpx;
							height: 8rpx;
							background-color: #2C2E3A;
							margin: 0 16rpx;
						}
					}
				}

				.commet-content {
					margin-top: 130rpx;
					width: 100%;
					aspect-ratio: 4/1;
					min-height: 684rpx;

					@media (max-width:960px) {
						margin-top: 20rpx;
						min-height: 800rpx;
					}

					.content {
						width: 100%;
						display: flex;
						justify-content: space-between;
						height: 100%;

						@media (max-width:960px) {
							flex-direction: column;
						}

						.commet-item {
							width: 31.3922%;

							@media (max-width:960px) {
								width: 100%;
								margin: 10rpx 0;
							}

							.item-top {
								width: 100%;

								.top {
									background-color: #fff;
									border-radius: 32rpx;
									width: 100%;
									padding: 0.91% 4.091% 15.68182% 4.091%;
									box-sizing: border-box;

									@media (max-width:960px) {
										padding: 20rpx;
									}

									.top-img {
										width: 10%;
										aspect-ratio: 1.184211/1;

										@media (max-width:960px) {
											display: none;
										}

										image {
											width: 100%;
										}
									}

									.item-title {
										margin-top: 10.3960396%;
										font-weight: 300;
										font-size: 36rpx;

										@media (max-width:960px) {
											margin: 0;
											font-size: 28rpx;
										}
									}
								}

								.top-mall {
									margin-left: 10.3960396%;
									width: 0;
									height: 0;
									border-left: 40rpx solid transparent;
									border-right: 40rpx solid transparent;
									border-top: 40rpx solid #fff;

									/* 上边框实色 */
									@media (max-width:960px) {
										border-left: 20rpx solid transparent;
										border-right: 20rpx solid transparent;
										border-top: 20rpx solid #000;
										/* 上边框实色 */
									}
								}
							}

							.item-bottom {
								margin-top: 18rpx;
								display: flex;
								align-items: center;

								@media (max-width: 960px) {
									margin-top: 10rpx;
								}

								>view:first-child {
									margin-left: 6%;
									width: 18.86363636%;
									aspect-ratio: 1/1;
									display: flex;
									align-items: center;
									margin-right: 16rpx;

									@media (max-width: 960px) {
										margin-left: 50rpx;
										width: 12%;
									}

									image {
										width: 100%;
										border-radius: 50%;
									}
								}

								>view:last-child {
									>view:first-child {
										font-size: 40rpx;
										font-weight: 600;
										margin-bottom: 6rpx;

										@media (max-width: 960px) {
											font-size: 32rpx;
										}
									}

									>view:last-child {
										font-weight: 300;

										@media (max-width: 960px) {
											font-size: 28rpx;
										}
									}
								}
							}
						}
					}
				}

				.dots {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 120rpx;

					.line {
						margin: 0 30rpx;
						width: 2.7%;
						height: 16rpx;
						background: #FFC400;
						border-radius: 24rpx;
						opacity: 0.2;
						cursor: pointer;
					}

					.activeline {
						opacity: 1;
					}
				}
			}

			.root {
				width: 100%;
				padding: 4.374% 13.5% 6.25%;
				box-sizing: border-box;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				flex-direction: column;

				@media (max-width: 960px) {
					padding: 20rpx;
				}

				>view:first-child {
					width: 6.84919778%;
					aspect-ratio: 1/1;
					transition: all 1s ease;

					&:hover {
						transform: translateY(-20rpx) scale(1.01);
					}

					@media (max-width: 960px) {
						width: 20%;
					}

					image {
						width: 100%;
						aspect-ratio: 1/1;
					}
				}

				>view:nth-child(2) {
					margin: 16rpx 0 28rpx 0;
					font-weight: 300;
					color: #000000;

					@media (max-width: 960px) {
						margin: 10rpx;
					}
				}

				.yellow {
					font-size: 32rpx;
					font-weight: 500;
					color: #BF7D2B;
				}

				.taps {
					margin: 52rpx 0 100rpx 0;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;

					@media (max-width: 960px) {
						justify-content: space-between;
						margin: 20rpx;
						font-size: 30rpx;
					}

					.taps-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 0 70rpx;

						@media (max-width: 960px) {
							margin: 0;
						}

						>view:first-child {
							width: 112rpx;
							aspect-ratio: 1/1;
							transition: all 1s ease;

							&:hover {
								transform: translateY(-20rpx) scale(1.1);
							}

							image {
								width: 100%;
								aspect-ratio: 1/1;
							}
						}
					}
				}

				.code {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					font-size: 32rpx;
					font-weight: 300;

					@media (max-width: 960px) {
						justify-content: space-between;
						font-size: 30rpx;
					}

					.code-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 13.57%;
						margin: 0 15.7%;

						@media (max-width: 960px) {
							width: 48%;
							margin: 0;

						}

						>view:first-child {
							width: 100%;
							// aspect-ratio: 1/1;
							display: flex;
							background-color: #FFE2CD;
							border-radius: 20rpx;
							padding: 18rpx;
							box-sizing: border-box;
							margin-bottom: 16rpx;
							transition: all 1s ease;

							&:hover {
								transform: translateY(-20rpx) scale(1.01);
							}

							image {
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>