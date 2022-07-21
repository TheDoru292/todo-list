let projects = [];
let specialProjects = [];

class Project {
    constructor(title) {
        this.title = title;
    }
}

Project.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

function createSpecialProjects(...args) {    
    for(let i = 0; args.length > i; i++) {
        let title = args[i].title;
        
        let value = {
            "title": title,
        }

        specialProjects.push(value);
    }
    localStorage.setItem('specialProjects', JSON.stringify(specialProjects));
}

function addTodoToProject(project, todoItem) {
    let isSpecial = checkIfSpecial(project);

    if(isSpecial === true) {
        if(project.todoList === undefined) { 
            todoListForSpecial(project, todoItem);
        } else {
            todoListForSpecial(project, todoItem);
        }
    }
}


function todoListForSpecial(project, todoItem) {
    for(let i = 0; specialProjects.length > i; i++) {
        if(specialProjects[i].title === project.title) {
            let todoItemTitle = todoItem.title;

            if(specialProjects[i].todoList === undefined) {
                specialProjects[i].todoList = {};
            }

            specialProjects[i]["todoList"][`${todoItem.title}`] = todoItem;

            console.log(specialProjects[i]);
        }
    }
    localStorage.setItem('specialProjects', JSON.stringify(specialProjects));
}

function checkIfSpecial(project) {
    if(project.title === "inbox" ||
       project.title === "today" ||
       project.title === "upcoming") {
        return true;
    }  else if(project === "inbox" ||
              project === "today" ||
              project === "upcoming") {
                return true;
    } else {
        return false;
    }
}

// get items from Local Storage
//     let consoleRead = JSON.parse(localStorage.getItem('specialProjects'));

export {
    Project,
    createSpecialProjects,
    addTodoToProject,
    checkIfSpecial,
}