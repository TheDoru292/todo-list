import { format, endOfWeek, parseISO } from 'date-fns'

const projects = []

class Project {
  constructor (title) {
    this.title = title
  }
}

Project.prototype.changeTitle = function (newTitle) {
  this.title = newTitle
}

function createProject (projectName) {
  const value = checkIfAvailable(projectName)

  if (value === true) {
    alert('Project names must be different')
  } else if (value === 'blank') {
    alert('Project names must not be blank')
  } else {
    const localProjects = getLocalStorageProjects()

    const project = {
      title: projectName,
      todoList: {

      }
    }

    localProjects.push(project)
    localStorage.setItem('projects', JSON.stringify(localProjects))

    return project
  }
}

function setTodayProjectItems () {
  const value = getLocalStorageProjects()
  const today = format(new Date(), 'yyyy-MM-dd')

  for (let i = 0; value.length > i; i++) {
    const something = value[i].todoList

    for (const prop in something) {
      const item = something[prop]

      if (!(value[i].title === 'today')) {
        if (item.dueDate === today) {
          value[1].todoList[`${item.title}`] = item

          if (value[i].title !== 'today') {
            value[i].todoList[`${item.title}`].todayProject = value[i].title
          }
        }
        localStorage.setItem('projects', JSON.stringify(value))
      }
    }
  }
}

function setUpcomingProjectItems () {
  const value = getLocalStorageProjects()
  const date = format(new Date(), 'yyyy-MM-dd')
  const endOfWeekDate = format(endOfWeek(parseISO(date)), 'yyyy-MM-dd')

  const dateDay = date.split('-')
  const endOfWeekDayDate = endOfWeekDate.split('-')

  for (let i = 0; value.length > i; i++) {
    const something = value[i].todoList

    if (!(value[i].title === 'today')) {
      for (const prop in something) {
        const item = something[prop]

        for (let j = dateDay[2]; endOfWeekDayDate[2] >= j; j++) {
          const date = `${dateDay[0]}-${dateDay[1]}-${j}`

          if (item.dueDate === date) {
            value[2].todoList[`${item.title}`] = item

            if (value[i].title !== 'upcoming') {
              value[2].todoList[`${item.title}`].weeklyProject = value[i].title
            }
          }

          localStorage.setItem('projects', JSON.stringify(value))
        }
      }
    }
  }
}

function checkIfAvailable (projectName) {
  const localStorage = getLocalStorageProjects()

  if (projectName === '') {
    return 'blank'
  }

  for (let i = 0; localStorage.length > i; i++) {
    if (localStorage[i].title === projectName) {
      return true
    }
  }
}

function createProjects (...args) {
  for (let i = 0; args.length > i; i++) {
    const title = args[i].title

    const value = {
      title: title,
      todoList: {

      }
    }

    projects.push(value)
  }
  localStorage.setItem('projects', JSON.stringify(projects))
}

function searchForProject (project) {
  const localProjects = getLocalStorageProjects()

  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === project) {
      const project = localProjects[i]
      return project
    }
  }
}

function searchForTodoInProject (project, todoItem) {
  const result = project.todoList[`${todoItem}`]

  if (result === 'undefined') {
    return 'Oopsies'
  } else {
    return result
  }
}

function addTodoToProject (projectName, todoItem) {
  const project = searchForProject(projectName)

  if (project.todoList === undefined) {
    todoList(project, todoItem)
  } else {
    todoList(project, todoItem)
  }
}

function todoList (project, todoItem) {
  const localProjects = getLocalStorageProjects()

  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === project.title) {
      localProjects[i].todoList[`${todoItem.title}`] = todoItem
    }
  }
  localStorage.setItem('projects', JSON.stringify(localProjects))
}

function deleteTodoItem (obj, project, deleteFromSpecial = false) {
  const localProjects = getLocalStorageProjects()

  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === project) {
      const todayProject = localProjects[i].todoList[`${obj.title}`].todayProject
      const weeklyProject = localProjects[i].todoList[`${obj.title}`].weeklyProject

      let projectsLocal = getLocalStorageProjects()

      if (deleteFromSpecial === false) {
        if (todayProject !== undefined) {
          projectsLocal = deleteFromSpecialProjects('today', obj.title, projectsLocal)
        }
        if (weeklyProject !== undefined) {
          projectsLocal = deleteFromSpecialProjects('upcoming', obj.title, projectsLocal)
        }
      } else {
        if (todayProject !== undefined) {
          console.log(todayProject)
          projectsLocal = deleteBySpecial(obj.title, obj.todayProject, projectsLocal)
        }
        if (weeklyProject !== undefined) {
          console.log(weeklyProject)
          projectsLocal = deleteBySpecial(obj.title, obj.weeklyProject, projectsLocal, true)
        }
      }

      delete projectsLocal[i].todoList[`${obj.title}`]

      console.log(projectsLocal)

      localStorage.setItem('projects', JSON.stringify(projectsLocal))
    }
  }
}

function deleteBySpecial (obj, projectName, localProjects, whatever = false) {
  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === projectName) {
      console.log(localProjects[i])
      delete localProjects[i].todoList[obj]

      return localProjects
    }
  }
}

function deleteFromSpecialProjects (project, obj, localProjects) {
  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === project) {
      const todoList = localProjects[i].todoList

      for (const prop in todoList) {
        if (todoList[prop].title === obj) {
          delete todoList[prop]

          return localProjects
        }
      }
    }
  }
}

function deleteProject (project) {
  const localProjects = getLocalStorageProjects()

  for (let i = 0; localProjects.length > i; i++) {
    if (localProjects[i].title === project) {
      delete localProjects[i]

      const filteredProjects = localProjects.filter(item => item)

      localStorage.setItem('projects', JSON.stringify(filteredProjects))
    }
  }
}

function getLocalStorageProjects () {
  return JSON.parse(localStorage.getItem('projects'))
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
