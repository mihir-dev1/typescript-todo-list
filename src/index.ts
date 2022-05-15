/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// import confetti from 'canvas-confetti';

import { v4 as uuid } from 'uuid';
import type { Task } from './Task'

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector("#new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks:Task[] = [] = loadTask();
tasks.forEach(addListItem)

form?.addEventListener('submit', e => {
  e.preventDefault();

  if(input?.value == "" || input?.value == null) return

  const newTask:Task = {
    id: uuid(),
    title: input.value,
    completed: false,
    createAt: new Date()
  }

  tasks.push(newTask);

  addListItem(newTask); 
  input.value = '';
})

function addListItem(task:Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change",() => {
    task.completed = checkBox.checked
    saveTask()
  })
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  label.append(checkBox,task.title);
  item.append(label);
  list?.append(item);
  saveTask()
}

function saveTask() {
  localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function loadTask():Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if(taskJSON == null) return []
  return JSON.parse(taskJSON);
}