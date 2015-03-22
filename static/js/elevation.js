var APIKey = "HyursDSMdzrAfLroxKO1rztA5";
var SIDEWALKS_URL = "https://data.seattle.gov/resource/pxgh-b4sz.json"

// Starting location
var myCenter = new google.maps.LatLng(47.606115, -122.335834);

// Make the map

function retrieveCurbs(callback) {
  var sidewalkCols = ["objectid",
                      "condition",
                      "curbramphighyn",
                      "curbramplowyn",
                      "shape",
                      "current_status"]
  var params = {
        "$select": sidewalkCols.join(","),
        "$limit": 2, // FIXME: modify this in the final version to retrieve all curbs
        "curbramphighyn": "Y",
        "curbramplowyn": "Y",
        "current_status": "INSVC"
      }

  $.ajax({
    url: SIDEWALKS_URL,
    dataType: "json",
    data: params,
    headers: {"X-App-Token": APIKey},
    success: function(response) {
      callback(response);
    }
  });
}


function addElevation(map) {
  function requestDataHandler(data) {
    // Each sidewalk path row (lots of data)
    for (var i=0; i < data.length; i++) {
      current_path = data[i]["shape"]["geometry"]["paths"][0];

      // Elevation difference for each segment (usually 2 segments, can be 6)
      for (var j=0; j < current_path.length - 1; j++) {
        // Get [Latitude, Longitude] to ask Google about elevation
        point0 = [current_path[j][1], current_path[j][0]];
        point1 = [current_path[j + 1][1], current_path[j + 1][0]];

        // Ask Google about the elevation at the two points
        console.log(point0);
        console.log(point1);

        // Calculate the overall incline between those points (dy/dx)

        // Assign a color to the incline

        // Draw a line between the points
      }
    }
  }

  retrieveCurbs(requestDataHandler);
}
