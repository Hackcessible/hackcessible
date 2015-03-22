var SIDEWALKS_KEY = "HyursDSMdzrAfLroxKO1rztA5";
var SIDEWALKS_URL = "https://data.seattle.gov/resource/pxgh-b4sz.json";

var ELEVATION_KEY = "AIzaSyAEQEEhytuSdd1YrpQWe60EUh_M2nGONN4";
var ELEVATION_URL = "https://maps.googleapis.com/maps/api/elevation/json";
// //
//
// // function getElevations(locations, callback) {
// //   // Locations is an array of coordinates (2-tuple)
// //   coordinate_strings = [];
// //   for (var i = 0; i < locations.length; i++) {
// //     segment_coordinates = locations[i];
// //     for (var j = 0; j < segment_coordinates.length; i++) {
// //       coordinate_strings.push(segment_coordinates[j].join(","));
// //     }
// //   }
// //   locations_string = coordinate_strings.join("|");
// //
// //   params = {
// //     locations: locations_string,
// //     key: ELEVATION_KEY
// //   }
// //   $.ajax({
// //     url: ELEVATION_URL,
// //     data: params,
// //     dataType: "jsonp",
// //     success: callback
// //   });
// // }
//
// function addElevation(map) {
//   // Ask Google about the elevation at all of the points
// //  function elevationRequestHandler(data) {
// //    // Calculate the overall incline between those points (dy/dx)
// //    results = data["results"];
// //    elevation = results["elevation"];
// //
// //    // Assign a color to the incline
// //
// //    // Draw a line between the points
// //  }
//
// //  function curbRequestHandler(data) {
// //    // Each sidewalk path row (lots of data)
// //    // Want to do one request to Google. Just one - limited requests per day
// //    // TODO: Would eventually cache this server-side in our DB
// //
// //    // To get just one request done, need to have a big list of coordinates
// //    // to send to Google (a flat list) and then unpack them
// //    // Since (right now) we don't care about direction of travel, no need
// //    // to reorganize them afterwards
// //
// //    segments = [];
// //    segment_strings = [];
// //    for (var i = 0; i < data.length; i++) {
// //      current_path = data[i]["shape"]["geometry"]["paths"][0];
// //
// //      // Elevation difference for each segment (usually 2 segments, can be 6)
// //      for (var j=0; j < current_path.length - 1; j++) {
// //        // Get [Latitude, Longitude] to ask Google about elevation
// //        point0 = [current_path[j][1], current_path[j][0]];
// //        point1 = [current_path[j + 1][1], current_path[j + 1][0]];
// //
// //        coordinate = [point0, point1];
// //        segments.push([point0, point1]);
// //      }
// //
// ////    getElevations(segments, elevationRequestHandler);
// //    }
// //
// //  }
//
//     console.log("I'm doing it!");
// //  retrieveCurbs(curbRequestHandler);
// }


function addElevation(map) {
  // Main function that all the other functions should be in to avoid
  // naming collisions for now. Given a Google map, gets all the data and
  // draws it

  function drawElevations(elevationData, map) {
    // Given elevation data paired with locations, reform into tuples
    // and draw segments. Color based on elevation change

    console.log("Executed drawElevations");
    console.log(elevationData);
  }

  function getElevations(segments, callback) {
    // Given segments, flatten into string that Google likes, request the
    // elevation info.
    // Callback on the result is to drawElevations
    // Locations is an array of coordinates (2-tuple)
    coordinate_strings = [];
    for (var i = 0; i < segments.length; i++) {
      segment = segments[i];
      for (var j = 0; j < segment.length; j++) {
        coordinate_strings.push(segment[j].join(","));
      }
    }
    locations_string = coordinate_strings.join("|");

    console.log(locations_string);
    params = {
      locations: locations_string,
      key: ELEVATION_KEY
    }
    $.ajax({
      url: ELEVATION_URL,
      data: params,
      dataType: "jsonp",
      success: function(data) {
        callback(data, map);
      }
    });
  }

  function curbDataHandler(sidewalkData) {
    // Reads in data from getCurbs, processes into segments, flattens the list,
    // sends to Google getElevations to get elevations

    // Each sidewalk path row (lots of data)
    // Want to do one request to Google. Just one - limited requests per day
    // TODO: Would eventually cache this server-side in our DB

    // To get just one request done, need to have a big list of coordinates
    // to send to Google (a flat list) and then unpack them
    // Since (right now) we don't care about direction of travel, no need
    // to reorganize them afterwards

    segments = [];
    for (var i = 0; i < sidewalkData.length; i++) {
      current_path = sidewalkData[i]["shape"]["geometry"]["paths"][0];

      // Elevation difference for each segment (usually 2 segments, can be 6)
      for (var j=0; j < current_path.length - 1; j++) {
        // Get [Latitude, Longitude] to ask Google about elevation
        point0 = [current_path[j][1], current_path[j][0]];
        point1 = [current_path[j + 1][1], current_path[j + 1][0]];

        coordinate = [point0, point1];
        segments.push([point0, point1]);
      }
    }

    getElevations(segments, drawElevations);
  }

  function getCurbs(callback) {
    // Get sidewalk data, send to callback (curbDataHandler)
    // Send to callback curbDataHandler

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

   $.when($.ajax({
            url: SIDEWALKS_URL,
            dataType: "json",
            data: params,
            headers: {"X-App-Token": SIDEWALKS_KEY}
          }
         )
         .done(function(data) {
           callback(data);
           }
         )
   );
  }

  getCurbs(curbDataHandler)
}
