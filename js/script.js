const inputs = document.querySelectorAll('input')
const button = document.querySelector('[type="submit"]')
const errorMsg = document.querySelector('.error')

class validation{
    constructor(){

    }

    emptyInput(currentInput){
        const newErrorMsg = errorMsg.cloneNode(true)

        switch(currentInput.id){
            case 'name':
                newErrorMsg.textContent = 'A name is required'
                break;
            case 'email':
                newErrorMsg.textContent = 'An e-mail is required'
                break;
            case 'password':
                newErrorMsg.textContent = 'A password is required'
                break;
            case 'confirm-password':
                newErrorMsg.textContent = 'A password confirmation is required'    
                break;
            default:
                return
        }

        const inputParent = currentInput.parentElement
        inputParent.style.paddingBottom = '0px'
        currentInput.setAttribute('class', 'error-input')
        inputParent.appendChild(newErrorMsg)
    }

    errorMsg(currentInput, errorMessage){
        if(!currentInput.classList.contains('error-input')){
            const newErrorMsg = errorMsg.cloneNode(true)
            const inputParent = currentInput.parentElement
    
            newErrorMsg.textContent = errorMessage
            currentInput.setAttribute('class', 'error-input')
            currentInput.style.outline = 'none'
            inputParent.appendChild(newErrorMsg)
        }
    }

    clean(currentInput){
        const inputParent = currentInput.parentElement
        const currentErrorMsg = inputParent.querySelector('p.error')

        currentErrorMsg.remove()
        currentInput.style.outline = ''
        currentInput.classList.remove('error-input')
    }

    }

const validateForm = new validation()

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        if(input.id === 'name'){
            const letterReg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

            if(!e.target.value.match(letterReg) && e.target.value !== ''){
                const error = 'Insert a name without special characters or numbers'
                validateForm.errorMsg(input, error)
            }else if(input.classList.contains('error-input')){
                validateForm.clean(input)
            }
        }
    })
})

button.addEventListener('click', (e) => {
    e.preventDefault()

    inputs.forEach((input) => {
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const inputValue = input.value
        const passwordInput = input.closest('#form').querySelector
        ('#password')

        if(input.classList.contains('error-input') && input.id !== 'name') validateForm.clean(input)

        if(input.classList.contains('error-input')){
            if(inputValue.match(emailReg) && input.id === 'email') validateForm.clean (input)
        }
        if(!input.classList.contains('error-input')){
            if(inputValue === '') validateForm.emptyInput(input)

            if(!inputValue.match(emailReg) && input.id === 'email' && inputValue !== ''){
                const error = 'Insert a valid E-mail'
                validateForm.errorMsg(input, error)
            }

            if(inputValue.length < 8 && input.id === 'password' && inputValue.length > 0){
                const error = 'Insert a password with at least 8 characteres'
                validateForm.errorMsg(input, error)
            }

            if(input.id === 'confirm-password' && inputValue !== passwordInput.value){
                const error = 'The passwords do not match'
                validateForm.errorMsg(input, error)
                console.log('dont matcvh')
            }
        }
    })
})

