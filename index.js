const path = require('path')
const Command = require('./lib/command.js')

const usage = 'Usage: xyd-bin <command> [options]'

class XydCli extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.usage = usage

    this.load(path.join(__dirname, './lib/cmd'))
  }
}

module.exports = exports = XydCli