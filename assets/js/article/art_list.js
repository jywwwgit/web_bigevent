$(function() {
    var layer = layui.layer
    // 定义一个查询参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据，默认显示两条
        cate_id: '', //文章分类的id
        state: '' //文章发布的状态
    }
    initTable()
    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: "GET",
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 导入模板引擎拿到的数据来渲染
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }
})