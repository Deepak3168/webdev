var express = require('express')

var app = express();

var handlebars = require('express3-handlebars')
        .create({defaultLayout:'main'});

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
            ];
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'));

app.set('port',process.env.PORT || 3000);

app.get('/',function (req,res){
    res.render('home')
})
app.get('/about',function (req,res){
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{ fortune:randomFortune});
})
app.use(function(req,res) {
    res.status(404)
    res.render('404')
});
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500);
    res.render('500');
})


app.listen(app.get('port'),function() {
    console.log("Express started on http://localhost:"+app.get('port')+"; press Ctrl-c to terminate.")
})