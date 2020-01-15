const User = require('../models/user');
const Cart = require('../models/cart');

exports.getTotalCartCount = (userId) => {
    let cartCount = 0;
    console.log(1);
    return User.findByPk(userId)
        .then(user => {            
            return user.getCart();
        })
        .then(cart => {
            if(cart){
                return cart.getGems();                
            }
            return;             
        })
        .then(gems => {  
            console.log(2);          
            gems.forEach(g => {
                cartCount += parseInt(g.cartItem.quantity);
            })
            return cartCount;
        })
        .catch(err => {
            console.log(err);
        })
}