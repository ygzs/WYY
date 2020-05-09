{
    let view = {
        el:'#submenu',
        init(){
            this.$el = $(this.el)
        },
        template: `
            <p>编辑歌曲</p>
            <form class="edit" id="edit">
                <div class="row">
                    <label>歌名</label>
                    <input name="songName" type="text" value="**songName**">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input name="singer" type="text" value="**singer**">
                </div>        
                <div class="row">
                    <label>封面</label>
                    <input name="cover" type="text" value="**cover**">
                </div>
                <div class="row">
                    <label>歌词</label>
                    <textarea name="lyric" cols="30" rows="5">**lyric**</textarea>
                </div>
                <div class="row">
                    <input type="submit">
                </div>
            </form>
        `,
        render(data = {}){
            let placeholders = ['songName', 'singer', 'cover', 'lyric']
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`**${string}**`, data[string] || '')
            })
            $(this.el).html(html)
        },
    }
    let model = {
        data:{},
        editSongAgain(data){
            this.data.lyric = data.lyric
            this.data.cover = data.cover
            let {songName,singer,link,cover,lyric} = this.data
            const Song = AV.Object.extend('Songs')
            const song = new Song()
            song.set('songName', songName)
            song.set('singer', singer)
            song.set('link', link)
            song.set('cover', cover)
            song.set('lyric', lyric)
            return song.save()
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.view.render()
            this.editSong()
            this.bindEvents()
        },
        editSong(){
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
            })
        },
        bindEvents(){
            this.view.$el.on('submit','#edit',(x)=>{
                x.preventDefault()
                let needs = 'songName singer cover lyric'.split(' ')
                let data = {} 
                needs.map((string)=>{ 
                    data[string] = this.view.$el.find(`[name="${string}"]`).val() 
                }) 
                this.model.editSongAgain(data)
                .then((newdata)=>{                
                    let object = JSON.parse(JSON.stringify(newdata.attributes))
                    window.eventHub.trigger('apply',object)
                })
            })
        },
    }
    controller.init(view,model)
}