const form = document.getElementById('form');
form.addEventListener('submit', postData);

const userSection = document.getElementById('users');

async function getUsers(){
    const userCollection = await fetch("http://localhost:3000/users");
    return userCollection;
};

async function createUserElements(){
    userSection.innerHTML = '';
    const userCollection = await getUsers();
    const userArray = await userCollection.json();
    userArray.forEach(user => createUserDiv(user));
};

function createUserDiv(user){
    let div = document.createElement('div');
    div.textContent = `Hi I am ${user.name} and I am ${user.age} years old!`
    userSection.appendChild(div);
};

async function postData(event){
    event.preventDefault();
    let data = {
        name: event.target.name.value,
        age: event.target.age.value
    };
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(
        "http://localhost:3000/users",
        options
    );
    const responseJson = await response.json();
    console.log(responseJson);
}

createUserElements();



//logging in with authentication

const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', login);

async function login(event){
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    let name = event.target.name2.value;
    let age = event.target.age2.value;

    let data = {
        username,
        password,
        name,
        age
    };
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(
        "http://localhost:3000/register",
        options
    );
    const responseJson = await response.json();
    console.log(responseJson);
}

