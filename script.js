
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const clearAll = document.getElementById("clearAll");

    // Load tasks from LocalStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const span = document.createElement("span");
        span.textContent = task.text;

        span.addEventListener("click", () => toggleComplete(index));

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", () => editTask(index));

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "🗑️";
        delBtn.addEventListener("click", () => deleteTask(index));

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
      });
      saveTasks();
    }

    // Add Task
    addBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        renderTasks();
      }
    });

    // Toggle Complete
    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    // Edit Task
    function editTask(index) {
      const newText = prompt("Edit task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    }

    // Delete Task
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    // Clear All
    clearAll.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        renderTasks();
      }
    });

    // Save to LocalStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Initial Render
    renderTasks();
