document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const searchTaskInput = document.getElementById('search-task');

    // Load tasks from local storage
    loadTasks();

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            newTaskInput.value = '';
        }
    });

    // Function to remove a task
    function removeTask(e) {
        e.target.parentElement.remove();
        saveTasks();
    }

    // Function to edit a task
    function editTask(e) {
        const li = e.target.parentElement;
        const span = li.querySelector('span');
        const newTaskText = prompt('Edit your task:', span.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            span.textContent = newTaskText.trim();
            saveTasks();
        }
    }

    // Function to add task to the list
    function addTask(task) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editTask);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', removeTask);

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Function to search tasks
    searchTaskInput.addEventListener('input', () => {
        const searchQuery = searchTaskInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const taskText = task.firstElementChild.textContent.toLowerCase();
            if (taskText.includes(searchQuery)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.firstElementChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});
