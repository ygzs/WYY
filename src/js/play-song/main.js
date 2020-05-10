{
    let view = {
      el: '#app',
      init(){
        this.$el = $(this.el)
      },
      render(data){
        let {song} = data
        //this.$el.css('background', `url(${song.cover})`)
        this.$el.find('.song-picture>img').attr('src',song.cover)
        this.$el.find('audio').attr('src',song.link)
        this.$el.find('.songName').text(song.songName)
        this.$el.find('.singer').text(song.singer)
        /* lyric */
        let {lyric} = song
        let array = lyric.split('\n').map((string)=>{
          let p = $(`<p></p>`)
          let regex = /\[([\d:.]+)\](.+)/
          let matches = string.match(regex)
          if(matches){
            p.text(matches[2])
            let time = matches[1]
            let parts = time.split(':')
            let minutes = parts[0]
            let seconds = parts[1]
            let newTime = parseInt(minutes,10) * 60 + parseFloat(seconds,10)
            p.attr('data-time', newTime)
          }
          this.$el.find('.song-lyric>ol').append(p )
        })
      },
      play(){
        this.$el.find('audio')[0].play()
      },
      pause(){
        this.$el.find('audio')[0].pause()
      }
    }
    let model = {
      data:{
        song: {
          id: '',
          songName: '',
          singer: '',
          link: '',
          cover:''
        },
        status: 'paused'
      },
      get(id){
        var query = new AV.Query('Songs')
        return query.get(id).then((song)=>{
          Object.assign(this.data.song, {id: song.id, ...song.attributes})
          return song
        })
      }
    }
    let controller = {
      init(view, model){
        this.view = view 
        this.view.init()
        this.model = model
        this.initLeanCloud()
        this.bindEvents()
        let id = this.getSongId()
        this.model.get(id).then(()=>{
          this.view.render(this.model.data)
        })
      },
      initLeanCloud(){
        AV.init({
            appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
            appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
            serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
        })
      },
      getSongId(){
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
      bindEvents(){
        this.view.$el.on('click','.tagged-icon-1',()=>{
          $('.key').addClass('active')
          this.view.play()
        })
        this.view.$el.on('click','.tagged-icon-2',()=>{
          $('.key').removeClass('active')
          this.view.pause()
        })
      },
    }
    controller.init(view, model)
  }
  