<template>
	<view>
		<web-view :src="agreements[index].url"></web-view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from 'vue';
	const index = ref(0)
		const agreements = [{
				title: "用户协议",
				url: "https://www.yipinhui.shop/user_agreement.html"
			},
			{
				title: "隐私协议",
				url: "https://www.yipinhui.shop/privacy_policy.html"
			},
			{
				title: "共创会员协议",
				url: "https://www.yipinhui.shop/member_policy.html"
			},
			{
				title: "账号注销协议",
				url: "https://www.yipinhui.shop/user_destory_agreement.html"
			},
			{
				title: "双方买卖协议",
				url: "https://www.yipinhui.shop/buyer_seller_greement.html"
			},
			{
				title: "保证金说明",
				url: "https://www.yipinhui.shop/margin_statement.html"
			},
			{
				title: "发货说明",
				url: "https://www.yipinhui.shop/shipping_instructions.html"
			},
			{
				title: "寄售仓库规则",
				url: "https://mp.weixin.qq.com/s/ZABObhC2iUoW1Ix397kGSQ"
			},
			{
				title: "寄售交易规则",
				url: "https://mp.weixin.qq.com/s/6G_fGZHnNyC1e2uqJUAjfw"
			}
		]
		
		onLoad((e)=>{
			index.value = e.type
			uni.setNavigationBarTitle({
				title: agreements[index.value].title // 设置页面标题为"页面标题"
			});
			
		})
</script>

<style>

</style>
