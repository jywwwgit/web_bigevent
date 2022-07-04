$(function () { 
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 导入模板引擎渲染表格数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理的方式给 form-add 表单绑定提交事件
    $('body').on('submit','#form-add',function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 通过ajax发请求
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('添加图书失败！')
                }
                initArtCateList()
                layer.msg('添加图书成功！')
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    // 通过代理的方式给 btn-edit 表单绑定提交事件
    $('tbody').on('click','#btn-edit',function(e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        // 发起ajax请求更新编辑表单数据
        var id = $(this).attr('data-Id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            data: $(this).serialize(),
            success: function(res) {  
                form.val("form-edit",res.data)
            }
        })
    })

    // 通过代理方式，为修改分类的表单绑定submit事件
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新图书失败！')
                }
                layer.msg('更新图书成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    
    // 通过代理方式，为删除按钮绑定点击事件
    $('tbody').on('click','#btn-delete',function() {
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            })
        })
    })
})