import logo from './logo.svg';
import Papa from 'papaparse';
import './App.css';
import { useEffect, useState } from 'react';

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1L7O902h4XCTaMP2iFCnIPy0j5XES3L2DbYmYB6KA8Bg/export?format=csv";
const EVENT_FUNCTION_URL = "https://2xlqhuidw2k6n2ys7lb6lsnaje0mpymr.lambda-url.us-east-1.on.aws/";

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
    const data = {};
    const results = await fetch(EVENT_FUNCTION_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(e => e.json());
    // do something with results
  };
  
  if (loading) {
    return "Loading...";
  }
  console.log(events);
  return (
    <div className="App">
      <input type="text" placeholder="Twitter username" />
      <div style={{"height": 500, "overflow": "auto"}}>
        {events.map(e => <div>
          <input type="checkbox" />
          Date: {e.date}<br />
          Time: {e.time}<br />
          ID: {e.id}<br />
          Name: {e.name}<br />
        </div>)}
      </div>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}

export default App;
