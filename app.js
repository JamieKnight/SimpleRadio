var radioApp = (function(){
	var stations, eventType, station,
	playingStation = [];
	
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
		
		if(playingStation[id]){
			playingStation[id].pause();
			delete playingStation[id];
		}else{
			playingStation[id] = new Audio(url);
			playingStation[id].play();
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