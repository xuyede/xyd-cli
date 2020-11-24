// 和用户交互
const answer = require('../util/inquirer');
// shell操作
const shell = require('shelljs');
// 下载github模板
const download = require('download-git-repo');
// 加点颜色
const printJs = require('@darkobits/lolcatjs')['default'];
// loading
const ora = require('ora');
const chalk = require('chalk');
const clear = require('clear');
const os = require('os');
const { assert } = require('../util');

module.exports = dirname => {
  answer('create')
    .then( answers => {
      assert(answers.length !== 0, chalk.yellow('❌ 问答错误，退出程序！'), true /** exit */);
      dealAnswer(answers, dirname);
    });
}

// githu把模板地址
const simpleTemplate = 'direct:https://github.com//xuyede/vue-simple-template/archive/master.zip';
const officialTemplate = 'direct:https://github.com/xuyede/vue-official-template/archive/master.zip';
const reactTemplate = 'direct:https://github.com/xuyede/react-simple-template/archive/master.zip';

function dealAnswer(answers, dirname) {
  const _dirname = dirname;
  const _path = process.cwd();
  // 创建模版项目的路径
  const _projectPath = `${_path}/${_dirname}`;

  const templateSpinner = ora(chalk.yellow(' ｡O‿O｡ 正在下载模板,请稍等...'));
  const installSpinner = ora(chalk.yellow(' ｡O‿O｡ 正在安装相关依赖,请稍等...'));

  const { templateName, userName, userEmail, description, downloadMethod } = answers;
  const template = 
    templateName.includes('react') 
    ? reactTemplate 
    : (
      templateName.includes('simple') 
      ? simpleTemplate
      : officialTemplate
    );

  templateSpinner.start();
  // 创建相关的文件
  shell.cd(_path);
  shell.rm('-rf', _projectPath);
  shell.mkdir(_dirname);

  download(
    template, 
    _projectPath, 
    (err) => {
      templateSpinner.stop();
      if (err) {
        clear();
        console.error(`${chalk.yellow('☹下载模板失败 : ')}${chalk.red(err.message.trim())}`);
        process.exit(1);
      } else {
        // 替换package.json内容
        shell.sed('-i', '{{name}}', _dirname, `${_projectPath}/package.json`);
        shell.sed('-i', '{{author}}', `${userName} <${userEmail}>`, `${_projectPath}/package.json`);
        shell.sed('-i', '{{description}}', description, `${_projectPath}/package.json`);
        
        const isMacOs = os.type().includes('Darwin');
        const isNpm = downloadMethod === 'npm';
        const downloadStr = isNpm ? 'npm install' : 'yarn';
        // MacOs系统不进行自动下载依赖[个别电脑权限高的需要sudo命令]
        if (isMacOs) {
          console.log(`
    ${chalk.blue('✔模版下载完成,按照以下提示操作:')}
  
    » cd ${_dirname}
  
    » ${downloadStr}

    » ${ isNpm ? 'npm run dev' : 'yarn dev' }
          `)
        } else {
          console.log('✔ 模版下载完成');
          installSpinner.start()

          shell.exec(`cd ${_dirname} && ${downloadStr}`, { async: false }, () => {
            installSpinner.stop()
            clear()
            console.log(`
    ${chalk.blue('✔下载完成,按照以下提示运行项目:')}
  
    » cd ${_dirname}
  
    » ${ isNpm ? 'npm run dev' : 'yarn dev' }
            `)
          })
        }
      }
    }
  )
}
