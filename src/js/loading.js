{
    let view={
        el:'#siteLoading',
        show(){
            $(this.el).addClass('active')
            console.log('show')
        },
        hide(){
            $(this.el).removeClass('active')
            console.log('hide')
        }
    }
    let controller={
        init(view){
            this.view=view
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('beforeUpload',()=>{
                this.view.show()
            })
            window.eventHub.on('AFTERUpload',()=>{
                this.view.hide()
            })
        }
    }
}