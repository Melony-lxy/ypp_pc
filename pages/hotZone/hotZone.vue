<template>
	<view class="hotZone">
		<view class="tabbar" @click="onNavigate">
			<uni-icons type="left" size="24" color="#2c2e3a"></uni-icons>
			<image src="/static/hotZone/tabbar.png" mode="aspectFit"></image>
		</view>
		<view class="bankNotes">
			<view class="products">
				<image :src="options.mainImage" mode="aspectFill" @click="lookImageLsit(options.mainImage)"></image>
				<view class="products-right">
					<view class="heading">
						<view>{{options.name}}</view>
						<view class="taps">
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
					<view class="price">
						<view class="market">
							<view><span>¥</span>{{price}}</view>
							<view>市场最新价</view>
						</view>
						<view @click="modal.show = true">查看价格表</view>
					</view>
				</view>
			</view>
			<view class="notes">
				<view>基础详情</view>
				<view>{{infotion.intro}}</view>
				<view class="look" @click="popup.open()">
					<view>查看</view>
					<uni-icons type="down" size="18" color="#BF7D2B"></uni-icons>
				</view>
				<image src="/static/hotZone/guanfang.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="container">
			<view class="titleType">
				<view :class="typeId == 'left' ? 'activeleft' : 'left' " @click="onType('left')">交易</view>
				<view :class="typeId == 'right' ? 'activeright' : 'right' " @click="onType('right')">行情</view>
			</view>
			<view class="swiper-box">
				<swiper @animationfinish="onChange" :current="typeId == 'left' ? 0 : 1" style="height: 100%;">
					<swiper-item>
						<hot-transaction :bank-type="Math.abs(options.sort)" :product-name="options.name"></hot-transaction>
					</swiper-item>
					<swiper-item>
						<hot-market></hot-market>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup">
				<view class="popup-title">
					<view>基础详情</view>
					<uni-icons type="closeempty" size="24" color="#ABABAB" @click="popup.close()"></uni-icons>
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
							<image v-for="(item,index) in infotion.displayImages" :src="item" @click="lookImageLsit(infotion.displayImages,index)" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<popup-modal :show="modal.show" title="请前往APP内查看" @suer="modal.suer()" @close="modal.close()"></popup-modal>
	</view>
</template>

