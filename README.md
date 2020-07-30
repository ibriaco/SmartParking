# SmartParking
# Overview
SmartParking is a crowd-sourced application, where users can view all the street parkings
around them, together with detailed information. Users can also filter the parkings in
several ways: searching for a specific address, a specific type, a maximum distance, etc..
Moreover, users can pay the fee directly from the app, chosing the payment type and
how much they want to stop
---
# Front End
The Mobile Application is a React Native application composed by several screens, each
one will be described in the User Interface Design Section. The choice of React Native
frameworks comes from the fact that, being SmartParking an Application that will be
mainly used ”in real time”, smartphones will be the target devices: it’s more reasonable
that a user is using his smartphone when driving (obviously respecting the street law
code) rather than a tablet or a smartwatch. A <b>cross-platform</b> framework has been
identified as the smartest choice in this case, in order to reach the largest number of
users. <br/>
This Application is <b>multi-threaded</b> because we need to be able to
handle all user actions and at the same time to keep the Google Map and the shown
parkings updated, without having blocking instructions and so performing all the actions
in parallel. <br/>
The Mobile Application is composed of a total of 17 screens (including sub-screens)
(better described in Section 7), and the most important ones are:
* HomePage/Map
* Parkings
* Profile
---
# Back End
The Firebase back end is where all the parkings, users and reservations data are stored.
The back end is also encharged of authentication and user session management (a well
implemented and tested functionality of Firebase).
The main data that has to be stored is the parking Area data: every city has some areas,
and each of them includes a number of parking spots of different type: everything must
be saved.
Since Firebase RD is a NoSQL Database we have a JSON-style structure, where we have
2 main folders: <b>Cities</b> and <b>Users</b>

