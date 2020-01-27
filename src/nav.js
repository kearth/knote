layui.use(['laytpl', 'element'], function(){ var laytpl = layui.laytpl; // nav 数据
    var laytpl = layui.laytpl
    var element = layui.element
    // nav 数据
    var navData = { 
        'list': [
            {name: '收藏夹', src:'./tpl/bookmark/bookmark.html'}, 
            {name: '工具集', src:'./tpl/utils/utils.html'}
        ]
    }
    var navTpl = nav.innerHTML;
    var navUl = document.getElementById('navUl');
    laytpl(navTpl).render(navData, function(html){
        navUl.innerHTML = html
    });
    // 重新渲染 nav
    element.render('nav');
    var cardTpl = cardName.innerHTML;
    var iframe = document.getElementById('iframeId');
    iframe.src = navData.list[0].src;
    laytpl(cardTpl).render(navData.list[0].name, function(string){ 
        cardName.innerHTML = string
    });
    // 动态渲染面板名称
    element.on('nav(navUl)', function(data){
        laytpl(cardTpl).render(data[0].innerText, function(string){ 
            cardName.innerHTML = string 
        });
        layui.each(navData.list, function(index, value){
            if (value.name == data[0].innerText) {
                iframe.src = value.src;
            }
        });
    });
});
