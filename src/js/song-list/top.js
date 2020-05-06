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
            this.view.$el.on('click',()=>{
                console.log(111111);
                $.get('/src/index')
                    .then((result)=>{
                        $('#page').html(result)
                        $('#page').find(`li[data-page-name="third-page"]`).addClass('active')
                        $('#backContent').addClass('active')
                    })
                
            })
        }
    }
    controller.init(view,model)
}