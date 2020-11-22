const pkg = require('./package.json');

const config = {
  version: pkg['version'],
  // cli名称
  cliName: 'deye',
  // cli基础的用法
  cliUsage: '<command> [options]',
  // cli的简介
  cliDesc: '🔧 一个简易的项目初始化工具',
  // cli的命令列表
  cliCmd: [
    {
      cmd: 'c',
      action: cmdFileLoc('create'),
      description: '🏠 创建一个模版项目',
      arguments: '<project-name>',
    }
  ],
  cliExcludeReg: /^\-|\--/g
}

function cmdFileLoc(fileName) {
  return `${__dirname}/lib/cmd/${fileName}.js`;
}

module.exports = config;