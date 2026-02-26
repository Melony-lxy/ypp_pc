<template>
	<view>
		<view class="PopupRawal" v-if="isRawal === 0">
			<view class="lable-top">
				<view>提现</view>
				<view @click="close">
					<image :src="globalstore.upImageuler('/static/close.png')" mode="widthFix"></image>
				</view>
			</view>
			<view class="remain" :style="`background-image: url(${globalstore.upImageuler('/static/setting/ti.png')});`">
				<view class="mymoney">
					<view>账户余额</view>
					<view>¥{{account.accountVOS[0].balanceAmt}}</view>
				</view>
				<view class="allow">
					<view class="money" style="padding-left: 16rpx;">可提现金额: ¥{{account.accountVOS[0].avlBal}}</view>
					<view class="line"></view>
					<view class="money">冻结金额: ¥{{account.accountVOS[0].frzBal}}</view>
				</view>
			</view>
			<view class="method">
				<view class="top" @click="onChange" v-if="props.bankList.length != 0">
					<view>到账方式</view>
					<view class="card">
						<image :src="bank.backgroundImageUrl" mode="widthFix"></image>
						<view>{{bank.bankName}}({{bank.cardNo.slice(-4)}}) <span>更改</span></view>
						<uni-icons style="transition: all .5s ease;" type="down" size="12" color="#C2C2C2"
							:class="{rotate: show}"></uni-icons>
					</view>
				</view>
				<view class="else" v-else @click="onAddBank">添加银行卡</view>
				<view v-if="show">
					<view class="item" v-for="(item,index) in bankList" @click="onselect(item.tokenNo)">
						<view class="card">
							<image :src="bank.backgroundImageUrl" mode="widthFix"></image>
							<view>{{item.bankName}}({{item.cardNo.slice(-4)}})</view>
						</view>
						<image
							:src=" item.tokenNo !== bank.tokenNo ? globalstore.upImageuler('/static/purchase/nochoose.png') : globalstore.upImageuler('/static/purchase/checked-w.png')"
							mode="widthFix"></image>
					</view>
					<view class="add" @click="isBankAdd = true">
						<view>
							<uni-icons type="plus-filled" size="20" color="#FFC400"></uni-icons>
							<view>添加银行卡</view>
						</view>
						<uni-icons type="right" size="12" color="#C2C2C2"></uni-icons>
					</view>
				</view>
			</view>
			<view class="extract">
				<view>提现金额</view>
				<view class="ipt">
					<view>¥</view>
					<input type="digit" placeholder="输入提现金额" placeholder-class="placeholder"
						@input="handleInput" @blur="handleBlur" v-model="amount"/>
					<view @click="onAll">全部</view>
				</view>
			</view>
			<view class="but" @click="onWhitdraw">提现</view>
		</view>
		<view class="suerRawal" v-if="isRawal === 1">
			<view class="content">
				<view>确认提现</view>
				<view>
					将提现<span>{{amount}}元</span>至尾号为<span>{{bank.cardNo.slice(-4)}}的{{bank.bankName}}银行卡</span>中，操作成功后无法取消，请您仔细核对后再点击确定
				</view>
				<view class="but">
					<view @click="onClose">取消</view>
					<view @click="onSuer">确定</view>
				</view>
			</view>
		</view>
		<view class="successRawal" v-if="isRawal === 2">
			<view class="content">
				<view class="top">
					<image src="/static/setting/succ.png" mode="widthFix"></image>
					<view>提现成功</view>
				</view>
				<view class="title">您的余额将在1个工作日后转入您的银行卡，届时请注意查收。</view>
				<view class="but" @click="onOk">好的</view>
			</view>
		</view>
		<popup-down v-if="isBankAdd" @click="isBankAdd = false"></popup-down>
	</view>
</template>

