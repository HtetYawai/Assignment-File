// HTML DOM elements
const categoryInput = document.getElementById('category');
const taskInput = document.getElementById('task');
const tasksList = document.getElementById('tasks-list');

// Initialize an object to store tasks by category
const tasksByCategory = {};

// Add a task to the specified category
function addTask() {
    // Take value from input elements.
    const category = categoryInput.value.trim();
    const task = taskInput.value.trim();

    // Check category and task
    if (!category || !task) {
        alert('Please enter both a category and a task.');
        return;
    }
        
    

    // Add task to the category
    if (!tasksByCategory[category]) {
        tasksByCategory[category] = [];
    }
    tasksByCategory[category].push(task);


    // Clear input fields and update the displayed tasks
    categoryInput.value = '';
    taskInput.value = '';
    
    /* *** Display HTML Element Format ***

        <div id="tasks-list">
            <div class="category">
                <h3>House Chore</h3>
                <div class="task"><span>Wash dishes</span><button>Remove</button></div>
            </div>
            <div class="category">
                <h3>Pets</h3>
                <div class="task"><span>Shower Ruff</span><button>Remove</button></div>
            </div>
        </div>
    */

    // Refresh displayed tasks
    listTasks();
}

// Display all tasks by category
function listTasks() {
    tasksList.innerHTML = '';
    // Clear previous tasks

    // list all tasks by category.
 
    for (const [category, tasks] of Object.entries(tasksByCategory)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeTask(category, index);

            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(removeButton);
            categoryDiv.appendChild(taskDiv);
        });

        tasksList.appendChild(categoryDiv);
    }
    // show the tasks in DOM element tasksList
}


// Remove a task from the specified category
function removeTask(category, taskIndex) {

    // remove tasks from object tasksByCategory
    tasksByCategory[category].splice(taskIndex, 1);
    
    // If the category is empty after removal, delete the category
    if (tasksByCategory[category].length === 0) {
        delete tasksByCategory[category];
    }

    // Refresh displayed tasks
    listTasks(); 
}