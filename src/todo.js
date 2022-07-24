import {addTodoToProject, getLocalStorageProjects} from './projects.js';

let todoList = [];

class Todo {
    constructor(title, description = "", dueDate = "No Due Date", priority = 5, notes = "") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

function editTodo(obj, title, description, dueDate, priority, projectName) {
    let value = checkIfEmpty(title, dueDate, priority);

    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === projectName) {
            let oldKey = localProjects[i]["todoList"][obj.title];

            localProjects[i]["todoList"][title] = oldKey;

            delete localProjects[i]["todoList"][obj.title];

            let todoItem = localProjects[i]["todoList"][title] = oldKey;
                        
            if(value === "no title") {
                alert("Title cannot be empty!");
            } else {
                todoItem['title'] = title;
                todoItem['description'] = description;
                todoItem['dueDate'] = dueDate;
                todoItem['priority'] = parseInt(priority);
        
                for(let i = 0; value.length >= i; i++) {
                    if(value[i] === "No Due Date") {
                        todoItem['dueDate'] = "No Due Date";
                    }
                    if(typeof value[i] === "number") {
                        todoItem['priority'] = 5;
                    }
                }
            }
        }
    }

    localStorage.setItem('projects', JSON.stringify(localProjects));
}

function checkIfEmpty(title, dueDate, priority) {
    let array = [];
    if(title === '') {
        return "no title";
    }
    if(dueDate === '') {
        array.push("No Due Date");
    }
    if(priority === '') {
        array.push(5);
    }

    return array;
}

function createTodo(title, project) {
    const newTodo = new Todo(title);

    addTodoToProject(project, newTodo);
}

export {
    Todo,
    createTodo,
    editTodo
}