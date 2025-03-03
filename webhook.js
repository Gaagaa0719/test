
const express = require('express');
const { exec } = require('child_process')

const app = express();

app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  response.status(202).send('Accepted');

  console.log(response)
  const githubEvent = request.headers['x-github-event'];

  if (githubEvent === 'push') {
    const data = request.body;

    if(data.ref === "refs/heads/main"){
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
              console.log(`stderr: ${stderr}`)
              return
            }
            console.log(`stdout: ${stdout}`)
            console.log("git pull command successful")
          }
        )
    }
  } else if (githubEvent === 'ping') {
    console.log('GitHub sent the ping event');
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
});

// This defines the port where your server should listen.
// 3000 matches the port that you specified for webhook forwarding. For more information, see [Forward webhooks](#forward-webhooks).
//
// Once you deploy your code to a server, you should change this to match the port where your server is listening.
const port = 3000;

// This starts the server and tells it to listen at the specified port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
