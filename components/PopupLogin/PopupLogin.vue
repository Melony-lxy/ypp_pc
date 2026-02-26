<template>
	<view class="PopupLogin" v-if="show">
		<view class="loginAll" @click.stop>
			<view class="wxlogin">
				<view class="login-top">
					<view>
						<image :src="globalStore.upImageuler('/static/slices/logo.png')" mode="widthFix"></image>
					</view>
					<view>每一次收藏都是传承的开始</view>
				</view>
				<view class="scan-code">
					<view id="wxLogincode" class="wx-login-container" style="width: 190px;height: 190px;">
						<!-- <image src="/static/download/mask.png" mode="scaleToFill"></image> -->
					</view>
					<view class="agree-code">可用<image :src="globalStore.upImageuler('/static/favicon.ico')" mode="widthFix"></image><span>艺品品</span>或
						<image :src="globalStore.upImageuler('/static/mine/wx.png')" mode="widthFix"></image><span>微信</span>扫码
					</view>
				</view>
			</view>
			<view class="login">
				<view class="login-top">手机号登录
					<!-- <view>
						<image :src="globalStore.upImageuler('/static/slices/logo.png')" mode="widthFix"></image>
					</view>
					<view>每一次收藏都是传承的开始</view> -->
				</view>
				<form @submit="submit">
					<view class="login-center">
						<view class="phone">
							<view>+86</view>
							<input type="number" name="phone" @confirm="submit" v-model="fromData.phone" placeholder="请输入手机号"
								placeholder-style="color: #C2C2C2;font-weight: 400;
					font-size: 28rpx;" maxlength="11" />
						</view>
						<view class="login-code">
							<input type="number" name="code" @confirm="submit" v-model="fromData.code" placeholder="请输入验证码"
								placeholder-style="color: #C2C2C2;font-weight: 400;
					font-size: 28rpx;" maxlength="6" />
							<CountDown @click="getCode"></CountDown>
						</view>
						<view class="phone">
							<input type="number" name="invita" @confirm="submit" v-model="fromData.invita" placeholder="请输入邀请码(选填)"
								placeholder-style="color: #C2C2C2;font-weight: 400;
					font-size: 24rpx;" />
						</view>
					</view>
					<view class="login-bottom">
						<button hover-class="none" form-type="submit" class="submit">登录</button>
						<view class="login-text">
							<radio style="transform: scale(0.65);cursor: pointer;" borderColor="#2C2E3A" activeBorderColor='#FFC400'
								activeBackgroundColor="#FFC400" :checked="fromData.isRadio" @click="onRadio"></radio>
							<view>新用户将自动注册艺品会平台，并同意<text @click="onOpen('user')">《易品品用户协议》</text>和<text
									@click="onOpen('policy')">《易品品隐私政策》</text></view>
						</view>
					</view>
				</form>
				<view class="cancel" @click="cancel">
					<image :src="globalStore.upImageuler('/static/close.png')" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		ref,
		watch
	} from 'vue';
	import CountDown from '../CountDown/CountDown.vue';
	import {
		login,
		getCodePhone
	} from '../../api/common';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		TurnOnScrool
	} from '../../utils/scroll';
	import {
		onReady,
		onLoad
	} from '@dcloudio/uni-app'

	const emit = defineEmits(['click'])

	const globalStore = useGlobalStore();
	const show = ref(false)
	watch(
		() => globalStore.show,
		(newVal) => {
			show.value = newVal
			if (show.value) {
				nextTick(() => {
					onWxlogin()
				})
			}
		}, {
			immediate: true
		}
	)

	const fromData = ref({
		phone: '',
		code: '',
		invita: '',
		isRadio: false
	})

	const isRadio = ref(false)
	const onRadio = () => {
		fromData.value.isRadio = !fromData.value.isRadio
	}

	const cancel = () => {
		globalStore.updataShow(false)
		TurnOnScrool()
	}

	const getCode = (countDown) => {
		if (!fromData.value.phone) {
			uni.showToast({
				title: '请填写手机号',
				icon: 'none'
			})
			return
		}
		if (!/^1[3-9]\d{9}$/.test(fromData.value.phone)) {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
			return
		}
		uni.showLoading({
			title: '发送中...'
		})
		getCodePhone({
			phone: fromData.value.phone,
			source: 'pc'
		}).then(res => {
			if (res.code == 200) {
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					})
				}, 1000)
				countDown()
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
	}

	const submit = (e) => {

		if (!fromData.value.phone) {
			uni.showToast({
				title: '请填写手机号',
				icon: 'none',
			})
			return
		}
		if (!fromData.value.code) {
			uni.showToast({
				title: '请填写验证码',
				icon: 'none',
			})
			return
		}
		if (!fromData.value.isRadio) {
			uni.showModal({
				content: '请同意《易品品用户协议》和《易品品隐私政策》',
				success() {
					fromData.value.isRadio = !fromData.value.isRadio
				},
			})
			return
		}
		login({
			phone: fromData.value.phone,
			code: fromData.value.code,
			inviteCode: fromData.value.invita
		}).then(res => {
			if (res.code == 200) {
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				})
				uni.setStorageSync('token', res.data.access_token)
				cancel()
				emit('click')
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
	}

	const onWxlogin = () => {
		const obj = new WxLogin({
			id: "wxLogincode",
			appid: "wxe424d650232538f7",
			scope: "snsapi_login",
			redirect_uri: encodeURIComponent('https://yipinpin.com/#/'),
			state: Math.random().toString(36).substr(2, 10),
			style: "black",
			href: 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yipinpin_com/code.css',
			// fast_login: 0,
			onReady: function(isReady) {
				const iframe = document.querySelector('#wxLogincode iframe');
				if (iframe) {
					requestAnimationFrame(() => {
						iframe.style.width = '190px';
						iframe.style.height = '190px';
						iframe.style.overflow = 'hidden';
					});
				}
			},

		});
	}

	const onOpen = (type) => {
		if (type == 'user') window.open('https://www.yipinhui.shop/privacy_policy.html')
		if (type == 'policy') window.open('https://www.yipinhui.shop/privacy_policy.html')
	}
</script>

<style>
	.wx-login-container iframe {
		width: 190px;
		height: 190px;
		overflow: hidden;
	}
	
	.wx-login-container>iframe {
		width: 190px;
		height: 190px;
		overflow: hidden;
	}
</style>

<style scoped lang="scss">
	.PopupLogin {
		background: rgba(44, 46, 58, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		.loginAll {
			display: flex;
			background: #FFFFFF;
			border-radius: 40rpx;

			.wxlogin {
				width: 800rpx;
				border-right: 1rpx solid #eee;
				padding: 3.23% 4.8% 4%;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: 60rpx;

				.login-top {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: 300;
					color: #656565;
					gap: 22rpx;

					>view:first-child {
						width: 35.33%;

						image {
							width: 100%;
						}
					}
				}

				.scan-code {
					display: flex;
					align-items: center;
					flex-direction: column;
					gap: 30rpx;
					overflow: hidden;
					>view:first-child {
						width: 380rpx;
						aspect-ratio: 1/1;
						background-color: #fff;
					}

					.agree-code {
						display: flex;
						align-items: center;
						gap: 10rpx;
						text-align: center;

						>image {
							width: 30rpx;
							height: 30rpx;
						}

						>span {
							font-weight: 600;
							transform: scale(1.1);
						}
					}
				}
			}

			.login {
				width: 800rpx;
				padding: 3.23% 4.8% 4%;
				box-sizing: border-box;
				position: relative;

				.login-top {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: 600;
					font-size: 32rpx;
					padding-top: 30rpx;
					box-sizing: border-box;
					gap: 22rpx;

					>view:first-child {
						width: 35.33%;

						image {
							width: 100%;
							height: 76rpx;
						}
					}
				}

				.cancel {
					position: absolute;
					top: 40rpx;
					right: 40rpx;
					width: 3.5%;
					cursor: pointer;
					display: flex;
					align-items: center;

					image {
						width: 100%;
					}
				}

				.login-center {
					display: flex;
					flex-direction: column;
					gap: 50rpx;
					margin: 80rpx 0 112rpx;

					.phone {
						display: flex;
						align-items: center;
						padding: 32rpx 44rpx;
						box-sizing: border-box;
						background: #F8F8F8;
						border-radius: 60rpx;
						gap: 20rpx;

						>view:first-child {
							font-weight: 500;
							color: #2C2E3B;
						}

						>input {
							width: 100%;
						}
					}

					.login-code {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 32rpx 44rpx;
						box-sizing: border-box;
						background: #F8F8F8;
						border-radius: 60rpx;
						gap: 20rpx;

						>view:last-child {
							color: #2C2E3B;
							cursor: pointer;
						}
					}
				}

				.login-bottom {
					display: flex;
					flex-direction: column;
					gap: 24rpx;

					.submit {
						width: 100%;
						padding: 6rpx 0;
						background: #FFC400;
						border-radius: 60rpx;
						font-weight: 600;
						font-size: 36rpx;
						color: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
					}

					button:after {
						border: none;
					}

					.login-text {
						display: flex;
						align-items: flex-start;
						font-size: 26rpx;
						color: #C2C2C2;
						text-align: justify;

						>view:last-child {
							>text {
								color: #FFC400;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
</style>