import { createProject, deleteTodoItem, getLocalStorageProjects, searchForProject, deleteProject, setUpcomingProjectItems, setTodayProjectItems } from "./projects";
import CircleIcon from "../dist/images/circle.svg";
import EditIcon from "../dist/images/pencil.svg";
import listIcon from "../dist/images/format-list-bulleted.svg";
import deleteIcon from "../dist/images/close.svg"
import { createTodo, editTodo } from "./todo.js";

export default function initialization() {
    tab("inbox");
    addProjectsToList();
    addTask();
    eventListeners();
}

function tab(project) {
    const todo = document.querySelector(".todo-list");
    todo.textContent = '';

    const todoTitle = document.createElement('h1');
    todoTitle.className = "tab-title";

    let projects = JSON.parse(localStorage.getItem('projects'));

    for(let i = 0; projects.length > i; i++) {
        if(projects[i].title === project) {
            todoTitle.textContent = projects[i].title;
            todo.append(todoTitle);

            for(const prop in projects[i].todoList) {
                let obj = projects[i].todoList[prop];

                let element = DOMcreateTodoItem(obj, project);

                todo.append(element);
            }
        }
    }
}

function addProjectsToList() {
    let projects = getLocalStorageProjects();

    for(let i = 0; projects.length > i; i++) {
        if(projects[i].title === "inbox" || projects[i].title === "today" || projects[i].title === "upcoming") {
            console.log("wut");
        } else {
            createProjectItem(projects[i]);
        }
    }
}

function createProjectItem(projectObj) {
    const mainProjectContainer = document.querySelector(".project-list");
    const projectContainer = document.createElement("li");
    projectContainer.className = "project";
    projectContainer.dataset.name = projectObj.title;

    const projectIcon = new Image();
    projectIcon.src = listIcon;

    const projectTitle = document.createElement("p");
    projectTitle.textContent = projectObj.title;

    const projectDelete = new Image();
    projectDelete.style.display = "none";
    projectDelete.src = deleteIcon;

    projectTitle.addEventListener("click", e => {
        activeClass(projectContainer);
        
        tab(projectObj.title);
    });

    projectContainer.addEventListener("mouseover", e => {
        projectDelete.style.display = "block";
    });

    projectContainer.addEventListener("mouseout", e => {
        projectDelete.style.display = "none";
    });

    projectDelete.addEventListener("click", e => {
        projectContainer.remove();
        deleteProject(projectObj.title);
        
        let index = document.querySelector('[data-name="inbox"]');
        tab("inbox");
        activeClass(index);
    });

    projectContainer.append(projectIcon, projectTitle, projectDelete);
    mainProjectContainer.append(projectContainer);
}

function activeClass(element) {
    let list = document.querySelector(".sidebar").children;

    for(let i = 0; list.length > i; i++) {
        if(list[i].classList.contains("main-list")) {
            let liArray = list[i].children[0].children;

            for(let j = 0; liArray.length > j; j++) {
                if(liArray[j].classList.contains("active")) {
                    liArray[j].classList.toggle("active");
                    element.classList.Name = "active";
                }
            }
       }
       if(list[i].classList.contains("projects-list")) {
            let liArray = list[i].children[1].children[0].children;

            for(let j = 0; liArray.length > j; j++) {
                if(liArray[j].classList.contains("active")) {
                    liArray[j].classList.toggle("active");
                    element.classList.Name = "active";
                }
            }
       }
    }

    element.classList.toggle("active");
}

function DOMcreateTodoItem(obj, project) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.className = "todo-item-container";
    todoItemContainer.dataset.name = obj.title;

    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

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

    todoTitle.addEventListener("click", e => {
        DOMeditTodoItem(obj, todoItemContainer, todoItem, todoEdit);
    });

    todoEdit.addEventListener("click", e => {
        DOMeditTodoItem(obj, todoItemContainer, todoItem, todoEdit);
    })

    todoItem.append(circle, todoTitle, todoDate, todoEdit);
    todoItemContainer.append(todoItem);

    return todoItemContainer;
}

