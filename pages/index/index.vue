<template>
	<view class="container">
		<!-- 导航栏 -->
		<YppHeader :index="-1" />
		<GlobalSidebar />
		<IndexBanner />
		<!-- <view class="header-box"
			:style="`background-image: url(${globalstore.upImageuler('/static/images/home/bgimg.png')})`">
			<view class="header-box-inner">
				<view class="header-inner">
					<text class="header-inner1">
						贺岁钞币尽在掌握
					</text>
					<br />
					<text class="header-inner1">
						开启珍藏新纪元
					</text>
					<view class="header-inner-text">
						<text class="header-inner2">一站式收藏管理平台，支持智能配号、行情查询、缺漏补全</text>
					</view>
				</view>
				<view class="inner-box">
					<button class="download" @click="onDown">下载APP</button>
					<button class="publish" @click="onCollection">发布藏品</button>
				</view>
			</view>
		</view> -->
		<image v-if="lotteryRef.isShow" class="activeImg"
			style="width: calc(100% - 40rpx);height: 152rpx;margin: 20rpx 20rpx 0;" mode="widthFix"
			:src="globalstore.upImageuler('/static/lottery/first-0chou.png')" @click="lotteryRef.goLotter()" />
		<!-- 精选专区 -->
		<!-- <view class="choiceness">
			<view class="choiceness-inner">
				<text class="choice-title">精选专区</text>
				<text class="choice-note">押金先行 · 交易无阻</text>
			</view>
			<view class="center-box">
				<view class="center-left">
					<view class="top">
						<view>龙蛇纪念钞大盘</view>
						<view class="line"></view>
					</view>
					<view class="bottom">
						<view class="bottom-item" v-for="(item,index) in handicapList" :key="index">
							<view class="item-img">
								<image :src="globalstore.upImageuler(item.img)" mode="scaleToFill"></image>
							</view>
							<view class="item-title">
								<view>{{item.name}}</view>
								<view>{{item.title}}</view>
								<view>
									点击查看
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="center-right"
					:style="`background-image: url(${globalstore.upImageuler('/static/images/home/chenggb.png')})`">
					<view class="top-title">
						<text>寄售商城</text>
						<text>专业寄售｜安心托付：交易便捷 · 正品保障 · 品相严审</text>
					</view>
					<view class="line"></view>
					<view class="while">
						<view class="while-left">
							<view>龙蛇全同号通货</view>
							<view class="cen">
								<view class="cen-img">
									<image :src="globalstore.upImageuler('/static/images/home/longshe.png')" mode="scaleToFill"></image>
								</view>
								<view class="cen-price" v-if="mallChange">
									<view>最新价</view>
									<view class="active">
										<image
											:src="mallChange.f5 > 0 ? globalstore.upImageuler('/static/images/home/up.png') : globalstore.upImageuler('/static/images/home/down.png') "
											mode="widthFix"></image>
										<view :style="{color: mallChange.f5 > 0 ? '#FF5500' : '#29C96E'}">¥{{mallChange.f0}}</view>
									</view>
									<view :style="{color: mallChange.f5 > 0 ? '#FF5500' : '#29C96E'}">
										{{`${mallChange.f6 > 0 ? '+' : ''}${mallChange.f6}`}}
										{{`${mallChange.f5 > 0 ? '+' : ''}${mallChange.f5}%`}}
									</view>
								</view>
							</view>
							<view class="look">
								<view>点击查看</view>
								<image :src="globalstore.upImageuler('/static/images/home/right.png')" mode="widthFix"></image>
							</view>
						</view>
						<view class="while-right">
							<view>国家宝藏(统一气象)</view>
							<view class="cen">
								<image :src="globalstore.upImageuler('/static/images/home/guo.png')" mode="scaleToFill"></image>
							</view>
							<view class="look">
								<view>点击查看</view>
								<image :src="globalstore.upImageuler('/static/images/home/right.png')" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 热点直击 -->
		<!-- <view class="hot-point">
			<view class="hot-inner">
				<view class="point-inner">
					<text class="point-title">热点直击</text>
					<text class="point-note">最新热点 · 全力出击</text>
				</view>
				<view class="point-img-box">
					<view class="point-img-inner" v-for="(item,index) in showHotList" :key="index">
						<view class="point-img">
							<view class="point-img-wrapper">
								<view class="point-item-img">
									<image :src="item.mainImage" mode="aspectFit"></image>
									<view class="overlay" @click="goHotzone(item)">
										<image :src="globalstore.upImageuler('/static/images/home/roow.png')" mode="aspectFit"></image>
										<view class="overlay-text">点击查看</view>
									</view>
								</view>

							</view>
							<view class="point-name">
								<view class="point-item-name">{{ item.name }}</view>
							</view>
							<view class="point-rank" v-if="index == 0">
								<view class="point-item-rank">TOP</view>
								<view class="point-item-rank-detail">25万+人浏览</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view> -->
		<!-- 发布商城 -->
		<view class="issuance">
			<!-- <view class="issuance-inner">
				<text class="issuance-title">发布商城</text>
				<text class="issuance-note">臻品荟萃 · 藏纳千秋</text>
			</view> -->
			<view class="issuance-total-box" id="startAddList">
				<view class="shopbar" id="scrollTop">
					<view>
						<view class="shopbar-item" v-for="(item,index) in link">
							<view :class="{active: linkId === item.id}" @click="onclick(item)">{{item.title}}</view>
						</view>
					</view>
					<view class="deal-list">
						<view v-for="_item in link.find(item=>item.id === linkId).children" :class="{active: _item === childrenId}"
							@click="onChildren(_item)">{{_item}}</view>
					</view>
				</view>

				<view class="scroll-box" v-if="isShowIndex === 0">
					<list-sell :sell-list="allList"></list-sell>
					<no-data v-if="allList.length === 0"></no-data>
					<no-more v-if="pageNum >= allTotal"></no-more>
				</view>
				<view class="scroll-box" v-if="isShowIndex === 1">
					<view class="container">
						<view class="table-container">
							<view class="table-header">
								<view class="header-name">
									<view class="header-item-name">名称</view>
								</view>
								<view class="header-cnt">数量</view>
								<view class="header-price">单价</view>
								<view class="header-time">时间</view>
							</view>
							<view class="table-body" v-for="item in publishData" :key="item.productName"
								@click="goRelease(item.publishId,item.orderSource,item.orderCode)">
								<view class="table-first-row">
									<view class="table-item-name">
										<view class="table-item-name-inner">
											<view class="item-name">{{ item.productName }}</view>
											<view v-if="['001','002','003'].includes(item.orderSource)" class="item-status-sale">售</view>
											<view v-if="['004'].includes(item.orderSource)" class="item-status-purchase">求</view>
										</view>
									</view>
									<view class="table-item-cnt">{{ item.totalCount }}{{ item.orderUnit }}</view>
									<view class="table-item-price">¥{{ (item.totalPrice / item.totalCount).toFixed(2) }}</view>
									<view class="table-item-time">{{ item.timeSpan }}</view>
								</view>
								<view class="table-second-row" v-if="item.crownNumbers.length > 0">
									<view class="item-title" v-for="i in item.crownNumbers">{{ i.tagName }}</view>
								</view>
								<view class="table-third-row" v-if="item.crownNumbers.length > 0">
									<view class="item-number">
										{{item.crownNumbers[0].numDetails[0].firstNumber}}、{{item.crownNumbers[0].numDetails[0].lastNumber}}...
									</view>
								</view>
							</view>
							<no-data v-if="publishData.length === 0"></no-data>
						</view>
					</view>
					<no-more v-if="is_noMore[2] && publishData.length !== 0"></no-more>
				</view>
				<view class="scroll-box" v-if="isShowIndex === 2">
					<view class="container">
						<view class="table-container">
							<view class="table-header">
								<view class="header-name">
									<view class="header-item-name">名称</view>
								</view>
								<view class="header-cnt">数量</view>
								<view class="header-price">单价</view>
								<view class="header-time">时间</view>
							</view>
							<view class="table-body" v-for="item in assortData" :key="item.productName"
								@click="goNum(item.orderCode)">
								<view class="table-first-row">
									<view class="table-item-name">
										<view class="table-item-name-inner">
											<view class="item-name">{{ item.productName }}</view>
											<view v-if="['001','002','003'].includes(item.orderSource)" class="item-status-sale">售</view>
											<view v-if="['004'].includes(item.orderSource)" class="item-status-purchase">求</view>
										</view>
									</view>
									<view class="table-item-cnt">{{ item.totalCount }}{{ item.orderUnit }}</view>
									<view class="table-item-price">¥{{ (item.totalPrice / item.totalCount).toFixed(2) }}</view>
									<view class="table-item-time">{{ item.timeSpan }}</view>
								</view>
								<view class="table-third-row" v-if="item.crownNumbers.length > 0">
									<view class="item-number">
										{{item.crownNumbers[0].numDetails[0].firstNumber}}、{{item.crownNumbers[0].numDetails[0].lastNumber}}...
									</view>
								</view>
							</view>
							<no-data v-if="assortData.length === 0"></no-data>
						</view>
					</view>
					<no-more v-if="is_noMore[3] && assortData.length !== 0"></no-more>
				</view>
			</view>
		</view>
		<!-- 页脚 -->
		<YppFooter />

		<view class="popupActive" v-if="lotteryRef.active">
			<view class="view-cdj" v-if="lotteryRef.step == 0">
				<image class="image-up" :src="globalstore.upImageuler('/static/lottery/cjg-up.png')"></image>
				<image class="image-zhuti" :src="globalstore.upImageuler('/static/lottery/cj-zhuti.png')"></image>
				<image class="image-down" :src="globalstore.upImageuler('/static/lottery/cjg-down.png')"></image>
			</view>
			<view class="view-cdj" v-if="lotteryRef.step == 1">
				<image @click="lotteryRef.lotteryClose()" class="image-close"
					:src="globalstore.upImageuler('/static/lottery/white-close.png')" />
				<image class="image-nr" :src="globalstore.upImageuler('/static/lottery/kqcdj-di.png')" />
				<label class="label-qcj" :style="`background: url(${globalstore.upImageuler('/static/lottery/btn-qcj.png')});`"
					style="background-size: contain;background-repeat: no-repeat;" @click="lotteryRef.goLotter()">去抽奖</label>
			</view>
		</view>
		
		<WxLoginPhone v-if="wxData.show" :open-id="wxData.openId" @click="(e)=>wxData.click(e)"></WxLoginPhone>
		
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted,
		nextTick
	} from 'vue'
	import {
		hotList,
		closedDay,
		sale,
		purchase,
		deal,
		ActiveShow,
		purchaseLogin,
		saleLogin,
		lookaround,
		lookaroundLogin,
		wxLogin,
		userInfo
	} from '../../api/common'
	import customWaterfallsFlowVue from '../../uni_modules/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow.vue'
	import {
		useGlobalStore
	} from '../../store/store'
	import {
		ProhibitScroll,
		TurnOnScrool
	} from '../../utils/scroll'
	import {
		longAndSheImageList,
		infoOrderType
	} from '../../utils/common'
	import noMore from '../../components/noMore/noMore.vue'
	import noData from '../../components/noData/noData.vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		wxrequest,
		wxuserInfo
	} from '../../api/wxrequest'
	import ListSell from '../../components/ListSell/ListSell.vue'
	import IndexBanner from '../../components/IndexBanner/IndexBanner.vue'
	import asyncGetList from '../../api/writeDB.js'
	import WxLoginPhone from '../../components/WxLoginPhone/WxLoginPhone.vue'

	const lottery = {
		active: false,
		step: 0,
		isShow: false
	}
	const token = uni.getStorageSync('token')
	const globalstore = useGlobalStore()
	// const link = ref(['出售', '求购', '成交'])
	const link = [{
			id: '',
			title: '随便看看',
			children: ['出售', '求购']
		},
		{
			id: 'Y',
			title: '纸币',
			children: ['出售', '求购']
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f96a',
			title: '贵金属纪念币',
			children: ['出售', '求购']
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f97a',
			title: '普通纪念币',
			children: ['出售', '求购']
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e3940001',
			title: '邮票',
			children: ['出售', '求购']
		},
		{
			id: '1',
			title: '成交',
			children: ['发布', '配号']
		},
	]

	const link2 = ref(['出售', '求购', '发布成交', '配号成交'])

	const linkId = ref(link[0].id)
	const childrenId = ref('')
	const hoverIndex = ref(-1)
	const buttonColor = ref('')
	const isShowSale = ref(true)
	const isShowPurchase = ref(false)
	const isShowPublish = ref(false)
	const isShowAssort = ref(false)
	const isShowDeal = ref(false)
	// const showHotList = ref(null)
	const mallChange = ref(null)
	const is_noMore = ref([false, false, false, false])
	const handicapList = ref([{
		name: '2024龙年贺岁纪念钞',
		title: '龙跃云津掌市脉｜首轮生肖掀金朝',
		img: '/static/images/home/yellow.png',
		path: ''
	}, {
		name: '2025蛇年贺岁纪念钞',
		title: '灵蛇盘金开财窦｜蜕纹暗合市道玄',
		img: '/static/images/home/red.png',
		path: ''
	}])


	const onclick = (item) => {
		childrenId.value = ''
		linkId.value = item.id
		pageNum.value = 0
		allList.value.length = 0
		scrollYtop.value = waterFlow.value
		getList(linkId.value)
			if(stop.value) return
			uni.pageScrollTo({
				scrollTop: waterFlow.value,
				duration: 300
			})
	};

	const onChildren = (id) => {
		childrenId.value = id
		pageNum.value = 0
		allList.value.length = 0
		scrollYtop.value = waterFlow.value
		getList(linkId.value, childrenId.value)
		if(stop.value) return
		uni.pageScrollTo({
			scrollTop: waterFlow.value,
			duration: 300
		})
	}

	const getClosedDay = () => {
		closedDay().then(res => {
			mallChange.value = res.data[0].dayK
		})
	}

	const orderSourceId = ref([
		["001"],
		["002", "003", "004"]
	])
	const publishData = ref([])

	const getPublish = () => {
		uni.showLoading({
			title: '加载中...'
		})
		deal({
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			orderSourceIds: orderSourceId.value[1]
		}).then(res => {
			allTotal.value = res.data.totalPages - 1
			res.data.rows.forEach(item => {
				publishData.value.push(item)
			})
			uni.hideLoading()
		})
	}

	const assortData = ref([])
	const getAssort = () => {
		uni.showLoading({
			title: '加载中...'
		})
		deal({
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			orderSourceIds: orderSourceId.value[0]
		}).then(res => {
			allTotal.value = res.data.totalPages - 1
			res.data.rows.forEach(item => {
				assortData.value.push(item)
			})
			uni.hideLoading()
		})
	}

	const goRelease = (id, orderType, orderCode) => {
		if (['004'].includes(orderType)) {
			// #ifdef H5
			window.open(`/#/pages/details/detailsPurchase?id=${id}&orderCode=${orderCode}`, '_blank')
			// #endif
			// #ifndef H5
			uni.navigateTo({
				url: `/pages/details/detailsPurchase?id=${id}&orderCode=${orderCode}`
			})
			// #endif
		} else {
			// #ifdef H5
			window.open(`/#/pages/details/details?id=${id}&orderCode=${orderCode}`, '_blank')
			// #endif
			// #ifndef H5
			uni.navigateTo({
				url: `/pages/details/details?id=${id}&orderCode=${orderCode}`
			})
			// #endif

		}
	}

	const goNum = (orderCode) => {
		// #ifdef H5
		window.open(`/#/pages/NumTransaction/NumTransaction?orderCode=${orderCode}`, '_blank')
		// #endif
		// #ifndef H5
		uni.navigateTo({
			url: `/pages/NumTransaction/NumTransaction?orderCode=${orderCode}`
		})
		// #endif
	}

	const loadMoreDeal = () => {
		if (isShowPublish.value == true) {
			publishPageNum.value += 1;
			uni.showToast({
				title: '加载中',
				icon: 'loading'
			})
			deal({
				pageNum: publishPageNum.value,
				pageSize: publishPageSize.value,
				orderSourceIds: orderSourceId.value[1]
			}).then(res => {
				if (!res || res.code === undefined) {
					console.error('接口响应异常: ', res);
					return;
				}
				if (res.code === 200) {
					publishData.value = [...publishData.value, ...res.data.rows]
				} else {
					console.error('加载失败: ', res.code);
				}
			}).catch(err => {
				console.error('加载失败', err);
			});
		}
		if (isShowAssort.value == true) {
			assortPageNum.value += 1;
			uni.showToast({
				title: '加载中',
				icon: 'loading'
			})
			deal({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				orderSourceIds: orderSourceId.value[0]
			}).then(res => {
				if (!res || res.code === undefined) {
					console.error('接口响应异常: ', res);
					return;
				}
				if (res.code === 200) {
					assortData.value = [...assortData.value, ...res.data.rows]
				} else {
					console.error('加载失败: ', res.code);
				}
			}).catch(err => {
				console.error('加载失败', err);
			});
		}
	};

	const lotteryRef = ref({
		...lottery,
		goLotter() {
			uni.navigateTo({
				url: '/pages/lottery/lottery'
			})
			this.active = false
			TurnOnScrool()
		},
		lotteryShow() {
			ActiveShow().then(res => {
				if (!res.data) return;
				this.isShow = res.data;

				if (!uni.getStorageSync('activeShow')) {
					this.active = res.data;
					ProhibitScroll();
					uni.setStorageSync('activeShow', true);
					setTimeout(() => this.step += 1, 5500);
				}
			});
		},
		lotteryClose() {
			this.active = false
			TurnOnScrool()
		}
	})

	const onDown = () => {
		if (window.innerWidth < 960) {
			uni.navigateTo({
				url: '/pages/down/down'
			})
		} else {
			uni.reLaunch({
				url: '/pages/download/download'
			})
		}
	}

	const onCollection = () => {
		if (token) {
			uni.reLaunch({
				url: '/pages/mine/mine'
			})
		} else {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			})
			setTimeout(() => {
				globalstore.updataShow(true)
				ProhibitScroll()
			}, 1000)
		}
	}

	const waterFlow = ref(0)
	const scrollYtop = ref(0)

	function throttle(func, delay) {
		let lastCall = 0
		return function(...args) {
			const now = new Date().getTime()
			if (now - lastCall < delay) return
			lastCall = now
			return func.apply(this, args)
		}
	}

	const handleScroll = throttle(() => {
		getDomIdstop()
		if(window.scrollY >= scrollYtop.value) {
			if(pageNum.value >= allTotal.value) return
			pageNum.value++
			scrollYtop.value += 500
			if(childrenId.value === '') getLookaround()
			if(childrenId.value === '出售') getLookSell()
			if(childrenId.value === '求购') getLookPurchase()
			if(childrenId.value === '发布') getPublish()
			if(childrenId.value === '配号') getAssort()
		}
	}, 100)

	const stop = ref(true)

	function getDomId() {
		let id = 'scrollTop'
		let top = document.getElementById(id).getBoundingClientRect()
		waterFlow.value = window.innerWidth > 960 ? (top.top - top.height + 20) : top.top
		scrollYtop.value = top.top
	}

	function getDomIdstop() {
		let top = document.getElementById('scrollTop').getBoundingClientRect()
		if (top.top - top.height >= 0) {
			stop.value = true
			return
		} else {
			stop.value = false
		}
	}
	
	const wxData = ref({
		show: false,
		openId: '',
		open(e){
			this.openId = e
			ProhibitScroll()
			this.show = true
			uni.showToast({
				title:'请绑定手机号',
				icon: 'none'
			})
		},
		close(){
			TurnOnScrool()
			this.show = false
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		click(e){
			userInfo().then(res => {
				uni.setStorageSync('userInfo', res.user)
				globalstore.upUserInfo(res.user)
				this.close()
			})
			
		}
	})

	function listenBar() {
		console.log('链接发生了变化');
		const url = new URL(window.location.href)
		const hashQuery = url.hash.split('?')[1] || ''
		const params = new URLSearchParams(hashQuery)
		const code = params.get('code')
		if(code) {
			globalstore.updataShow(false)
			console.log(code);
		wxLogin({code:code}).then(res=>{
			if(res.data.Authorization){
				uni.setStorageSync('token',res.data.Authorization)
				userInfo().then(res => {
					uni.setStorageSync('userInfo', res.user)
					globalstore.upUserInfo(res.user)
					globalstore.updataShow(false)
					return
				})
				return
			}
			wxData.value.open(res.data.openId)
		})
		}

	}

	const pageNum = ref(0)
	const pageSize = ref(20)
	const allList = ref([])
	const allTotal = ref(0)
	const params = ref({})
	const isShowIndex = ref(0)
	
	const getLookaround = () => {
		const token = uni.getStorageSync('token')
		if(token){
			lookaroundLogin({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.getPublishPackageOrderPageRespDTO) {
						Object.assign(item, item.getPublishPackageOrderPageRespDTO)
						delete item.getPublishPackageOrderPageRespDTO
						if (item.grailCategoryJSON) {
							item.customTag = item.grailCategoryJSON.tagName.split(' ');
						} else if (item.publishGoldCoinItemDTOList?.length) {
							item.customTag = item.publishGoldCoinItemDTOList.flatMap(
								_i => _i.specItemList?.map(tag => tag.specificationsName) || []
							);
						} else {
							item.customTag = []
						}
					}
					if (item.purchaseOrderInfoVO) {
						Object.assign(item, item.purchaseOrderInfoVO);
						delete item.purchaseOrderInfoVO;
						if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
						else if (item.specItemList.length !== 0) {
							item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
						} else item.customTag = []
					}
				})
				allList.value = [...allList.value,...data]
			})
		}else{
			lookaround({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.getPublishPackageOrderPageRespDTO) {
						Object.assign(item, item.getPublishPackageOrderPageRespDTO)
						delete item.getPublishPackageOrderPageRespDTO
						if (item.grailCategoryJSON) {
							item.customTag = item.grailCategoryJSON.tagName.split(' ');
						} else if (item.publishGoldCoinItemDTOList?.length) {
							item.customTag = item.publishGoldCoinItemDTOList.flatMap(
								_i => _i.specItemList?.map(tag => tag.specificationsName) || []
							);
						} else {
							item.customTag = []
						}
					}
					if (item.purchaseOrderInfoVO) {
						Object.assign(item, item.purchaseOrderInfoVO);
						delete item.purchaseOrderInfoVO;
						if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
						else if (item.specItemList.length !== 0) {
							item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
						} else item.customTag = []
					}
				})
				allList.value = [...allList.value,...data]
			})
		}

	}

	const getLookSell = () => {
		const token = uni.getStorageSync('token')
		if(token){
			saleLogin({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				orderStatus: 0,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
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
				allList.value = [...allList.value,...data]
			})
		}else{
			sale({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				orderStatus: 0,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
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
				allList.value = [...allList.value,...data]
			})
		}
	}

	const getLookPurchase = () => {
		const token = uni.getStorageSync('token')
		if(token){
			purchaseLogin({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
					else if (item.specItemList.length !== 0) {
						item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
					} else item.customTag = []
				})
				allList.value = [...allList.value,...data]
			})
		}else{
			purchase({
				pageNum: pageNum.value,
				pageSize: pageSize.value,
				...params.value
			}).then(res => {
				const data = res.data.rows
				allTotal.value = res.data.totalPages - 1
				data.forEach(item => {
					item.isType = infoOrderType(item.orderType)
					if (item.grailCategoryJSON) item.customTag = item.grailCategoryJSON.tagName.split(' ')
					else if (item.specItemList.length !== 0) {
						item.customTag = item.specItemList.map(_tag => _tag.specificationsName) || []
					} else item.customTag = []
				})
				allList.value = [...allList.value,...data]
			})
		}
	}

	const getList = (id, type) => {
			if (id === link[0].id) {
				isShowIndex.value = 0
				params.value = {}
				if (type === '出售') {
					getLookSell()
				} else if (type === '求购') {
					getLookPurchase()
				} else {
					getLookaround()
				}
			} else if (id === link[1].id) {
				isShowIndex.value = 0
				params.value = {
					isBanknote: id
				}
				if (type === '出售') {
					getLookSell()
				} else if (type === '求购') {
					getLookPurchase()
				} else {
					getLookaround()
				}
			} else if (id === link[2].id) {
				isShowIndex.value = 0
				params.value = {
					productCategoryId: id
				}
				if (type === '出售') {
					getLookSell()
				} else if (type === '求购') {
					getLookPurchase()
				} else {
					getLookaround()
				}
			} else if (id === link[3].id) {
				isShowIndex.value = 0
				params.value = {
					productCategoryId: id
				}
				if (type === '出售') {
					getLookSell()
				} else if (type === '求购') {
					getLookPurchase()
				} else {
					getLookaround()
				}
			} else if (id === link[4].id) {
				isShowIndex.value = 0
				params.value = {
					productCategoryId: id
				}
				if (type === '出售') {
					getLookSell()
				} else if (type === '求购') {
					getLookPurchase()
				} else {
					getLookaround()
				}
			} else if (id === link[5].id) {
				if (type === '发布') {
					isShowIndex.value = 1
					getPublish()
				} else if (type === '配号') {
					isShowIndex.value = 2
					getAssort()
				} else {
					isShowIndex.value = 1
					childrenId.value = '发布'
					getPublish()
				}
			} else {
				console.error('your are fool !')
			}
		}

	onMounted(() => {
		getList(linkId.value)
		
		nextTick(() => {
			window.addEventListener('scroll', handleScroll)
			window.addEventListener('popstate', listenBar)
			setTimeout(() => {
				getDomId()
				getDomIdstop()
			}, 500)
		})
		if(token){
			setTimeout(()=>{
				asyncGetList()
			},2500)
		}

	})



	const goHotzone = (e) => {
		if (window.innerWidth > 960) {
			uni.showToast({
				title: '尽情期待',
				icon: 'none'
			})
			return
		}
		let options = encodeURIComponent(JSON.stringify(e))
		if (e.moneyType == "banknote") {
			uni.navigateTo({
				url: '/pages/hotZone/hotZone?options=' + options
			})
		} else {
			uni.navigateTo({
				url: '/pages/hotZone/hotCoin?options=' + options
			})
		}
	}

	onUnmounted(() => {
		window.removeEventListener('popstate', listenBar)
		window.removeEventListener('scroll', handleScroll)
	})
