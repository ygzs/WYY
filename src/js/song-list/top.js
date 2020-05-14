{
    let view = {
        el:'.about',
        init(){
            this.$el = $(this.el)
        },
        template:`
            <img src="**picture**" height="115px" width="115px">
            <div class="text">
                <h3 class="songListName">**title**</h3>
                <h3 class="userName">ygzs</h3>
                <p class="introduction">**introduction**</p>
            </div>
        `,
        render(data){    
            let html = this.template
            html = html.replace(`**picture**`,data.attributes.Data.picture)
            html = html.replace(`**title**`,data.attributes.Data.title)
            html = html.replace(`**introduction**`,data.attributes.Data.introduction)
            this.$el.append(html)
        },
    }
    let model = {
        data:{},
        fetch(){
            const query = new AV.Query('SongList');
            return query.find()
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
           this.model.fetch()
            .then((data)=>{
                this.model.data = data[0]
                this.view.render(this.model.data)
            })
        },
    }
    controller.init(view,model)
}