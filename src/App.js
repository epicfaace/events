import logo from './logo.svg';
import Papa from 'papaparse';
import './App.css';
import { useEffect, useState } from 'react';

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1L7O902h4XCTaMP2iFCnIPy0j5XES3L2DbYmYB6KA8Bg/export?format=csv";
const EVENT_FUNCTION_URL = "https://4fo54lv2w3.execute-api.us-east-1.amazonaws.com/default/events_fetch";


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    // do something with results
  };

function displayTable(events){
    let table = '<table border="1">';
    table += '<tr><th>Going</th><th>Name</th><th>Date</th><th>Time</th></tr>'; 

    events.forEach((e, index) => {
    table = table + '<tr>';
    table = table+ '<td> <input type="checkbox" /></td>';
    table = table + '<td>${e.name}</td>';
    table = table + '<td>${e.date}</td>';
    table = table + '<td> ${e.time}</td>';
    table += '</tr>';
    });
    table += "</table>";
    document.getElementById("events-list").innerHTML = table;
}

  displayTable(events);
  
  if (loading) {
    return "Loading...";
  }
  console.log(events);


  return (
    <div className="App">
      <input type="text" placeholder="Twitter username" />
      
      // <div id="events-list">
      // // displayTable(events);

      // </div>



      <button onClick={submitForm}>Submit</button>
    </div>
  );
}

export default App;
