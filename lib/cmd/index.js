const fs = require('fs');
const chalk = require('chalk');
const { cliCmd } = require('../../config');
const { assert } = require('../../util');


const createCommand = program => {
  cliCmd.forEach(cmdInfo => {
    const { cmd, action, description, arguments } = cmdInfo;
    
    program
      .command(cmd)
      .description(description)
      .arguments(arguments)
      .action( dirname => {
        // 检测是否有相关的执行文件
        assert(
          checkFile(action), 
          [
            '',
            '',
            `     | ${chalk.red('命令')} ${chalk.yellow(cmd)} ${chalk.red('执行内部错误【缺少相关的执行文件】')}|`,
            '',
            ''
          ].join('\n'),
          true /** exit */
        )
        
        require(action)(dirname);
      })
  })
}

function checkFile(path) {
  return fs.existsSync(path);
}

module.exports = {
  createCommand
}