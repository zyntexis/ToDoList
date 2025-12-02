const taskContainer = document.querySelector(".tasks-container")
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()

addBtn.addEventListener("click", addTask)

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
})

function addTask() {
    const text = taskInput.value.trim()
    if (text === "") return

    tasks.push({ text, done: false })

    saveTasks()
    renderTasks()
    taskInput.value = ""
}

function renderTasks() {
    taskContainer.innerHTML = ""

    tasks.forEach((task, index) => {
        const div = document.createElement("div")
        div.className = "task"

        div.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""}>
            <label>${task.text}</label>
            <button class="delete-btn">&times;</button>
        `

        const checkbox = div.querySelector("input")
        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked
            saveTasks()
        })

        const deleteBtn = div.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        })

        taskContainer.appendChild(div)
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}