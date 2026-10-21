document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'kelyAcademicTasks';
  const taskForm = document.querySelector('#task-form');
  const titleInput = document.querySelector('#task-title');
  const dueDateInput = document.querySelector('#task-date');
  const priorityInputs = document.querySelectorAll('input[name="priority"]');
  const taskList = document.querySelector('#task-list');
  const emptyState = document.querySelector('#empty-state');
  const filters = document.querySelectorAll('[data-filter]');
  const totalCount = document.querySelector('#total-count');
  const pendingCount = document.querySelector('#pending-count');
  const completedCount = document.querySelector('#completed-count');
  const storageStatus = document.querySelector('#storage-status');

  if (!taskForm || !taskList || !titleInput || !dueDateInput || !totalCount || !pendingCount || !completedCount) {
    return;
  }

  let currentFilter = 'all';

  function showStorageMessage(message) {
    if (storageStatus) {
      storageStatus.textContent = message;
    }
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }

    return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getStoredTasks() {
    let storedTasks;

    try {
      storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      showStorageMessage('Saved tasks could not be read from this browser. The planner will work for this visit, but previous tasks may not be available.');
      return [];
    }

    if (!Array.isArray(storedTasks) || storedTasks.some((task) => (
      !task
      || typeof task.id !== 'string'
      || typeof task.title !== 'string'
      || typeof task.dueDate !== 'string'
      || !['Low', 'Medium', 'High'].includes(task.priority)
      || typeof task.completed !== 'boolean'
    ))) {
      showStorageMessage('The saved task data is not in a usable format. Start with a new task list for this visit.');
      return [];
    }

    return storedTasks;
  }

  let tasks = getStoredTasks();

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      showStorageMessage('');
    } catch {
      showStorageMessage('Tasks are available during this visit, but this browser could not save them for later.');
    }
  }

  function syncPrioritySelection() {
    priorityInputs.forEach((radio) => {
      const chip = radio.closest('.option-chip');
      if (chip) {
        chip.classList.toggle('selected', radio.checked);
      }
    });
  }

  function getSelectedPriority() {
    let selected = 'Medium';

    priorityInputs.forEach((radio) => {
      if (radio.checked) {
        selected = radio.value;
      }
    });

    return selected;
  }

  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    totalCount.textContent = String(total);
    pendingCount.textContent = String(pending);
    completedCount.textContent = String(completed);
  }

  function isOverdue(task) {
    if (task.completed || !task.dueDate) {
      return false;
    }

    const today = new Date();
    const dueDate = new Date(`${task.dueDate}T23:59:59`);
    return dueDate < today;
  }

  function formatDate(dateValue) {
    if (!dateValue) return 'No due date';

    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function renderTasks() {
    const filteredTasks = tasks.filter((task) => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
      emptyState.classList.add('visible');
      emptyState.textContent = currentFilter === 'all'
        ? 'No tasks yet. Add your first academic task to get started.'
        : `No ${currentFilter} tasks match this view right now.`;
      updateStats();
      return;
    }

    emptyState.classList.remove('visible');

    filteredTasks.forEach((task) => {
      const taskItem = document.createElement('article');
      taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

      const taskMain = document.createElement('div');
      taskMain.className = 'task-main';

      const title = document.createElement('h3');
      title.className = 'task-title';
      title.textContent = task.title;

      const meta = document.createElement('div');
      meta.className = 'task-meta';

      const priority = document.createElement('span');
      priority.className = `priority-tag priority-${task.priority.toLowerCase()}`;
      priority.textContent = task.priority;

      const date = document.createElement('span');
      date.textContent = formatDate(task.dueDate);

      if (isOverdue(task)) {
        const overdue = document.createElement('span');
        overdue.className = 'overdue';
        overdue.textContent = 'Overdue';
        meta.append(priority, date, overdue);
      } else {
        meta.append(priority, date);
      }

      taskMain.append(title, meta);

      const actions = document.createElement('div');
      actions.className = 'task-actions';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'complete-btn';
      toggleBtn.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
      toggleBtn.addEventListener('click', () => {
        toggleTaskCompletion(task.id);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
      });

      actions.append(toggleBtn, deleteBtn);
      taskItem.append(taskMain, actions);
      taskList.appendChild(taskItem);
    });

    updateStats();
  }

  function addTask(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = getSelectedPriority();

    if (!title) {
      titleInput.setCustomValidity('Please enter a task title.');
      titleInput.reportValidity();
      return;
    }

    titleInput.setCustomValidity('');

    const newTask = {
      id: createId(),
      title,
      dueDate,
      priority,
      completed: false
    };

    tasks.unshift(newTask);
    saveTasks();
    taskForm.reset();

    if (priorityInputs.length > 0) {
      priorityInputs[1].checked = true;
    }

    renderTasks();
  }

  function toggleTaskCompletion(id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });

    saveTasks();
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      filters.forEach((filterButton) => {
        const active = filterButton === button;
        filterButton.classList.toggle('active', active);
        filterButton.setAttribute('aria-pressed', String(active));
      });
      renderTasks();
    });
  });

  priorityInputs.forEach((radio) => {
    radio.addEventListener('change', syncPrioritySelection);
  });

  titleInput.addEventListener('input', () => {
    titleInput.setCustomValidity('');
  });

  taskForm.addEventListener('submit', addTask);

  if (priorityInputs.length > 0) {
    priorityInputs[1].checked = true;
  }

  syncPrioritySelection();
  renderTasks();
});
