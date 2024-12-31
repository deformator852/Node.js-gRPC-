const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
//const parseArgs = require('minimist')
const PROTO_FILE = __dirname + '/parsec.proto'

const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const parsec_proto = grpc.loadPackageDefinition(packageDefinition).parsec

function main() {
  const target = 'localhost:50051'
  const client = new parsec_proto.Parsec(
    target,
    grpc.credentials.createInsecure()
  )
  let message = { message: 12756 }
  client.HowManyWidthInParsec(message, function (err, response) {
    console.log(`${response.message} earth fits in one parsec`)
  })
}

main()
