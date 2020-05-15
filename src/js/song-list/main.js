{
    let view = {
        el:'.page>.bottom>ul',
        template:`
            <a href="./play-song.html?id=**songId**">
            <svg class="icon1" aria-hidden="true">
                <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
            <div class="right">
                <p>**songName**</p>
                <p>歌手：**singer**</p>
            </div>
            <svg class="icon2" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
            </a>
        `,
        render(data){
            data.map((index)=>{
                let html = this.template
                let placeholder = ['songName','singer']
                placeholder.map((item)=>{
                    html = html.replace(`**${item}**`,index.attributes[item])
                    html = html.replace(`**songId**`,index.id)
                })
                let li =  $(`<li></li>`).html(html).attr('song-id',index['id'])
                $(this.el).append(li)
            }) 
        },
        active(dom){
            let $li = $(dom)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        },
    }
    let model = {
        data:[],
        fetch(id){
            const query = new AV.Query('Songs')
            query.equalTo('parent', id)
            return query.find()
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.initLeanCloud()
            //this.bianEvents()
            let id = this.getlistId()
            this.model.fetch(id).then((songs)=>{
                console.log(songs);
                
                let data = [] 
                songs.map((song)=>{
                    data.push({id:song.id,attributes:song.attributes})
                })
                this.model.data = data
            }).then(()=>{
                this.view.render(this.model.data)
            })
            this.clickEvents()
        },
        initLeanCloud(){
            AV.init({
                appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
                appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
                serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
            })
        },
        /*bianEvents(){
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
        },*/
        getlistId(){
            let search = window.location.search
            if(search.indexOf('?') === 0){
              search = search.substring(1)
            }
            let array = search.split('&').filter((v=>v))
            let id = ''
            for(let i = 0 ;i<array.length; i++){
              let kv = array[i].split('=')
              let key = kv[0]
              let value = kv[1]
              if(key ==='id'){
                id = value
                break
              }
            }
            return id
          },
        clickEvents(){
            $(this.view.el).on('click','li',(e)=>{
                this.view.active(e.currentTarget)
            })
            $(this.view.el).on('click','.icon2',(e)=>{
                e.preventDefault()
                let $svg = $(e.currentTarget).parent().parent()
                let index = $svg.index()
                let data = []
                data[0] = $svg.attr('song-id')
                data[1] = index
                window.eventHub.trigger('emerge',data)
            })
        }, 
    }
    controller.init(view,model)
}