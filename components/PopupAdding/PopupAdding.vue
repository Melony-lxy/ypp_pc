<template>
	<view class="popupAdding" id="myElement" :style="{right:right}">
		<view class="lable-top">
			<view>{{title}}</view>
			<view>
				<view @click="suer">确定</view>
				<image @click="emit('close',false)" src="/static/close.png" mode="widthFix"></image>
			</view>
		</view>
		<uni-collapse ref="collapse" accordion @change="onchange" v-model="collapseIndex" style="border-radius: 20rpx;">
			<uni-collapse-item title-border="none" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">年份</view>
						<view class="sub-desc">
							<text v-if="yearTitle" class="select-v">{{ yearTitle }}</text>
							<text v-else>请选择年份</text>
						</view>
					</view>
				</template>
				<view class="list">
					<view class="item" :class="{active: yearIndex == index}" v-for="(item,index) in years" :key="index" @click="onYear(item,index)">{{item}}</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title-border="none" :disabled="!yearTitle" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">品种</view>
						<view class="sub-desc">
							<text v-if="varietyTitle" class="select-v">{{ varietyTitle }}</text>
							<text v-else>请选择品种</text>
						</view>
					</view>
				</template>
				<view class="list">
					<view class="item" v-for="(item,index) in variety" :class="{active: varietyIndex == item.id}" :key="item.id" @click="onVariety(item)">{{item.name}}</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title-border="none" :disabled="!varietyTitle" :border="false">
				<template v-slot:title>
					<view class="header-title" style="margin-top: 10rpx; margin-bottom: 10rpx;">
						<view class="title">规格</view>
						<view class="sub-desc">
							<text v-if="SingleIndex.length != 0 || setIndex != -1" class="select-v">{{`已选${SingleIndex.length != 0 ? SingleIndex.length : '1' }${SingleIndex.length != 0 ? '单' : '套' }币`}}</text>
							<text v-else>请选择规格</text>
						</view>
					</view>
				</template>
				<view class="contant">
					<view class="contant-left">
						<view v-for="(item,index) in Specifications" :class="{line: item.id == speIndex}" :key="item.id" @click="onSpe(item.id)">{{item.name}}</view>
					</view>
					<view class="contant-right">
						<scroll-view scroll-y="true" style="height: calc(100vh - 716rpx)" :scroll-into-view="selectId" scroll-with-animation :show-scrollbar="false" @scroll="handleScroll">
							<view style="display: flex;flex-direction: column;gap: 20rpx;">
								<view class="childe" v-for="(item,index) in Specifications" :key="item.id" :id="`Specifications${index}`">
									<view>{{item.name}}{{index == 0 ? ' (可多选)' : ''}}</view>
									<view class="childe-item">
										<view class="coin" v-for="(_item,_index) in item.chilren" :key="_index" :class="{active: item.id == '0' ? SingleIndex.includes(_index) : setIndex == _index}" @click="onChilen(item.id,_index)">
											<view class="image-box">
												<image :src="_item.imageUrl" mode="aspectFit"></image>
											</view>
											<view>{{_item.specificationsName}}</view>
										</view>
										<view v-if="item.chilren.length == 0" class="no-coin">
											<image class="img-pic" src="/static/noCoin.png"></image>
											<view class="desc">没有找到想卖的套币？可通过多选单币卖出商品哟～</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
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
		computed
	} from 'vue';
	import { varietyList,varietyList2 } from '../../api/common';
	import {onReady} from '@dcloudio/uni-app'

	const props = defineProps({
		years: {
			type: Array,
			default: []
		},
		typeId: {//1贵金属，2普通金属，3邮票
			type: Number,
			default: -1
		}
	})
	
	const emit = defineEmits(['close','sure'])
	const { proxy } = getCurrentInstance()
	const right = ref('-100%')
	const title = computed(()=>{
		if(props.typeId === 1) return '贵金属纪念币选择'
		else if(props.typeId === 2) return '普通纪念币选择'
		else if(props.typeId === 3) return '邮票选择'
		else return '请选择'
	})
	
	watchEffect(()=>{
		if(props.years) {		
			setTimeout(()=>{
				right.value = '13.5%'
			})
		}
	})
	
	const collapseIndex = ref('0')
	const yearIndex = ref(-1)
	const yearTitle = ref('')
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
	const SingleIndex = ref([])
	const setIndex = ref(-1)
	const selectId = ref('')
	const onSpe = (id) =>{
		speIndex.value = id
		selectId.value = 'Specifications' + id
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
	
	const onYear = (title,index) =>{
		yearIndex.value = index
		yearTitle.value = title
		varietyTitle.value = ''
		varietyIndex.value = ''
		getVarietyList(title)
		SingleIndex.value.length = 0
		setIndex.value = -1
	}
	
	const onVariety = (item) =>{
		varietyIndex.value = item.id
		varietyTitle.value = item.name
		Specifications.value[0].chilren = item.specsFlatList1
		Specifications.value[1].chilren = item.specsFlatList2
		SingleIndex.value.length = 0
		setIndex.value = -1
		collapseIndex.value = '2'
		collapse.value.childrens[0].isOpen = false
		collapse.value.childrens[1].isOpen = false
		
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
				title: '请选择年份',
				icon:'none'
			})
			return
		}
		if(!varietyTitle.value){
			uni.showToast({
				title: '请选择品种',
				icon:'none'
			})
			return
		}
		if(SingleIndex.value.length == 0 && setIndex.value == -1){
			uni.showToast({
				title: '请选择规格',
				icon:'none'
			})
			return
		}
		const index = variety.value.findIndex(item=>item.id === varietyIndex.value)
		const spect = variety.value[index]
		const spectList = []
		if(SingleIndex.value.length != 0){
			SingleIndex.value.forEach(item=>{
				spectList.push(spect.specsFlatList1[item])
			})
		}else{
			spectList.push(spect.specsFlatList2[setIndex.value])
		}
		
		const list = {
			year: yearTitle.value,
			name: varietyTitle.value,
			categoryId: varietyIndex.value,
			specItemList: spectList
		}
		emit('sure',list)
		emit('close',false)
	}
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
				background-color: #fff;
				color: #ABABAB;
				font-weight: 600;
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				width: 20%;
				>view{
					padding: 10rpx 0;
					width: 100%;
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					cursor: pointer;
				}
				.line{
					border-left: 6rpx solid #FFC400;
					background-color: #F8F8F8;
					color: #FFC400;
				}
			}
			.contant-right{
				background-color: #fff;
				width: 80%;
				padding: 0 20rpx;
				box-sizing: border-box;
				.childe{
					>view:first-child{
						color: #ABABAB;
						margin-bottom: 20rpx;
					}
					.childe-item{
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 20rpx;
						.coin{
							background-color: #F8F8F8;
							border-radius: 12rpx;
							display: flex;
							align-items: center;
							gap: 20rpx;
							width: 100%;
							box-sizing: border-box;
							padding: 20rpx;
							cursor: pointer;
							.image-box{
								width: 128rpx;
								aspect-ratio: 1/1;
								display: flex;
								align-items: center;
								image{
									width: 128rpx;
									height: 128rpx;
								}
							}
							
						}
						.active{
							background: #FFF0DC;
							color: #BF7D00;
						}
						.no-coin {
							border-radius: 12rpx;
							border: 2rpx dashed #D8D8D8;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 20rpx 10rpx;
						
							.img-pic {
								width: 116rpx;
								height: 116rpx;
								display: block;
								margin-right: 20rpx;
							}
						
							.desc {
								flex: 1;
								font-weight: 400;
								font-size: 26rpx;
								color: #ABABAB;
							}
						}
					}
				}
			}
		}
		

	}
</style>