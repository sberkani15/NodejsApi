


var express = require('express');
var app = express();
var bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090; 


var router = express.Router();


var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var Bear     = require('./app/models/bear');


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.route('/bears').post(function(req,res){
    var bear=new Bear();
    bear.name= req.body.name;

    bear.save(function(err) {
            if (err)
                res.send("cc"+err);

            res.json({ message: 'Bear created!' });
        });

})




router.get('/', function(req, res){
    res.json({message:'hello every body'});
})

app.use('/api', router);
app.listen(port);
console.log('app listen on port:'+port);
