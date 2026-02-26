<template>
	<view class="hotnews">
		<YppHeader />
		<GlobalSidebar />
		<view class="content">
			<view class="item" v-for="item in list" @click="onPath(item.noticeLink)">
				<view>
					<view class="title">{{item.noticeTitle}}</view>
					<view class="continer">{{item.noticeSubHead}}</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="img">
					<image :src="item.noticeImageUrl" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<no-more v-if="isshow"></no-more>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import { noticList } from '../../api/common';
	import { onReachBottom } from '@dcloudio/uni-app';
	import noMore from '../../components/noMore/noMore.vue';
	
	const list = ref([])
	const pageNum = ref(0)
	const totalPage = ref(0)
	const isshow = ref(false)
	
	const getList = (pageNum) =>{
		noticList({
			pageNum,
			pageSize: 20
		}).then(res=>{
			totalPage.value = res.data.totalPages - 1
			list.value = [...list.value,...res.data.rows]
		})
	}
	
	const onPath = (url) =>{
		window.open(url,'_blank')
	}
	
	onReachBottom(()=>{
		if(pageNum.value >= totalPage.value){
			isshow.value = true
			return
		}
		pageNum.value++
		getList(pageNum.value)
	})
	
	onMounted(()=>{
		getList(pageNum.value)
	})
</script>

<style lang="scss" scoped>

	.hotnews{
		
		.content{
			padding: 40rpx 13.5%;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(2,1fr);
			gap: 40rpx 100rpx;
			.item{
				display: flex;
				justify-content: space-between;
				border: 2rpx solid #f8f8f8;
				border-radius: 12rpx;
				padding: 20rpx;
				width: 100%;
				overflow: hidden;
				cursor: pointer;
				>view:first-child{
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					flex: 1;
					overflow: hidden;
					
					.title{
						font-weight: 600;
						font-size: 30rpx;
						line-height: 30rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 100%;
					}
					.continer{
						font-size: 28rpx;
						line-height: 28rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 100%;
					}
					.time{
						font-size: 26rpx;
						line-height: 26rpx;
						color: #ABABAB;
					}
				}
				.img{
					height: 180rpx;
					width: 180rpx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

</style>
