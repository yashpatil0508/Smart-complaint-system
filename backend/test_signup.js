async function testSignup() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test User",
        email: "test2@example.com",
        mobile: "1234567890",
        password: "password123",
        role: "citizen"
      })
    });
    const data = await response.json();
    console.log(response.status, data);
  } catch (e) {
    console.error(e);
  }
}

testSignup();
