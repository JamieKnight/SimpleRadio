var radioApp = (function(){
	var stations, eventType, station,
	playingStations = [];
	
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
			url = station.href;
		
		if(playingStations[id]){
			playingStations[id].pause();
			delete playingStations[id];
		}else{
			playingStations[id] = new Audio(url);
			playingStations[id].play();
		}
		
		return false;
	}

	var init = function(){
		stations = document.getElementsByClassName('station');
		eventType = (radioApp.hasTouchSupport())? 'touchstart' : 'click' ;
		for (i=0; i<stations.length; i++)
		{
			stations[i].addEventListener(eventType, radioApp.togglePlayback, false);
		}
	}
  
	return {
		init: init,
		hasTouchSupport: hasTouchSupport,
		togglePlayback: togglePlayback
	}
})();

radioApp.init();