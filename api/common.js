// 引入 request 文件
import request from "@/api/request.js"

//热点直击列表
export const hotList = (data) => {
	return request({
		url: '/publish/hotspot/noToken/hotList',
		method: 'post',
		data: data
	})
}

//寄售商城
export const closedDay = (data) =>{
	return request({
		url: '/publish/grailConsign/noToken/closedDay',
		method: 'post',
		data: data
	})
}

//龙钞行情价格
export const getLoongBanknoteTagGroups = (data) =>{
	return request({
		url:'/product/loongBanknoteEvaluate/noToken/getLoongBanknoteTagGroups',
		method: 'get',
		data: data
	})
}

//蛇钞行情价格
export const getSheBanknoteTagGroups = (data) =>{
	return request({
		url:'/snake-product/loongBanknoteEvaluate/noToken/getLoongBanknoteTagGroups',
		method: 'get',
		data: data
	})
}

//行情列表
export const marketList  = (data) =>{
	return request({
		url: '/publish/news/noToken/info',
		method: 'post',
		data
	})
}

//随便看看
export const lookaround  = (data) =>{
	return request({
		url: '/publish/mainPage/noToken/page',
		method: 'get',
		data
	})
}

//随便看看
export const lookaroundLogin  = (data) =>{
	return request({
		url: '/publish/mainPage/page',
		method: 'get',
		data
	})
}

//出售列表
export const sale  = (data) =>{
	return request({
		url: '/publish/publish-order/noToken/page',
		method: 'get',
		data
	})
}

//出售列表
export const saleLogin  = (data) =>{
	return request({
		url: '/publish/publish-order/page',
		method: 'get',
		data
	})
}

//求购列表-登录
export const purchase = (data) =>{
	return request({
		url: '/publish/purchase-order/noToken/page',
		method: 'get',
		data
	})
}

//求购列表-登录
export const purchaseLogin = (data) =>{
	return request({
		url: '/publish/purchase-order/page',
		method: 'get',
		data
	})
}

//成交
export const deal = (data) =>{
	return request({
		url: '/order/order/noToken/finishedOrderDetail',
		method: 'post',
		data
	})
}

//查看库存
export function queryUserFloatStock(data) {
	return request({
		url: '/publish/inventory/queryUserFloatStock',
		method: 'post',
		data
	})
}

//商品详情出售
export const details = (id) =>{
	return request({
		url: '/publish/publish-order/noToken/' + id,
		method: 'get',
	})
}

//商品详情求购
export const detailsBuy = (id) =>{
	return request({
		url: '/publish/purchase-order/noToken/' + id,
		method: 'get'
	})
}

//商家
export const marchant = (data) =>{
	return request({
		url: '/order/order/noToken/statisticsOrderCountAndAmount',
		method: 'post',
		data
	})
}

//成交商家
export const orderDetail = (data) =>{
	return request({
		url: '/order/order/noToken/orderDetail',
		method: 'post',
		data
	})
}

//配号成交详情
export const queryOrderDetail = (data) =>{
	return request({
		url: '/order/order/noToken/queryOrderDetailNoToken',
		method: 'post',
		data
	})
}

//号码标签
export const LoongBanknoteTags = (data) =>{
	return request({
		url: '/product/loongBanknoteEvaluate/noToken/getLoongBanknoteTags',
		method: 'get',
		data
	})
}

//登录
export const login = (data) =>{
	return request({
		url: '/auth/phone/login_or_register',
		method: 'post',
		data
	})
}

//获取验证码
export const getCodePhone = (data) =>{
	return request({
		url: '/codePhone',
		method: 'post',
		data
	})
}

//连号识别
export const recognitionText = (data) =>{
	return request({
		url: '/product/productTemp/recognitionText',
		method: 'post',
		data
	})
}

// 贵金属年份列表
export const yearList = (data) => {
	return request({
		url: '/publish/publish/goldcoin/years',
		method: 'post',
		data
	})
}

