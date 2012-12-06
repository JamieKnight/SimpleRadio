ee = new EventEmitter();

function simpleRadio(){
    var Station = function(id, stream, feed) {
        this.id = id;
        this.stream = stream || false;
        this.feed = feed || false;
        this.AudioObject = false;
        
        that = this;
        this.bindEvents(that);
    }
    
    Station.prototype = {
        play:function() {
            if (this.AudioObject) {
                this.AudioObject.play()
            } else {
                console.log('play ' + this.id);
                console.log(this.stream);
                this.AudioObject = new Audio(this.stream);
                this.AudioObject.play(); 
            }
        },
        
        pause: function(){
            console.log(this.AudioObject);
            if (this.AudioObject) {
                this.AudioObject.pause();
            }
        },
        bindEvents: function(that){
            ee.on("station:play", function(id){
                if (id == that.id) {
                    that.play(); 
                } else {
                    that.pause();
                }
            });
            
            ee.on("station:stop", function(id){
                console.log('stop');
                if (id == that.id) {
                    that.pause(); 
                }
            });
        }
    }
    this.init = function(){
        //setup services
        var services = [];
        services.radio3 = new Station('radio3', 'http://www.bbc.co.uk/radio/listen/live/r3_heaacv2.pls', 'http://www.bbc.co.uk/radio3/programmes/schedules/upcoming.json'); 
    }
}

player = new simpleRadio();
player.init();

ee.trigger("station:play", ['radio3']);
setTimeout(function(){
  ee.trigger("station:play", ['radio4']);  
}, 5000)
