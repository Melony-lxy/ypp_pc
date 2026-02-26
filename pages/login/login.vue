<template>
	<view class="login">
		<image class="image-back" @click="onBack" :src="globalstore.upImageuler('/static/lottery/back.png')" />
		<view class="login-conten">
			<view class="top-logo">
				<image :src="globalstore.upImageuler('/static/slices/logo.png')" mode="widthFix"></image>
				<view>每一次收藏都是传承的开始</view>
			</view>
			<view class="loginType">
				<view class="typelist">
					<view class="item" @click="phoneLoginRef.open()">
						<image :src="globalstore.upImageuler('/static/slices/phone-login.png')" mode="scaleToFill"></image>
						<view>手机号登录</view>
					</view>
				</view>
				<view class="prive">
					<uni-icons v-if="!isCheck" type="circle" size="20" color="#C2C2C2" @click="isCheck = !isCheck"></uni-icons>
					<uni-icons v-else type="checkbox-filled" size="20" color="#FFC400" @click="isCheck = !isCheck"></uni-icons>
					<view class="title">
						新用户将自动注册易品品平台，并同意<span @click="onOpen(0)">《用户协议》</span>和<span @click="onOpen(1)">《隐私政策》</span>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="phoneLoginRef" type="bottom" >
			<view class="phonelogin">
				<view class="phonelogin-top">
					<view>手机验证码登录</view>
					<uni-icons class="close" type="closeempty" size="22" color="#AAA" @click="phoneLoginRef.close()"></uni-icons>
				</view>
				<view class="login-from">
					<view class="ipt">
						<view>+86</view>
						<input type="number" placeholder="请输入你的手机号" placeholder-class="placeholder" maxlength="11" v-model="fromData.phone"/>
					</view>
					<view class="ipt" style="justify-content: space-between;">
						<input type="number" placeholder="请输入验证码" placeholder-class="placeholder" maxlength="6" v-model="fromData.code"/>
						<count-down @click="getCode"></count-down>
					</view>
					<view class="ipt">
						<input type="number" placeholder="请输入邀请码" placeholder-class="placeholder" v-model="fromData.invita"/>
					</view>
				</view>
				<view class="button" @click="submit">登录</view>
				<view class="prive">
					<uni-icons v-if="!isCheck" type="circle" size="20" color="#C2C2C2" @click="isCheck = !isCheck"></uni-icons>
					<uni-icons v-else type="checkbox-filled" size="20" color="#FFC400" @click="isCheck = !isCheck"></uni-icons>
					<view class="title">
						新用户将自动注册易品品平台，并同意<span @click="onOpen(0)">《用户协议》</span>和<span @click="onOpen(1)">《隐私政策》</span>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	import CountDown from '../../components/CountDown/CountDown.vue';
	import { login,getCodePhone,userInfo } from '../../api/common';
	
	const objfrom = {
		phone: '',
		code: '',
		invita: '',
	}
	const fullPath = window.location.href
	const globalstore = useGlobalStore()
	const isCheck = ref(false)
	const phoneLoginRef = ref(null)
	const fromData = ref({
		...objfrom
	})
	
	const getCode = (countDown) =>{
		if(!fromData.value.phone){
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
		getCodePhone({phone: fromData.value.phone}).then(res=>{
			if(res.code == 200){
				setTimeout(()=>{
					uni.hideLoading()
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					})
				},1000)
				countDown()
			}else{
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
	}
	
	const submit = () =>{
		if(!fromData.value.phone){
			uni.showToast({
				title: '请填写手机号',
				icon: 'none',
			})
			return
		}
		if(!fromData.value.code){
			uni.showToast({
				title: '请填写验证码',
				icon: 'none',
			})
			return
		}
		if(!isCheck.value){
			uni.showToast({
				title: '请同意《用户协议》和《隐私政策》',
				icon: 'none',
			})
			return
		}
		login({
			phone: fromData.value.phone,
			code: fromData.value.code,
			inviteCode: fromData.value.invita
		}).then(res=>{
			uni.setStorageSync('token',res.data.access_token)
			userInfo().then(res=>{
				uni.setStorageSync('userInfo',res.user)
				globalstore.upUserInfo(res.user)
			})
			uni.navigateBack()
		})
	}
	
	const onOpen = (index) =>{
		uni.navigateTo({
			url: '/pages/webView/webView?type=' + index
		})
	}
	
	const onBack = () =>{
		const nowPath = window.location.href
		if(fullPath == nowPath) {
			uni.reLaunch({
				url:'/pages/index/index'
			})
			return
		}
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	.login{
		
		.image-back {
			width: 48rpx;
			height: 48rpx;
			position: fixed;
			left: 16rpx;
			top: 118rpx;
			z-index: 100;
		}
		
		.login-conten{
			width: 100%;
			height: 100vh;
			box-sizing: border-box;
			padding: 360rpx 40rpx 92rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.top-logo{
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 20rpx;
				>image{
					width: 280rpx;
					height: 96rpx;
				}
				>view{
					font-weight: 300;
					font-size: 28rpx;
					color: #656565;
					line-height: 40rpx;
				}
			}
			.loginType{
				display: flex;
				flex-direction: column;
				gap: 40rpx;
				.typelist{
					display: flex;
					align-items: center;
					flex-direction: column;
					gap: 40rpx;
					.item{
						display: flex;
						width: 100%;
						align-items: center;
						box-sizing: border-box;
						background: #F8F8F8;
						border-radius: 52rpx;
						justify-content: center;
						padding: 35rpx;
						font-weight: 400;
						font-size: 34rpx;
						line-height: 34rpx;
						gap: 20rpx;
						>image{
							width: 24rpx;
							height: 40rpx;
						}
					}
				}
				.prive{
					display: flex;
					align-items: flex-start;
					gap: 10rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #C2C2C2;
					line-height: 36rpx;
					
					span {
						color: #FFC400;
					}
				}
			}
		}
		
		.phonelogin{
			box-sizing: border-box;
			padding: 40rpx;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0 0;
			display: flex;
			flex-direction: column;
			gap: 80rpx;
			.phonelogin-top{
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
				font-size: 32rpx;
				color: #2C2E3A;
				line-height: 32rpx;
				position: relative;
				.close{
					position: absolute;
					right: 0;
				}
			}
			
			.login-from{
				display: flex;
				gap: 40rpx;
				flex-direction: column;
				.ipt{
					padding: 30rpx 40rpx;
					box-sizing: border-box;
					background-color: #F8F8F8;
					border-radius: 60rpx;
					display: flex;
					align-items: center;
					gap: 10rpx;
				}
			}
			
			.button{
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background-color: #FFC400;
				color: #FFF;
				font-weight: 600;
				font-size: 34rpx;
				border-radius: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.prive{
				display: flex;
				align-items: flex-start;
				gap: 10rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #C2C2C2;
				line-height: 36rpx;
				
				span {
					color: #FFC400;
				}
			}
		}
		
	}
</style>
