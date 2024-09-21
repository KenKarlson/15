const tasksList = document.querySelector('.tasks-list');
const inputText = document.querySelector('.create-task-block__input');
const createBtn = document.querySelector('.create');
const form = document.querySelector('form');
const errorMessage = 'Название задачи не должно быть пустым';
const informMessage = 'Такая задача присутствует в списке';
const tasks = [
  {
    //id: '1138465078061',
    id: '1',
    completed: false,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    //id: '1138465078062',
    id: '2',
    completed: false,
    text: 'Выполнить тест после урока',
  },
  {
    //id: '1138465078063',
    id: '3',
    completed: false,
    text: 'Выполнить ДЗ после урока',
  }
];
function createHeader(){
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerText='Hello ToDo';
  document.body.prepend(header);
  //Button to night or day? test test test !!!!!!!!
  const switchButton = document.createElement('label');
  switchButton.classList.add('switch');
  const inputButton = document.createElement('input');
  inputButton.type='checkbox';
  const sliderButton = document.createElement('span');
  sliderButton.classList.add('slider','round');
  switchButton.appendChild(inputButton);
  switchButton.appendChild(sliderButton);
  header.appendChild(switchButton);
  
}
function createTasksElements(task){
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  //Creata ID to task ???????????????????????????
  taskItem.dataset.taskId = task.id
  // const createId = ()=>{return tasks.length + 1;};
  // if(task.id){
  //   taskItem.dataset.taskId = task.id;
  // }else{
  //   taskItem.dataset.taskId = createId();
  // };
  //task.id;
  
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('task-item__main-container');

  const checkboxForm = document.createElement('form');
  checkboxForm.classList.add('checkbox-form');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `task-${task.id}`;
  checkbox.checked = task.completed;

  const label = document.createElement('label');
  label.htmlFor = `task-${task.id}`;

  const taskText = document.createElement('span');
  taskText.classList.add('task-item__text');
  taskText.textContent = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('task-item__delete-button', 'default-button', 'delete-button');
  deleteButton.textContent = 'Удалить';

  checkboxForm.appendChild(checkbox);
  checkboxForm.appendChild(label);
  mainContainer.appendChild(checkboxForm);
  mainContainer.appendChild(taskText);
  mainContainer.appendChild(deleteButton);

  taskItem.appendChild(mainContainer);
  return taskItem;
}
function createErrorElement(message){
  //const insert = document.querySelector('.create-task-block');
  // const errorItem = document.createElement('div');
  // errorItem.classList.add('create-task-block'); 
  const errorContainer = document.createElement('span');
  errorContainer.classList.add('error-message-block');
  errorContainer.innerHTML = `${message}`;
  form.appendChild(errorContainer);
}
function removeErrorElement(){
  
  const errorBlock = document.querySelector('.error-message-block');
  if (errorBlock) {
      errorBlock.remove();
  }  
}
// function createModal(){
//   const modal = document.createElement('div');
//   modal.classList.add('modal');
//   modal.classList.add('modal-overlay');
//   modal.classList.add('modal-overlay_hidden');

//   const deleteModal = document.createElement('div');
//   deleteModal.classList.add('delete-modal');

//   const bodyElem = document.querySelector('body');
//   modal.appendChild(deleteModal);
//   bodyElem.appendChild(modal);
//   console.log(bodyElem);
// }

//Добавление задач по полю и кнопке
form.addEventListener('submit', function(event) {
  event.preventDefault();
  if(!inputText.value){
    removeErrorElement();
    createErrorElement(errorMessage);
  }else if(tasks.find(task => task.text === inputText.value)){
    removeErrorElement();
    createErrorElement(informMessage);
    inputText.value = '';    
  }else{
    removeErrorElement();
    const task = {
      //id: Math.random().toString(36).substr(2, 9),
      //id: Date.now().toString(),
      id: tasks.length + 1,
      completed: false,
      text: inputText.value,
    };
    tasks.push(task);
    const taskElement = createTasksElements(task);
    tasksList.appendChild(taskElement);
    inputText.value = '';

  }
});

tasks.forEach(task => {
  const taskElement = createTasksElements(task);
  tasksList.appendChild(taskElement);    
});

//createModal();
//
const taskItem = document.querySelectorAll('.task-item');
console.log(taskItem);
taskItem.forEach(task =>{
  console.log(task.innerText);
  
});
//Работа с кнопками Удалить 
const createTooltip = (text)=>{
  const tooltip = document.createElement('span');
  tooltip.classList.add('tooltip');
  tooltip.innerText = text;
  return tooltip;
};

document.addEventListener('mouseover', (event)=>{
  //console.log(event);
  const { target } = event;
  //console.log(target);
  
  const isOverDeleteButton = target.className.includes('task-item__delete-button');
  if(isOverDeleteButton){
    const taskItemHTML = target.closest('.task-item');
    const taskText = taskItemHTML.querySelector('.task-item__text');
    
    if(taskText){
      const tooltipHTML = createTooltip(`Удалить задачу\n "${taskText.innerText}" ?`);
      target.append(tooltipHTML); 
    }   
  }
});
document.addEventListener('mouseout', (event)=>{
  const { target } = event;
  const isOverFromDeleteButton   = target.className.includes('task-item__delete-button');
  if(isOverFromDeleteButton){
    console.log('mouse out');
    const tooltip = document.querySelector('.tooltip');
    if(tooltip){
      tooltip.remove();
    }
  }
});

createHeader();