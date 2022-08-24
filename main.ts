const taskInput = <HTMLInputElement>document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const tasks = document.querySelector('.tasks');
const body = document.getElementById('body')

function createListElement() {
    const listElement = document.createElement('li');
    return listElement;
}

taskInput.addEventListener('keypress', (event: any) => {
    if (event.keyCode === 13) {
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
});

function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}

function createDeleteButton(listElement: HTMLLIElement) {
    listElement.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Apagar';
    deleteButton.setAttribute('class', 'delete');
    listElement.appendChild(deleteButton);
}

function createTask(textInput) {
    const listElement = createListElement();
    listElement.innerText = textInput;
    tasks.appendChild(listElement);
    clearInput();
    createDeleteButton(listElement);
    storeTasks();
}

addTaskButton.addEventListener('click', () => {
    if (!taskInput.value) return;
    createTask(taskInput.value);
});

body.addEventListener('click', (event) => {
    const element = (<HTMLElement>event.target);
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
        storeTasks()
    }
});

function storeTasks() {
    const tasksList = [...tasks.querySelectorAll('li') as any];
    const finalList = [];

    for (let tasks of tasksList) {
        let taskText = tasks.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        finalList.push(taskText);
    }

    const tasksJSON = JSON.stringify(finalList);
    localStorage.setItem('tarefas', tasksJSON);
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tarefas');
    const tasksList = JSON.parse(tasks);

    for (const tasks of tasksList) {
        createTask(tasks);
    }
}
getTasksFromStorage();
