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
  echoVersion
}