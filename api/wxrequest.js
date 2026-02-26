export const wxrequest = (params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
			method: 'GET',
			data: {
				appid: 'wxe424d650232538f7',
				secret: '06afab78b5f6751529710002bc413f0e',
				code: params.code,
				grant_type: 'authorization_code'
			},
			timeout: 300,
			success(response) {
				resolve(response.data)
			},
			fail(err) {
				console.log(err)
				reject(err);
			},
			complete() {
				
			}
		});
	}).catch(() => {});
};

export const wxuserInfo = (params) =>{
	return new Promise((resolve,reject) =>{
		uni.request({
			url: 'https://api.weixin.qq.com/sns/userinfo',
			method: 'GET',
			data: params,
			timeout: 300,
			success(res) {
				resolve(res.data)
			},
			fail(error){
				reject(error)
			}
		})
	})
}

