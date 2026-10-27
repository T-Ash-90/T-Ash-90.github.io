const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  if (req.path.includes(".")) {
    return next();
  }

  const htmlPath = path.join(__dirname, `${req.path}.html`);

  res.sendFile(htmlPath, (err) => {
    if (err) next();
  });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
});
