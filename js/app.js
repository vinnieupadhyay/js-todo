let form = document.querySelector('#task-form'),
	taskList = document.querySelector('.collection'),
	clrButton = document.querySelector('.clear-tasks'),
	textInput = document.querySelector('#task'),
	filterInput = document.querySelector('#filter');

loadEvent();
//load all events
function loadEvent(){
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', deletTask);
	clrButton.addEventListener('click', clearTaskList);
	filterInput.addEventListener('keyup', filterTask);

}

//add task event
function addTask(e){
	if(textInput.value === ''){
		alert('Input field is empty.');
	}
	
	let li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(textInput.value));
	
	let linkDelete = document.createElement('a');
		linkDelete.className = 'delete-item secondary-content';
		linkDelete.innerHTML = '<i class="fa fa-remove"></i>';
		
	li.appendChild(linkDelete);

	taskList.appendChild(li);

	addTaskToLocalStorage(textInput.value);

	textInput.value = '';
		
	e.preventDefault();
}

//remove task event
function deletTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		e.target.parentElement.parentElement.remove();

		//remove task from localstorage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
}

//clear tasklist
function clearTaskList(e){
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}

	//Remove all tasks from local storage
	clearLocalStorage();

	e.preventDefault();
}

//filter tasks
function filterTask(e){
	let filterValue = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task){
		let taskItem = task.firstChild.textContent;

		if(taskItem.toLowerCase().indexOf(filterValue) != -1){
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

//Add task to local storage
function addTaskToLocalStorage(task){
	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Get tasks from the local storage
function getTasks(){
	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		let li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
	
		let linkDelete = document.createElement('a');
			linkDelete.className = 'delete-item secondary-content';
			linkDelete.innerHTML = '<i class="fa fa-remove"></i>';
			
		li.appendChild(linkDelete);

		taskList.appendChild(li);
	});
}

//Remove tasks from the local storage
function removeTaskFromLocalStorage(taskItem){
	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1)
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear local storage
function clearLocalStorage(){
	localStorage.clear();
}