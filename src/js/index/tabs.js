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