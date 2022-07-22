let projects = [];

class Project {
    constructor(title) {
        this.title = title;
    }
}

Project.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

function createProjects(...args) {    
    for(let i = 0; args.length > i; i++) {
        let title = args[i].title;
        
        let value = {
            "title": title,
        }

        projects.push(value);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addTodoToProject(project, todoItem) {
    if(project.todoList === undefined) { 
        todoList(project, todoItem);
    } else {
        todoList(project, todoItem);
    }
}


function todoList(project, todoItem) {
    for(let i = 0; projects.length > i; i++) {
        if(projects[i].title === project.title) {
            if(projects[i].todoList === undefined) {
                projects[i].todoList = {};
            }

            projects[i]["todoList"][`${todoItem.title}`] = todoItem;

            console.log(projects);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projects));
}

function deleteTodoItem(obj, project) {

    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project) {
            delete localProjects[i]["todoList"][`${obj.title}`];

            localStorage.setItem('projects', JSON.stringify(localProjects));

            console.log(getLocalStorageProjects());
        }
    }
}

function getLocalStorageProjects() {
    return JSON.parse(localStorage.getItem('projects'));
}

// get items from Local Storage
//     let consoleRead = JSON.parse(localStorage.getItem('specialProjects'));

export {
    Project,
    createProjects,
    addTodoToProject,
    deleteTodoItem
}