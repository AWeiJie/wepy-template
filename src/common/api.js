import request from './request'

export default {
  // 发送微信code到后台 获取 session3rd
  getSession3rd: (code, encryptedData, iv, type) => {
    return request({
      url: '', // 请求的URL
      data: {
        code,
        encryptedData,
        iv,
        type
      }
    })
  },

  // POST测试
  test: (username, password, session3rd) => {
    return request({
      url: '', // 请求的URL
      data: {
        username,
        password,
        session3rd
      },
      method: 'POST',
      setToken: true // 带token请求
    })
  }
}
