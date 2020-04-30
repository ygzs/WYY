{
    let view = {
        el:'main>ul',
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents(){}
    }
}