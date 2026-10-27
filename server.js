const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
});
