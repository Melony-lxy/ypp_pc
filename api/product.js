import request from "@/api/request.js"

export function matchNumber(data, productType) {
	return request({
		url: '/product/loongBanknote/noToken/matchNumber3',
		method: 'post',
		data: JSON.stringify(data),
		productType
	})
}