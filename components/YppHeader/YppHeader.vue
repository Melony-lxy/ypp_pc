<template>
	<view class="header" v-if="show_header">
		<view class="left">
			<view class="left-view" @click="onclick(-1,'/pages/index/index')">
				<image :src="globalStore.upImageuler('/static/logo.gif')" mode="heightFix" style="height: 45rpx;width: 226rpx;">
				</image>
				<view class="">
					每一次收藏都是传承的开始
				</view>
			</view>
		</view>
		<view class="search">
			<view class="search-content">
				<image src="/static/mine/search.png" mode="aspectFit"></image>
				<input type="text" placeholder="2026年熊猫纪念币" placeholder-class="placeholder" @focus="catcalog.mouseenter(0)"
					v-model="search" @input="searchInput" />
			</view>
			<button @click="onSearch(search)">搜索</button>
			<view class="popular-tags">
				<view>热门搜索标签</view>
				<view @click="onSearch('2026马年贺岁纪念钞')">2026马年贺岁纪念钞</view>
				<!-- <view>马年金币</view> -->
			</view>
		</view>
		<view class="right">
			<view class="right-tab" v-for="(item,index) in link" :key="index" @click="onclick(index,item.path)"
				@mouseenter="catcalog.mouseenter(index)">
				<view :style="{color: linkId === index ? '#FFC400' : '#2C2E3A' }" style="white-space: nowrap;">
					{{item.name}}
				</view>
				<view class="line" :class="{'active-line' : linkId === index}"></view>
			</view>
			<view class="right-login">
				<image @click="onUser" :src="user.avatar ? user.avatar : '/static/profile.png' " mode="aspectFill"></image>
				<view @click="onUser" style="white-space: nowrap;">
					{{user.nickName ? user.nickName : '请登录' }}
				</view>
				<view class="floatSetting" v-if="user">
					<view class="item" @click="onEdit">
						<image src="/static/mine/arvate.png" mode="widthFix"></image>
						<view>编辑资料</view>
					</view>
					<view class="item" @click="onOutLogin">
						<image src="/static/mine/Union.png" mode="widthFix"></image>
						<view>退出登录</view>
					</view>
					<view class="mask"></view>
				</view>
			</view>
			<view class="order" @click="onOrder">
				<image src="/static/order.png" mode="widthFix"></image>
				<view>订单</view>
			</view>
		</view>
		<view class="catalog" v-if="catcalog.show" :style="{height: catcalog.height}">
			<view class="catalog-content" v-if="search === ''">
				<view class="product">
					<uni-collapse accordion @change="(e)=>catcalog.change(e)">
						<uni-collapse-item :title="item.name" v-for="(item,index) in catcalog.data" :open="index === 0">
							<scroll-view scroll-y style="max-height: calc(100vh - 274px);" scroll-with-animation :scroll-into-view="'childY' + catcalog.show_childId">
								<view class="list">
									<view v-for="(child_item,child_index) in item.content"
										:class="{active: catcalog.show_childId === child_item.id}"
										:id="'childY' + child_item.id"
										@click="catcalog.onChild(child_item,child_index)">{{child_item.name}}</view>
								</view>
							</scroll-view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
				<view class="content">
					<view class="child-content">
						<view>{{childList.name}}</view>
						<scroll-view scroll-y="true" style="height: 100%;" :key="childList.id"
							:scroll-into-view="'scrY' + catcalog.childId" scroll-with-animation @scroll="onScroll" id="rootLook">
							<view class="child-list" v-if="childList.id !== 'stamp'" id='parentId'>
								<view class="list" v-for="(item,index) in childList.content" :id="'scrY' + item.id">
									<view>{{item.name}} <span>共{{item.list.length}}个</span></view>
									<view class="item">
										<view v-for="(c_item,c_index) in item.list" @click="catcalog.onProduct(c_item,c_index,item)"
											:class="{active: catcalog.active_product.id === c_item.id}">
											<image :src="(c_item.imageUrl || c_item.imageUrls[0]) + '?imageMogr2/thumbnail/x100'" webp
												mode="aspectFit"></image>
											<view>{{c_item.name}}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="child-list" v-if="childList.id === 'stamp'" :key="childList.id" id="parentId">
								<view class="list" v-for="(item,index) in childList.content" :id="'scrY' + item.id">
									<view>{{item.name}}</view>
									<view class="child-stamp" v-for="(sub_item,sub_index) in item.subCollectionNames">
										<view>{{sub_item.displayName}}</view>
										<view class="stamp-list">
											<view v-for="(c_item,c_index) in sub_item.list"
												@click="catcalog.onProduct(c_item,c_index,sub_item)"
												:class="{active: catcalog.active_product.id === c_item.id}">
												<image :src="c_item.imageUrl + '?imageMogr2/thumbnail/x100'" mode="aspectFit" webp></image>
												<view>{{c_item.name}}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="sun-content" v-if="Object.keys(catcalog.last_info).length !== 0" :key="catcalog.last_info.id">
						<view>
							<image :src="catcalog.last_info.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="heightFix"></image>
							<view>{{catcalog.last_info.name}}</view>
							<image class="left-bg" src="/static/mine/left-bg.png" mode="heightFix"></image>
						</view>
						<view class="coinsun-list">
							<view class="item-c" v-if="catcalog.last_info.specsFlatList1.length !== 0">
								<view>单币</view>
								<view class="list-c">
									<view v-for="(item,index) in catcalog.last_info.specsFlatList1" @click="catcalog.onPath(item)">
										<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
										<view>{{item.specificationsName}}</view>
									</view>
								</view>
							</view>
							<view class="item-c" v-if="catcalog.last_info.specsFlatList2.length !== 0">
								<view>套币</view>
								<view class="list-c">
									<view v-for="(item,index) in catcalog.last_info.specsFlatList2" @click="catcalog.onPath(item)">
										<image :src="item.imageUrl + '?imageMogr2/thumbnail/x100'" webp mode="aspectFit"></image>
										<view>{{item.specificationsName}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="search1" v-if="search !== '' && searchList.length !== 0">
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
											<image :src="it.imageUrl || it.imageUrls[0]" mode="aspectFit"></image>
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
						<!-- <view>
							{{searchRef.total}}
						</view>
						<button @click="searchRef.submit()">下一步</button> -->
					</view>
					<view class="fixed">
						<image :src="searchRef.select.imageUrl" mode="heightFix"></image>
						<image class="left-bg" src="/static/mine/left-bg.png" mode="heightFix"></image>
						<view>{{searchRef.select.name}}</view>
					</view>
					<view class="coinsun-list" :key="searchRef.select.id">
						<view class="item" v-if="searchRef.selectChild.specsFlatList1.length !== 0">
							<view>单币</view>
							<view class="list">
								<view v-for="(item,index) in searchRef.selectChild.specsFlatList1"
									:class="{active: searchRef.childId.specsFlatList1.includes(index)}" :key="index"
									@click="searchRef.onSunNum(index,1)">
									<image :src='`${item.imageUrl}?imageMogr2/thumbnail/x100`' mode="aspectFit" webp></image>
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
			<view class="search1" v-if="search !== '' && searchList.length === 0">
				<view class="search-content" nohave>
					<view class="search-no">
						<image src="/static/mine/no-content.png" mode="widthFix"></image>
						<view>未匹配到结果，试试换一个关键词吧～</view>
					</view>
				</view>
			</view>
			<view class="close" @click="catcalog.close()">
				<uni-icons type="closeempty" size="22" color="#2C2E3A"></uni-icons>
			</view>
		</view>
	</view>
	<PopupLogin @click="onLogin"></PopupLogin>
	<PopupModal :show='outLoginModal.show' title="是否确认退出登录" @close="outLoginModal.close()" @suer="outLoginModal.suer()">
	</PopupModal>
</template>

<script setup>
	import {
		computed,
		onMounted,
		onUnmounted,
		ref,
		watch,
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import PopupLogin from '../PopupLogin/PopupLogin.vue';
	import {
		ProhibitScroll,
		TurnOnScrool
	} from '../../utils/scroll';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		userInfo,
		outLogin,
		category,
		varietyList,
		varietyList2,
		stampCategory
	} from '../../api/common';
	import PopupModal from '../PopupModal/PopupModal.vue';
	import dbPromise from '../../api/db';

	const globalStore = useGlobalStore()
	const user = ref({})

	const outLoginModal = ref({
		show: false,
		close() {
			this.show = false
			TurnOnScrool()
		},
		suer() {
			outLogin().then(res => {
				if (res.code == 200) {
					this.show = false
					uni.removeStorageSync('token')
					uni.removeStorageSync('userInfo')
					TurnOnScrool()
					uni.showToast({
						title: '成功退出',
						icon: 'none'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1000)
				}
			})
		}
	})

	watch(() => globalStore.userInfo, (newInfo) => {
		user.value = newInfo
	})


	const props = defineProps({
		index: {
			type: Number,
			default: -1
		},
	})
	const record = ref(-1)

	const link = ref([{
			name: '产品目录',
			path: ''
		},
		{
			name: '资讯',
			path: '/pages/condittion/condittion'
		},
		{
			name: '关于我们',
			path: '/pages/about/about'
		}
	])
	const linkId = ref(0)
	const show_header = ref(true)
	const show_login = ref(false)
	const search = ref('')
	const searchList = ref([])

	const catcalog = ref({
		show: false,
		height: '0px',
		data: [],
		index: '0',
		childId: '',
		show_childId: '',
		dataList: {},
		active_product: {},
		last_info: {},
		async mouseenter(e) {
			if (e === 0 && this.show === false) {
				let token = uni.getStorageSync('token')
				if (!token) {
					globalStore.updataShow(true)
					ProhibitScroll()
					return
				}
				linkId.value = 0
				this.animation()
				if (this.data.length === 0) getALlDB()
			}
		},
		close() {
			this.height = '0px'
			setTimeout(() => {
				this.show = false
				linkId.value = record.value
				search.value = ''
			}, 300)
		},
		animation() {
			ProhibitScroll()
			this.show = true
			const windowHeight = window.innerHeight
			const element = document.querySelector('.header')
			const headHeight = element.offsetHeight
			setTimeout(() => {
				this.height = windowHeight - headHeight + 'px'
			}, 0)
		},
		change(e) {
			if (e != this.index && e != '') {
				this.index = e
				this.childId = this.data[e].content[0].id
				this.active_product = e == 3 ? this.data[e].content[0].subCollectionNames[0].list[0] : this.data[e].content[
					0].list[0]
				if (e == 1 || e == 2) {
					this.getReqInfo(this.active_product, this.data[e].content[0])
					// this.dataList = 
				} else if (e == 0) this.last_info = {}
				else this.getReqInfo(this.active_product, this.data[e].content[0].subCollectionNames[0])

				console.log(this);
			}

		},
		onChild(item, index) {
			this.childId = item.id
			this.show_childId = item.id
		},
		onProduct(c_item, c_index, event) {
			this.dataList = event
			this.active_product = c_item
			if (!c_item.type) this.getReqInfo(c_item, event)
			else {
				this.last_info = {}
				this.onPath(c_item)
			}
		},
		getReqInfo(n, event) {
			console.log(n);
			console.log(event)
			if (this.index == 0) {
				category({
					collectionName: event.collectionName
				}).then(res => {
					this.last_info = res.data.find(item => item.id === n.id)
				})
			} else if (this.index == 1) {
				varietyList({
					year: event.id
				}).then(res => {
					this.last_info = res.data.find(item => item.id === n.id)
				})
			} else if (this.index == 2) {
				varietyList2({
					year: event.id
				}).then(res => {
					this.last_info = res.data.find(item => item.id === n.id)
				})
			} else if (this.index == 3) {
				stampCategory({
					collectionName: event.collectionName
				}).then(res => {
					this.last_info = res.data.find(item => item.id === n.id)
				})
			} else {
				console.error('Boom Boom Boom !')
			}
		},
		onPath(e) {
			let options = {
				childList: {},
				list: {},
				name: '',
				release: 'sell',
				title: '',
				type: ''
			}

			if (this.index == 0) {
				if (this.dataList.collectionName) {
					Object.assign(options, {
						childList: this.last_info,
						list: JSON.parse(JSON.stringify(this.dataList)),
						name: this.dataList.name + this.active_product.name,
						title: `${this.data[this.index].name} / ${this.dataList.name} / ${this.active_product.name} `,
						specsFlatList1: [e],
						type: 'banknote_other'
					})
				} else {
					Object.assign(options, {
						childList: e,
						list: JSON.parse(JSON.stringify(this.dataList)),
						name: e.name,
						title: `${this.data[this.index].name} / ${this.dataList.name} / ${ e.name} `,
						type: 'paper_money'
					})
					options.list.childlist = options.list.list
					delete options.list.list
				}
			} else if (this.index == 1) {
				Object.assign(options, {
					childList: this.last_info,
					list: this.active_product,
					name: this.active_product.year + this.active_product.name,
					title: `${this.data[this.index].name} / ${this.active_product.year} / ${this.active_product.name} `,
					specsFlatList1: [e],
					type: 'gold_coin'
				})
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f96a'
			} else if (this.index == 2) {
				Object.assign(options, {
					childList: this.last_info,
					list: this.active_product,
					name: this.active_product.year + this.active_product.name,
					title: `${this.data[this.index].name} / ${this.active_product.year} / ${this.active_product.name} `,
					specsFlatList1: [e],
					type: 'common_coin'
				})
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f97a'
			} else if (this.index == 3) {
				Object.assign(options, {
					childList: this.last_info,
					list: this.active_product,
					name: this.active_product.year + this.active_product.name,
					title: `${this.data[this.index].name} / ${this.active_product.year} / ${this.active_product.name} `,
					specsFlatList1: [e],
					type: 'stamp'
				})
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e3940001'
			}
			sessionStorage.setItem('cataData', JSON.stringify(options))
			this.close()
			window.open('/#/pages/ProductInfo/ProductInfo', '_blank')
		}
	})

	const childList = computed(() => {
		if (catcalog.value.data.length === 0) return {}
		return catcalog.value.data[+catcalog.value.index]
	})

	async function pushDBItems(data) {
		const db = await dbPromise
		const tx = db.transaction('item', 'readwrite')
		const store = tx.objectStore('item')
		try {
			await store.put(data)
			await tx.done
		} catch (err) {
			console.error(err)
			tx.abort()
		}
	}

	async function getALlDB() {
		const db = await dbPromise
		const tx = db.transaction('item', 'readonly')
		const store = tx.objectStore('item')
		const data = await store.getAll()
		const paperData = {
			id: 'paper',
			name: '纸币',
			content: []
		};
		const result = {
			gold_coin: {},
			common_coin: {},
			stamp: {},
			paper_money: paperData,
			banknote_other: paperData
		};

		data.forEach(item => {
			if (item.id in result) {
				if (item.id === 'paper_money' || item.id === 'banknote_other') {
					paperData.content = [...item.content, ...paperData.content]
				} else {
					result[item.id] = item;
				}
			}
		});

		const alldData = [
			paperData,
			result.gold_coin,
			result.common_coin,
			result.stamp
		];

		Object.assign(catcalog.value, {
			data: alldData,
			childId: alldData[0].content[0].id,
			active_product: alldData[0].content[0].list[0]
		})
		console.log(alldData);
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
				this.childId.specsFlatList1 = [index]
				// if (this.select.type === 'banknote_other') {
				// 	this.childId.specsFlatList1 = [index]
				// 	this.total = '已选1张'
				// } else if (this.select.type === 'gold_coin' || this.select.type === 'common_coin') {
				// 	this.childId.specsFlatList2 = ''
				// 	let idx = this.childId.specsFlatList1.indexOf(index)
				// 	idx === -1 ? this.childId.specsFlatList1.push(index) : this.childId.specsFlatList1.splice(idx, 1)
				// 	this.total = `已选择${this.childId.specsFlatList1.length}枚`
				// } else if (this.select.type === 'stamp') {
				// 	this.childId.specsFlatList1 = [index]
				// 	this.total = '已选1枚'
				// }
			} else {
				if (this.select.type === 'gold_coin' || this.select.type === 'common_coin') {
					this.childId.specsFlatList1.length = 0
					this.childId.specsFlatList2 = JSON.stringify(index)
					this.total = `已选择1枚`
				}
			}
			this.submit()
		},
		search(e) {
			this.remodel()
			this.select = e

			if (e.type === 'paper_money') {
				let options = {
					type: e.type,
					name: e.name,
					title: '纸币 / ' + e.selectChild.name + ' / ' + e.name,
					release: props.release,
					list: e.selectChild,
					childList: e
				}
				sessionStorage.setItem('cataData', JSON.stringify(options))
				catcalog.value.close()
				window.open('/#/pages/ProductInfo/ProductInfo', '_blank')
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
				stampCategory({
					collectionName: e.selectChild.collectionName
				}).then(res => {
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
			let options = {}
			if (this.select.type === 'banknote_other') {
				options = {
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
				options = {
					title: '贵金属纪念币 / ' + this.select.year + ' / ' + this.select.name,
					name: this.select.name,
					type: 'gold_coin',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [],
					specsFlatList2: {}
				}
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f96a'
				options.childList.issuanceDate = options.childList.issueDate ? options.childList
					.issueDate : ''
				if (this.childId.specsFlatList1.length !== 0) {
					this.childId.specsFlatList1.forEach(item => {
						options.specsFlatList1.push(this.selectChild.specsFlatList1[item])
					})
				} else {
					options.specsFlatList2 = this.selectChild.specsFlatList2[this.childId.specsFlatList2]
				}
			} else if (this.select.type === 'common_coin') {
				options = {
					title: '普通金属纪念币 / ' + this.select.year + ' / ' + this.select.name,
					name: this.select.name,
					type: 'common_coin',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [],
					specsFlatList2: {}
				}
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f97a'
				options.childList.issuanceDate = options.childList.issueDate ? options.childList
					.issueDate : ''
				if (this.childId.specsFlatList1.length !== 0) {
					this.childId.specsFlatList1.forEach(item => {
						options.specsFlatList1.push(this.selectChild.specsFlatList1[item])
					})
				} else {
					options.specsFlatList2 = this.selectChild.specsFlatList2[this.childId.specsFlatList2]
				}
			} else if (this.select.type === 'stamp') {
				options = {
					title: '邮票 / ' + this.select.selectChild.displayName + ' / ' + this.select.name,
					name: this.select.selectChild.displayName + this.select.name,
					type: 'stamp',
					release: props.release,
					list: this.select,
					childList: this.selectChild,
					specsFlatList1: [this.selectChild.specsFlatList1[this.childId.specsFlatList1[0]]],
				}
				options.list.productCategoryId = 'dc2456b4c0c246eeadfa8161e3940001'
			}

			sessionStorage.setItem('cataData', JSON.stringify(options))
			catcalog.value.close()
			window.open('/#/pages/ProductInfo/ProductInfo', '_blank')
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

	const onSearch = (e) => {
		search.value = e === '' ? '2026马年贺岁纪念钞' : e
		catcalog.value.mouseenter(0)
		getSearch(search.value)
	}

	const searchInput = (e) => {
		if (e.detail.value === '') {
			return
		}
		getSearch(e.detail.value)
	}

	const getSearch = async (input) => {
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
		console.log(searchList.value);
	}


	const onclick = async (index, url) => {
		if (index === 0) return
		linkId.value = index
		if (url) uni.reLaunch({
			url
		})
	}

	const onOrder = () => {
		const token = uni.getStorageSync('token')
		if (!token) {
			globalStore.updataShow(true)
			ProhibitScroll()
		} else {
			uni.reLaunch({
				url: '/pages/mine/mine?type=mybought'
			})
		}
	}

	const onUser = () => {
		const token = uni.getStorageSync('token')
		if (!token) {
			globalStore.updataShow(true)
			ProhibitScroll()
		} else {
			uni.reLaunch({
				url: '/pages/mine/mine'
			})
		}
	}

	function system() {
		const systemInfo = uni.getSystemInfo()
		systemInfo.then(res => {
			if (res.windowWidth <= 960) show_header.value = false
			else show_header.value = true
		})
	}

	const getUserInfo = () => {
		userInfo().then(res => {
			user.value = res.user
			globalStore.upUserInfo(user.value)
			uni.setStorageSync('userInfo', user.value)
		})
	}

	const onLogin = () => {
		getUserInfo()
	}

	const onEdit = () => {
		uni.navigateTo({
			url: '/pages/mine/mine?type=' + 'edit'
		})
	}

	const onOutLogin = () => {
		outLoginModal.value.show = true
		ProhibitScroll()
	}

	onMounted(() => {
		user.value = uni.getStorageSync('userInfo')
		system()

		setTimeout(() => {
			getALlDB()
		}, 1000)
	})

	window.addEventListener('resize', system)

	function getDomId(callback) {
		const parent = document.getElementById('parentId')
		const look = document.getElementById('rootLook')
		const children = parent.children
		const observer = new IntersectionObserver((e) => {
			const visibleIds = e.filter(entry => entry.isIntersecting).map(entry => entry.target.id)
			callback(visibleIds)
		}, {
			root: look,
			threshold: 0.01
		})
		for (let child of children) {
			observer.observe(child)
		}
		return () => observer.disconnect()
	}

	
	const onScroll = (e) => {
		getDomId((visibleIds) => {
			let lookId = visibleIds.length !== 0 ? visibleIds[0].replace('scrY','') : ''
			if(lookId) catcalog.value.show_childId = lookId
			
		})
	}

	watch(() => props.index, (n) => {
		linkId.value = n
		record.value = n
	}, {
		immediate: true
	})

	watch(() => catcalog.value.show, (n) => {
		if (!n) TurnOnScrool()
	}, {
		immediate: true
	})
</script>

<style scoped lang="scss">
	@mixin title() {
		font-weight: 600;
		font-size: 32rpx;
		color: #000000;
		line-height: 32rpx;
	}

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


	.header {
		position: sticky;
		top: 0;
		width: 100%;
		height: 180rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #2C2E3A;
		font-weight: 400;
		font-family: PingFang SC, PingFang SC;
		box-shadow: 0px 1px 18px 0px rgba(44, 46, 58, 0.06);
		z-index: 100;
		gap: 80rpx;
		min-width: 1400px;
		padding: 0 13.5%;
		box-sizing: border-box;

		.catalog {
			position: absolute;
			left: 0;
			top: 100%;
			width: 100%;
			box-sizing: border-box;
			padding: 40rpx 13.5%;
			background: #F8F8F8;
			transition: all 0.3s ease-in;
			overflow: hidden;

			.catalog-content {
				display: flex;
				gap: 40rpx;
				width: 100%;
				height: 100%;

				.product {
					width: 12.15%;
					display: flex;
					flex-direction: column;
					gap: 40rpx;
					overflow-y: hidden;
					scrollbar-width: none;

					::v-deep .uni-collapse {
						background-color: transparent;

						.uni-collapse-item__title-text {
							font-weight: 600;
							font-size: 32rpx;
							color: #323232;
							line-height: 32rpx;
						}

						.uni-collapse-item-border {
							border-bottom: none;
						}

						.uni-collapse-item__title-box {
							background-color: transparent;
							height: auto;
							line-height: 32rpx;
							padding: 20rpx 0;
							box-sizing: border-box;
						}

						.uni-collapse-item__wrap {
							background-color: transparent;
						}

						.uni-collapse-item--border {
							border-bottom: none;
						}
					}

					.list {
						display: flex;
						flex-direction: column;

						>view {
							padding: 20rpx;
							box-sizing: border-box;
							font-weight: 400;
							font-size: 28rpx;
							color: #2C2E3A;
							line-height: 28rpx;
							cursor: pointer;
						}

						.active {
							background-color: #FEF9EB;
						}
					}

				}

				.content {
					flex: 1;
					display: flex;
					gap: 40rpx;

					.child-content {
						width: 60%;
						display: flex;
						flex-direction: column;
						gap: 30rpx;
						overflow: hidden;

						>view:first-child {
							@include title();
						}

						.child-list {
							padding: 40rpx 24rpx;
							box-sizing: border-box;
							background-color: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid rgba(219, 220, 224, 0.4);
							flex: 1;
							display: flex;
							flex-direction: column;
							gap: 40rpx;
							// overflow-y: auto;

							.list {
								display: flex;
								flex-direction: column;
								gap: 16rpx;
								padding-bottom: 16rpx;
								border-bottom: 2rpx solid #F3F3F3;

								&:last-child {
									border-bottom: 2rpx solid transparent;
								}

								>view:first-child {
									font-weight: 600;
									font-size: 28rpx;
									color: #2C2E3A;

									>span {
										font-weight: 400;
										font-size: 24rpx;
										color: #ABABAB;
									}
								}

								.item {
									display: grid;
									grid-template-columns: repeat(5, 1fr);

									@media screen and (max-width: 1601px) {
										grid-template-columns: repeat(3, 1fr);
									}

									@media screen and (min-width: 1601px) and (max-width: 1921px) {
										grid-template-columns: repeat(4, 1fr);
									}

									>view {
										width: 100%;
										padding: 20rpx;
										box-sizing: border-box;
										display: flex;
										flex-direction: column;
										align-items: center;
										justify-content: space-between;
										gap: 20rpx;
										overflow: hidden;
										border-radius: 12rpx;
										cursor: pointer;

										>image {
											width: 160rpx;
											height: 160rpx;
										}

										>view:last-child {
											font-weight: 400;
											font-size: 28rpx;
											color: #656565;
											line-height: 28rpx;
											height: 56rpx;
											text-align: center;
											display: -webkit-box;
											-webkit-box-orient: vertical;
											-webkit-line-clamp: 2;
											overflow: hidden;
											text-overflow: ellipsis;
										}
									}

									.active {
										background-color: #FEF9EB;

									}
								}



								.child-stamp {
									display: flex;
									flex-direction: column;
									gap: 16rpx;

									>view:first-child {
										font-weight: 500;
										font-size: 28rpx;
										color: #2C2E3A;

									}

									.stamp-list {
										@extend .item;
									}
								}
							}
						}
					}

					.sun-content {
						margin-top: 62rpx;
						flex: 1;
						background: #FFFFFF;
						border-radius: 16rpx;
						border: 2rpx solid rgba(219, 220, 224, 0.4);
						padding: 40rpx 24rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						gap: 28rpx;

						>view:first-child {
							display: flex;
							align-items: center;
							gap: 16rpx;
							padding: 24rpx 28rpx;
							box-sizing: border-box;
							background: linear-gradient(90deg, #FFF1D7 0%, #FFFFFF 100%);
							border-radius: 12rpx;
							position: relative;

							.left-bg {
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

							>view {
								z-index: 2;
								font-weight: 400;
								font-size: 28rpx;
								color: #2C2E3A;
							}
						}

						.coinsun-list {

							display: flex;
							flex-direction: column;
							gap: 36rpx;
							overflow-y: auto;

							.item-c {
								display: flex;
								flex-direction: column;
								padding-bottom: 36rpx;
								border-bottom: 2rpx solid #F3F3F3;

								&:last-child {
									border-bottom: 2rpx solid transparent;
								}


								>view:first-child {
									font-weight: 600;
									font-size: 28rpx;
									position: sticky;
									top: 0;
									background-color: #FFF;
									z-index: 2;
									padding-bottom: 12rpx;
								}

								.list-c {

									display: flex;
									flex-direction: column;
									gap: 20rpx;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;

									>view {
										display: flex;
										align-items: center;
										gap: 12rpx;
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
					}
				}
			}

			.search1 {
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

					&[nohave] {
						justify-content: center;
						align-items: center
					}

					.search-no {
						align-items: center;
						transform: translateY(-230rpx);

						>image {
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

						.left-bg {
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

						>view {
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

			.close {
				position: absolute;
				top: 100rpx;
				right: 10%;
				border-radius: 50%;
				background: #ECECEC;
				width: 60rpx;
				height: 60rpx;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.left {

			.left-view {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 20rpx;
				transition: all 1s ease;
				cursor: pointer;
			}

			.left-view:hover {
				transform: scale(1.1);
			}
		}

		.search {
			flex: 1;
			background: #FFFFFF;
			border-radius: 60rpx;
			border: 2rpx solid #FFC400;
			display: flex;
			// align-items: center;
			justify-content: space-between;
			gap: 40rpx;
			position: relative;

			.search-content {
				flex: 1;
				padding: 20rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				gap: 20rpx;

				>image {
					width: 28rpx;
					height: 28rpx;
				}

				>input {
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;
					line-height: normal;
					flex: 1;
				}
			}

			>button {
				margin: 0;
				padding: 18rpx 54rpx;
				box-sizing: border-box;
				font-weight: 500;
				font-size: 28rpx;
				color: #FFFFFF;
				line-height: normal;
				border-radius: 60rpx;
				background: #FFC400;
				border: 2rpx solid #FFC400;
				height: 100%;

				&::after {
					display: none;
				}
			}

			.popular-tags {
				position: absolute;
				left: 56rpx;
				top: 100%;
				transform: translateY(10rpx);
				font-weight: 400;
				font-size: 24rpx;
				line-height: 24rpx;
				color: #BF7D2B;
				display: flex;
				align-items: center;
				gap: 32rpx;

				>view {
					cursor: pointer;

					&:first-child {
						cursor: inherit;
					}
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			gap: 100rpx;

			.right-tab {
				transition: all .3s ease;
				cursor: pointer;

				.line {
					margin-top: 6rpx;
					width: 100%;
					height: 10rpx;
					border-radius: 12rpx;
				}

				.active-line {
					background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
				}
			}

			.right-tab:hover {
				transform: scale(1.1);

			}

			.right-login {
				display: flex;
				align-items: center;
				transition: all .3s ease;
				cursor: pointer;
				position: relative;
				padding: 40rpx 0;
				box-sizing: border-box;

				>image {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.floatSetting {
					display: flex;
					align-items: center;
					flex-direction: column;
					position: absolute;
					background: #FFFFFF;
					box-shadow: 0 0 6rpx 0 #ccc;
					border-radius: 8rpx;
					border: 2rpx solid #fff;
					width: 282rpx;
					top: calc(100% + 20rpx);
					padding: 40rpx 0;
					box-sizing: border-box;
					gap: 20rpx;
					visibility: hidden;
					opacity: 0;
					pointer-events: none;
					height: 0;
					transition: all .3s ease;

					.item {
						display: flex;
						align-items: center;
						gap: 18rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #2C2E3A;
						box-sizing: border-box;
						padding: 20rpx 34rpx;
						width: 100%;

						>image {
							width: 32rpx;
							height: 32rpx;
						}

						&:hover {
							background: #F8F8F8;
						}
					}

					.mask {
						position: absolute;
						top: -40rpx;
						width: 100%;
						height: 40rpx;
						background-color: transparent;
					}

				}

				.floatSetting::after {
					// display: none;
					visibility: hidden;
					opacity: 0;
					transition: all .3s ease;
					content: '';
					position: absolute;
					top: -40rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 0;
					border-left: 20rpx solid transparent;
					border-right: 20rpx solid transparent;
					border-top: 20rpx solid transparent;
					border-bottom: 20rpx solid #fff;

				}
			}

			.right-login:hover {
				.floatSetting {
					visibility: visible;
					opacity: 1;
					pointer-events: auto;
					height: 264rpx;
					z-index: 10;
				}

				.floatSetting::after {
					visibility: visible;
					opacity: 1;
				}
			}

			.order {
				display: flex;
				align-items: center;
				gap: 10rpx;
				cursor: pointer;
				transition: all .3s ease;
				white-space: nowrap;

				&:hover {
					color: #FFC400;
					font-weight: 600;
				}

				>image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}


	}
</style>