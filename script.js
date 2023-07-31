let content = document.getElementById("content");
let title = document.getElementById("title");
let desc = document.getElementById("desc");

// display todos on page load
window.addEventListener('load', function () {
    displayTodo();;
});

// Display todos
function displayTodo() {
    let todos = localStorage.getItem("todo");
    todos = JSON.parse(todos);
    if (todos) {
        ihtml = "";
        for (key in todos) {
            let obj = (JSON.stringify(todos[key])).replaceAll('"', "'");
            ihtml += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${todos[key].title}</div>
            ${todos[key].description}
          </div>
          <button onclick="remove(${obj})" type="submit" class="btn btn-danger">Remove</button>
        </li>`

        }
        content.innerHTML = ihtml;
    } else {
        content.innerHTML = "Your list is empty"
    }
}

// Add a new todo
submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (title.value == "") {
        return;
    }

    let obj = {
        title: title.value,
        description: desc.value
    }
    let todos = localStorage.getItem("todo");
    todos = JSON.parse(todos);
    if (todos) {
        todos.push(obj)
        localStorage.setItem("todo", JSON.stringify(todos))
    } else {
        localStorage.setItem("todo", JSON.stringify([obj]))
    }
    title.value = "";
    desc.value = "";
    displayTodo()
});

//delete todo
function remove(value) {
    let todos = localStorage.getItem("todo");
    todos = JSON.parse(todos);
    let index = todos.findIndex(obj => obj.title === value.title && obj.description === value.description)
    todos.splice(index, 1)
    if (todos.length == 0) {
        localStorage.removeItem("todo");
        content.innerHTML = "Your list is empty"
    } else {
        localStorage.setItem("todo", JSON.stringify(todos))
        displayTodo();
    }
}