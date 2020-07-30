# SmartParking
# Overview
SmartParking is a crowd-sourced application, where users can view all the street parkings
around them, together with detailed information. Users can also filter the parkings in
several ways: searching for a specific address, a specific type, a maximum distance, etc..
Moreover, users can pay the fee directly from the app, chosing the payment type and
how much they want to stop
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
# Back End
The Firebase back end is where all the parkings, users and reservations data are stored.
The back end is also encharged of authentication and user session management (a well
implemented and tested functionality of Firebase).
The main data that has to be stored is the parking Area data: every city has some areas,
and each of them includes a number of parking spots of different type: everything must
be saved.
Since Firebase RD is a NoSQL Database we have a JSON-style structure, where we have
2 main folders: <b>Cities</b> and <b>Users</b> <br/>
* <b>Cities</b> In this folder all the Cities included in the project are stored, and each of them
contains all the parking Areas that will be shown to the user
* <b>Users</b> In this folder all the Users registered to SmartParking are stored (by their
ID), and each contains all the needed information about them such as e-mail, name,
preferences, etc.. <br/>
# Design Patterns
* <b>Model-View-Controller Pattern</b>: a software design pattern commonly used for
developing user interfaces which divides the related application logic into three
interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.
Following the MVC architectural pattern decouples these major components allowing for code reuse and parallel development.
In SmartParking, we can say that the Mobile App represents both the View and
the Controller of the system, while the entire Back end and in particular the
Database represents the Model. That is, the App shows the relevant data to
the user, and provides the possibility to choose between some options to modify
the shown data: it behaves like a Controller, calling fetch methods to update the
Server-side data.
It is worth to mention that, in some cases, the MVC Pattern with a local copy
on the client side has been used: this because relying on fetch methods every-time
and considering that the user modifies only few data, it would be too heavy from
a computational point of view, and also very bandwidth-consuming.
* <b>Observer/Observable Pattern</b>: used when there is one-to-many relationship between objects such as if one object is modified, its dependent objects are to be
notified automatically. Observer pattern falls under Behavioral Pattern category.
This is the natural Design Pattern used to implement the MVC Pattern: in our
system, the intent of this pattern is to let the User execute some queries through
the UI and after searching the Database, the result is shown back in the UI. If
changes occurs in the database, the UI is notified and updates the UI.
We can say that React Native helped us a lot in implementing this pattern, due
to the intrinsic presence of this. All RN components, in fact, are ”linked” to state
values, and modifying them results in modifying also the UI to which the value is
linked.
# Third Party Integration
<h2>Google</h2>
Considering the huge impact Google has as an IT company all over the World, and
that it has under its wing around 2 billion users, we wanted facilitate the access to
SmartParking’s functionalities. For this reason we integrated Google Authentication,
already provided by Firebase back end services
<h2>Facebook</h2>
For the same reasons provided to Google Authentication, we integrated Facebook Authentication as well. <br/>
Such functionality is in fact already provided by Firebase back end
services
<h2>PayPal</h2>
In order to handle PayPal payments, we had to set up a PayPal Developer account, and
also two different sandbox accounts (one Merchant and one Customer). Due to the lack
of documentation of React Native-PayPal libraries and components, we were forced to
implement the payment through a Webview and calls to bare PayPal APIs, using POST
fetch requests.
<h2>Stripe</h2>
Stripe implementation in React Native is far from being cross-platform, and this is the
reason why we had to follow the same approach of PayPal implementation, using a
Webview to call the Stripe Checkout APIs and proceed to the payment.
# Redux
The Redux implementation is one of the core elements of the system. In fact, SmartParking has to handle a high amount of data often shared between all the screens: Redux
is the perfect choice, separating and simplifying the local state management from the
global state management.
Our Mobile Application follows the recommended usage with one single <b>store</b>, several
<b>actions</b> to change the store state and a <b>reducer</b> to specify how the actions transform
the store state.
# System Attributes
<h2>Reliability</h2>
The system guarantees a 24/7 service. Even if some Back end data has to change the
system can be updated without down times, because every change in the Database will
be immediately received and correctly updated from the Mobile Application.
10.2 Availability
The system is not used for critical services so the occurrence of faults is tolerated.
However, given that the Mobile Application relies on safe and highly tested libraries and
Third Party components and APIs, we can estimate the system availability to be at least
at 99%.
<h2>Security</h2>
The only Security aspect that the system must handle is the credentials transmission and
storage: Firebase does that, and obviously no password data is stored in the Database.
Also for in-app payment, no sensible data is stored and Stripe/PayPal APIs provide a
secure transmission of data.
<h2>Compatibility</h2>
The system will be hopefully used by a lot of people, so the Mobile Application must be
compatible to as many devices as possible. Moreover, Hardware Limitations are not so
tight because nowadays nearly every smartphone should satisfy them, making Compatibility easier to reach. In addition, nearly every smart device can run the application:
every iOS or Android tablet and every iOS or Android smartphone.
<h2>Scalability</h2>
The architecture is simply scalable as the number of users grows during the time. Enlarging the structure of the system is be an easy task: Firebase helps us a lot in this
case, because the number of possible users is huge and the parking Areas and Cities
can be expanded in a really easy way, by simply adding them one after the other in the
Database (also thanks to the NoSQL structure).




