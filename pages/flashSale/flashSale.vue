<template>
	<view class="flashSale">
		<uni-icons type="home" size="28" class="back" color="#2c2e3a" @click="onHome"></uni-icons>
		<view class="bannar">
			<image :src="globalstore.upImageuler('/static/flash/box.png')"
				@click="lookImageLsit(globalstore.upImageuler('/static/flash/box.png'))" mode="aspectFit"></image>
			<view class="bannar-detail">
				<view class="newRrice">
					<view><span>¥</span>{{info.transactionUnitPrice}}</view>
					<view>日常价:¥{{info.referenceTotalPrice}}</view>
				</view>
				<view class="skill">
					<image :src="globalstore.upImageuler('/static/flash/skills.png')" mode="aspectFit"></image>
					<view class="progress">
						<view class="line"
							:style="{'--width':`${(info.identifyQuantity/info.souvenirCoinNumber*100).toFixed(2)}%`}"></view>
						<view>还剩{{info.identifyQuantity}}件</view>
					</view>
				</view>
			</view>
			<view class="heading">
				<view>{{info.productName}}</view>
				<image src="/static/flash/free.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="content">
			<view class="rules">
				<view>活动规则</view>
				<view class="center-rlues">
					<view>核心规则</view>
					<view>本商品为福利特惠，每位用户仅限购买1件</view>
				</view>
				<view class="tap-rules">
					<view>•同一手机号、同一收货地址、同一P视为同一用户。</view>
					<view>•秒杀商品数量有限，抢完即止。</view>
					<view>•若发现恶意刷单行为，平台有权取消订单。</view>
					<view>•支付成功后将在2026年1月18日之前发货。</view>
				</view>
			</view>
			<view class="details">
				<view>商品详情</view>
				<view class="imglist">
					<image v-for="(item,index) in imgList" :src="globalstore.upImageuler(item)"
						@click="lookImageLsit(imgList,index)" mode="widthFix"></image>
				</view>
			</view>
		</view>

	</view>
	<view class="button">
		<view>当前活动<span>每人限购1件</span></view>
		<button @click="modal.show = true" v-if="info.identifyQuantity !== 0">立即抢购</button>
		<button nohave v-else>已抢光</button>
	</view>
	<PopupModal :show="modal.show" title="是否打开APP立即抢购" @close="modal.onClose()" @suer="modal.onSuer()"></PopupModal>
</template>

<script setup>
	import {
		useGlobalStore
	} from '../../store/store';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		details
	} from '../../api/common';
	import {
		lookImageLsit
	} from '../../utils/common';

	const globalstore = useGlobalStore()
	const info = ref(null)
	const imgList = ['/static/flash/info1.png', '/static/flash/info2.png', '/static/flash/info3.png']

	const modal = ref({
		show: false,
		onClose() {
			this.show = false
		},
		onSuer() {
			this.onClose()
			open()
		}
	})

	const open = () => {
		const data = window.OpenInstall.parseUrlParams()
		let url = '/pages/member/seckillDetail/seckillDetail'
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

	const onHome = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}

	const getDetail = () => {
		details(10758).then(res => {
			info.value = res.data
		})
	}

	onMounted(() => {
		getDetail()
	})
</script>

