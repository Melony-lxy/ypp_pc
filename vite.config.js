import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(() => {
	return {
		// base: '/ypp_test',
		server: {
			port: '3003',
			proxy: {
				//调用mock假数据方便测试
				// '^/apibehind/.*(consignRecordIn111|storageOrderList111|queryUserFloatStock111|isShow111).*': {
				// 	// target: 'https://m1.apifoxmock.com/m1/4941976-4599558-default',
				// 	target: 'http://192.168.1.66:4523/m1/4941976-4599558-default',
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/apibehind/, ''),
				// },
				//调用正常后端上线接口
				'/behind': {
					// target: 'https://www.yipinhui.shop/behind', 
					target: 'http://1.15.232.172:8080',
					changeOrigin: true, // 是否允许跨域
					rewrite: (path) => path.replace(/^\/behind/, ''),
				},
				'/sns': {
					target: 'https://api.weixin.qq.com/sns',
					changeOrigin: true, // 是否允许跨域
					rewrite: (path) => path.replace(/^\/sns/, ''),
				},
				'/font': {
					target: 'https://ypp-china-1325306284.cos.ap-shanghai.myqcloud.com',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/font/, '/yipinpin_com/static/font')
				}
			},
		},
		plugins: [
			uni()
		],
	} 
})