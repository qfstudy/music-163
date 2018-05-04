
1.发布/订阅模式
---
```
window.eventHub={
    events:{
        // 'eventName':[fn],
    },//hash
    // init(){},
    emit(eventName,data){//发布
        for(let key in this.events){
            if(key===eventName){
                let fnList=this.events[key]
                fnList.map((fn)=>{
                    fn.call(undefined,data)
                })
            }
        }
    },
    on(eventName,fn){//订阅
        if(this.events[eventName]===undefined){
            this.events[eventName]=[]
        }
        this.events[eventName].push(fn)
    }
    // off(){}
}
```
一个可供全局调用的对象里面有三个对象
第一个对象里面存放的是事件
第二个对象是发布功能的对象，主要是执行对应的订阅函数
第三个对象是订阅，把订阅的方法都保存到事件对象中

---
2.mvc思想
---
```
{
    let view={
        el: '.newSong',
        template: `
            新建歌曲
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.active()
            window.eventHub.on('upload',(data)=>{
               this.active()
            })
        },
        active(){
            $(this.view.el).addClass('active')
        }
    }
    controller.init(view,model)
}
```
才用ES6的语法`{ }`构建私有作用域
这个私有作用域里面有view/model/controller三个对象
view控制页面显示
model负责管理数据
controller主要是处理数据

----
当上传的模块上传歌曲是，song-form/song-list/new-song都会产生变化，所以这三个模块就会订阅上传事件，当upload模块上传时就会发布上传事件，然后对应的订阅中的上传事件就会执行。