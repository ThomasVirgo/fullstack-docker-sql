const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', requestRegistration);



// AUTH FUNCTIONS

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        }
        const r = await fetch(`http://localhost:3000/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        const r = await fetch(`http://localhost:3000/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);
    window.location.hash = '#feed';
}

function logout(){
    localStorage.clear();
    window.location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

function isLoggedIn(){
    let token = localStorage.getItem("token");
    if (!token){
        console.log('not logged in')
        return false
    }

    const user = jwt_decode(token.split(' ')[1]);
    console.log(user);
    return true;
}

isLoggedIn();


