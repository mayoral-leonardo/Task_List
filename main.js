var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var taskInput = document.querySelector('.task-input');
var addTaskButton = document.querySelector('.add-task-button');
var tasks = document.querySelector('.tasks');
var body = document.getElementById('body');
function createListElement() {
    var listElement = document.createElement('li');
    return listElement;
}
taskInput.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (!taskInput.value)
            return;
        createTask(taskInput.value);
    }
});
function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}
function createDeleteButton(listElement) {
    listElement.innerText += ' ';
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Apagar';
    deleteButton.setAttribute('class', 'delete');
    listElement.appendChild(deleteButton);
}
function createTask(textInput) {
    var listElement = createListElement();
    listElement.innerText = textInput;
    tasks.appendChild(listElement);
    clearInput();
    createDeleteButton(listElement);
    storeTasks();
}
addTaskButton.addEventListener('click', function () {
    if (!taskInput.value)
        return;
    createTask(taskInput.value);
});
body.addEventListener('click', function (event) {
    var element = event.target;
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
        storeTasks();
    }
});
function storeTasks() {
    var tasksList = __spreadArray([], tasks.querySelectorAll('li'), true);
    var finalList = [];
    for (var _i = 0, tasksList_1 = tasksList; _i < tasksList_1.length; _i++) {
        var tasks_1 = tasksList_1[_i];
        var taskText = tasks_1.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        finalList.push(taskText);
    }
    var tasksJSON = JSON.stringify(finalList);
    localStorage.setItem('tarefas', tasksJSON);
}
function getTasksFromStorage() {
    var tasks = localStorage.getItem('tarefas');
    var tasksList = JSON.parse(tasks);
    for (var _i = 0, tasksList_2 = tasksList; _i < tasksList_2.length; _i++) {
        var tasks_2 = tasksList_2[_i];
        createTask(tasks_2);
    }
}
getTasksFromStorage();
