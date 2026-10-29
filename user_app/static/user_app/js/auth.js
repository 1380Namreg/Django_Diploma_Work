const LoginForm = document.getElementById('loginForm');
const RegisterForm = document.getElementById('regForm');

LoginForm.hidden = true

function show(show) {
    LoginForm.hidden = !show;
    RegisterForm.hidden = show;
}

document.querySelectorAll('.login').forEach(el =>
    el.addEventListener('click', () => show(true)));

document.querySelectorAll('.register').forEach(el =>
    el.addEventListener('click', () => show(false)));

// forEach - метод позволяющий найти все классы/id из других файлов и использовать их