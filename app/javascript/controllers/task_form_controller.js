import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["input", "submitButton"]

    connect() {
        console.log("Task form controller connected", this.element)
        // Validasi saat awal load
        if (this.hasInputTarget) {
            this.validateInputWithoutError()
        }
    }

    // Validasi tanpa menampilkan error message
    validateInputWithoutError() {
        const input = this.inputTarget
        const submitButton = this.hasSubmitButtonTarget ? 
            this.submitButtonTarget : 
            this.element.querySelector('input[type="submit"]')
        
        if (!input.value.trim()) {
            submitButton.disabled = true
            submitButton.classList.add('btn-disabled')
            submitButton.classList.remove('btn-primary')
        } else {
            submitButton.disabled = false
            submitButton.classList.remove('btn-disabled')
            submitButton.classList.add('btn-primary')
        }
    }

    // Validasi dengan menampilkan error message saat submit
    validateOnSubmit(e) {
        const input = this.inputTarget
        
        if (!input.value.trim()) {
            e.preventDefault()
            input.classList.add('invalid')
            
            // Tampilkan pesan error
            let errorMessage = input.parentNode.querySelector('.error-message')
            if (!errorMessage) {
                errorMessage = document.createElement('div')
                errorMessage.className = 'error-message'
                errorMessage.textContent = 'Task tidak boleh kosong'
                input.insertAdjacentElement('afterend', errorMessage)
            }
        }
    }

    // Menghapus pesan error ketika user mulai mengetik dan update warna tombol
    hideError(e) {
        const input = e.target
        const submitButton = this.hasSubmitButtonTarget ? 
            this.submitButtonTarget : 
            this.element.querySelector('input[type="submit"]')
        
        if (input.value.trim()) {
            // Input valid, enable tombol submit dan hapus error
            submitButton.disabled = false
            submitButton.classList.remove('btn-disabled')
            submitButton.classList.add('btn-primary')
            input.classList.remove('invalid')
            
            // Hapus pesan error jika ada
            const errorMessage = input.parentNode.querySelector('.error-message')
            if (errorMessage) {
                errorMessage.remove()
            }
        } else {
            // Input masih kosong, disable tombol dan ubah warna
            submitButton.disabled = true
            submitButton.classList.add('btn-disabled')
            submitButton.classList.remove('btn-primary')
        }
    }
}