function DOMeditTodoItem(obj, container, todoItemContainer, todoEdit) {
    if(container.classList.contains("active-todo-item") === true) {
        let editContainer = document.querySelector(".edit-container");
        editContainer.remove();
        container.classList.toggle("active-todo-item");
        todoItemContainer.classList.toggle("edit-container-active");
    } else {
        todoItemContainer.classList.add("edit-container-active");
        todoEdit.style.display = "block";

        let projectName = getProjectName();
        let project = searchForProject(projectName);
    
        let editContainer = document.createElement("div");
        editContainer.className = "edit-container";

        let editTitleLabel = document.createElement("label");
        editTitleLabel.className = "edit-title-label";
        editTitleLabel.setAttribute("for", "edit-title");
        editTitleLabel.textContent = "Title:"

        let editTitle = document.createElement("input");
        editTitle.setAttribute("id", "edit-title");
        editTitle.value = obj.title;

        let editDateLabel = document.createElement("label");
        editDateLabel.textContent = "Due Date:"
        editDateLabel.setAttribute("for", "edit-date");

        let editDate = document.createElement("input");
        editDate.setAttribute("id", "edit-date");
        editDate.setAttribute("type", "date");
        editDate.value = obj.dueDate;

        let editPriorityLabel = document.createElement("label");
        editPriorityLabel.className = "edit-priority-label";
        editPriorityLabel.setAttribute("for", "edit-priority");
        editPriorityLabel.textContent = "Priority:";

        let editPriority = document.createElement("input");
        editPriority.setAttribute("id", "edit-priority")
        editPriority.setAttribute("type", "number");
        editPriority.setAttribute("max", 5);
        editPriority.setAttribute("min", 1);
        editPriority.value = obj.priority;
        
        let editDescriptionLabel = document.createElement("label");
        editDescriptionLabel.setAttribute("for", "edit-description");
        editDescriptionLabel.textContent = "Description:";

        let editDescription = document.createElement("textarea");
        editDescription.setAttribute("id", "edit-description");
        editDescription.value = obj.description;
        editDescription.placeholder = "abcd your description comes here I think";

        let saveButton = document.createElement("button");
        saveButton.className = "edit-save";
        saveButton.textContent = "Save";

        saveButton.addEventListener("click", e => {
            let projectName = getProjectName();
            editTodo(obj, editTitle.value, editDescription.value, editDate.value, editPriority.value, projectName);
            tab(projectName);
        });

        editContainer.append(editTitleLabel, editTitle, editPriorityLabel, editPriority, editDescriptionLabel, editDescription, editDateLabel, editDate, saveButton);
        container.append(editContainer);
        container.classList.add("active-todo-item");
    }

    const todoList = document.querySelector(".todo-list");
    let todoListChildren = todoList.children;

    for(let i = 0; todoListChildren.length > i; i++) {
        if(todoListChildren[i].classList.contains("active-todo-item")) {
            if(todoListChildren[i].dataset.name === obj.title) {
                console.log("JEST THE LEST YOU MEST FUCK THE REST")
            } else {
                let children = todoListChildren[i].children;
                for(let j = 0; children.length > j; j++) {
                    if(children[j].classList.contains("edit-container")) {
                        children[j].remove();
                        todoListChildren[i].classList.toggle("active-todo-item");
                        todoListChildren[i].children[0].classList.toggle("edit-container-active");
                    }
                }
            }
        }
    }
}

function eventListeners() {
    addProjectEvent();
    addMenuEvents();
}

function addMenuEvents() {
    const mainList = document.querySelectorAll(".main-list > ul > *");

    mainList.forEach(item => {
        item.addEventListener("click", e => {
            if(item.dataset.name === "today") {
                setTodayProjectItems();
            }
        
            if(item.dataset.name === "upcoming") {
                setUpcomingProjectItems();
            }
            activeClass(item);
            tab(item.dataset.name);
        })
    })
}

function addProjectEvent() {
    const addProjectBtn = document.querySelector(".add-project");

    addProjectBtn.addEventListener("click", e => {
        createProjectInput(addProjectBtn);
    });
}

function createProjectInput(addBtn) {
    const projectList = document.querySelector(".project-list");
    
    const newProjectDiv  = document.createElement("div");
    newProjectDiv.className = "project-add-div";

    const newProjectTitle = document.createElement("input");
    newProjectTitle.className = "project-add-title";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = 'project-add-cancel';
    cancelBtn.textContent = "Cancel";

    const submitBtn = document.createElement("button");
    submitBtn.className = 'project-add-submit';
    submitBtn.textContent = "Submit";

    addBtn.style.display = "none";

    projectEvents(newProjectTitle, newProjectDiv, submitBtn, cancelBtn, addBtn);

    newProjectDiv.append(newProjectTitle, submitBtn, cancelBtn);
    projectList.append(newProjectDiv);
}

function projectEvents(title, div, submit, cancel, button) {
    submit.addEventListener("click", e => {
        let project = createProject(title.value);
        createProjectItem(project);
        div.remove();
        button.style.display = "grid";
    });

    cancel.addEventListener("click", e => {
        button.style.display = "grid";
        div.remove();
    });
}

function addTask() {
    const addTaskBtn = document.querySelector(".task-add");

    addTaskBtn.addEventListener("click", e => {
        let projectName = getProjectName();

        createTaskInput(addTaskBtn);
    });
}

function createTaskInput() {
    const mainContent = document.querySelector(".todo");
    const addTaskBtn = document.querySelector(".task-add");

    const newTodoItemDiv  = document.createElement("div");
    newTodoItemDiv.className = "task-add-input";

    const newTodoItemName = document.createElement("input");
    newTodoItemName.className = "task-add-title";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = 'task-add-cancel';
    cancelBtn.textContent = "Cancel";

    const submitBtn = document.createElement("button");
    submitBtn.className = 'task-add-submit';
    submitBtn.textContent = "Submit";

    addTaskBtn.style.display = "none";

    newTodoItemDiv.append(newTodoItemName, submitBtn, cancelBtn);
    mainContent.append(newTodoItemDiv);

    addEventsToTaskInput(submitBtn, cancelBtn, newTodoItemName, newTodoItemDiv)

    return newTodoItemName;
}

function addEventsToTaskInput(submit, cancel, title, div) {
    const addTaskButton = document.querySelector(".task-add");
    const project = getProjectName();

    submit.addEventListener("click", e => {        
        createTodo(title.value, project);
        tab(project);
        addTaskButton.style.display = "grid";
        div.remove();
    });

    cancel.addEventListener("click", e => {
        addTaskButton.style.display = "grid";
        div.remove();
    });
}

function getProjectName() {
    const activeClass = document.querySelector(".active");
    let projectName = activeClass.dataset.name;

    return projectName;
}

export {
    createTaskInput
}