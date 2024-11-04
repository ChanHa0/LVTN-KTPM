const { DataTypes } = require('sequelize');

function initModels(sequelize) {
  // Định nghĩa các models
  const Admin = require("./admin")(sequelize, DataTypes);
  const Category = require("./category")(sequelize, DataTypes);
  const Customer = require("./customer")(sequelize, DataTypes);
  const Manageproduct = require("./manageproduct")(sequelize, DataTypes);
  const Order = require("./order")(sequelize, DataTypes);
  const Payment = require("./payment")(sequelize, DataTypes);
  const Product = require("./product")(sequelize, DataTypes);
  const Productcategory = require("./productcategory")(sequelize, DataTypes);
  const Review = require("./review")(sequelize, DataTypes);
  const Shoppingcart = require("./shoppingcart")(sequelize, DataTypes);

  // Định nghĩa các mối quan hệ
  Manageproduct.belongsTo(Admin, {
    as: "admin",
    foreignKey: "aId"
  });
  Admin.hasMany(Manageproduct, {
    as: "manageproducts",
    foreignKey: "aId"
  });

  Productcategory.belongsTo(Category, {
    as: "category",
    foreignKey: "cgCategoryid"
  });
  Category.hasMany(Productcategory, {
    as: "productcategories",
    foreignKey: "cgCategoryid"
  });

  Order.belongsTo(Customer, {
    as: "customer",
    foreignKey: "cId"
  });
  Customer.hasMany(Order, {
    as: "orders",
    foreignKey: "cId"
  });

  Payment.belongsTo(Customer, {
    as: "customer",
    foreignKey: "cId"
  });
  Customer.hasMany(Payment, {
    as: "payments",
    foreignKey: "cId"
  });

  Review.belongsTo(Customer, {
    as: "customer",
    foreignKey: "cId"
  });
  Customer.hasMany(Review, {
    as: "reviews",
    foreignKey: "cId"
  });

  Shoppingcart.belongsTo(Customer, {
    as: "customer",
    foreignKey: "cId"
  });
  Customer.hasMany(Shoppingcart, {
    as: "shoppingcarts",
    foreignKey: "cId"
  });

  return {
    Admin,
    Category,
    Customer,
    Manageproduct,
    Order,
    Payment,
    Product,
    Productcategory,
    Review,
    Shoppingcart
  };
}

module.exports = initModels;