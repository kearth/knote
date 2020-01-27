// 初始化配置
layui.config({
    base: '../../src/utils/', // 自定义模块路径
    version: '1575889601624' // 为了更新 js 缓存，可忽略
});

// 执行渲染
layui.use(['layer', 'form', 'element', 'table', 'localData'], function(){
    var layer = layui.layer;
    var localdata = layui.localData;
    var table = layui.table;
    var form = layui.form;
    // 表格渲染
    table.render({
        title: '收藏栏',
        size: 'lg',
        text: {none:'暂无数据'},
        elem: '#userTable', //指定原始表格元素选择器（推荐id选择器）
        data: localdata.query("userTable"),
        id: 'userTableId',
        toolbar: '#leftHeaderBar',
        defaultToolbar:['exports', 'print'],
        loading: false,
        initSort: {
            field: 'level',
            type: 'desc'
        },
        cols: [[
            {field: 'number', title: '编号', width:'5%', type:'numbers'},
            {field: 'action', title: '功能', width:'25%', edit:'text'},
            {field: 'level', title: '优先级', width:'7%', sort: true, edit:'text'},
            {field: 'link', title: '链接', width:'58%', templet:'#link', edit:'text'},
            {field: 'operate', title: '操作', width:'5%', toolbar:'#bar'} 
        ]], //设置表头
        page: {theme: '#c00'} 
    });

    //工具栏事件
    table.on('toolbar(table)', function(obj){
        switch(obj.event){
            case 'add':
                //var pathName=window.document.location.pathname;
                layer.open({
                    type: 2,
                    title: '新增',
                    content:'./bookmarkform.html',
                    skin:'layui-layer-molv',
                    area:['600px', '290px'],
                    maxmin:true,
                    end: function(){
                        tableRefresh();
                    }
                });
                break;
        };
    });
    // 绑定删除事件
    table.on('tool(table)', function(obj){
        var delId =  obj.data.id;
        switch(obj.event){
            case 'del':
                layer.confirm('确定要删除么?', function(index){
                    localdata.remove('userTable', delId);
                    layer.close(index);
                    tableRefresh();
                });
                break;
        }
    });

    // 表格编辑
    table.on('edit(table)', function(obj){
        localdata.update('userTable', obj.data);
        tableRefresh();
    });


    // 表格刷新
    function tableRefresh(){
        table.reload('userTableId', {
            data: localdata.query("userTable"),
            page: {
                curr: 1
            }
        });
    }

    //监听子页面的postMessage
    function receiveMessage(event) {
        // 关闭
        layer.close(layer.index);
    }
    window.addEventListener('message', receiveMessage, false);
});
