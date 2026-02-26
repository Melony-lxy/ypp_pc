<template>
	<view class="hotCoin">
		<view class="hotCoin-title">
			<uni-icons type="left" size="24" color="#2c2e3a" @click="uni.navigateBack()"></uni-icons>
			<view class="title">
				<view>{{options.name}}</view>
				<view>
					<view>¥{{infotion.price}}</view>
					<view>仅剩{{total}}件</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="image">
				<image :src="options.mainImage" mode="aspectFit" @click="lookImageLsit(options.mainImage)"></image>
			</view>
			<view class="body">
				<view class="box">
					<view class="box-price">
						<view class="price">
							<view><span>¥</span>{{infotion.price}}</view>
							<view>市场最新价</view>
						</view>
						<view @click="modal.show = true">
							<view>仅剩{{total}}件</view>
							<uni-icons type="right" size="16" color="#ababab"></uni-icons>
						</view>
					</view>
					<view>{{options.name}}</view>
					<view class="taps">
						<image src="/static/hotZone/tabbar.png" mode="aspectFit"></image>
						<view>
							<image src="/static/hotZone/baiwang.png" mode="scaleToFill"></image>
							<view>百万次交易数据</view>
						</view>
						<view>
							<image src="/static/hotZone/hangye.png" mode="scaleToFill"></image>
							<view>行业最全</view>
						</view>
					</view>
				</view>
				<view class="popup">
					<view class="popup-title">
						<view>基础详情</view>
					</view>
					<view class="scroll">
						<view class="introduce">
							<view>{{infotion.intro}}</view>
							<image src="/static/hotZone/guanfang.png" mode="aspectFit"></image>
						</view>
						<view class="display">
							<view>信息展示</view>
							<view class="displayList">
								<view class="item" v-for="item in infotion.discription">
									<view>{{item.title}}</view>
									<view>{{item.value}}</view>
								</view>
							</view>
						</view>
						<view class="sample">
							<view>参考样图</view>
							<view class="sample-image">
								<image v-for="(item,index) in infotion.displayImages" :src="item" mode="aspectFit" @click="lookImageLsit(infotion.displayImages,index)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="but-bottom" @click="modal.show = true">
			<button>去发布</button>
			<button>立即交易</button>
		</view>
		<popup-modal :show="modal.show" title="请前往APP内查看" @suer="modal.suer()" @close="modal.close()"></popup-modal>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { hotView,hotspotQuery } from '../../api/common';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';
	import { lookImageLsit } from '../../utils/common';
	import { ref } from 'vue';
	
	const options = ref({})
	const infotion = ref({})
	const total = ref(0)
	const modal = ref({
		show: false,
		close(){
			this.show = false
		},
		suer(){
			this.close()
			jump()
		}
	})
	
	const gethotview = (id) =>{
		hotView(id).then(res=>{
			const { discription, ...restData } = res.data
			infotion.value = {
				...restData,
				discription: Object.entries(discription).map(([title,value]) => ({title,value}))
			}
		})
	}
	
	const getTotal = () =>{
		
		hotspotQuery({
			categoryId: options.value.categoryId,
			pageNo: 0,
			pageSize: 10,
			priceSort: 1,
			specificationsName: options.value.specificationsName,
			type: 1,
			year: options.value.year
		}).then(res=>{
			total.value += res.data.total
		})
		hotspotQuery({
			categoryId: options.value.categoryId,
			pageNo: 0,
			pageSize: 10,
			priceSort: 2,
			specificationsName: options.value.specificationsName,
			type: 2,
			year: options.value.year
		}).then(res=>{
			total.value += res.data.total
		})
	}
	
	const jump = () =>{
		const data = window.OpenInstall.parseUrlParams()
		// const data = {}
		let url = `/pages/hotTopic/hotIntroduction/hotIntroduction?categoryId=${options.value.categoryId}&categoryName=${options.value.name}&productCategoryId=${options.value.productCategoryId}&specificationsName=${options.value.specificationsName}&year=${options.value.year}&moneyType=coin&id=${options.value.id}`
		data.jumpUrl = encodeURIComponent(JSON.stringify(url))
		if (window.OpenInstall) {
			const openInstall = new window.OpenInstall({
				appKey: "bxkyti", 
				onready: function() {
					let that = this;
					that.schemeWakeup();
					that.wakeupOrInstall();
					return false;
				},
			}, data);
		} else {
			console.error('OpenInstall 脚本未加载，请检查引入方式');
		}
	}
	
	onLoad((e)=>{
		options.value = JSON.parse(e.options)
		console.log(options.value);
		gethotview(options.value.id)
		getTotal()
	})
</script>