</script>

<style lang="scss" scoped>
	.shopbar {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding: 20rpx 20rpx 40rpx;
		box-sizing: border-box;
		position: sticky;
		top: 180rpx;
		background-color: #FFF;
		z-index: 9;

		@media screen and (max-width: 960px) {
			overflow-x: hidden;
			width: 100%;
			top: 0;
		}

		>view:first-child {
			display: flex;
			gap: 40rpx;
			align-items: center;
			@media screen and (max-width: 960px) {
				overflow-x: auto;
				width: 100%;
				white-space: nowrap;
			}
			.shopbar-item {
				font-weight: 600;
				font-size: 32rpx;
				line-height: 32rpx;
				color: #ABABAB;
				background-color: #FFF;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				
				@media screen and (max-width: 960px) {
					height: 60rpx;
				}
				
				@keyframes font-bar {
					0% {
						width: 0%;
					}

					100% {
						width: 100%;
					}
				}

				>view {
					box-sizing: border-box;
					border-radius: 60rpx;
					cursor: pointer;
					padding-bottom: 4rpx;
					transition: all ease 0.3s;

					&:hover {
						color: #2C2E3A;
						position: relative;
						font-weight: 600;

						&::after {
							content: '';
							position: absolute;
							top: 100%;
							left: 0;
							width: 100%;
							height: 10rpx;
							border-radius: 12rpx;
							background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
							animation: font-bar ease-out 0.3s forwards;
						}
					}
				}

				.active {
					color: #2C2E3A;
					position: relative;
					font-weight: 600;

					&::after {
						content: '';
						position: absolute;
						top: 100%;
						left: 0;
						width: 100%;
						height: 10rpx;
						border-radius: 12rpx;
						background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
						animation: font-bar ease-out 0.3s forwards;
					}
				}
			}
		}

		.deal-list {
			display: flex;
			align-items: center;
			gap: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #ABABAB;

			>view {
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				background-color: #F8F8F8;
				border-radius: 12rpx;
				cursor: pointer;
			}

			.active {
				background-color: #FFC400;
				font-weight: 600;
				color: #FFFFFF;
			}
		}

	}

	.activeImg {
		display: none;

		@media screen and (max-width: 960px) {
			display: flex;
		}
	}

	.choiceness {
		width: 100%;
		// height: 512rpx;
		padding: 100rpx 0 160rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}

	.choiceness-inner,
	.point-inner,
	.issuance-inner {
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.choice-title,
	.point-title,
	.issuance-title {
		color: #2C2E3A;
		font-size: 68rpx;
		font-weight: bold;
		padding-bottom: 16rpx;
		border-bottom: 1px solid #000;
		margin-bottom: 16rpx;
	}

	.choice-note,
	.point-note,
	.issuance-note {
		font-size: 32rpx;
		color: #656565;
	}

	.choice-inner-text {
		font-size: 32rpx;
		color: #ABABAB;
	}

	.choice-box-text1,
	.choice-box-text2,
	{
	font-weight: 500;
	}

	.choice-box-text2 {
		font-size: 36rpx;
	}

	.choice-text {
		margin-left: 24rpx;
	}

	.hot-point {
		width: 100%;
		// height: 1290rpx;
		padding: 100rpx 0 120rpx 0;
		// background-color: #FEFBEE;
		overflow: hidden;
		display: none;

		.hot-inner {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		.point-img-box {
			width: 72.9%;
			display: flex;
			justify-content: space-between;
			padding: 100rpx 0 110rpx 0;

			.point-img-inner {
				width: 15.9%;
				position: relative;

				.point-img {
					width: 100%;

					.point-img-wrapper {
						.point-item-img {
							width: 100%;
							aspect-ratio: 1/1;
							display: flex;
							align-items: center;
							position: relative;
							cursor: pointer;

							image {
								width: 100%;
								height: 100%;
								border-radius: 20rpx;
							}

							.overlay {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								display: flex;
								justify-content: center;
								flex-direction: column;
								align-items: center;
								color: #fff;
								font-size: 36rpx;
								font-weight: 500;
								background-color: #FFC400;
								opacity: 0;
								transition: opacity 1s ease;
								border-radius: 20rpx;

								image {
									width: 62rpx;
									margin-bottom: 26rpx;
								}
							}
						}

						.point-item-img:hover .overlay {
							opacity: 0.95;
						}

					}

					.point-name {
						width: 85%;
						margin: 0 auto;
						margin-top: 28rpx;

						.point-item-name {
							text-align: center;
							font-weight: 500;
							font-size: 36rpx;
						}
					}

					.point-rank {
						display: flex;
						margin-top: 16rpx;
						justify-content: center;

						.point-item-rank {
							background-color: #2C2E3A;
							border-radius: 4rpx 0 0 4rpx;
							padding: 4rpx;

							font-weight: 600;
							font-size: 24rpx;
							color: #FFB846;
						}

						.point-item-rank-detail {
							padding: 4rpx 8rpx;
							background: rgba(191, 125, 43, 0.08);
							border-radius: 4rpx;
							font-weight: 500;
							font-size: 24rpx;
							color: #BF7D2B;
						}
					}
				}

			}
		}

		.point-btn {
			width: 360rpx;
			display: flex;
			margin: 0 auto;

			.left-btn,
			.right-btn {
				text-align: center;
				line-height: 100rpx;
				width: 100rpx;
				height: 100rpx;
				font-size: 50rpx;
				font-weight: 600;
				color: #ABABAB;
				background-color: #fff;
				border-radius: 100%;
				box-shadow: 0px 6rpx 32rpx 0px rgba(47, 83, 109, 0.12);
			}

			.left-btn {
				margin-right: 100rpx;
			}

			.left-btn::after {
				border: none;
			}

			.right-btn::after {
				border: none;
			}

			.left-btn.btnActive,
			.right-btn.btnActive {
				color: #2C2E3A;
			}
		}
	}

	.issuance {
		width: 100%;
		height: auto;
		// padding-bottom: 80rpx;
		padding: 20rpx 0 224rpx 0;
		box-sizing: border-box;

		// padding: 120rpx 0 0 0;
		.issuance-inner {
			width: 300rpx;
			margin: 0 auto;
		}

		.issuance-total-box {
			width: 100%;
			padding: 0rpx 13.5%;
			// max-width: 4600rpx;
			box-sizing: border-box;
			margin: 0 auto;
			
			@media screen and (max-width: 1600px) {
				padding: 0 8.5%;
			}

			.issuance-box {
				position: sticky;
				top: 132rpx;
				left: 13.5%;
				z-index: 100;
				background-color: #fff;
			}

			.issuance-box,
			.issuance-box2 {
				display: flex;
				gap: 4rpx;
			}

			.issuance-box2 {
				display: none;

			}

			.issuance-inner-btn {
				width: 192rpx;
				height: 76rpx;
				border-radius: 200rpx;
				line-height: 76rpx;
				text-align: center;
				cursor: pointer;
			}

			.issuance-inner-btn:hover {
				background-color: #F8F8F8;
			}

			.scroll-box {
				::-webkit-scrollbar {
					display: none;
					width: 0 !important;
					height: 0 !important;
					-webkit-appearance: none;
					background: transparent;
					color: transparent;
				}
			}


			.issuance-deal-choice {
				position: absolute;
				z-index: 999;
				width: 220rpx;
				height: 210rpx;
				border: 2rpx solid #FFC400;
				border-radius: 16rpx;
				text-align: center;
				display: none;
				justify-content: center;
				flex-direction: column;
				background-color: #fff;
				margin-top: 82rpx;
				margin-left: 390rpx;
				box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.2);

				.deal-box {
					.deal-publish {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						cursor: pointer;

						.deal-publish-content {
							font-size: 28rpx;
						}
					}

					.deal-publish:hover,
					.deal-assort:hover {
						background-color: #F8F8F8;
					}

					.deal-assort {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						cursor: pointer;

						.deal-assort-content {
							font-size: 28rpx;
						}
					}
				}
			}

			::v-deep .column-value {
				box-shadow: 0px 2px 12px 0px rgba(47, 83, 109, 0.08);
				border-radius: 32rpx !important;
				margin-bottom: 50rpx !important;
			}

			.waterfall-item {
				// width: 18.55765%;
				break-inside: avoid;
				margin-bottom: 20px;
				background-color: #fff;
				border-radius: 32rpx;
				overflow: hidden;
				cursor: pointer;

				// flex-grow: 1;
				.waterfall-image {
					width: 100%;
					min-height: 300rpx;
				}

				.item-info {
					padding: 20rpx;

					.item-title {
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 8rpx;
					}

					.item-desc {
						font-size: 28rpx;
						color: #656565;
						margin-bottom: 8rpx;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.item-count {
						display: flex;
						justify-content: space-between;
						color: #ABABAB;
					}

					.item-price {
						font-size: 28rpx;
						color: #FF5500;
						font-weight: bold;
					}

				}

				.waterfall-user {
					display: flex;
					align-items: center;
					padding: 20rpx;

					.waterfall-user-img {
						width: 60rpx;
						height: 60rpx;
						background-color: #eee;
						border-radius: 100%;
						margin-right: 20rpx;

						.user-avatar {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.waterfall-user-name {
						font-size: 20rpx;
						color: #999;
					}
				}
			}

			.table-container {
				width: 100%;
				border-collapse: collapse;
				margin: 0 0 220rpx 0;

				.table-header {
					height: 80rpx;
					background-color: #F8F8F8;
					color: #ABABAB;
					font-size: 28rpx;
					font-weight: 400;
					display: flex;
					line-height: 80rpx;
					text-align: center;

					.header-name {
						width: 42.78571%;
						text-align: left;

						.header-item-name {
							margin-left: 80rpx;
						}
					}

					.header-cnt {
						width: 22.71429%;
					}

					.header-price {
						width: 22.71429%;
					}

					.header-time {
						width: 22.71429%;
					}
				}

				.table-body {
					// height: 96rpx;
					padding: 28rpx 0 16rpx 0;
					display: flex;
					flex-direction: column;
					gap: 24rpx;
					cursor: pointer;

					.table-first-row {
						display: flex;
						text-align: center;

						// height: 96rpx;
						// padding: 28rpx 0 20rpx 0;
						// line-height: 96rpx;
						.table-item-name {
							width: 42.78571%;

							.table-item-name-inner {
								display: flex;
								// justify-content: center;
								align-items: center;

								.item-name {
									font-weight: normal;
									font-weight: 500;
									font-size: 32rpx;
								}

								.item-status-sale,
								.item-status-purchase {
									line-height: 30rpx;
									width: 45rpx;
									height: 30rpx;
									color: #fff;
									font-size: 24rpx;
									border-radius: 8rpx;
									margin-left: 15rpx;
								}

								.item-status-sale {
									background-color: #FF5500;
								}

								.item-status-purchase {
									background-color: #00B0F9;
								}
							}
						}

						.table-item-cnt {
							width: 22.71429%;
							font-size: 32rpx;
						}

						.table-item-price {
							width: 22.71429%;
							font-weight: 500;
							font-size: 32rpx;
							color: #FF5500;
						}

						.table-item-time {
							width: 22.71429%;
							font-size: 32rpx;
							color: #ABABAB;
						}
					}

					.table-second-row {
						display: flex;

						.item-title {
							// width: auto;
							box-sizing: border-box;
							// display: inline-block;
							padding: 8rpx 12rpx;
							font-weight: 600;
							font-size: 12px;
							border-radius: 12rpx;
							color: #BF7D2B;
							background-color: #FFF7EF;
							margin-right: 20rpx;
						}
					}

					.table-third-row {
						width: 100%;
						box-sizing: border-box;
						padding: 0 12rpx;
						background-color: #F8F8F8;
						line-height: 96rpx;
						border-radius: 8rpx;
						display: flex;
						// justify-content: flex-start;
						// align-items: flex-start;

						flex-wrap: wrap;

						.item-number {
							color: #ABABAB;
							display: flex;
							align-items: flex-start;

							// flex-wrap: wrap;
							.item-number-monoidal {
								font-size: 28rpx;
								display: flex;
							}
						}

					}
				}
			}
		}
	}




	@media (max-width: 975px) {

		/* 全局调整 */
		.container {
			width: 100%;
		}

		/* 头部区域适配 */
		.header-box {
			padding: 80rpx 0;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;

			.header-box-inner {
				width: 100%;
				margin-top: 30rpx;
				margin-left: 50rpx;

				.header-inner {
					.header-inner1 {
						font-size: 60rpx;
					}

					.header-inner-text {
						width: 90%;

						.header-inner2 {
							font-size: 30rpx;
						}
					}
				}


				.inner-box {
					// justify-content: center;
					margin-top: 80rpx;

					.download,
					.publish {
						width: 200rpx;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 30rpx;
						margin: 0 20rpx;
						margin-left: 0;
						transform: none;
					}
				}
			}
		}


		// 精选专区适配
		.choiceness {
			width: 100%;
			height: auto;
			padding: 20rpx;
			box-sizing: border-box;

			.center-box {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				padding: 0;

				.line {
					display: none;
				}

				.center-left {
					width: 100%;
					padding-bottom: 10rpx;

					.bottom {
						flex-direction: column;
						margin: 0;

						.bottom-item {
							width: 100%;
							margin-top: 20rpx;

							.item-title {
								>view:nth-child(2) {
									margin: 12rpx 0 10rpx 0;
								}

								>view:last-child {
									font-size: 20rpx;
								}
							}
						}
					}
				}

				.center-right {
					width: 100%;
				}
			}
		}

		// 热点直击适配
		.hot-point {
			display: flex;
			padding: 20rpx 0;

			.point-img-box {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 20rpx;
				box-sizing: border-box;
				width: 100%;

				.point-img-inner {
					width: 48%;

					.point-img {
						width: 100%;
						text-align: center;
						padding-top: 20rpx;

						.point-item-img {
							width: 100%;
						}

						.point-name {
							margin-top: 0;

							.point-item-name {
								font-size: 30rpx;
							}
						}

						.point-rank {
							width: 48.6%;

							.point-item-rank {
								display: none;
							}

							.point-item-rank-detail {
								display: none;
							}
						}
					}
				}
			}
		}

		// 发布商城适配
		.issuance {
			width: 100%;
			height: auto;
			padding: 20rpx;
			box-sizing: border-box;

			.issuance-inner {
				width: 300rpx;
				margin: 0 auto;
				margin-top: 20rpx;
			}

			.issuance-total-box {
				width: 100%;
				margin: 0 auto;
				padding: 0;

				.issuance-box {
					display: none;
				}

				.issuance-box2 {
					display: flex;
					margin-top: 20rpx;
					justify-content: space-between;
					position: sticky;
					top: 0;
					background-color: #fff;
					z-index: 9;
					padding: 20rpx 0;
					box-sizing: border-box;

					.issuance-inner-btn {
						width: 162rpx;
						height: 76rpx;

					}
				}

				.waterfall-item {
					display: flex;
					flex-direction: column;
					gap: 20rpx !important;
				}

				.table-container {
					width: 100%;
				}
			}
		}
	}

	.popupActive {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.view-cdj {
			display: flex;
			flex-direction: column;
			align-items: center;
			// overflow: hidden;

			.image-close {
				width: 44rpx;
				height: 44rpx;
				margin-left: 514rpx;
			}

			.image-nr {
				width: 560rpx;
				height: 620rpx;
			}

			.label-qcj {
				width: 456rpx;
				height: 98rpx;
				font-weight: 600;
				font-size: 34rpx;
				color: #FFFFFF;
				line-height: 34rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
			}

			.image-up {
				width: 180rpx;
				height: 80rpx;
				margin-bottom: -40rpx;
				z-index: 20;
				animation: moveLeftToRight 1s infinite;
			}

			.image-zhuti {
				width: 750rpx;
				height: 300rpx;
				z-index: 10;
			}

			.image-down {
				width: 180rpx;
				height: 80rpx;
				margin-top: -40rpx;
				z-index: 20;
				animation: moveRightToLeft 1s infinite;
			}

			@keyframes moveLeftToRight {
				0% {
					transform: translateX(-500rpx);
				}

				100% {
					transform: translateX(500rpx);
				}
			}

			@keyframes moveRightToLeft {
				0% {
					transform: translateX(500rpx);
				}

				100% {
					transform: translateX(-500rpx);
				}
			}
		}
	}
</style>