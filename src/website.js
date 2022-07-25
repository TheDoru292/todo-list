import {Project, createProjects, addTodoToProject, setTodayProjectItems, setUpcomingProjectItems} from './projects.js';
import { format } from 'date-fns'; 
import {Todo} from './todo.js'
import initialization from './dom.js'; 

export default function initialize() {
    checkIfFirstTime();
    pageLoad();
    setTodayProjectItems();
    setUpcomingProjectItems();
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

    const date = format(new Date(2022, 6, 25), 'yyyy-MM-dd');

    const firstProject = new Todo('Complete the Todo List Project', 'The Odin Project Todo Project!', date, 5, '');

    createProjects(inbox, today, upcoming);

    addTodoToProject(inbox.title, firstProject);
}