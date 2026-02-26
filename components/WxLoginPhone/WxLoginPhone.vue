<template>
	<view class="WxLoginPhone">
		<view class="content">
			<view>绑定手机号</view>
			<view class="phone-input">
				<view>
					<view>+86</view>
					<input type="number" maxlength="11" placeholder="请输入你的手机号" placeholder-class="placeholder" v-model="phone"/>
				</view>
				<view>
					<input type="number" maxlength="6" placeholder="输入验证码" placeholder-class="placeholder" v-model="code"/>
					<count-down @click="getCode"></count-down>
				</view>
			</view>
			<button @click="submit">提交</button>
			<!-- <uni-icons type="closeempty" size="28" color="#ABABAB" class="close"></uni-icons> -->
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { wxPhone,getCodePhone } from '../../api/common';
	import CountDown from '../CountDown/CountDown.vue';
	
	const props = defineProps(['openId'])
	const emits = defineEmits(['click'])
	
	const phone = ref('')
	const code = ref('')
	
	const getCode = (countDown) => {
		if (!phone.value) {
			uni.showToast({
				title: '请填写手机号',
				icon: 'none'
			})
			return
		}
		if (!/^1[3-9]\d{9}$/.test(phone.value)) {
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
			phone: phone.value,
			// source: 'pc'
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
	
	const submit = () =>{
		if(phone.value === ''){
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return
		}
		if(code.value === ''){
			uni.showToast({
				title: '请输入验证码',
				icon: 'none'
			})
			return
		}
		wxPhone({
			phone: phone.value,
			openId: props.openId,
			code: code.value
		}).then(res=>{
			uni.setStorageSync('token',res.data.Authorization)
			uni.showToast({
				title: '已成功绑定手机号',
				icon: 'none'
			})
			emits('click')
		})
	}
	
</script>

<style scoped lang="scss">
	.WxLoginPhone{
		position: fixed;
		inset: 0;
		background-color: rgba(44,46,58,0.7);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		.content{
			width: 820rpx;
			background-color: #FFFFFF;
			padding: 80rpx 100rpx 120rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 100rpx;
			border-radius: 12rpx;
			position: relative;
			
			.close{
				position: absolute;
				top: 40rpx;
				right: 40rpx;
				cursor: pointer;
			}
			
			>view:first-child{
				font-size: 40rpx;
				line-height: 40rpx;
				color: #2C2E3B;
				font-weight: 500;
			}
			.phone-input{
				display: flex;
				flex-direction: column;
				gap: 60rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #2C2E3B;
				
				>view{
					display: flex;
					align-items: center;
					gap: 30rpx;
					padding: 30rpx 40rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					border-radius: 60rpx;
					>input{
						flex: 1;
					}
				}
			}
			
			>button{
				background: #FFC400;
				border-radius: 60rpx;
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				font-weight: 600;
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 36rpx;
				margin: 0;
				&::after{
					display: none;
				}
			}
		}
	}
</style>