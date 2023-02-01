import { LoginFunctions } from './LoginFunctions.js'

const form = document.getElementById('form-login');
const loginFunctions = new LoginFunctions();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
        userName: form['input-usuario'].value,
        password: form['input-senha'].value
    };

    loginFunctions.authUser(userData);
});

loginFunctions.listenAuthUser();
loginFunctions.listenUserReturnMessage();
