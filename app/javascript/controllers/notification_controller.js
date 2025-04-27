import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["notification"]
  
  connect() {
    if (this.hasNotificationTarget) {
      // Atur auto-dismiss notifikasi setelah beberapa detik
      setTimeout(() => {
        this.dismissNotification()
      }, 3000) // Notifikasi akan hilang setelah 3 detik
    }
  }
  
  dismissNotification() {
    // Tambahkan class untuk animasi fade out
    this.notificationTarget.classList.add('notification-hiding')
    
    // Setelah animasi selesai, hapus elemen notifikasi
    setTimeout(() => {
      this.notificationTarget.remove()
    }, 500) // Durasi animasi fadeout
  }
}