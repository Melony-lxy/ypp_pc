import request from "@/api/request";

//混合支付
export const payScan = (data) => {
	return request({
		url: '/order/order/accessPaymentPage',
		method: 'post',
		data: data
	})
}

// 保证金支付
export const accessMarginPaymentPage = (data) => {
	return request({
		url: '/order/order/accessMarginPaymentPage',
		method: 'post',
		data: data
	})
}

//发布支付
export const grailAccessMarginPaymentPage = (data) => {
	return request({
		url: '/publish/publish_souvenir_coin_order/accessMarginPaymentPage',
		method: 'post',
		data: data
	})
}

//寄售支付
export const payWarehouseOrderAmount = (data) => {
	return request({
		url: '/order/warehouseOrder/payWarehouseOrderAmount',
		method: 'post',
		data: data
	})
}

//调用批量订单支付
export const accessCartPaymentPage = (data) => {
	return request({
		url: '/order/order/accessCartPaymentPage',
		method: 'post',
		data: data
	})
}