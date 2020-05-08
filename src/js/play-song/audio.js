{
    var audio = $('#article_audio').get(0);
    var totalWidth = $("#pgs").width();  //进度条长度
    
    /** 获取音频总时长，并转化为 00:00格式 **/
    $('#article_audio').on("loadedmetadata",function () {
        $('#totalTime').text(transTime(this.duration));
    });
          
    /** 播放进度 **/
    audio.addEventListener('timeupdate',updateProgress,false);
        
    /** 更新进度条 **/
    function updateProgress() {
        var value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
        $('.pgs-play').css('width', value + '%');
        $("#playedTime").html(transTime(audio.currentTime));
    }
        
    $("#pgs").click(function(e){
        var startX = $(this).offset().left;  //进度条开始的x坐标
        var endX = e.clientX;  //点击事件的x坐标
        rate = (endX - startX) / totalWidth;
        $("#circle").css({"left":(endX-startX-1)+"px"});
        audio.currentTime = rate*audio.duration;
        updateProgress();
    });
        
    /** 播放结束 **/
    audio.addEventListener('ended',endAudio,false);   
        
    //转换音频时长显示
    function transTime(time) {
        var duration = parseInt(time);
        var minute = parseInt(duration/60);
        var sec = duration%60+'';
        var isM0 = ':';
        if(minute == 0){
            minute = '00';
        }else if(minute < 10 ){
            minute = '0'+minute;
        }
        if(sec.length == 1){
            sec = '0'+sec;
        }
        return minute+isM0+sec
    }

}