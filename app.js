const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on PORT ${PORT}`);
});