// 贵金属列表
export const categoryList = (data) => {
	return request({
		url: '/publish/publish/goldcoin/goldCoinCategoryList',
		method: 'post',
		data
	})
}

// 普通金属
export const yearListcom = (data) => {
	return request({
		url: '/publish/publish/commoncoins/years',
		method: 'post',
		data
	})
}

// 普通金属
export const categoryListcom = (data) => {
	return request({
		url: '/publish/publish/commoncoins/goldCoinCategoryList',
		method: 'post',
		data
	})
}

// 纸币/纪念钞列表
export const bankNote = (data) => {
	return request({
		url: '/product/dictionaryItem/noToken/getMoneyItems',
		method: 'get',
		data: data
	})
}

// 人民币
export const category = (data) => {
	return request({
		url: '/publish/banknoteOther/category',
		method: 'get',
		data: data
	})
}

// 纸币/评级列表
export const rate = (data) => {
	return request({
		url: '/product/loongBanknoteEvaluate/noToken/getBanknoteRates',
		method: 'get',
		data: data
	})
}

// 贵金属纪念币/品种列表
export const varietyList = (data) => {
	return request({
		url: `/publish/publish/goldcoin/goldCoinCategory?year=${data.year}`,
		method: 'post',
		data
	})
}

// 普通金属纪念币/品种列表
export const varietyList2 = (data) => {
	return request({
		url: `/publish/publish/commoncoins/goldCoinCategory?year=${data.year}`,
		method: 'post',
		data
	})
}

//纸钞编号
export const noteNumberDetail = (data) => {
	return request({
		url: '/publish/bookNoteNumber/bookNoteNumberInfoDetail',
		method: 'post',
		data
	})
}

//封装类型
export const goldCoinPackageType = (data) =>{
	return request({
		url: `/publish/publish/goldcoin/goldCoinPackageType`,
		method: 'post',
		data
	})
}

//个人信息
export const userInfo = (data) =>{
	return request({
		url: '/system/user/getIOSInfo',
		method: 'get',
		data
	})
}

// // 参考单价
// export const referenceValue = (data) =>{
// 	return request({
// 		url: '/publish/publish-order/getPublishPackageDetails',
// 		method: 'post',
// 		data
// 	})
// }

// 查询仓库总资产  
export const assets = (data) =>{
	return request({
		url: '/product/productTemp/assets',
		method: 'get',
		data
	})
}

//账户余额查询
export const balanceQuery = (data) =>{
	return request({
		url: '/pay/pays/user/balanceQuery',
		method: 'post',
		data
	})
}

//我的寄售仓库
export const getInventoryList = (data) => {
	return request({
		url: '/publish/inventory/my',
		method: 'get',
		data
	})
}

// 求购发布
export const purchaseSave = (data) => {
	return request({
		url: '/publish/purchase-order/save',
		method: 'post',
		data
	})
}

// 出售发布
export const saleSave = (data) => {
	return request({
		url: '/publish/publish_souvenir_coin_order/save',
		method: 'post',
		data
	})
}

// 修改个人信息
export const editInfo = (data) =>{
	return request({
		url: '/system/user/update',
		method: 'post',
		data
	})
}

//退出登录
export const outLogin = (data) =>{
	return request({
		url: '/auth/logout',
		method: 'delete',
		data
	})
}

//提交个人实名认证
export const setAccount = (data) =>{
	return request({
		url: '/pay/pays/user/personalAccountOpeningAndAccountSet',
		method: 'post',
		data
	})
}


//提交企业实名认证
export const setAccountBusine = (data) =>{
	return request({
		url: '/pay/pays/user/businessAccountOpeningAndAccountSet',
		method: 'post',
		data
	})
}

//获取注销账号验证码
export const destroyUserCode = (data) =>{
	return request({
		url: '/system/user/destroyUserCode',
		method: 'post',
		data
	})
}

//注销账号
export const destroyUser = (data) =>{
	return request({
		url: '/system/user/destroyUser',
		method: 'post',
		data
	})
}

