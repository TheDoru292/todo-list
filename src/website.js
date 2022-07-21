import {Project, createSpecialProjects, addTodoToProject} from './projects.js'
import Todo from './todo.js'
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

    const firstProject = new Todo('Complete the Todo List Project', 'The Odin Project Todo Project!', '07-25-2022', 5, '');

    createSpecialProjects(inbox, today, upcoming);

    addTodoToProject(inbox, firstProject);
}