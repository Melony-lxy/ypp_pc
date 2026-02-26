export const uploadImage = (options = {}) => {
  const {
    count = 1,
    serverUrl = '/behind/file/upload',
    header = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  } = options;
	
	
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      success: (chooseRes) => {
        const tasks = chooseRes.tempFilePaths.map(path => {
          return new Promise((uploadResolve, uploadReject) => {
            uni.uploadFile({
              url: serverUrl,
              header,
              filePath: path,
              name: 'file',
              success: (res) => {
                try {
                  const response = JSON.parse(res.data);
                  const result = {
                    url: response.data.url,
                    name: response.data.name
                  };
                  
                  uploadResolve(result);
                } catch (e) {
                  uploadReject(new Error('响应解析失败: ' + e.message));
                }
              },
              fail: (err) => {
                uploadReject(new Error('上传失败: ' + err.errMsg));
              }
            });
          });
        });
 
        // 聚合所有任务
        Promise.all(tasks)
          .then(results => resolve(results))
          .catch(reject);
      },
      fail: (err) => {
        reject(new Error('图片选择失败: ' + err.errMsg));
      }
    });
  });
};