import logo from './logo.svg';
import Papa from 'papaparse';
import './App.css';
import { useEffect, useState } from 'react';


const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1L7O902h4XCTaMP2iFCnIPy0j5XES3L2DbYmYB6KA8Bg/export?format=csv";
const EVENT_FUNCTION_URL = "https://4fo54lv2w3.execute-api.us-east-1.amazonaws.com/default/events_fetch";


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // user input 
  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });

  /* Handle user change */ 
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };


  useEffect(() => {
    (async () => {
      const csvString = await fetch(SPREADSHEET_URL).then(e => e.text());
      const results = Papa.parse(csvString, {header: true});
      console.log(results);
      setEvents(results.data);
      setLoading(false);
    })();
  }, []);
  const submitForm = async () => {
  const data = {'name': 'testname'}; 

  const results = await fetch(EVENT_FUNCTION_URL, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
    }).then(
    function (response) {
          console.log(response);
          console.log(data.name);
        },
    );

    window.location.href="http://www.mysocket.xyz";
  };

  
  if (loading) {
    return "Loading...";
  }
  console.log(events);
  return (
      <div className="App">
      <input type="text" placeholder="Twitter username" />
      <table>
        <tr>
        <th>Going</th>
          <th>Name</th>
          <th>date</th>
          <th>Time</th>
        </tr>
        {events.map((val, key) => {
          return (
            <tr key={key}>
              <td><label class="switch">
              <input type="checkbox" 
              onChange={handleChange}
              />
              <span class="slider round">
              </span></label></td>
              <td>{val.name}</td>
              <td>{val.date}</td>
              <td>{val.time}</td>
            </tr>
          )
        })}
      </table>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}

export default App;
