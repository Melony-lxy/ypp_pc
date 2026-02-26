<template>
	<view class="Product-info">
		<YppHeader :index="0"></YppHeader>
		<GlobalSidebar />
		<view class="content">
			<view class="product-detail">
				<view class="product-imgs" >
					<view class="imgs-ls">
						<view v-for="(item,index) in info.imgList" :class="{active: index == 0}" @click="imgIndex = index">
							<image :src="item" mode="aspectFit"></image>
						</view>
					</view>
					<view class="look-img">
						<image :src="info.imgList[imgIndex]" mode="aspectFit"></image>
					</view>
				</view>
				<view class="product-present">
					<view class="present">
						<view>{{options.name}}</view>
						<view class="price">
							<view>最新成交价</view>
							<view>{{info.price.price || '暂无'}}<span>/{{info.price.unit}}</span> </view>
						</view>
						<view class="splice">
							<view v-if="info.price.grade">
								<image :src="globalstore.upImageuler('/static/mine/px.png')" mode="heightFix"></image>
								<view>{{info.price.grade}}</view>
							</view>
							<view v-if="info.price.time">
								<image :src="globalstore.upImageuler('/static/mine/tim.png')" mode="heightFix"></image>
								<view>{{info.price.time}}</view>
							</view>
						</view>
						<!-- <view class="info">圆形 ｜ 银 ｜ 31.104克 ｜ 成色 99.99% ｜ 面额 10元</view> -->
					</view>
					<view class="publish">
						<button @click="onPublish('purchase')">发布求购</button>
						<button @click="onPublish('sell')">发布出售</button>
					</view>
				</view>
			</view>
			<view class="product-recom">
				<view class="bar-type">
					<view :class="{active: item.id === barId}" v-for="(item,index) in barList" @click="barId = item.id">{{item.title}}</view>
				</view>
				<view class="bar-info" v-if="barId == 0">
					<view class="column">
						<view>基础详情</view>
						<view class="foundation" v-if="info.description">
							<view>{{info.description}}</view>
							<image :src="globalstore.upImageuler('/static/hotZone/guanfang.png')" mode="heightFix"></image>
						</view>
						<view v-else>暂无</view>
					</view>
					<view class="column" v-if="info.specsList && info.specsList.length !== 0">
						<view>信息展示</view>
						<view class="infomation-info">
							<view class="item" v-for="item in info.specsList">
								<view>{{item.title}}</view>
								<view>{{item.value}}</view>
							</view>
						</view>
					</view>
					<view class="column">
						<view>参考样图</view>
						<view class="infomation-img">
							<view class="imgItem" v-for="item in info.imgList">
								<image :src="item" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-if="barId == 1">
					<list-sell  v-if="sellList.length !== 0" :sell-list="sellList"></list-sell>
					<noData v-if="sellList.length === 0"/>
					<!-- <noMore /> -->
				</view>
				<view v-if="barId == 2">
					<list-sell  v-if="purchaseList.length !== 0" :sell-list="purchaseList"></list-sell>
					<noData v-if="purchaseList.length === 0"/>
					<!-- <noMore /> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { hotPrice } from '../../api/common';
