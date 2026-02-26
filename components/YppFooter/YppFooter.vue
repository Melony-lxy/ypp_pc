<template>
	<view class="footer" v-if="show_footer">
		<view class="footer-item">
			<view class="item"> 
				<view>公司：上海易品品信息科技有限公司</view>
				<view>
				地址：上海市黄浦区龙华东路818号(海外滩金融A座)1607室
				</view>
			</view>
			<view class="item">
				<view>TEL：400-6080-660</view>
				<view>
				Email：yipinpin2024@163.com
				</view>
			</view>
			<view class="item" style="cursor: pointer;">
				<view style="width: 33rpx;display: flex;align-items: center;">
					<image src="/static/about/gong.png" mode="widthFix" style="width: 100%;aspect-ratio: 1/1;"></image>	
				</view>
				<view style="color:  #ABABAB;" @click="onOpen">
					沪公网安备31010102008530号
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	
	const show_footer = ref(true)
	
	function system() {
		const systemInfo = uni.getSystemInfo()
		systemInfo.then((res)=>{
			if(res.windowWidth > 960) show_footer.value = true
			else show_footer.value = false
		})
	}
	
	const onOpen = () =>{
		window.open('https://beian.mps.gov.cn/#/query/webSearch?code=31010102008530','blank')
	}
	
	onMounted(()=>{
		system()
		window.addEventListener('resize',system)
	})
	
</script>

<style scoped lang="scss">
	.footer{
		width: 100%;
		height: 432rpx;
		background: #2C2E3A;
		box-sizing: border-box;
		padding: 116rpx 0;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		
		
		.footer-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			height: 100%;
			
			.item{
				display: flex;
				align-items: center;
				view{
					margin: 0 10rpx;
				}
				
			}
		}
		
			}
</style>