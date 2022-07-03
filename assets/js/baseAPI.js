// 每次调用 $.get、$.post或$.ajax时，会先调用$.ajaxPrefilter()这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 给所有需要权限访问的接口添加请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空本地存储token
            localStorage.removeItem('token')
            //强制跳转页面
            location.href = '/login.html'
            }
    }
})