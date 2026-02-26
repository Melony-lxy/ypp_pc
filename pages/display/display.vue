<template>
	<view class="container">
		<GlobalSidebar />
		<YppHeader :index="3"></YppHeader>
		<view class="display">
			<view class="displayMode">
				<view class="display-item" v-for="(item,index) in displayLsit" :key="index">
					<view class="itemleft">
						<view class="title">
							{{item.name}}
						</view>
						<view class="content">
							{{item.title}}
						</view>
					</view>
					<view class="itemright">
						<image :src="globalstore.upImageuler(item.img)" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<YppFooter></YppFooter>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	const displayLsit = ref([{
		name:'识别号码精准报价！',
		title: '拍照或输入纪念钞号码，即可自动识别，系统同步更新数据库，提供精准报价，并智能匹配该号码的收藏标签（如顺子号、豹子号、生日号等）。不仅快速得知其价值，还能了解该号码在市场中的稀缺度与受欢迎程度，轻松掌握买卖决策依据。',
		img: '/static/images/download/Group 318.png'
	},{
		name:'行情速递，一览动向！',
		title: '实时汇聚用户发布的龙钞、蛇钞以及贵金属纪念币的交易帖子，搭配权威价格区间表，助你把握市场脉动，发现潜在价值。无论是买入还是出手，一眼看清行情，决策快人一步。',
		img: '/static/images/download/Group 319.png'
	},{
		name:'全同号大盘，尽览行情全貌！',
		title: '专为龙钞、蛇钞全同号打造的大盘页面，实时呈现最新成交价、最高/最低价、昨收与今开数据，配套专业K线图走势分析，助你洞察价格趋势。 页面同步展示最新成交列表，快速掌握市场流动性，同时提供全同号求购与出售价格排序表，买卖意向一目了然，让你高效对接需求，把握最佳交易窗口。',
		img: '/static/images/download/Group 322.png'
	},{
		name:'智能仓库，轻松管理，惊喜配对！',
		title: '将你的龙钞与蛇钞一键录入个人专属仓库，系统自动识别号码尾8位，精准匹配配对关系——当龙蛇钞尾8相同时，即提示“八同号配对成功”，收藏价值瞬间跃升！ 支持随时增删查改，结构清晰、分类明确，让你轻松管理所有钞票藏品，配号、补漏、规划一步到位，打造专属于你的智能收藏空间。',
		img: '/static/images/download/Group 324.png'
	}])
	
</script>

<style scoped lang="scss">
	.container{
		
		.display{
			padding: 2% 13.5% 5%;
			box-sizing: border-box;
			@media (max-width: 960px) {
				padding: 20rpx;
			}
			.displayMode{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				gap: 240rpx;
				@media (max-width: 960px) {
					gap: 20rpx;
				}
				.display-item{
					display: flex;
					align-items: center;
					width: 100%;
					
					@media (max-width: 960px) {
						flex-direction: column;
					}
					
					.itemleft{
						width: 60%;
						@media (max-width: 960px) {
							width: 100%;
						}
						.title{
							font-weight: 500;
							font-size: 80rpx;
							color: #000000;
							margin: 40rpx 0;
							@media (max-width: 960px) {
								font-size: 36rpx;
								margin: 20rpx 0;
							}
						}
						.content{
							font-weight: 300;
							font-size: 40rpx;
							color: #000000;
							line-height: 76rpx;
							@media (max-width: 960px) {
								font-size: 30rpx;
								line-height: 1.5em;
							}
						}
					}
					.itemright{
						width: 40%;
						@media (max-width: 960px) {
							width: 100%;
						}
						image{
							width: 100%;
							transition: all 1s ease;
						}
						:hover{
							transform: translateY(-30rpx) scale(1.01);
						}
					}
				}
			}
		}
	}
</style>
