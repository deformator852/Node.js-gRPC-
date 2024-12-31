const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const parseArgs = require('minimist')
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
  const argv = parseArgs(process.argv.slice(2), { string: 'target' })
  let target
  if (argv.target) {
    target = argv.target
  } else {
    target = 'localhost:50051'
  }
  const client = new parsec_proto.Parsec(
    target,
    grpc.credentials.createInsecure()
  )
  client.HowManyEarthWidthInParsec({}, function (err, response) {
    console.log(`Answer: ${response.message} earth in one parsec`)
  })
}

main()
