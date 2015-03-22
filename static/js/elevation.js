function addElevation(dataurl, map) {
  function drawElevations(data) {
    // Data is an array of coupled (sidewalk end points) location results returned by the Google Elevation API
    // Plot each one at a time

    for (var i = 0; i < data.length; i++) {
      segment = data[i]
      // Find the change in elevation in meters
      delevation = Math.abs(segment[0]["elevation"] - segment[1]["elevation"]);
      // Find the distance between the segments

      // Find the change in distance in meters
      if (typeof(Number.prototype.toRad) === "undefined") {
        // Convert any number to radians
        Number.prototype.toRad = function() {
          return this * Math.PI / 180;
        }
      }

      function distance(lon1, lat1, lon2, lat2) {
        // Calculate the distance given geolocation
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
        var dLon = (lon2-lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c * 1000; // Distance in m
        return d;
      }

      lng1 = segment[0]["location"]["lng"]
      lat1 = segment[0]["location"]["lat"]
      lng2 = segment[1]["location"]["lng"]
      lat2 = segment[1]["location"]["lat"]

      segment_distance = distance(lng1, lat1, lng2, lat2);
      slope = delevation / segment_distance;

      high = 0.05
      mid = 0.01
      var color = "";
      if (slope > high) {
        // Red
        color = "#FF0000";
      } else if (slope > mid) {
        // Yellowy
        color = "#FFFF00";
      } else {
        // Green
        color = "#00FF00";
      }

      // Finally draw things
      coordinates = [new google.maps.LatLng(lat1, lng1),
                     new google.maps.LatLng(lat2, lng2)];

      path = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0.6,
        strokeWeight:3
      });

      path.setMap(map);
    }
  }

  $.ajax({url: dataurl,
          success: drawElevations}
  );
}
