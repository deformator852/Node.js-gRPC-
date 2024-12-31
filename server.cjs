const grpc = require('@grpc/grpc-js')
const { parsecService } = require('./parsecService.cjs')

class Server {
  constructor(port) {
    this.server = new grpc.Server()
    this.port = port
  }
  run() {
    this.server.bindAsync(
      '0.0.0.0:50051',
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(`Server running at http://0.0.0.0:${port}`)
        this.server.start()
      }
    )
  }
  addService(service, serviceName) {
    this.server.addService(
      service.proto[serviceName].service,
      service.procedures
    )
  }
}

const server = new Server(50051)
server.addService(parsecService, 'Parsec')
server.run()
