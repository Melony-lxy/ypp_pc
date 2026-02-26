<template>
	<view class="goodstree">

		<view v-if="coinList" v-for="(_item, _i) in coinList" :key="`pro-${_i}`" class="coin-panel">
			<view class="coin-item">
				<view class="img-box">
					<image :src="_item.imageUrl" mode="aspectFit"></image>
				</view>
				<view class="coin-right">
					<view class="coin-name">{{ _item.specificationsName }}</view>
				</view>
			</view>
			<view class="c-body">
				<view class="arg-row">
					<view class="col col-1">
						<view class="label">装帧类型</view>
						<view class="value">{{ MAP_TYPE[_item.packageType || 0] }}</view>
					</view>
					<view class="col col-2">
						<view class="label">评级级别</view>
						<view class="value">
							{{ (_item.packageType == 1 ? _item.packageCompany : _item.packageRating) || '无评级' }}
						</view>
					</view>
					<view class="col col-3" v-if="_item.certificateNo&&_item.certificateNo.split('、').length <= 3">
						<view class="label">证书编号</view>
						<view class="value">{{ _item.certificateNo ? _item.certificateNo : '无证书编号' }}</view>
					</view>
				</view>
				<view class="arg-row" style="margin-top: 14rpx;"
					v-if="_item.certificateNo&&_item.certificateNo.split('、').length > 3">
					<view class="col col-3">
						<view class="label">证书编号</view>
						<view class="value">{{ _item.certificateNo ? _item.certificateNo : '无证书编号' }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mark" v-if="markInfo">
			<view class="sub-desc">{{ pageType == 1 ? '出售' : '求购'}}冠号标签</view>
			<view class="mark-panel">
				<view class="mark-info">{{ markInfo }}</view>
				<view class="price-cell"><text class="label">单价：</text><text class="price">¥<slot name="markUnitPrice">
						</slot></text></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';


	const props = defineProps({
		coinList: {
			type: Array,
			default: function() {
				return []
			}
		},
		labelInfos: {
			type: Array,
			default: function() {
				return []
			}
		},
		pageType: {
			type: Number,
			default: 1 //1:求购 2:出售
		}
	})
	const MAP_TYPE = ref({
		0: '无封装',
		1: '封装',
		2: '评级',
	})

	const markInfo = computed(() => {
		return props.labelInfos.map(item => item.name).join('、')
	})
</script>

<style scoped lang="scss">
	.goodstree {

		.coin-panel {
			background: #FFF8EE;
			border-radius: 24rpx;
			overflow: hidden;
			margin-bottom: 20rpx;

			.c-body {
				background: #FFFFFF;
				border-radius: 12rpx;
				margin: 0 16rpx 20rpx;
				padding: 24rpx 20rpx;
			}

			.arg-row {
				display: flex;

				.col {
					font-size: 24rpx;
					margin-right: 40rpx;

					.label {
						color: #ABABAB;
					}

					.value {
						color: #2C2E3A;
					}
				}

				.col-3 {
					flex: 1;
				}
			}

			.coin-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;


				.img-box {
					width: 76rpx;
					height: 76rpx;
					border-radius: 12rpx;
					margin-right: 16rpx;

					image {
						margin: 0 auto;
						max-height: 100%;
						max-width: 100%;
					}
				}

				.coin-right {
					flex: 1;
				}

				.coin-name {
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: 38rpx;
				}

				.select-link {
					font-size: 24rpx;
					color: #BF7D00;
					padding: 5rpx 0;

					.uniui-right {
						vertical-align: middle;
						margin-top: -5rpx;
					}
				}
			}
		}


		.mark {
			.sub-desc {
				color: #ABABAB;
				font-weight: 600;
				font-size: 28rpx;
				margin-bottom: 12rpx;
				margin-top: 20rpx;
			}

			.mark-panel {
				background: #FFF8EE;
				border-radius: 16rpx;
				padding: 20rpx;
				margin-bottom: 10rpx;

				.mark-info {
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 40rpx;
					margin-bottom: 14rpx;
				}

				.price-cell {
					.label {
						font-weight: 400;
						font-size: 28rpx;
						color: #656565;
					}

					.price {
						font-weight: 600;
						font-size: 28rpx;
						color: #FF5500;
					}
				}
			}

		}

	}
</style>