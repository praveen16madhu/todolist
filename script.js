const addTaskButton = document.getElementById("addTaskButton");
const completeAllTasksButton = document.getElementById("completeAllTasksButton");
const clearTasksButton = document.getElementById("clearTasksButton");
const newTaskInput = document.getElementById("newTaskInput");
const taskItems = document.getElementById("taskItems");
const taskStatus = document.getElementById("taskStatus");

addTaskButton.addEventListener("click", createTask);
completeAllTasksButton.addEventListener("click", markAllTasksCompleted);
clearTasksButton.addEventListener("click", removeAllTasks);

newTaskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    createTask();
  }
});

function createTask() {
  const taskContent = newTaskInput.value.trim();
  if (taskContent) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span class="checkmark">&#10004;</span>
      <span>${taskContent}</span>
      <span class="remove">X</span>
    `;
    taskItems.appendChild(taskItem);
    newTaskInput.value = "";
    attachTaskEvents(taskItem);
    updateTaskStatus();
  }
}

function attachTaskEvents(taskItem) {
  const checkmark = taskItem.querySelector(".checkmark");
  const removeBtn = taskItem.querySelector(".remove");
  
  checkmark.addEventListener("click", toggleTaskCompletion);
  removeBtn.addEventListener("click", removeTask);
}

function toggleTaskCompletion(event) {
  const task = event.target.parentElement;
  task.classList.toggle("completed");
  updateTaskStatus();
}

function removeTask(event) {
  const task = event.target.parentElement;
  taskItems.removeChild(task);
  updateTaskStatus();
}

function markAllTasksCompleted() {
  const tasks = taskItems.children;
  let areAllTasksCompleted = true;

  for (const task of tasks) {
    if (!task.classList.contains("completed")) {
      areAllTasksCompleted = false;
      break;
    }
  }

  for (const task of tasks) {
    if (areAllTasksCompleted) {
      task.classList.remove("completed");
    } else {
      task.classList.add("completed");
    }
  }

  updateTaskStatus();
}

function removeAllTasks() {
  taskItems.innerHTML = "";
  updateTaskStatus();
}

function updateTaskStatus() {
  const totalTasks = taskItems.children.length;
  const completedTasks = taskItems.querySelectorAll(".completed").length;
  taskStatus.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}
