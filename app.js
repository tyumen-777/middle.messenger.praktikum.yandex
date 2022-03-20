const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on PORT ${PORT}`);
});
