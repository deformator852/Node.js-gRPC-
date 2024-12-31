const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

function serviceFactory(PROTO_FILE, procedures, packageName) {
  const config = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
  const packageDefinition = protoLoader.loadSync(PROTO_FILE, config)
  const proto = grpc.loadPackageDefinition(packageDefinition)[packageName]
  return {
    proto: proto,
    procedures: {
      ...procedures,
    },
  }
}

module.exports.serviceFactory = serviceFactory