import ListSell from '../../components/ListSell/ListSell.vue';
import noData from '../../components/noData/noData.vue';
import noMore from '../../components/noMore/noMore.vue';
import { saleLogin,purchaseLogin } from '../../api/common';
import { infoOrderType } from '../../utils/common';
import { useGlobalStore } from '../../store/store';

	const globalstore = useGlobalStore() 
	
	const barList = [
		{
			id: '0',
			title: '详情'
		},
		{
			id: '1',
			title: '出售'
		},
		{
			id: '2',
			title: '求购'
		}
	]
	
	const barId = ref(barList[0].id)
	const options = ref({})
	const info = ref({})
	const imgIndex = ref(0)
	const sellList = ref([])
	const purchaseList = ref([])
	
	function getSellList(data){
		saleLogin(data).then(res=>{
			let list = res.data.rows
			list.forEach(item => {
				item.isType = infoOrderType(item.orderType)
				if (item.grailCategoryJSON) {
					item.customTag = item.grailCategoryJSON.tagName.split(' ');
				} else if (item.publishGoldCoinItemDTOList?.length) {
					item.customTag = item.publishGoldCoinItemDTOList.flatMap(
						_i => _i.specItemList?.map(tag => tag.specificationsName) || []
					);
				} else {
					item.customTag = []
				}
			})
			sellList.value = list
			
		})
	}
	
	function getPurchaseList(data){
		purchaseLogin(data).then(res=>{
			let list = res.data.rows
			list.forEach(item => {
				item.isType = infoOrderType(item.orderType)
				if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
				else if (item.specItemList.length !== 0) {
					item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
				} else item.customTag = []
			})
			purchaseList.value = list
		})
	}
	
	function getList(e){
		
		let sellData = {
			pageNum: 0,
			pageSize: 20,
			orderStatus: 0,
		}
		
		let purchaseData = {
			pageNum: 0,
			pageSize: 20,
		}
		
		if(e.type === "paper_money"){
			sellData.productCategoryId = e.childList.id
			purchaseData.productCategoryId = e.childList.id
		}
		else if(e.type === "gold_coin" || e.type === 'common_coin' || e.type === 'stamp'){
			sellData.productCategoryId = e.list.productCategoryId
			sellData.tagName = e.list.id + '_' + e.specsFlatList1[0].specificationsName
			
			purchaseData.productCategoryId = e.list.productCategoryId
			purchaseData.tagName = e.list.id + '_' + e.specsFlatList1[0].specificationsName
		}
		
		getSellList(sellData)
		getPurchaseList(purchaseData)
	}
	
	onLoad(()=>{
		
		options.value = JSON.parse(sessionStorage.getItem('cataData'))
		getList(options.value)
		if(options.value.type === 'paper_money'){
			Object.assign(info.value,{
				imgList: options.value.childList.imageUrls,
				description: options.value.childList.description,
				specs: {
					'尺寸': options.value.childList.specification || '未知',
					'材质': options.value.childList.material || '',
					'发行量': options.value.childList.issuanceQuantity || '',
					'发行时间': options.value.childList.issuanceDate || '',
					'发行机构': options.value.childList.institution || '',
					'面值': options.value.childList.denomination || '',
				},
				price: {
					price: '',
					unit: '张',
					grade: '',
					time: ''
				}
			})
			
			if(options.value.childList.sort <= 3){
				hotPrice({
					productCategoryId: options.value.childList.id,
					consecutiveType: 1
				}).then(res=>{
					Object.assign(info.value.price,{
						price: res.data.price,
						unit: '张',
						grade: res.data.label,
						time: res.data.date
					})
				})
			}

if(Object.keys(info.value.specs).length !== 0){
	info.value.specsList = Object.keys(info.value.specs).map(key => ({
		title: key,
		value: info.value.specs[key]
	}))
}
		}else{
			info.value = JSON.parse(sessionStorage.getItem('cataData')).specsFlatList1[0]
			info.value.imgList = typeof info.value.imageUrl == 'string' ? info.value.imageUrl .split(' ') : info.value.imageUrl
			if(info.value.specs && Object.keys(info.value.specs).length !== 0){
				info.value.specsList = Object.keys(info.value.specs).map(key => ({
					title: key,
					value: info.value.specs[key]
				}))
			}
			
		}
		
	})
	
	const onPublish = (type) =>{
		options.value.release = type
		sessionStorage.setItem('cataData',JSON.stringify(options.value))
		uni.navigateTo({
			url: `/pages/mine/mine?type=${type}&cata=true`
		})
	}
</script>

