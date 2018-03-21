# 
## Relocation Assistance App
## Team
* Michael Ashe, Joshua Gomez,  Logan Sawyer, Steve Hulme.

## Motivation For This App
Why are the first the rules of real estate “location, location, location”?

It’s because the value of a property to a buyer is largely determined by its proximity to amenities, services and goods valued by that prospective purchaser.  You don’t just purchase a home — you purchase the lifestyle that its neighborhood and community provides.

For a newcomer, finding a home in a strange city that meets her/his desired lifestyle — well, that’s a huge challenge!  The key to solving the problem is to relate, geographically, the location of prospective properties to the amenities, services and goods desired. For our North Carolina Triangle area, such a tool does not exist.

This is a significant unmet need. The Triangle has seen rapid growth in the past three decades. Wake County alone currently has a net growth rate of 62 people *per day* (source: Wake County Government [People & Places](http://www.wakegov.com/planning/peopleandplaces/Pages/default.aspx)).

There are a number of online sources of information for housing  in the Triangle — Zillow.com, RealEstate.com and local realty websites (Triangle Lifestyles Realty(http://www.trianglelifestylesrealty.com/area).  Some, like Zillow, offer some information about local schools, but none offer a way to correlate property location to the amenities desired by the property purchaser. No single tool correlates  the location of available homes to schools, churches, grocery stores, malls, parks, and other urban amenities.

## What The App Will Do
Our app will let user enter a Triangle zip code, price range, the number of bedrooms/bathrooms and type of property (single family or condo).  It  then lets the user select from a menu lifestyle amenities (churches, schools, grocery stores, restaurants) they are interested in.

Using Zillow’s api we generate a list of properties meeting the real estate criteria.  We will use the APIs from Wake County Schools ([ArcGIS Hub](https://data-wake.opendata.arcgis.com/datasets/wake-county-public-schools)) and GreatSchools.Org (school ratings) to correlate school location and quality to property location.

For the purposes of this Project 3, we will seed our database with locations of Harris Teeter, Food Lion, and Aldi stores in Wake County, as well as locations of a representative sample of churches/synagogues/mosques. We will then present user with a map that relates the selected amenities to the properties of interest.
## Technologies Used
* OAuth
* React and React Routing
* Materialize
* Express
* Mongoose
* Mongo
* Ajax calls to Wake County Schools and GreatSchools.org APIs.
* Geo rendering

## Who is Responsible For Each Section of Application?
This is a tentative list that will be solidified at our first team meeting:

* Michael Ashe — UI/Front End/Product Owner.
* Joshua Gomez — React, Routing and APIs.
* Logan Sawyer — OAuth, React, Routing and APIs.
* Steve Hulme — Product Vision, Geo display, Mongo, Mongoose, Heroku,  and Scrum Master.
