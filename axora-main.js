document.addEventListener("DOMContentLoaded", () => {
  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.querySelector(".sidebar")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 768 &&
      sidebar &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      event.target !== sidebarToggle
    ) {
      sidebar.classList.remove("open")
    }
  })

  // Close notification banner
  const closeNotification = document.querySelector(".close-notification")
  const notificationBanner = document.querySelector(".notification-banner")

  if (closeNotification && notificationBanner) {
    closeNotification.addEventListener("click", () => {
      notificationBanner.style.display = "none"
      // Adjust content padding
      document.querySelector(".sidebar").style.paddingTop = "0"
      document.querySelector(".content").style.paddingTop = "1rem"
    })
  }

  // Copy code functionality
  const copyButtons = document.querySelectorAll(".copy-button")

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const codeBlock = this.closest(".code-block").querySelector("pre code")
      const textToCopy = codeBlock.textContent

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // Change icon temporarily to show success
          const originalIcon = this.innerHTML
          this.innerHTML = '<i class="fa-solid fa-check"></i>'

          setTimeout(() => {
            this.innerHTML = originalIcon
          }, 2000)
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err)
        })
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-bar input")

  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.style.boxShadow = "0 0 0 2px var(--primary)"
    })

    searchInput.addEventListener("blur", function () {
      this.parentElement.style.boxShadow = "var(--shadow-sm)"
    })

    // Keyboard shortcut for search
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        searchInput.focus()
      }
    })
  }

  // Feedback buttons
  const feedbackButtons = document.querySelectorAll(".feedback-btn")

  feedbackButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active state
      feedbackButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      this.style.backgroundColor = "var(--primary-light)"
      this.style.color = "var(--primary)"

      // In a real implementation, you would send this feedback to your server
      console.log("Feedback submitted:", this.innerHTML)

      // Show thank you message
      const feedbackSection = this.closest(".feedback-section")
      const originalContent = feedbackSection.innerHTML

      feedbackSection.innerHTML = `
                <div style="text-align: center; width: 100%;">
                    <i class="fa-solid fa-heart" style="color: var(--primary); font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <p>Thanks for your feedback!</p>
                </div>
            `

      // Reset after a few seconds in a real implementation
      // setTimeout(() => {
      //     feedbackSection.innerHTML = originalContent;
      // }, 3000);
    })
  })
})

