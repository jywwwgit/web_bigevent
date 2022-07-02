// 每次调用 $.get、$.post或$.ajax时，会先调用$.ajaxPrefilter()这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})