import wepy from 'wepy'
import _ from 'lodash'
// import Promise from 'bluebird'

const isSuccess = res => res.code !== undefined && res.code !== null && (Number(res.code) === 1)

const resFormat = res => res.response || {}

export default function request (config = {}) {
  return new Promise(function (resolve, reject) {
    let options = config

    options.url = `https://www.baidu.com${options.url}` // 替换项目请求的域名

    if (options.setToken) {
      const token = wepy.getStorageSync('numinfo').token
      options.header = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    const defaults = {
      url: '',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: (res) => {
        if (!isSuccess(res.data)) {
          wepy.showToast({
            title: res.data.msg || '网络错误',
            icon: 'none'
          })
          reject(res.data.msg)
        }
        resolve(resFormat(res.data))
      },

      fail: (error) => {
        wepy.showToast({
          title: error.msg || '网络错误',
          icon: 'none'
        })
        reject(error)
      }
    }

    options = _.assign(defaults, options)

    wepy.request(options)
  })
}
