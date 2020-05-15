{
    let view = {
        el:'.second-page',
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        },
        template:`
            <svg class="icon1" aria-hidden="true">
                <use xlink:href="#icon-music"></use>
            </svg>
            <div class="right">
                <p>**songName**</p>
                <p>歌手：**singer**</p>
            </div>
            <svg class="icon2" aria-hidden="true">
                <use xlink:href="#icon-tianjia2"></use>
            </svg>
        `,
        render(data){
            data.map((index)=>{
                let html = this.template
                let placeholder = ['songName','singer']
                placeholder.map((item)=>{
                    html = html.replace(`**${item}**`,index.attributes[item])
                })
                let li =  $(`<li></li>`).html(html).attr('song-id',index['id'])
                this.$el.find('.allsongs>ul').append(li)
            }) 
        },
    }
    let model = {
        data:[],
        fetch(){
            const query = new AV.Query('Songs');
            return query.find()
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.getAllSong()
            this.addSongToList()
        },
        bindEvents(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName === 'second-page'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        },
        getAllSong(){
            this.model.fetch()
            .then((songs)=>{
                let data = [] 
                songs.map((song)=>{
                    data.push({id:song.id,attributes:song.attributes})
                })
                this.model.data = data
            })
            .then(()=>{
                this.view.render(this.model.data)
            })
        },
        addSongToList(){
            this.view.$el.on('click','.allsongs .icon2',(e)=>{
                let selectedSongId = $(e.currentTarget).parent().attr('song-id')
                let query = new AV.Query('Songs')
                query.get(selectedSongId).then((song)=>{
                    song.set('parent','5ebd17eff6b47f0006108394')
                    song.save()
                    console.log(song);
                }).then(()=>{
                    alert('添加成功')
                })
            })
        },
    }
    controller.init(view,model)
}