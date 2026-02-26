<template>
	<view class="popupAdding" id="myElement" :style="{right:right}">
		<view class="lable-top">
			<view>纪念币选择</view>
			<view>
				<view @click="suer">确定</view>
				<image @click="emit('close',false)" src="/static/close.png" mode="widthFix"></image>
			</view>
		</view>
		<uni-collapse ref="collapse" accordion @change="onchange" v-model="collapseIndex" style="border-radius: 20rpx;">
			<uni-collapse-item title-border="none" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">分类</view>
						<view class="sub-desc">
							<text v-if="yearTitle" class="select-v">{{ yearTitle }}</text>
							<text v-else>请选择分类</text>
						</view>
					</view>
				</template>
				<view class="list">
					<view class="item" :class="{active: paperTypeId == item.id}" v-for="(item,index) in paperList.slice(1)" :key="index" @click="onYear(item,index)">{{item.name}}</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title-border="none" :disabled="!yearTitle" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">面值</view>
						<view class="sub-desc">
							<text v-if="varietyTitle" class="select-v">{{ varietyTitle }}</text>
							<text v-else>请选择面值</text>
						</view>
					</view>
				</template>
				<view class="list">
					<view class="item" v-for="(item,index) in paperTypeList" :class="{active: varietyIndex == item.id}" :key="item.id" @click="onVariety(item)">{{item.name}}</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title-border="none" :disabled="!varietyTitle" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">规格</view>
						<view class="sub-desc">
							<text v-if="speTitle" class="select-v">{{speTitle}}</text>
							<text v-else>请选择规格</text>
						</view>
					</view>
				</template>
				<view class="contant">
					<view class="contant-left">
						<view v-for="(item,index) in Specifications" :class="{active: item.id == speIndex}" :key="item.id" @click="onSpe(item)">
							<image :src="item.imageUrl" mode="aspectFit"></image>
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script setup>
	import {
		onMounted,
		watchEffect,
		ref,
		nextTick,
		getCurrentInstance,
		computed,
		watch
	} from 'vue';
	import { varietyList,varietyList2,category } from '../../api/common';
	import {onReady} from '@dcloudio/uni-app'

	const props = defineProps({
		paperList: {
			type: Array,
			default: []
		},
		typeId: {
			type: Number,
			default: -1
		},
		paperTypeId:{
			type: String,
			default: ''
		}
	})
	
	const emit = defineEmits(['close','sure','update:paperTypeId'])
	const { proxy } = getCurrentInstance()
	const right = ref('-100%')
	
	watchEffect(()=>{
		if(props.paperList) {		
			setTimeout(()=>{
				right.value = '13.5%'
			})
		}
	})
	
	const collapseIndex = ref('0')
	const variety = ref([])
	const varietyIndex = ref('')
	const varietyTitle = ref('')
	const collapse = ref(null)
	const Specifications = ref([{
		id: '0',
		chilren: [],
		name: '单币'
	},{
		id: '1',
		chilren: [],
		name: '套币'
	}
	])
	const speIndex = ref('0')
	const speTitle = ref('')
	const SingleIndex = ref([])
	const setIndex = ref(-1)
	const selectId = ref('')
	const paperTypeList = computed(()=>{
		if(!props.paperTypeId) return []
		return props.paperList.find(item=> item.id === props.paperTypeId)?.childList || props.paperList.find(item=> item.id === props.paperTypeId)?.list
	})
	
	const yearTitle = computed(()=>{
		if(!props.paperTypeId) return ''
		return props.paperList.find(item=> item.id === props.paperTypeId).name
	})
	
	const requsetName = computed(()=>{
		if(!props.paperTypeId) return ''
		return props.paperList.find(item=> item.id === props.paperTypeId).collectionName
	})
	
	const onSpe = (item) =>{
		console.log(item);
		speIndex.value = item.id
		speTitle.value = item.name
	}
	const onChilen = (id,index) =>{
		
		if(id === '0'){
			setIndex.value = -1
			const _index = SingleIndex.value.indexOf(index)
			if(_index !== -1){
				SingleIndex.value.splice(_index,1)
			}else{
				SingleIndex.value.push(index)
			}
		}
		if(id === '1'){
			SingleIndex.value.length = 0
			setIndex.value = index
		}
	}
	
	const onchange = (e) =>{
		collapseIndex.value = e
	}
	
	const getVarietyList = (year) =>{
		if(props.typeId === 1) {
			varietyList({year}).then(res=>{
				variety.value = res.data
				collapseIndex.value = '1'
				collapse.value.childrens[0].isOpen = false
				collapse.value.childrens[2].isOpen = false
			})
		}
		else if(props.typeId === 2) {
			varietyList2({year}).then(res=>{
				variety.value = res.data
				collapseIndex.value = '1'
				collapse.value.childrens[0].isOpen = false
				collapse.value.childrens[2].isOpen = false
			})
		}else if(props.typeId === 3){
			console.log(props.typeId);
		}else{
			console.error('typeId is msut， your are idiot !');
		}
	}
	
	const onYear = (item,index) =>{
		emit('update:paperTypeId',item.id)
		varietyTitle.value = ''
		varietyIndex.value = ''
		speTitle.value = ''
		collapseIndex.value = '1'
		collapse.value.childrens[0].isOpen = false
		collapse.value.childrens[2].isOpen = false
		SingleIndex.value.length = 0
		setIndex.value = -1
	}
	
	const onVariety = (item) =>{
		Specifications.value = []
		speTitle.value = ''
		category({collectionName: requsetName.value}).then(res=>{
			Specifications.value = res.data.find(e=>item.id === e.id).specsFlatList1
			varietyIndex.value = item.id
			varietyTitle.value = item.name
			SingleIndex.value.length = 0
			setIndex.value = -1
			collapseIndex.value = '2'
			collapse.value.childrens[0].isOpen = false
			collapse.value.childrens[1].isOpen = false
			console.log(Specifications.value);
		})
		
		
	}
	
	function debounce(func, wait) {
		let timeout
		return function() {
			const context = this
			const args = arguments
			clearTimeout(timeout)
			timeout = setTimeout(function() {
				func.apply(context, args)
			}, wait)
		}
	}
	

	function scrollXY(selecter, proxy) {
		return new Promise((resolve) => {
			uni
				.createSelectorQuery()
				.in(proxy)
				.selectAll(selecter)
				.boundingClientRect()
				.exec((res) => {
					resolve(res[0])
				})
		})
	}
	
	const handleScroll = debounce((e) => {
		scrollXY('.childe', proxy).then((columItems) =>{
			let getIndex = 0
			columItems.forEach((item,index)=>{
				if(item.top <= 288){
					getIndex = index
				}
			})
			speIndex.value = getIndex
			selectId.value = ''
		})
	}, 50)
	
	const suer = () =>{
		if(!yearTitle.value){
			uni.showToast({
				title: '请选择分类',
				icon:'none'
			})
			return
		}
		if(!varietyTitle.value){
			uni.showToast({
				title: '请选择面值',
				icon:'none'
			})
			return
		}
		if(!speTitle.value){
			uni.showToast({
				title: '请选择规格',
				icon:'none'
			})
			return
		}
		// const index = variety.value.findIndex(item=>item.id === varietyIndex.value)
		// const spect = variety.value[index]
		// const spectList = []
		// if(SingleIndex.value.length != 0){
		// 	SingleIndex.value.forEach(item=>{
		// 		spectList.push(spect.specsFlatList1[item])
		// 	})
		// }else{
		// 	spectList.push(spect.specsFlatList2[setIndex.value])
		// }
		
		// const list = {
		// 	year: yearTitle.value,
		// 	name: varietyTitle.value,
		// 	categoryId: varietyIndex.value,
		// 	specItemList: spectList
		// }
		// emit('sure',list)
		emit('close',false)
	}
	
	watch(()=>props.paperTypeId,(n)=>{
		if(n) {
			varietyTitle.value = ''
			varietyIndex.value = ''
			collapseIndex.value = '1'
			SingleIndex.value.length = 0
			setIndex.value = -1
		}
	},{immediate: true})
