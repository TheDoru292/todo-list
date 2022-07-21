export default function initialize() {
    checkIfFirstTime();
}

function checkIfFirstTime() {
    let value = localStorage.getItem('firstTime');

    if(value === null) {
        localStorage.setItem('firstTime', 'false');

        firstTimeInitialization();
    }
}

function firstTimeInitialization() {
    
}