<style scoped lang="scss">
	@mixin row($gap) {
		display: flex;
		gap: $gap;
	}
	
	@mixin colum($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}
	
	@mixin row-center($gap) {
		display: flex;
		align-items: center;
		gap: $gap;
	}
	
	@mixin row-center-between($gap) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $gap;
	}
	
	@mixin center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	@mixin button {
		margin: 0;
		line-height: normal;
		font-weight: 600;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #FFC400;
		border-radius: 60rpx;
		padding: 12rpx 24rpx;
		box-sizing: border-box;
	
		&::after {
			display: none
		}
	}
	
	@mixin title-AB() {
		font-weight: 400;
		font-size: 28rpx;
		color: #ABABAB;
		line-height: 28rpx;
	}
	
	.Product-info{
		
		.content{
			width: 100%;
			height: calc(100vh - 180rpx);
			padding: 20rpx 13.5%;
			box-sizing: border-box;
			background: #F8F8F8;
			@include colum(40rpx);
			
			.product-detail{
				padding: 50rpx 24rpx; 
				box-sizing: border-box;
				background-color: #FFFFFF;
				@include row(20rpx);
				
				.product-imgs{
					@include row(40rpx);
					
					.imgs-ls{
						height: 720rpx;
						@include colum(30rpx);
						overflow-y: auto;
						scrollbar-width: none;
						>view{
							width: 300rpx;
							min-height: 250rpx;
							background: #F8F8F8;
							border-radius: 20rpx;
							padding: 10rpx;
							box-sizing: border-box;
							overflow: hidden;
							cursor: pointer;
							>image{
								width: 100%;
								height: 100%;
							}
						}
						.active{
							background: #FFFFFF;
							box-shadow: 0px 2px 12px 0px rgba(47,83,109,0.2);
							border: 2rpx solid #FFC400;
						}
					}
					
					.look-img{
						width: 720rpx;
						aspect-ratio: 1/1;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				
				.product-present{
					flex: 1;
					background: #F8F8F8;
					border-radius: 16rpx;
					padding: 30rpx 24rpx 80rpx;
					@include colum(20rpx);
					justify-content: space-between;
					
					.present{
						@include colum(20rpx);
						>view:first-child{
							font-weight: 600;
							font-size: 52rpx;
							color: #2C2E3A;
						}
						.price{
							@include row(12rpx);
							align-items: flex-end;
							>view:first-child{
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
								line-height: 56rpx;
							}
							>view:last-child{
								font-weight: 600;
								font-size: 56rpx;
								color: #FF5500;
								line-height: 56rpx;
								&::before{
									content: '¥';
									font-size: 36rpx;
								}
								>span{
									font-size: 40rpx;
								}
							}
						}
						
						.splice{
							@include row-center(24rpx);
							>view{
								@include row-center(8rpx);
								padding: 10rpx 24rpx;
								box-sizing: border-box;
								background: #FFF0DC;
								border-radius: 66rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: #BF7D2B;
								>image{
									width:32rpx;
									height: 32rpx;
								}
							}
						}
						
						.info{
							font-weight: 400;
							font-size: 28rpx;
							color: #2C2E3A;
						}
					}
					
					.publish{
						@include row-center-between(48rpx);
						justify-content: flex-end;
						>button{
							margin: 0;
							padding: 36rpx 116rpx;
							box-sizing: border-box;
							font-weight: 600;
							font-size: 18px;
							line-height: normal;
							color: #FFC400;
							background: #FFFFFF;
							border-radius: 100rpx;
							border: 2rpx solid #FFC400;
							&::after{
								display: none;
							}
							&:last-child{
								color: #FFFFFF;
								background: #FFC400;
							}
						}
					}
				}
			}
			
			.product-recom{
				flex: 1;
				@include colum(20rpx);
				.bar-type{
					@include row-center(20rpx);
					font-weight: 500;
					font-size: 32rpx;
					color: #656565;
					>view{
						padding: 16rpx 64rpx;
						box-sizing: border-box;
						border-radius: 80rpx;
						cursor: pointer;
					}
					.active{
						font-weight: 600;
						color: #FFC400;
						background: #FFF7DD;
						border: 2rpx solid #FFC400;
					}
				}
				
				.bar-info{
					flex: 1;
					background: #FFFFFF;
					border-radius: 16rpx;
					border: 2rpx solid rgba(219,220,224,0.4);
					padding: 40rpx 24rpx;
					box-sizing: border-box;
					@include colum(32rpx);
					.column{
						@include colum(24rpx);
						>view:first-child{
							font-weight: 600;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 28rpx;
						}
						.foundation{
							padding: 32rpx 20rpx;
							box-sizing: border-box;
							width: 100%;
							font-weight: 300;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 40rpx;
							background: linear-gradient( 90deg, rgba(255,248,221,0.39) 0%, rgba(255,196,0,0.17) 48.1%, rgba(255,247,219,0.26) 100%);
							border-radius: 12rpx;
							position: relative;
							>view{
								position: relative;
								z-index: 2;
							}
							>image{
								position: absolute;
								top: 8rpx;
								right: 20rpx;
								width: 84rpx;
								height: 84rpx;
								z-index: 1;
							}
						}
						.infomation-info {
							display: flex;
							flex-wrap: wrap;
							gap: 40rpx 100rpx;
						
							.item {
								@include row-center(24rpx);
							
								>view:first-child {
									@include title-AB();
									white-space: nowrap;
									
								}
						
								>view:last-child {
									@include title-AB();
									color: #2C2E3A;
									white-space: nowrap;
								}
							}
						}
						
						.infomation-img {
							@include row-center(30rpx);
							flex-wrap: wrap;
						}
					}
				}
			}
		}
	}
</style>
