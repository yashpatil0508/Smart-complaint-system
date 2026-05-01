fetch('http://localhost:5000/api/complaints')
  .then(res => {
    console.log(`Status: ${res.status}`);
    return res.text();
  })
  .then(text => console.log(`Body: ${text.substring(0, 50)}...`))
  .catch(err => console.error(`Fetch Error:`, err));
