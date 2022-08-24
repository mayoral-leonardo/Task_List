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
function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}
function createButtons(listElement) {
    listElement.innerText += ' ';
    var buttonsSpan = document.createElement('span');
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Apagar';
    deleteButton.setAttribute('class', 'delete margin-left');
    buttonsSpan.appendChild(deleteButton);
    var editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.setAttribute('class', 'edit margin-left');
    buttonsSpan.appendChild(editButton);
    listElement.appendChild(buttonsSpan);
}
function createTask(inputText) {
    var listElement = createListElement();
    listElement.innerText = inputText;
    tasks.appendChild(listElement);
    clearInput();
    createButtons(listElement);
    storeTasks();
}
function storeTasks() {
    var tasksList = __spreadArray([], tasks.querySelectorAll('li'), true);
    var finalList = [];
    for (var _i = 0, tasksList_1 = tasksList; _i < tasksList_1.length; _i++) {
        var tasks_1 = tasksList_1[_i];
        var taskText = tasks_1.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        taskText = taskText.replace('Editar', '').trim();
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
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (!taskInput.value)
            return;
        createTask(taskInput.value);
    }
});
addTaskButton.addEventListener('click', function () {
    if (!taskInput.value)
        return;
    createTask(taskInput.value);
});
body.addEventListener('click', function (event) {
    var element = event.target;
    var listElement = element.parentElement.parentElement;
    if (element.classList.contains('delete')) {
        listElement.remove();
        storeTasks();
    }
});
body.addEventListener('click', function (event) {
    var element = event.target;
    var parentElement = element.parentElement;
    if (element.classList.contains('edit')) {
        element.remove();
        var inputElement = document.createElement('input');
        var saveEdit = document.createElement('button');
        saveEdit.innerText = 'Salvar';
        saveEdit.setAttribute('class', 'save');
        inputElement.setAttribute('class', 'margin-left');
        inputElement.setAttribute('id', 'edit-input');
        parentElement.appendChild(inputElement);
        parentElement.appendChild(saveEdit);
    }
});
body.addEventListener('click', function (event) {
    var element = event.target;
    var listElement = element.parentElement.parentElement;
    if (element.classList.contains('save')) {
        var editInput = document.getElementById('edit-input');
        listElement.innerHTML = editInput.value;
        createButtons(listElement);
        storeTasks();
    }
});
getTasksFromStorage();
