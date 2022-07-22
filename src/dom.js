import { deleteTodoItem } from "./projects";
import CircleIcon from "../dist/images/circle.svg";
import EditIcon from "../dist/images/pencil.svg";

export default function initialization() {
    tab("inbox");
}

function tab(project) {
    const todo = document.querySelector(".todo-list");

    let projects = JSON.parse(localStorage.getItem('projects'));

    for(let i = 0; projects.length > i; i++) {
        if(projects[i].title === project) {
            for(const prop in projects[i].todoList) {
                let obj = projects[i].todoList[prop];

                let element = DOMcreateTodoItem(obj, project);

                todo.append(element);
            }
        }
    }
}

function DOMcreateTodoItem(obj, project) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.dataset.name = obj.title;

    const circle = new Image();
    circle.src = CircleIcon;
    circle.className = "todo-item-checkmark";

    const todoTitle = document.createElement("p");
    todoTitle.className = "todo-item-title";
    todoTitle.textContent = obj.title;

    const todoDate = document.createElement("p");
    todoDate.textContent = obj.dueDate;

    const todoEdit = new Image();
    todoEdit.className = "todo-item-edit";
    todoEdit.src = EditIcon;

    circle.addEventListener("click", e => {
        todoItem.remove();
        deleteTodoItem(obj, project);
    })

    todoItem.addEventListener("mouseover", e => {
        todoEdit.style.display = 'block';
    });

    todoItem.addEventListener("mouseout", e => {
        todoEdit.style.display = 'none';
    });

    todoItem.append(circle, todoTitle, todoDate, todoEdit);

    return todoItem;
}

function eventListeners() {

}

function addProject() {

}

function addTask() {
    const activeClass = document.querySelector(".active");
    const addTaskBtn = document.querySelector(".task-add");

    addTaskBtn.addEventListener("click", e => {

    });
}