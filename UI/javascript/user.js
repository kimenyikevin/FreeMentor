async function getData() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
  const password = document.getElementById('password').value;
  const address = document.getElementById('address').value;
  const bio = document.getElementById('bio').value;
  const occupation = document.getElementById('occupation').value;
  const expertise = document.getElementById('expertise').value;
  const header = new Headers();
  if (pass === password) {
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/json');
    const response = await fetch('../../api/v2/auth/signup', {
      method: 'post',
      headers: header,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        address,
        bio,
        occupation,
        expertise,
      }),
    });
    const data = await response.json();
    if (data.status !== 201) {
      const err = document.getElementById('message');
      err.innerHTML = data;
    }
    return data;
  }
  alert('password must match');
}
function signup() {
  getData()
    .then((data) => localStorage.setItem('user-token', JSON.stringify(data)));
  window.location.replace('./pages/user.html');
}
