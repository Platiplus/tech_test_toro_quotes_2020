// DEPENDENCIES
const mongoose = require('mongoose')

// MODEL IMPORTING
const User = require('../models/user-model').model
const Account = require('../models/account-model').model

// CREATE A NEW ACCOUNT
const create = async (request, response) => {
  try {
    const dbUser = await User.findById(mongoose.Types.ObjectId(request.params.id))

    if (!dbUser) {
      return response.status(404).json({ error: true, message: 'User not found on database' })
    }

    const account = new Account({
      _id: mongoose.Types.ObjectId(),
      owner: dbUser._id,
      balance: 0.0
    })

    const createdAccount = await account.save()

    const data = {
      message: 'Account created succesfully!',
      createdAccount: {
        _id: createdAccount._id,
        owner: createdAccount.owner,
        balance: createdAccount.balance
      }
    }

    response.status(201).json(data)
  } catch (error) {
    response.status(500).json({ error: true, message: error })
  }
}

// READ AN ACCOUNT
const read = async (request, response) => {
  try {
    const dbAccount = await Account.findOne({ owner: mongoose.Types.ObjectId(request.params.id) })

    if (!dbAccount) {
      return response.status(404).json({ error: true, message: 'Account not found on database' })
    }

    const data = {
      account: {
        _id: dbAccount._id,
        owner: dbAccount.owner,
        balance: dbAccount.balance
      }
    }

    response.status(200).json(data)
  } catch (error) {
    response.status(500).json({ error: true, message: error })
  }
}

// UPDATE DATA ON AN ACCOUNT
const update = async (request, response) => {
  try {
    const { action, value } = request.body
    const id = mongoose.Types.ObjectId(request.params.id)
    const dbAccount = await Account.findOne({ owner: id })

    switch (action) {
      case 'BUY':
      case 'WITHDRAWAL':
        if (dbAccount.balance - value < 0) {
          return response.status(400).json({ error: true, message: 'Insufficient funds' })
        }
        dbAccount.balance -= value
        break
      case 'SELL':
      case 'DEPOSIT':
        dbAccount.balance += value
        break

      default:
        return response.status(400).json({ error: true, message: 'Action not registered' })
    }

    await dbAccount.save()
    response.status(200).json({ message: 'Operation successfull' })
  } catch (error) {
    response.status(500).json({ error: true, message: 'Operation not completed' })
  }
}

module.exports = {
  create,
  read,
  update
}
