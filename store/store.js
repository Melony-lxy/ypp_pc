import {
	defineStore
} from 'pinia'

export const useGlobalStore = defineStore('global', {
	state: () => ({
		show: false,
		userInfo: {},
		cdn_Imgurl: 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com/yipinpin_com',
		// cdn_Imgurl: ''
	}),
	actions: {
		updataShow(newShow) {
			this.show = newShow
		},
		upUserInfo(newInfo) {
			this.userInfo = newInfo
			uni.setStorageSync('userInfo',newInfo)
		},
		upImageuler(newImg) {
			return this.cdn_Imgurl + newImg
		}
	}
})