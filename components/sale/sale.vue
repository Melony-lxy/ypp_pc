<template>
	<view class="purchase-box">
		<view class="purchase-title" @click="back">
			<image src="/static/purchase/back.png" mode="aspectFill"></image>
			<view>出售</view>
		</view>
		<view class="purchase-choice">
			<view class="choice-btn" v-for="(item,index) in link" :key="index" @click="onChoiceClick(item, index)">
				<view :style="{color: linkId === index ? '#2C2E3A' : '#656565 '}">
					{{item}}
				</view>
				<view class="line" :class="{'active-line' : linkId === index}"></view>
			</view>
		</view>
		<view class="row-line"></view>

		<view style="overflow-y: auto;scrollbar-width: none;height: 100%;width: 100%;">
			<view class="type">
				<view class="title">分类</view>
				<view class="type-content">
					<view style="cursor: pointer;" v-for="(item, index) in types" :key="index" @click="onTypeClick(item, index)">
						<view class="type-choice"
							:style="{background: typeId === index ? '#FFF0DC' : '#F8F8F8',color: typeId === index ? '#BF7D00' : '#2C2E3A', fontWeight: typeId === index ? '600' : '400'}">
							{{ item }}
						</view>
					</view>
				</view>
				<view class="type-detail-box" v-if="typeId === 0">
					<view class="type-detail-content">
						<view class="type-detail">
							<view class="type-title" v-for="(item, index) in bankNoteName" :key="index"
								@click="onTypeDetailClick(item, index)"
								:style="{background: bankNoteNameId === index ? '#FFF0DC' : '#fff',color: bankNoteNameId === index ? '#BF7D00' : '#2C2E3A', fontWeight: bankNoteNameId === index ? '600' : '400'}">
								{{ item }}
							</view>
						</view>
						<view class="type-name" v-if="bankNoteNameId === 0">
							<view style="cursor: pointer;" v-for="(item, index) in bankNoteData" :key="index"
								@click="onTypeNameClick(item, index)"
								:style="{background: bankNoteDataId === index ? '#FFF0DC' : '#fff',color: bankNoteDataId === index ? '#BF7D00' : '#2C2E3A', fontWeight: bankNoteDataId === index ? '600' : '400'}">
								<view class="type-item-name">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="type-detail-box" v-if="typeId > 0">
					<view class="type-detail-content" v-if="!goodsInfor">
						<view class="type-title2">{{types[typeId]}}选择</view>
						<view class="type-adding-box" @click="changeShowAddBox">
							<view class="type-adding">添加商品></view>
						</view>
					</view>
					<view class="type-detail-content" v-else>
						<view class="detail-content">
							<view class="type-title2">{{types[typeId]}}选择</view>
							<view class="change-goods">
								<view class="change-goods-text" @click="changeShowAddBox">更换商品</view>
								<image src="/static/brown_kuozhan.png" mode=""></image>
							</view>
						</view>
						<view class="goods-detail" v-for="(item, index) in goodsInfor" :key="index">
							<image :src="item.imageUrl" style="height: 168rpx;min-width: 100rpx;" mode="heightFix"></image>
							<view class="goods-name">
								<view style="font-size: 32rpx;">{{ item.specificationsName }}</view>
								<view style="display: flex;align-items: center;gap: 8rpx;cursor: pointer;" v-if="!item.number"
									@click="changeShowType(item, index)">
									<view style="color: #BF7D00;">请选择装帧证书</view>
									<image src="/static/brown_kuozhan.png" style="width: 16rpx;height: 24rpx;"></image>
								</view>
								<view v-if="item.number">
									<view class="type-menu">
										<view class="type-menu-monomial">
											<view>装帧类型</view>
											<view v-if="item.type">{{ item.type }}</view>
										</view>
										<view class="type-menu-monomial">
											<view>评级级别</view>
											<view v-if="item.packageItem">{{ item.packageItem }}</view>
										</view>
										<view class="type-menu-monomial third-menu-monomial">
											<view>证书编号</view>
											<view v-if="item.number" class="item-number">{{ item.number.join('、') }}</view>
										</view>
										<image src="/static/path.png" style="width: 16rpx;height: 24rpx;margin-top: 7rpx;cursor: pointer;"
											@click="onShowType(index)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="label" v-if="isShowLabel">
					<view class="add-property" :class="{ 'added': isAdded }" v-if="isShowAddProperty">
						<view class="label-title">
							<view class="title">添加纪念钞属性</view>
							<view class="label-desc">详细的属性更容易被搜索到哟～</view>
						</view>
						<view class="label-content">
							<view class="add-number">
								<view class="add">添加号码</view>
								<view class="identify">
									<view class="identify-item" @click="imgIdentification">
										<view>图片识别</view>
										<image src="/static/sale/right.png" miode=""></image>
									</view>
									<view class="identify-item" @click="showNumbox">
										<view>输入识别</view>
										<image src="/static/sale/right.png" mode=""></image>
									</view>
								</view>
							</view>
							<image class="or" src="/static/sale/or.png" mode=""></image>
							<view class="add-label" @click="changeShowselBox">
								<view class="add">添加标签</view>
								<image src="/static/sale/right.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="label-property" v-if="isShowProperty">
						<view>
							<view class="title">添加纪念钞属性</view>
							<view class="change-property" @click="changeShowAddProperty">
								<view>更改属性</view>
								<image src="/static/sale/changeArg.png" mode=""></image>
							</view>
						</view>
						<view class="pack">打包出售包含冠号</view>
						<view class="property-row" v-if="show === 1">
							<view class="label-adding">
								<view class="title">添加标签</view>
								<view class="label-selection">
									<image src="/static/purchase/label-selection.png"></image>
									<text class="label-selection-btn" style="font-weight: 500;" @click="changeShowselBox">筛选标签</text>
								</view>
							</view>
							<view class="spec-name">{{ specName.join("、") }}</view>
						</view>
						<view v-if="show === 2">
							<view class="property-row" v-for="(item, index) in propertyList" :key="index">
								<view>
									<view class="title">{{ item.horizontalTagName }}</view>
									<view class="count">数量：{{ item.souvenirCoinNumber }}张</view>
								</view>
								<view>
									<view class="firstNumber" v-for="(numName, numIndex) in item.headTailBookNoteNumDetailsList">
										<view>{{ numName.firstNumber }}</view>
										<view v-if="numIndex < item.headTailBookNoteNumDetailsList.length - 1">、</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<PopupLableVue ref="popupLableRef" :list="list" :show="isShowSelbox" @close="close" @suer="suer">
					</PopupLableVue>
					<ParameterVue ref="parameterRef" :show="isShowParbox" @close="close" @cancel="cancel" @confirm="confirm"
						:label-name="specName"></ParameterVue>
					<PopupNumber ref="popupNumberRef" :bank-note-id="bankNoteId" :show="isShowNumbox" :type-name="typeName"
						@click="close" @submit="submit"></PopupNumber>
				</view>
				<view class="object-title">
					<view class="title">藏品标题</view>
					<input type="text" disabled="true" v-model="goodsTitle" placeholder="请输入商品名称" />
				</view>
				<view class="label-detail" v-if="show === 1">
					<view class="title">发布求购冠号详情</view>
					<view class="label-detail-box">
						<image class="label-img" :src="labelImg" mode=""></image>
						<view class="label-detail-text">
							<view class="label-name">{{ specName.join("、") }}</view>
							<view class="label-cnt">
								<view class="cnt">数量: {{ parameter.count }}{{ parameter.unit }}</view>
								<view class="min-cnt">最小确认数量: {{ parameter.minCnt }}{{ parameter.unit }}</view>
							</view>
							<view class="label-ctrl">
								<view class="label-price">
									<view>
										<text class="deal-price">交易单价:</text>
										<text class="deal-item-price">¥{{ integer }}.</text>
										<text class="deal-item-remnant">{{ fraction }}</text>
									</view>
									<view class="reference-price">参考单价:¥800.00</view>
								</view>
								<view class="label-btn">
									<view class="delete" @click="deleteDetail">删除</view>
									<view class="edit" @click="editDetail">编辑</view>
								</view>
							</view>
						</view>
					</view>
					<image class="cut-line" src="/static/purchase/thin-line.png" mode=""></image>
					<view class="label-summarize">
						<view class="summarize-text">求购总价</view>
						<view class="summarize-price">
							<view class="reference-total">
								<text>参考总价:</text>
								<text>¥2380.</text>
								<text>00</text>
							</view>
							<view class="summarize-item-price">
								<text>¥{{ totalInteger }}</text>
								<text>.</text>
								<text>{{ totalFraction }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="appraisal" v-if="typeId === 0">
					<view class="title">鉴定机构</view>
					<view class="appraisal-selection">
						<view style="cursor: pointer;" v-for="(item, index) in rateData" :key="index"
							@click="onRateClick(item, index)">
							<view class="rate-item-name"
								:style="{background: rateId === index ? '#FFF0DC' : '#F8F8F8',color: rateId === index ? '#BF7D00' : '#2C2E3A', fontWeight: rateId === index ? '600' : '400'}">
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="rate-name" v-for="(item, index) in rateData"
						:style="{ padding: rateId === index ? '28rpx' : '', marginTop: rateId === index ? '18rpx' : '' }">
						<view class="rate-item-name2" v-for="(n, num) in item.list" @click="onRateClick2(n, num)"
							v-if="rateId === index"
							:style="{background: rateId2 === num ? '#FFF0DC' : '#fff',color: rateId2 === num ? '#BF7D00' : '#2C2E3A', fontWeight: rateId2 === num ? '600' : '400'}">
							{{ n.name }}</view>
					</view>
				</view>
			</view>
			<view class="detail">
				<view class="title">添加图片详情</view>
				<view class="addImg">
					<view class="detailImg" v-for="(item, index) in detailImgs">
						<image :src="detailImgs[index]" mode="aspectFit"></image>
						<view class="deleteImg" @click="deleteImg(index)">
							x
						</view>
					</view>
					<image src="/static/purchase/addImg.png" v-if="detailImgs.length < 5" @click="addImg" mode=""></image>
				</view>
				<textarea maxlength="5000" placeholder="填写详细信息，更利于后期成交哦(100字以内)" @input="changeDetail" v-model="textContent"
					@focus="isFocused = true" @blur="isFocused = false" :class="{ 'focused': isFocused }"></textarea>
			</view>
			<view class="mechanism">
				<view class="title">标签/库存/等</view>
				<view v-if="show === 2">
					<view class="unit">
						<view>单位</view>
						<view class="unit-selection" @click="showUnit">
							<view class="unit-text" :class="{ 'active-unit': isUnitSelected }">{{ unit }}</view>
							<image src="/static/purchase/Vector.png" mode=""></image>
						</view>
						<view class="unit-box" v-if="isShowUnit">
							<view>请选择</view>
							<view class="unit-item">
								<view class="unit-item-name" v-for="(item, index) in (typeId == 0 ? unitName : unitNames)" :key="index"
									@click="onUnitClick(item, index)"
									:style="{background: unitId === index ? '#FFF0DC' : '#F8F8F8',color: unitId === index ? '#BF7D00' : '#2C2E3A', fontWeight: unitId === index ? '600' : '400'}">
									{{item}}</view>
							</view>
						</view>
					</view>
					<view class="mechanism-item">
						<view>数量</view>
						<view class="item-selection">
							<input class="item-text" type="number" placeholder="请输入大于0的整数" @input="changeCnt"
								:value="parameter2.count" />
							<view class="item-unit">{{ parameter2.unit }}</view>
						</view>
					</view>
					<view class="mechanism-item min-cnt">
						<view>最小确认数量</view>
						<view class="item-selection">
							<input class="item-text" type="number" placeholder="请输入" @input="changeMinCnt"
								:value="parameter2.minCnt" />
							<view class="item-unit">{{ parameter2.unit }}</view>
						</view>
					</view>
					<view class="mechanism-item">
						<view>单价</view>
						<view class="item-selection">
							<input class="item-text" type="number" placeholder="请输入" @input="changePrice" :value="parameter2.price" />
							<view class="item-unit">{{ parameter2.unit }}</view>
						</view>
					</view>
					<view class="total-price">
						<text>总价：</text>
						<text>¥{{ totalPrice2 }}</text>
					</view>
				</view>
				<view class="mode">
					<view>价格模式</view>
					<view class="mode-content" :class="{ 'active-mode': isActive === 1 }" @click="isActive === 1">一口价</view>
				</view>
				<view class="way">
					<view>交易方式</view>
					<view class="way-content-box">
						<view style="cursor: pointer;" v-for="(item, index) in ways" :key="index" @click="onWayClick(item, index)">
							<view class="way-content" :style="{background: wayId === index ? '#FFF0DC' : '#F8F8F8'}">
								<view class="item-way"
									:style="{color: wayId === index ? '#BF7D00' : '#2C2E3A', fontWeight: wayId === index ? '600' : '400'}">
									{{ item.way }}</view>
								<view class="item-warn" v-if="item.warn">{{ item.warn }}</view>
								<image class="item-img" :src="item.img" mode="" v-if="item.img"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="money">
					<view class="money-choice">
						<view>交易保证金</view>
						<view class="money-content-box">
							<view style="cursor: pointer;" v-for="(item, index) in moneys" :key="index"
								@click="onMoneyClick(item, index)">
								<view class="money-content"
									:style="{background: moneyId === index ? '#FFF0DC' : '#F8F8F8',color: moneyId === index ? '#BF7D00' : '#2C2E3A', fontWeight: moneyId === index ? '600' : '400'}">
									{{item}}
								</view>
							</view>
						</view>
						<image class="money-img" src="/static/purchase/moneyExplain.png" @click="showMoneyExplain"></image>
					</view>
					<view class="slider-box" v-if="moneyId === 0">
						<view class="slider-percent">
							<view class="percent">5%</view>
							<view class="percent">10%</view>
							<view class="percent">15%</view>
							<view class="percent">20%</view>
						</view>
						<slider :min="5" :max="20" :step="5" :value="sliderValue" @change="onSliderChange"></slider>
						<view class="total-money">
							<text>保证金总金额</text>
							<text class="money-num">{{ money }}</text>
							<text>元</text>
							<text class="money-explain">(总价金额*保证金档数)</text>
						</view>
						<view class="checkbox">
							<image @click="check1" :src="checkImg1"></image>
							<view class="checkbox-text">同意保证金规则</view>
						</view>
					</view>
				</view>
			</view>
			<view class="condition">
				<view class="title">发货详情</view>
				<view class="status">
					<view class="status-selection">
						<view>当前货物状态</view>
						<view class="status-choice">
							<view style="cursor: pointer;" v-for="(item, index) in statuses" :key="index"
								@click="onStatusClick(item, index)">
								<view class="status-content"
									:style="{background: statusId === index ? '#FFF0DC' : '#F8F8F8',color: statusId === index ? '#BF7D00' : '#2C2E3A', fontWeight: statusId === index ? '600' : '400'}">
									{{item}}
								</view>
							</view>
						</view>
						<image src="/static/purchase/sentExplain.png" @click="showConditionExplain"></image>
					</view>
					<view class="send-selection" v-if="statusId === 1">
						<view class="send-btn" v-for="(item,index) in send" :key="index" @click="onSendClick(item, index)">
							<view :style="{color: sendId === index ? '#2C2E3A' : '#656565 '}">
								{{item}}
							</view>
							<view class="line" :class="{'active-line' : sendId === index}"></view>
						</view>
					</view>
					<view class="last-send-time" v-if="sendId === 0 && statusId === 1">
						<view class="time-title">
							<view>最晚发货时间</view>
							<view>(最长90天)</view>
						</view>
						<view class="time-selection">
							<input class="time-text" type="number" placeholder="输入订单交易后最晚发货天数" @input="changeSendTime"
								v-model="lastSendTime" />
						</view>
					</view>
					<view class="last-send-date" v-if="sendId === 1 && statusId === 1">
						<view class="time-title">
							<view>最晚发货日期</view>
							<view>(最长90天)</view>
						</view>
						<view class="time-selection" @click="onTimeClick">
							<view v-if="lastSentDate != ''">{{ lastSentDate.join('-') }}</view>
							<view v-else style="color: #ABABAB;">请选择最晚发货日期</view>
						</view>
						<timeSelectionVue v-if="isShowTimeSelection" @ascertain="ascertain"></timeSelectionVue>
					</view>
				</view>
				<view class="region">
					<view>发货地区</view>
					<view class="region-selection" @click="changeShowRegion">
						<view class="">{{ regionName.join(' ') }}</view>
						<image src="/static/purchase/Vector.png" mode=""></image>
					</view>
					<OldRegionSelection v-if="isShowRegion" @region="getRegionName" @selShow="changeSelShow"></OldRegionSelection>
				</view>
				<view class="approach">
					<view>发货方式</view>
					<view class="approach-selection">包邮</view>
				</view>
			</view>
			<view class="other">
				<view class="title">其他</view>
				<view class="duration">
					<view>有效期</view>
					<view class="duration-selection">
						<view style="cursor: pointer;" v-for="(item, index) in durations" :key="index"
							@click="onDurationClick(item, index)">
							<view class="duration-content"
								:style="{background: durationId === index ? '#FFF0DC' : '#F8F8F8',color: durationId === index ? '#BF7D00' : '#2C2E3A', fontWeight: durationId === index ? '600' : '400'}">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<view class="time">
					<view>时间</view>
					<view class="time-selection">
						<input class="time-text" type="number" placeholder="请输入时间" @input="changeTime" v-model="time" />
						<view class="time-warn">{{ timeWarn }}</view>
					</view>
				</view>
				<view class="agreement">
					<image @click="check2" :src="checkImg2" mode=""></image>
					<view class="agreement-content">
						<text class="agreement-text">同意</text>
						<text class="agreement-name" @click="showProtocol">《艺品品双方买卖协议》</text>
					</view>
				</view>
			</view>
			<view class="publish-btn" @click="showSeccess">发布</view>
		</view>
		<PopupAdding v-if="isShowAddBox" :years="yearData" :type-id="typeId" @close="close" @sure="sure"></PopupAdding>
		<PopupType ref="popupTypeRef" :show="isShowType" @close="close" @suer="affirm" :goods-name="goodsName"
			:type-list="typeList"></PopupType>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		watch
	} from 'vue';
	import seccessVue from '../seccess/seccess.vue';
	import PopupLableVue from '../PopupLable/PopupLable.vue';
	import ParameterVue from '../Parameter/Parameter.vue';
	import OldRegionSelection from '../OldRegionSelection/OldRegionSelection.vue';
	import timeSelectionVue from '../timeSelection/timeSelection.vue';
	import PopupNumber from '../PopupNumber/PopupNumber.vue';
	import PopupAdding from '../PopupAdding/PopupAdding.vue';
	import PopupType from '../PopupType/PopupType.vue';
	import {
		noteNumberDetail,
		goldCoinPackageType,
		saleSave
	} from '../../api/common';
	import {
		uploadImage
	} from '../../api/upload.js';
	const popupTypeRef = ref(null)
	const value = ref(5)
	const link = ref(['仓库外发布'])
	const linkId = ref(0)
	const isFocused = ref(false)
	const isShowLabel = ref(false)
	const isShowAddProperty = ref(false)
	const isShowSelbox = ref(false)
	const isShowParbox = ref(false)
	const isShowNumbox = ref(false)
	const isShowRegion = ref(false)
	const isShowProperty = ref(false)
	const isShowAddBox = ref(false)
	const isAdded = ref(false)
	const isShowType = ref(false)
	const labelImg = ref('/static/purchase/she-b.jpg')
	const types = ref(['纸币', '贵金属纪念币', '普通金属纪念币'])
	const bankNoteName = ref(['纪念钞'])
	const bankNoteNameId = ref(-1)
	const typeId = ref(0)
	const typeName = ref('')
	const isActive = ref(1)
	const wayId = ref(0)
	const ways = ref([{
			'way': '担保交易'
		},
		{
			'way': '非担保交易',
			'warn': '!慎选',
			'img': '/static/explain.png'
		}
	])
	const moneys = ref(['需要保证金', '不需要保证金'])
	const moneyId = ref(0)
	const statuses = ref(['现货', '预售'])
	const statusId = ref(0)
	const send = ref(['最晚发货时间', '最晚发货日期'])
	const sendId = ref(0)
	const lastDateText = ref(['请选择最晚发货日期'])
	const startDate = ref('')
	const endDate = ref('')
	const durations = ref(['天', '小时'])
	const durationId = ref(0)
	const unit = ref('请选择单位')
	const unitName = ref(['张', '组', '刀', '捆'])
	const unitNames = ref(['枚', '板', '套', '对'])
	const unitId = ref(-1)
	const isShowUnit = ref(false)
	const emit = defineEmits(['goBack', 'showMoneyExplain', 'showConditionExplain', 'showProtocol', 'showSeccess'])
	const textContent = ref(null)
	const time = ref(null)
	const show = ref(2)
	const isShowTimeSelection = ref(false)
	const lastSendTime = ref('')
	const lastSentDate = ref('')
	const back = () => {
		uni.navigateBack()
		// emit('goBack', saleReset)
	}
	const showMoneyExplain = () => {
		emit('showMoneyExplain')
	}
	const showConditionExplain = () => {
		emit('showConditionExplain')
	}
	const showProtocol = () => {
		emit('showProtocol')
	}
	const formData = ref({
		agreeDeal: false, //同意买卖协议
		agreeMarginRules: true, //同意保证金
		appraisalInstitutionId: '', //鉴定机构id
		appraisalInstitutionName: '', //鉴定机构名称
		consecutiveNumType: '',
		currentCargoStatus: 0, //当前货物状态 0 现货
		delivery: 0, //发货方式 0: 包邮 
		descriptionDetails: '', //描述
		identifyQuantity: '', //数量
		lastSentDate: '',
		lastSentDays: '',
		minimumConfirmationQuantity: '',
		needTradeMargin: true, //交易保证金
		pictureDetails: '',
		priceModel: 0, //价格模式 0一口价 1:议git价
		productCategoryId: '', //类别id
		productCategoryType: '', //类别
		productCondition: '',
		productName: '', //类名
		publishPackageItemDTOList: [],
		shippingCity: '', //发货城市
		shippingProvince: '', //发货省份
		tradingMarginRatio: 0.05, //保证金比例
		transactionMode: 1, //交易方式 0:不担保 1 担保
		transactionUnitPrice: '', // 价格
		unit: '', //单位
		userAddressId: '',
		validityPeriod: '', //有效期
		validityPeriodUnit: 1, //有效期单位
	})
	const paperBankNote = ref(false)
	const goldBankNote = ref(false)

	const saleReset = () => {
		formData.value = {
			agreeDeal: false, //同意买卖协议
			agreeMarginRules: true, //同意保证金
			appraisalInstitutionId: '', //鉴定机构id
			appraisalInstitutionName: '', //鉴定机构名称
			consecutiveNumType: '',
			currentCargoStatus: 0, //当前货物状态 0 现货
			delivery: 0, //发货方式 0: 包邮 
			descriptionDetails: '', //描述
			identifyQuantity: '', //数量
			lastSentDate: '',
			lastSentDays: '',
			minimumConfirmationQuantity: '',
			needTradeMargin: true, //交易保证金
			pictureDetails: '',
			priceModel: 0, //价格模式 0一口价 1:议git价
			productCategoryId: '', //类别id
			productCategoryType: '', //类别
			productCondition: '',
			productName: '', //类名
			publishPackageItemDTOList: [],
			shippingCity: '', //发货城市
			shippingProvince: '', //发货省份
			tradingMarginRatio: 0.05, //保证金比例
			transactionMode: 1, //交易方式 0:不担保 1 担保
			transactionUnitPrice: '', // 价格
			unit: '', //单位
			userAddressId: '',
			validityPeriod: '', //有效期
			validityPeriodUnit: 1, //有效期单位
		}
		linkId.value = 0
		typeId.value = -1
		bankNoteNameId.value = -1
		bankNoteDataId.value = -1
		typeName.value = ''
		parameter2.value = ({
			unit: '',
			count: '',
			minCnt: '',
			price: ''
		})
		isShowTimeSelection.value = false
		isShowType.value = false
		rateId.value = -1
		rateId2.value = -1
		detailImgs.value = []
		textContent.value = null
		unitId.value = -1
		unit.value = '请选择单位'
		sliderValue.value = 5
		moneyId.value = 0
		wayId.value = 0
		statusId.value = 0
		lastSendTime.value = ''
		lastSentDate.value = ''
		regionName.value = ['请选择地区']
		durationId.value = 0
		time.value = null
		timeWarn.value = '最长90天'
		judgeImg.value = true
		judgeImg2.value = false
		isShowAddBox.value = false
		goodsInfor.value = ''
		goodsType.value = ''
		checkImg1.value = '/static/purchase/checked-w.png'
		checkImg2.value = '/static/purchase/nochoose.png'
		identifyImg.value = []
		propertyList.value = []
		specName.value = []
		isShowLabel.value = false
		isShowAddProperty.value = false
		isShowUnit.value = false
		deleteDetail()
		judgeLabel.value = ''
		linkId.value = 0
		show.value = 2
		isUnitSelected.value = false
		if (popupTypeRef.value) {
			popupTypeRef.value.reset()
		}
		paperBankNote.value = false
		goldBankNote.value = false
		isShowParbox.value = false
		isShowSelbox.value = false
		isShowRegion.value = false
	}

	defineExpose({
		saleReset
	})

	const showSeccess = () => {
		// if(specName.value.length > 0 && formData.value.labelInfos!='[]' && formData.value.consecutiveNumType === 1) {
		// 	console.log('满足条件');
		// }
		if (formData.value.agreeDeal == true && formData.value.agreeMarginRules == true &&
			formData.value.appraisalInstitutionId != '' && formData.value.appraisalInstitutionName != '' &&
			formData.value.identifyQuantity != '' && formData.value.minimumConfirmationQuantity != '' &&
			formData.value.productCategoryId != '' && formData.value.productCategoryType != '' &&
			formData.value.productName != '' && formData.value.publishPackageItemDTOList &&
			formData.value.shippingCity != '' && formData.value.shippingProvince != '' &&
			formData.value.transactionUnitPrice != '' && formData.value.unit != '' &&
			formData.value.validityPeriod != '' && formData.value.consecutiveNumType != null &&
			formData.value.labelInfos && Number(formData.value.minimumConfirmationQuantity) <= Number(formData.value
				.identifyQuantity)) {
			console.log('条件全部满足');
			if (show.value === 1) {
				specName.value.length > 0 && formData.value.labelInfos != '[]' && formData.value.consecutiveNumType === 1 ?
					paperBankNote.value = true : paperBankNote.value = false;
			}
			if (show.value === 2 && judgeLabel.value == true) {
				formData.value.numbers != '' && formData.value.labelInfos == '[]' ? paperBankNote.value = true : paperBankNote
					.value = false
			}
			if (statusId.value === 1) {
				formData.value.lastSentDays != '' || formData.value.lastSentDate != '' ? paperBankNote.value = true :
					paperBankNote.value = false
			} else {
				paperBankNote.value = true
			}
		} else if (formData.value.agreeDeal == true && formData.value.agreeMarginRules == true &&
			formData.value.identifyQuantity != '' && formData.value.minimumConfirmationQuantity != '' &&
			formData.value.productCategoryId != '' && formData.value.productCategoryType != '' &&
			formData.value.productName != '' && formData.value.publishGoldCoinItemDTOList &&
			formData.value.shippingCity != '' && formData.value.shippingProvince != '' &&
			formData.value.transactionUnitPrice != '' && formData.value.unit != '' && keyLength.value == true &&
			formData.value.validityPeriod != '' && Number(formData.value.minimumConfirmationQuantity) <= Number(formData
				.value.identifyQuantity)) {
			if (statusId.value === 1) {
				formData.value.lastSentDays != '' || formData.value.lastSentDate != '' ? goldBankNote.value = true :
					goldBankNote.value = false
			} else {
				paperBankNote.value = true
			}
		}
		if (typeId.value === -1 || bankNoteDataId.value === -1 && typeId.value < 1 || bankNoteNameId.value === -1 && typeId
			.value < 1) {
			uni.showToast({
				title: '请选择分类',
				icon: 'none'
			})
			return
		}
		if (isShowLabel.value == true && isShowProperty.value == false || isShowAddProperty.value === false && show
			.value === 2 && formData.value.numbers == '') {
			uni.showToast({
				title: '请添加属性',
				icon: 'none'
			})
			return
		}
		if (typeId.value > 0 && formData.value.productName == '') {
			uni.showToast({
				title: '请添加商品',
				icon: 'none'
			})
			return
		}
		if (typeId.value > 0 && keyLength.value == false) {
			uni.showToast({
				title: '请选择装帧证书',
				icon: 'none'
			})
			return
		}
		if (rateId.value === -1 && typeId.value === 0 || rateId2.value === -1 && typeId.value === 0) {
			uni.showToast({
				title: '请选择鉴定机构',
				icon: 'none'
			})
			return
		}
		if (formData.value.unit == '') {
			console.log(formData.value, keyLength.value);
			uni.showToast({
				title: '请选择单位',
				icon: 'none'
			})
			return
		}
		if (formData.value.identifyQuantity == '') {
			uni.showToast({
				title: '请填写数量',
				icon: 'none'
			})
			return
		}
		if (formData.value.minimumConfirmationQuantity == '') {
			uni.showToast({
				title: '请填写最小确认数量',
				icon: 'none'
			})
			return
		}
		if (Number(formData.value.minimumConfirmationQuantity) > Number(formData.value.identifyQuantity)) {
			uni.showToast({
				title: '最小确认数量不得超过数量',
				icon: 'none'
			})
			return
		}
		if (formData.value.transactionUnitPrice == '') {
			uni.showToast({
				title: '请填写单价',
				icon: 'none'
			})
			return
		}
		if (statusId.value === 1 && sendId.value === 0 && formData.value.lastSentDays == '') {
			uni.showToast({
				title: '请填写最晚发货时间',
				icon: 'none'
			})
			return
		}
		if (statusId.value === 1 && sendId.value === 1 && formData.value.lastSentDate == '') {
			uni.showToast({
				title: '请填写最晚发货日期',
				icon: 'none'
			})
			return
		}
		if (formData.value.lastSentDays > 90) {
			uni.showToast({
				title: '最晚发货时间不得超过90天',
				icon: 'none'
			})
			return
		}
		if (judgeDate.value < 0) {
			uni.showToast({
				title: '请选择正确形式的最晚发货日期',
				icon: 'none'
			})
			return
		}
		if (judgeDate.value > 90) {
			uni.showToast({
				title: '最晚发货日期不得超过90天',
				icon: 'none'
			})
			return
		}
		if (formData.value.shippingCity == '' || formData.value.shippingProvince == '' || !formData.value.shippingCity || !
			formData.value.shippingProvince || regionName.value.length != 3) {
			uni.showToast({
				title: '请填写发货地区',
				icon: 'none'
			})
			return
		}
		if (formData.value.validityPeriod == '') {
			uni.showToast({
				title: '请填写时间',
				icon: 'none'
			})
			return
		}
		if (formData.value.validityPeriod === '0') {
			uni.showToast({
				title: '时间不能为0',
				icon: 'none'
			})
			return
		}
		if (durationId.value === 0 && formData.value.validityPeriod > 90) {
			uni.showToast({
				title: '时间不能超过90天',
				icon: 'none'
			})
			return
		}
		if (durationId.value === 1 && formData.value.validityPeriod > 72) {
			uni.showToast({
				title: '时间不能超过72小时',
				icon: 'none'
			})
			return
		}
		if (formData.value.agreeDeal == false || formData.value.agreeMarginRules == false) {
			uni.showToast({
				title: '请同意相关规则',
				icon: 'none'
			})
			return
		}
		if (paperBankNote.value == true || goldBankNote.value == true) {
			saleSave(formData.value).then(res => {
				if (res.code == 200) {
					emit('showSeccess')
					saleReset()
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
				console.log('操作成功：', res);
			})
		} else {
			console.log(formData.value);
			console.log(paperBankNote.value, goldBankNote.value);
		}
	}
	const close = (e) => {
		isShowSelbox.value = e
		isShowParbox.value = e
		isShowNumbox.value = e
		isShowAddBox.value = e
		isShowType.value = e
	}
	const cancel = (e) => {
		isShowParbox.value = e
	}

	const labelName = ref([])
	const specName = ref([])
	const suer = (e) => {
		const labelInfos = ref([])
		const {
			typeName,
			specsName,
			headName,
			tailName,
			moreName,
			specsIndex,
			headIndex,
			tailIndex,
			moreIndex,
			specsCategory,
			headCategory,
			tailCategory,
			moreCategory
		} = e;
		const allHaveValue = [
			typeName,
			specsName,
			headName,
			tailName,
			moreName,
			specsIndex,
			headIndex,
			tailIndex,
			moreIndex,
			specsCategory,
			headCategory,
			tailCategory,
			moreCategory
		]
		if (allHaveValue[4] !== '') {
			isShowProperty.value = true
			labelName.value = [moreName]
			specName.value = [moreName]
			labelInfos.value = [{
				id: moreIndex,
				name: moreName,
				category: moreCategory
			}]
			formData.value.labelInfos = JSON.stringify(labelInfos.value)
			formData.value.consecutiveNumType = Number(1)
			isShowSelbox.value = false
			isShowParbox.value = true
			isAdded.value = true
			show.value = 1
			// delete outPublishContent.value.specName
			// delete outPublishContent.value.unit
			// delete outPublishContent.value.count
			// delete outPublishContent.value.minCnt
			// delete outPublishContent.value.price
			isShowAddProperty.value = false
		} else if (allHaveValue[1] !== '') {
			labelName.value = [
				typeName,
				specsName,
				...headName ? [headName] : [],
				...tailName ? [tailName] : [],
			]
			specName.value = [
				specsName,
				...headName ? [headName] : [],
				...tailName ? [tailName] : [],
			]
			labelInfos.value = [{
					id: specsIndex,
					name: specsName,
					category: specsCategory
				},
				...headName ? [{
					id: headIndex,
					name: headName,
					category: headCategory
				}] : [],
				...tailName ? [{
					id: tailIndex,
					name: tailName,
					category: tailCategory
				}] : []
			]
			formData.value.labelInfos = JSON.stringify(labelInfos.value)
			formData.value.consecutiveNumType = Number(1)
			isShowSelbox.value = false
			isShowParbox.value = true
			isAdded.value = true
			show.value = 1
			// delete outPublishContent.value.specName
			// delete outPublishContent.value.unit
			// delete outPublishContent.value.count
			// delete outPublishContent.value.minCnt
			// delete outPublishContent.value.price
			isShowAddProperty.value = false
			isShowProperty.value = true
		} else {
			uni.showToast({
				title: '请选择规格',
				icon: 'none'
			})
		}
	}
	const goodsInfor = ref(null)
	const goodsInforId = ref(-1)
	const goodsType = ref(null)
	const sure = (data) => {
		console.log(12345, data);
		goodsInfor.value = data.specItemList
		goodsType.value = data.name
		formData.value.publishGoldCoinItemDTOList = [{}]
		formData.value.publishGoldCoinItemDTOList[0].category = data.name
		formData.value.publishGoldCoinItemDTOList[0].categoryId = data.categoryId
		formData.value.publishGoldCoinItemDTOList[0].name = data.year + '年' + data.name
		formData.value.publishGoldCoinItemDTOList[0].specItemList = []
		formData.value.publishGoldCoinItemDTOList[0].year = data.year
		for (let i = 0; i < data.specItemList.length; i++) {
			formData.value.publishGoldCoinItemDTOList[0].specItemList.push({
				categoryId: data.categoryId,
				coinSet: data.specItemList[i].coinSet,
				imageUrl: data.specItemList[i].imageUrl,
				specificationsName: data.specItemList[i].specificationsName,
				selected: true
			})
		}
	}
	const goodsTitle = computed(() => {
		if (typeName.value != '') {
			return typeName.value
		} else if (goodsType.value != '') {
			return goodsType.value
		} else {
			return ''
		}
	})
	watch(goodsTitle, (newTitle) => {
		if (typeId.value === 0) {
			formData.value.productName = newTitle
		}
		if (formData.value.publishGoldCoinItemDTOList) {
			formData.value.productName = formData.value.publishGoldCoinItemDTOList[0].name
		}
	})
	const parameter = ref({
		unit: '',
		count: 0,
		minCnt: 0,
		price: 0
	})
	const confirm = (data) => {
		const {
			unit,
			count,
			minCnt,
			price
		} = data;
		const allHaveValue = [
			unit,
			count,
			minCnt,
			price
		]
		if (allHaveValue[1] &&
			allHaveValue[2] &&
			allHaveValue[3] &&
			allHaveValue[2] <= allHaveValue[1]
		) {
			console.log('parameter:', data);
			parameter.value = data
			console.log('6666666:', parameter.value);
			isShowParbox.value = false
			isShowProperty.value = true
			formData.value.unit = parameter.value.unit
			formData.value.transactionUnitPrice = parameter.value.price
			formData.value.identifyQuantity = String(parameter.value.count)
			formData.value.minimumConfirmationQuantity = String(parameter.value.minCnt)
		} else if (allHaveValue[1] &&
			allHaveValue[2] &&
			allHaveValue[3] &&
			allHaveValue[2] > allHaveValue[1]
		) {
			uni.showToast({
				title: '最小确认数量需小于数量',
				icon: 'none'
			})
		} else {
			uni.showToast({
				title: '请填写参数',
				icon: 'none'
			})
		}
	}
	const integer = computed(() => {
		return Math.floor(parameter.value.price)
	})
	const fraction = computed(() => {
		if (parameter.value.price - integer.value === 0) {
			return '00'
		} else {
			return Number(((parameter.value.price - integer.value) * 100).toFixed(2))
		}
	})
	const totalPrice = computed(() => {
		return Number((parameter.value.price * parameter.value.count).toFixed(2))
	})
	const totalInteger = computed(() => {
		return Math.floor(totalPrice.value)
	})
	const totalFraction = computed(() => {
		if (totalPrice.value - totalInteger.value === 0) {
			return '00'
		} else {
			return Number(((totalPrice.value - totalInteger.value) * 100).toFixed(2))
		}
	})

	const props = defineProps({
		bankNoteData: {
			type: Array,
			default: []
		},
		rateData: {
			type: Array,
			default: []
		},
		list: {
			type: Object,
			default: {}
		},
		yearData: {
			type: Array,
			default: []
		},
		productType: {
			type: String,
			default: ''
		}
	})

	const bankNoteDataId = ref(-1)
	const rateId = ref(-1)
	const rateId2 = ref(-1)

	const onChoiceClick = (item, index) => {
		linkId.value = index;
	}

	const judgeLabel = ref('')
	const onTypeClick = (item, index) => {
		typeId.value = index
		if (index == 1) {
			formData.value.productCategoryType = 'gold_coin'
			formData.value.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f96a'
		} else if (index == 2) {
			formData.value.productCategoryType = 'common_coin'
			formData.value.productCategoryId = 'dc2456b4c0c246eeadfa8161e394f97a'
		}
	}
	const onTypeDetailClick = (item, index) => {
		bankNoteNameId.value = index
	}
	const typenameIndex = ref(null)
	const bankNoteId = ref(null)
	const onTypeNameClick = (item, index) => {
		formData.value.productCategoryId = item.id
		isShowAddProperty.value = true
		typenameIndex.value = index
		bankNoteId.value = item.id
		formData.value.numbers = ''
		formData.value.labelInfos = '[]'
		formData.value.productCategoryType = props.productType
		bankNoteDataId.value = index
		isShowLabel.value = !!item.material
		judgeLabel.value = !!item.material
		typeName.value = item.name
		if (item.name === '2024龙年贺岁纪念钞') {
			labelImg.value = '/static/purchase/long-b.jpg'
		} else if (item.name === '2025蛇年贺岁纪念钞') {
			labelImg.value = '/static/purchase/she-b.jpg'
		}
	}
	watch(typenameIndex, () => {
		labelName.value = []
		parameter.value = ({
			unit: '',
			count: 0,
			minCnt: 0,
			price: 0
		})
		isShowSelbox.value = false
		isShowParbox.value = false
	})
	const changeShowAddBox = () => {
		isShowAddBox.value = !isShowAddBox.value
	}

	const goodsName = ref(null)
	const typeList = ref(null)
	const changeShowType = (item, index) => {
		goodsInforId.value = index
		watch(() => goodsInforId.value, () => {
			if (popupTypeRef.value) {
				popupTypeRef.value.reset()
			}
		})
		goodsName.value = item.specificationsName
		isShowType.value = true
		const getgoldCoinPackageType = (() => {
			goldCoinPackageType().then(res => {
				typeList.value = res.data
			})
		})()
	}

	const onShowType = (index) => {
		isShowType.value = true
		goodsInforId.value = index
	}
	const affirm = (data) => {
		// console.log(1111111,data.packageItem);
		// console.log(data.type, data.have, data.packageType,1, data.packageItem);
		goodsInfor.value[goodsInforId.value].type = data.type
		if (data.type == '非封装') {
			goodsInfor.value[goodsInforId.value].packageItem = ''
		} else {
			goodsInfor.value[goodsInforId.value].packageItem = data.packageItem != '' ? data.packageItem : data.packageType
		}
		goodsInfor.value[goodsInforId.value].number = data.numberList[0].value != '' ? data.numberList.map(item => item
			.value) : ['无证书编号']
		// console.log(goodsInfor.value);
		if (data.isSame == true) {
			goodsInfor.value.forEach(item => {
				item.number = data.numberList[0].value != '' ? data.numberList.map(item => item.value) : ['无证书编号']
			})
			formData.value.publishGoldCoinItemDTOList[0].specItemList.forEach(item => {
				item.certificateNo = data.numberList.map(item => item.value).join('、')
			})
		}
		if (data.isOption == true) {
			goodsInfor.value.forEach(item => {
				item.type = data.type
				if (data.type == '非封装') {
					item.packageItem = ''
				} else {
					item.packageItem = data.packageItem != '' ? data.packageItem : data.packageType
				}
				item.number = data.numberList[0].value != '' ? data.numberList.map(item => item.value) : ['无证书编号']
			})
			formData.value.publishGoldCoinItemDTOList[0].specItemList.forEach(item => {
				item.certificateNo = data.numberList.map(item => item.value).join('、')
				item.hasCertificate = !!data.have
				item.isMatchAll = data.isOption
				item.packageCompany = data.packageType
				item.packageCompanyId = data.companyId
				item.packageRating = data.packageItem
				item.packageRatingCode = data.ratingCode
				item.packageType = data.typeId
				item.sameCertificate = data.isSame
			})
		}
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].certificateNo = data.numberList.map(
			item => item.value).join('、')
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].hasCertificate = !!data.have
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].isMatchAll = data.isOption
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].packageCompany = data.packageType
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].packageCompanyId = data.companyCode
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].packageRating = data.packageItem
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].packageRatingCode = data.ratingCode
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].packageType = data.typeId
		formData.value.publishGoldCoinItemDTOList[0].specItemList[goodsInforId.value].sameCertificate = data.isSame
	}
	const keyLength = computed(() => {
		if (!formData.value.publishGoldCoinItemDTOList ||
			formData.value.publishGoldCoinItemDTOList.length === 0 ||
			!formData.value.publishGoldCoinItemDTOList[0].specItemList) {
			return false;
		}
		return formData.value.publishGoldCoinItemDTOList[0].specItemList.every(item => {
			return Object.keys(item).length === 14;
		});
	});
	const propertyList = ref([])
	const submit = (data) => {
		const numList = computed(() => {
			return data.join('、')
		})
		if (numList.value === '') {
			uni.showToast({
				title: '请输入号码',
				icon: 'none'
			})
		} else {
			isShowAddProperty.value = false
			isShowNumbox.value = false
			const getNoteNumberDetail = (() => {
				noteNumberDetail({
					bankNoteNumbers: numList.value,
					productCategoryId: bankNoteId.value
				}).then(res => {
					propertyList.value = res.data
					const numbers = ref([])
					propertyList.value.forEach(item => {
						item.headTailBookNoteNumDetailsList.forEach(num => {
							numbers.value.push(num.firstNumber)
						})
					})
					formData.value.numbers = numbers.value.join('、')
					isShowProperty.value = true
					isShowAddProperty.value = false
					isAdded.value = true
				})
			})()
			show.value = 2
			formData.value.consecutiveNumType = ''
			parameter.value = ({
				unit: '',
				count: 0,
				minCnt: 0,
				price: 0
			})
			// delete outPublishContent.value.specName
			// delete outPublishContent.value.unit
			// delete outPublishContent.value.count
			// delete outPublishContent.value.minCnt
			// delete outPublishContent.value.price
		}
	}
	const changeShowAddProperty = () => {
		isShowAddProperty.value = !isShowAddProperty.value
	}
	const popupLableRef = ref('')
	const parameterRef = ref('')
	const popupNumberRef = ref('')
	const showNumbox = () => {
		if (isAdded.value === true) {
			isShowAddProperty.value = false
		}
		isShowNumbox.value = !isShowNumbox.value
		isShowSelbox.value = false
		isShowParbox.value = false
		if (popupLableRef.value) {
			popupLableRef.value.reset()
		}
		if (parameterRef.value) {
			parameterRef.value.reset()
		}
	}
	const identifyImg = ref([])
	const imgIdentification = () => {
		if (isAdded.value === true) {
			isShowAddProperty.value = false
		}
		uni.chooseImage({
			count: 1,
			sourceType: ['album'],
			success: (res) => {
				identifyImg.value.push(res.tempFilePaths[0])
				uni.showToast({
					title: '识别成功',
					icon: 'none'
				})
			}
		})
		isShowNumbox.value = false
		isShowParbox.value = false
		isShowSelbox.value = false
	}
	const changeShowselBox = () => {
		if (isAdded.value === true) {
			isShowAddProperty.value = false
		}
		isShowParbox.value = false
		isShowSelbox.value = !isShowSelbox.value
		isShowNumbox.value = false
	}

	const deleteDetail = () => {
		isShowParbox.value = false
		labelName.value = []
		show.value = 2
		parameter.value = ({
			unit: '',
			count: 0,
			minCnt: 0,
			price: 0
		})
		if (popupLableRef.value) {
			popupLableRef.value.reset()
		}
		if (parameterRef.value) {
			parameterRef.value.reset()
		}
		formData.value.labelInfos = '[]'
		formData.value.unit = ''
		formData.value.identifyQuantity = ''
		formData.value.minimumConfirmationQuantity = ''
		formData.value.transactionUnitPrice = ''
	}
	const editDetail = () => {
		isShowSelbox.value = false
		isShowParbox.value = true
	}
	const onRateClick = (item, index) => {
		rateId.value = index
	}
	const onRateClick2 = (n, num) => {
		rateId2.value = num
		formData.value.appraisalInstitutionId = n.id
		formData.value.appraisalInstitutionName = n.name
	}
	const showUnit = () => {
		isShowUnit.value = !isShowUnit.value
	}
	const isUnitSelected = ref(false)
	const parameter2 = ref({
		unit: '',
		count: '',
		minCnt: '',
		price: ''
	})
	const onUnitClick = (item, index) => {
		isUnitSelected.value = true
		unitId.value = index
		unit.value = item
		isShowUnit.value = false
		parameter2.value.unit = item
		formData.value.unit = item
	}
	const changeCnt = (e) => {
		parameter2.value.count = Number(Math.floor(e.detail.value));
		if (parameter2.value.minCnt && parameter2.value.minCnt > parameter2.value.count) {
			uni.showToast({
				title: '最小确认数量需小于数量',
				icon: 'none'
			})
		}
		formData.value.identifyQuantity = String(parameter2.value.count)
	}
	const changeMinCnt = (e) => {
		parameter2.value.minCnt = Number(Math.floor(e.detail.value));
		if (parameter2.value.count && parameter2.value.minCnt > parameter2.value.count) {
			uni.showToast({
				title: '最小确认数量需小于数量',
				icon: 'none'
			})
		}
		formData.value.minimumConfirmationQuantity = String(parameter2.value.minCnt)
	}
	const changePrice = (e) => {
		parameter2.value.price = Number(Number(e.detail.value).toFixed(2));
		formData.value.transactionUnitPrice = parameter2.value.price
	}
	const totalPrice2 = computed(() => {
		return Number((parameter2.value.price * parameter2.value.count).toFixed(2))
	})
	const onWayClick = (item, index) => {
		wayId.value = index
		if (index === 0) {
			formData.value.transactionMode = 1
		} else {
			formData.value.transactionMode = 0
		}
	}

	const detailImgs = ref([])
	const addImg = () => {
		uploadImage({
			count: 9
		}).then(res => {
			// console.log(33333,res);
			detailImgs.value.push(res[0].url)
			formData.value.pictureDetails = detailImgs.value.join(',')
		})
	}
	const deleteImg = (index) => {
		detailImgs.value.splice(index, 1)
		console.log(detailImgs.value);
	}
	const changeDetail = (e) => {
		textContent.value = e.detail.value
		formData.value.descriptionDetails = textContent.value
	}
	const onMoneyClick = (item, index) => {
		moneyId.value = index
		if (index === 0) {
			formData.value.needTradeMargin = true
		} else {
			formData.value.needTradeMargin = false
			formData.value.tradingMarginRatio = 0
		}
	}
	const sliderValue = ref(5)
	const onSliderChange = (e) => {
		sliderValue.value = e.detail.value
		formData.value.tradingMarginRatio = sliderValue.value / 100
	}
	const money = computed(() => {
		if (moneyId.value == 0) {
			if (totalPrice.value > 0) {
				return (totalPrice.value * sliderValue.value / 100).toFixed(2)
			} else {
				return (totalPrice2.value * sliderValue.value / 100).toFixed(2)
			}
		}
	})
	const checkImg1 = ref('/static/purchase/checked-w.png')
	const judgeImg = ref(true)
	const check1 = () => {
		judgeImg.value = !judgeImg.value
		if (judgeImg.value == false) {
			checkImg1.value = '/static/purchase/nochoose.png'
		} else {
			checkImg1.value = '/static/purchase/checked-w.png'
		}
	}
	const onStatusClick = (item, index) => {
		statusId.value = index
		sendId.value = 0
	}
	const onSendClick = (item, index) => {
		sendId.value = index
		formData.value.currentCargoStatus = index
	}
	const regionName = ref(['选择地区'])
	const getRegionName = (data) => {
		regionName.value = data
		formData.value.shippingProvince = regionName.value[0]
		formData.value.shippingCity = regionName.value[1]
	}
	const onTimeClick = () => {
		isShowTimeSelection.value = !isShowTimeSelection.value
		isShowRegion.value = false
	}
	const ascertain = (data) => {
		lastSentDate.value = data
		formData.value.lastSentDate = data.join('-')
		isShowTimeSelection.value = false
	}
	const judgeDate = computed(() => {
		const now = Date.now()
		const selectedDate = new Date(formData.value.lastSentDate).getTime()
		const daysDiff = Math.floor((selectedDate - now) / (1000 * 60 * 60 * 24))
		return daysDiff
	})
	const changeShowRegion = () => {
		isShowRegion.value = !isShowRegion.value
		isShowTimeSelection.value = false
		if (regionName.value.length < 3) {
			regionName.value = ['选择地区']
		}
	}
	const changeSelShow = () => {
		isShowRegion.value = false
	}
	const changeSendTime = (e) => {
		lastSendTime.value = Number(e.detail.value.replace(/[^\d]/g, ''));
		formData.value.lastSentDays = lastSendTime.value
		formData.value.lastSentDate = ''
		if (lastSendTime.value > 90) {
			uni.showToast({
				title: '时间最长为90天',
				icon: 'none'
			})
		}
	}
	const changeTime = (e) => {
		time.value = Number(e.detail.value.replace(/[^\d]/g, ''));
		formData.value.validityPeriod = e.detail.value.replace(/[^\d]/g, '')
		if (durationId.value === 0 && time.value > 90) {
			uni.showToast({
				title: '时间最长为90天',
				icon: 'none'
			})
		} else if (durationId.value === 1 && time.value > 72) {
			uni.showToast({
				title: '时间最长为72小时',
				icon: 'none'
			})
		}
	}
	const timeWarn = ref('最长90天')
	const onDurationClick = (item, index) => {
		durationId.value = index
		formData.value.validityPeriodUnit = index + 1
		if (item === '天') {
			timeWarn.value = '最长90天'
		} else {
			timeWarn.value = '最长72小时'
		}
	}
	const checkImg2 = ref('/static/purchase/nochoose.png')
	const judgeImg2 = ref(false)
	const check2 = () => {
		judgeImg2.value = !judgeImg2.value
		formData.value.agreeDeal = judgeImg2.value
		if (judgeImg2.value == true) {
			checkImg2.value = '/static/purchase/checked-w.png'
		} else {
			checkImg2.value = '/static/purchase/nochoose.png'
		}
	}
	watch([typeId, bankNoteNameId, bankNoteDataId], () => {
		rateId.value = -1
		detailImgs.value = []
		textContent.value = null
		unitId.value = -1
		unit.value = '请选择单位'
		wayId.value = 0
		moneyId.value = 0
		statusId.value = 0
		regionName.value = ['选择地区']
		durationId.value = 0
		time.value = null
		timeWarn.value = '最长90天'
		judgeImg.value = true
		judgeImg2.value = false
		sliderValue.value = 5
		lastSendTime.value = ''
		lastSentDate.value = ''
		isShowTimeSelection.value = false
		isUnitSelected.value = false
		isShowType.value = false
		isShowAddProperty.value = true
		isShowNumbox.value = false
		isShowParbox.value = false
		isShowSelbox.value = false
		identifyImg.value = []
		isShowAddBox.value = false
		isShowUnit.value = false
		goodsInfor.value = ''
		goodsType.value = ''
		isShowProperty.value = false
		isAdded.value = false
		isShowRegion.value = false
		propertyList.value = []
		parameter2.value = {
			unit: '',
			count: '',
			minCnt: '',
			price: ''
		}
		if (popupLableRef.value) {
			popupLableRef.value.reset()
		}
		if (parameterRef.value) {
			parameterRef.value.reset()
		}
		if (popupNumberRef.value) {
			popupNumberRef.value.formReset()
		}
		if (popupTypeRef.value) {
			popupTypeRef.value.reset()
		}
		formData.value.agreeDeal = false
		formData.value.agreeMarginRules = true
		formData.value.appraisalInstitutionId = ''
		formData.value.appraisalInstitutionName = ''
		formData.value.currentCargoStatus = 0
		formData.value.descriptionDetails = ''
		formData.value.identifyQuantity = ''
		formData.value.lastSentDate = ''
		formData.value.lastSentDays = ''
		formData.value.minimumConfirmationQuantity = ''
		formData.value.needTradeMargin = true
		formData.value.pictureDetails = ''
		formData.value.shippingCity = ''
		formData.value.shippingProvince = ''
		formData.value.tradingMarginRatio = 0.05
		formData.value.transactionMode = 1
		formData.value.transactionUnitPrice = ''
		formData.value.unit = ''
		formData.value.userAddressId = ''
		formData.value.validityPeriod = ''
		formData.value.validityPeriodUnit = 1
	})

	watch(typeId, () => {
		formData.value.productName = '' //类名
		bankNoteNameId.value = -1
		bankNoteDataId.value = -1
		isShowLabel.value = false
		typeName.value = ''
	})
	watch(rateId, () => {
		rateId2.value = -1
	})
	watch(sendId, () => {
		isShowTimeSelection.value = false
		formData.value.lastSentDate = ''
		formData.value.lastSentDays = ''
		lastSentDate.value = ''
		lastSendTime.value = ''
	})
