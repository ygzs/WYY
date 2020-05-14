{
    let view = {
        el:'#back',
        init(){
            this.$el = $(this.el)
        },
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
            this.view.$el.on('click',(e)=>{
                e.preventDefault()
                history.back()
                /*history.pushState({},null,'index.html')
                $.get('/src/index')
                    .then((result)=>{
                        $('#page').html(result)
                        history.pushState(result,null,'index.html')
                        $('#page').find(`li[data-page-name="third-page"]`).addClass('active')
                        $('#page').find(`li[data-page-name="first-page"]`).removeClass('active')
                        $('.third-page').addClass('active')
                        $('.first-page').removeClass('active')
                    }).then(()=>{
                        $('.tabItems').on('click','li',()=>{
                            window.location.href = '/src/index.html'
                        })
                    })*/
            })
        },
    }
    controller.init(view,model)
}