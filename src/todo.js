import {searchForProject} from './projects.js';

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

Todo.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

Todo.prototype.changeDescription = function(newDesc) {
    this.description = newDesc;
}

Todo.prototype.changeDueDate = function(newDueDate) {
    this.dueDate = newDueDate;
}

Todo.prototype.changePriority = function(newPriority) {
    this.priority = newPriority;
}

Todo.prototype.changeNotes = function(newNotes) {
    this.notes = newNotes;
}

function createTodo(title, project) {
    const newTodo = new Todo(title);

    searchForProject(project, newTodo);
}

export {
    Todo,
    createTodo
}