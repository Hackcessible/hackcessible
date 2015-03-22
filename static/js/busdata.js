function addMarker(map, lat, lon, name) {
  var image = {
    url: '../static/img/bus.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    scaledSize: new google.maps.Size(25, 25),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  var myLatlng=new google.maps.LatLng(lat, lon);
                // To add the marker to the map, use the 'map' property

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: name, 
      icon: image
  });


}