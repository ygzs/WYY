{
    let view = {
        el:'.siteNav',
        init(){
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.back()
            this.initLeanCloud()
            this.bindEvents()
        },
        initLeanCloud(){
            AV.init({
                appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
                appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
                serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
            })
        },
        back(){
            let display = localStorage.getItem('display')
            if(display === '0'){
                $('.siteNav').find(`li[data-page-name="third-page"]`).addClass('active')
                $('.siteNav').find(`li[data-page-name="first-page"]`).removeClass('active')
                $('.third-page').addClass('active')
                $('.first-page').removeClass('active')
                localStorage.clear()
            }else{
                $('.siteNav').find(`li[data-page-name="first-page"]`).addClass('active')
                $('.first-page').addClass('active')
            }
        },
        bindEvents(){
            this.view.$el.on('click','.tabItems>li',(e)=>{
                let $li = $(e.currentTarget)
                let pageName = $li.attr('data-page-name')
                $li.addClass('active')
                    .siblings().removeClass('active')
                window.eventHub.trigger('selectTab',pageName)
            })
        }
    }
    controller.init(view,model)
}