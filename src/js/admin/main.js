{
    let view = {
        el:'main>ul',
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
            window.eventHub.on('upload',(data)=>{
                let {name,link} = data
                let singerSongType = name.split('.')
                let singerSong = singerSongType[0]
                let singerAndSong = singerSong.split('-')
                data = {songName:singerAndSong[1],
                        singer:singerAndSong[0],
                        link:link}
                this.model.data = data 
                this.view.render(data)
                let string = JSON.stringify(this.model.data)
                let object = JSON.parse(string)
                this.savemessage(object)
            })
        },
        savemessage:function(object){
            let {songName,singer,link} = object
            const Song = AV.Object.extend('Songs')
            const song = new Song()
            song.set('songName', songName)
            song.set('singer', singer)
            song.set('link', link)
            song.save()
        },
    }
    controller.init(view,model)
}