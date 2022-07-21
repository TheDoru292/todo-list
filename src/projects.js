let projects = [];
let specialProjects = [];

export default class Project {
    constructor(title) {
        this.title = title;
    }
}

Project.prototype.changeTitle = function(newTitle) {
    this.title = newTitle;
}

