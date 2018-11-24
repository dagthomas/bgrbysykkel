# BGR Bysykkel  v1.0.0
[Demo site - no live API data/updates](http://bysykkel.ispwbv003.axpa.no/)


### Default view ('/'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/default_site.jpg "Default Site")

### List view ('/liste'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations.jpg "List of Stations")

### Stations view ('/stations/xxx-xxx-xxx'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/selected_stations.jpg "Selected Stations")

### Multiple Stations view ('/stations/xxx-xxx-xxx-xxx-xxx-xxx'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/multiple_stations.jpg "Multiple Stations")

### List view, select ('/liste'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/select.jpg "Select")

## Installation

```shell
npm install
npm run start
```

Site will run @ http://localhost:3000

## Why BGR Bysykkel?

Oslo Bysykkel gives users the opportunity to rent bikes on a daily, or monthy basis.<br> 
This project was made to show info about the close, surrounding stations to our offices <br>
In order the make traveling more effective.<br>

Since oslobysykkel.no API does not allow CORS - I download the .json data via CURL.<br>

 * Show all locations, with ID
 * Show default view of stations surrounding our offices
 * Show view based on user input
 <br>
