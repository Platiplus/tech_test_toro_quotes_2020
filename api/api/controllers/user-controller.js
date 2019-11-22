// DEPENDENCIES
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const axios = require('axios').default

// MODEL IMPORTING
const User = require('../models/user-model').model
const Stock = require('../models/stock-model').model

// CREATE A NEW USER
const create = async (request, response) => {
  let createdUser
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

      createdUser = await user.save()

      const operation = await axios.post(`${process.env.API_URL}/accounts/${user._id}`)

      const data = {
        message: 'User created succesfully!',
        createdUser: {
          _id: createdUser._id,
          username: createdUser.username
        },
        createdAccount: {
          _id: operation.data.createdAccount._id,
          owner: operation.data.createdAccount.owner,
          balance: operation.data.createdAccount.balance
        }
      }
      response.status(201).json(data)
    } else {
      response.status(409).json({ error: true, message: 'User Already Exists' })
    }
  } catch (error) {
    const err = {
      status: error.response.status || 500,
      message: error.response.data.message || 'Operation not completed'
    }
    if (createdUser !== undefined) {
      await User.findByIdAndDelete(createdUser._id)
    }
    response.status(err.status).json({ message: err.message })
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

    if (!dbUser) {
      return response.status(404).json({ error: true, message: 'User not found on database' })
    }

    let index

    switch (action) {
      case 'BUY':
        index = dbUser.stocks.map((userStock) => { return userStock.name }).indexOf(stock.name)
        if (index === -1) {
          const bought = new Stock({
            _id: mongoose.Types.ObjectId(),
            name: stock.name,
            quantity: stock.quantity
          })
          dbUser.stocks.push(bought)
        } else {
          dbUser.stocks[index].quantity += stock.quantity
        }
        break
      case 'SELL':
        index = dbUser.stocks.map((userStock) => { return userStock.name }).indexOf(stock.name)
        if (index === -1) {
          return response.status(404).json({ error: true, message: 'User does not have this stock on the account' })
        } else {
          if (dbUser.stocks[index].quantity - stock.quantity < 0) {
            return response.status(400).json({ error: true, message: `User doest not have ${stock.quantity} shares of this stock to sell` })
          } else {
            dbUser.stocks[index].quantity -= stock.quantity
            if (dbUser.stocks[index].quantity === 0) {
              dbUser.stocks.splice(index, 1)
            }
          }
        }
        break

      default:
        return response.status(400).json({ error: true, message: 'Action not registered' })
    }

    await axios.patch(`${process.env.API_URL}/accounts/${dbUser._id}`, { action, value: stock.value })

    await dbUser.save()

    response.status(200).json({ message: 'Operation successfull' })
  } catch (error) {
    const err = {
      status: error.response.status || 500,
      message: error.response.data.message || 'Operation not completed'
    }
    response.status(err.status).json({ message: err.message })
  }
}

module.exports = {
  create,
  read,
  update
}
