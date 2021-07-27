const express = require('express');

const app = express();

const port = process.env.PORT || 9000;
app.use(express.urlencoded())

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello World");
});

const contactRoutes = require('./src/routes/contact.routes')

app.use('/contacts', contactRoutes)
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});