import {format, endOfWeek, parseISO} from 'date-fns';

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

function setTodayProjectItems() {
    let value = getLocalStorageProjects();
    let today = format(new Date(), 'yyyy-MM-dd');

    for(let i = 0; value.length > i; i++) {
        let something = value[i]["todoList"];

        for(let prop in something) {
            let item = something[prop];

            if(item.dueDate === today) {
                for(let i = 0; value.length > i; i++) {
                    if(value[i].title === "today") {
                        value[i]["todoList"][`${item.title}`] = item;
                        value[i]["todoList"][`${item.title}`]["todayProject"] = value[i].title;
                    }
                }
                localStorage.setItem('projects', JSON.stringify(value));
            }
        }
    }
}

function setUpcomingProjectItems() {
    let value = getLocalStorageProjects();
    let date = format(new Date(), 'yyyy-MM-dd');
    let endOfWeekDate = format(endOfWeek(parseISO(date)), 'yyyy-MM-dd');

    let dateDay = date.split("-");
    let endOfWeekDayDate = endOfWeekDate.split("-");

    for(let i = 0; value.length > i; i++) {
        let something = value[i]["todoList"];

        if(value[i].title === "today") {

        } else {
            for(let prop in something) {
                let item = something[prop];

                for(let j = dateDay[2]; endOfWeekDayDate[2] >= j; j++) {
                    let date = `${dateDay[0]}-${dateDay[1]}-${j}`

                    if(item.dueDate === date) {
                        value[2]["todoList"][`${item.title}`] = item;
                        value[2]["todoList"][`${item.title}`]["weeklyProject"] = value[i].title;
                    }

                    localStorage.setItem('projects', JSON.stringify(value));
                }
            }
        }
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
            let todayProject = localProjects[i]["todoList"][`${obj.title}`]["todayProject"];
            let weeklyProject = localProjects[i]["todoList"][`${obj.title}`]["weeklyProject"];

            let projectsLocal = getLocalStorageProjects();

            if(todayProject !== undefined) {
                projectsLocal = deleteFromSpecialProjects("today", obj.title, projectsLocal);
            }
            if(weeklyProject !== undefined) {
                projectsLocal = deleteFromSpecialProjects("upcoming", obj.title, projectsLocal);
            }

            delete projectsLocal[i]["todoList"][`${obj.title}`];

            console.log(projectsLocal);

            localStorage.setItem('projects', JSON.stringify(projectsLocal));
        }
    }
}

function deleteFromSpecialProjects(project, obj, localProjects) {

    for(let i = 0; localProjects.length > i; i++) {
        if(localProjects[i].title === project) {
            console.log(localProjects[i]);
            let todoList = localProjects[i]["todoList"];

            for(let prop in todoList) {
                if(todoList[prop].title === obj) {
                    delete todoList[prop];

                    return localProjects;
                }
            }
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
    deleteProject,
    setTodayProjectItems,
    setUpcomingProjectItems
}