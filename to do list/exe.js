let tasks = [];

const addTask = ()=> {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text){
        tasks.push({text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        uupdateStats();
    }
};

const toggleTastComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    uupdateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    uupdateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput")
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    uupdateStats();
}

const uupdateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) *100
    const progressBar = document.getElementById("progress")

    progressBar.style.width = `${progress}%`

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`
}

const updateTasksList = ()=> {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? 'completed':''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/Edit.png" onClick="editTask(${index})" />
                    <img src="./img/Bin.png" onClick="deleteTask(${index})" />
                </div>
        </div>
        `;
        listItem.addEventListener('change', ()=> toggleTastComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();

    addTask();
});