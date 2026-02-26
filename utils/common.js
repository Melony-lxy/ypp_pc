/**
 * 散钞返回头或尾（头尾一样），其它返回`firstNumber…lastNumber`
 * @param consecutiveNumType 1: 散钞 2: 标十 3:标百
 * @return String 
 */
export const getPublishPackageItemDTOList = (consecutiveNumType, headTailBookNoteNumDetailsList, isReturnArr =
false) => {
	let str = ''
	let arr = []
	for (let i = 0; i < headTailBookNoteNumDetailsList.length; i++) {
		const item = headTailBookNoteNumDetailsList[i]
		const {
			firstNumber,
			lastNumber
		} = item
		if (consecutiveNumType === 1) {
			str += `、${firstNumber}`
			arr.push(firstNumber)
		} else {
			str += ((i === 0) ? `、${firstNumber}…${lastNumber}` : `、\n${firstNumber}…${lastNumber}`)
			arr.push((i === 0) ? `${firstNumber}…${lastNumber}` : `${firstNumber}…${lastNumber}`)
		}
	}
	return isReturnArr ? arr : str.substring(1)
}

export const getUnitByNumType = (consecutiveNumType) => {
	const map = {
		1: '张',
		2: '组',
		3: '刀'
	}

	return map[consecutiveNumType]
}

/**
 * 下载app
 */
export const goDownApp = (type) => {
	const data = window.OpenInstall.parseUrlParams()
	if (type !== undefined) {
		if (type === -1) {
			let url = '/pages/publish/goodsDetail/index?id=' + data.id
			data.jumpUrl = encodeURIComponent(JSON.stringify(url))
		} else {
			let url = `/pages/publish/goodsDetail/purchaseIndex?id=${data.id}&orderType=${type}`
			data.jumpUrl = encodeURIComponent(JSON.stringify(url))
		}
	}
	if (window.OpenInstall) {
		const openInstall = new window.OpenInstall({
			appKey: "bxkyti", // 替换为你的 appKey
			onready: function() {
				let that = this;
				that.schemeWakeup();
				that.wakeupOrInstall();
				return false;
			},
		}, data);
	} else {
		console.error('OpenInstall 脚本未加载，请检查引入方式');
	}
}

/**
 * 图片列表
 */
export const longAndSheImageList = {
	'dc2456b4c0c246eeadfa8161e394f93a': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/long-b.jpg',
	'dc2456b4c0c246eeadfa8161e394f94a': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/she-b.jpg',
	'dc2456b4c0c246eeadfa8161e394f95a': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/loong-snake.png',
	'c3811546b52246a4a43757a423113c8f': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/29-olympic.jpg',
	'0293924f9cac41d78f696571f83d92f1': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/24-winter--olympic.jpg',
	'1cf96dc4836c44979c8b376dfebb26ce': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/rmb-issue-70-year.jpg',
	'5208beb1b37a41a5816e29a8ee457005': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/china-aerospace.jpg',
	'bff414e744634a8da2479a899b5a0365': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/welcome-new-century.jpg',
	'025631c2164849b2b6cea6b2b9200a97': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/china-50-year.jpg',
	'dc2456b4c0c246eeadfa8161e394f97a': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/she-b.jpg',
	// '26106c14a81b4ab18d5bb22bf09effb6': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/long-b.jpg',
	// '9f285077a6b74d7abaae360c752c7849': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/she-b.jpg',
	'2025蛇年贺岁纪念钞': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/she-b.jpg',
	'2024龙年贺岁纪念钞': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/money_big_image/long-b.jpg',
	'dc2456b4c0c246eeadfa8161e394f26a': 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yph/common/2026/%E9%A9%AC%E9%92%9E.jpg',
}

/**
 * 倒计时
 */
export const diffTime = (nowTimeStamp, expireTimeStamp) => {
	if (!expireTimeStamp) return null
	const diffStamp = expireTimeStamp - nowTimeStamp
	if (diffStamp < 0) return null
	const timeDiff = expireTimeStamp - nowTimeStamp
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
	const leave1 = timeDiff % (1000 * 60 * 60 * 24)
	const hours = Math.floor(leave1 / (1000 * 60 * 60))
	const leave2 = leave1 % (1000 * 60 * 60)
	const minutes = Math.floor(leave2 / (1000 * 60))
	const leave3 = leave2 % (1000 * 60)
	const seconds = Math.floor(leave3 / 1000)
	const milliseconds = leave3 % 1000
	return {
		day: days,
		hour: hours,
		minute: minutes,
		second: seconds
	}
}

/**
 * 查看图片
 * @param imgs: string:单张图片,array:图片数组
 */
export const lookImageLsit = (imgs, index) => {
	if (imgs === undefined) throw new Error('Parameter "imgs" is required');
	let currentIndex = 0
	let imgList = () => []
	if (index) {
		currentIndex = index
	}

	if (typeof imgs === 'string') {
		imgList = imgs.split(' ');
	} else if (Array.isArray(imgs)) {
		imgList = imgs;
	} else {
		throw new Error('Parameter "imgs" must be a string or array');
	}

	uni.previewImage({
		current: currentIndex,
		urls: imgList,
		loop: true
	})
}

//复制
export const onCopy = (data) => {
	let copyData = ''
	if (typeof data != 'string') {
		copyData = JSON.stringify(data)
	} else copyData = data
	uni.setClipboardData({
		data: copyData,
		success() {
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			})
		},
		fail() {
			uni.showToast({
				title: '复制失败，请重新复制',
				icon: 'none'
			})
		}
	})
}

