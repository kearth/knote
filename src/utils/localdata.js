;layui.define(function(exports){
    // 模块名
    var modName = "localData";
    // 对外接口
    var obj = function(){
        this.config = {
            dataName: "userLocalData"
        }
    }
    // 增加一个数据,不存在自动建表
    obj.prototype.add=function(k, v) {
        var arr = this.query(k); 
        if (Array.isArray(arr)) {
            v.id = arr.length;
            arr.push(v);
        } else {
            v.id = 0;
            arr = [v];
        }
        layui.data(this.config.dataName, {
            key: k,
            value: arr 
        });
    }
    // 删除一个数据 
    obj.prototype.remove=function(k, i) {
        var arr = this.query(k); 
        arr.splice(i, 1);
        layui.data(this.config.dataName, {
            key: k,
            value: arr 
        });
    }
    // 更新一个数据 
    obj.prototype.update=function(k, v) {
        var arr = this.query(k); 
        arr.splice(v.id, 1, v);
        layui.data(this.config.dataName, {
            key: k,
            value: arr 
        });
    }
    // 查询一个数据
    obj.prototype.query=function(k) {
        var d = layui.data(this.config.dataName);
        return d[k];
    }
    // 导出对外接口
    exports(modName, new obj);   
});
