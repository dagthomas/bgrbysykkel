# BGR Bysykkel  v1.5.2
[Demo site [data refresh every 5 min]](http://bysykkel.ispwbv003.axpa.no/)

### Default view ('/:place'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/default_site.jpg "Default Site")

### Default view ('/:place') Hidden places (select from Oslo, Bergen, Trondheim):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/places.jpg "Places")

### List view ('/:place/liste'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations.jpg "List of Stations")

### List view ('/:place/liste') - Items selected:
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations2.jpg "List of Stations")

### List view ('/:place/liste') - Filter by title:
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations3.jpg "List of Stations")

### Stations view ('/:place/stations/xxx-xxx-xxx') - Selected items from list:
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/selected_stations.jpg "Selected Stations")


## Installation

Visit https://developer.oslobysykkel.no/api and get an API key, and put it in the .env file

```shell
npm install
npm run build
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