<script setup>
	import {
		computed,
		nextTick,
		ref,
		watch,
		watchEffect
	} from 'vue';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		ProhibitScroll,
		TurnOnScrool
	} from '../../utils/scroll';
	import {
		settlementEnashment
	} from '../../api/common';
	import PopupDown from '../PopupDown/PopupDown.vue';

	const emit = defineEmits(['close', 'addBank'])
	const props = defineProps({
		account: {
			type: Object,
			required: true
		},
		bankList: {
			type: Array,
			default: () => []
		}
	})

	const bank = ref({})
	const globalstore = useGlobalStore()
	const show = ref(false)
	const isRawal = ref(0)
	const amount = ref('')
	const isBankAdd = ref(false)

	watch(
		[() => props.bankList, () => props.account?.settlementCardVO?.tokenNo],
		([newBankList, newTokenNo]) => {
			if (!newTokenNo) {
				bank.value = {};
				return;
			}
			bank.value = newBankList.find(item => item.tokenNo === newTokenNo) || {};
		}, {
			immediate: true,
			deep: true
		}
	);

	const onselect = (tokenNo) => {
		bank.value = props.bankList.find(item => item.tokenNo === tokenNo)
		show.value = false
	}

	const onAll = () => {
		amount.value = props.account.accountVOS[0].avlBal
	}

	const close = () => {
		emit('close')
	}

	const onChange = () => {
		show.value = !show.value
	}

	const onWhitdraw = () => {
		if (!amount.value) {
			uni.showToast({
				title: '请输入提现金额',
				icon: 'none'
			})
			return
		}
		if (amount.value > props.account.accountVOS[0].avlBal) {
			uni.showToast({
				title: '提现金额不能超过可提现金额',
				icon: 'none'
			})
			return
		}
		isRawal.value += 1
		ProhibitScroll()
	}

	const onClose = () => {
		isRawal.value -= 1
		TurnOnScrool()
	}

	const onSuer = () => {
		settlementEnashment({
			accountId: props.account.accountVOS[0].accountId,
			cashAmt: amount.value,
			tokenNo: bank.value.tokenNo,
			userId: uni.getStorageSync('userInfo').userId,
		}).then(res => {
			isRawal.value += 1
		})
	}
	
	const handleInput = (e) => {

		let value = e.detail.value;
		if (/^\d*\.?\d{0,2}$/.test(value)) {
			amount.value = value;
		}
	}
	
	const handleBlur = () =>{
		amount.value = amount.value.replace(/^(\d+\.\d{0,2}).*$/, '$1')
	}

	const onOk = () => {
		emit('close')
		TurnOnScrool()
	}

	const onAddBank = () => {
		emit('addBank')
	}
</script>

