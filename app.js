(function(){
    var stations, eventType, station, liveAudio, nextTxStart;   
    
    liveAudio       = false;
    currentStation  = false;
    playingStations = [];
    nextTxStart     = []
        
    function sendRequest(url,callback,postData) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function () {
        if (request.readyState != 4 || request.status != 200) return;
        callback(request);
        }
        request.send();
    }
    
    var hasTouchSupport = function(){
        try {  
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    var togglePlayback = function(e){
        e.preventDefault();
        var station, id, url, label;    
        station = (e.target);
        station.label = station.getElementsByClassName('sta-play-btn');
        
        if(liveAudio){
            stopPlayback();
        }
           
        if(currentStation.id !== station.id){
            startPlayBack(station);
            currentStation = station;
        }else{
            //nothing is playing, therefore no current station.
            currentStation = false;
        }
        
        return false;
    }
    
    var stopPlayback = function(){
        //pause playback and reset audio object
        liveAudio.pause();
        liveAudio = false;
       
        //update UI
        currentStation.label[0].innerHTML = "Play";
        currentStation.parentNode.parentNode.classList.toggle('sta-playing');
    }
    
    var startPlayBack = function(station){
        //create object, start stream.
        liveAudio = new Audio(station.href);
        liveAudio.play();
        
        //update UI.
        station.label[0].innerHTML = "Pause";
        station.parentNode.parentNode.classList.toggle('sta-playing');
    }
        
    var updateImage = function(data){
        //parse response grab pid and select station in document.
        var response = JSON.parse(data.response);
        var pid = response.schedule.now.broadcast.programme.pid;
        var station_inner = document.querySelector('#' +response.schedule.service.key + ' .sta-inner');
        var station = document.querySelector('#' +response.schedule.service.key);
        
        //Update network image every 15 secs.
        //TODO: Extend this to use now and next data to poll at a smarter frequency or preswap images.
        setTimeout(function(){ refreshImage(station); }, 15000);
        
        //update UI
        station_inner.style.backgroundImage = "url('http://static.bbci.co.uk/programmeimages/352x198/episode/" + pid +".jpg?nodefault=true')";
        station_inner.style.opacity = 1;
    }
    
    var refreshImage = function(station){
        sendRequest(station.dataset.upcoming, function(data){
            updateImage(data);
        });  
    }
    
   
    var init = function(){
        //setup click events, load live data.
        var stations = document.getElementsByClassName('station');
        var eventType = (hasTouchSupport())? 'touchstart' : 'click' ;
        
        for (i=0; i<stations.length; i++)
        {
            //bind events for playback
            stations[i].addEventListener(eventType, togglePlayback, false);
            refreshImage(stations[i]);
        }
    }

    //kick everything off
    init();
})();