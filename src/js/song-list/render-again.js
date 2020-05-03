{
    let view = {
        el:'.page>.bottom>ul',
        renderAgain(data){
            let index = data.index
            let html = $(this.el).get(0)
            let selectli = $(html).find('li').eq(index)
            let content = $(selectli).find('p')
            $(content[0]).text(data.songName)
            $(content[1]).text('歌手：'+ data.singer)
        }
    }
    let model = {
        newsong:[],
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.renderAgain()
        },
        renderAgain(){
            window.eventHub.on('update',(newdata)=>{
                let songs = this.model.newsong
                songs.songName = newdata.songName
                songs.singer = newdata.singer
                songs.index = newdata.index 
                this.view.renderAgain(this.model.newsong)   
            })
        }
    }
    controller.init(view,model)
}