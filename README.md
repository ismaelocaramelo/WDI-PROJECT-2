# Green Charge Spots
Charge points for electric vehicle

This application was produced as my third project for the Web Development Immersive course at General Assembly London.


The decision to make this website was serve as a  charging point platform. In addition to the charge point map, Green Charge Spots provides supporting information on charging and electric vehicles to help current or prospective EV drivers to make more informed choices and enjoy their electric motoring experience.

###Charge Point Database

Green Charge Spots aggregates data from various sources to provide the most comprehensive source of UK charge points – there are currently more than 4000 public charging locations mapped on the my database.

###Favourite Spots

Green Charge Spots facilitates a user friendly favourite icon to store his preferred choices and access them in a simple interface. Click on specific England charging points to see more info about address, number, type and to which network each charging point belongs. 

###Planning

Wireframing

I used the tool Balsamiq to wireframe the general appearance of the main parts of the app - namely the set up process and the map itself (complete with sidebar).




### Backend

It was built using Node.js and MongoDB. 


Features:

- Regular Expression, there is no such thing as comprehensive UK postcode regular expression that is capable of validating a postcode. 
Postcodes are arbitrarily complex and constantly changing. For instance, the outcode W1 does not, and may never, have every number between 1 and 99, for every postcode area.

- Filtering, to filter different types of kilowatt outputs. I used mongoose documentation to achieve this feature. 

- Adding and removing favourite spots from the database was not easy, the default behaviour is to return the unaltered document. 

-  I used the government API and Google Maps API to build a database of uniform data to serve to the Frontend.

- MongoDB security which I found it has has the robust security capabilities that one would expect from a modern database.

### Frontend

jQuery, HTML and Bootstrap.

I divided the client side into two js files:

  - Map Client : It communicates with the Google Maps API and manipulate the data. Features:
  	- Object orientation to encapsulate related functions and variables.
  
  	- MapOptions to customize the map 
  	
  	- Info window, displays information about the spot including subscription, fee among others.
  	
	- Markes, which I design using Photoshop.

- User Client:

	- Modals to swiftly show information to users on the same page they are working on, thus improving the usability of Green Charge Spots site and decreasing unnecessary page reloads. 
	
	- Custom HTTP header before send to specific request, that allows to get the token back and manipulates data.
	
	- It's also object oriented.

###Future implementations

Charging info resource:

- With so many new and technical terms relating to charge points, it can be a confusing topic; Providing an overview of the different networks, overview of charging and how to go about getting a charging point for home or work.


Support:

- Making the decision to go electric requires some careful consideration; A section which covers the different technologies, practical issues to think about, the tax and grant benefits available and providing a list of electric vehicles available to buy now. 
