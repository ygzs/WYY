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
            let {name,link} = data
            let singerSongType = name.split('.')
            let singerSong = singerSongType[0]
            let singerAndSong = singerSong.split('-')
            data = {songName:singerAndSong[1],
                    singer:singerAndSong[0],
                    link:link}
            let html = this.template
            placeholder.map((item)=>{
                html = html.replace(`**${item}**`,data[item])
            })
            $(this.el).append(html)
        },
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents:function(){
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
            })
        },
    }
    controller.init(view,model)
}