<style scoped lang="scss">
	.PopupRawal {
		width: 750rpx;
		height: calc(100vh - 268rpx);
		min-height: 1440rpx;
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47, 83, 109, 0.08);
		border-radius: 16rpx;
		position: fixed;
		top: 172rpx;
		right: 13.5%;
		padding: 32rpx 28rpx;
		box-sizing: border-box;
		transition: all 1s ease;

		.lable-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;

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

		.remain {
			width: 694rpx;
			height: 346rpx;
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			padding-top: 70rpx;
			padding-bottom: 14rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.mymoney {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				gap: 32rpx;

				>view:first-child {
					font-weight: 500;
					font-size: 30rpx;
					color: #884B20;
					line-height: 30rpx;
				}

				>view:last-child {
					font-weight: 600;
					font-size: 40rpx;
					color: #884B20;
					line-height: 52rpx;
				}
			}

			.allow {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 22rpx;
				box-sizing: border-box;
				font-weight: 500;
				font-size: 24rpx;
				color: #884B20;
				line-height: 24rpx;

				.money {
					width: 100%;
					padding-left: 32rpx;
					box-sizing: border-box;
				}

				.line {
					width: 2rpx;
					height: 82rpx;
					border: 2rpx solid;
					opacity: 0.1;
					border-image: linear-gradient(180deg, rgba(255, 217, 90, 1), rgba(136, 75, 32, 1), rgba(255, 216, 88, 1)) 1 1;
				}
			}
		}

		.method {
			padding: 40rpx 20rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: 20rpx 0;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				>view:first-child {
					font-weight: 500;
					font-size: 28rpx;
					color: #ABABAB;
					line-height: 28rpx;
				}

				.card {
					display: flex;
					align-items: center;
					gap: 8rpx;
					cursor: pointer;

					>image {
						width: 40rpx;
						height: 40rpx;
					}

					>view {
						font-weight: 500;
						font-size: 28rpx;
						line-height: 28rpx;
						color: #2C2E3A;

						>span {
							color: #00B0F9;
						}
					}

					.rotate {
						transform: rotate(180deg);
					}
				}
			}

			.else {
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 500;
				font-size: 28rpx;
				cursor: pointer;
			}

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;
				cursor: pointer;

				.card {
					display: flex;
					align-items: center;
					gap: 8rpx;

					>image {
						width: 40rpx;
						height: 40rpx;
					}

					>view {
						font-weight: 500;
						font-size: 28rpx;
						color: #2C2E3A;

					}
				}

				>image {
					width: 32rpx;
					height: 32rpx;
				}

			}

			.add {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: 500;
				font-size: 28rpx;
				color: #2C2E3A;
				line-height: 28rpx;
				padding-top: 30rpx;
				box-sizing: border-box;
				cursor: pointer;

				>view {
					display: flex;
					align-items: center;
					gap: 14rpx;
				}
			}
		}

		.extract {
			box-sizing: border-box;
			padding: 30rpx 20rpx 82rpx 20rpx;
			background: #FFFFFF;
			border-radius: 12rpx;

			>view {
				font-weight: 500;
				font-size: 28rpx;
				color: #ABABAB;
				line-height: 28rpx;
			}

			.ipt {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				margin-top: 40rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
				font-weight: 600;
				font-size: 44rpx;
				color: #2C2E3A;
				line-height: 34rpx;
				white-space: nowrap;
				gap: 8rpx;

				>input {
					width: 100%;
				}

				>view:last-child {
					font-weight: 500;
					font-size: 28rpx;
					color: #00B0F9;
					line-height: 28rpx;
					cursor: pointer;
				}
			}
		}

		.but {
			margin-top: 100rpx;
			padding: 36rpx 0 34rpx 0;
			width: 100%;
			box-sizing: border-box;
			background: #FFCD00;
			border-radius: 52rpx;
			font-weight: 600;
			font-size: 34rpx;
			color: #FFFFFF;
			line-height: 34rpx;
			display: flex;
			justify-content: center;
			cursor: pointer;
		}
	}

	.suerRawal {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		z-index: 999;

		.content {
			box-sizing: border-box;
			width: 766rpx;
			padding: 32rpx 24rpx 40rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			>view:first-child {
				font-weight: 600;
				font-size: 32rpx;
				color: #2C2E3A;
			}

			>view:nth-child(2) {
				margin-top: 42rpx;
				margin-bottom: 70rpx;
				font-weight: 400;
				font-size: 30rpx;
				color: #2C2E3A;
				line-height: 46rpx;
				text-align: justify;

				>span {
					color: #FF5500;
				}
			}

			.but {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 24rpx;

				>view {
					box-sizing: border-box;
					padding: 24rpx 116rpx;
					border-radius: 52rpx;
					font-weight: 600;
					font-size: 14px;
					cursor: pointer;
				}

				>view:first-child {
					border: 2rpx solid #ABABAB;
					background: #FFFFFF;
					color: #2C2E3A;
				}

				>view:last-child {
					background: #FFC400;
					color: #fff;
					border: 2rpx solid #FFC400;
				}
			}
		}
	}

	.successRawal {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background: rgba(44, 46, 58, 0.7);
		z-index: 999;

		.content {
			box-sizing: border-box;
			width: 766rpx;
			padding: 30rpx 24rpx 40rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 12rpx;

			.top {
				display: flex;
				align-items: center;
				flex-direction: column;
				gap: 12rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #FFC400;

				>image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.title {
				font-weight: 400;
				font-size: 30rpx;
				color: #2C2E3A;
				line-height: 46rpx;
				text-align: left;
			}

			.but {
				font-weight: 600;
				color: #fff;
				background: #FFC400;
				border-radius: 52rpx;
				padding: 24rpx 116rpx;
				cursor: pointer;
			}

		}
	}
</style>