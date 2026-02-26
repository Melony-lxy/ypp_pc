<template>
	<view class="PopupLable" :class="{activePopupLable: show}">
		<view class="lable-top">
			<view>标签筛选</view>
			<view @click="close">
				<image :src="globalstore.upImageuler('/static/close.png')" mode="widthFix"></image>
			</view>
		</view>
		<view class="lable-content">
			<view class="title">
				<view @click="onSwitch('number')" :class="{bgleft: typeSwitch == 'number'}">号码</view>
				<view @click="onSwitch('more')" :class="{bgright: typeSwitch == 'more'}">更多</view>
			</view>
			<scroll-view class="scroll" scroll-y="true" >
				<view class="scroll-content" v-if="typeSwitch == 'number'">
					<view class="content-item">
						<view>类型</view>
						<view class="item">
							<view v-for="(typeItem,typeIndex) in typeList" :key="typeItem.id" :class="{active: typeIndex == index.typeIndex}"
							 @click="onType(typeItem.id,typeItem.name)">{{typeItem.name}}</view>
						</view>
					</view>
					<view class="content-item" v-for="(nameItem,nameIndex) in allList">
						<view>{{nameItem.name}}</view>
						<view class="item">
							<view v-for="(items,indexs) in nameItem.list" :key="items.id" :class="{active: nameItem.name == '规格' ? items.id == index.specsIndex 
							: (nameItem.name == '头号' ? items.id == index.headIndex : items.id == index.tailIndex ) }"
							@click="onSpecs(items.id,items.name,nameItem.name,items.category)">{{items.name}}</view>
						</view>
					</view>
				</view>
				<view class="scroll-content" v-else>
					<view class="content-item" v-for="(moreItem,moreIndex) in list.more">
						<view>{{moreItem.name}}</view>
						<view class="item">
							<view v-for="(_item,_index) in moreItem.list" :key="_item.id" :class="{active: _item.id == index.moreIndex}"
							@click="onMore(_item.id,_item.name,_item.category)" >{{_item.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="lable-bottom">
			<view @click="reset">重置</view>
			<view @click="sure">确定</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()
	
	const props = defineProps({
		list: {
			type: Object,
			default: {}
		},
		show:{
			type: Boolean,
			default: false
		}
	})
	
	const emit = defineEmits(['close','suer','reset'])
	
	const close = () =>{
		emit('close',false)
	}
	
	const allList = computed(()=>{
		if(index.value.typeIndex == 0) return props.list.san
		if(index.value.typeIndex == 1) return props.list.shi
		if(index.value.typeIndex == 2) return props.list.bai
	})
	
	const index = ref({
		typeIndex: 0,
		specsIndex: -1,
		headIndex: -1,
		tailIndex: -1,
		moreIndex: -1,
		typeName: '散钞',
		specsName: '',
		headName: '',
		tailName: '',
		moreName: '',
		specsCategory: '',
		headCategory: '',
		tailCategory: '',
		moreCategory: ''
	})
	
	const typeList = ref([{
		id: 0,
		name: '散钞'
	},{
		id: 1,
		name: '标十'
	},{
		id: 2,
		name: '标百'
	}
])
	const typeSwitch = ref('number')
	
	const onSwitch = (type) =>{
		typeSwitch.value = type
	}

	const onType = (id,name) =>{
		Object.assign(index.value,{
			typeIndex: id,
			specsIndex: -1,
			headIndex: -1,
			tailIndex: -1,
			moreIndex: -1,
			typeName: name,
			specsName: '',
			headName: '',
			tailName: '',
			moreName: '',
			specsCategory: '',
			headCategory: '',
			tailCategory: '',
			moreCategory: ''
		})
	}
	
	const onMore = (id,name,category) =>{
		index.value.moreIndex = id
		index.value.moreName = name
		index.value.moreCategory = category
	}
	
	const onSpecs = (id,name,type,category) =>{
		if(type == '规格') {
			index.value.specsIndex = id
			index.value.specsName = name
			index.value.specsCategory = category
			}
		if(type == '头号') {
			index.value.headIndex = id
			index.value.headName = name
			index.value.headCategory = category
		}
		if(type == '尾号') {
			index.value.tailIndex = id
			index.value.tailName = name
			index.value.tailCategory = category
		}
	}
	
	const reset = () =>{
		index.value.typeIndex = 0
		index.value.specsIndex = -1
		index.value.headIndex = -1
		index.value.tailIndex = -1
		index.value.moreIndex = -1
		index.value.typeName = '散钞'
		index.value.specsName = ''
		index.value.headName = ''
		index.value.tailName = ''
		index.value.moreName = ''
		index.value.specsCategory = ''
		index.value.headCategory = ''
		index.value.tailCategory = ''
		index.value.moreCategory = ''
		// uni.showToast({
		// 	title:'已重置',
		// 	icon:'none'
		// })
	}
	
	defineExpose({
		reset
	})
	
	const sure = () =>{
		emit('suer',index.value)
	}
	
</script>

<style scoped lang="scss">
	.activePopupLable{
		right: 13.5% !important; 
	}
	.PopupLable{
		position: fixed;
		right: -100%;
		top: 172rpx;
		// width: 19.53125%;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47,83,109,0.08);
		border-radius: 16rpx;
		box-sizing: border-box;
		transition: all 1s ease;
		padding: 32rpx 28rpx;
		z-index: 10;
		.lable-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			>view:first-child{
				margin-left: 14rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
			}
			>view:last-child{
				width: 36rpx;
				display: flex;
				align-items: center;
				image{
					width: 100%;
					cursor: pointer;
				}
			}
		}
		
		.lable-content{
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: linear-gradient( 180deg, #E0E0E0 0%, #F3F3F3 100%);
				border-radius: 14rpx 14rpx 0 0;
				cursor: pointer;
				>view{
					display: flex;
					width: 50%;
					justify-content: center;
					box-sizing: border-box;
					padding: 22rpx 0;
				}
				.bgleft{
					background-image: url('/static/bg_left.png');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-position: center;
					font-weight: 600;
				}
				.bgright{
					background-image: url('/static/bg_right.png');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-position: right;
					font-weight: 600;
				}
			}
			
			.scroll{
				width: 100%;
				background: #FFFFFF;
				height: calc(100vh - 614rpx);
				.scroll-content{
					width: 100%;
					padding: 24rpx 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					
					.content-item{
						display: flex;
						flex-direction: column;
						gap: 8rpx;
						>view:first-child{
							font-weight: 600;
							font-size: 24rpx;
							color: #ABABAB;
						}
						.item{
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex-wrap: wrap;
							gap: 20rpx;
							>view{
								background: #F8F8F8;
								border-radius: 12rpx;
								padding: 10rpx 28rpx;
								box-sizing: border-box;
								white-space: nowrap;
								cursor: pointer;
							}
							.active{
								color: #BF7D2B;
								background: #FFF0DC;
							}
						}
					}
				}
			}
			
		}
		
		.lable-bottom{
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 40rpx;
			>view:first-child{
				width: 47.2%;
				padding: 22rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				font-weight: 600;
				font-size: 30rpx;
				color: #FFC400;
				background: #FFFFFF;
				border-radius: 44rpx;
				border: 2rpx solid #FFC400;
				cursor: pointer;
			}
			>view:last-child{
				width: 47.2%;
				padding: 22rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				font-weight: 600;
				font-size: 30rpx;
				color: #fff;
				background: #FFC400;
				border-radius: 44rpx;
				border: 2rpx solid #FFC400;
				cursor: pointer;
			}
		}
		
	}
</style>