var express = require('express');
var exec = require('node-exec-promise').exec;
var router = express.Router();
var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
require('dotenv').config();

let id = process.env.API_KEY;
let updateFreq = process.env.UPDATE_FREQUENCY;
let url = 'https://oslobysykkel.no/api/v1';
async function getAvail() {
	return await readFile('jsonfiles/avail_bergen.json', 'utf8');
}
async function getStations() {
	return await readFile('jsonfiles/stations_bergen.json', 'utf8');
}
router.get('/api/v1/bergen/updatefiles', function(req, res) {
	fs.stat('jsonfiles/avail_bergen.json', function(err, stats) {
		let seconds = (new Date().getTime() - stats.mtime) / 1000;
		if (seconds > updateFreq) {
            exec('curl -H http://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json').then(
				function(out) {
					fs.writeFile('jsonfiles/avail_bergen.json', out.stdout, 'utf8', function readFileCallback(err) {});
				},
				function(err) {
					console.error(err);
				}
			);
		}
	});
	fs.stat('jsonfiles/stations_bergen.json', function(err, stats) {
		let seconds = (new Date().getTime() - stats.mtime) / 1000;
		if (seconds > (updateFreq * 280)) {
            exec('curl -H http://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json').then(
				function(out) {
					fs.writeFile('jsonfiles/stations_bergen.json', out.stdout, 'utf8', function readFileCallback(err) {});
				},
				function(err) {
					console.error(err);
				}
			);
		}
	});
	function feedback(){
		res.json({ success: true });
	}
	setTimeout(feedback, 2500);
});
router.get('/api/v1/bergen/stasjoner/:stasjoner', function(req, res) {
	var avail, stations;
	getAvail().then(availdata => {
		getStations()
			.then(stationsdata => {
				avail = JSON.parse(availdata);
				stations = JSON.parse(stationsdata);
			})
			.then(printJson => {
				var stasjonsId = req.params.stasjoner.split('-');
				if(stasjonsId[0] == '302'){
					stasjonsId = [];
					stasjonsId[0] = stations.data.stations[0].station_id;
					stasjonsId[1] = stations.data.stations[1].station_id;
					stasjonsId[2] = stations.data.stations[2].station_id;
				}
				var station = [];
                for (var i = 0, len = stasjonsId.length; i < len; i++) {
                    if (i < 6) {
                        station[i] = stations.data.stations.find(item => item.station_id === stasjonsId[i]);
                    }
                }

                for (var i = 0, len = stasjonsId.length; i < len; i++) {
                    if (i < 6) {
                        station[i].status = avail.data.stations.find(item => item.station_id === stasjonsId[i]);
                    }
                }
				res.json({ station });
			});
	});
});
router.get('/api/v1/bergen/allestasjoner', function(req, res) {
	getStations()
		.then(stationsdata => {
			stations = JSON.parse(stationsdata);
		})
		.then(printJson => {
			res.json({ stations });
		});
});
module.exports = router;
