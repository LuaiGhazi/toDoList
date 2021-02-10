// Selectors
const todoInput = document.querySelector('.toDoInput')
const todoButton = document.querySelector('.toDoButton')
const todoList = document.querySelector('.toDoList')
const filterOption = document.querySelector('.filter-todo')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


//Functions

function addTodo(event) {
    // Prevents the refreshing of the page when form is submitted
    event.preventDefault()
    //Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage 
    saveLocalTodos(todoInput.value)
    //Completed Button 
    const completedButton = document.createElement('button')
    // Note the use of innerHTML instead of innerText 
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);
    //Delete Button 
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);
    //Appent the div to the UL
    todoList.appendChild(todoDiv)
    //Clear the input 
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target;
    // Delete to do
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //Mark as completed
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if an array exists. If it doesn't, we create one.
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Todo Div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // Create Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Completed Button 
        const completedButton = document.createElement('button')
        // Note the use of innerHTML instead of innerText 
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        //Delete Button 
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton);
        //Appent the div to the UL
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    //Check if an array exists. If it doesn't, we create one.
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
