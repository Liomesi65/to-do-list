const addTaskBtns = document.querySelectorAll(".add-task");
let draggedItem = null;

const boxs = document.querySelectorAll(".tasks");

// loop through the add-task buttons and add a click event listener to each one
addTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const container = btn.parentElement;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter task name";
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.style.padding = "6px";
    addBtn.style.fontSize = "14px";
    addBtn.style.backgroundColor = "#fff";
    addBtn.style.border = "none";

    addBtn.addEventListener("click", () => {
      const taskName = input.value;
      const task = document.createElement("p");
      task.classList.add("draggable"); // set class to draggable instead of dragable

      task.textContent = taskName;
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.classList.add("edit-task");
      editBtn.addEventListener("click", () => {
        const taskName = task.textContent.trim(); // get current task name
        const input = document.createElement("input");
        input.type = "text";
        input.value = taskName;
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.style.padding = "6px";
        saveBtn.style.fontSize = "14px";
        saveBtn.style.backgroundColor = "#fff";
        saveBtn.style.border = "none";

        // add event listener to save button
        saveBtn.addEventListener("click", () => {
          const newTaskName = input.value;
          task.textContent = newTaskName;
          task.appendChild(editBtn);
          task.appendChild(deleteBtn);
          DRagDRop();
        });

        task.textContent = "";
        task.appendChild(input);
        task.appendChild(saveBtn);
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("delete-task");
      deleteBtn.addEventListener("click", () => {
        task.remove();
      });
      task.appendChild(editBtn);
      task.appendChild(deleteBtn);
      container.querySelector(".tasks").appendChild(task);
      input.value = "";

      input.remove();
      addBtn.remove();
      DRagDRop();
      // add drag and drop functionality to the new task
      task.setAttribute("draggable", true);
    });
    container.querySelector(".tasks").appendChild(input);
    container.querySelector(".tasks").appendChild(addBtn);
    // dragItem();
    DRagDRop();
  });
});

function DRagDRop() {
  const lists = document.querySelectorAll(".containercha");
  const list_items = document.querySelectorAll(".draggable");

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener("dragstart", function () {
      draggedItem = item;

      setTimeout(function () {
        // item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", function () {
      setTimeout(function () {
        draggedItem = null;
      }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });

      list.addEventListener("drop", function (e) {
        // e.preventDefault()
        list.append(draggedItem);
        this.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
      });
    }
  }
}

// save tasks to localStorage
function saveTasks() {
  const tasks = document.querySelectorAll(".draggable");
  const taskList = [];

  for (let i = 0; i < tasks.length; i++) {
    taskList.push(tasks[i].textContent);
  }

  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// load tasks from localStorage
function loadTasks() {
  const taskList = JSON.parse(localStorage.getItem("taskList"));

  if (taskList) {
    for (let i = 0; i < taskList.length; i++) {
      const task = document.createElement("p");
      task.classList.add("draggable");
      task.textContent = taskList[i];
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.classList.add("edit-task");
      editBtn.addEventListener("click", () => {
        // edit task
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("delete-task");
      deleteBtn.addEventListener("click", () => {
        task.remove();
        saveTasks();
      });
      task.appendChild(editBtn);
      task.appendChild(deleteBtn);
      document.querySelector(".tasks").appendChild(task);
      task.setAttribute("draggable", true);
    }
  }
}

// call loadTasks function when the page loads
window.onload = function () {
  loadTasks();
};

// call saveTasks function whenever a task is added, edited or deleted
addBtn.addEventListener("click", () => {
  // add new task
  saveTasks();
});

editBtn.addEventListener("click", () => {
  // edit task
  saveTasks();
});

deleteBtn.addEventListener("click", () => {
  // delete task
  saveTasks();
});
