const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const sequelize = require('./util/database');
const Gem = require('./models/gem');

const app = express();

const storeRoutes = require('./routes/store');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(
    session({
        secret: 'Gem Store Session Secret',
        resave: false,
        saveUninitialized: false        
    })
);
app.use((req, res, next) => {
    if(req.session.user){
        res.locals.isAuthenticated = true;
        
        if(req.session.user.isAdmin){
            res.locals.isAdmin = true;
        }
    }
    next();
});

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(storeRoutes);
app.use("/admin", adminRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });