const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  // GitHubから送られてきたpayloadを受け取る
  const payload = req.body;

  // GitHubのリポジトリ名やブランチ名などを確認する
  if (payload.ref === 'refs/heads/main') {  // mainブランチへのpushをトリガー
    exec('git pull origin main', { cwd: '/path/to/your/repo' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Git pull failed');
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.status(200).send('Git pull executed');
    });
  } else {
    res.status(200).send('Not a main branch push');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
