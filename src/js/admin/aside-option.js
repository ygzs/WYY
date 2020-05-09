{
    let view = {
        el:'aside>.option',
        init(){
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            let $songList = this.view.$el.find('.icon').eq(0)
            $songList.on('click',()=>{
                window.location.href = './song-list.html'
            })
            let $index = this.view.$el.find('.icon').eq(1)
            $index.on('click',()=>{
                window.location.href = './index.html'
            })
        }
    }
    controller.init(view,model)
}