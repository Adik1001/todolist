let tasks = [];

document.getElementById('add-task').addEventListener('click', function() {
  const taskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const taskText = taskInput.value.trim();
  const taskTime = taskTimeInput.value;

  if (taskText === '' || taskTime === '') return;

  const task = {
    text: taskText,
    deadline: new Date(taskTime),
    completed: false
  };

  tasks.push(task);
  renderTasks();

  taskInput.value = '';
  taskTimeInput.value = '';
});

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.deadline - b.deadline);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    taskItem.innerHTML = `
      <span class="task-text">${task.text}</span>
      <span class="task-time">${task.deadline.toLocaleString()}</span>
      <button class="finish-task">Finish</button>
      <button class="delete-task">Delete</button>
    `;

    const finishButton = taskItem.querySelector('.finish-task');
    finishButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      document.body.classList.add('green-bg');
      setTimeout(() => document.body.classList.remove('green-bg'), 2000);
      renderTasks();
    });

    const deleteButton = taskItem.querySelector('.delete-task');
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      document.body.classList.add('red-bg');
      setTimeout(() => document.body.classList.remove('red-bg'), 2000);
      renderTasks();
    });

    taskList.appendChild(taskItem);
  });
}

setInterval(function() {
  const now = new Date();
  let removed = false;
  tasks = tasks.filter(task => {
    if (task.deadline > now) return true;
    removed = true;
    return false;
  });
  if (removed) {
    document.body.classList.add('red-bg');
    setTimeout(() => document.body.classList.remove('red-bg'), 2000);
    renderTasks();
  }
}, 1000);
