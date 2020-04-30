AV.init({
    appId: "wGmHSCdbizmo4o5EVXcKSaHn-gzGzoHsz",
    appKey: "4SskzGc8tqaDVp3Qe0s8EKND",
    serverURL: "https://wgmhscdb.lc-cn-n1-shared.com"
});
//const TestObject = AV.Object.extend('TestObject')
    //const testObject = new TestObject();
    //testObject.set('words', 'Hello world!');
    //testObject.save().then((testObject) => {
    //console.log('保存成功。')
//})
const avatarUpload = document.getElementById('avatar-upload')
avatarUpload.addEventListener('change',()=>{
    const localFile = avatarUpload.files[0]
    const name = localFile.name
    const file = new AV.File(name, localFile)
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