</script>

<style scoped lang="scss">
	.popupAdding {
		position: fixed;
		right: 0;
		top: 172rpx;
		// width: 19.53125%;
		width: 750rpx;
		height: calc(100vh - 268rpx);
		min-height: 1440rpx;
		background: #F8F8F8;
		box-shadow: -12rpx 0 24rpx 0 rgba(47, 83, 109, 0.08);
		border-radius: 16rpx;
		box-sizing: border-box;
		transition: all 1s ease;
		padding: 32rpx 28rpx;

		.lable-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;

			>view:first-child {
				margin-left: 14rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #656565;
			}

			>view:last-child {
				
				display: flex;
				align-items: center;
				gap: 30rpx;
				>view{
					font-size: 32rpx;
					font-weight: 600;
					background-color: #FFC400;
					color: #fff;
					box-sizing: border-box;
					padding: 4rpx 28rpx;
					border-radius: 30rpx;
					cursor: pointer;
				}
				image {
					width: 36rpx;
					cursor: pointer;
				}
			}
		}

		.header-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16rpx 0;
			margin: 0 28rpx;
			cursor: pointer;
			.title {
				font-weight: 600;
				font-size: 28rpx;
				color: #2C2E3A;
			}

			.sub-desc {
				font-weight: 400;
				font-size: 26rpx;
				color: #ABABAB;

				.select-v {
					font-size: 26rpx;
					color: #2C2E3A;
					max-width: 460rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.arr-img {
					display: inline-block;
					width: 30rpx;
					height: 16rpx;
					padding-left: 6rpx;
				}
			}
		}

		.list {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			gap: 20rpx;
			padding: 20rpx;
			box-sizing: border-box;

			.item {
				border-radius: 12rpx;
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				white-space: nowrap;
				cursor: pointer;
				background-color: #F8F8F8;
			}
			
			.active{
				color: #BF7D2B;
				background: #FFF0DC;
			}
		}
		
		.contant{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			box-sizing: border-box;
			.contant-left{
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				>view{
					display: flex;
					align-items: center;
					gap: 40rpx;
					cursor: pointer;
					padding: 20rpx;
					box-sizing: border-box;
					border-radius: 12rpx;
					>image{
						width: 180rpx;
						height: 100rpx;
						background-color: #f8f8f8;
					}
				}
				.active{
					background: #FFF0DC;
					color: #BF7D00;
				}
			}
		}
		

	}
</style>