<style scoped lang="scss">
	.flashSale {
		width: 100%;
		background: #F8F8F8;
		min-height: 100vh;
		padding-bottom: 172rpx;

		.back {
			position: fixed;
			top: 20rpx;
			left: 20rpx;
			z-index: 10;
		}

		.bannar {
			width: 100%;

			>image {
				width: 100%;
				height: 576rpx;
			}

			.bannar-detail {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 28rpx 32rpx;
				box-sizing: border-box;
				width: 100%;
				height: 108rpx;
				// background-image: url('/static/flash/bgimg.png');
				background-image: url('#{$url}/static/flash/bgimg.png');
				background-repeat: no-repeat;
				background-position: left;
				background-size: 100% 100%;
				transform: translateY(-24rpx);

				.newRrice {
					display: flex;
					align-items: center;

					>view:first-child {
						font-weight: bold;
						font-size: 52rpx;
						color: #FFFFFF;
						line-height: 48rpx;

						>span {
							font-weight: 600;
							font-size: 32rpx;
							color: #FFFFFF;
							line-height: 24rpx;
						}
					}

					>view:last-child {
						font-weight: 400;
						font-size: 26rpx;
						color: #FFFFFF;
						line-height: unset;
						text-decoration: solid line-through #FFFFFF;
						text-decoration-thickness: 1.5px;
					}
				}

				.skill {
					display: flex;
					align-items: center;
					gap: 10rpx;

					>image {
						width: 142rpx;
						height: 46rpx;
					}

					.progress {
						display: flex;
						flex-direction: column;
						gap: 10rpx;
						font-weight: 400;
						font-size: 24rpx;
						color: #FF5500;
						line-height: 24rpx;

						.line {
							width: 148rpx;
							height: 8rpx;
							background: #84839E;
							border-radius: 8rpx;
							position: relative;

							&::before {
								content: '';
								position: absolute;
								width: var(--width);
								left: 0;
								top: 0;
								height: inherit;
								border-radius: inherit;
								background-color: #FF5500;
							}
						}
					}
				}

			}

			.heading {
				display: flex;
				flex-direction: column;
				gap: 10rpx;
				padding: 0 28rpx 22rpx;

				>view {
					font-weight: 500;
					font-size: 32rpx;
					color: #2C2E3A;
					line-height: 44rpx;
				}

				>image {
					width: 238rpx;
					height: 34rpx;
				}
			}
		}

		.content {
			padding: 0 28rpx 20rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20rpx;

			.rules {
				display: flex;
				flex-direction: column;
				padding: 28rpx 16rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 12rpx;

				>view:first-child {
					font-weight: 400;
					font-size: 28rpx;
					color: #ABABAB;
					line-height: 28rpx;
				}

				.center-rlues {
					display: flex;
					align-items: center;
					gap: 10rpx;
					padding: 16rpx 10rpx;
					box-sizing: border-box;
					background: #FFF7F4;
					border-radius: 8rpx;
					margin: 12rpx 0 8rpx;

					>view:first-child {
						padding: 10rpx 12rpx;
						box-sizing: border-box;
						font-weight: 400;
						font-size: 26rpx;
						color: #FFFFFF;
						line-height: 26rpx;
						background: linear-gradient(90deg, #FF8E26 0%, #FF5500 100%);
						border-radius: 8rpx;
					}

					>view:last-child {
						font-weight: 400;
						font-size: 26rpx;
						color: #FF5500;
						line-height: 26rpx;
					}
				}

				.tap-rules {
					font-weight: 400;
					font-size: 26rpx;
					color: #2C2E3A;
					line-height: 46rpx;
				}
			}

			.details {
				padding: 36rpx 16rpx 46rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 12rpx;
				display: flex;
				flex-direction: column;
				gap: 18rpx;
				width: 100%;

				>view:first-child {
					font-weight: 500;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
				}

				.imglist {
					display: flex;
					flex-direction: column;
					width: 100%;
					gap: 20rpx;

					>image {
						width: 100%;
					}
				}
			}
		}

	}

	.button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20rpx 28rpx 68rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0rpx -1rpx 0rpx 0rpx #EBEBEB;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 48rpx;

		>view:first-child {
			font-weight: 400;
			font-size: 26rpx;
			color: #ABABAB;
			line-height: 26rpx;

			>span {
				color: #FF5500;
			}
		}

		>button::after {
			display: none;
		}

		>button {
			flex: 1;
			margin: inherit;
			padding: 20rpx;
			font-weight: 600;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
			box-sizing: border-box;
			background: #FF5500;
			border-radius: 200rpx;
		}

		[nohave] {
			background-color: #ABABAB;
		}
	}
</style>