// DEPENDENCIES
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

// MODEL IMPORTING
const User = require('../models/user-model').model
const Account = require('../models/account-model').model
const Stock = require('../models/stock-model').model

// CREATE A NEW USER
const create = async (request, response) => {
  try {
    const dbUser = await User.findOne({ username: request.body.username.toLowerCase() })

    if (!dbUser) {
      const { username, password } = request.body

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: username.toLowerCase(),
        password: hash
      })
      const account = new Account({
        _id: mongoose.Types.ObjectId(),
        owner: user._id,
        balance: 0.0
      })

      const createdUser = await user.save()
      const createdAccount = await account.save()

      const data = {
        message: 'User created succesfully!',
        createdUser: {
          _id: createdUser._id,
          username: createdUser.username
        },
        createdAccount: {
          _id: createdAccount._id
        }
      }
      response.status(201).json(data)
    } else {
      response.status(409).json({ error: true, message: 'User Already Exists' })
    }
  } catch (error) {
    response.status(500).json({ error: true, message: error })
  }
}

// READ AN USER
const read = async (request, response) => {
  try {
    const dbUser = await User.findById(mongoose.Types.ObjectId(request.params.id))

    if (!dbUser) {
      return response.status(404).json({ error: true, message: 'User not found on database' })
    }

    const data = {
      user: {
        _id: dbUser._id,
        username: dbUser.username,
        stocks: dbUser.stocks
      }
    }

    response.status(200).json(data)
  } catch (error) {
    response.status(500).json({ error: true, message: error })
  }
}

// UPDATE AN USER
const update = async (request, response) => {
  try {
    const { stock, action } = request.body
    const id = mongoose.Types.ObjectId(request.params.id)

    const dbUser = await User.findById(id)
    const dbAccount = await Account.findOne({ owner: id })

    if (!dbUser) {
      return response.status(404).json({ error: true, message: 'User not found on database' })
    }

    let index

    switch(action){
      case 'BUY':
        if(dbAccount.balance - stock.value < 0){
          return response.status(400).json({ error: true, message: 'Insufficient funds'})
        }
        index = dbUser.stocks.map((userStock) => { return userStock.name; }).indexOf(stock.name);
        if(index === -1){
          let bought = new Stock({
            _id: mongoose.Types.ObjectId(),
            name: stock.name,
            quantity: stock.quantity
          })
          dbUser.stocks.push(bought)
        } else {
          dbUser.stocks[index]['quantity'] += stock.quantity
        }
        dbAccount.balance -= stock.value
        break;
      case 'SELL':
        index = dbUser.stocks.map((userStock) => { return userStock.name; }).indexOf(stock.name);
        if(index === -1){
          return response.status(404).json({ error: true, message: 'User does not have this stock on the account'})
        } else {
          if(dbUser.stocks[index]['quantity'] - stock.quantity < 0){
            return response.status(400).json({ error: true, message: `User doest not have ${stock.quantity} shares of this stock to sell` })
          } else {
            dbUser.stocks[index]['quantity'] -= stock.quantity
            if(dbUser.stocks[index]['quantity'] == 0){
              dbUser.stocks.splice(index, 1)
            }
            dbAccount.balance += stock.value
          }
        }
        break;
      
      default:
        return response.status(400).json({ error: true, message: 'Action not registered'})
    }

    await dbUser.save()
    await dbAccount.save()

    response.status(200).json({ message: 'Operation successfull' })
  } catch (error) {
    response.status(500).json({ message: 'Operation not completed' })
  }
}

module.exports = {
  create,
  read,
  update,
}
