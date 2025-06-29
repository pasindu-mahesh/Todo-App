document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text){
        tasks.push({ text: text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();

    } 
};

const toggleTestComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();

};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
    
};

const updateStats = () => {
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100
  const progressBar = document.getElementById("progress");
  
  progressBar.style.width = `${progress}%`;

  document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) =>{
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
    listItem.addEventListener("change", ()=> toggleTestComplete(index));
        taskList.append(listItem);
    });
}

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();

    addTask();
});