<style scoped lang="scss">
	.hotCoin{
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;
		position: relative;
		
		.hotCoin-title{
			display: flex;
			align-items: center;
			gap: 10rpx;
			padding: 28rpx 28rpx 16rpx 16rpx;
			box-sizing: border-box;
			background-color: #fff;
			position: sticky;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			@keyframes fadeIn {
				0%{
					opacity: 0;
				}
				100%{
					opacity: 1;
				}
			}
			.title{
				display: flex;
				flex-direction: column;
				flex: 1;
				gap: 16rpx;
				animation:  fadeIn 3s forwards;
				animation-timeline: scroll(block nearest);
				animation-range: entry 0% cover 60%;
				>view:first-child{
					font-weight: 500;
					font-size: 32rpx;
					line-height: 32rpx;
					color: #2c2e3b;
				}
				>view:last-child{
					display: flex;
					align-items: center;
					justify-content: space-between;
					>view:first-child{
						font-weight: 500;
						font-size: 26rpx;
						color: #f50;
					}
					>view:last-child{
						font-weight: 500;
						font-size: 24rpx;
						color: #ababab;
					}
				}
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			margin-bottom: 220rpx;
			.image{
				background-color: #FFF;
				width: 100%;
				height: 480rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.body{
				padding: 0 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				.box{
					background-color: #fff;
					border-radius: 12rpx;
					padding: 20rpx 16rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					gap: 18rpx;
					.box-price{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.price{
							display: flex;
							align-items: flex-end;
							gap: 6rpx;
							>view:first-child{
								font-weight: bold;
								font-size: 52rpx;
								color: #FF5500;
								line-height: 48rpx;
								>span{
									font-weight: 600;
									font-size: 32rpx;
									color: #FF5500;
									line-height: 24rpx;
								}
							}
							>view:last-child{
								font-weight: 400;
								font-size: 22rpx;
								color: #ABABAB;
								line-height: 22rpx;
							}
						}
						>view:last-child{
							display: flex;
							align-items: center;
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							
						}
					}
					>view:nth-child(2){
						font-size: 32rpx;
						font-weight: 400;
						line-height: 32rpx;
						color: #2c2e3a;
					}
					.taps{
						display: flex;
						align-items: center;
						gap: 10rpx;
						>image{
							width: 128rpx;
							height: 28rpx;
						}
						>view{
							display: flex;
							align-items: center;
							gap: 4rpx;
							font-weight: 400;
							font-size: 24rpx;
							color: #E6C9A5;
							>image{
								width: 28rpx;
								height: 28rpx;
							}
						}
					}
				}
				.popup{
					
					background-color: #FFFFFF;
					border-radius: 12rpx;
					padding: 20rpx;
					box-sizing: border-box;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					gap: 28rpx;
					
					.popup-title{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-weight: 600;
						font-size: 28rpx;
						color: #2C2E3A;
					}
					.scroll{
						
						.introduce{
							padding: 20rpx;
							box-sizing: border-box;
							background: linear-gradient( 90deg, rgba(255,248,221,0.39) 0%, rgba(255,196,0,0.17) 48%, rgba(255,247,219,0.26) 100%);
							border-radius: 12rpx;
							font-weight: 300;
							font-size: 26rpx;
							color: #2C2E3A;
							line-height: 40rpx;
							margin: 0 0 28rpx 0;
							position: relative;
							>view{
								position: relative;
								z-index: 2;
							}
							>image{
								position: absolute;
								z-index: 1;
								width: 96rpx;
								height: 96rpx;
								bottom: 10rpx;
								right: 20rpx;
							}
						}
						.display{
							display: flex;
							flex-direction: column;
							gap: 24rpx;
							.displayList{
								display: flex;
								flex-direction: column;
								gap: 30rpx;
								.item{
									display: flex;
									align-items: center;
									width: 100%;
									>view:first-child{
										width: 25%;
										font-weight: 400;
										font-size: 26rpx;
										color: #ABABAB;
									}
									>view:last-child{
										flex: 1;
										font-weight: 400;
										font-size: 28rpx;
										color: #2C2E3A;
									}
								}
							}
						}
						.sample{
							display: flex;
							flex-direction: column;
							gap: 20rpx;
							margin-top: 28rpx;
							.sample-image{
								display: flex;
								flex-direction: column;
								align-items: center;
								gap: 20rpx;
							}
						}
					}
				}
			}
		}
		.but-bottom{
			background-color: #fff;
			display: grid;
			grid-template-columns: repeat(2,1fr);
			gap: 60rpx;
			padding: 40rpx 28rpx 60rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			box-shadow: 0 -1rpx 0 0 #EBEBEB;
			width: 100%;
			z-index: 10;
			>button::after{
				display: none;
			}
			>button{
				font-size: 28rpx;
				line-height: 28rpx;
				font-weight: 600;
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				border-radius: 60rpx;
				
			}
			>button:first-child{
				background-color: #FFF;
				border: 1rpx solid #CCCBCF;
			}
			>button:last-child{
				background-color: #FFC40D;
				border: 1rpx solid #FFC40D;
				color: #fff;
			}
		}
	}
</style>