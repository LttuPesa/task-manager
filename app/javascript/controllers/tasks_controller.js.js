import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        console.log(this.element)
        // Inisialisasi checkbox yang sudah terpilih saat halaman dimuat
        this.initializeCompletedTasks()
    }

    initializeCompletedTasks() {
        // Cek semua checkbox dan terapkan styling pada load halaman
        const checkboxes = this.element.querySelectorAll('.task-checkbox')
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const taskItem = checkbox.closest('.task-item')
                const taskText = taskItem.querySelector('.task-text')
                taskText.classList.add('completed')
            }
        })
    }

    toggle(e) {
        const id = e.target.dataset.id
        const csrfToken = document.querySelector("[name='csrf-token']").content
        const taskItem = e.target.closest('.task-item')
        const taskText = taskItem.querySelector('.task-text')
        
        // Toggle class untuk efek coret
        if (e.target.checked) {
            taskText.classList.add('completed')
        } else {
            taskText.classList.remove('completed')
        }

        fetch(`/tasks/${id}/toggle`, {
            method: 'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ completed: e.target.checked })
        })
        .then(response => response.json())
        .then(data => {
            // Hapus alert dan ganti dengan notifikasi yang lebih halus jika diperlukan
            // alert(data.message)
        })
        .catch(error => {
            console.error("Error updating task:", error)
        })
    }

    delete(e){
        const confirmed = confirm("Are you sure?")

        if(!confirmed){
            e.preventDefault()
        }
    }
}