// 身份证正面识别
export const frontSideIDRecognition = (data) =>{
	return request({
		url: '/pay/pays/user/frontSideIDRecognition',
		method: 'post',
		data
	})
}

// 经营执照识别
export const businessLicenseRecognition = (data) => {
	return request({
		url: '/pay/pays/user/businessLicenseRecognition',
		method: 'post',
		data
	})
}

//获取实名信息
export const queryRealNameInfo = (data) =>{
	return request({
		url: '/pay/pays/user/queryRealNameInfo',
		method: 'post',
		data
	})
}

//获取实名账户信息
export const checkAccountInfo = (data) =>{
	return request({
		url: '/pay/pays/user/checkAccountInfo',
		method: 'post',
		data
	})
}

//注销实名
export const clearUserInfo = (data) =>{
	return request({
		url: '/pay/pays/user/clearUserInfo',
		method: 'get',
		data
	})
}

//获取银行卡信息
export const getCardNoInfo = (data) =>{
	return request({
		url: '/pay/bankCard/noToken/getCardNoInfo',
		method: 'post',
		data
	})
}

//添加银行卡
export const addBankCard = (data) =>{
	return request({
		url: '/pay/pays/user/addBankCard',
		method: 'post',
		data
	})
}

//获取银行卡列表
export const querySelfBankCard = (data) =>{
	return request({
		url: '/pay/pays/user/querySelfBankCard',
		method: 'post',
		data
	})
}

//收获地址列表
export const addressList = (data) =>{
	return request({
		url: '/trade/bargain/addressList',
		method: 'post',
		data
	})
}

//添加收获地址
export const saveAddress = (data) =>{
	return request({
		url: '/trade/bargain/saveAddress',
		method: 'post',
		data
	})
}

//删除收获地址
export const setDeleteAddress = (data) =>{
	return request({
		url: '/trade/bargain/deleteAddress/' + data, 
		method: 'post',
	})
}

//获取原手机号验证码
export const phoneCaptcha = (data) =>{
	return request({
		url: '/system/user/phoneCaptcha',
		method: 'post',
		data
	})
}

//提交原手机号验证
export const confirmPhoneCaptcha = (data) =>{
	return request({
		url: '/system/user/confirmPhoneCaptcha',
		method: 'post',
		data
	})
}

//修改企业实名信息
export const updateBusinessAccountInfo = (data) =>{
	return request({
		url: '/pay/pays/user/updateBusinessAccountInfo',
		method: 'post',
		data
	})
}

//升级至企业实名信息
export const upgradeBusinessAccount = (data) =>{
	return request({
		url: '/pay/pays/user/upgradeBusinessAccount',
		method: 'post',
		data
	})
}

//获取支行
export const selectByHeadOfficeCodeAndCity = (data) =>{
	return request({
		url: '/pay/bankCard/noToken/selectByHeadOfficeCodeAndCity',
		method: 'post',
		data
	})
}

// 获取会员积分
export const myTotalPoint = (data) => {
	return request({
		url: '/member/record/myTotalPoint',
		method: 'get',
		data
	})
}

//活动展示开关
export const ActiveShow = (data) =>{
	return request({
		url: '/lottery/activity/noToken/show',
		method: 'get',
		data
	})
}

//立即投注
export const activeJoin = (data) =>{
	return request({
		url: '/lottery/activity/join',
		method: 'post',
		data
	})
}

//抽奖活动内容
export const current = (data) =>{
	return request({
		url: '/lottery/activity/current',
		method: 'post',
		data
	})
}

//历史中奖记录
export const historyWinners = (data) => {
	return request({
		url: '/lottery/award/historyWinners',
		method: 'post',
		data
	})
}

//我的本期活动的抽奖码及中奖概率
export const myLotteryCode = (data) => {
	return request({
		url: '/lottery/activity/myLotteryCode',
		method: 'post',
		data
	})
}

//首次参与活动的用户送一张抽奖码
export const sendLotteryCode = (data) =>{
	return request({
		url: '/lottery/activity/sendLotteryCode',
		method: 'post',
		data
	})
}

