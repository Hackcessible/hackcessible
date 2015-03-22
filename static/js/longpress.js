    //A function to save click location info
    function saveLocation(e) {
      if(typeof(Storage) !== "undefined") {
          sessionStorage.setItem("obstacleLocation", e.latLng.toString());
        }

        window.location.href = "../report";


    }

    //A function to open the Obstacle Reporting window
    function openDialog(e) {
      //Set options
      var sOptions = 'dialogWidth:1152px; dialogHeight:568px; dialogLeft:100px; dialogTop:100px; status:no; scroll:no; help:no; resizable:yes';


      var result = window.showModalDialog("{{ url_for('report') }}", e.latLng, sOptions);
    }

    //Functions to detect when a longpress occurs
    function LongPress(map, length) {
        this.length_ = length;
        var me = this;
        me.map_ = map;
        me.timeoutId_ = null;
        google.maps.event.addListener(map, 'mousedown', function(e) {
          me.onMouseDown_(e);
        });
        google.maps.event.addListener(map, 'mouseup', function(e) {
          me.onMouseUp_(e);
        });
        google.maps.event.addListener(map, 'drag', function(e) {
          me.onMapDrag_(e);
        });
      };

      
      LongPress.prototype.onMouseUp_ = function(e) {
        clearTimeout(this.timeoutId_);
      };

      LongPress.prototype.onMouseDown_ = function(e) {
        clearTimeout(this.timeoutId_);
        var map = this.map_;
        var event = e;
        this.timeoutId_ = setTimeout(function() {
          google.maps.event.trigger(map, 'longpress', event);
        }, this.length_);
        this.isDragging=false;
      };

      LongPress.prototype.onMapDrag_ = function(e) {
        this.isDragging=true;
        clearTimeout(this.timeoutId_);
      };