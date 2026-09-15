// State Management
let tasks = [];

// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');
const resetBtn = document.getElementById('reset-btn');

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
resetBtn.addEventListener('click', resetAll);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function resetAll() {
  if (tasks.length === 0) return;
  if (confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    renderTasks();
  }
}

function renderTasks() {
  // Clear lists to prevent duplication
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  let pendingCounter = 0;
  let completedCounter = 0;

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;
    textSpan.addEventListener('click', () => toggleTask(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(textSpan);
    li.appendChild(delBtn);

    if (task.completed) {
      completedList.appendChild(li);
      completedCounter++;
    } else {
      pendingList.appendChild(li);
      pendingCounter++;
    }
  });

  // Update Counter UIs
  pendingCount.textContent = `Pending: ${pendingCounter}`;
  completedCount.textContent = `Completed: ${completedCounter}`;
}