//邀请好友免费的积分，统计
export const invitedUserStatistic = (data) => {
	return request({
		url: `/lottery/activity/invitedUserStatistic/${data}`,
		method: 'post'
	})
}

//最新的10个投注列表
export const last10Wagers = (data) => {
	return request({
		url: `/lottery/activity/last10Wagers/${data}`,
		method: 'post'
	})
}

//获取抽奖总积分
export const toWager = (data) => {
	return request({
		url: '/lottery/point/toWager',
		method: 'get',
		data
	})
}

//我的签到列表
export const myCheckIn = (data) => {
	return request({
		url: `/lottery/task/myCheckIn?activityId=${data}`,
		method: 'post',
	})
}

//签到按钮
export const checkIn = (data) => {
	return request({
		url: '/lottery/task/checkIn?activityId=' + data,
		method: 'post',
	})
}

//获取邀请凭证
export const taskToInvite = () => {
	return request({
		url: '/lottery/task/toInvite',
		method: 'get'
	})
}

//银行卡提现
export const settlementEnashment = (data) =>{
	return request({
		url: '/pay/pays/user/settlementEnashment',
		method: 'post',
		data
	})
}

//提现，交易，赔付记录
export const queryAccountFlow = (data) =>{
	return request({
		url: '/pay/pays/user/queryAccountFlow',
		method: 'post',
		data
	})
}

//我买到的订单列表
export const buyList = (data) =>{
	return request({
		url: '/order/orderBuyer/list',
		method: 'post',
		data
	})
}

//获取订单号
export const savePublishOrder = (data) =>{
	return request({
		url: '/order/order/savePublishOrder',
		method: 'post',
		data
	})
}

//获取支付方式
export const getPayChannelConfig = (data) =>{
	return request({
		url: '/pay/pays/noToken/getPayChannelConfig',
		method: 'post',
		data
	})
}

//取消订单
export const cancelOrder = (data) =>{
	return request({
		url: '/order/orderBuyer/cancelOrder',
		method: 'post',
		data
	})
}

//提醒发货
export const urgSentItem = (data) =>{
	return request({
		url: '/order/orderBuyer/urgSentItem',
		method: 'post',
		data
	})
}

//提醒卖家支付保证金
export const urgMarginPay = (data) =>{
	return request({
		url: '/order/orderBuyer/urgMarginPay',
		method: 'post',
		data
	})
}

//订单详情
export const BuyerOrderDetail = (data) =>{
	return request({
		url: '/order/orderBuyer/orderDetail',
		method: 'post',
		data
	})
}

//申请售后
export const submitAfterSales = (data) => {
	return request({
		url: '/order/orderBuyer/submitAfterSales',
		method: 'post',
		data
	})
}

//平台介入
export const platformIntervention = (data) =>{
	return request({
		url: '/order/orderBuyer/platformIntervention',
		method: 'post',
		data
	})
}

//撤销售后
export const cancelAfterSales = (data) =>{
	return request({
		url: '/order/orderBuyer/cancelAfterSales',
		method: 'post',
		data
	})
}

//我卖出的订单列表
export const orderSeller = (data) =>{
	return request({
		url: '/order/orderSeller/list',
		method: 'post',
		data
	})
}

//提醒退款物流收货
export const urgShipAfterSaleItems = (data) =>{
	return request({
		url: '/order/orderBuyer/urgShipAfterSaleItems',
		method: 'post',
		data
	})
}

//上传举证
export const uploadEvidence = (data) =>{
	return request({
		url: '/order/order/noToken/uploadEvidence',
		method: 'post',
		data: data
	})
}

//确认收货
export const receiveOrderItems = (data) =>{
	return request({
		url: '/order/orderBuyer/receiveOrderItems',
		method: 'post',
		data: data
	})
}

//我卖出的取消订单
export const soldCancelOrder = (data) =>{
	return request({
		url: '/order/orderSeller/cancelOrder',
		method: 'post',
		data
	})
}