</script>

<style scoped>
	::v-deep uni-slider {
		margin: 0;
	}

	::v-deep .uni-slider-handle-wrapper {
		height: 16rpx;
		background-color: #f3f3f3 !important;
	}

	::v-deep .uni-slider-tap-area {
		margin-top: 10rpx !important;
	}

	::v-deep .uni-slider-handle {
		width: 36rpx !important;
		height: 36rpx !important;
		margin-top: -18rpx;
	}

	::v-deep .uni-slider-thumb {
		width: 24rpx !important;
		height: 24rpx !important;
		margin-top: -18rpx !important;
		border: 6rpx solid #FFC400;
		box-shadow: 2rpx 4rpx 8rpx 0 rgba(255, 193, 0, 0.53);
	}

	::v-deep .uni-slider-track {
		background-color: #FFC400 !important;
	}
</style>

<style lang="scss" scoped>
	.title {
		font-weight: 600;
	}

	.purchase-box {
		padding: 28rpx 40rpx 160rpx 40rpx;
		box-sizing: border-box;
		overflow-y: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.purchase-title {
			display: flex;
			align-items: center;
			gap: 20rpx;
			cursor: pointer;
			image {
				width: 48rpx;
				height: 48rpx;
			}

			view {
				font-size: 40rpx;
				font-weight: 600;
			}
		}

		.purchase-choice {
			display: flex;
			gap: 80rpx;
			margin-top: 28rpx;

			.choice-btn {
				font-size: 32rpx;
				font-weight: 600;
				cursor: pointer;
			}

			.line {
				width: 60%;
				height: 12rpx;
				margin: 0 auto;
				margin-top: 8rpx;
				border-radius: 12rpx;
			}

			.active-line {
				background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
			}
		}

		.row-line {
			width: 100%;
			height: 2rpx;
			background-color: #F2F2F2;
		}

		.type {
			padding: 28rpx 0 36rpx 0;

			.type-content {
				padding-top: 12rpx;
				display: flex;
				gap: 32rpx;
				text-align: center;

				.type-choice {
					padding: 8rpx 16rpx;
					background-color: #f8f8f8;
					border-radius: 12rpx;
				}
			}

			.type-detail-box {
				width: 100%;
				background: #F8F8F8;
				border-radius: 16rpx;
				margin-top: 18rpx;

				.type-detail-content {
					padding: 28rpx;

					.type-detail {
						display: flex;

						.type-title {
							cursor: pointer;
							padding: 8rpx 16rpx;
							border-radius: 12rpx;
						}
					}

					.type-name {
						display: flex;
						gap: 28rpx;
						margin-top: 28rpx;
						overflow: hidden;
						overflow-x: auto;
						scrollbar-width: none;
						-webkit-overflow-scrolling: touch;

						.type-item-name {
							padding: 8rpx 16rpx;
							border-radius: 12rpx;
							white-space: nowrap;
						}
					}

					.type-title2 {
						color: #000000;
					}

					.type-adding-box {
						width: 22.8674563678%;
						background: #FFFFFF;
						border-radius: 12rpx;
						margin-top: 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						.type-adding {
							color: #BF7D2B;
							padding: 24rpx 0;
							cursor: pointer;
						}
					}

					.detail-content {
						display: flex;
						justify-content: space-between;

						.change-goods {
							display: flex;
							align-items: center;
							gap: 8rpx;

							.change-goods-text {
								font-weight: 600;
								color: #BF7D00;
								cursor: pointer;
							}

							image {
								width: 16rpx;
								height: 24rpx;
							}
						}
					}

					.goods-detail {
						margin-top: 20rpx;
						background-color: #fff;
						border-radius: 12rpx;
						display: flex;
						gap: 36rpx;
						align-items: center;
						padding: 24rpx;

						.goods-name {
							display: flex;
							flex-direction: column;
							gap: 12rpx;

							.type-menu {
								display: flex;
								gap: 16rpx;

								// align-items: center;
								.type-menu-monomial {
									>view:first-child {
										color: #ABABAB;
									}

									>view:last-child {
										font-size: 26rpx
									}
								}

								.third-menu-monomial {
									width: 800px;

									// width: 35%;
									.item-number {
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
									}
								}
							}
						}
					}
				}
			}

			.object-title {
				padding-top: 36rpx;

				input {
					box-sizing: border-box;
					width: 37.89473684%;
					height: 80rpx;
					border-radius: 16rpx;
					border: 1px solid #D8D8D8;
					margin-top: 20rpx;
				}

				::v-deep .uni-input-input {
					padding-left: 20rpx;
					font-size: 28rpx
				}

				::v-deep .uni-input-placeholder {
					left: 20rpx;
					font-size: 28rpx;
					color: #ABABAB;
				}
			}

			.label-detail {
				width: 54.8245614035%;
				margin-top: 36rpx;

				.label-detail-box {
					width: 100%;
					background: #F8F8F8;
					border-radius: 12rpx 12rpx 0 0;
					margin-top: 12rpx;
					box-sizing: border-box;
					padding: 24rpx 20rpx;
					display: flex;
					gap: 16rpx;

					.label-img {
						width: 160rpx;
						height: 160rpx;
					}

					.label-detail-text {
						width: 85.4545455%;

						.label-cnt {
							display: flex;
							gap: 22rpx;
							margin-top: 12rpx;
							font-weight: 400;
							font-size: 24rpx;
							color: #ABABAB;
						}

						.label-ctrl {
							display: flex;
							justify-content: space-between;
							margin-top: 20rpx;
							align-items: flex-end;

							.label-price {
								display: flex;
								gap: 20rpx;
								font-weight: 400;
								font-size: 24rpx;
								color: #ABABAB;
								align-items: flex-end;

								.deal-item-price {
									font-weight: 600;
									font-size: 28rpx;
									color: #FF5500;
								}

								.deal-item-remnant {
									font-size: 24rpx;
									color: #FF5500;
								}
							}

							.label-btn {
								display: flex;
								gap: 32rpx;
								font-size: 28rpx;
								line-height: 56rpx;
								align-items: flex-end;

								.delete {
									height: 56rpx;
									padding: 0 26rpx;
									// padding: 12rpx 26rpx;
									box-sizing: border-box;
									font-weight: 600;
									border-radius: 28rpx;
									border: 2rpx solid #D8D8D8;
								}

								.edit {
									color: #fff;
									height: 56rpx;
									padding: 0 28rpx;
									// padding: 14rpx 28rpx;
									font-weight: 600;
									background: #FFC400;
									border-radius: 28rpx;
								}

								.delete:hover,
								.edit:hover {
									cursor: pointer;
								}
							}
						}

					}
				}

				.cut-line {
					width: 100%;
					height: 12rpx;
					position: relative;
					top: -26rpx;
				}

				.label-summarize {
					width: 100%;
					background: #FFFBF4;
					border-radius: 0 0 12rpx 12rpx;
					margin-top: -36rpx;
					box-sizing: border-box;
					padding: 20rpx 28rpx 20rpx 60.64%;

					.summarize-text {
						font-size: 13px;
						text-align: right;
					}

					.summarize-price {
						display: flex;
						gap: 20rpx;
						align-items: center;
						justify-content: flex-end;

						.reference-total {
							color: #ABABAB;
							position: relative;

							text {}

							>text:first-child {
								font-size: 24rpx;
							}

							>text:nth-child(3) {
								font-size: 24rpx;
							}
						}

						.reference-total::after {
							content: '';
							position: absolute;
							left: 0;
							right: 0;
							top: 50%;
							height: 1px;
							background: currentColor;
						}

						.summarize-item-price {
							color: #FF5500;

							>text:first-child {
								font-weight: 600;
								font-size: 34rpx;
							}

							>text:nth-child(2) {
								font-size: 28rpx
							}

							>text:nth-child(3) {
								font-size: 24rpx;
							}
						}
					}
				}
			}

			.label {
				width: 37.89473684%;
				position: relative;

				.add-property {
					padding-top: 36rpx;

					.label-title {
						display: flex;
						gap: 8rpx;
						align-items: center;

						.label-desc {
							font-size: 24rpx;
							color: #ABABAB;
						}
					}

					.label-name {
						color: #BF7D2B;
					}

					.label-content {
						width: 75.6944444%;
						border-radius: 16rpx;
						margin-top: 20rpx;
						display: flex;
						gap: 12rpx;
						align-items: center;

						.add {
							color: #fff;
							font-size: 24rpx;
							font-weight: 600;
							line-height: 24rpx;
						}

						.add-number {
							width: 54.4342507645%;
							height: 190rpx;
							box-sizing: border-box;
							padding: 16rpx 40rpx 20rpx 16rpx;
							display: flex;
							flex-direction: column;
							// justify-content: space-between;
							background-image: url('/static/sale/bg-blue.png');
							background-repeat: no-repeat;
							background-size: 100% 100%;

							.identify {
								color: #fff;
								display: flex;
								gap: 82rpx;
								padding-left: 26rpx;

								.identify-item {
									padding-top: 110rpx;
									font-weight: 500;
									font-size: 20rpx;
									display: flex;
									gap: 6rpx;
									align-items: center;
									line-height: 20rpx;

									image {
										width: 9.6rpx;
										height: 16rpx;
									}
								}

								.identify-item:hover {
									cursor: pointer;
								}

							}
						}

						.or {
							width: 36rpx;
							height: 36rpx;
						}

						.add-label {
							width: 36.3914370886%;
							height: 190rpx;
							box-sizing: border-box;
							padding: 16rpx 0 150rpx 16rpx;
							display: flex;
							gap: 6rpx;
							align-items: center;
							background-image: url('/static/sale/bg-yellow.png');
							background-repeat: no-repeat;
							background-size: 100% 100%;
							cursor: pointer;

							image {
								width: 9.6rpx;
								height: 16rpx;
							}
						}
					}
				}

				.added {
					width: 85.41666666667%;
					position: absolute;
					top: 80rpx;
					right: -708px;
					background-color: #fff;
					box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.2);
					border-radius: 16rpx;
					box-sizing: border-box;
					border: 2rpx solid #FFC400;
					padding: 40rpx;
					z-index: 99;

					.label-content {
						width: 100%;
					}
				}

				.label-property {
					margin-top: 36rpx;
					width: 263.888888889%;

					>view:first-child {
						display: flex;
						justify-content: space-between;

						.change-property {
							display: flex;
							align-items: center;
							gap: 12rpx;
							cursor: pointer;
						}

						image {
							width: 24rpx;
							height: 19.68rpx;

						}
					}

					.pack {
						margin-top: 12rpx;
						font-size: 24rpx;
						color: #ABABAB;
					}

					.property-row {
						margin-top: 20rpx;
						background: #F8F8F8;
						border-radius: 12px;
						padding: 28rpx 20rpx 28rpx 20rpx;

						.label-adding {
							display: flex;
							justify-content: space-between;

							.label-selection {
								display: flex;
								align-items: center;

								image {
									width: 32.28rpx;
									height: 28rpx;
								}

								.label-selection-btn {
									cursor: pointer;
								}
							}
						}

						.spec-name {
							margin-top: 24rpx;
							color: #BF7D2B;
						}

						>view:first-child {
							display: flex;
							gap: 20rpx;

							.count {
								font-size: 28rpx;
								color: #ABABAB;
							}
						}

						>view:last-child {
							display: flex;
							flex-wrap: wrap;

							.firstNumber {
								display: flex;
								margin-top: 20rpx;
								line-height: 38rpx;
								color: #BF7D2B;
							}
						}
					}
				}
			}

			.appraisal {
				padding-top: 36rpx;

				.appraisal-selection {
					display: flex;
					gap: 32rpx;
					margin-top: 20rpx;

					.rate-item-name {
						padding: 8rpx 16rpx;
						border-radius: 12rpx;
					}
				}

				.rate-name {
					// padding: 28rpx;
					display: flex;
					gap: 32rpx;
					background-color: #F8F8F8;
					border-radius: 16rpx;
					// margin-top: 18rpx;
					cursor: pointer;

					.rate-item-name2 {
						padding: 8rpx 16rpx;
						border-radius: 12rpx;
					}
				}
			}
		}

		.detail {
			image {
				width: 136rpx;
				height: 134rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}

			image:hover {
				cursor: pointer;
			}

			.addImg {
				display: flex;
				gap: 20rpx;

				.detailImg {
					position: relative;

					.deleteImg {
						position: absolute;
						top: 10rpx;
						right: -10rpx;
						width: 30rpx;
						height: 30rpx;
						text-align: center;
						line-height: 30rpx;
						color: #fff;
						z-index: 20;
						background: rgba(0, 0, 0, 0.85);
						border-radius: 50%;
					}

					.deleteImg:hover {
						cursor: pointer;
					}
				}
			}

			textarea {
				width: 53.5087719298%;
				box-sizing: border-box;
				height: 220rpx;
				border-radius: 16rpx;
				border: 1px solid #D8D8D8;
			}

			.focused {
				border: 1px solid #FFC400 !important;
			}

			::v-deep .uni-textarea-placeholder {
				color: #ABABAB;
				box-sizing: border-box;
				padding: 24rpx 20rpx;
			}

			::v-deep .uni-textarea-textarea {
				box-sizing: border-box;
				padding: 24rpx 20rpx;
			}
		}

		.mechanism {
			padding-top: 36rpx;

			.unit {
				display: flex;
				align-items: center;
				gap: 148rpx;
				margin-top: 24rpx;
				position: relative;

				.unit-selection {
					width: 28.947368%;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 2rpx solid #D8D8D8;
					padding: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					cursor: pointer;

					.unit-text {
						font-size: 28rpx;
						color: #ABABAB;
					}

					.active-unit {
						color: #2C2E3A;
					}

					image {
						width: 24rpx;
						height: 14rpx;
					}
				}

				.unit-box {
					width: 28.947368%;
					box-sizing: border-box;
					padding: 24rpx 20rpx 0 20rpx;
					box-shadow: 0 4rpx 24rpx 0 rgba(47, 83, 109, 0.2);
					border-radius: 16rpx;
					border: 2rpx solid #FFC400;
					background-color: #fff;
					position: absolute;
					top: 88rpx;
					left: 204rpx;
					z-index: 99;

					>view:first-child {
						padding-bottom: 8rpx;
						border-bottom: 2rpx solid #F2F2F2;
					}

					.unit-item {
						display: flex;
						gap: 32rpx;
						padding: 40rpx 0;

						.unit-item-name {
							padding: 8rpx 16rpx;
							border-radius: 12rpx;
							cursor: pointer;
						}
					}
				}
			}

			.mechanism-item {
				display: flex;
				align-items: center;
				gap: 148rpx;
				margin-top: 24rpx;

				.item-selection {
					width: 28.947368%;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 2rpx solid #D8D8D8;
					padding: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: space-between;

					.item-text {
						font-size: 28rpx;
					}

					::v-deep .uni-input-input {
						color: #2C2E3A !important;
					}

					::v-deep .uni-input-placeholder {
						color: #ABABAB;
					}
				}
			}

			.min-cnt {
				gap: 36rpx;
			}

			.total-price {
				width: 37.89473684%;
				background: #F8F8F8;
				border-radius: 16rpx;
				margin-top: 24rpx;
				box-sizing: border-box;
				padding: 18rpx 40rpx 18rpx 0;
				text-align: right;

				>text:last-child {
					font-weight: 600;
					font-size: 16px;
					color: #FF5500;
				}
			}

			.mode {
				display: flex;
				gap: 92rpx;
				align-items: center;
				margin-top: 28rpx;

				.mode-content {
					background-color: #F8F8F8;
					padding: 8rpx 16rpx;
					border-radius: 6px 6px 6px 6px;
					text-align: center;
					cursor: pointer;
				}

				.active-mode {
					color: #BF7D00;
					background: #FFF0DC;
					font-weight: 600;
				}
			}

			.way {
				display: flex;
				gap: 92rpx;
				margin-top: 24rpx;
				align-items: center;

				.way-content-box {
					display: flex;
					gap: 32rpx;

					.way-content {
						display: flex;
						padding: 8rpx 16rpx;
						border-radius: 12rpx;
						gap: 12rpx;
						align-items: center;

						.item-warn {
							padding-left: 8rpx;
							color: #FF5500;
						}

						.item-img {
							width: 28rpx;
							height: 28rpx;
						}

						.item-img:hover {
							cursor: pointer;
						}
					}
				}
			}

			.money {
				.money-choice {
					display: flex;
					gap: 20rpx;
					margin-top: 26rpx;
					align-items: center;

					.money-content-box {
						display: flex;
						gap: 32rpx;
						margin-left: 44rpx;

						.money-content {
							padding: 8rpx 16rpx;
							border-radius: 12rpx;
						}
					}

					.money-img {
						width: 176rpx;
						height: 40rpx;
					}

					.money-img:hover {
						cursor: pointer;
					}
				}

				.slider-box {
					width: 28.684210526%;
					margin-top: 28rpx;

					.slider-percent {
						display: flex;
						justify-content: space-between;

						.percent {
							font-size: 24rpx;
							color: #ABABAB;
						}
					}
				}

				.total-money {
					margin-top: 32rpx;

					.money-num {
						color: #FF5500;
					}

					.money-explain {
						color: #ABABAB;
					}
				}

				.checkbox {
					margin-top: 16rpx;
					display: flex;
					align-items: center;
					gap: 6rpx;

					image {
						width: 26rpx;
						height: 26rpx;
					}

					image:hover {
						cursor: pointer;
					}

					.checkbox-text {
						font-size: 24rpx;
					}
				}
			}
		}

		.condition {
			margin-top: 36rpx;

			.status {
				.status-selection {
					display: flex;
					gap: 36rpx;
					align-items: center;
					margin-top: 28rpx;

					.status-choice {
						display: flex;
						gap: 32rpx;

						.status-content {
							padding: 8rpx 16rpx;
							border-radius: 12rpx;
						}
					}

					image {
						width: 148rpx;
						height: 40rpx;
						margin-left: -16rpx;
					}

					image:hover {
						cursor: pointer;
					}
				}

				.send-selection {
					display: flex;
					gap: 80rpx;
					margin-top: 28rpx;

					.send-btn {
						font-size: 32rpx;
						font-weight: 600;
						cursor: pointer;
					}

					.line {
						width: 60%;
						height: 12rpx;
						margin: 0 auto;
						margin-top: 8rpx;
						border-radius: 12rpx;
					}

					.active-line {
						background: linear-gradient(270deg, #FFFFFF 0%, #FFC400 100%);
					}
				}

				.last-send-time,
				.last-send-date {
					display: flex;
					align-items: center;
					gap: 36rpx;
					margin-top: 24rpx;
					position: relative;

					.time-title {
						>view:last-child {
							color: #ABABAB;
						}
					}

					.time-selection {
						width: 28.947368%;
						box-sizing: border-box;
						border-radius: 16rpx;
						border: 2rpx solid #D8D8D8;
						padding: 20rpx 20rpx 20rpx 20rpx;
						cursor: pointer;

						.time-text {
							font-size: 28rpx;
							color: #ABABAB;
						}

						::v-deep .uni-input-placeholder {
							font-size: 28rpx;
							color: #ABABAB;
						}
					}
				}
			}

			.region {
				position: relative;
				display: flex;
				align-items: center;
				gap: 92rpx;
				margin-top: 24rpx;

				.region-selection {
					width: 28.947368%;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 1px solid #D8D8D8;
					padding: 20rpx 20rpx 20rpx 20rpx;
					color: #ABABAB;
					display: flex;
					align-items: center;
					justify-content: space-between;

					image {
						width: 24rpx;
						height: 14rpx;
					}
				}

				.region-selection:hover {
					cursor: pointer;
				}
			}

			.approach {
				display: flex;
				align-items: center;
				gap: 92rpx;
				margin-top: 24rpx;

				.approach-selection {
					width: 28.947368%;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 1px solid #D8D8D8;
					padding: 20rpx 20rpx 20rpx 20rpx;
				}
			}
		}

		.other {
			margin-top: 36rpx;

			.duration {
				display: flex;
				gap: 36rpx;
				align-items: center;
				margin-top: 28rpx;

				.duration-selection {
					display: flex;
					gap: 32rpx;

					.duration-content {
						padding: 8rpx 16rpx;
						border-radius: 12rpx;
					}

				}
			}

			.time {
				display: flex;
				align-items: center;
				gap: 148rpx;
				margin-top: 24rpx;

				.time-selection {
					width: 28.947368%;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 2rpx solid #D8D8D8;
					padding: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: space-between;

					.time-text {
						font-size: 28rpx;
						color: #ABABAB;
					}

					.time-warn {
						color: #FF5500;
					}

					::v-deep .uni-input-placeholder {
						font-size: 28rpx;
						color: #ABABAB;
					}
				}
			}

			.agreement {
				display: flex;
				align-items: center;
				gap: 8rpx;
				margin-top: 36rpx;

				image {
					width: 26rpx;
					height: 26rpx;
				}

				image:hover {
					cursor: pointer;
				}

				.agreement-content {
					font-size: 13px;

					.agreement-text {
						color: #C2C2C2;
					}

					.agreement-name {
						color: #FFC400;
					}

					.agreement-name:hover {
						cursor: pointer;
					}
				}
			}
		}

		.publish-btn {
			width: 36.6101695%;
			height: 104rpx;
			font-weight: 600;
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 104rpx;
			background-color: #FFC400;
			border-radius: 52rpx;
			margin-top: 80rpx;
		}

		.publish-btn:hover {
			cursor: pointer;
		}
	}
</style>