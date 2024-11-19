import express from 'express'
import axios from 'axios';
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 7845;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://www.lars.police.vic.gov.au/LARS/LARS.asp?File=/Components/Screens/PSINFP03/PSINFP03.asp?Process=SEARCH', req.body, {
      headers: { 'Content-Type': 'text/xml', Accept: 'application/xml' },
    });
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => console.log(`Server running at ${port}`));
