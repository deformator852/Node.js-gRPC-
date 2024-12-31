const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const PARSEC = 3.086e13
const EARTH_WIDTH = 12756

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
function parsecService() {
  const PROTO_FILE = __dirname + '/parsec.proto'
  const config = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
  const packageDefinition = protoLoader.loadSync(PROTO_FILE, config)
  const proto = grpc.loadPackageDefinition(packageDefinition).parsec

  return {
    proto: proto,
    procedures: {
      HowManyEarthWidthInParsec: (call, callback) => {
        const message = PARSEC / EARTH_WIDTH
        callback(null, { message })
      },
    },
  }
}

const server = new Server(50051)
const service = parsecService()
server.addService(service, 'Parsec')
server.run()
