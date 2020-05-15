{
    let view = {
        el:'.third-page',
        init(){
            this.$el = $(this.el)
        },
        template:`
            <a href="./song-list.html">
                <img src="**picture**" alt="">
                <p>**title**</p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow-right-copy-copy"></use>
                </svg>
            </a>
        `,
        render(data){
            data.map((index)=>{
                let html = this.template
                let placeholder = ['picture','title']
                placeholder.map((item)=>{
                    html = html.replace(`**${item}**`,index.attributes.Data[item])
                })
                let li =  $(`<li></li>`).html(html)
                this.$el.find('.songList>ol').append(li)
            })
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        }
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
            this.model = model
            this.view.init()
            this.model.fetch().then((data)=>{
                this.model.data = data
                this.view.render(this.model.data)  
            })
            this.bindEvents()
            this.makeSongList()
            this.jumpBack()
        },
        bindEvents(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName === 'third-page'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        },
        makeSongList(){
            this.view.$el.on('click','.main nav>.icon',()=>{
                $('#submenu').addClass('active')
                setTimeout(()=>{
                    $(document).one('click',()=>{
                        $('#submenu').removeClass('active')
                    })
                },0)
                $('#submenu').on('click',(x)=>{
                    x.stopPropagation()
                })
            })
            let data = {}
            let $avatarUpload = $('#avatar-upload')
                $avatarUpload.on('change',()=>{
                    let localFile = $avatarUpload[0].files[0]
                    var reader = new FileReader()
                    reader.readAsDataURL(localFile)
                    reader.onload = function(){
                        $('.avatar-img').attr("src",this.result)
                        data.picture = this.result
                    }
                })
            let $form = this.view.$el.find('.edit')
            $form.on('submit',(e)=>{
                e.preventDefault()
                let needs = 'title introduction'.split(' ')
                needs.map((string)=>{ 
                    data[string] = $form.find(`[name="${string}"]`).val()
                })
                let SongList = AV.Object.extend('SongList')
                const songlist = new SongList()
                songlist.set('Data',data)
                songlist.save().then((data)=>{
                    this.view.render(data)
                    $('#submenu').removeClass('active')
                })
            })
        },
        jumpBack(){
            this.view.$el.on('click','.songList li>a',()=>{
                localStorage.setItem('display','0')
            })
        }
    }
    controller.init(view,model)
}