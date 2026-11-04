const LoginForm = document.getElementById('loginForm');
const RegisterForm = document.getElementById('regForm');
const loginText = document.getElementById('login');
const regText = document.getElementById('reg');
const FuckingP=document.querySelectorAll('p:empty');
const ul = document.querySelectorAll("ul")

function show(show_form){
    LoginForm.hidden = !show_form;
    RegisterForm.hidden = show_form;
    
    loginText.classList.toggle('active', show_form);
    regText.classList.toggle('active', !show_form);

}

document.getElementById("login").addEventListener('click', () => show(true));

document.getElementById("reg").addEventListener('click', () => show(false));
    
show(true);

FuckingP.forEach(tag => {
    if (tag.attributes.length === 0){
        tag.remove()
    }
})

ul.forEach(tag => {
    if (tag.attributes.length === 0){
        tag.remove()
    }
})
