<template>
	<view class="container">
		<GlobalSidebar />
		<ypp-header :index='2'></ypp-header>
		<view class="about">
			<view class="bannar">
				<view>AI赋能收藏管理的新模式</view>
				<view class="min" id="minDom">
					让识别、估值、配号与交易，一站式高效完成
				</view>
				<view class="imglist">
					<view class="item" v-for="(item,index) in imglist" :key="index" :class="AnimationStyle(index)">
						<image :src="globalstore.upImageuler(item.picture)" mode="heightFix" style="height: 100%;" lazy-load></image>
						<view class="hied-look">
							查看热点
						</view>
					</view>
					<view class="hied-center">
						<text>从智能识别到精准交易，开启数字化藏品新时代</text>
					</view>
					
				</view>
			</view>
			<view class="introduce">
				<view class="introduce-left">
					<view>
						<image :src="globalstore.upImageuler('/static/about/zhe.png')" mode="scaleToFill"></image>
					</view>
				</view>
				<view class="introduce-right">
					<view class="introduce-name">
						<view>公司简介</view>
						<view class="line"></view>
					</view>
					<view class="introduce-title">
						<text>易品品信息科技有限公司是一家专注于艺术品与高端收藏品数字化运营的电商平台，致力于构建中国领先的艺术品交易与管理生态系统。</text>
					</view>
					<view class="introduce-refer">
						<text>平台以纪念钞、纪念币、玉石珠宝、书画篆刻等品类为核心，通过数字技术提升传统收藏行业的流通效率与管理效率。艺品品整合AI图像识别、大数据配号分析、智能估价系统、云端寄售交易等功能，打造全流程、全场景的艺术品数字化解决方案。我们以标准化、透明化和智能化为基础，为广大藏友及机构用户提供安全、便捷、高效的服务体验，助力艺术品市场实现规模化、资产化与现代化运营。易品品相信：艺术不仅属于殿堂，也应融入生活。我们期待用专业与温度，连接每一位热爱收藏的人。</text>
					</view>			
				</view>
				<view class="bg-position">
					<image :src="globalstore.upImageuler('/static/about/biao.png')" mode="widthFix"></image>
				</view>
			</view>
			<view class="culture" :style="`background-image: url(${globalstore.upImageuler('/static/about/bging.png')})`">
				<view class="culture-top">
					<view>公司文化</view>
					<view></view>
					<view class="culture-idea">
						<view>理念驱动</view>
						<view></view>
						<view>共创价值</view>
					</view>
				</view>
				<view class="culture-img">
					<view class="img-item" v-for="(item,index) in cultureList" @mouseenter="headmous(index)" 
					 @mouseleave="leavemous(index)" :style="{
						background: index == hover_index ? item.bgimg : ''
					}" style="background-size: 100% 100%;">
						<view>
							<view style="opacity: 0.1;">{{item.Engname}}</view>
							<view class="name-english">{{item.name}}</view>
						</view>
						
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="contact">
				<view class="contact-top">
					<view>联系我们</view>
					<view></view>
					<view>沟通从此更简单</view>
				</view>
				<view class="contact-bottom">
					<view class="contact-map">
						<image :src="globalstore.upImageuler('/static/about/map.png')" mode="scaleToFill"></image>
					</view>
					<view class="contact-addres">
						<view>
							<text>上海易品品信息科技有限公司</text>
						</view>
						<view class="addres">
							<view class="addres-item" v-for="(item,index) in addresList" :key="index">
								<view>
									<uni-icons :type="item.icon" size="24" color="#fff"></uni-icons>
								</view>
								<view>
									<text>{{item.title}}</text>
								</view>
							</view>
						</view>
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
	
	const AnimationStyle = (index) =>{
		if(index == 0 || index == 4){
			return 'itemone'
		}
		if(index == 1 || index == 3){
			return 'itemtwo'
		}
		if(index == 2){
			return 'itemthree'
		}
	}
	
	const imglist = ref([{
		name: '龙钞',
		picture: '/static/about/long.png',
		
	},
	{
		name: '蛇钞',
		picture: '/static/about/she.png',
		
	},{
		name: '银币',
		picture: '/static/about/yin.png',
		
	},{
		name: '龙币',
		picture: '/static/about/core.png',
		
	},{
		name: '爱心',
		picture: '/static/about/love.png',
		
	}])
	const hover_index = ref(-1)
	const cultureList = ref([{
		name: '使命',
		Engname: 'MISSION',
		title: '追随投资智慧传播价值投资思想,让我们的投资就像安全的港湾.',
		bgimg: `url(${globalstore.upImageuler('/static/about/mission.png')})`,
	},{
		name: '愿景',
		Engname: 'VISION',
		title: '成为中国最长存的优秀投资企业',
		bgimg: `url(${globalstore.upImageuler('/static/about/vission.png')})`,
	},{
		name: '宗旨',
		Engname: 'PURPOSE',
		title: '与伟大企业共成长专注长期价值投资',
		bgimg: `url(${globalstore.upImageuler('/static/about/purpose.png')})`,
	},{
		name: '核心价值观',
		Engname: 'CORE VALUES',
		title: '公正、分享、信托、责任',
		bgimg: `url(${globalstore.upImageuler('/static/about/coreg.png')})`,
	}])
	const addresList = ref([{
		icon: 'location-filled',
		title: '地址: 上海市黄浦区龙华东路818号(海外滩金融A座)1607室'
	},{
		icon: 'phone-filled',
		title: '电话: 400-6080-660'
	},{
		icon: 'email-filled',
		title: 'Email: yipinpin2024@163.com'
	}])
	
	const headmous = (index) =>{
		hover_index.value = index
	}
	
	const leavemous = (index) =>{
		hover_index.value = -1	
	}
	
