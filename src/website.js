import {Project, createProjects, addTodoToProject} from './projects.js'
import {Todo} from './todo.js'
import initialization from './dom.js'; 

export default function initialize() {
    checkIfFirstTime();
    pageLoad();
}

function pageLoad() {
    initialization();
}

function checkIfFirstTime() {
    let value = localStorage.getItem('firstTime');

    if(value === null) {
        localStorage.setItem('firstTime', 'false');

        firstTimeInitialization();
    }
}

function firstTimeInitialization() {
    const inbox = new Project('inbox');
    const today = new Project('today');
    const upcoming = new Project('upcoming');

    const firstProject = new Todo('Complete the Todo List Project', 'The Odin Project Todo Project!', '2022-07-12', 5, '');

    createProjects(inbox, today, upcoming);

    addTodoToProject(inbox.title, firstProject);
}