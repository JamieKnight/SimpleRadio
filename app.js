(function(){
    var stations, eventType, station, playingStations;
    
    playingStations = new Array;

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
        var station = (e.target);
            id = station.id,
            url = station.href,
            label = station.getElementsByClassName('sta-play-btn');
            station.parentNode.classList.toggle('sta-playing');

            console.log(playingStations);

        if(playingStations[id]){
            playingStations[id].pause();
            delete playingStations[id];
            label[0].innerHTML = "Play";
        }else{
            playingStations[id] = new Audio(url);
            playingStations[id].play();
            label[0].innerHTML = "Pause";
        }
        return false;
    }
    
    var bindStationPlayback = function(){
        stations = document.getElementsByClassName('station');
        eventType = (hasTouchSupport())? 'touchstart' : 'click' ;
        for (i=0; i<stations.length; i++)
        {
            stations[i].addEventListener(eventType, togglePlayback, false);
        }
    }

    var init = function(){
        bindStationPlayback();
        
    }

    //kick everything off
    init();
})();