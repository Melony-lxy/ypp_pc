import base_url from "@/api/http.js";
import { useGlobalStore } from "@/store/store";
import { ProhibitScroll } from "@/utils/scroll";
// 全局请求封装
// const base_url = 'http://localhost:996'
// 请求超出时间
const timeout = 30000
// 需要修改token，和根据实际修改请求头
const request = (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	
	let header = {
		'Authorization': 'Bearer ' + uni.getStorageSync('token'),
		'Content-Type': 'application/json',
		'appversion': '2.0.8'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/behind' + url,
			method: method,
			header: header,
			data: data,
            timeout,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				if (res.statusCode == 200) {
					if(res.data.code == 401){
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						setTimeout(()=>{
							uni.showToast({
								title: '请登录',
								icon: 'none',
							})	
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/index/index'
								})
								const globalStore = useGlobalStore()
								globalStore.updataShow(true)
								ProhibitScroll()
							},1000)
						})
					}else if(res.data.code == 200 || !res.data.code){
						resolve(res.data);
					}else{
						setTimeout(()=>{
							// reject(res.data)
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						})
						// console.log(res.data);
					}
				} else {
					uni.clearStorageSync()
					switch (res.statusCode) {
						case 401:
							uni.showModal({
								title: "提示",
								content: "请登录",
								showCancel: false,
								success() {},
							});
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								icon:'none'
							})
							break;
						default:
							uni.showToast({
								title: '请重试...',
								icon:'none'
							})
							break;
					}
				}
			},
			fail(err) {
				console.log(err)
				reject(err);
				if (err.errMsg.indexOf('request:fail') !== -1) {
					uni.showToast({
						title: '网络异常',
						icon: "error",
						icon:'none'
					})
				} else {
					uni.showToast({
						title: '未知异常',
						icon:'none'
					})
				}
			},
			complete() {
				// 不管成功还是失败都会执行
				// uni.hideLoading();
				// uni.hideToast();
			}
		});
	}).catch(() => {});
};

export default request;