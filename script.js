document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-todo-form');
    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority');
    const todoList = document.getElementById('todos');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-priority', todo.priority);
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="toggle-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            if (todo.completed) {
                li.classList.add('completed');
            }
            todoList.appendChild(li);

            // Add animation
            setTimeout(() => {
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, 50 * index);

            const toggleBtn = li.querySelector('.toggle-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            toggleBtn.addEventListener('click', () => toggleTodo(index));
            deleteBtn.addEventListener('click', () => deleteTodo(index));
        });
    }

    function addTodo(text, priority) {
        todos.unshift({ text, priority, completed: false });
        saveTodos();
        renderTodos();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        const priority = prioritySelect.value;
        if (text) {
            addTodo(text, priority);
            todoInput.value = '';
            todoInput.focus();
        }
    });

    renderTodos();
});