</script>

<style scoped lang="scss">
	
	.container {
	
		.about{
			.bannar {
				width: 100%;
				aspect-ratio: 1/0.463;
				background-color: #FEFBEE;
				padding: 9.21875% 13.5% 6.15% 13.5%;
				box-sizing: border-box;
				font-size: 120rpx;
				color: #000000;
				@media (max-width: 960px) {
					font-size: 36rpx;
					padding: 20rpx;
				}
				
				.min{
					font-weight: 300;
					font-size: 40rpx;
					margin: 1.427% 0 13.841% 6rpx ;
					@media (max-width: 960px) {
						font-size: 32rpx;
						margin-left: 0;
						margin-bottom: 1.427%;
					}
				}
				
				@keyframes listHeight {
					// 0%{aspect-ratio: 1/0.260412951;}
					// 50%{aspect-ratio: 1/0.4;}
					// 100%{aspect-ratio: 1/0.6;}
					0%{padding-bottom: 250rpx;}
					50%{padding-bottom: 500rpx;}
					100%{padding-bottom: 750rpx;}
				}
				
				.imglist{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					aspect-ratio: 1/0.260412951;
					position: relative;
					animation: listHeight .5s ease-out forwards;
					animation-timeline: scroll();
					animation-range: 0 600rpx;
					transition: all .5s ease;
					@media (max-width:960px) {
						animation: none;
					}
					.item{
						height: 100%;
						// max-height: 900rpx;
						position: relative;
						transform: scale(1);
						transition: all .3s ease;
						// @media (max-width: 2280px) {
						// 	max-height: 410px;
						// }
						// @media (max-width: 2160px) {
						// 	max-height: 410px;
						// }
						// @media (max-width: 1920px) {
						// 	max-height: 365px;
						// }
						// @media (max-width: 1680px) {
						// 	max-height: 320px;
						// }
						// @media (max-width: 1440px) {
						// 	max-height: 274px;
						// }
						// @media (max-width: 1200px) {
						// 	max-height: 228px;
						// }
						// @media (max-width: 960px) {
						// 	max-height: 182px;
						// }
						
						image{
							height: 100%;
						}
						
						.hied-look{
							position: absolute;
							top: 50%;
							left: 50%;
							display: flex;
							background-color: rgba(255,196,0,0.49);
							border-radius: 60rpx;
							font-size: 36rpx;
							font-weight: 600;
							color: #fff;
							padding: 20rpx 10%;
							white-space: nowrap;
							transform: translate(-50%,-50%);
							cursor: pointer;
							opacity: 0;
							transition: all .3s ease;
							@media (max-width: 960px) {
								display: none;
							}
						}
										
						&:hover {
							.hied-look{
								opacity: 1;
							}
						}	
					}
					.itemone{
						animation: item-one-five .3s ease-out forwards;
						animation-timeline: scroll();
						animation-range: 0 700rpx;
						@media (max-width:960px) {
							animation: none;
						}
						@media (min-width: 1921px) {
							animation: item1 .3s ease-out forwards;
							animation-range: 0 800rpx;
							animation-timeline: scroll();
						}
					}
					.itemtwo{
						animation: item-two-four .3s ease-out forwards;
						animation-timeline: scroll();
						animation-range: 0 400rpx;
						@media (max-width:960px) {
							animation: none;
						}
						@media (min-width: 1921px) {
							animation: item2 .3s ease-out forwards;
							animation-range: 0 500rpx;
							animation-timeline: scroll();
						}
					}
					.itemthree{
						animation: item-three .3s ease-out forwards;
						animation-timeline: scroll();
						animation-range: 0 600rpx;
						@media (max-width:960px) {
							animation: none;
						}
						@media (min-width: 1921px) {
							animation: item3 .3s ease-out forwards;
							animation-range: 0 700rpx;
							animation-timeline: scroll();
						}
					}
					@keyframes item-one-five {
						0%{transform: translateY(0);}
						50%{transform: translateY(200rpx) scale(0.85);}
						100%{transform: translateY(400rpx) scale(0.70);}
					}
					
					@keyframes item-two-four {
						0%{transform: translateY(0);}
						50%{transform: translateY(-100rpx) scale(0.85);}
						100%{transform: translateY(-200rpx) scale(0.7);}
					}
					
					@keyframes item-three {
						0%{transform: translateY(0);}
						50%{transform: translateY(400rpx) scale(0.85);}
						100%{transform: translateY(800rpx) scale(0.7);}
					}
					
					@keyframes item1 {
						0%{transform: translateY(0);}
						50%{transform: translateY(250rpx) scale(0.85);}
						100%{transform: translateY(500rpx) scale(0.7);}
						

					}
					
					@keyframes item2 {
						0%{transform: translateY(0);}
						50%{transform: translateY(-150rpx) scale(0.85);}
						100%{transform: translateY(-300rpx) scale(0.7);}
					}
					
					@keyframes item3 {
						0%{transform: translateY(0);}
						50%{transform: translateY(500rpx) scale(0.85);}
						100%{transform: translateY(1000rpx) scale(0.7);}
					}
					
					
					.hied-center{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						font-size: 40rpx;
						color: #000000;
						font-weight: 300;
						opacity: 0;
						animation: opac .3s ease forwards;
						animation-timeline: scroll();
						animation-range: 550rpx 600rpx;
					}
					@keyframes opac {
						0%{opacity: 0;}
						50%{opacity: 0.5;}
						100%{opacity: 1;}
					}
				}
			}
			
			.introduce{
				padding: 3.65% 13.5% 5.1% 13.5%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				position: relative;
				@media (max-width: 960px) {
					padding: 20rpx;
				}
				.introduce-left{
					
					width: 26.8974%;
					aspect-ratio: 0.94/1;
					position: relative;
					@media (max-width: 960px) {
						width: 0;
					}
					>view{
						width: 100%;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
							transition: all 1s ease;
						}
						:hover{
							transform: translateY(-30rpx);
						}
					}
				}
				.introduce-right{
					width: 70.85%;
					@media (max-width: 960px) {
						width: 100%;
					}
					.introduce-name{
						font-weight: 600;
						font-size: 48rpx;
						color: #1A1A1A;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						@media (max-width: 960px) {
							font-size: 36rpx;
						}
						.line{
							width: 6.9483%;
							aspect-ratio: 9.857;
							background: linear-gradient( 270deg, #FFFFFF 0%, #FFC400 100%);
							border-radius: 12rpx;
							margin-top: 6rpx;
							@media (max-width: 960px) {
								width: 18%;
								border-radius: 6rpx;
								aspect-ratio: 18;
							}
						}
					}
					
					.introduce-title{
						font-weight: 500;
						font-size: 48rpx;
						color: #333333;
						margin-top: 20rpx;
						
						@media (max-width: 960px) {
							font-size: 32rpx;
						}
					}
							
					.introduce-refer{
						font-size: 32rpx;
						color: #333333;
						margin-top: 32rpx;
						@media (max-width: 960px) {
							font-size: 30rpx;
						}
					}
					
				}
				
				.bg-position{
					position: absolute;
					bottom: 17.047%;
					right: 13.5%;
					width: 5.677%;
					aspect-ratio: 1/1;
					@media (max-width: 960px) {
						display: none;
					}
					image{
						width: 100%;
					}
				}
			}
			
			.culture {
				padding: 3.698% 13.5% 5.6771% 13.5%;
				background-size: 100% 100%;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				@media (max-width: 960px) {
					padding: 20rpx;
					
				}
				.culture-top {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					
					>view:first-child {
						font-weight: 500;
						font-size: 68rpx;
						@media (max-width: 960px) {
							font-size: 36rpx;
						}
					}
					>view:nth-child(2) {
						width: 17.408378%;
						border: 2rpx solid #000000;
						margin: 16rpx 0;
						@media (max-width: 960px) {
							width: 30%;
							margin: 8rpx 0;
						}
					}
					
					.culture-idea {
						display: flex;
						align-items: center;
						font-size: 32rpx;
						color: #656565;
						>view:nth-child(2) {
							width: 8rpx;
							height: 8rpx;
							background: #2C2E3A;
							margin: 0 20rpx;
						}
					}
				}
				
				.culture-img {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 70rpx;
					width: 100%;
					height: 100%;
					@media (max-width: 960px) {
						flex-wrap: wrap;
						margin: 0;
					}
					.img-item {
						width: 19.2634%;
						height: 100%;
						aspect-ratio: 83.33/100;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 7.49133% 0;
						text-align: center;
						font-size: 28rpx;
						background: url('/static/about/while.png');
						background-size: 100% 100%;
						box-shadow: 0 12rpx 36rpx 0 rgba(210,217,238,0.7);
						border-radius: 16rpx;
						transition: color 2s ease,
									background 2s ease;
						@media (max-width: 960px) {
							width: 49%;
							margin: 20rpx 0;
						}
						>view:first-child{
							margin-bottom: 52rpx;
							font-size: 72rpx;
							color: #FFC400;
							position: relative;
							transition: all 3s ease;
							@media (max-width: 960px) {
								font-size: 40rpx;
							}
							.name-english{
								position: absolute;
								top: 50%;
								left: 50%;
								font-weight: 400;
								font-size: 48rpx;					
								transform: translate(-50%,-50%);
								z-index: 10;
								@media (max-width: 960px) {
									font-size: 36rpx;
									white-space: nowrap; 
								}
							}
						}
						>view:last-child {
							margin: 0 10%;
							text-align: center;
							line-height: 56rpx;
						}
						
					}
			
					.img-item:hover{
						background-size: 100% 100%;
						color: #fff;
						transform: translateY(-30rpx);
						transition: all 2s ease;
						>view:first-child {
							color: #fff;
						}
					}
				}
			}
			
			.contact {
				padding: 3.125% 13.5% 4.6875% 13.5%;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				@media (max-width: 960px) {
					padding: 20rpx;
				}
				.contact-top{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
					font-weight: 500;
					font-size: 68rpx;
					@media (max-width: 960px) {
					font-size: 36rpx;	
					}
					>view:nth-child(2){
						width: 12.556862%;
						height: 0px;
						border: 2rpx solid #000000;
						margin: 16rpx 0;
						@media (max-width: 960px) {
							width: 25%;
							margin: 8rpx 0;
						}
					}
					>view:last-child{
						font-size: 32rpx;
						color: #656565;
					}
				}
				
				.contact-bottom {
					display: flex;
					align-items: flex-start;
					width: 100%;
					margin-top: 120rpx;
					@media (max-width: 960px) {
						flex-direction: column;
						margin-top: 20rpx;
					}
					.contact-map {
						width: 66.2091%;
						aspect-ratio: 1.856;
						@media (max-width: 960px) {
							width: 100%;
						}
						image{
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
						}
					}
					
					.contact-addres {
						margin: 0 36rpx;
						font-size: 44rpx;
						font-weight: 600;
						color: #333;
						@media (max-width: 960px) {
						font-size: 36rpx;
							margin-top: 20rpx;
						}
						.addres {
							font-size: 28rpx;
							color: #2C2E3A;
							font-weight: 400;
							margin-top: 40rpx;
							@media (max-width: 960px) {
								margin-top: 20rpx;
							}
							.addres-item {
								display: flex;
								align-items: center;
								margin-bottom: 60rpx;
								@media (max-width: 960px) {
									margin-bottom: 30rpx;
								}
								>view:first-child {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 60rpx;
									height: 60rpx;
									margin-right: 12rpx;
									border-radius: 50%;
									background-color: #FFC400;
									@media (max-width: 960px) {
										border-radius: 100%;
										aspect-ratio: 1;
									}
								}
							}
							
						}
					}
					
				}
			}
			
		}
	}

</style>
