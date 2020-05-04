{
    let view = {
        el:'aside>.uploadArea',
        show(){
            $('#loading').addClass('active')
        },
        hide(){
            $('#loading').removeClass('active')
        }
    }
    let model = {
        status:'open'
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.initLeanCloud()
            this.bindEvents()
        },
        initLeanCloud(){
            AV.init({
                appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
                appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
                serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
            })
        },
        bindEvents(){
            let $avatarUpload = $('#avatar-upload')
            $avatarUpload.on('change',()=>{
                let localFile = $avatarUpload[0].files[0]
                let name = localFile.name
                let file = new AV.File(name, localFile)
                file.save({
                    onprogress: (progress) => {
                        let uploadProgress = progress.percent
                        if(uploadProgress!==100){
                            upload.innerText = '上传中'
                            this.view.show()
                            //window.eventHub.trigger('upload',{data:'上传中'})
                        }
                    }
                }).then((file) => {
                    //window.eventHub.trigger('upload',{data:'上传完成'})
                    upload.innerText = '上传完成'
                    this.view.hide()
                });
                file.save().then((file) => {
                    window.eventHub.trigger('upload',{
                        name:file.attributes.name,
                        link:file.attributes.url
                    })
                })
            })
        }
    }

    controller.init(view,model)

}