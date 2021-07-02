let $todoInput;
let $addBtn;
let $alertInfo;
let $ulList;
let $newTask;

let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTodos;


const main = () =>{
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements=() =>{
$todoInput = document.querySelector('.todoInput');
$addBtn = document.querySelector('.addBtn');
$alertInfo = document.querySelector('.alertInfo');
$ulList = document.querySelector('.todoList ul');

$popup = document.querySelector('.popup');
$popupInfo = document.querySelector('.popupInfo');
$popupInput = document.querySelector('.popupInput');
$addPopupBtn = document.querySelector('.accept');
$closeTodoBtn = document.querySelector('.cancel');
$allTodos = $ulList.getElementsByTagName('li');
};

const prepareDOMEvents =() =>{
$addBtn.addEventListener('click', addNewTask);
$ulList.addEventListener('click', checkClick);
$closeTodoBtn.addEventListener('click', closePopup);
$addPopupBtn.addEventListener('click', changeTodo);
$todoInput.addEventListener('keyup', enterCheck);
};

const addNewTask = () =>{
 if($todoInput.value !== ''){
     $idNumber++;
     $newTask = document.createElement('li');
     $newTask.innerText= $todoInput.value;
     $newTask.setAttribute('id', `todo-${$idNumber}`);
     $ulList.appendChild($newTask);

     $todoInput.value = ''
     $alertInfo.innerText = ''
     createToolsArea();
     
 } else{
    $alertInfo.innerText = 'Musisz wpisać treść zadania';
 }
};

const enterCheck = () => {
    if(event.keycode === 13){
        addNewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerText ='Complete';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'Delete';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) =>{
    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    }else if (e.target.closest('button').className === 'edit'){
        editTask(e);
    }else if (e.target.closest('button').className === 'delete'){
        deleteTask(e);
    }
};

const editTask = (e) =>{
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};
const changeTodo = () =>{
    if($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    }else{
        $popupInfo.innerText = 'Musisz dodać tekst';
    };
};

const closePopup = () =>{
    $popup.style.display = 'none';
};

const deleteTask = (e) => {
 const deleteTodo = e.target.closest('li');
 deleteTodo.remove();

 if($allTodos.length === 0){
     $alertInfo.innerText = 'There is no task on the list, please add one';
 }
}

document.addEventListener('DOMContentLoaded', main);

