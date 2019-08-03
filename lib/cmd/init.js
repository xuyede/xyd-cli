const Command = require('../command.js')

const defaultDir = 'lesson_test'
const description = `xydcli init [xxx]: 输入初始化项目的名称，默认为${defaultDir}`

class InitCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  * run ({ argv }) {
    const dirName = argv._[0] || defaultDir
    console.log('xyd: %s', dirName)
  }

  get description () {
    return description
  }

}

module.exports = InitCommand