/**
 * 解析中文日期字符串（如 "2025年12月25日"）为 Date 对象
 * @param {string} dateStr - 中文日期字符串
 * @returns {Date | null} 解析后的 Date 对象，失败返回 null
 */
function parseChineseDate(dateStr) {
	// 匹配 "YYYY年MM月DD日" 格式
	const regex = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
	const match = dateStr.match(regex);

	if (!match) return null;

	const year = parseInt(match[1]);
	const month = parseInt(match[2]) - 1; // JavaScript 的月份是 0-11
	const day = parseInt(match[3]);

	return new Date(year, month, day);
}

/**
 * 格式化 Date 对象为中文日期字符串（如 "2026年1月4日"）
 * @param {Date} date - 要格式化的 Date 对象
 * @returns {string} 中文日期字符串
 */
function formatDateToChinese(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 转换回 1-12
	const day = date.getDate();

	return `${year}年${month}月${day}日`;
}

/**
 * 计算指定日期之后的天数
 * @param {String} dayStr 日期字符串，格式为 "2026年1月1日" 或 "2026年01月01日"
 * @param {Number} afterNum 要加的天数，如 3 表示3天后
 * @returns {String} 返回格式化后的日期字符串，格式与原输入保持一致
 */
export const getAfterDays = (dayStr, afterNum) => {
	const date = parseChineseDate(dayStr);
	if (!date) {
		throw new Error("日期格式不正确，请使用 'YYYY年MM月DD日' 格式");
	}
	date.setDate(date.getDate() + afterNum);
	return formatDateToChinese(date);
}

/**
 * 退款责任
 */
export const getReasonMapSeller = (marginAmount, violationRecord) => {
	const _map = {
		11: {
			text: '与描述不符',
			marginTitle: '保证金扣除',
			marginAmount: `-¥${marginAmount}`,
			msg1: '若此原因属实，您将扣除保证金补偿',
			msg2: violationRecord ? '由于卖家超时发货违约，此保证金已转账到买家的账户' : '售后完成后此保证金将转账到买家的账户'
		},
		12: {
			text: '物品损坏',
			marginTitle: '保证金',
			marginAmount: `¥${marginAmount}`,
			// msg1: violationRecord == 1 ? '' : '将各自退回双方保证金',
			msg1: '将各自退回双方保证金',
			msg2: ''
			// msg2: violationRecord ? '由于卖家超时发货违约，此保证金已转账到买家的账户' : '售后完成后此保证金将转账到买家的账户' 
		},
		13: {
			text: '不想要了',
			marginTitle: '保证金补偿',
			marginAmount: `¥${marginAmount}`,
			msg1: '由于买家是违约方，您将收到保证金补偿',
			msg2: ''
		},
		14: {
			text: '与商家协商一致',
			marginTitle: '保证金',
			marginAmount: `¥${marginAmount}`,
			msg1: '将各自退回双方保证金',
			msg2: ''
		},
		21: {
			text: '未发货',
			marginTitle: violationRecord ? '扣除保证金' : '保证金补偿',
			marginAmount: violationRecord ? `-¥${marginAmount}` : `¥${marginAmount}`,
			msg1: (violationRecord === 0) ? '由于您发货时间还在有效期内，将扣除买家的保证金' : '由于您超时未发货，买家将获得保证金补偿',
			msg2: violationRecord ? '由于您违约，此保证金已转账到买家的账户' : ''
		},
		22: {
			text: '未收到货',
			msg1: '',
			msg2: ''
		},
		23: {
			text: '与商家协商一致',
			marginAmount: marginAmount,
			msg1: '将各自退回双方保证金',
			msg2: '',
			marginTitle: '保证金',
			marginAmount: `¥${marginAmount}`
		}
	}

	return _map
}

/**
 * 订单详情
 */
export const orderSourceMap = {
	'001': 'bargainDetailOrderInfoVO',
	'002': 'packageDetailOrderInfoVO',
	'003': 'commonDetailOrderInfoVO',
	'004': 'purchaseDetailOrderInfoVO',
	'005': 'grailPurchaseDetailOrderInfoVO',
	'006': 'grailPublishDetailOrderInfoVO',
	'007': 'storagePurchaseDetailOrderInfoVO',
	'008': 'storagePublishDetailOrderInfoVO'
}

/**
 * 聊天时间
 */
export function formatTimestamp(timestamp) {
	const now = new Date();
	const targetTime = new Date(timestamp * 1000);
	const diff = now - targetTime;
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (targetTime >= today) {
		const hours = targetTime.getHours().toString().padStart(2, '0');
		const minutes = targetTime.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	} else if (targetTime >= yesterday) {
		const hours = targetTime.getHours().toString().padStart(2, '0');
		const minutes = targetTime.getMinutes().toString().padStart(2, '0');
		return `昨天 ${hours}:${minutes}`;
	} else {
		const year = targetTime.getFullYear();
		const month = (targetTime.getMonth() + 1).toString().padStart(2, '0');
		const day = targetTime.getDate().toString().padStart(2, '0');
		const hours = targetTime.getHours().toString().padStart(2, '0');
		const minutes = targetTime.getMinutes().toString().padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}
}

/**
 * 出售/求购
 */

export function infoOrderType(orderType){
	const sellMap = [0,1,4,8,9]
	const purchaseMap = [2,16,18]
	return sellMap.includes(orderType) ? 'sell' : 'purchase'
}