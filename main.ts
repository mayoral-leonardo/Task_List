const taskInput = <HTMLInputElement>document.querySelector('.task-input')
const addTaskButton = document.querySelector('.add-task-button')
const tasks = document.querySelector('.tasks')
const body = document.getElementById('body')

function createListElement() {
  const listElement = document.createElement('li')
  return listElement
}

function clearInput() {
  taskInput.value = ''
  taskInput.focus()
}

function createButtons(listElement: HTMLLIElement) {
  listElement.innerText += ' '

  const buttonsSpan = document.createElement('span')

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Apagar'
  deleteButton.setAttribute('class', 'delete margin-left')
  buttonsSpan.appendChild(deleteButton)

  const editButton = document.createElement('button')
  editButton.innerText = 'Editar'
  editButton.setAttribute('class', 'edit margin-left')
  buttonsSpan.appendChild(editButton)

  listElement.appendChild(buttonsSpan)
}

function createTask(inputText: string) {
  const listElement = createListElement()
  listElement.innerText = inputText
  tasks.appendChild(listElement)
  clearInput()
  createButtons(listElement)
  storeTasks()
}

function storeTasks() {
  const tasksList = [...tasks.querySelectorAll('li') as any]
  const finalList = []

  for (let tasks of tasksList) {
    let taskText = tasks.innerText
    taskText = taskText.replace('Apagar', '').trim()
    taskText = taskText.replace('Editar', '').trim()
    finalList.push(taskText)
  }

  const tasksJSON = JSON.stringify(finalList)
  localStorage.setItem('tarefas', tasksJSON)
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem('tarefas')
  const tasksList = JSON.parse(tasks)

  for (const tasks of tasksList) {
    createTask(tasks)
  }
}

taskInput.addEventListener('keypress', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (!taskInput.value) return
    createTask(taskInput.value)
  }
})

addTaskButton.addEventListener('click', () => {
  if (!taskInput.value) return
  createTask(taskInput.value)
})

body.addEventListener('click', (event: MouseEvent) => {
  const element = (<HTMLElement>event.target)
  const elementClassList = element.classList
  const parentElement = element.parentElement
  const listElement = parentElement.parentElement as unknown as HTMLLIElement

  if (elementClassList.contains('delete')) {
    listElement.remove()
    storeTasks()

  } else if (elementClassList.contains('edit')) {
    element.remove()
    const inputElement = document.createElement('input')
    const saveEdit = document.createElement('button')
    saveEdit.innerText = 'Salvar'
    saveEdit.setAttribute('class', 'save margin-left')
    inputElement.setAttribute('class', 'margin-left')
    inputElement.setAttribute('id', 'edit-input')
    parentElement.appendChild(inputElement)
    parentElement.appendChild(saveEdit)

  } else if (elementClassList.contains('save')) {
    const listElement = element.parentElement.parentElement as unknown as HTMLLIElement
    const editInput = <HTMLInputElement>document.getElementById('edit-input')

    if (!editInput.value) {
      alert('Digite algo para poder editar!')
    } else {
      listElement.innerHTML = editInput.value
      createButtons(listElement)
      storeTasks()
    }
  }
})

getTasksFromStorage()
