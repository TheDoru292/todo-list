let projects = [];

class Project {
    constructor(title) {
        this.title = title;
    }
}

Project.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

function createProject(projectName) {
    let value = checkIfAvailable(projectName);

    if(value === true) {
        alert("Project names must be different");
    } else if(value === "blank") {
        alert("Project names must not be blank");
    } else {
        let localProjects = getLocalStorageProjects();

        let project = {
            "title": projectName,
            "todoList": {

            }
        }
    
        localProjects.push(project);
        localStorage.setItem('projects', JSON.stringify(localProjects));

        return project;
    }
}

function checkIfAvailable(projectName) {
    let localStorage = getLocalStorageProjects();

    if(projectName === '') {
        return "blank";
    }

    for(let i = 0; localStorage.length > i; i++) {
        console.log[localStorage[i].title];

        if(localStorage[i].title === projectName) {
            return true;
        }
    }
}

function createProjects(...args) {    
    for(let i = 0; args.length > i; i++) {
        let title = args[i].title;
        
        let value = {
            "title": title,
            "todoList": {

            }
        }

        projects.push(value);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
}

function searchForProject(project) {
    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project) {
            let project = localProjects[i];
            return project;
        }
    }
}

function searchForTodoInProject(project, todoItem) {
    let result = project.todoList[`${todoItem}`];

    if(result === "undefined") {
        return "Oopsies";
    } else {
        return result;
    }
}

function addTodoToProject(projectName, todoItem) {
    let project = searchForProject(projectName);

    if(project.todoList === undefined) { 
        todoList(project, todoItem);
    } else {
        todoList(project, todoItem);
    }
}


function todoList(project, todoItem) {
    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project.title) {

            localProjects[i]["todoList"][`${todoItem.title}`] = todoItem;

        }
    }
    localStorage.setItem('projects', JSON.stringify(localProjects));
}

function deleteTodoItem(obj, project) {

    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project) {
            delete localProjects[i]["todoList"][`${obj.title}`];

            localStorage.setItem('projects', JSON.stringify(localProjects));
        }
    }
}

function deleteProject(project) {
    let localProjects = getLocalStorageProjects();

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project) {
            delete localProjects[i];

            let filteredProjects = localProjects.filter(item => item);

            localStorage.setItem('projects', JSON.stringify(filteredProjects));
        }
    }
}

function getLocalStorageProjects() {
    return JSON.parse(localStorage.getItem('projects'));
}

// get items from Local Storage
//     let consoleRead = JSON.parse(localStorage.getItem('projects'));

export {
    Project,
    createProjects,
    createProject,
    addTodoToProject,
    deleteTodoItem,
    searchForProject,
    searchForTodoInProject,
    getLocalStorageProjects,
    deleteProject
}