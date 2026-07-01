document.addEventListener("DOMContentLoaded", () => {

  // --- Mobile Hamburger Navigation Toggle ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("nav"); // Target the nav wrapper directly for animation

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });

    // Close menu automatically when clicking any menu links
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
      });
    });
  }

  // --- Dynamic Academic Planner Program ---
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Retrieve storage state, default to an empty list array if null
  let tasks = JSON.parse(localStorage.getItem("academic_tasks")) || [];

  function saveTasks() {
    localStorage.setItem("academic_tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    if (!taskList) return; // Exit logic wrapper if current page is not the planner page

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

      taskItem.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="complete-btn" onclick="toggleTask(${index})">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }

  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text !== "") {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
      }
    });

    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTaskBtn.click();
      }
    });
  }

  // Bind key dynamic mutations to global scope to service inline event triggers
  window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  renderTasks();


  // --- Contact Form Validation Logic ---
  const contactForm = document.getElementById("contact-form");
  const errorMsgDiv = document.getElementById("error-message");
  const successMsgDiv = document.getElementById("success-message");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      errorMsgDiv.style.display = "none";
      successMsgDiv.style.display = "none";
      errorMsgDiv.innerText = "";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      let validationErrors = [];

      // Requirement: No form fields should be empty
      if (!name || !email || !phone || !message) {
        validationErrors.push("All fields are required. Please fill out the form completely.");
      }

      // Requirement: Valid email format matching standard patterns
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email)) {
        validationErrors.push("Please provide a valid email structure (e.g., example@domain.com).");
      }

      // Requirement: Phone number digits-only numeric validation
      const phonePattern = /^[0-9]+$/;
      if (phone && !phonePattern.test(phone)) {
        validationErrors.push("The phone number field must contain only numerical digits.");
      }

      if (validationErrors.length > 0) {
        errorMsgDiv.innerHTML = validationErrors.join("<br>");
        errorMsgDiv.style.display = "block";
      } else {
        successMsgDiv.style.display = "block";
        contactForm.reset();
      }
    });
  }
});