document.getElementById('add-task').addEventListener('click', function() {
  const taskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const taskText = taskInput.value.trim();
  const taskTime = taskTimeInput.value;

  if (taskText === '' || taskTime === '') return;

  const taskList = document.getElementById('task-list');

  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskDeadline = new Date(taskTime);
  const timeRemaining = taskDeadline - new Date();

  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="task-time">${new Date(taskDeadline).toLocaleString()}</span>
    <button class="finish-task">Finish</button>
    <button class="delete-task">Delete</button>
  `;

  const finishButton = taskItem.querySelector('.finish-task');
  finishButton.addEventListener('click', function() {
    taskItem.remove();
    document.body.classList.add('green-bg');
    setTimeout(() => document.body.classList.remove('green-bg'), 2000);
  });

  const deleteButton = taskItem.querySelector('.delete-task');
  deleteButton.addEventListener('click', function() {
    taskItem.remove();
    document.body.classList.add('red-bg');
    setTimeout(() => document.body.classList.remove('red-bg'), 2000);
  });

  taskList.appendChild(taskItem);

  taskInput.value = '';
  taskTimeInput.value = '';

  sortTasksByDeadline();

  setInterval(function() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
      const taskDeadline = new Date(task.querySelector('.task-time').textContent);
      const currentTime = new Date();

      if (taskDeadline < currentTime) {
        task.remove();
        document.body.classList.add('red-bg');
        setTimeout(() => document.body.classList.remove('red-bg'), 2000);
      }
    });
  }, 1000);
});

function sortTasksByDeadline() {
  const taskList = document.getElementById('task-list');
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    const timeA = new Date(a.querySelector('.task-time').textContent).getTime();
    const timeB = new Date(b.querySelector('.task-time').textContent).getTime();
    return timeA - timeB;
  });

  tasks.forEach(task => taskList.appendChild(task));
}
