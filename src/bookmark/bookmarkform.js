// 初始化配置
layui.config({
    base: '../../src/bookmark/', // 自定义模块路径
    version: '1575889601624' // 为了更新 js 缓存，可忽略
});

// 执行渲染
layui.use(['laytpl', 'element', 'form', 'localData'], function(){
    var element = layui.element;
    var localdata = layui.localData;
    var laytpl = layui.laytpl;
    var form = layui.form;
    // 表单渲染
    var options = [
        {'level': '请选择', 'value':''},
        {'level': '1', 'value':'1'},
        {'level': '2', 'value':'2'},
        {'level': '3', 'value':'3'},
    ];
    var optionListTpl = optionList.innerHTML;
    var selectOption = document.getElementById('selectOption');
    laytpl(optionListTpl).render(options, function(html){
        selectOption.innerHTML = html;
    });
    form.render('select');
    form.on('submit(formSubmit)', function(data){
        localdata.add("userTable", data.field);
        parent.postMessage("close layer", "*");
        return false;
    });
});
    
