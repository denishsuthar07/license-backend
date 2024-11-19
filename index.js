import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
import cors from "cors"

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

// app.get("/", (req,res)=>{
//     res.send("Hie")
// })

app.post('/', async (req, res) => {
  try {
    const xmlPayload = `
          <XML>
            <HEADER>
              <PROCESS>SEARCH</PROCESS>
              <TIMESTAMP>20241119100226</TIMESTAMP>
              <SECURITYTOKEN>A63F4D6C-601D-407B-92E2-0997B5407E76</SECURITYTOKEN>
            </HEADER>
            <PAYLOAD>
              <GNDTLE01 id='idSearchPane'>
                <CONTROL name='dropdownlist'>%</CONTROL>
                <CONTROL name='searchtext'></CONTROL>
                <CONTROL name='SearchCriteriadropdownlist'>X</CONTROL>
                <CONTROL name='SearchAuthNb'>Z48-116-20S</CONTROL>
                <CONTROL name='Index'></CONTROL>
                <CONTROL name='Page'>1</CONTROL>
              </GNDTLE01>
            </PAYLOAD>
          </XML>
        `;

    const response = await axios.post('https://www.lars.police.vic.gov.au/LARS/LARS.asp?File=/Components/Screens/PSINFP03/PSINFP03.asp?Process=SEARCH', 
      xmlPayload, {
      headers: { 'Content-Type': 'text/xml', Accept: 'application/xml' },
    });
    res.send(response.data);
    console.log("Hiiiie");
    
    console.log(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => console.log(`Server running at ${port}`));
