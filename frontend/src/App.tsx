import React, {useEffect} from 'react';
import './App.css';
import Register from 'pages/Registratier';

function App() {
  useEffect(() => {
    fetch('/api/health')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error('Fetch or JSON parse error:', err);
    });
  }, []);

  return (
    <div className="App">
      test
     <Register />
    </div>
  );
}

export default App;
