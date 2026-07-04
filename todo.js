const todos = [];

function addTodo() {
    const inputField = document.getElementById("input");
    const userInput = inputField.value.trim();

    if(userInput == "") {
        alert("No todos written!");
    } else {
        const capitalizeInput = userInput[0].toUpperCase() + userInput.slice(1);
        todos.push(capitalizeInput);
        showTodo();
        inputField.value = "";
    }
}

function showTodo() {
    const todoList = document.getElementById("showTodo");
    todoList.innerHTML = "";
    for(let i = 0; i < todos.length; i++) {
        todoList.innerHTML +=  /*HTML*/`
        <li>${todos[i]} <button onclick="deleteTodo(${i})">Delete</button></li>
        `;
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    showTodo();
}