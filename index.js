import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
import cors from "cors"
import path, { join } from "path";

const app = express();
const __dirname = path.resolve();
const port = 7845;

app.use(express.json());
app.use(express.text());
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req,res)=>{
    res.send("Hie")
})

app.get("/btn", (req,res)=>{
  res.render("button")
})

app.post('/proxy', async (req, res) => {
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
    // res.send(response.data);
    console.log("Hiiiie");
    
    console.log(response.data)

    res.status(200).json({
      success:true,
      data:response.data
    })
  } catch (error) {
    console.log("catch stament", error.message);
    res.status(500).json({
      success:false,
      error
    });
  }
});

app.listen(port, () => console.log(`Server running at ${port}`));
