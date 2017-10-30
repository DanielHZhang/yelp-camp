var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://static.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg",
        description: "lol clouds haha Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam beatae doloremque dolores esse, fugit in inventore, magni modi porro provident rerum vitae. Aliquid deleniti dolores enim harum repellat voluptas?"
    },
    {
        name: "Desert Mesa",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Rub_al_Khali_002.JPG",
        description: "whats a mesa Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam beatae doloremque dolores esse, fugit in inventore, magni modi porro provident rerum vitae. Aliquid deleniti dolores enim harum repellat voluptas?"
    },
    {
        name: "Funny Tree",
        image: "https://c2.staticflickr.com/6/5481/12337695235_664b7e1328_b.jpg",
        description: "I love trees Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam beatae doloremque dolores esse, fugit in inventore, magni modi porro provident rerum vitae. Aliquid deleniti dolores enim harum repellat voluptas?"
    },
    {
        name: "Mosquito Hill",
        image: "https://c1.staticflickr.com/7/6204/6047319257_b27c1be597_b.jpg",
        description: "It sucks here Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam beatae doloremque dolores esse, fugit in inventore, magni modi porro provident rerum vitae. Aliquid deleniti dolores enim harum repellat voluptas?"
    },
    {
        name: "Leaf Village",
        image: "https://c2.staticflickr.com/6/5595/15276785036_bf2fe6ef0e_b.jpg",
        description: "I will become hokage Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam beatae doloremque dolores esse, fugit in inventore, magni modi porro provident rerum vitae. Aliquid deleniti dolores enim harum repellat voluptas?"
    }
];


function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");

        //Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");

                    //create a comment
                    Comment.create(
                        {
                            text: "Wow so cool",
                            author: "Danny"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            })
        });
    });
}

module.exports = seedDB;

