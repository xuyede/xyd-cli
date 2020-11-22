// 和用户交互
const inquirer = require('inquirer')
// shell操作
const shell = require('shelljs')

const _create = dirname => {
  // 作者姓名和邮箱
  const userName = shell.exec('git config user.name', { silent: true }).slice(0, -1) || '';
  const userEmail = shell.exec('git config user.email', { silent: true }).slice(0, -1) || '';

  console.log(dirname, userName, userEmail)
}

module.exports = _create;