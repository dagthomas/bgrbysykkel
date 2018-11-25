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
	return await readFile('avail.json', 'utf8');
}
async function getStatus() {
	return await readFile('status.json', 'utf8');
}
async function getStations() {
	return await readFile('stations.json', 'utf8');
}
router.get('/api/v1/updatefiles', function(req, res) {
	fs.stat('avail.json', function(err, stats) {
		let seconds = (new Date().getTime() - stats.mtime) / 1000;
		if (seconds > updateFreq) {
			exec('curl -H ' + id + ' ' + url + '/stations/availability').then(
				function(out) {
					fs.writeFile('avail.json', out.stdout, 'utf8', function readFileCallback(err) {});
				},
				function(err) {
					console.error(err);
				}
			);
		}
	});
	fs.stat('status.json', function(err, stats) {
		let seconds = (new Date().getTime() - stats.mtime) / 1000;
		if (seconds > updateFreq) {
			exec('curl -H ' + id + ' ' + url + '/status').then(
				function(out) {
					fs.writeFile('status.json', out.stdout, 'utf8', function readFileCallback(err) {});
				},
				function(err) {
					console.error(err);
				}
			);
		}
	});
	fs.stat('stations.json', function(err, stats) {
		let seconds = (new Date().getTime() - stats.mtime) / 1000;
		if (seconds > (updateFreq * 280)) {
			exec('curl -H ' + id + ' ' + url + '/stations').then(
				function(out) {
					fs.writeFile('stations.json', out.stdout, 'utf8', function readFileCallback(err) {});
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
router.get('/api/v1/stasjoner/:stasjoner', function(req, res) {
	var avail, stations;
	getAvail().then(availdata => {
		getStations()
			.then(stationsdata => {
				avail = JSON.parse(availdata);
				stations = JSON.parse(stationsdata);
			})
			.then(printJson => {
				var stasjonsId = req.params.stasjoner.split('-');

				var station = [];
				for (var i = 0, len = stasjonsId.length; i < len; i++) {
					if (i < 6) {
						station[i] = stations.stations.find(item => item.id === parseInt(stasjonsId[i]));
					}
				}
				for (var i = 0, len = stasjonsId.length; i < len; i++) {
					if (i < 6) {
						station[i].status = avail.stations.find(item => item.id === parseInt(stasjonsId[i]));
					}
				}
				res.json({ station });
			});
	});
});
router.get('/api/v1/status', function(req, res) {
	// Bruker cURL.exe til å hente data, da CORS ikke er enablet på API lokasjonen
	getStatus()
		.then(statusdata => {
			status = JSON.parse(statusdata);
		})
		.then(printJson => {
			res.json({ status });
		});
});
router.get('/api/v1/allestasjoner', function(req, res) {
	getStations()
		.then(stationsdata => {
			stations = JSON.parse(stationsdata);
		})
		.then(printJson => {
			res.json({ stations });
		});
});
module.exports = router;
