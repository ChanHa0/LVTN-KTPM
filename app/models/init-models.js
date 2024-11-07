var DataTypes = require("sequelize").DataTypes;
var _Cart = require("./cart");
var _Cartdetail = require("./cartdetail");
var _Order = require("./order");
var _Orderdetail = require("./orderdetail");
var _Payment = require("./payment");
var _Product = require("./product");
var _User = require("./user");

function initModels(sequelize) {
  var Cart = _Cart(sequelize, DataTypes);
  var Cartdetail = _Cartdetail(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Orderdetail = _Orderdetail(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Cart.belongsToMany(Product, { as: 'prIdProducts', through: Cartdetail, foreignKey: "cId", otherKey: "prId" });
  Order.belongsToMany(Product, { as: 'prIdProductOrderdetails', through: Orderdetail, foreignKey: "oId", otherKey: "prId" });
  Product.belongsToMany(Cart, { as: 'cIdCarts', through: Cartdetail, foreignKey: "prId", otherKey: "cId" });
  Product.belongsToMany(Order, { as: 'oIdOrders', through: Orderdetail, foreignKey: "prId", otherKey: "oId" });
  Cartdetail.belongsTo(Cart, { as: "c", foreignKey: "cId"});
  Cart.hasMany(Cartdetail, { as: "cartdetails", foreignKey: "cId"});
  Order.belongsTo(Cart, { as: "c", foreignKey: "cId"});
  Cart.hasMany(Order, { as: "orders", foreignKey: "cId"});
  Orderdetail.belongsTo(Order, { as: "o", foreignKey: "oId"});
  Order.hasMany(Orderdetail, { as: "orderdetails", foreignKey: "oId"});
  Payment.belongsTo(Order, { as: "o", foreignKey: "oId"});
  Order.hasMany(Payment, { as: "payments", foreignKey: "oId"});
  Cartdetail.belongsTo(Product, { as: "pr", foreignKey: "prId"});
  Product.hasMany(Cartdetail, { as: "cartdetails", foreignKey: "prId"});
  Orderdetail.belongsTo(Product, { as: "pr", foreignKey: "prId"});
  Product.hasMany(Orderdetail, { as: "orderdetails", foreignKey: "prId"});
  Cart.belongsTo(User, { as: "u", foreignKey: "uId"});
  User.hasMany(Cart, { as: "carts", foreignKey: "uId"});
  Order.belongsTo(User, { as: "u", foreignKey: "uId"});
  User.hasMany(Order, { as: "orders", foreignKey: "uId"});
  Payment.belongsTo(User, { as: "u", foreignKey: "uId"});
  User.hasMany(Payment, { as: "payments", foreignKey: "uId"});

  return {
    Cart,
    Cartdetail,
    Order,
    Orderdetail,
    Payment,
    Product,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
