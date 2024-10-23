var DataTypes = require("sequelize").DataTypes;
var _Admin = require("./admin");
var _Book = require("./book");
var _Bookcategory = require("./bookcategory");
var _Cartdetailiteam = require("./cartdetailiteam");
var _Category = require("./category");
var _Customer = require("./customer");
var _Managebook = require("./managebook");
var _Managecustomer = require("./managecustomer");
var _Manageorder = require("./manageorder");
var _Order = require("./order");
var _Orderdetail = require("./orderdetail");
var _Payment = require("./payment");
var _Review = require("./review");
var _Shoppingcart = require("./shoppingcart");

function initModels(sequelize) {
  var Admin = _Admin(sequelize, DataTypes);
  var Book = _Book(sequelize, DataTypes);
  var Bookcategory = _Bookcategory(sequelize, DataTypes);
  var Cartdetailiteam = _Cartdetailiteam(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  var Managebook = _Managebook(sequelize, DataTypes);
  var Managecustomer = _Managecustomer(sequelize, DataTypes);
  var Manageorder = _Manageorder(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Orderdetail = _Orderdetail(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Review = _Review(sequelize, DataTypes);
  var Shoppingcart = _Shoppingcart(sequelize, DataTypes);

  Admin.belongsToMany(Book, { as: 'bIdBookManagebooks', through: Managebook, foreignKey: "aId", otherKey: "bId" });
  Admin.belongsToMany(Customer, { as: 'cIdCustomers', through: Managecustomer, foreignKey: "aId", otherKey: "cId" });
  Admin.belongsToMany(Order, { as: 'oIdOrders', through: Manageorder, foreignKey: "aId", otherKey: "oId" });
  Book.belongsToMany(Admin, { as: 'aIdAdmins', through: Managebook, foreignKey: "bId", otherKey: "aId" });
  Book.belongsToMany(Order, { as: 'oIdOrderOrderdetails', through: Orderdetail, foreignKey: "bId", otherKey: "oId" });
  Book.belongsToMany(Shoppingcart, { as: 'scIdShoppingcarts', through: Cartdetailiteam, foreignKey: "bId", otherKey: "scId" });
  Customer.belongsToMany(Admin, { as: 'aIdAdminManagecustomers', through: Managecustomer, foreignKey: "cId", otherKey: "aId" });
  Order.belongsToMany(Admin, { as: 'aIdAdminManageorders', through: Manageorder, foreignKey: "oId", otherKey: "aId" });
  Order.belongsToMany(Book, { as: 'bIdBookOrderdetails', through: Orderdetail, foreignKey: "oId", otherKey: "bId" });
  Shoppingcart.belongsToMany(Book, { as: 'bIdBooks', through: Cartdetailiteam, foreignKey: "scId", otherKey: "bId" });
  Managebook.belongsTo(Admin, { as: "a", foreignKey: "aId" });
  Admin.hasMany(Managebook, { as: "managebooks", foreignKey: "aId" });
  Managecustomer.belongsTo(Admin, { as: "a", foreignKey: "aId" });
  Admin.hasMany(Managecustomer, { as: "managecustomers", foreignKey: "aId" });
  Manageorder.belongsTo(Admin, { as: "a", foreignKey: "aId" });
  Admin.hasMany(Manageorder, { as: "manageorders", foreignKey: "aId" });
  Bookcategory.belongsTo(Book, { as: "b", foreignKey: "bId" });
  Book.hasMany(Bookcategory, { as: "bookcategories", foreignKey: "bId" });
  Cartdetailiteam.belongsTo(Book, { as: "b", foreignKey: "bId" });
  Book.hasMany(Cartdetailiteam, { as: "cartdetailiteams", foreignKey: "bId" });
  Managebook.belongsTo(Book, { as: "b", foreignKey: "bId" });
  Book.hasMany(Managebook, { as: "managebooks", foreignKey: "bId" });
  Orderdetail.belongsTo(Book, { as: "b", foreignKey: "bId" });
  Book.hasMany(Orderdetail, { as: "orderdetails", foreignKey: "bId" });
  Review.belongsTo(Book, { as: "b", foreignKey: "bId" });
  Book.hasMany(Review, { as: "reviews", foreignKey: "bId" });
  Bookcategory.belongsTo(Category, { as: "category", foreignKey: "cgCategoryid" });
  Category.hasMany(Bookcategory, { as: "bookcategories", foreignKey: "cgCategoryid" });
  Managecustomer.belongsTo(Customer, { as: "c", foreignKey: "cId" });
  Customer.hasMany(Managecustomer, { as: "managecustomers", foreignKey: "cId" });
  Order.belongsTo(Customer, { as: "c", foreignKey: "cId" });
  Customer.hasMany(Order, { as: "orders", foreignKey: "cId" });
  Payment.belongsTo(Customer, { as: "c", foreignKey: "cId" });
  Customer.hasMany(Payment, { as: "payments", foreignKey: "cId" });
  Review.belongsTo(Customer, { as: "c", foreignKey: "cId" });
  Customer.hasMany(Review, { as: "reviews", foreignKey: "cId" });
  Shoppingcart.belongsTo(Customer, { as: "c", foreignKey: "cId" });
  Customer.hasMany(Shoppingcart, { as: "shoppingcarts", foreignKey: "cId" });
  Manageorder.belongsTo(Order, { as: "o", foreignKey: "oId" });
  Order.hasMany(Manageorder, { as: "manageorders", foreignKey: "oId" });
  Orderdetail.belongsTo(Order, { as: "o", foreignKey: "oId" });
  Order.hasMany(Orderdetail, { as: "orderdetails", foreignKey: "oId" });
  Payment.belongsTo(Order, { as: "o", foreignKey: "oId" });
  Order.hasMany(Payment, { as: "payments", foreignKey: "oId" });
  Cartdetailiteam.belongsTo(Shoppingcart, { as: "sc", foreignKey: "scId" });
  Shoppingcart.hasMany(Cartdetailiteam, { as: "cartdetailiteams", foreignKey: "scId" });
  Order.belongsTo(Shoppingcart, { as: "sc", foreignKey: "scId" });
  Shoppingcart.hasMany(Order, { as: "orders", foreignKey: "scId" });

  return {
    Admin,
    Book,
    Bookcategory,
    Cartdetailiteam,
    Category,
    Customer,
    Managebook,
    Managecustomer,
    Manageorder,
    Order,
    Orderdetail,
    Payment,
    Review,
    Shoppingcart,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
