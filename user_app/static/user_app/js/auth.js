const LoginForm = document.getElementById('loginForm');
const RegisterForm = document.getElementById('regForm');
const VerificateForm = document.getElementById('verificateForm')
const BlockVerificateForm = document.getElementById("container")
const loginText = document.getElementById('login');
const regText = document.getElementById('reg');
const FuckingP=document.querySelectorAll('p:empty');
const ul = document.querySelectorAll("ul")
const formWrapper = document.getElementById("form_wraper")



BlockVerificateForm.hidden = true


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


let isSending = false
function sendingForm(form, resultFunc){
    form.addEventListener('submit', async function (event){
        event.preventDefault()
        if(isSending == false){
            isSending = true 
            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "X-CSRFToken": form.querySelector("input[name='csrfmiddlewaretoken']").value
                },
                body: new FormData(form)
            })
            const data = await response.json()
            resultFunc(data)
            isSending = false
        }
    } )
}

sendingForm(RegisterForm, (data)=>{
    if (data.succes){
        formWrapper.hidden = true
        BlockVerificateForm.hidden = false
    }
    else{
        console.log(data.errors)
    }
})

sendingForm(VerificateForm, (data)=>{
    if (data.succe){
        BlockVerificateForm.hidden = true
        formWrapper.hidden = false
        show(false)
    }
    else{
        console.log(data.errors)
    }
})

sendingForm(LoginForm, (data)=>{
    if (data.succes){
        window.location.href = "/"
    }
    else{
        console.log(data.errors)
    }
})