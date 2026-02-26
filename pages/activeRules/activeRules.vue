<template>
	<view class="view-rule">
		<view class="view-head">
			<image @click="backClick" class="image-head" :src="globalstore.upImageuler('/static/lottery/back.png')"></image>
			<view class="text-th">抽奖活动规则</view>
		</view>
		<view class="view-body">
			<view class="text-title">
				🎉 好运降临，只需10积分！🎉
			</view>
			<view class="text-paragraph">
				欢迎参与我们的超值抽奖活动！只需投入少量积分，即有机会赢取精彩大奖。以下是详细玩法规则，请仔细阅读：
			</view>
			<view class="text-title">
				第一步：参与抽奖
			</view>
			<view class="text-paragraph">
				每次参与抽奖，最少需投入10积分，即可获得1个专属抽奖码。您可以多次参与，投入的积分越多，获得的抽奖码就越多。
			</view>
			<view class="text-title">
				第二步：集满进度条，等待开奖
			</view>
			<view class="text-paragraph">
				您的每次参与都会贡献到总奖池进度条中。当所有用户投入的总积分达到目标值时，进度条即被集满，系统将自动开奖。抽奖码越多，您的中奖概率就越高！&nbsp;多投多得，好运加倍！
			</view>
			<view class="text-title">
				第三步：幸运中奖，填写地址
			</view>
			<view class="text-paragraph">
				开奖后，请务必及时查看中奖结果。如果您是幸运儿，请务必在开奖后的48小时内完成邮寄地址的填写，否则将被视为自动放弃奖品，感谢您的理解与配合。我们会在收到您的地址信息后，尽快安排奖品寄送。立即投入积分，获取您的幸运号码，大奖可能就在下一瞬间等您！祝您好运！
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
	const backClick = () =>{
		uni.navigateBack()
	}
	
</script>

<style scoped lang="scss">
	.view-rule {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC, PingFang SC;
		background: #FFFFFF;

		.view-head {
			width: 100vw;
			height: 206rpx;
			display: flex;
			justify-content: center;
			position: relative;
			border-bottom: 2rpx solid #F8F8F8;

			.image-head {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 118rpx;
				left: 16rpx;
			}

			.text-th {
				font-weight: 500;
				font-size: 34rpx;
				color: #2C2E3A;
				line-height: 34rpx;
				margin-top: 126rpx;
			}
		}

		.view-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			padding: 16rpx 28rpx 30rpx;

			.text-title {
				font-weight: 600;
				font-size: 28rpx;
				color: #2C2E3A;
				line-height: 44rpx;
			}

			.text-paragraph {
				font-size: 28rpx;
				color: #2C2E3A;
				line-height: 44rpx;
			}
		}


	}
</style>