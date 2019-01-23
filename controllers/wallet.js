 const Wallet = require('../models/wallet');
 const mongoose = require('mongoose');
 const HttpStatus = require('http-status-codes');

const createWallet = async (req, res) => {
  const { email } = req.body;
  try {
    await Wallet.update({ email }, { email, amount: 0}, { upsert: true});
    return res
            .status(HttpStatus.CREATED)
            .send({
              message: `Waller created Successully for ${email}`
            });
  } catch (error) {
    return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
              message: `Error while creating wallet ${error}` 
            });
  }
}

const addMoney = async (req, res) => {
  console.log(req.body);
  const { email, amount } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const A = await Wallet.findOneAndUpdate({ email }, { $inc: { amount } }, opts);
    await session.commitTransaction();
    session.endSession();
    return res
            .status(HttpStatus.OK)
            .send({
              message: `${amount} added to ${email}. Current Balance: ${A.amount + amount} `
            });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
              message: `Transaction Failed. Error while adding money to wallet ${error}` 
            });
  }
}

const transferMoney = async (req, res) => {
  const { senderEmail, recieverEmail, amount }  = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const A = await Wallet.findOneAndUpdate({ email: senderEmail }, { $inc: { amount: -amount } }, opts);
    if (A.amount -  amount < 0) {
      throw new Error(`Transaction Failed. There is not sufficent balance to perform this operation. Current Balance ${A.amount}`);
    }
    const B = await Wallet.findOneAndUpdate({ email: recieverEmail }, { $inc: { amount } }, opts);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
              message: `Transaction Failed. Error while transfering money ${error}`
            })
  }
  return res
            .status(HttpStatus.OK)
            .send({
              message: `Transaction Complete.`
            });
}

module.exports = {
	createWallet,
	addMoney,
	transferMoney
}