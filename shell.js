const { exec } = require('child_process')

exec('git pull', (err, stdout, stderr) => {
    if (err) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  }
)
console.log('わくわくBank')