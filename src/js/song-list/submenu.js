{
    let view = {
        el:'#submenu',
        init(){
            this.$el = $(this.el)
        },
        template:`
            <p>编辑歌曲</p>
            <form class="edit" id="edit">
                <div class="row">
                    <label>歌名</label>
                    <input name="songName" type="text">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input name="singer" type="text">
                </div>
                <div class="row">
                    <input type="submit">
                </div>
            </form>
        `,
        render(){
            $(this.el).html(this.template)
        }
    }
    let model = {
        data:[],
        editSong(data){
            const song = AV.Object.createWithoutData('Songs', this.data[0])
            let placeholder = ['songName','singer']
            placeholder.map((item)=>{
                song.set(item, data[item])
            })
            return song.save()
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.view.render()
            this.bindEvents()
            this.submit()
        },
        bindEvents(){
            window.eventHub.on('emerge',(data)=>{
                $('#submenu').show()
                setTimeout(()=>{
                    $(document).one('click',()=>{
                        $('#submenu').hide()
                    })
                },0)
                $('#submenu').on('click',(x)=>{
                    x.stopPropagation()
                })
                this.model.data = data
            })
        },
        submit(){
            this.view.$el.on('submit','#edit',(x)=>{
                x.preventDefault()
                $('#submenu').hide()
                let needs = 'songName singer'.split(' ')
                let data = {} 
                needs.map((string)=>{ 
                    data[string] = this.view.$el.find(`[name="${string}"]`).val() 
                }) 
                this.model.editSong(data)
                .then((newdata)=>{
                    let object = JSON.parse(JSON.stringify(newdata))
                    object.index = this.model.data[1]
                    window.eventHub.trigger('update',object)
                })
            })
        },
    }
    controller.init(view,model)
}