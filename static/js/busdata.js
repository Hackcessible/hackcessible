function addMarker(map, lat, lon, name) {
  var myLatlng=new google.maps.LatLng(lat, lon);
                // To add the marker to the map, use the 'map' property

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: name, 
      icon: '../static/img/busstop.png'
  });

  marker.setMap(map); 

}