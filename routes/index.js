var express = require('express');
var exec = require('node-exec-promise').exec;
var router = express.Router();
var fs = require('fs');
require('dotenv').config();

// Get client-identifier from https://developer.oslobysykkel.no/api - put in .env file
let id = process.env.API_KEY, url = process.env.URL;

router.get('/stasjoner/:stasjoner', function(req, res, next) {
var avail = JSON.parse(fs.readFileSync('avail.json', 'utf8'));
var stations = JSON.parse(fs.readFileSync('stations.json', 'utf8'));
	exec(
		'curl -H '+id+' '+url
	)
		.then(
			function(out) {
        fs.writeFile('avail.json', out.stdout, 'utf8', function readFileCallback(err) {});
        avail = JSON.parse(out.stdout);
			},
			function(err) {
				console.error(err);
			}
		)
		.then(function() {
			var stasjonsId = req.params.stasjoner.split('-');

			var station = [];
			for (var i = 0, len = stasjonsId.length; i < len; i++) {
        if(i < 6){
        station[i] = stations.find(item => item.id === parseInt(stasjonsId[i]));
        }
      }
			for (var i = 0, len = stasjonsId.length; i < len; i++) {
        if(i < 6){
          station[i].status = avail.stations.find(item => item.id === parseInt(stasjonsId[i]));
        }
			}
			res.render('index', {
        title: 'BYSYKKEL',
        stat: station,
        liste: null
			});
		}).then(function() {

      
    });
});
router.get('/', function(req, res, next) {
  var avail = JSON.parse(fs.readFileSync('avail.json', 'utf8'));
  var stations = JSON.parse(fs.readFileSync('stations.json', 'utf8'));
	exec(
		'curl -H '+id+' '+url
	)
		.then(
			function(out) {
        fs.writeFile('avail.json', out.stdout, 'utf8', function readFileCallback(err) {});
        avail = JSON.parse(out.stdout);
			},
			function(err) {
				console.error(err);
			}
		)
		.then(function() {
			var defaultStations = ['302', '354', '392'];
			var station = [];
			for (var i = 0, len = defaultStations.length; i < len; i++) {
        if(i < 6){
        station[i] = stations.find(item => item.id === parseInt(defaultStations[i]));
        }
      }
			for (var i = 0, len = defaultStations.length; i < len; i++) {
        if(i < 6){
          station[i].status = avail.stations.find(item => item.id === parseInt(defaultStations[i]));
        }
			}
			res.render('index', {
        title: 'BYSYKKEL',
        stat: station,
        liste: null
			});
		});
});
router.get('/liste', function(req, res, next) {
  var stations = JSON.parse(fs.readFileSync('stations.json', 'utf8'));
	res.render('liste', {
    title: 'BYSYKKEL', 
    stat: null,
    liste: stations
	});
});
router.post('/getstasjoner', function(req, res) {
	console.log("clicked");
	var stasjoner = req.body.idliste.replace(/\s+/g, '').replace(/,/g, '-');
  res.redirect(req.baseUrl + '/stasjoner/'+stasjoner);
});
module.exports = router;
