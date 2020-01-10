const User = require('../models/user');
const Gem = require('../models/gem');

exports.getIndex = (req, res, next) => {  
    Gem.findAll()
        .then(gems => {
            res.render('index', {
                pageTitle: "Gem Store",
                gems: gems
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getDetails = (req, res, next) => {
    const gemId = req.params.gemId;

    Gem.findByPk(gemId)
        .then(gem => {
            res.render('details', {
                pageTitle: gem.name,
                gem: gem
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getDashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        pageTitle: 'Dashboard'
    })
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: "Log In"
    })
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email: email, password: password}})
        .then(user => {               
            if(user){   
                req.session.user = user;
                req.session.save(err => {
                    res.redirect('/');                                       
                });
                return;                                
            }
            res.redirect('/login');
        })        
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignUp = (req, res, next) => {
    res.render('signup', {
        pageTitle: "Sign Up"
    });
};

exports.postAddToCart = (req, res, next) => {
    const gemID = req.body.id;
    let fetchedCart;
    let newQuantity = 1;

    console.log(req.session.user);
}

exports.postSignUp = (req, res, next) => {
    const name = req.body.firstName + " " + req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = true;

    User.findOne({where: {name: name, email: email}})
        .then(result => {
            if(result){
                res.redirect('/');
            }
            return User.create({
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin
            });
        })
        .then(user => {
            console.log("<-- " + user.name + " created! -->");
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
};