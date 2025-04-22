document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", function () {
    console.log("Baizho gay");
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task");

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
    input.value = "";
  });
});
