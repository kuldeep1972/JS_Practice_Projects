//Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listners
loadEventListerners();

function loadEventListerners() {

  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)

  //Add Task Event
  form.addEventListener('submit', addTask);

  //Remove Task event
  taskList.addEventListener('click',removeTask);

  //Clear Task event
  clearBtn.addEventListener('click',clearTasks)

  //Filter Tasks Event
  filter.addEventListener('keyup',filterTasks)
}

//Get Tasks from Local Storage
function getTasks() {

  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if(tasks!== null){
    tasks.forEach(function(task) {
    //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Add text node
    li.appendChild(document.createTextNode(task));
    //Create a new link
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content remove';
    //Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to UL
    taskList.appendChild(li)
    })
  }  
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task');
  }
  else {
    //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Add text node
    li.appendChild(document.createTextNode(taskInput.value));
    //Create a new link
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content remove';
    //Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to UL
    taskList.appendChild(li)

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';

    e.preventDefault();
  }
}

//Store Task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks')===null)
  {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);  

  localStorage.setItem('tasks',JSON.stringify(tasks))
}

//Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item'))
  {
    e.target.parentElement.parentElement.remove()

    //Remove from Local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }  

}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  
  if(tasks!== null){
    tasks.forEach(function(task,index){  
      if(taskItem.textContent === task)
      {
        tasks.splice(index,1)
      }
    })
  }

  localStorage.setItem('tasks',JSON.stringify(tasks))
}


//CLear Tasks
function clearTasks(){
  //One Way
  // taskList.innerHTML='';
  // Faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);

    //One way
    removeTaskFromLocalStorage(taskList.firstChild)
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase(); //For matching purpose toLowerCase is used

  document.querySelectorAll('.collection-item').forEach(function(task){    
    const item = task.firstChild.textContent.toLowerCase() //For matching purpose toLowerCase is used
    
    if(item.indexOf(text) !=-1)
    {
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';  
    }    
  })
}