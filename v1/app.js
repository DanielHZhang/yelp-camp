var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp");

Campground.create({
        name: "Funny Tree",
        image: "https://c2.staticflickr.com/6/5481/12337695235_664b7e1328_b.jpg",
        description: "I love trees"
    },
    {
        name: "Mosquito Hill",
        image: "https://c1.staticflickr.com/7/6204/6047319257_b27c1be597_b.jpg",
        description: "It sucks here"
    },
    {
        name: "Leaf Village",
        image: "https://c2.staticflickr.com/6/5595/15276785036_bf2fe6ef0e_b.jpg",
        description: "I will become hokage"
    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });


app.get("/", function (req, res) {
    res.render("landing.ejs")
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, newlyCreated) {
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
   res.render("show");
});


app.listen(3000, function () {
    console.log("The YelpCamp Server Has Started!");
});