const LoginForm = document.getElementById('loginForm');
const RegisterForm = document.getElementById('regForm');
const loginText = document.getElementById('login');
const regText = document.getElementById('reg');

function show(show_form){
    LoginForm.hidden = !show_form;
    RegisterForm.hidden = show_form;
    
    loginText.classList.toggle('active', show_form);
    regText.classList.toggle('active', !show_form);

}

document.getElementById("login").addEventListener('click', () => show(true));

document.getElementById("reg").addEventListener('click', () => show(false));
    
show(true);