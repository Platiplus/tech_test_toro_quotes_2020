// DEPENDENCIES
const WebSocketClient = require('websocket').client
const io = require('socket.io')
const http = require('http')
// SERVERS CREATION
const httpServer = http.createServer()
const stockClient = new WebSocketClient()
// REGISTERED CLIENTS
const clients = []
// SERVER LISTENER
httpServer.listen(1337, function () {
  console.log((new Date()) + ' Server is listening on port ' + 1337)
})
// IO LISTENER
const stockServer = io(httpServer)

// EVENT HANDLING FOR WS SERVER
stockServer.on('connect', (socket) => {
  // CLIENT-SIDE RELATED LOGIC
  const clientConnection = socket
  clients.push(clientConnection)

  clientConnection.on('message', (message) => {
    clients.forEach(client => client.sendUTF(message.utf8Data))
  })

  clientConnection.on('close', (connection) => {
    const ix = clients.find(client => client.remoteAddress === connection.remoteAddress)
    clients.splice(ix, 1)
  })
  // STOCK CLIENT SERVER-SIDE LOGIC
  stockClient.on('connect', (stocksConnection) => {
    stocksConnection.on('error', (error) => {
      console.log('Connection Error: ' + error.toString())
    })
    stocksConnection.on('close', () => {
      console.log('Connection Closed')
    })
    stocksConnection.on('message', (message) => {
      clientConnection.emit('message', message)
    })
  })

  stockClient.connect('ws://localhost:8080/quotes')
})
