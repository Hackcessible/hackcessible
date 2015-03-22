# Hack the Commute: Bus Stop Accessibility

This app is developed to help people who use wheelchairs plan their routes in Seattle, taking into account their specific accessibility needs. It can be used as an extention to OneBusAway application or as a separate tool.
Today, the app allows users to check the terrain around the bus stop for accessibility issues, report obstacles and verify information contribued by other users. The future goal is to allow users to search for an accesible route based on their preferences.

Our app is live at [http://hackcessible.herokuapp.com/](http://hackcessible.herokuapp.com/). 

Here's a pretty picture:
![Screenshot of our shiny thing](screenshot.png?raw=true "Hackcessible Transit App")

## Challenge and Approach

Today, a person in a wheelchair does not have a full or unified access to up-to-date information about upgraded ramp curbs, sidewalk closures, road construction, steep hills or other obtacles that can block their mobility. 

We believe that every person in Seattle should enjoy freedom and convenience of commuting.   

**Design question**:

_How can we help people who use wheelchairs find routes tailored to their needs? How can we improve their commute experience in Seattle?_

Our approach for satisfying this challenge was to:

- Determine obstacles faced by people in wheelchairs when navigating their commute
- Create a design schema to easily convey obstacles to users
- Enhance information available in OneBusAway using open data sets
- Allow community reporting to improve adaptability and increase data size

Once we did that, we knew we could make a change for someone's life!

## Team Members

Our team is comprised of:

- [@AllieDeford](https://github.com/AllieDeford) - Queen of Juggling All The Things! (a.k.a. Project Manager) and dev
- [@nbolten](https://github.com/nbolten) - Supreme Overlord of Flask, virtual environments, and data manipulation and also super coder
- [@Reagankm](https://github.com/Reagankm) - Web dev novice but the kid's got heart
- [@vesipan](https://github.com/versipan) - User Advocate and all-around design expert

## Technologies, APIs, and Datasets Utilized

We made use of:

- Python, Flask server, JavaScript, CSS, HTML 5
- [Sidewalk Data Set](https://data.seattle.gov/Transportation/SDOT-Sidewalks/pxgh-b4sz) from City of Seattle Department of Transportation: curb and sidewalk data
- [Google Maps Elevation API](https://developers.google.com/maps/documentation/elevation/): elevation data)
- [One Bus Away API](http://pugetsound.onebusaway.org/p/OneBusAwayApiService.action): bus stop information


## Contributing

In order to run our app:

1. Visit [http://hackcessible.herokuapp.com/](http://hackcessible.herokuapp.com/)
2. Enter a bus stop number or click "Show Map of Current Location"
3. Use the filters at the bottom of the page to select the obstacles you wish to see
4. Longpress (click and hold without moving the mouse) to report a new obstacle

Our code is licensed under the [MIT License](LICENSE.md). Pull requests will be accepted to this repo, pending review and approval.
