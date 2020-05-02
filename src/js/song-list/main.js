{
    let view = {
        el:'.page>.bottom>ul',
        template:`
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
        `,
        render(data){
            data.map((index)=>{
                let html = this.template
                let placeholder = ['songName','singer']
                placeholder.map((item)=>{
                    html = html.replace(`**${item}**`,index[item])
                })
                let li =  $(`<li></li>`).html(html)
                $(this.el).append(li)
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
            this.initLeanCloud()
            this.bianEvents()
        },
        initLeanCloud(){
            AV.init({
                appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
                appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
                serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
            })
        },
        bianEvents(){
            this.model.fetch()
            .then((songs)=>{
                let data = [] 
                songs.map((song)=>{
                    data.push(song.attributes)
                })
                this.model.data = data
            })
            .then(()=>{
                this.view.render(this.model.data)
            })
        },
    }
    controller.init(view,model)
}