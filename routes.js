"use strict";
const Wallet = require("./controllers/wallet.js")

module.exports.initRoutes = (router) => {
    router
        .route("/createWallet")
        .post( Wallet.createWallet );
    router
        .route("/addMoney")
        .post( Wallet.addMoney );
    router
        .route("/transfer")
        .post( Wallet.transferMoney );
};
