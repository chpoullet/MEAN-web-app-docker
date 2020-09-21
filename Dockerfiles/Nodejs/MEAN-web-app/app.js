var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.set('view engine', 'pug'); // defining engine as Pug
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://database:27017/information") // testing connection
var nameSchema = new mongoose.Schema({ // Creating 3 keys, with 3 placeholder strings
	firstName: String,
	lastName: String,
	email: String
});
var User = mongoose.model("User", nameSchema)

app.get("/", function (req, res){
		res.render('index');
});

app.post('/database', (req, res) => {
	var myData = new User(req.body);
	myData.save()
		.then(item => {
			res.render('database')
		})
	  .catch(err => { // if unsuccessful at inputting into database - will throw error
	  	res.status(400).send("Unable to save to database");
	  });
});

app.get('/database', function(req, res) {
	res.render('database');
});

app.get('/search', function(req, res) {
	res.render('search');
});

app.post('/search', (req, res) => {
	var myData2 = req.body.dblastName; // the user defined lastname
	User.find({lastName: myData2}, function(err, users) { // searching the database
		if (err) throw err;
		res.render('results', {users: users});
	})
});



app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
