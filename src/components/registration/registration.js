import { RegistrationFunctions } from './registrationFunctions.js'

const form = document.getElementById('form-cadastro');
const registrationFunctions = new RegistrationFunctions();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
        userName: form['input-usuario'].value,
        password: form['input-senha'].value
    };

    registrationFunctions.registerNewUser(userData);
});

registrationFunctions.listenUserRegisterReturn();
