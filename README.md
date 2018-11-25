# BGR Bysykkel  v1.0.0



### Default view ('/'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/default_site.jpg "Default Site")

### List view ('/liste'):
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations.jpg "List of Stations")

### List view ('/liste') - Items selected:
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations2.jpg "List of Stations")

### List view ('/liste') - Filter by title:
![alt text](https://github.com/dagthomas/bgrbysykkel/raw/master/readme/list_of_stations3.jpg "List of Stations")

### Stations view ('/stations/xxx-xxx-xxx') - Selected items from list:
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
