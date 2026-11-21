const LoginForm = document.getElementById('loginForm');
const RegisterForm = document.getElementById('regForm');
const VerificateForm = document.getElementById('verificateForm')
const BlockVerificateForm = document.getElementById("container")
const loginText = document.getElementById('login');
const regText = document.getElementById('reg');
const FuckingP=document.querySelectorAll('p:empty');
const ul = document.querySelectorAll("ul")
const formWrapper=document.querySelector('#form_wraper');
const codeInput1 = document.getElementById("id_code1");
const codeInput2 = document.getElementById("id_code2");
const codeInput3 = document.getElementById("id_code3");
const codeInput4 = document.getElementById("id_code4");
const codeInput5 = document.getElementById("id_code5");
const codeInput6 = document.getElementById("id_code6");
const dataError = document.querySelector("#dataError")
const hidden = document.querySelectorAll(".hidden") !== null

hidden.hidden = true;

codeInputList = [codeInput1, codeInput2, codeInput3, codeInput4, codeInput5, codeInput6]

formWrapper.style.display  = 'flex';
BlockVerificateForm.style.display ='none' ;

function show(show_form){
    LoginForm.hidden = !show_form;
    RegisterForm.hidden = show_form;
    
    loginText.classList.toggle('active', show_form);
    regText.classList.toggle('active', !show_form);

}

document.getElementById("login").addEventListener('click', () => show(true));
document.getElementById("GoBackButton").addEventListener('click', () => {
    BlockVerificateForm.style.display ='none' ;
    formWrapper.style.display  = 'flex';
    show(false)
});
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
    if (data.success){
        formWrapper.style.display = 'none';
        BlockVerificateForm.style.display = 'flex';
    }
    else{
        if (dataError.textContent.trim() === ''){
        dataError.hidden = false;
        Object.values(data.errors).forEach(messages => {
        dataError.append(messages.join(', '));
        console.log(data.errors)
        });
        }
    }
})

sendingForm(VerificateForm, (data)=>{
    if (data.success){
        formWrapper.style.display = 'flex';
        BlockVerificateForm.style.display = 'none';
        show(false)
    }
    else{
        if (dataError.textContent.trim() === ''){
        dataError.hidden = false;
        Object.values(data.errors).forEach(messages => {
        dataError.append(messages.join(', '));
        });
        }
    }
})

sendingForm(LoginForm, (data)=>{
    if (data.success){
        window.location.href = "/posts"
    }
    else{
        if (dataError.textContent.trim() === ''){
        dataError.hidden = false;
        Object.values(data.errors).forEach(messages => {
        dataError.append(messages.join(', '));
        });
        }
    }
})


function moveToNextInput(currentInput, nextInput) {
    if (currentInput.value.length === 1 && nextInput) {
        nextInput.focus();
    }
}

for (let i = 0; i < codeInputList.length; i++) {
    const currentInput = codeInputList[i];
    const nextInput = codeInputList[i + 1];
    const prevInput = codeInputList[i - 1];

    currentInput.addEventListener("input", () => {
        moveToNextInput(currentInput, nextInput);
    });


    currentInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !currentInput.value && prevInput) {
            prevInput.focus();
        }
    });
}

