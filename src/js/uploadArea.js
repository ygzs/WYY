{
    let view = {
        el:'aside>.uploadArea',
    }
    let model = {}
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
            //let avatarUpload = document.getElementById('avatar-upload')
            $avatarUpload.on('change',()=>{
                let localFile = $avatarUpload[0].files[0]
                let name = localFile.name
                let file = new AV.File(name, localFile)
                file.save({
                    onprogress: (progress) => {
                        let uploadProgress = progress.percent
                        if(uploadProgress!==100){
                            upload.innerText = '上传中'
                        }
                    }
                }).then((file) => {
                    upload.innerText = '上传完成'
                });
                file.save().then((file) => {
                    let url = file.attributes.url
                    link.innerText = url
                })
            })
        }
    }

controller.init(view,model)

//let TestObject = AV.Object.extend('TestObject')
    //let testObject = new TestObject();
    //testObject.set('words', 'Hello world!');
    //testObject.save().then((testObject) => {
    //console.log('保存成功。')
//})

}