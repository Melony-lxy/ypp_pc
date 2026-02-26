<template>
	<view class="PopupType" :class="{AcivePopupType: show}">
		<view class="lable-top">
			<view>请选择装帧类型</view>
			<view @click="close">
				<image src="/static/close.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="content">
			<view class="top">{{ goodsName }}</view>
			<view class="center">
				<view>装帧类型</view>
				<view class="centerH">
					<view v-for="(item,index) in packageList" :class="{active: packageId == item.id}"
						:style="{position: packageId == '0' ? 'static' : 'relative' }" :key="item.id" @click="onPackage(item.id)">
						{{item.name}}</view>
				</view>
				<view class="centerTitle" v-if="packageId == '1'">
					<view class="title">
						<view v-for="(item,index) in typeList" :class="{active: index == typeId}" @click="onType(item, index)">
							{{item.name}}</view>
					</view>
				</view>
				<view class="centerTitle" v-if="packageId == '2'">
					<view class="title">
						<view v-for="(item,index) in typeList" :class="{active: index == typeId}" @click="onType(item, index)">
							{{item.name}}</view>
					</view>
					<view class="title">
						<view v-for="(item,index) in typeList[typeId].list1" :class="{active: item.name == nameN}"
							@click="onName(item.name, index)">{{item.name}}</view>
					</view>
				</view>
				<view class="certificate">
					<view class="certificate-top">
						<view>证书情况</view>
						<view class="have" :class="{active: haveT == '有证书'}" @click="onHave('有证书')">有证书</view>
						<view class="have" :class="{active: haveT == '无证书'}" @click="onHave('无证书')">无证书</view>
					</view>
					<view v-if="haveT=='有证书'">
						<view class="certificate-bottom">
							<view>
								<radio borderColor="#2C2E3A" activeBorderColor='#FFC400' activeBackgroundColor='#FFC400'
									style="transform: scale(0.6);" :checked="isSame" @click="onSame"></radio>
							</view>
							<view style="margin-left: -6rpx;">套内各币同号</view>
						</view>
						<view class="cerInput">
							<view class="input" v-for="(item,index) in certifList" :key="index">
								<view> 丨 </view>
								<input v-model="item.value" type="number" @confirm="onAdd" style="font-size: 13px;width: 100%;"
									placeholder="请输入证书编号" placeholder-style="color: #ABABAB;font-size: 13px;" focus
									@focus="(event)=>onfocus(event,index)">
								<view style="display: flex;align-items: center;margin-right: 10rpx;cursor: pointer;"
									@click="onClear(index)">
									<uni-icons v-if="item.value" type="clear" size="24"
										:color="focusIndex == index ? '#FFC400' : '#c0c4cc'"></uni-icons>
								</view>
							</view>
							<view class="input" style="justify-content: center;color: #ABABAB;cursor: pointer;" @click="onAdd">
								<view style="width: 13px;display: flex;align-items: center;">
									<image style="width: 100%;" src="/static/jia.png" mode="widthFix"></image>
								</view>
								<view>添加证书</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="radio">
				<view>
					<radio borderColor="#2C2E3A" activeBorderColor='#FFC400' activeBackgroundColor='#FFC400'
						style="transform: scale(0.6);" :checked="isOption" @click="onOption"></radio>
				</view>
				<view style="margin-left: -6rpx;">选项匹配到所有纪念币选择</view>
			</view>
			<view class="bottom" @click="sure">确定</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const props = defineProps({
		typeList: {
			type: Array,
			default: []
		},
		show: {
			type: Boolean,
			default: false
		},
		goodsName: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['close', 'suer'])

	const packageList = ref([{
		id: '0',
		name: '非封装'
	}, {
		id: '1',
		name: '封装'
	}, {
		id: '2',
		name: '评级'
	}])
	const packageId = ref('0')
	const typeId = ref(-1)
	const nameN = ref('')
	const haveT = ref('无证书')
	const isSame = ref(false)
	const isOption = ref(false)
	const certifList = ref([{
		value: ''
	}])
	const focusIndex = ref(0)
	const ratingCode = ref(-1)
	const companyCode = ref('')
	const onPackage = (id) => {
		packageId.value = id
	}

	const onType = (item, index) => {
		typeId.value = index
		companyCode.value = item.id
		nameN.value = ''
	}

	const onName = (name, index) => {
		nameN.value = name
		ratingCode.value = index
	}

	const onHave = (title) => {
		haveT.value = title
		certifList.value = [{value: ''}]
		isSame.value = false
	}

	const onSame = () => {
		isSame.value = !isSame.value
	}

	const onOption = () => {
		isOption.value = !isOption.value
	}

	const onAdd = () => {
		certifList.value.push({
			value: ''
		})
	}

	const onClear = (index) => {
		certifList.value.splice(index, 1)
	}

	const onfocus = (e, index) => {
		focusIndex.value = index
	}

	const close = () => {
		emit('close', false)

		setTimeout(() => {
			packageId.value = '0'
			typeId.value = -1
			nameN.value = ''
			haveT.value = '无证书'
			isSame.value = false
			isOption.value = false
			focusIndex.value = 0
			certifList.value = [{
				value: ''
			}]
		},)
	}

	const sure = () => {
		const list = {
			typeId: Number(packageId.value) + 1,
			type: packageList.value[+packageId.value].name,
			have: haveT.value,
			packageType: typeId.value !== -1 ? props.typeList[typeId.value].name : '',
			packageItem: nameN.value,
			isSame: isSame.value,
			isOption: isOption.value,
			numberList: certifList.value.map(item=>item.value),
			companyId: typeId.value == 0 ? 0 : typeId.value + 1,
			ratingCode: ratingCode.value + 1,
			companyCode: companyCode.value
		}

		emit('suer', list)
		close()
	}
	const reset = () => {
		packageId.value = '0'
		typeId.value = 0
		nameN.value = ''
		haveT.value = '无证书'
		isSame.value = false
		isOption.value = false
		focusIndex.value = 0
		certifList.value = [{
			value: ''
		}]
	}
	defineExpose({
		reset
	})
</script>

<style scoped lang="scss">
	.AcivePopupType {
		right: 13.5% !important;
	}

	.PopupType {
		position: fixed;
		right: -100%;
		top: 172rpx;
		// width: 19.53125%;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		min-height: 1440rpx;
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47, 83, 109, 0.08);
		border-radius: 16rpx;
		box-sizing: border-box;
		transition: all 1s ease;
		padding: 32rpx 28rpx;
		z-index: 10;

		.lable-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			>view:first-child {
				margin-left: 14rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
			}

			>view:last-child {
				width: 36rpx;
				display: flex;
				align-items: center;

				image {
					width: 100%;
					cursor: pointer;
				}
			}
		}

		.content {

			.top {
				background: #FFFFFF;
				border-radius: 12rpx;
				padding: 14rpx 24rpx;
				box-sizing: border-box;
				font-size: 26rpx;
				color: #ababab;
				margin-bottom: 20rpx;
			}

			.center {
				background: #FFFFFF;
				border-radius: 12rpx;
				box-sizing: border-box;
				padding: 28rpx 24rpx;

				>view:first-child {
					font-weight: 600;
					margin-bottom: 24rpx;
				}

				.centerH {
					display: flex;
					align-items: center;
					gap: 20rpx;

					>view {
						padding: 12rpx 28rpx;
						box-sizing: border-box;
						font-size: 26rpx;
						background: #F8F8F8;
						border-radius: 12rpx;
						cursor: pointer;
					}

					.active {
						background: #FFF0DC;
						color: #BF7D2B;
						font-weight: 600;

						&::after {
							content: '';
							position: absolute;
							left: 50%;
							bottom: -24rpx;
							transform: translateX(-50%);
							border-left: 22rpx solid transparent;
							/* 左边框透明 */
							border-right: 22rpx solid transparent;
							/* 右边框透明 */
							border-bottom: 22rpx solid #F8F8F8;
						}
					}

				}

				.centerTitle {
					display: flex;
					flex-direction: column;
					gap: 36rpx;
					box-sizing: border-box;
					padding: 36rpx 20rpx;
					background: #F8F8F8;
					border-radius: 12rpx;
					margin-top: 24rpx;

					.title::-webkit-scrollbar {
						display: none;
					}

					.title {
						display: flex;
						align-items: center;
						gap: 20rpx;
						overflow-x: scroll;
						scrollbar-width: none;
						-ms-overflow-style: none;

						>view {
							background: #FFFFFF;
							border-radius: 12rpx;
							font-size: 26rpx;
							white-space: nowrap;
							padding: 12rpx 16rpx;
							box-sizing: border-box;
							cursor: pointer;
						}

						.active {
							background: #FFF0DC;
							color: #BF7D00;
							font-weight: 600;
						}
					}
				}

				.certificate {
					display: flex;
					flex-direction: column;
					gap: 24rpx;
					margin-top: 40rpx;

					.certificate-top {
						display: flex;
						align-items: center;
						gap: 20rpx;

						>view:first-child {
							font-weight: 600;
						}

						.have {
							box-sizing: border-box;
							padding: 12rpx 14rpx;
							background: #F8F8F8;
							border-radius: 12rpx;
							cursor: pointer;
						}

						.active {
							font-weight: 600;
							color: #BF7D2B;
							background: #FFF0DC;
						}
					}

					.certificate-bottom {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						margin-bottom: 24rpx;

						>view:first-child {
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}

					.cerInput {
						display: flex;
						flex-direction: column;
						gap: 24rpx;

						.input {
							display: flex;
							align-items: center;
							padding: 28rpx 16rpx;
							box-sizing: border-box;
							border-radius: 12rpx;
							background-color: #F8F8F8;
							font-size: 26rpx;
							gap: 8rpx;
						}
					}


				}
			}

			.radio {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				margin-top: 20rpx;
			}

			.bottom {
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 30rpx;
				box-sizing: border-box;
				font-size: 32rpx;
				color: #FFF;
				font-weight: 600;
				background: #FFC400;
				border-radius: 60rpx;
				margin-top: 60rpx;
			}
		}

	}
</style>