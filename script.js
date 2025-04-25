document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="delete-task">Delete</button>
    `;
    
    taskItem.querySelector('.delete-task').addEventListener('click', function() {
      taskList.removeChild(taskItem);
    });
    
    taskItem.querySelector('.task-text').addEventListener('click', function() {
      taskItem.classList.toggle('completed');
    });
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
  });
  
