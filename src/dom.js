import { checkIfSpecial } from "./projects";

export default function initialization() {
    tab("inbox");
}

function tab(project) {
    const todo = document.querySelector(".todo");

    let value = checkIfSpecial(project);

    
}

function createAddTaskBtn() {

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