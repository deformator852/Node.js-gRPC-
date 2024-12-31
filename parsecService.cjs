const { serviceFactory } = require('./serviceFactory.cjs')

const PARSEC = 3.086e13

const HowManyWidthInParsec = (call, callback) => {
  const message = PARSEC / call.request.message
  callback(null, { message })
}

const ParsecInKilometers = (call, callback) => {
  callback(null, { message: PARSEC })
}
const parsecService = serviceFactory(
  __dirname + '/parsec.proto',
  {
    HowManyWidthInParsec,
    ParsecInKilometers,
  },
  'parsec'
)

module.exports.parsecService = parsecService
