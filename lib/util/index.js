const compose = (...fn) => d => fn.reduceRight((d, f) => f(d), d);

const includes = arr => value => {
  if (typeof value === 'function') {
    return arr.some(value);
  } else {
    return arr.includes(value);
  }
}

const assert = (value, desc, exit = false) => {
  !value && console.log(desc);
  !value && exit && process.exit(1);
}

const echoVersion = version => {
  const text = [
    '     _                 ',                 
    '  __| | ___ _   _  ___ ',
    ' / _\` |/ _ \\ | | |/ _ \\',
    '| (_| |  __/ |_| |  __/',
    ' \\__,_|\\___|\\__, |\\___|',
    '            |___/     ',
    '',
    `version: ${version}`
  ]

  return text.join('\n');
}

module.exports = {
  compose, 
  includes, 
  assert,
  echoVersion
}