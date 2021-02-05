let form = document.querySelector('#task-form'),
	taskList = document.querySelector('.collection'),
	clrButton = document.querySelector('.clear-tasks'),
	textInput = document.querySelector('#task');

loadEvent();
//load all events
function loadEvent(){
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', deletTask);
	clrButton.addEventListener('click', clearTaskList);
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
		
	e.preventDefault();
}

//remove task event
function deletTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		e.target.parentElement.parentElement.remove();
	}
}

//clear tasklist
function clearTaskList(e){
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}
	e.preventDefault();
}