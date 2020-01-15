const User = require('../models/user');
const Gem = require('../models/gem');

const Util = require('../util/util');

exports.getIndex = (req, res, next) => {  
    Gem.findAll()
        .then(gems => {
            if(req && req.session && req.session.user){                
                Util.getTotalCartCount(req.session.user.id)
                    .then(cartCount => {                                              
                        res.render('index', {
                            pageTitle: "Gem Store",
                            gems: gems,
                            cartCount: cartCount
                        });
                    })
                    .catch(err => {                        
                        console.log(err);
                    })                                                                     
            } else {
                res.render('index', {
                    pageTitle: "Gem Store",
                    gems: gems                    
                });
            }
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

exports.getCart = (req, res, next) => {
    
    if(req.session && req.session.user){
        User.findByPk(req.session.user.id)
            .then(user => {
                return user.getCart();
            })
            .then(cart => {
                if(cart){
                    return cart.getGems();
                } else {
                    // TODO: Send Empty Shopping Cart flag
                }
            })
            .then(gems => {
                Util.getTotalCartCount(req.session.user.id)
                    .then(cartCount => {                
                        res.render('cart', {
                            pageTitle: 'Shopping Cart',
                            cartCount: cartCount,
                            gems: gems
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })                 
            })
            .catch(err => {
                console.log(err);
            })
        
    } else {
        res.redirect('/');
    }       
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
    const gemId = req.body.gemId;
    let fetchedCart;
    let newQuantity = 1;

    User.findByPk(req.session.user.id)
        .then(user => {
            return user.getCart()
                .then(cart => {
                    if(!cart){
                        user.createCart();
                    }                                    
                    return cart;
                })
                .catch(err => {
                    console.log(err);
                })            
        })
        .then(cart => {    
            fetchedCart = cart;
            
            return cart.getGems({where: {id: gemId}})
                .then(gems => {
                    let gem;
                    if(gems.length > 0){
                        gem = gems[0];
                    }
                    if(gem){
                        const oldQuantity = gem.cartItem.quantity;
                        newQuantity = oldQuantity + 1;
                        return gem;                        
                    }
                    return Gem.findByPk(gemId);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .then(gem => {
            return fetchedCart.addGem(gem, {
                through: {quantity: newQuantity}
            })            
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
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