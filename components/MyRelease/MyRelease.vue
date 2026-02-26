<template>
	<view class="MyRelease" v-if="isShowstep === 1">
		<view class="myrelease-top">
			<view>
				<view>您想发布什么<span>珍宝</span>？</view>
				<view>专业的收藏品分类体系，助您更精准地触达潜在买家</view>
			</view>
			<view class="release-head">
				<view class="head-tap">
					<view v-for="(item,index) in classifyList" :class="{active: classifyId === item.id}"
						@click="onClassify(item)">
						<image :src="globalstore.upImageuler(item.icon + '?imageMogr2/thumbnail/x100')" webp mode="heightFix"></image>
						<view>{{item.title}}</view>
					</view>
				</view>
				<view class="head-search">
					<view>
						<image :src="globalstore.upImageuler('/static/mine/search.png')" mode="aspectFit"></image>
						<input type="text" placeholder="2026马年贺岁纪念钞" placeholder-class="placeholder"
							v-model="search" @input="searchInput" />
					</view>
					<button @click="onSearch('2026马年贺岁纪念钞')">搜索</button>
				</view>
			</view>
		</view>
		<view class="myrelease-bottom-paper" v-if="classifyId === classifyList[0].id && search === ''">
			<view class="content-title">
				<view v-for="(item,index) in paper.list" :class="{active: item.id === paper.show_selectId}"
					@click="paper.click(item)"><span>{{item.name}}</span></view>
			</view>
			<view class="content-info">
				<view class="info-type">
					<scroll-view scroll-y style="height: 100%;" :scroll-into-view="paper.scrollId" scroll-with-animation
						@scroll="(e)=>paper.scroll(e)" id="paper_rootLook">
						<view id="paper_parentId">
							<view v-for="(item,index) in paper.list" class="scroll-info" :id="'paper' + item.id">
								<view>{{item.name}}</view>
								<view class="childer-list">
									<view v-for=" _item in (item.list || item.childList)" :class="{active: paper.childerId === _item.id}"
										@click="paper.onChilder(_item,item.collectionName,item.id)">
										<image :src=" (_item.imageUrl || _item.imageUrls?.[0]) + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
										<view>{{_item.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="info-specs" v-if="Object.keys(paper.selectCate).length !== 0">
					<view>
						<view>已选{{paper.selectCateId !== -1 ? 1 : 0}}张</view>
						<button @click="paper.submit()">下一步</button>
					</view>
					<view class="fixed">
						<image :src="paper.selectCate.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
						<image class="left-bg" :src="globalstore.upImageuler('/static/mine/left-bg.png')" mode="heightFix"></image>
						<view>{{paper.selectCate.name}}</view>
					</view>
					<view class="specs-list">
						<view>{{paper.selectCate.name}}</view>
						<view class="content">
							<view v-for="(item,index) in paper.selectCate.specsFlatList1" :key="item.id"
								:class="{active: index === paper.selectCateId}" @click="paper.selectCateId = index">
								<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
								<view>{{item.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="myrelease-bottom-paper" v-if="classifyId === classifyList[1].id && search === ''">
			<view class="content-title">
				<scroll-view style="height: 100%;" scroll-y :scroll-into-view="metals.scrollTitleId" >
					<view v-for="(item,index) in metals.years" :class="{active: JSON.stringify(item) === metals.show_selectId}"
						class="metals-scroll-title" :id="'metalsTitle' + item" @click="metals.click(JSON.stringify(item))">
						<span>{{item}}年</span>
					</view>
				</scroll-view>
			</view>
			<view class="content-info">
				<view class="coin-type">
					<scroll-view scroll-y style="height: 100%;" :scroll-into-view="metals.scrollId" scroll-with-animation
						@scroll="(e)=>metals.scroll(e)" id="metals_rootLook">
						<view id="metals_parentId">
							<view class="metals-scroll-info" v-for="(item,index) in metals.childList" :id="'metals' + item.id">
								<view>{{item.name}}<span>共{{item.total}}个</span></view>
								<view class="content">
									<view v-for="_item in item.list" :key="_item.id" :class="{active: _item.id === metals.childId.id}"
										@click="metals.onChilder(item,_item)">
										<view>
											<image :src="_item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
										</view>
										<view>{{_item.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="info-specs">
					<view>
						<view>
							{{metals.sunId.specsFlatList1.length === 0 && metals.sunId.specsFlatList2 === '' ? '请选择' : metals.sunId.specsFlatList1.length !== 0 ? `已选${metals.sunId.specsFlatList1.length}枚` : '已选1套' }}
						</view>
						<button @click="metals.submit()">下一步</button>
					</view>
					<view class="fixed">
						<image :src="metals.childId.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
						<image class="left-bg" :src="globalstore.upImageuler('/static/mine/left-bg.png')" mode="heightFix"></image>
						<view>{{metals.childId.name}}</view>
					</view>
					<view class="coinsun-list" :key="metals.childId.id">
						<view class="item" v-if="metals.selectSunChild.specsFlatList1.length !== 0">
							<view>单币 (可多选)</view>
							<view class="list">
								<view v-for="(item,index) in metals.selectSunChild.specsFlatList1"
									:class="{active: metals.sunId.specsFlatList1.includes(index)}" :key="item.id + index"
									@click="metals.onSun(index,1)">
									<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									<view>{{item.specificationsName}}</view>
								</view>
							</view>
						</view>
						<view class="item" v-if="metals.selectSunChild.specsFlatList2.length !== 0">
							<view>套币</view>
							<view class="list">
								<view v-for="(item,index) in metals.selectSunChild.specsFlatList2"
									:class="{active: metals.sunId.specsFlatList2 === JSON.stringify(index)}" :key="item.cid + index"
									@click="metals.onSun(JSON.stringify(index),2)">
									<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									<view>{{item.specificationsName}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="myrelease-bottom-paper" v-if="classifyId === classifyList[2].id && search === ''">
			<view class="content-title">
				<scroll-view style="height: 100%;" scroll-y :scroll-into-view="common.scrollTitleId" >
					<view v-for="(item,index) in common.years" :class="{active: JSON.stringify(item) === common.show_selectId}"
						class="metals-scroll-title" :id="'commonTitle' + item" @click="common.click(JSON.stringify(item))">
						<span>{{item}}年</span>
					</view>
				</scroll-view>
			</view>
			<view class="content-info">
				<view class="coin-type">
					<scroll-view scroll-y style="height: 100%;" :scroll-into-view="common.scrollId" scroll-with-animation
						@scroll="(e)=>common.scroll(e)" id="common_rootLook">
						<view id="common_parentId">
							<view class="common-scroll-info" v-for="(item,index) in common.childList" :id="'common' + item.id">
								<view>{{item.name}}<span>共{{item.total}}个</span></view>
								<view class="content">
									<view v-for="_item in item.list" :key="_item.id" :class="{active: _item.id === common.childId.id}"
										@click="common.onChilder(item,_item)">
										<view>
											<image :src="_item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
										</view>
										<view>{{_item.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="info-specs">
					<view>
						<view>
							{{common.sunId.specsFlatList1.length === 0 && common.sunId.specsFlatList2 === '' ? '请选择' : common.sunId.specsFlatList1.length !== 0 ? `已选${common.sunId.specsFlatList1.length}枚` : '已选1套' }}
						</view>
						<button @click="common.submit()">下一步</button>
					</view>
					<view class="fixed">
						<image :src="common.childId.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
						<image class="left-bg" :src="globalstore.upImageuler('/static/mine/left-bg.png')" mode="heightFix"></image>
						<view>{{common.childId.name}}</view>
					</view>
					<view class="coinsun-list" :key="common.childId.id">
						<view class="item" v-if="common.selectSunChild.specsFlatList1.length !== 0">
							<view>单币 (可多选)</view>
							<view class="list">
								<view v-for="(item,index) in common.selectSunChild.specsFlatList1"
									:class="{active: common.sunId.specsFlatList1.includes(index)}" :key="item.id + index"
									@click="common.onSun(index,1)">
									<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									<view>{{item.specificationsName}}</view>
								</view>
							</view>
						</view>
						<view class="item" v-if="common.selectSunChild.specsFlatList2.length !== 0">
							<view>套币</view>
							<view class="list">
								<view v-for="(item,index) in common.selectSunChild.specsFlatList2"
									:class="{active: common.sunId.specsFlatList2 === JSON.stringify(index)}" :key="item.cid + index"
									@click="common.onSun(JSON.stringify(index),2)">
									<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									<view>{{item.specificationsName}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="myrelease-bottom-paper" v-if="classifyId === classifyList[3].id && search === ''">
			<view class="content-title">
				<scroll-view style="height: 100%;" scroll-y>
					<view v-for="(item,index) in stamp.list" class="metals-scroll-title"
						:class="{active: stamp.selectId === item.id}" @click="stamp.click(item)"><span>{{item.title}}</span></view>
				</scroll-view>
			</view>
			<view class="content-info">
				<view class="coin-type">
					<scroll-view scroll-y style="height: 100%;" scroll-with-animation
						:scroll-into-view="'stamp' + stamp.selectId">
						<view class="stamp-scroll-info" v-for="(item,index) in stamp.list" :key="item.id" :id="'stamp' + item.id">
							<view>{{item.name}}</view>
							<view class="child-info">
								<view class="child-item" v-for="(child_item,childI_index) in item.subCollectionNames">
									<view>{{child_item.displayName}}</view>
									<view class="sun-info">
										<view v-for="(sun_item,sun_index) in child_item.list"
											:class="{active: stamp.selectChild.id === sun_item.id}"
											@click="stamp.onChilder(child_item.collectionName,sun_item,child_item)">
											<view>
												<image :src="sun_item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
											</view>
											<view>{{sun_item.name}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="info-specs">
					<view>
						<view>
							{{stamp.specsFlatList1 === -1 ? '请选择' : '已选择1枚'}}
						</view>
						<button @click="stamp.submit()">下一步</button>
					</view>
					<view class="fixed">
						<image :src="stamp.selectChild.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
						<image class="left-bg" :src="globalstore.upImageuler('/static/mine/left-bg.png')" mode="heightFix"></image>
						<view>{{stamp.selectChild.name}}</view>
					</view>
					<view class="coinsun-list" :key="stamp.selectChild.id">
						<view class="item" v-if="stamp.selectSunChild.specsFlatList1.length !== 0">
							<view></view>
							<view class="list">
								<view v-for="(item,index) in stamp.selectSunChild.specsFlatList1"
									:class="{active: stamp.specsFlatList1 === index}" :key="item.id + index" @click="stamp.onSun(index)">
									<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									<view>{{item.specificationsName}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="search" v-if="search !== '' && searchList.length !== 0" >
			<view class="search-content">
				<view v-for="item of searchList" :key="item.type">
					<view>{{item.name}}</view>
					<view class="search-list">
						<view class="search-child" v-for="ite in item.children" :key="ite.id">
							<view>{{ite.name}}</view>
							<view class="child-list">
								<view v-for="it in ite.items" @click="searchRef.search(it)"
									:class="{active: it.id === searchRef.select.id}">
									<view>
										<image :src="it.imageUrl || it.imageUrls[0] + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
									</view>
									<view v-html="it.span"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="search-sun" v-if="Object.keys(searchRef.selectChild).length !== 0">
				<view>
					<view>
						{{searchRef.total}}
					</view>
					<button @click="searchRef.submit()">下一步</button>
				</view>
				<view class="fixed">
					<image :src="searchRef.select.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
					<image class="left-bg" :src="globalstore.upImageuler('/static/mine/left-bg.png')" mode="heightFix"></image>
					<view>{{searchRef.select.name}}</view>
				</view>
				<view class="coinsun-list" :key="searchRef.select.id">
					<view class="item" v-if="searchRef.selectChild.specsFlatList1.length !== 0">
						<view>单币 {{searchRef.select.type === 'gold_coin' || searchRef.select.type === 'common_coin' ? '(可多选)' : '' }}</view>
						<view class="list">
							<view v-for="(item,index) in searchRef.selectChild.specsFlatList1"
								:class="{active: searchRef.childId.specsFlatList1.includes(index)}" :key="index"
								@click="searchRef.onSunNum(index,1)">
								<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
								<view>{{item.specificationsName}}</view>
							</view>
						</view>
					</view>
					<view class="item" v-if="searchRef.selectChild.specsFlatList2.length !== 0">
						<view>套币</view>
						<view class="list">
							<view v-for="(item,index) in searchRef.selectChild.specsFlatList2"
								:class="{active: searchRef.childId.specsFlatList2 === JSON.stringify(index)}" :key="item.cid + index"
								@click="searchRef.onSunNum(index,2)">
								<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
								<view>{{item.specificationsName}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="search" v-if="search !== '' && searchList.length === 0">
			<view class="search-content" nohave>
				<view class="search-no">
					<image :src="globalstore.upImageuler('/static/mine/no-content.png')" mode="widthFix"></image>
					<view>未匹配到结果，试试换一个关键词吧～</view>
				</view>
			</view>
		</view>
	</view>
	<purchase v-if="isShowstep === 2" :data="PropsData" @step="onPurchase"></purchase>
	<view v-if="isShowstep === 3" class="publish-success">
		<view>
			<image :src="globalstore.upImageuler('/static/seccess.png')" mode="aspectFill"></image>
			<view>发布成功</view>
		</view>
		<view>
			<button @click="onSuccess('list')">查看发布列表</button>
			<view @click="onSuccess('home')">返回首页 <uni-icons type="right" size="16" color="#FFC400"></uni-icons> </view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	import {
		bankNote,
		rate,
		addressList,
		yearList,
		yearListcom,
		stampCategoryList,
		category,
		categoryList,
		categoryListcom,
		varietyList,
		varietyList2,
		stampCategory
	} from '../../api/common';
	import Purchase from '../publish/Purchase.vue';
	import dbPromise from '../../api/db';
	import {onLoad} from '@dcloudio/uni-app'
	import { useGlobalStore } from '../../store/store';
	
	const globalstore = useGlobalStore()

	const props = defineProps({
		release: {
			type: String,
			required: true
		},
		isStep: {
			type: Boolean,
			default: false
		}
	})

	const classifyList = [{
			id: '',
			type: 'paper_money',
			title: '纸币',
			icon: '/static/mine/relezhi.png'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f96a',
			type: 'gold_coin',
			title: '贵金属纪念币',
			icon: '/static/mine/relegui.png'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f97a',
			type: 'common_coin',
			title: '普通纪念币',
			icon: '/static/mine/relepu.png'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e3940001',
			type: 'stamp',
			title: '邮票',
			icon: '/static/mine/relehou.png'
		}
	]

	const classifyId = ref(classifyList[0].id)
	const isShowstep = ref(1)
	const PropsData = ref({})
	const search = ref('')
	const searchList = ref([])

	const paper = ref({
		list: [],
		categoryList: [],
		selectCate: {},
		selectId: '',
		show_selectId: '',
		childerId: '',
		selectCateId: -1,
		collectionName: '',
		element: [],
		scrollId: '',
		timer: null,
		click(item) {
			this.selectId = item.id
			this.show_selectId = item.id
			this.scrollId = 'paper' + item.id
		},
		onChilder(item, collec, id) {
			this.childerId = item.id
			this.selectId = id
			this.selectCateId = -1
			if (!collec) {
				this.submit('1')
				this.collectionName = ''
				this.categoryList = []
				this.selectCate = {}
				return
			}

			if (this.collectionName === collec && this.categoryList.length) {
				this.selectCate = this.categoryList.find(cate => cate.id === this.childerId)
				return
			}

			this.collectionName = collec
			this.getCategory(collec, item.id)
		},
		getCategory(name, id) {
			category({
				collectionName: name
			}).then(res => {
				this.categoryList = res.data
				this.selectCate = res.data.find(item => item.id === this.childerId)
			})
		},
		submit(type) {
			
			if (type) {
				PropsData.value = {
					title: classifyList.find(item => item.id === classifyId.value).title + ' / ' + this.list[0].name +
						' / ' + this.list[0].childList.find(item => item.id === this.childerId).name,
					name: this.list[0].childList.find(item => item.id === this.childerId).name,
					type: classifyList[0].type,
					list: this.list[0],
					childList: this.list[0].childList.find(item => item.id === this.childerId),
					release: props.release
				}
			} else {
				if (this.selectCateId === -1) {
					uni.showToast({
						title: '请选择要发布的珍宝',
						icon: 'none'
					})
					return
				}
				PropsData.value = {
					title: this.list.find(item => item.id === this.selectId).name + ' / ' + this.selectCate.name + ' / ' +
						this.selectCate.specsFlatList1[this.selectCateId].name,
					name: this.list.find(item => item.id === this.selectId).name + this.selectCate.name,
					type: 'banknote_other',
					list: this.list.find(item => item.id === this.selectId),
					childList: this.selectCate,
					specsFlatList1: [this.selectCate.specsFlatList1[this.selectCateId]],
					release: props.release
				}
			}
			// console.log(PropsData.value);
			isShowstep.value = 2
		},
		scroll(e) {
			getDomChildId('paper',(visibleIds)=>{
				const id = visibleIds.length !==0 ? visibleIds[0].replace('paper','') : ''
				if(id) this.show_selectId = id
			})
			// if (this.timer) clearTimeout(this.timer)
			// this.timer = setTimeout(() => {
			// 	let scrollTop = e.detail.scrollTop
			// 	let _index = 0
			// 	if (this.element.length === 0) {
			// 		uni.createSelectorQuery().selectAll('.scroll-info').boundingClientRect(data => {
			// 			let total = 0
			// 			this.element = data.map(item => {
			// 				total += item.height
			// 				return total
			// 			})
			// 		}).exec()
			// 	}
			// 	// 遍历 this.element，找到 scrollTop 所在的区间
			// 	for (let i = 0; i < this.element.length; i++) {
			// 		if (i === 0) {
			// 			if (scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		} else {
			// 			if (scrollTop >= this.element[i - 1] && scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	if (scrollTop >= this.element[this.element.length - 1]) {
			// 		_index = this.element.length - 1;
			// 	}
			// 	// this.selectId = this.list[_index].id
			// }, 50)
		}
	})

	const metals = ref({
		years: [],
		childList: [],
		sunList: [],
		selectId: '',
		show_selectId: '',
		childId: '',
		sunId: {
			specsFlatList1: [],
			specsFlatList2: ''
		},
		selectSunChild: {},
		scrollId: '',
		scrollTitleId: '',
		element: [],
		timer: null,
		click(item) {
			this.selectId = item
			this.scrollId = 'metals' + item
			this.show_selectId = item
		},
		onChilder(item, child) {
			this.selectId = item.id
			if (this.childId.year !== child.year || this.sunList.length === 0) getSunmetalsList(child)
			else {
				this.selectSunChild = this.sunList.find(item => item.id === child.id)
			}
			this.sunId.specsFlatList1.length = 0
			this.sunId.specsFlatList2 = ''
			this.childId = child
			
		},
		onSun(index, type) {
			if (type === 1) {
				this.sunId.specsFlatList2 = ''
				const idx = this.sunId.specsFlatList1.indexOf(index)
				idx === -1 ?
					this.sunId.specsFlatList1.push(index) :
					this.sunId.specsFlatList1.splice(idx, 1)
			}
			if (type === 2) {
				this.sunId.specsFlatList1 = []
				this.sunId.specsFlatList2 = index
			}
		},
		submit() {
			if (this.sunId.specsFlatList1.length === 0 && this.sunId.specsFlatList2 === '') {
				uni.showToast({
					title: '请选择要发布的珍宝',
					icon: 'none'
				})
				return
			}
			
			PropsData.value = {
				title: classifyList[1].title + ' / ' + this.childId.year + ' / ' + this.childId.name,
				name: this.childId.year + this.childId.name,
				type: 'gold_coin',
				list: this.childId,
				childList: this.selectSunChild,
				specsFlatList1: [],
				specsFlatList2: {},
				release: props.release
			}
			PropsData.value.list.productCategoryId = classifyList[1].id
			PropsData.value.childList.issuanceDate = PropsData.value.childList.issueDate ? PropsData.value.childList
				.issueDate : ''
			if (this.sunId.specsFlatList1.length !== 0) {
				this.sunId.specsFlatList1.forEach(item => {
					PropsData.value.specsFlatList1.push(this.selectSunChild.specsFlatList1[item])
				})
			} else {
				PropsData.value.specsFlatList2 = this.selectSunChild.specsFlatList2[this.sunId.specsFlatList2]
			}
			
			// console.log(PropsData.value);
			isShowstep.value = 2
		},
		scroll(e) {
			getDomChildId('metals',(visibleIds)=>{
				const id = visibleIds.length !==0 ? visibleIds[0].replace('metals','') : ''
				if(id && this.show_selectId !== id) {
					this.show_selectId = id
					this.scrollTitleId = 'metalsTitle' + id
				}
			})
			// if (this.timer) clearTimeout(this.timer)
			// this.timer = setTimeout(() => {
			// 	let scrollTop = e.detail.scrollTop
			// 	let _index = 0
			// 	if (this.element.length === 0) {
			// 		uni.createSelectorQuery().selectAll('.metals-scroll-info').boundingClientRect(data => {
			// 			let total = 0
			// 			this.element = data.map(item => {
			// 				total += item.height
			// 				return total
			// 			})
			// 		}).exec()
			// 	}
			// 	for (let i = 0; i < this.element.length; i++) {
			// 		if (i === 0) {
			// 			if (scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		} else {
			// 			if (scrollTop >= this.element[i - 1] && scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	if (scrollTop >= this.element[this.element.length - 1]) {
			// 		_index = this.element.length - 1;
			// 	}
			// 	// this.selectId = this.childList[_index].id
			// 	this.scrollTitleId = _index < 6 ? 'metalsTitle' + this.childList[0].id : 'metalsTitle' + this.childList[
			// 		_index - 6].id
			// }, 50)
		}
	})

	const common = ref({
		years: [],
		childList: [],
		sunList: [],
		selectId: '',
		show_selectId: '',
		childId: '',
		sunId: {
			specsFlatList1: [],
			specsFlatList2: ''
		},
		selectSunChild: {},
		scrollId: '',
		scrollTitleId: '',
		element: [],
		timer: null,
		click(item) {
			this.selectId = item
			this.scrollId = 'common' + item
			this.show_selectId = item
		},
		onChilder(item, child) {
			this.selectId = item.id
			if (this.childId.year !== child.year || this.sunList.length === 0) getSuncommonList(child)
			else {
				this.selectSunChild = this.sunList.find(item => item.id === child.id)
			}
			this.sunId.specsFlatList1.length = 0
			this.sunId.specsFlatList2 = ''
			this.childId = child
		},
		onSun(index, type) {
			if (type === 1) {
				this.sunId.specsFlatList2 = ''
				const idx = this.sunId.specsFlatList1.indexOf(index)
				idx === -1 ?
					this.sunId.specsFlatList1.push(index) :
					this.sunId.specsFlatList1.splice(idx, 1)
			}
			if (type === 2) {
				this.sunId.specsFlatList1 = []
				this.sunId.specsFlatList2 = index
			}
		},
		submit() {
			if (this.sunId.specsFlatList1.length === 0 && this.sunId.specsFlatList2 === '') {
				uni.showToast({
					title: '请选择要发布的珍宝',
					icon: 'none'
				})
				return
			}
			PropsData.value = {
				title: classifyList[2].title + ' / ' + this.childId.year + ' / ' + this.childId.name,
				name: this.childId.year + this.childId.name,
				type: 'common_coin',
				list: this.childId,
				childList: this.selectSunChild,
				specsFlatList1: [],
				specsFlatList2: {},
				release: props.release
			}
			PropsData.value.list.productCategoryId = classifyList[2].id
			PropsData.value.childList.issuanceDate = PropsData.value.childList.issueDate ? PropsData.value.childList
				.issueDate : ''
			if (this.sunId.specsFlatList1.length !== 0) {
				this.sunId.specsFlatList1.forEach(item => {
					PropsData.value.specsFlatList1.push(this.selectSunChild.specsFlatList1[item])
				})
			} else {
				PropsData.value.specsFlatList2 = this.selectSunChild.specsFlatList2[this.sunId.specsFlatList2]
			}
			isShowstep.value = 2
		},
		scroll(e) {
			getDomChildId('common',(visibleIds)=>{
				const id = visibleIds.length !==0 ? visibleIds[0].replace('common','') : ''
				console.log(id);
				if(id && this.show_selectId !== id) {
					this.show_selectId = id
					this.scrollTitleId = 'commonTitle' + id
				}
			})
			// if (this.timer) clearTimeout(this.timer)
			// this.timer = setTimeout(() => {
			// 	let scrollTop = e.detail.scrollTop
			// 	let _index = 0
			// 	if (this.element.length === 0) {
			// 		uni.createSelectorQuery().selectAll('.common-scroll-info').boundingClientRect(data => {
			// 			let total = 0
			// 			this.element = data.map(item => {
			// 				total += item.height
			// 				return total
			// 			})
			// 		}).exec()
			// 	}
			// 	for (let i = 0; i < this.element.length; i++) {
			// 		if (i === 0) {
			// 			if (scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		} else {
			// 			if (scrollTop >= this.element[i - 1] && scrollTop < this.element[i]) {
			// 				_index = i;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	if (scrollTop >= this.element[this.element.length - 1]) {
			// 		_index = this.element.length - 1;
			// 	}
			// 	// this.selectId = this.childList[_index].id
			// 	this.scrollTitleId = _index < 6 ? 'commonTitle' + this.childList[0].id : 'commonTitle' + this.childList[
			// 		_index - 6].id
			// }, 50)
		}
	})

	const stamp = ref({
		list: [],
		sunList: [],
		selectId: '',
		selectChild: {},
		collectionName: '',
		selectSunChild: {},
		specsFlatList1: -1,
		childItem: {},
		click(item) {
			this.selectId = item.id
		},
		onChilder(type, item, child) {
			if (this.collectionName !== type || this.sunList.length === 0) getSunstampList(type)
			else {
				this.selectSunChild = this.sunList.find(_item => _item.id === item.id)
			}
			this.childItem = child
			this.collectionName = type
			this.selectChild = item
			this.specsFlatList1 = -1

		},
		onSun(index) {
			this.specsFlatList1 = index
		},
		submit() {
			
			if (this.specsFlatList1 === -1) {
				uni.showToast({
					title: '请选择要发布的珍宝',
					icon: 'none'
				})
				return
			}
			PropsData.value = {
				title: classifyList[3].title + ' / ' + this.childItem.displayName + ' / ' + this.selectChild.name,
				name: this.childItem.displayName + this.selectChild.name,
				type: 'stamp',
				list: this.selectChild,
				childList: this.selectSunChild,
				specsFlatList1: [this.selectSunChild.specsFlatList1[this.specsFlatList1]],
				release: props.release
			}
			PropsData.value.list.productCategoryId = classifyList[3].id
			// console.log(PropsData.value);
			isShowstep.value = 2
		}
	})

	const onClassify = (item) => {
		if(search.value !== '') search.value = ''
		classifyId.value = item.id
		
	}

	const getSunmetalsList = (child) => {
		varietyList({
			year: child.year
		}).then(res => {
			metals.value.sunList = res.data
			metals.value.selectSunChild = res.data.find(item => item.id === child.id)
		})
	}

	const getSuncommonList = (child) => {
		varietyList2({
			year: child.year
		}).then(res => {
			common.value.sunList = res.data
			common.value.selectSunChild = res.data.find(item => item.id === child.id)
		})
	}

	const getSunstampList = (collectionName) => {
		stampCategory({
			collectionName
		}).then(res => {
			stamp.value.sunList = res.data
			stamp.value.selectSunChild = res.data.find(item => item.id === stamp.value.selectChild.id)
		})
	}

	const getList = () => {
		return Promise.all([
			bankNote({
				type: 1
			}).then(res => {
				Object.assign(paper.value, {
					list: [res.data[0].childList[0], ...res.otherData],
					selectId: res.data[0].childList[0].id,
					show_selectId: res.data[0].childList[0].id,
					childerId: res.data[0].childList[0].childList[0].id,
				});
				
				let data = JSON.parse(JSON.stringify(res.data[0].childList[0]))
				data.list = data.childList
				delete data.childList
				const paperData = {
					id: 'paper_money',
					name: '纪念钞',
					content: [data]
				}
				addSampleData(paperData)
				const otherData = {
					id: 'banknote_other', 
					name: '人民币',
					content: res.otherData
				}
				addSampleData(otherData)
			}),

			yearList().then(res => {
				Object.assign(metals.value, {
					years: res.data,
					selectId: JSON.stringify(res.data[0]),
					show_selectId: JSON.stringify(res.data[0])
				});
				return categoryList(res.data).then(reslove => {
					metals.value.childList = Object.keys(reslove.data).map(item => ({
						name: `${item}年`,
						id: item,
						total: reslove.data[item].length,
						list: reslove.data[item],
					}));
					metals.value.childList.sort((a, b) => b.id - a.id);
					metals.value.childId = metals.value.childList[0].list[0];
					const goldData = {
						id: 'gold_coin',
						name: '贵金属纪念币',
						content: JSON.parse(JSON.stringify(metals.value.childList)),
					}
					addSampleData(goldData)
					return getSunmetalsList(metals.value.childId);
				});
			}),

			yearListcom().then(res => {
				Object.assign(common.value, {
					years: res.data,
					selectId: JSON.stringify(res.data[0]),
					show_selectId: JSON.stringify(res.data[0]),
				});
				return categoryListcom(res.data).then(reslove => {
					common.value.childList = Object.keys(reslove.data).map(item => ({
						name: `${item}年`,
						id: item,
						total: reslove.data[item].length,
						list: reslove.data[item],
					}));
					common.value.childList.sort((a, b) => b.id - a.id);
					common.value.childId = common.value.childList[0].list[0];
					const commonData = {
						id: 'common_coin',
						name: '普通金属纪念币',
						content: JSON.parse(JSON.stringify(common.value.childList))
					}
					addSampleData(commonData)
					return getSuncommonList(common.value.childId);
				});
			}),
		]);
	};

	const getStamp = () => {
		stampCategoryList().then(res => {
			stamp.value.list = res.data.map(item => ({
				...item,
				title: item.name.split('邮票')[0]
			}))
			stamp.value.selectId = res.data[0].id
			stamp.value.selectChild = res.data[0].subCollectionNames[0].list[0]
			stamp.value.childItem = res.data[0].subCollectionNames[0]
			stamp.value.collectionName = res.data[0].subCollectionNames[0].collectionName
			const stampData = {
				id: 'stamp',
				name: '邮票',
				content: JSON.parse(JSON.stringify(stamp.value.list))
			}
			addSampleData(stampData)
			getSunstampList(stamp.value.collectionName)
		})
	}

	const onPurchase = (e) => {
		console.log(e);
		if(props.isStep && e == 1) {
			uni.navigateBack()
			return
		}
		isShowstep.value = +e
	}

	async function asyncGetList() {
		try {
			await getList()
			getStamp()
		} catch (err) {
			console.error(err)
		}
	}

	//type 纪念钞、人民币、贵金属纪念币、普通金属纪念币、邮票：paper_money、banknote_other、gold_coin、common_coin、stamp
	async function addSampleData(data) {
		const db = await dbPromise
		const tx = db.transaction('item', 'readwrite')
		const store = tx.objectStore('item')
		try {
			await store.put(data)
			await tx.done
		} catch (err) {
			console.error('your are idon', err)
			await tx.abort()
		}
	}

	const getSearch = async(input) => {
		const db = await dbPromise
		const txRead = db.transaction('item', 'readonly')
		const store = txRead.objectStore('item')
		const allData = await store.getAll()
		const results = []
		for (const item of allData) {
			for (const childItem of item.content) {
				if (!childItem.list) {
					for (const stampItem of childItem.subCollectionNames) {
						for (const sunItem of stampItem.list) {
							if (sunItem.name && sunItem.name.includes(input)) {
								results.push({
									...sunItem,
									type: item.id,
									selectChild: stampItem,
									stampType: childItem
								})
							}

						}
					}
				} else {
					for (const sunItem of childItem.list) {
						if (sunItem.name && sunItem.name.includes(input)) {
							results.push({
								...sunItem,
								type: item.id,
								selectChild: childItem
							})
						}
					}
				}
			}
		}

		results.forEach(item => {
			item.span = item.name.split(input).join(`<span style='color: #BF7D2B;'>${input}</span>`)
		})
		// 1. 定义 type 映射关系（同之前）
		const typeMap = {
			paper_money: "纸币",
			banknote_other: "纸币",
			gold_coin: "贵金属纪念币",
			common_coin: "普通金属纪念币",
			stamp: "邮票",
		};

		// 2. 定义排序权重（数值越小，排越前）
		const sortOrder = {
			"纸币": 1,
			"贵金属纪念币": 2,
			"普通金属纪念币": 3,
			"邮票": 4,
		};

		

		// 3. 分组逻辑（保持不变）
		const groupedResults = {};
		for (const item of results) {
			const {
				type,
				selectChild
			} = item;
			const mappedType = typeMap[type] || type;

			if (!groupedResults[mappedType]) {
				groupedResults[mappedType] = {};
			}

			const childId = selectChild.id || selectChild.collectionName;
			if (!groupedResults[mappedType][childId]) {
				groupedResults[mappedType][childId] = {
					items: [],
					name: selectChild.name || selectChild.displayName, // 存储 selectChild.name
				};
			}

			groupedResults[mappedType][childId].items.push(item);
		}
		
		// 4. 转换成目标结构并排序
		searchList.value = Object.entries(groupedResults)
			.map(([name, childGroups]) => ({
				name,
				type: Object.keys(typeMap).find(key => typeMap[key] === name) || name,
				children: Object.entries(childGroups)
					.map(([id, {
						items,
						name: childName
					}]) => ({
						id,
						name: childName,
						items,
					}))
					// 如果是 gold_coin 或 common_coin，按 id 升序排序
					.sort((a, b) => {
						const currentType = Object.keys(typeMap).find(key => typeMap[key] === name) || name;
						if (currentType === "gold_coin" || currentType === "common_coin") {
							return b.id - a.id; // 按 id 升序
						}
						return 0; // 保持原顺序
					}),
			}))
			.sort((a, b) => sortOrder[a.name] - sortOrder[b.name]);
		
	}

	const searchInput = (e) => {
		if (e.detail.value === '') {
			classifyId.value = classifyList[0].id
			return
		}
		classifyId.value = '-1'
		getSearch(e.detail.value)
	}
	
	const onSearch = (e) =>{
		if(search.value !== '') return
		classifyId.value = '-1'
		search.value = e
		getSearch(e)
	}

	const searchRef = ref({
		select: {},
		selectChild: {},
		childId: {
			specsFlatList1: [],
			specsFlatList2: ''
		},
		total: '请选择',
		onSunNum(index, type) {
			
			if (type === 1) {
				if (this.select.type === 'banknote_other') {
					this.childId.specsFlatList1 = [index]
					this.total = '已选1张'
				} else if (this.select.type === 'gold_coin' || this.select.type === 'common_coin') {
					this.childId.specsFlatList2 = ''
					let idx = this.childId.specsFlatList1.indexOf(index)
					idx === -1 ? this.childId.specsFlatList1.push(index) : this.childId.specsFlatList1.splice(idx, 1)
					this.total = `已选择${this.childId.specsFlatList1.length}枚`
				} else if (this.select.type === 'stamp') {
					this.childId.specsFlatList1 = [index]
					this.total = '已选1枚'
				}
			} else {
				if (this.select.type === 'gold_coin' || this.select.type === 'common_coin') {
					this.childId.specsFlatList1.length = 0
					this.childId.specsFlatList2 = JSON.stringify(index)
					this.total = `已选择1枚`
				}
			}
		},
		search(e) {
			this.remodel()
			this.select = e
			if (e.type === 'paper_money') {
				PropsData.value = {
					type: e.type,
					name: e.name,
					title: '纸币 / ' + e.selectChild.name + ' / ' + e.name,
					release: props.release,
					list: e.selectChild,
					childList: e
				}
				isShowstep.value = 2
			} else if (e.type === 'banknote_other') {
				category({
					collectionName: e.selectChild.collectionName
				}).then(res => {
					this.selectChild = res.data.find(item => item.id === this.select.id)
				})
			} else if (e.type === 'gold_coin') {
				varietyList({
					year: e.selectChild.id
				}).then(res => {
					this.selectChild = res.data.find(item => item.id === this.select.id)
				})
			} else if (e.type === 'common_coin') {
				varietyList2({
					year: e.selectChild.id
				}).then(res => {
					this.selectChild = res.data.find(item => item.id === this.select.id)
				})
			} else if (e.type === 'stamp') {
				stampCategory({collectionName: e.selectChild.collectionName}).then(res=>{
					this.selectChild = res.data.find(item => item.id === this.select.id)
				})
			}
		},
		submit() {
			if (this.childId.specsFlatList1.length === 0 && this.childId.specsFlatList2 === '') {
				uni.showToast({
					title: '请选择您要发布的珍品',
					icon: 'none'
				})
				return
			}
			if (this.select.type === 'banknote_other') {
				PropsData.value = {
					title: this.select.selectChild.name + ' / ' + this.selectChild.name + ' / ' + this.selectChild
						.specsFlatList1[this.childId.specsFlatList1[0]].name,
					name: this.select.selectChild.name + this.selectChild.name,
					type: 'banknote_other',
					list: this.select.selectChild,
					childList: this.selectChild,
					specsFlatList1: [this.selectChild.specsFlatList1[this.childId.specsFlatList1[0]]],
					release: props.release
				}
			} else if (this.select.type === 'gold_coin') {
				PropsData.value = {
					title: '贵金属纪念币 / ' + this.select.year + ' / ' + this.select.name,
					name: this.select.name,
					type: 'gold_coin',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [],
					specsFlatList2: {}
				}
				PropsData.value.list.productCategoryId = classifyList[1].id
				PropsData.value.childList.issuanceDate = PropsData.value.childList.issueDate ? PropsData.value.childList
					.issueDate : ''
				if (this.childId.specsFlatList1.length !== 0) {
					this.childId.specsFlatList1.forEach(item => {
						PropsData.value.specsFlatList1.push(this.selectChild.specsFlatList1[item])
					})
				} else {
					PropsData.value.specsFlatList2 = this.selectChild.specsFlatList2[this.childId.specsFlatList2]
				}
			} else if (this.select.type === 'common_coin') {
				PropsData.value = {
					title: '普通金属纪念币 / ' + this.select.year + ' / ' + this.select.name,
					name: this.select.name,
					type: 'common_coin',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [],
					specsFlatList2: {}
				}
				PropsData.value.list.productCategoryId = classifyList[2].id
				PropsData.value.childList.issuanceDate = PropsData.value.childList.issueDate ? PropsData.value.childList
					.issueDate : ''
				if (this.childId.specsFlatList1.length !== 0) {
					this.childId.specsFlatList1.forEach(item => {
						PropsData.value.specsFlatList1.push(this.selectChild.specsFlatList1[item])
					})
				} else {
					PropsData.value.specsFlatList2 = this.selectChild.specsFlatList2[this.childId.specsFlatList2]
				}
			} else if (this.select.type === 'stamp') {
				PropsData.value = {
					title: '邮票 / ' + this.select.selectChild.displayName + ' / ' + this.select.name ,
					name: this.select.selectChild.displayName + this.select.name,
					type: 'stamp',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [this.selectChild.specsFlatList1[this.childId.specsFlatList1[0]]],
				}
				PropsData.value.list.productCategoryId = classifyList[3].id
			}
			
			isShowstep.value = 2
		},
		remodel() {
			Object.assign(this, {
				childId: {
					specsFlatList1: [],
					specsFlatList2: ''
				},
				total: '请选择',
			})
			
		}
	})
	
	const getDomChildId = (type,callback) =>{
		const parent = document.getElementById(type + '_parentId')
		const look = document.getElementById(type + '_rootLook')
		const children = parent.children
		
		const observer = new IntersectionObserver((e)=>{
			const visibleIds = e.filter(entry => entry.isIntersecting).map(entry => entry.target.id)
			callback(visibleIds)
		},{
			root: look,
			threshold: 0.01
		})
		
		for(let child of children){
			observer.observe(child)
		}
		
		return ()=>observer.disconnect()
	}

	onMounted(() => {
		asyncGetList()
		
	})
	

	const onSuccess = (type) => {
		if (type === 'list') {
			uni.reLaunch({
				url: '/pages/mine/mine?type=mypuList'
			})
		}
		if (type === 'home') {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	}
	
	watch(()=>props.isStep,(n)=>{
		if(n){
			PropsData.value = JSON.parse(sessionStorage.getItem('cataData'))
			isShowstep.value = 2
			console.log(PropsData.value);
		}
	},{immediate: true})
</script>

<style scoped lang="scss">
	@mixin colum-gap($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}

	@mixin row-gap-center($gap) {
		display: flex;
		align-items: center;
		gap: $gap;
	}

	@mixin border {
		background: #FFFFFF;
		border-radius: 8px 8px 8px 8px;
		border: 1px solid rgba(219, 220, 224, 0.4);
	}

	@mixin grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-bottom: 2rpx solid #F3F3F3;
		padding-bottom: 28rpx;

		@media screen and (max-width: 2400px) {
			grid-template-columns: repeat(5, 1fr);
		}

		@media screen and (max-width: 2000px) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media screen and (max-width: 1600px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@mixin grid-conten {
		width: 100%;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 16rpx;
		padding: 12rpx;
		box-sizing: border-box;
		cursor: pointer;
		color: #656565;
		overflow: hidden;
		font-weight: 400;

		>view:first-child {
			width: 60%;
			aspect-ratio: 1/1;

			>image {
				width: 100%;
				height: 100%;
			}
		}

		>view:last-child {
			width: 100%;
			font-size: 24rpx;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.MyRelease {
		@include colum-gap(20rpx);
		width: 100%;
		height: 100%;

		.myrelease-top {
			@include colum-gap(68rpx);
			width: 100%;
			background: linear-gradient(0deg, #FFFFFF 0%, #FFFDF6 100%);
			padding: 60rpx 24rpx 0;
			box-sizing: border-box;

			>view:first-child {
				@include colum-gap(8rpx);
				align-items: center;
				justify-content: center;

				>view:first-child {
					font-weight: 600;
					font-size: 48rpx;
					color: #2C2E3A;

					>span {
						color: #FFC400;
					}
				}

				>view:last-child {
					font-weight: 300;
					font-size: 28rpx;
					color: #ABABAB;
				}
			}

			.release-head {
				@include row-gap-center(40rpx);

				.head-tap {
					@include row-gap-center(0);
					flex: 1;
					border-bottom: 2rpx solid #FFC400;
					box-sizing: border-box;

					>view {
						@include row-gap-center(8rpx);
						padding: 10rpx 40rpx;
						box-sizing: border-box;
						border-radius: 12rpx 12rpx 0 0;
						cursor: pointer;
						transition: all ease-out 0.3s;

						>image {
							width: 64rpx;
							height: 64rpx;
						}
					}

					.active {
						background-image: url('#{$url}/static/mine/bg_center.png?imageMogr2/thumbnail/x100');
						paddingt: 0 62rpx;
						background-repeat: no-repeat;
						background-position: bottom;
						background-size: 100% 100%;
						font-size: 32rpx;
						font-weight: 600;
						color: #FFF;

						&:first-child {
							background-image: url('#{$url}/static/mine/bg_right.png?imageMogr2/thumbnail/x100');
							padding-right: 62rpx;
						}

						&:last-child {
							background-image: url('#{$url}/static/mine/bg_left.png?imageMogr2/thumbnail/x100');
							padding-left: 62rpx;
						}
					}
				}

				.head-search {
					@include row-gap-center(8rpx);
					background: #FFFFFF;
					border-radius: 8rpx;
					border: 2rpx solid #F8F8F8;
					box-sizing: border-box;
					width: 37%;

					&:focus-within {
						border-color: #FFC400;
						box-shadow: 0 0 0 2rpx rgba(255, 196, 0, 0.2);
					}

					>view:first-child {
						@include row-gap-center(8rpx);
						padding: 22rpx 24rpx;
						box-sizing: border-box;
						flex: 1;

						>image {
							width: 28rpx;
							height: 28rpx;
						}

						>input {
							flex: 1;
							font-size: 28rpx;
							color: #2C2E3A;
							font-weight: 400;
							line-height: normal;
						}
					}

					>button {
						padding: 22rpx 54rpx;
						box-sizing: border-box;
						font-weight: 500;
						font-size: 28rpx;
						color: #FFFFFF;
						line-height: normal;
						background: #FFC400;
						border-radius: 0 7rpx 7rpx 0;
						cursor: pointer;

						&::after {
							display: none;
						}
					}
				}
			}
		}

		.myrelease-bottom-paper {
			width: 100%;
			padding: 0 24rpx 24rpx;
			box-sizing: border-box;
			flex: 1;
			display: flex;
			gap: 36rpx;
			overflow: hidden;

			.content-title {
				@include border();
				width: 16%;
				height: 100%;
				// overflow-y: auto;

				>view {
					padding: 30rpx 24rpx;
					box-sizing: border-box;
					cursor: pointer;
				}

				.metals-scroll-title {
					padding: 30rpx 24rpx;
					box-sizing: border-box;
					cursor: pointer;
				}

				.active {
					background-color: #FEF9EB;
					font-weight: 600;
					color: #FFC400;
					display: flex;

					>span {
						position: relative;

						&::after {
							position: absolute;
							bottom: -4rpx;
							left: 0;
							content: '';
							width: 100%;
							height: 6rpx;
							background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
						}
					}
				}
			}

			.content-info {
				display: flex;
				gap: 36rpx;
				justify-content: space-between;
				flex: 1;

				>view {
					flex: 1;
					@include border();
					padding: 18rpx 24rpx;
					box-sizing: border-box;

				}

				.info-type {
					.scroll-info {
						@include colum-gap(0);

						>view:first-child {
							font-weight: 600;
							position: sticky;
							top: 0;
							background-color: #FFF;
							z-index: 2;
							padding-bottom: 12rpx;
						}

						.childer-list {
							@include colum-gap(0);

							>view {
								@include row-gap-center(12rpx);
								padding: 12rpx 20rpx;
								box-sizing: border-box;
								border-radius: 12rpx;
								cursor: pointer;

								>image {
									width: 108rpx;
									height: 108rpx;
									border-radius: 12rpx;
									background-color: #F8F8F8;
								}
							}

							.active {
								background-color: #FEF9EB;
							}
						}
					}
				}

				.info-specs {
					@include colum-gap(28rpx);

					>view:first-child {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-weight: 600;
						font-size: 28rpx;
						color: #FFC400;

						>button {
							margin: 0;
							padding: 12rpx 40rpx;
							box-sizing: border-box;
							background: #FFC400;
							border-radius: 46rpx;
							line-height: normal;
							font-weight: 600;
							font-size: 28rpx;
							color: #FFFFFF;

							&::after {
								display: none;
							}
						}
					}

					.fixed {
						@include row-gap-center(16rpx);
						padding: 24rpx 28rpx;
						background: linear-gradient(90deg, #FFF1D7 0%, #FFFFFF 100%);
						border-radius: 12rpx;
						position: relative;
						
						.left-bg{
							position: absolute;
							top: 0;
							left: 0;
							height: 100%;
							width: 152rpx;
							z-index: 1;
						}
						>image {
							width: 64rpx;
							height: 64rpx;
							z-index: 2
						}
						>view{
							z-index: 2;
						}
					}

					.coinsun-list {
						@include colum-gap(36rpx);
						overflow-y: auto;

						.item {
							@include colum-gap(0);
							padding-bottom: 36rpx;
							border-bottom: 2rpx solid #F3F3F3;

							&:last-child {
								border-bottom: 2rpx solid transparent;
							}


							>view:first-child {
								font-weight: 600;
								position: sticky;
								top: 0;
								background-color: #FFF;
								z-index: 2;
								padding-bottom: 12rpx;
							}

							.list {
								@include colum-gap(20rpx);

								>view {
									@include row-gap-center(12rpx);
									padding: 8rpx 24rpx;
									box-sizing: border-box;
									cursor: pointer;

									>image {
										width: 108rpx;
										height: 108rpx;
									}

									>view {
										flex: 1;
									}
								}

								.active {
									background-color: #FEF9EB;
									border-radius: 12rpx;
								}
							}
						}
					}

					.specs-list {
						@include colum-gap(8rpx);

						>view:first-child {
							font-weight: 600;
						}

						.content {

							>view {
								@include row-gap-center(12rpx);
								padding: 8rpx 24rpx;
								box-sizing: border-box;
								cursor: pointer;

								>image {
									width: 108rpx;
									height: 108rpx;
									border-radius: 12rpx;
									background-color: #F8F8F8;
								}
							}

							.active {
								background-color: #FEF9EB;
							}
						}
					}
				}

				.coin-type {
					.metals-scroll-info {
						@include colum-gap(0);
						margin-bottom: 28rpx;

						>view:first-child {
							@include row-gap-center(20rpx);
							font-weight: 600;
							position: sticky;
							top: 0;
							background-color: #FFF;
							z-index: 2;
							padding-bottom: 12rpx;
							line-height: normal;

							>span {
								font-weight: 400;
								font-size: 24rpx;
								color: #ABABAB;
								line-height: 24rpx;
							}
						}

						.content {
							@include grid;

							>view {
								@include grid-conten();
							}

							.active {
								background-color: #FEF9EB;
								border-radius: 12rpx;
								color: #FFC400;
								font-weight: 500;
							}
						}

						&:last-child {
							.content {
								border-bottom: 2rpx solid transparent;
							}
						}
					}

					.common-scroll-info {
						@include colum-gap(0);
						margin-bottom: 28rpx;

						>view:first-child {
							@include row-gap-center(20rpx);
							font-weight: 600;
							position: sticky;
							top: 0;
							background-color: #FFF;
							z-index: 2;
							padding-bottom: 12rpx;
							line-height: normal;

							>span {
								font-weight: 400;
								font-size: 24rpx;
								color: #ABABAB;
								line-height: 24rpx;
							}
						}

						.content {
							@include grid;

							>view {
								@include grid-conten();
							}

							.active {
								background-color: #FEF9EB;
								border-radius: 12rpx;
								color: #FFC400;
								font-weight: 500;
							}
						}

						&:last-child {
							.content {
								border-bottom: 2rpx solid transparent;
							}
						}
					}

					.stamp-scroll-info {
						@include colum-gap(0);
						margin-bottom: 28rpx;

						>view:first-child {
							@include row-gap-center(20rpx);
							font-weight: 600;
							position: sticky;
							top: 0;
							background-color: #FFF;
							z-index: 2;
							padding-bottom: 12rpx;
							line-height: normal;
						}

						.child-info {
							@include colum-gap(0rpx);

							.child-item {
								@include colum-gap(0rpx);

								>view:first-child {
									font-weight: 500;
								}

								.sun-info {
									@include grid;

									>view {
										@include grid-conten();

									}

									.active {
										background-color: #FEF9EB;
										border-radius: 12rpx;
										color: #FFC400;
										font-weight: 500;
									}
								}
							}
						}
					}
				}

			}

		}

		.search {
			width: 100%;
			height: 100%;
			display: flex;
			overflow: hidden;
			padding: 0 24rpx 24rpx;
			box-sizing: border-box;
			gap: 36rpx;

			.search-content {
				@include border();
				@include colum-gap(36rpx);
				padding: 24rpx;
				box-sizing: border-box;
				flex: 1;
				overflow: auto;
				&[nohave]{
					justify-content: center;
					align-items: center
				}
				.search-no{
					align-items: center;
					transform: translateY(-230rpx);
					>image{
						width: 240rpx;
						height: 320rpx;
					}
				}
				>view {
					@include colum-gap(4rpx);
					padding-bottom: 36rpx;
					border-bottom: 2rpx solid #F3F3F3;
					box-sizing: border-box;

					&:last-child {
						border-bottom: none;
					}

					>view:first-child {
						@include row-gap-center(8rpx);
						font-weight: 600;
						font-size: 32rpx;
						color: #2C2E3A;

						&::before {
							display: flex;
							content: '';
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							background: #FFC400;
						}
					}

					.search-list {
						@include colum-gap(30rpx);

						.search-child {
							@include colum-gap(8rpx);

							>view:first-child {
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}

							.child-list {
								@include colum-gap(24rpx);

								>view {
									@include row-gap-center(12rpx);
									cursor: pointer;
									padding: 8rpx 24rpx;
									box-sizing: border-box;
									border-radius: 12rpx;

									>view:first-child {
										width: 108rpx;
										height: 108rpx;
										border-radius: 12rpx;
										overflow: hidden;

										>image {
											width: 100%;
											height: 100%;
										}
									}

									>view:last-child {
										font-weight: 400;
										font-size: 28rpx;
										color: #2C2E3A;

									}
								}

								.active {
									background-color: #FEF9EB;
								}
							}
						}
					}
				}
			}

			.search-sun {
				flex: 1;
				@include border();
				@include colum-gap(28rpx);
				padding: 24rpx;
				box-sizing: border-box;
				overflow: auto;


				>view:first-child {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-weight: 600;
					font-size: 28rpx;
					color: #FFC400;

					>button {
						margin: 0;
						padding: 12rpx 40rpx;
						box-sizing: border-box;
						background: #FFC400;
						border-radius: 46rpx;
						line-height: normal;
						font-weight: 600;
						font-size: 28rpx;
						color: #FFFFFF;

						&::after {
							display: none;
						}
					}
				}

				.fixed {
					@include row-gap-center(16rpx);
					padding: 24rpx 28rpx;
					border-radius: 12rpx;
					background: linear-gradient(90deg, #FFF1D7 0%, #FFFFFF 100%);
					position: relative;
					.left-bg{
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						width: 152rpx;
						z-index: 1;
					}
					>image {
						width: 64rpx;
						height: 64rpx;
						z-index: 2
					}
					>view{
						z-index: 2;
					}
				}

				.coinsun-list {
					@include colum-gap(36rpx);
					overflow-y: auto;

					.item {
						@include colum-gap(0);
						padding-bottom: 36rpx;
						border-bottom: 2rpx solid #F3F3F3;

						&:last-child {
							border-bottom: 2rpx solid transparent;
						}


						>view:first-child {
							font-weight: 600;
							position: sticky;
							top: 0;
							background-color: #FFF;
							z-index: 2;
							padding-bottom: 12rpx;
						}

						.list {
							@include colum-gap(20rpx);

							>view {
								@include row-gap-center(12rpx);
								padding: 8rpx 24rpx;
								box-sizing: border-box;
								cursor: pointer;

								>image {
									width: 108rpx;
									height: 108rpx;
								}

								>view {
									flex: 1;
								}
							}

							.active {
								background-color: #FEF9EB;
								border-radius: 12rpx;
							}
						}
					}
				}

				.specs-list {
					@include colum-gap(8rpx);

					>view:first-child {
						font-weight: 600;
					}

					.content {

						>view {
							@include row-gap-center(12rpx);
							padding: 8rpx 24rpx;
							box-sizing: border-box;
							cursor: pointer;

							>image {
								width: 108rpx;
								height: 108rpx;
								border-radius: 12rpx;
								background-color: #F8F8F8;
							}
						}

						.active {
							background-color: #FEF9EB;
						}
					}
				}
			}
		}
	}

	.publish-success {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, -20%);
		display: flex;
		flex-direction: column;
		align-items: center;

		>view:first-child {
			width: 486rpx;
			height: 486rpx;
			position: relative;

			>image {
				width: 100%;
				height: 100%;
			}

			>view {
				position: absolute;
				font-weight: 600;
				font-size: 40rpx;
				color: #FFC400;
				top: 55%;
				left: 50%;
				transform: translate(-50%, -55%);
			}
		}

		>view:last-child {
			@include colum-gap(40rpx);
			align-items: center;
			width: 700rpx;
			transform: translateY(-40%);

			>button {
				width: 100%;
				padding: 36rpx;
				box-sizing: border-box;
				font-weight: 400;
				font-size: 32rpx;
				line-height: 32rpx;
				color: #FFF;
				background: #FFC400;
				border-radius: 50rpx;

				&::after {
					display: none;
				}
			}

			>view {
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 32rpx;
				color: #FFC400;
				line-height: 32rpx;
				cursor: pointer;
			}
		}
	}
</style>