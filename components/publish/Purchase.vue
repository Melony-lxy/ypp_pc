<template>
	<view class="purchase">
		<view class="content">
			<view class="content-shop">
				<view class="content-top">
					<view class="back">
						<view @click="emits('step',1)">
							<uni-icons type="left" size="16" color="#BF7D2B"></uni-icons>
							<view>返回</view>
						</view>
						<view class="back-title">
							<view>正在发布藏品</view>
							<view>{{data.title}}</view>
						</view>
					</view>
					<button @click="submit" :disabled="isDisabled">确定发布</button>
				</view>
				<view class="top-shop-paper" v-if="data.type === 'paper_money'">
					<view>
						<image :src="data.childList.imageUrls[0]" mode="aspectFit"></image>
					</view>
					<view>{{data.childList.name}}</view>
				</view>
				<view class="top-shop-RMB" v-else>
					<view v-for="(item,index) in coinList">
						<view class="shop-image">
							<view>
								<image :src="item.imageUrl" mode="aspectFit"></image>
							</view>
							<view class="image-title">
								<view>{{item.specificationsName}}</view>
								<view class="type" v-if="data.type === 'gold_coin' || data.type === 'common_coin'">
									<view class="sele-type" v-if="!item.specItemList && !item.specShow"
										@click="coinType.open(item,index)">
										请选择装正类型 <uni-icons type="right" size="14" color="#BF7D00"></uni-icons>
									</view>
									<view class="sele-type-active" v-else>
										<view>
											<view class="item">
												<view>装帧类型</view>
												<view style="color: #2C2E3A;">{{item.specShow.type}}</view>
											</view>
											<view class="item">
												<view>评级级别</view>
												<view style="color: #2C2E3A;">
													{{item.specShow.packageItem !== '' ? item.specShow.packageItem : item.specShow.packageType}}
												</view>
											</view>
											<view class="item">
												<view>证书编号</view>
												<view style="color: #2C2E3A;">{{item.specShow.numberList.join('、')}}</view>
											</view>
										</view>
										<uni-icons type="right" size="14" color="#ABABAB" @click="coinType.open(item,index)"></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="price-title">
							<view>
								<image src="/favicon.ico" mode="aspectFit"></image>
								<view v-if="item.price.price !== 0">参考价:¥{{item.price.price}}/{{item.price.unit}}</view>
								<view v-else>暂无参考价</view>
							</view>
							<view class="title-time" v-if="item.price.price !== 0">
								<view>
									<image src="/static/mine/pinxiang.png" mode="widthFix"></image>
									<view>{{item.price.grade}}</view>
								</view>
								<view>
									<image src="/static/mine/shijian.png" mode="widthFix"></image>
									<view>{{item.price.time}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="justify">
				<view class="continer">
					<view>基本交易信息</view>
					<view class="basic-info">
						<view class="collection">
							<view>藏品标题</view>
							<view class="ipt">
								<input type="text" placeholder="请输入藏品标题" placeholder-class="placeholder" v-model="productName" />
							</view>
						</view>
						<view class="lable" v-if="data.type === 'paper_money' && data.release === 'purchase' 
						&& (data.name === '2026马年贺岁纪念钞' || data.name === '2025蛇年贺岁纪念钞' || data.name === '2024龙年贺岁纪念钞') ">
							<view class="lable-top">
								<view>添加标签</view>
								<view @click="lable.open()">
									<image :src="globalstore.upImageuler('/static/purchase/label-selection.png')" mode="aspectFit">
									</image>
									<view>筛选标签</view>
								</view>
							</view>
							<view class="lable-content">
								<view class="label-not" v-if="lable.info.length === 0">
									<image :src="globalstore.upImageuler('/static/purchase/nolabel.png')" mode="widthFix"></image>
									<view>暂无信息</view>
								</view>
								<view class="lable-have" v-else>
									<view v-for="item in lable.info">{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="attribute" v-if="data.release === 'sell' && data.type === 'paper_money' && isLableShow
							&& (data.name === '2026马年贺岁纪念钞' || data.name === '2025蛇年贺岁纪念钞' || data.name === '2024龙年贺岁纪念钞')">
							<view>添加纪念钞属性</view>
							<view class="addnumber">
								<view class="numbers">
									<image src="/static/sale/bg-blue.png" mode="heightFix"></image>
									<view class="title">添加号码</view>
									<view class="picture" @click="console.log('图片识别')">
										<view>
											图片识别
											<uni-icons type="right" size="10" color="#FFFFFF"></uni-icons>
										</view>
									</view>
									<view class="entry" @click="paperNumber.open(data.childList)">
										<view>
											输入识别
											<uni-icons type="right" size="10" color="#FFFFFF"></uni-icons>
										</view>
									</view>
								</view>
								<image src="/static/sale/or.png" mode="widthFix"></image>
								<view class="tabs" @click="lable.open()">
									<image src="/static/sale/bg-yellow.png" mode="heightFix"></image>
									<view>
										添加标签
										<uni-icons type="right" size="14" color="#FFFFFF"></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="edit-attribute"
							v-if="data.release === 'sell' && (paperNumber.list.length !== 0 || lable.title !== '')">
							<view>
								<view>添加纪念钞属性</view>
								<view @click="isLableShow = true">更改属性 <uni-icons type="bars" size="18" color="#2C2E3A"></uni-icons>
								</view>
							</view>
							<view class="prefix" v-if="paperNumber.list.length !== 0">
								<view>打包冠号包含</view>
								<view class="prefix-list">
									<view v-for="(item,index) in paperNumber.list">
										<view>{{item.horizontalTagName}} <span>
												数量:{{item.productQuantity}}{{unitMap[item.consecutiveNumType]}}</span></view>
										<view>{{getPublishPackageItemDTOList(item.consecutiveNumType,item.headTailBookNoteNumDetailsList)}}
										</view>
									</view>
								</view>
							</view>
							<view class="tags" v-if="lable.title !== ''">
								<view>
									<view>标签</view>
									<view>
										<image :src="globalstore.upImageuler('/static/purchase/label-selection.png')" mode="aspectFit">
										</image>
										<view>筛选标签</view>
									</view>
								</view>
								<view class="tags-content">{{lable.title}}</view>
							</view>
						</view>
						<view class="institution" v-if="data.type === 'paper_money'">
							<view>鉴定机构</view>
							<view class="institution-content">
								<view v-for="(item,index) in ratingList" :class="{active: ratingCode === item.code}"
									@click="ratingCode = item.code;selectId = {}">{{item.name}}</view>
							</view>
							<view class="institution-select">
								<view v-for="(item,index) in selectRating" :class="{active: selectId.id === item.id}"
									@click="onRate(item)">{{item.name}}</view>
							</view>
						</view>
						<view class="updata">
							<view>添加图片详情</view>
							<view class="imglist">
								<view @click="upImg" v-if="imgList.length !== 5">
									<image :src="globalstore.upImageuler('/static/purchase/addImg.png')" mode="aspectFit"></image>
								</view>
								<view v-for="(item,index) in imgList">
									<image :src="item" mode="aspectFit" @click.stop="lookImageLsit(imgList,index)"></image>
									<uni-icons type="clear" color="#FF5500" size="18" class="clear"
										@click="imgList.splice(index,1)"></uni-icons>
								</view>
							</view>
							<view class="shopinfo">
								<textarea maxlength="100" placeholder="填写详细信息，更利于后期成交哦(100字以内)" placeholder-class="placeholder"
									v-model="detailed"></textarea>
							</view>
						</view>
						<view class="shipment">
							<view>发货详情</view>
							<view class="childer">
								<view class="childer-left">当前货物状态</view>
								<view class="childer-list">
									<view v-for="item in cargoStatus" :class="{active: isCargoId === item.id}"
										@click="isCargoId = item.id">{{item.title}}</view>
								</view>
								<view class="description" @click="open('https://www.yipinhui.shop/shipping_instructions.html')">
									<uni-icons type="help" size="18" color="#5C97E0"
										style="margin-left: 20rpx;cursor: pointer;"></uni-icons>
									<span>发货说明</span>
								</view>
							</view>
							<view class="explain">
								<view class="spot" v-if="isCargoId === '0'">
									<uni-icons type="info" size="18" color="#BF7D2B"></uni-icons>
									<view>发货承诺:<br />
										<span>您承诺在订单成交后 48 小时内发货。<br />如遇国家法定节假日,发货时间可顺延至节后第一个工作日。</span>
									</view>
								</view>
								<view class="futures" v-else>
									<view class="title">商品发售日期</view>
									<view class="fu-content">实际发行日期：{{data.childList.issuanceDate}}</view>
									<view class="date">
										<view v-for="(item,index) in dateList" :class="{active: dateId === item.id}"
											@click="onDateId(item.id)">
											<image :src="dateId === item.id ? item.active_icon : item.icon" mode="aspectFit"></image>
											<view>{{item.title}}天内</view>
										</view>
									</view>
									<view class="title">预计发货时间(发售后)</view>
									<view class="fu-content">
										<uni-icons type="info" size="18" color="#BF7D2B"></uni-icons>
										预计最晚发货日期为:<span>{{lastDate}}</span>
									</view>
								</view>
							</view>
							<view class="childer">
								<view class="childer-left">发货地区</view>
								<view class="childer-right" style="flex: 0.6;">
									<input type="text" placeholder="选择地区" placeholder-class="placeholder" disabled
										:value="loaction.select.province + ' ' + loaction.select.city" />
									<uni-icons type="right" size="14" color="#ABABAB"></uni-icons>
									<view class="click" @click="loaction.show = !loaction.show">
										<popup-loaction v-if="loaction.show" v-model:list="loaction.list" v-model:loaction="loaction.select"
											@change="loaction.change()"></popup-loaction>
									</view>
								</view>
							</view>
							<view class="childer">
								<view class="childer-left">发货方式</view>
								<view class="childer-list">
									<view v-for="(item,index) in shipping.List" :class="{active: shipping.index === index}"
										@click="shipping.index = index">{{item}}</view>
								</view>
							</view>
						</view>
						<view class="other">
							<view>其他</view>
							<view class="childer">
								<view class="childer-left">有效期</view>
								<view class="childer-list">
									<view v-for="(item,index) in validity.list" :class="{active: validity.index === index}"
										@click="validity.index = index;validity.value = ''">{{item}}</view>
								</view>
							</view>
							<view class="childer">
								<view class="childer-left">时间</view>
								<view class="childer-right" style="flex: 0.6;">
									<input type="number" :placeholder="validity.placeList[validity.index].title"
										placeholder-class="placeholder" v-model="validity.value"
										@input="(e)=>validity.placeList[validity.index].input(e)" />
									<view>{{validity.placeList[validity.index].warning}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="continer">
					<view>价格/库存等</view>
					<view class="basic-info">
						<view class="mode">
							<view class="guarantee" @click="isGuarantee = !isGuarantee">
								<view :class="{'active-l': isGuarantee }">担保交易</view>
								<view :class="{'active-r': !isGuarantee}">非担保交易 <image
										:src="globalstore.upImageuler('/static/mine/vip.png')" mode="aspectFit"></image>
								</view>
							</view>
							<view class="mode-content">
								<view class="price-uitly">
									<view class="childer">
										<view class="childer-left">单位</view>
										<view class="childer-right">
											<input type="text" placeholder="请选择单位" placeholder-class="placeholder" v-model="cptUnit.unity"
												disabled />
											<uni-icons type="right" size="14" color="#ABABAB" style="transition: all ease 0.3s; "
												:style="{transform: cptUnit.show ? 'rotate(90deg)' : 'rotate(0deg)' }"></uni-icons>
											<view class="click" @click="cptUnit.show = !cptUnit.show">
												<unity-num :show='cptUnit.show' :type="cptUnit.type" v-model:unity="cptUnit.unity"
													@click="cptUnit.click()"></unity-num>
											</view>
										</view>
									</view>
									<view class="childer">
										<view class="childer-left">数量</view>
										<view class="childer-right">
											<input type="number" placeholder="请输入大于0的整数" placeholder-class="placeholder" v-model="total" />
											<view>{{cptUnit.unity}}</view>
										</view>
									</view>
									<view class="childer">
										<view class="childer-left">最小确认数量</view>
										<view class="childer-right">
											<input type="number" placeholder="请输入最小确认数量" placeholder-class="placeholder" v-model="minNum" />
											<view>{{cptUnit.unity}}</view>
										</view>
									</view>
									<view class="childer">
										<view class="childer-left">单价</view>
										<view class="childer-right">
											<input type="number" placeholder="请输入单价" placeholder-class="placeholder" v-model="price" />
											<view>元/{{cptUnit.unity}}</view>
										</view>
									</view>
								</view>
								<view class="total">
									总价：<span>{{totalPrice}}</span>
								</view>
								<view class="switch" v-if="isCargoId === '0'">
									<view class="switch-title">
										<view>开启议价</view>
										<image
											:src="isBargin ? globalstore.upImageuler('/static/mine/switch_on.png') : globalstore.upImageuler('/static/mine/switch_off.png') "
											mode="aspectFit" @click="isBargin = !isBargin"></image>
									</view>
									<view class="switch-tap">{{isBargin ? '买家将可以按当前价格的110%起与您议价' : '议价已关闭，当前为一口价模式' }}</view>
								</view>
								<view class="switch">
									<view class="switch-title">
										<view>
											交易保证金
											<uni-icons type="help" size="18" color="#5C97E0" style="margin-left: 20rpx;cursor: pointer;"
												@click="open('https://www.yipinhui.shop/margin_statement.html')"></uni-icons>
											<span @click="open('https://www.yipinhui.shop/margin_statement.html')">保证金说明</span>
										</view>
										<image
											:src="isMargin ? globalstore.upImageuler('/static/mine/switch_on.png') : globalstore.upImageuler('/static/mine/switch_off.png') "
											mode="aspectFit" @click="onMargin()"></image>
									</view>
									<view class="switch-tap" v-if="isMargin">
										<view class="bail">
											保证金总金额<span>{{totalPrice === '--' ? 0 : (total*price*(isCargoId === '1' ? 0.2 : 0.1)).toFixed(2) }}</span>元<span>(总价金额*{{isCargoId === '1' ? '20%' : '10%'}})</span>
										</view>
										<view class="agree">
											<image :src="globalstore.upImageuler('/static/purchase/checked-w.png')" mode="scaleToFill"
												@click="onMargin()"></image>
											<view>同意保证金规则</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<popup-lable :show="lable.show" :list="lable.list" @close="lable.close()" @suer="(e)=>lable.suer(e)"></popup-lable>
		<popup-type :show="coinType.show" :goods-name="coinType.name" :type-list="coinType.list" @close="coinType.close()"
			@suer="(e)=>coinType.suer(e)"></popup-type>
		<popup-number :show="paperNumber.show" :type-name="paperNumber.type.name" :bank-note-id="paperNumber.type.id"
			@click="paperNumber.close()" @submit="(e)=>paperNumber.suer(e)"></popup-number>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref,
		watch
	} from 'vue';
	import {
		useGlobalStore
	} from '../../store/store';
	import {
		rate,
		addressList,
		LoongBanknoteTags,
		purchaseSave,
		goldCoinPackageType,
		noteNumberDetail,
		saleSave
	} from '../../api/common';
	import UnityNum from '../UnityNum/UnityNum.vue';
	import {
		uploadImage
	} from '../../api/upload';
	import {
		lookImageLsit
	} from '../../utils/common';
	import PopupLoaction from '../PopupLoaction/PopupLoaction.vue';
	import PopupLable from '../PopupLable/PopupLable.vue';
	import PopupType from '../PopupType/PopupType.vue';
	import PopupNumber from '../PopupNumber/PopupNumber.vue';
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		getPublishPackageItemDTOList
	} from '../../utils/common';

	const props = defineProps({
		data: {
			type: Object,
			default: () => ({})
		}
	})

	const emits = defineEmits(['step'])

	const globalstore = useGlobalStore()
	const classifyList = [{
			id: '',
			type: 'paper_money',
			title: '纸币'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f96a',
			type: 'gold_coin',
			title: '贵金属纪念币'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e394f97a',
			type: 'common_coin',
			title: '普通纪念币'
		},
		{
			id: 'dc2456b4c0c246eeadfa8161e3940001',
			type: 'stamp',
			title: '邮票'
		}
	]

	const unitMap = {
		1: '张',
		2: '组',
		3: '刀'
	}

	const dateList = [{
			id: '0',
			title: '3',
			icon: '/static/days/3-unselect.png',
			active_icon: '/static/days/3-select.png'
		},
		{
			id: '1',
			title: '5',
			icon: '/static/days/5-unselect.png',
			active_icon: '/static/days/5-select.png'
		},
		{
			id: '2',
			title: '7',
			icon: '/static/days/7-unselect.png',
			active_icon: '/static/days/7-select.png'
		},
		{
			id: '3',
			title: '10',
			icon: '/static/days/10-unselect.png',
			active_icon: '/static/days/10-select.png'
		},
		{
			id: '4',
			title: '15',
			icon: '/static/days/15-unselect.png',
			active_icon: '/static/days/15-select.png'
		},
		{
			id: '5',
			title: '30',
			icon: '/static/days/30-unselect.png',
			active_icon: '/static/days/30-select.png'
		}
	]

	const dateId = ref(dateList[0].id)
	const classId = ref(classifyList[0].id)
	const classIndex = ref(1)
	const classTitle = ref(classifyList[0].title)
	const paperList = ref(null)
	const paperTypeId = ref('')
	const paperTypeListId = ref('')
	const isPaper = ref(false)
	const paperTypeList = ref([])
	const ratingList = ref([{
		name: '无评级',
		code: 'WPJ',
		list: [{
				name: '全品',
				id: '0',
				parentName: 'WPJ'
			},
			{
				name: '上品 ',
				id: '1',
				parentName: 'WPJ'
			},
			{
				name: '中品 ',
				id: '2',
				parentName: 'WPJ'
			},
			{
				name: '差品 ',
				id: '3',
				parentName: 'WPJ'
			},
			{
				name: '个别瑕疵 ',
				id: '4',
				parentName: 'WPJ'
			},
			{
				name: '部分瑕疵 ',
				id: '5',
				parentName: 'WPJ'
			},
		]
	}])
	const ratingCode = ref(ratingList.value[0].code)
	const selectRating = computed(() => ratingList.value.find(item => item.code === ratingCode.value).list)
	const selectId = ref({})
	const imgList = ref([]) //图片详情
	const isBargin = ref(true) //是否议价
	const isMargin = ref(true) //是否保证金
	const isAgree = ref(true) //是否同意买卖
	const isGuarantee = ref(true) //是否担保交易
	const productName = ref('')
	const cargoStatus = ref([{
		id: '0',
		title: '现货'
	}])
	const isCargoId = ref('0') //现货
	const detailed = ref('') //详细信息
	const total = ref('') //总数
	const minNum = ref('') //最小确认数量
	const price = ref('') //单价
	const coinList = ref([])
	const isLableShow = ref(true)
	const totalPrice = computed(() => {
		if (!total.value || !price.value) return '--'
		return '¥' + (total.value * price.value).toFixed(2)
	}) //总价
	
	const isDisabled = computed(() => {
		if(productName.value !== '' && Object.keys(loaction.value.select).length !== 0 && validity.value.value !== '' &&
			total.value !== '' && minNum.value !== '' && price.value !== '') return false
		return true
	})

	const lastDate = computed(() => {
		if (!props.data.childList.issuanceDate) return ''
		let days = parseInt(dateList.find(item => item.id === dateId.value).title) //5
		let dateStr = (props.data.childList.issuanceDate).match(/(\d+)年(\d+)月(\d+)日/) //2026年1月8号
		let year = parseInt(dateStr[1], 10)
		let month = parseInt(dateStr[2], 10) - 1
		let day = parseInt(dateStr[3], 10)
		let issuanceDate = new Date(year, month, day)
		const futureDate = new Date(issuanceDate)
		futureDate.setDate(futureDate.getDate() + days)
		const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		const weekday = weekdays[futureDate.getDay()]
		const formattedDate =
			`${futureDate.getFullYear()}年${futureDate.getMonth() + 1}月${futureDate.getDate()}日 ${weekday}`
		return formattedDate
	}) //最晚发货日期
	const lable = ref({
		show: false,
		list: {},
		info: [],
		connunmType: 1,
		title: '',
		getLablelist() {
			LoongBanknoteTags().then(res => {
				this.list = res.data
			})
		},
		close() {
			this.show = false
		},
		suer(e) {
			console.log(e);
			if (props.data.release === 'sell') {
				let titleList = [e.specsName, e.headName, e.tailName, e.moreName].filter(item => item !== '')
				this.title = titleList.join('、')
				this.info = [{
						category: e.specsCategory,
						consecutiveType: 1,
						id: e.specsIndex,
						name: e.specsName,
					},
					{
						category: e.headCategory,
						consecutiveType: 1,
						id: e.headIndex,
						name: e.headName,
					},
					{
						category: e.tailCategory,
						consecutiveType: 1,
						id: e.tailIndex,
						name: e.tailName,
					},
					{
						category: e.moreCategory,
						consecutiveType: 1,
						id: e.moreIndex,
						name: e.moreName,
					}
				].filter(item => item.id !== -1)
				if (this.title !== '') paperNumber.value.list.length = 0
				isLableShow.value = this.title !== '' ? false : true
			} else {
				this.connunmType = +e.typeIndex + 1
				this.info = [{
						category: e.specsCategory,
						consecutiveType: 1,
						id: e.specsIndex,
						name: e.specsName,
					},
					{
						category: e.headCategory,
						consecutiveType: 1,
						id: e.headIndex,
						name: e.headName,
					},
					{
						category: e.tailCategory,
						consecutiveType: 1,
						id: e.tailIndex,
						name: e.tailName,
					},
					{
						category: e.moreCategory,
						consecutiveType: 1,
						id: e.moreIndex,
						name: e.moreName,
					}
				].filter(item => item.id !== -1)
			}

			this.close()
		},
		open() {
			this.getLablelist()
			this.show = true
		}
	})

	const coinType = ref({
		show: false,
		list: [],
		name: '',
		select: {},
		index: -1,
		close() {
			this.show = false
		},
		suer(e) {
			let data = {
				categoryId: props.data.childList.id,
				certificateNo: e.numberList.join('、'), //证书编号
				coinSet: this.select.coinSet,
				hasCertificate: e.have === '有证书' ? true : false, //有无证书
				imageUrl: this.select.imageUrl,
				isMatchAll: e.isOption, //先不管
				packageCompany: e.packageType,
				packageCompanyId: e.companyCode,
				packageRating: e.packageItem,
				packageRatingCode: e.ratingCode, //封装评级code
				packageType: e.typeId - 1, //0无，1封，2评级
				sameCertificate: e.isSame, //套内各币同号
				selected: true, //先不管
				specificationsName: this.select.specificationsName
			}
			if (e.isOption) {
				coinList.value.forEach(item => {
					item.specItemList = data
					item.specShow = e
				})
			} else {
				coinList.value[this.index].specItemList = data
				coinList.value[this.index].specShow = e
			}
			console.log(coinList.value);
		},
		open(item, i) {
			this.select = item
			this.index = i
			console.log(item);
			this.name = item.specificationsName
			this.show = true
			goldCoinPackageType().then(res => {
				this.list = res.data
			})
		}
	})

	const paperNumber = ref({
		show: false,
		type: {},
		list: [],
		bankNoteNumbers: '',
		close() {
			this.show = false
		},
		suer(e) {
			this.bankNoteNumbers = e.join('、')
			noteNumberDetail({
				bankNoteNumbers: this.bankNoteNumbers,
				productCategoryId: this.type.id
			}).then(res => {
				this.list = res.data
				isLableShow.value = this.list.length !== 0 ? false : true
				if (this.list.length !== 0) {
					lable.value.title = '' 
					lable.value.info.length = 0
				}
				this.close()
			})
		},
		open(e) {
			this.type = e
			this.show = true
		}
	})

	const cptUnit = ref({
		show: false,
		unity: '', //单位
		type: '',
		click() {
			this.show = false
		}
	})

	const onMargin = () => {
		if (isCargoId.value === '1' && isMargin) {
			uni.showToast({
				title: '预购模式必须要保证金',
				icon: 'none'
			})
			return
		}
		isMargin.value = !isMargin.value
	}

	const loaction = ref({
		show: false,
		list: [],
		select: {},
		change() {
			this.show = false
		}
	})

	const shipping = ref({
		List: ['包邮', '不包邮'],
		index: 0
	})

	const validity = ref({
		list: ['天', '小时'],
		index: 0,
		value: '',
		placeList: [{
				title: '请输入天数',
				warning: '最长90天',
				input(e) {
					if (e.detail.value > 90) {
						validity.value.value = 90
					}
				}
			},
			{
				title: '请输入小时',
				warning: '最长72小时',
				input(e) {
					if (e.detail.value > 72) {
						validity.value.value = 72
					}
				}
			}
		]
	})

	const onDateId = (id) => {
		dateId.value = id
	}

	const onRate = (item) => {
		console.log(item);
		selectId.value = item
	}

	const getList = () => {
		rate().then(res => {
			ratingList.value = [...ratingList.value, ...res.data]
			console.log(ratingList.value);
		})
	}

	const getAddList = () => {
		addressList().then(res => {
			loaction.value.list = res.data.map(item => ({
				...item,
				loaction: item.province + item.city + item.district + item.detailAddress
			}))
			loaction.value.select = res.data.find(item => item.isDefault)
		})
	}

	const upImg = () => {
		let count = 5 - imgList.value.length
		uploadImage({
			count
		}).then(res => {
			res.forEach(item => {
				imgList.value.push(item.url)
			})
		})
	}

	const open = (url) => {
		window.open(url, '_blank')
	}

	onShow(() => {
		getAddList()
	})

	onMounted(() => {
		getList()
		getAddList()
	})

	const submit = () => {
		if (productName.value === '') {
			uni.showToast({
				title: '请输入藏品标题',
				icon: 'none'
			})
			return
		}
		if (Object.keys(loaction.value.select).length === 0) {
			uni.showToast({
				title: '请选择收货地址',
				icon: 'none'
			})
			return
		}
		if (validity.value.value === '') {
			uni.showToast({
				title: '请输入有效期',
				icon: 'none'
			})
			return
		}
		if (total.value === '') {
			uni.showToast({
				title: '请输入数量',
				icon: 'none'
			})
			return
		}
		if (minNum.value === '') {
			uni.showToast({
				title: '请输入最小确认数量',
				icon: 'none'
			})
			return
		}
		if (price.value === '') {
			uni.showToast({
				title: '请输入单价',
				icon: 'none'
			})
			return
		}
		
		if (props.data.release === 'sell') {
			pushSell()
		} else {
			pushPurchase()
		}
	}

	const pushSell = () => {
		let data = {
			appraisalInstitutionId: selectId.value.id || '',
			appraisalInstitutionName: selectId.value.name || '',
			bargainRatio: 0,
			consecutiveNumType: "",
			currentCargoStatus: isCargoId.value,
			delivery: shipping.value.index,
			descriptionDetails: detailed.value,
			followReleaseDays: isCargoId.value === "1" ? dateList.find(item => item.id === dateId.value).title : '',
			identifyQuantity: total.value,
			issuanceDate: isCargoId.value === '1' ? props.data.childList.issuanceDate : '',
			labelInfos: JSON.stringify(lable.value.info),
			lastSentDate: "",
			lastSentDays: "",
			minimumConfirmationQuantity: minNum.value,
			needTradeMargin: isMargin.value,
			numbers: paperNumber.value.bankNoteNumbers,
			pictureDetails: imgList.value.join(','),
			priceModel: isCargoId.value === '1' ? 0 : isBargin.value ? 1 : 0,
			productCategoryId: props.data.childList.id,
			productCategoryType: props.data.type,
			productCondition: "",
			productName: productName.value,
			publishPackageItemDTOList: [],
			shippingCity: loaction.value.select.city,
			shippingProvince: loaction.value.select.province,
			tradingMarginRatio: isMargin.value ? (isCargoId.value === '1' ? 0.2 : 0.1) : 0,
			transactionMode: isGuarantee.value ? 1 : 0,
			transactionUnitPrice: price.value,
			unit: cptUnit.value.unity,
			userAddressId: loaction.value.select.id,
			validityPeriod: validity.value.value,
			validityPeriodUnit: validity.value.index === 0 ? 1 : 0,
		}
		if(props.data.type === 'gold_coin' || props.data.type === 'common_coin') {
			data.productCategoryId = props.data.list.productCategoryId
			coinList.value.forEach(item => {
				if (!item.specItemList) item.specItemList = {
					categoryId: props.data.childList.id,
					coinSet: item.coinSet,
					imageUrl: item.imageUrl,
					selected: true,
					specificationsName: item.specificationsName
				}
			})
			data.publishGoldCoinItemDTOList = [{
				category: props.data.childList.name,
				categoryId: props.data.childList.id,
				name: productName.value,
				type: props.data.type,
				year: props.data.list.year, 
				specItemList: coinList.value.map(item => item.specItemList)
			}]
		}
		else if (props.data.type === 'banknote_other') {
			data.productCategoryId = props.data.list.productCategoryId
			data.publishGoldCoinItemDTOList = [{
				category: props.data.childList.name,
				categoryId: props.data.childList.id,
				name: productName.value,
				type: props.data.type,
				year: props.data.list.collectionName,
				specItemList: [{
					categoryId: props.data.childList.id,
					coinSet: props.data.specsFlatList1[0].coinSet,
					imageUrl: props.data.specsFlatList1[0].imageUrl,
					selected: true,
					specificationsName: props.data.specsFlatList1[0].specificationsName 
				}]
			}]
		}
		else if (props.data.type === 'stamp') {
			data.productCategoryId = props.data.list.productCategoryId
			coinList.value.forEach(item => {
				if (!item.specItemList) item.specItemList = {
					categoryId: props.data.childList.id,
					coinSet: item.coinSet,
					imageUrl: item.imageUrl,
					selected: true,
					specificationsName: item.specificationsName
				}
			})
			data.purchaseOrderItemVOS = [{
				category: props.data.childList.name,
				categoryId: props.data.childList.id, 
				name: productName.value,
				type: props.data.type,
				year: props.data.list.year,
				specItemList: coinList.value.map(item => item.specItemList)
			}]
		}
		console.log(data);
		saleSave(data).then(res=>{
			if (res.code === 200) {
				emits('step', 3)
			}
		})
	}

	const pushPurchase = () => {
		let data = {
			bargainRatio: isCargoId.value === '1' ? 0 : isBargin.value ? 0.1 : 0, //议价比例
			currentCargoStatus: isCargoId.value, //0现货1预购
			delivery: shipping.value.index, //发货方式0包邮1不包邮
			followReleaseDays: isCargoId.value === "1" ? dateList.find(item => item.id === dateId.value).title : '', //发行日期延后日期 -- 预售时候必传
			issuanceDate: isCargoId.value === '1' ? props.data.childList.issuanceDate : '', //发行日期 yyyy-MM-dd -- 预售时候必传
			needTradeMargin: isMargin.value, //是否需要交易保证金
			operatorType: 0, //操作类型 0表示新建 1表示修改
			priceModel: isCargoId.value === '1' ? 0 : isBargin.value ? 1 : 0, //是否议价0不议价，1议价
			productCategoryId: props.data.childList.id, //商品目录id
			productCategoryType: props.data.type, //商品类型
			productName: productName.value, //商品名称
			shippingProvince: loaction.value.select.province, //发货省份
			shippingCity: loaction.value.select.city, //发货城市
			tradingMarginRatio: isMargin.value ? (isCargoId.value === '1' ? 0.2 : 0.1) : 0, //交易保证金比例
			transactionMode: isGuarantee.value ? 1 : 0, //交易方式0非担保1担保
			userAddressId: loaction.value.select.id, //用户地址Id
			validityPeriod: validity.value.value, //有效期
			validityPeriodUnit: validity.value.index === 0 ? 1 : 0, //有效期单位
		}

		// 纪念钞
		if (props.data.type === 'paper_money') {
			data.purchaseOrderItemVOS = [{
				appraisalInstitutionId: selectId.value.id || '',
				appraisalInstitutionName: selectId.value.name || '',
				consecutiveNumType: lable.value.connunmType,
				descriptionDetails: detailed.value, //描述详情
				identifyQuantity: total.value, //数量
				minimumConfirmationQuantity: minNum.value, //最小确认数
				tabCategoryType: props.data.type,
				transactionUnitPrice: price.value, //单价
				unit: cptUnit.value.unity, //单位
				labelInfos: lable.value.info
			}]
		}
		// 第几套纸币
		else if (props.data.type === 'banknote_other') {
			data.productCategoryId = props.data.list.productCategoryId
			data.purchaseOrderItemVOS = [{
				category: props.data.childList.name, //分类
				categoryId: props.data.childList.id, //分类ID
				descriptionDetails: detailed.value, //描述详情
				identifyQuantity: total.value, //数量
				minimumConfirmationQuantity: minNum.value, //最小确认数量
				name: productName.value,
				transactionUnitPrice: price.value, //单价
				type: props.data.type,
				unit: cptUnit.value.unity, //单位
				year: props.data.list.collectionName, //年份
				specItemList: [{
					categoryId: props.data.childList.id,
					coinSet: props.data.specsFlatList1[0].coinSet, //是否套币
					imageUrl: props.data.specsFlatList1[0].imageUrl,
					selected: true,
					specificationsName: props.data.specsFlatList1[0].specificationsName //规格名称
				}]
			}]
		} else if (props.data.type === 'gold_coin') {
			data.productCategoryId = props.data.list.productCategoryId
			coinList.value.forEach(item => {
				if (!item.specItemList) item.specItemList = {
					categoryId: props.data.childList.id,
					coinSet: item.coinSet,
					imageUrl: item.imageUrl,
					selected: true,
					specificationsName: item.specificationsName
				}
			})

			data.purchaseOrderItemVOS = [{
				category: props.data.childList.name, //分类
				categoryId: props.data.childList.id, //分类ID
				descriptionDetails: detailed.value, //描述详情
				identifyQuantity: total.value, //数量
				minimumConfirmationQuantity: minNum.value, //最小确认数量
				name: productName.value,
				transactionUnitPrice: price.value, //单价
				type: props.data.type,
				unit: cptUnit.value.unity, //单位
				year: props.data.list.year, //年份
				specItemList: coinList.value.map(item => item.specItemList)
			}]
		} //贵金属
		else if (props.data.type === 'common_coin') {
			data.productCategoryId = props.data.list.productCategoryId
			coinList.value.forEach(item => {
				if (!item.specItemList) item.specItemList = {
					categoryId: props.data.childList.id,
					coinSet: item.coinSet,
					imageUrl: item.imageUrl,
					selected: true,
					specificationsName: item.specificationsName
				}
			})
			data.purchaseOrderItemVOS = [{
				category: props.data.childList.name, //分类
				categoryId: props.data.childList.id, //分类ID
				descriptionDetails: detailed.value, //描述详情
				identifyQuantity: total.value, //数量
				minimumConfirmationQuantity: minNum.value, //最小确认数量
				name: productName.value,
				transactionUnitPrice: price.value, //单价
				type: props.data.type,
				unit: cptUnit.value.unity, //单位
				year: props.data.list.year, //年份
				specItemList: coinList.value.map(item => item.specItemList)
			}]
		} //普通金属
		else if (props.data.type === 'stamp') {
			data.productCategoryId = props.data.list.productCategoryId
			coinList.value.forEach(item => {
				if (!item.specItemList) item.specItemList = {
					categoryId: props.data.childList.id,
					coinSet: item.coinSet,
					imageUrl: item.imageUrl,
					selected: true,
					specificationsName: item.specificationsName
				}
			})
			data.purchaseOrderItemVOS = [{
				category: props.data.childList.name, //分类
				categoryId: props.data.childList.id, //分类ID
				descriptionDetails: detailed.value, //描述详情
				identifyQuantity: total.value, //数量
				minimumConfirmationQuantity: minNum.value, //最小确认数量
				name: productName.value,
				transactionUnitPrice: price.value, //单价
				type: props.data.type,
				unit: cptUnit.value.unity, //单位
				year: props.data.list.year, //年份
				specItemList: coinList.value.map(item => item.specItemList)
			}]
		}
		purchaseSave(data).then(res => {
			if (res.code === 200) {
				emits('step', 3)
			}
		})
	}

	watch(() => props.data, (n) => {
		if (n) {
			console.log(n);
			productName.value = n.name
			cptUnit.value.type = n.type
			if (n.childList.issued || !n.childList.futureEnabled) {
				cargoStatus.value = [{
					id: '0',
					title: '现货'
				}]
				isCargoId.value = '0'
			}
			if (n.childList.futureEnabled) {
				cargoStatus.value.push({
					id: '1',
					title: '预购'
				})
				isCargoId.value = '1'
			}
			if (n.specsFlatList1 || n.specsFlatList2) {
				coinList.value = n.specsFlatList1.length !== 0 ? n.specsFlatList1 : [n.specsFlatList2]
			}
		}
	}, {
		immediate: true
	})
</script>

<style scoped lang="scss">
	@mixin windth {
		width: 100%;
		min-width: 780rpx;
	}

	@mixin column-gap($gap) {
		display: flex;
		flex-direction: column;
		gap: $gap;
	}

	@mixin row-gap($gap) {
		display: flex;
		align-items: center;
		gap: $gap;
	}

	@mixin font-title {
		font-weight: 600;
		font-size: 28rpx;
		color: #2C2E3A;
	}

	@mixin font-content {
		font-weight: 400;
		font-size: 28rpx;
		color: #2C2E3A;
		padding: 8rpx 16rpx;
		box-sizing: border-box;
		background: #F8F8F8;
		border-radius: 12rpx;
		cursor: pointer;
	}

	@mixin active-font-content {
		font-weight: 600;
		font-size: 28rpx;
		color: #BF7D00;
		background: #FFF0DC;
	}

	@mixin not-ipnut {
		background: #FFFFFF;
		border-radius: 16rpx;
		border: 2rpx solid #D8D8D8;
		padding: 20rpx;
		box-sizing: border-box;
		@include windth();

		>input {
			font-size: 28rpx;
			line-height: 28rpx;
			font-weight: 400;
			color: #2C2E3A;
			flex: 1;
		}
	}

	@mixin border {
		background: #FFFFFF;
		border-radius: 12rpx;
		border: 2rpx solid rgba(219, 220, 224, 0.4);
	}

	.purchase {
		padding: 32rpx 40rpx;
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
		width: 100%;

		button {
			margin: 0;
			padding: 0;

			&::after {
				display: none;
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 36rpx;
			overflow: hidden;
			height: 100%;

			.content-shop {
				@include column-gap(20rpx);
				@include border();
				width: 100%;
				padding: 40rpx 24rpx;
				box-sizing: border-box;
				overflow: hidden;

				.content-top {
					@include row-gap(0);
					justify-content: space-between;
					width: 100%;
					overflow: hidden;

					.back {
						@include row-gap(24rpx);

						>view:first-child {
							@include column-gap(0);
							align-items: center;
							font-weight: 400;
							font-size: 12px;
							color: #ABABAB;
							line-height: normal;
							background: #F8F8F8;
							border-radius: 20rpx;
							padding: 18rpx 22rpx 8rpx;
							box-sizing: border-box;
							cursor: pointer;

							.uni-icons {
								color: inherit !important;
							}

							&:hover {
								background: #FFF2E2;
								color: #BF7D2B;
							}
						}

						.back-title {
							@include column-gap(16rpx);
							line-height: normal;

							>view:first-child {
								font-weight: 400;
								font-size: 28rpx;
								color: #ABABAB;
							}

							>view:last-child {
								font-weight: 400;
								font-size: 32rpx;
								color: #2C2E3A;
							}
						}
					}

					>button {
						padding: 12rpx 40rpx;
						box-sizing: border-box;
						font-weight: 600;
						font-size: 28rpx;
						color: #FFFFFF;
						background: #FFC400;
						border-radius: 46rpx;
						line-height: normal;
						&[disabled=true]{
							background: transparentize($color: #FFC400, $amount: 0.8);
						}
					}
				}

				.top-shop-paper {
					@include row-gap(12rpx);
					padding: 30rpx 16rpx;
					box-sizing: border-box;
					width: 33.33%;
					background: #F8F8F8;
					border-radius: 12rpx;
					overflow: hidden;
					font-weight: 400;
					font-size: 28rpx;
					color: #2C2E3A;

					>view:first-child {
						width: 20%;
						aspect-ratio: 1/1;
						background-color: #FFFFFF;
						border-radius: 12rpx;
						overflow: hidden;

						>image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.top-shop-RMB {
					width: 100%;
					@include row-gap(36rpx);
					overflow-x: auto;

					>view {
						@include column-gap(30rpx);
						padding: 24rpx 16rpx 12rpx;
						box-sizing: border-box;
						background: #F8F8F8;
						border-radius: 12rpx;
						min-width: 38%;

						.shop-image {
							@include row-gap(12rpx);
							width: 100%;

							>view:first-child {
								width: 20%;
								aspect-ratio: 1/1;
								background-color: #FFFFFF;
								border-radius: 12rpx;
								overflow: hidden;

								>image {
									width: 100%;
									height: 100%;
								}
							}

							.image-title {
								flex: 1;
								@include column-gap(14rpx);

								>view:first-child {
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
								}

								.type {
									.sele-type {
										@include row-gap(0);
										font-weight: 400;
										font-size: 24rpx;
										color: #BF7D00;
										line-height: 24rpx;
										cursor: pointer;
									}

									.sele-type-active {
										@include row-gap(20rpx);
										justify-content: space-between;

										>view {
											display: flex;
											gap: 28rpx;

											.item {
												@include column-gap(10rpx);

												>view {
													font-weight: 400;
													font-size: 22rpx;
													color: #ABABAB;
													line-height: 22rpx;
												}
											}
										}
									}
								}
							}
						}

						.price-title {
							background: #F0F0F0;
							border-radius: 12rpx;
							padding: 12rpx;
							box-sizing: border-box;
							@include row-gap(20rpx);
							justify-content: space-between;
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
							line-height: 24rpx;

							>view:first-child {
								@include row-gap(8rpx);

								>image {
									width: 28rpx;
									height: 28rpx;
								}
							}

							.title-time {
								@include row-gap(20rpx);

								>view {
									@include row-gap(6rpx);

									>image {
										width: 20rpx;
										height: 20rpx;
									}
								}
							}
						}
					}
				}
			}



			.justify {
				flex: 1;
				display: flex;
				justify-content: space-between;
				gap: 36rpx;
				width: 100%;
				overflow-y: hidden;

				.continer {
					flex: 1;
					padding: 28rpx 24rpx;
					box-sizing: border-box;
					@include column-gap(36rpx);
					@include border();
					height: 100%;
					overflow: hidden;

					>view:first-child {
						display: flex;
						align-items: center;
						font-weight: 600;
						font-size: 32rpx;
						line-height: 32rpx;
						color: #2C2E3A;

						&::before {
							display: inline-block;
							content: '';
							width: 8rpx;
							height: 100%;
							background: #FFC400;
							margin-right: 8rpx;
							border-radius: 16rpx;
						}
					}

					.basic-info {
						flex: 1;
						@include column-gap(36rpx);
						overflow-y: auto;

						.collection {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
							}

							.ipt {
								@include not-ipnut();
							}
						}

						.lable {
							@include column-gap(16rpx);

							.lable-top {
								display: flex;
								align-items: center;
								justify-content: space-between;
								@include font-title;
								@include windth();

								>view:last-child {
									@include row-gap(0);
									cursor: pointer;

									>image {
										width: 32rpx;
										height: 32rpx;
									}
								}
							}

							.lable-content {
								@include not-ipnut();

								.label-not {
									align-items: center;
									@include column-gap(12rpx);
									font-weight: 400;
									font-size: 24rpx;
									color: #C2C2C2;

									>image {
										width: 108rpx;
										height: 82rpx;
									}
								}

								.lable-have {
									color: #BF7D2b;
									@include row-gap(gap);

									>view {
										&::after {
											content: '、'
										}

										&:last-child {
											&::after {
												content: ''
											}
										}

									}
								}
							}
						}

						.attribute {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;

								&::after {
									content: ' 详细的属性更容易被搜索到哟～';
									font-weight: 400;
									font-size: 24rpx;
									color: #ABABAB;
								}
							}

							.addnumber {
								@include row-gap(12rpx);

								.numbers {
									position: relative;

									>image {
										width: 356rpx;
										height: 190rpx;
									}

									.title {
										position: absolute;
										top: 16rpx;
										left: 16rpx;
										font-weight: 600;
										font-size: 24rpx;
										color: #FFFFFF;
										line-height: 24rpx;
									}

									.picture {
										position: absolute;
										top: 60rpx;
										left: 20rpx;
										width: 140rpx;
										height: 110rpx;
										background-color: transparent;
										display: flex;
										align-items: flex-end;
										justify-content: center;
										cursor: pointer;

										>view {
											@include row-gap(0);
											font-weight: 500;
											font-size: 20rpx;
											line-height: 20rpx;
											color: #FFFFFF;

										}
									}

									.entry {
										position: absolute;
										top: 60rpx;
										right: 20rpx;
										width: 140rpx;
										height: 110rpx;
										background-color: transparent;
										display: flex;
										align-items: flex-end;
										justify-content: center;
										cursor: pointer;

										>view {
											@include row-gap(0);
											font-weight: 500;
											font-size: 20rpx;
											line-height: 20rpx;
											color: #FFFFFF;

										}
									}
								}

								.tabs {
									position: relative;
									cursor: pointer;

									>image {
										width: 238rpx;
										height: 190rpx;
									}

									>view {
										@include row-gap(0);
										position: absolute;
										top: 16rpx;
										left: 16rpx;
										font-weight: 600;
										font-size: 24rpx;
										color: #FFFFFF;
										line-height: 24rpx;
									}
								}

								>image {
									width: 36rpx;
									height: 36rpx;
								}
							}
						}

						.edit-attribute {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
								@include row-gap(20rpx);
								justify-content: space-between;

								>view:last-child {
									@include row-gap(0);
									cursor: pointer;
								}
							}

							.prefix {
								@include column-gap(16rpx);

								>view:first-child {
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
								}

								.prefix-list {
									@include column-gap(20rpx);

									>view {
										@include column-gap(20rpx);
										padding: 28rpx 20rpx;
										box-sizing: border-box;
										background: #F8F8F8;
										border-radius: 12rpx;

										>view:first-child {
											font-weight: 600;
											font-size: 28rpx;
											color: #2C2E3A;

											>span {
												font-weight: 400;
												color: #ABABAB;
											}
										}

										>view:last-child {
											font-weight: 400;
											font-size: 28rpx;
											color: #BF7D2B;
											line-height: 38rpx;
										}
									}
								}
							}

							.tags {
								@include column-gap(20rpx);
								padding: 28rpx 20rpx;
								box-sizing: border-box;
								background: #F8F8F8;
								border-radius: 12rpx;

								>view:first-child {
									@include row-gap(20rpx);
									justify-content: space-between;
									@include font-title;

									>view:last-child {
										@include row-gap(8rpx);
										font-weight: 500;
										font-size: 28rpx;
										color: #2C2E3A;
										cursor: pointer;

										>image {
											width: 28rpx;
											height: 24rpx;
										}
									}
								}

								.tags-content {
									font-weight: 400;
									font-size: 28rpx;
									color: #BF7D2B;
									line-height: 38rpx;
								}
							}
						}

						.institution {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
							}

							.institution-content {
								@include row-gap(32rpx);

								>view {
									@include font-content;
								}

								.active {
									@include active-font-content;
								}
							}

							.institution-select {
								padding: 24rpx 16rpx;
								box-sizing: border-box;
								background: #F8F8F8;
								border-radius: 16rpx;
								@include row-gap(20rpx);

								>view {
									@include font-content;
									background-color: #FFFFFF
								}

								.active {
									@include active-font-content;
								}
							}
						}

						.updata {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
							}

							.imglist {
								@include row-gap(32rpx);

								>view {
									width: 136rpx;
									height: 136rpx;
									border-radius: 12rpx;
									background-color: #F8F8F8;
									position: relative;

									>image {
										width: 100%;
										height: 100%;
									}

									.clear {
										position: absolute;
										top: -20rpx;
										right: -20rpx;
										cursor: pointer;

									}
								}

								>view:first-child {
									cursor: pointer;
								}
							}

							.shopinfo {
								@include not-ipnut();
								height: 220rpx;

								>textarea {
									width: 100%;
									height: 100%;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
								}

								.placeholder {
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
								}
							}
						}

						.mode {
							@include column-gap(28rpx);

							.guarantee {
								@include row-gap(0);
								justify-content: space-between;
								background-color: #F8F8F8;
								border-radius: 12rpx;

								>view {
									width: 50%;
									display: flex;
									justify-content: center;
									padding: 28rpx;
									box-sizing: border-box;
									font-weight: 400;
									font-size: 28rpx;
									color: #ABABAB;
									line-height: 28rpx;
									cursor: pointer;

									>image {
										width: 100rpx;
										height: 30rpx;
									}
								}

								.active-l {
									position: relative;
									z-index: 1;
									font-weight: 600;
									font-size: 30rpx;
									line-height: 30rpx;
									color: #B6802B;

									&::after {
										content: '';
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 100%;
										z-index: -1;
										background-image: url('#{$url}/static/mine/guarantee_active.png');
										background-position: left;
										background-repeat: no-repeat;
										background-size: 100% 100%;

									}
								}

								.active-r {
									position: relative;
									z-index: 1;
									font-weight: 600;
									font-size: 30rpx;
									line-height: 30rpx;
									color: #B6802B;

									&::after {
										content: '';
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 100%;
										z-index: -1;
										background-image: url('#{$url}/static/mine/guarantee_active.png');
										background-position: left;
										background-repeat: no-repeat;
										background-size: 100% 100%;
										transform: scaleX(-1);

									}
								}
							}

							.mode-content {
								@include column-gap(24rpx);
								@include windth();

								.price-uitly {
									display: grid;
									grid-template-columns: repeat(2, 1fr);
									gap: 36rpx;

									.childer {

										@include column-gap(16rpx);

										.childer-left {

											font-weight: 400;
											font-size: 28rpx;
											color: #2C2E3A;
										}

										.childer-right {
											@include not-ipnut();
											@include row-gap(20rpx);
											min-width: 0;
											flex: 1;
											justify-content: space-between;
											position: relative;

											.click {
												position: absolute;
												inset: 0;
												cursor: pointer;
												border-radius: inherit;
											}
										}

										.method {
											@include font-content();
											@include active-font-content();
										}
									}
								}



								.total {
									@include windth();
									padding: 20rpx 40rpx;
									box-sizing: border-box;
									background: #F8F8F8;
									border-radius: 16rpx;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
									display: flex;
									justify-content: flex-end;
									align-items: center;

									>span {
										font-weight: 600;
										font-size: 32rpx;
										color: #FF5500;
									}
								}

								.switch {
									@include column-gap(10rpx);
									@include windth();

									.switch-title {
										@include row-gap(0);
										justify-content: space-between;
										font-weight: 400;
										font-size: 28rpx;
										color: #2C2E3A;

										>view:first-child {
											display: flex;
											align-items: center;

											>span {
												color: #5C97E0;
												cursor: pointer;
											}
										}

										>image {
											width: 100rpx;
											height: 60rpx;
											cursor: pointer;
										}
									}

									.switch-tap {
										background: #F8F8F8;
										padding: 20rpx 20rpx;
										box-sizing: border-box;
										border-radius: 16rpx;
										font-weight: 400;
										font-size: 26rpx;
										line-height: 26rpx;
										color: #ABABAB;
										@include column-gap(20rpx);

										.bail {
											font-size: 28rpx;
											color: #2C2E3A;

											>span:first-child {
												color: #FF5500;
											}

											>span:last-child {
												font-size: 26rpx;
												color: #ABABAB;
											}
										}

										.agree {
											@include row-gap(8rpx);

											>image {
												width: 26rpx;
												height: 26rpx;
												cursor: pointer;
											}
										}
									}
								}
							}
						}

						.shipment {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
							}

							.childer {
								@include row-gap(20rpx);
								@include windth();

								.childer-left {
									width: 24%;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
								}

								.childer-right {
									@include not-ipnut();
									@include row-gap(20rpx);
									min-width: 0;
									flex: 1;
									justify-content: space-between;
									position: relative;

									.click {
										position: absolute;
										inset: 0;
										cursor: pointer;
										border-radius: inherit;
									}
								}

								.childer-list {
									@include row-gap(32rpx);

									>view {
										@include font-content();
									}

									.active {
										@include active-font-content();
									}
								}

								.description {
									@include row-gap(8rpx);
									cursor: pointer;
									color: #5C97E0;
								}
							}

							.explain {
								@include windth();

								.spot {
									display: flex;
									width: 100%;
									padding: 20rpx 30rpx;
									box-sizing: border-box;
									background-color: #FFF0DC;
									border-radius: 12rpx;

									>view {
										color: #BF7D2B;
										font-size: 28rpx;
										font-weight: 600;

										>span {
											font-size: 26rpx;
											font-weight: 400;
										}
									}
								}

								.futures {
									width: 100%;
									@include column-gap(20rpx);
									background-color: #F8F8F8;
									padding: 20rpx;
									box-sizing: border-box;
									border-radius: 12rpx;

									.title {
										font-weight: 400;
										font-size: 28rpx;
										color: #2C2E3A;
									}

									.date {
										@include row-gap(32rpx);

										>view {
											@include column-gap(10rpx);
											padding: 20rpx 10rpx;
											box-sizing: border-box;
											border-radius: 12rpx;
											align-items: center;
											font-size: 26rpx;
											font-weight: 400;
											color: #969696;
											cursor: pointer;

											>image {
												width: 54rpx;
												height: 56rpx;
											}
										}

										.active {
											background-color: #FF5500;
											color: #FFFFFF;
											font-weight: 600;
										}
									}

									.fu-content {
										display: flex;
										align-items: center;
										background: #FFF0DC;
										border-radius: 12rpx;
										padding: 20rpx;
										box-sizing: border-box;
										font-size: 26rpx;
										font-weight: 400;
										color: #BF7D2B;

										>span {
											font-weight: 600;
											text-decoration: underline;
											text-decoration-color: #BF7D2B;
										}
									}
								}
							}
						}

						.other {
							@include column-gap(16rpx);

							>view:first-child {
								@include font-title;
							}

							.childer {
								@include row-gap(20rpx);
								@include windth();

								.childer-left {
									width: 24%;
									font-weight: 400;
									font-size: 28rpx;
									color: #2C2E3A;
								}

								.childer-right {
									@include not-ipnut();
									@include row-gap(20rpx);
									min-width: 0;
									flex: 1;
									justify-content: space-between;

									>view:last-child {
										color: #FF5500
									}
								}

								.childer-list {
									@include row-gap(32rpx);

									>view {
										@include font-content();
									}

									.active {
										@include active-font-content();
									}
								}

								.description {
									@include row-gap(8rpx);
									cursor: pointer;
									color: #5C97E0;
								}
							}
						}
					}
				}
			}

		}
	}
</style>