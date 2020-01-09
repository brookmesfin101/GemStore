const User = require("../models/user");
const Gem = require("../models/gem");

exports.Dashboard_Home = (req, res, next) => {
    res.render("admin/dashboard-Home");
}

exports.Dashboard_GetAddItem = (req, res, next) => {
    res.render("includes/add-item");
}

exports.Dashboard_Catalog = (req, res, next) => {
    Gem.findAll()
        .then(gems => {
            res.render("admin/dashboard-Catalog", {
                gems: gems
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.AddItem = (req, res, next) => {
    const name = req.body.Name;
    const price = req.body.Price;
    const description = req.body.Description;
    const imageUrl = req.body.ImageURL;

    Gem.findOne({where: {name: name}})
        .then(result => {
            if(result){
                console.log("Gem Already Exists");
                return res.render("includes/add-item");
            }
            return Gem.create({
                name: name,
                price: price,
                description: description,
                imageUrl: imageUrl
            });
        })
        .then(gem => {
            console.log("<-- " + gem.name + " created! -->");
            res.render('admin/dashboard-Home');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.EditItem = (req, res, next) => {
    const id = req.body.id;

    Gem.findOne({where: {id: id}, raw: true})
        .then(gem => {
            if(gem){
                return res.render('includes/edit-item', {
                    gem: gem
                })
            } else {
                throw "No Gem Found";
            }            
        })
        .catch(err => {
            console.log(err);
        })
}

exports.UpdateItem = (req, res, next) => {
    const id = req.body.ID;
    const price = req.body.Price;
    const description = req.body.Description;
    const imageUrl = req.body.ImageURL;

    Gem.findByPk(id)
        .then(gem => {
            gem.price = price;
            gem.description = description;
            gem.imageUrl = imageUrl;
            return gem.save();
        })
        .then(() => {
            Gem.findAll()
                .then(gems => {
                    return res.render('admin/dashboard-Catalog', {
                        gems: gems
                    });
                })            
        })
        .catch(err => {
            console.log(err);
        })
}