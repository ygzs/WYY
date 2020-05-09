{
    let view = {
        el:'.bottom>ul',
        template:`
        <li>
            <div class="row">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dian"></use>
                 </svg>
                <p>**songName**</p>
            </div>
            <p>歌手：**singer**</p>
            <p>链接：**link**</p>
        </li>
        `,
        render(data){
            let placeholder = ['songName','singer','link']
            let html = this.template
            placeholder.map((item)=>{
                html = html.replace(`**${item}**`,data[item])
            })
            $(this.el).append(html)
        },
    }
    let model = {
        data:{}
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents:function(){
            window.eventHub.on('apply',(data)=>{
                this.model.data = data 
                this.view.render(this.model.data)
            })
        },
    }
    controller.init(view,model)
}