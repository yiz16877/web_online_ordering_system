const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Product = require("../models/product"); //const vendor = require("../models/vendor");
const cartSchema = new Schema({
  email: "",
  product_list: []
});
var my_cart;
var payment_message = "Please Make Your Payment"
var Cart = mongoose.model("Cart", cartSchema);

function set_payment_message(msg) {
  payment_message = msg
}

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

//index
router.get("/index", function(req, res) {
  res.render("index");
});

// RETREIVE all product

router.get("/product", function(request, response) {
  Product.find({}, function(err, product_list) {
    response.render("product", {
      product: product_list
    });
  });
});

router.get("/producttype", function(request, response) {
  Product.find({ brand: request.query.type }, function(err, product_list) {
    response.render("producttype", {
      product: product_list
    });
  });
});

// RETREIVE all  product for admin

router.get("/productadmin", function(request, response) {
  Product.find({}, function(err, product_list) {
    response.render("productadmin", {
      product: product_list
    });
  });
});

// Logout
router.get("/logout", ensureAuthenticated, (req, res) =>
  res.render("logout", {
    user: req.user
  })
);

//edit profile
router.get("/edit", function(req, res) {
  res.render("edit");
});

//View Profile
router.get("/mine", ensureAuthenticated, (req, res) =>
  res.render("mine", {
    user: req.user
  })
);

//Cart
router.post("/addCart", function(request, response) {
  Cart.find({ email: request.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = request.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  let pid = request.query.id;
  Product.findOne({ id: pid }, function(err, product) {
    my_cart.product_list.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      color: product.color,
      shoeUrl: product.shoeUrl
    });
    //my_cart.save();
    my_cart.save(function(err, user) {
      if (err) {
        console.log(err);
        response.send(400, "Bad Request");
      } else {
        response.redirect("/product");
      }
    });
    set_payment_message("Please Make Your Payment")
  });
});

router.get("/myCart", function(req, res) {
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  Cart.find({ email: req.user.email }, function(err, productarray) {
    let total_price = 0;
    if (productarray.length > 0) {
      productarray[0].product_list.forEach(function(product) {
        total_price = total_price + product.price;
      });

      let tempArr = [];
      let afterData = [];
      for (let i = 0; i < productarray[0].product_list.length; i++) {
        if (tempArr.indexOf(productarray[0].product_list[i].id) === -1) {
          afterData.push({
            id: productarray[0].product_list[i].id,
            name: productarray[0].product_list[i].name,
            brand: productarray[0].product_list[i].brand,
            price: productarray[0].product_list[i].price,
            color: productarray[0].product_list[i].color,
            origin: [productarray[0].product_list[i]]
          });
          tempArr.push(productarray[0].product_list[i].id);
        } else {
          for (let j = 0; j < afterData.length; j++) {
            if (afterData[j].id == productarray[0].product_list[i].id) {
              afterData[j].origin.push(productarray[0].product_list[i]);
              break;
            }
          }
        }
      }

      res.render("cart", {
        payment_message: payment_message,
        list: afterData,
        total_price: total_price
      });
    } else {
      res.render("cart", {
        payment_message: payment_message,
        list: [],
        total_price: total_price
      });
    }

    //res.send(productarray);
  });
});

router.post("/clearCart", function(req, res) {
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  my_cart.product_list = [];
  my_cart.save();
  res.redirect("/myCart");
});

router.post("/updateCart", function(req, res) {
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  let pid = req.query.id;
  let index = 0;
  for (index = 0; index < my_cart.product_list.length; index++) {
    if (my_cart.product_list[index].id == pid) {
      my_cart.product_list.splice(index, 1);
      my_cart.save();
      break;
    }
  }
  res.redirect("/myCart");
});

//Pay
router.post("/payCart", function(req, res) {
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  my_cart.product_list = [];
  my_cart.save();
  set_payment_message("Successful Payment, enjoy!")
  res.redirect("/myCart");
});

router.get("/addNew", function(request, response, next) {
  Product.find({}, function(err, product_list) {
    try {
      response.render("addNew", { foot: product_list });
    } catch (err) {
      next(err);
    }
  });
});

router.get("/addOne", function(request, response, next) {
  Product.find({}, function(err, product_list) {
    try {
      response.render("addNew", { foot: product_list });
    } catch (err) {
      next(err);
    }
  });
});

router.post("/addone", function(req, res) {
  let product = new Product(req.body);
  product.save();

  res.redirect("/productadmin");
});

//DELETE
router.post("/delete", function(req, res) {
  Product.findOne({ id: req.query.id }, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
        res.redirect("/productadmin");
      }
    });
  });
});

module.exports = router;