//提醒收货
export const urgReceiptOrderItems = (data) =>{
	return request({
		url: '/order/orderSeller/urgReceiptOrderItems',
		method: 'post',
		data
	})
}

//取消发货
export const cancelShipOrderItems = (data) =>{
	return request({
		url: '/order/orderSeller/cancelShipOrderItems',
		method: 'post',
		data
	})
}

//提醒退货
export const urgAfterSaleSentItem = (data) =>{
	return request({
		url: '/order/orderSeller/urgAfterSaleSentItem',
		method: 'post',
		data
	})
}

//确认收货确认退款
export const confirmReturnItem = (data) =>{
	return request({
		url: '/order/orderSeller/confirmReturnItem',
		method: 'post',
		data
	})
}

//同意/拒绝售后
export const confirmAfterSales = (data) =>{
	return request({
		url: '/order/orderSeller/confirmAfterSales',
		method: 'post',
		data
	})
}

//我卖出的订单详情
export const sellOrderDetail = (data) =>{
	return request({
		url: '/order/orderSeller/orderDetail',
		method: 'post',
		data
	})
}

//热点直击
export const hotlist2 = (data) =>{
	return request({
		url: '/publish/hotspot/noToken/hotList2',
		method: 'post',
		data
	})
}

//热点详情
export const hotView = (data) =>{
	return request({
		url: '/publish/hotspotGrail/noToken/hotView?id=' + data,
		method: 'post'
	})
}

//最新成交价
export const bankClosedDay = (data) =>{
	return request({
		url: '/publish/hotspotGrail/noToken/closedDay',
		method: 'post',
		data
	})
}

//市价
export const hotPrice = (data) =>{
	return request({
		url: `/publish/hotspotGrail/noToken/hotPrice?productCategoryId=${data.productCategoryId}&consecutiveType=${data.consecutiveType}`,
		method: 'post'
	})
}

//纸币：卖盘、买盘、成交盘列表
export const hotspotQuery = (data) =>{
	return request({
		url: '/publish/hotspot/noToken/querySouvenir',
		method: 'post',
		data: data
	})
}

// 热点大盘-二级页面
export function closedDPDayDetail(data) {
	return request({
		url: '/publish/hotspotGrail/noToken/closedDayDetail',
		method: 'post',
		data
	})
}

// 热点大盘-当日成交列表
export function dpRecords(data) {
	return request({
		url: '/publish/hotspotGrail/noToken/records',
		method: 'post',
		data
	})
}

// 查询标签列表
export function getMoneyItemList(params) {
	return request({
		url: '/product/dictionaryItem/noToken/getMoneyItems',
		method: 'get',
		params
	})
}

//发货
export const sendShipCode = (data) =>{
	return request({
		url: '/order/orderSeller/shipOrderItems',
		method: 'post',
		data
	})
}

//退货
export const returnShipment = (data) =>{
	return request({
		url: '/order/orderBuyer/returnShipment',
		method: 'post',
		data
	})
}

//查看物流
export const queryMapView = (data) =>{
	return request({
		url: '/order/kd100/noToken/queryMapView',
		method: 'post',
		data
	})
}

//邮票列表
export const stampCategoryList = (data) =>{
	return request({
		url: '/publish/stamp/stampCategoryList',
		method: 'get',
		data
	})
}

//邮票列表
export const stampCategory = (data) =>{
	return request({
		url: '/publish/stamp/stampCategory',
		method: 'get',
		data
	})
}

//资讯裂变
export const noticList = (data) =>{
		return request({
			url: '/system/notice/noToken/noticeList',
			method: 'get',
			data
		})
}

export const wxLogin = (data) =>{
	return request({
		url: '/lottery/h5/noToken/login?code=' + data.code,
		method: 'post',
	})
}

export const wxPhone = (data) =>{
	return request({
		url: `/lottery/h5/getuserphonenumber?phone=${data.phone}&openId=${data.openId}&code=${data.code}`,
		method: 'post',
	})
}