<script setup>
	import { nextTick, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import HotTransaction from '../../components/HotTransaction/HotTransaction.vue';
	import HotMarket from '../../components/HotMarket/HotMarket.vue';
	import { hotView,hotPrice } from '../../api/common';
	import { lookImageLsit } from '../../utils/common';
	import PopupModal from '../../components/PopupModal/PopupModal.vue';

	const typeId = ref('left')
	const popup = ref(null)
	const options = ref({})
	const infotion = ref({})
	const price = ref('')
	
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
	
	const onType = (e) =>{
		typeId.value = e
	}
	
	const onChange = (e) =>{
		typeId.value = e.detail.current ? 'right' : 'left' 
	}
	
	const gethotview = (id) =>{
		hotView(id).then(res=>{
			const { discription, ...restData } = res.data
			infotion.value = {
				...restData,
				discription: Object.entries(discription).map(([title,value]) => ({title,value}))
			}
		})
	}
	
	const jump = () =>{
		const data = window.OpenInstall.parseUrlParams()
		// const data = {}
		let url = `/pages/hotTopic/hotIntroduction/hotIntroduction2?productCategoryId=${options.value.productCategoryId}&productName=${options.value.name}&moneyType=banknote&id=${options.value.id}`
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
	
	const getNewPrice = (productCategoryId) =>{
		hotPrice({productCategoryId,consecutiveType: 1}).then(res=>{
			price.value = res.data.price
		})
	}
	
	onLoad((e)=>{
		options.value = JSON.parse(decodeURIComponent(e.options))
		console.log(options.value);
		gethotview(options.value.id)
		getNewPrice(options.value.productCategoryId)
	})
	
	const onNavigate = () =>{
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	.hotZone{
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		.tabbar{
			display: flex;
			align-items: center;
			gap: 10rpx;
			padding: 16rpx;
			box-sizing: border-box;
			>image{
				width: 152rpx;
				height: 36rpx;
			}
		}
		
		.bankNotes{
			display: flex;
			flex-direction: column;
			gap:  22rpx;
			padding: 12rpx 28rpx 28rpx;
			box-sizing: border-box;
			.products{
				display: flex;
				gap: 12rpx;
				>image{
					width: 160rpx;
					height: 160rpx;
					background-color: #f8f8f8;
				}
				.products-right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					.heading{
						display: flex;
						flex-direction: column;
						gap: 16rpx;
						>view:first-child{
							font-weight: 400;
							font-size: 30rpx;
							color: #2C2E3A;
							line-height: 30rpx;
						}
						.taps{
							display: flex;
							align-items: center;
							gap: 20rpx;
							>view{
								display: flex;
								align-items: center;
								gap: 4rpx;
								font-weight: 400;
								font-size: 24rpx;
								color: #EBB879;
								
								>image{
									width: 28rpx;
									height: 28rpx;
								}
							}
						}
					}
					.price{
						display: flex;
						align-items: flex-end;
						justify-content: space-between;
						.market{
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
							background: linear-gradient( 90deg, #BF7D2B 0%, #FF9D24 100%);
							border-radius: 8rpx;
							padding: 8rpx 16rpx;
							box-sizing: border-box;
							font-weight: 400;
							font-size: 26rpx;
							color: #FFFFFF;
							line-height: 26rpx;
						}
					}
				}
			}
			.notes{
				display: flex;
				align-items: center;
				width: 100%;
				padding: 28rpx 20rpx 26rpx;
				box-sizing: border-box;
				background: linear-gradient( 90deg, rgba(255,248,221,0.56) 0%, rgba(255,196,0,0.17) 48%, rgba(255,247,219,0.53) 100%);
				border-radius: 12rpx;
				position: relative;
				>view:first-child{
					font-weight: 600;
					font-size: 26rpx;
					color: #2C2E3A;
				}
				>view:nth-child(2){
					font-weight: 300;
					font-size: 26rpx;
					color: #2C2E3A;
					margin: 0 28rpx 0 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					flex: 1;
				}
				.look{
					display: flex;
					align-items: center;
					gap: 2rpx;
					font-weight: 600;
					font-size: 26rpx;
					color: #BF7D2B;
					position: relative;
					z-index: 2;
				}
				>image{
					position: absolute;
					top: 0;
					right: 0;
					width: 90rpx;
					height: 90rpx;
					z-index: 1;
				}
			}
		}
		
		.container{
			flex: 1;
			display: flex;
			flex-direction: column;
			.titleType{
				display: grid;
				grid-template-columns: repeat(2,1fr);
				
				>view{
					text-align: center;
					padding: 28rpx;
					box-sizing: border-box;
					font-weight: 400;
					font-size: 28rpx;
					color: #ABABAB;
					line-height: 28rpx;
					transition: all .2s ease-out;
				}
				.activeleft{
					background-image: url('/static/hotZone/left-select.png');
					background-repeat: no-repeat;
					background-position: left;
					background-size: contain;
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
					width: 110%;
					position: relative;
					z-index: 2;
				}
				.right{
					background-image: url('/static/hotZone/right-unselect.png');
					background-repeat: no-repeat;
					background-position: left;
					background-size: contain;
					position: relative;
					z-index: 1;
					
				}
				.activeright{
					background-image: url('/static/hotZone/right-select.png');
					background-repeat: no-repeat;
					background-position: left;
					background-size: contain;
					font-weight: 600;
					font-size: 30rpx;
					color: #2C2E3A;
					line-height: 30rpx;
					position: relative;
					z-index: 2;
					width: 110%;
					transform: translateX(-9%);
				}
				.left{
					background-image: url('/static/hotZone/left-unselect.png');
					background-repeat: no-repeat;
					background-position: left;
					background-size: contain;
					position: relative;
					z-index: 1;
					
				}
			}
			.swiper-box{
				flex: 1;
			}
		}
		.popup{
			min-height: 30vh;
			max-height: 78vh;
			background-color: #FFFFFF;
			border-radius: 28rpx 28rpx 0rpx 0rpx;
			padding: 38rpx 28rpx;
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
				flex: 1;
				overflow: auto;
				scrollbar-width: none;
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
</style>
