const BaseCommand = require('common-bin')

class Command extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  get context () {
    return super.context
  }
}

module.exports = Command