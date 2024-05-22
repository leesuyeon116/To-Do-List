let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); // querySelectorAll 조건에 만족하는 것을 모두 가지고 옴
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
// console.log(tabs);

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    };
    taskList.push(task);
    // console.log(taskList);
    render();
}

function render() {
    let resultHTML = ''; 
    // 1. 내가 선택한 탭에 따라서 
    let list = [];

    if(mode === "all") {
        list = taskList;
    // all taskList
    } else if(mode === "ongoing" || mode === "finish") {
        list = filterList;
    }

    // 2. 리스트를 달리 보여줌

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `
                <div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="ToggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="ToggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>
            `;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function ToggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // 현재 갖고 있는 반대 값을 넣어줌
            break; // for문 종료
        }
    }
    render();
    // console.log(taskList);
}

// 아이템 삭제
function deleteTask(id) { 
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];

    if(mode === "all") {
        // 전체 리스트를 보여줌
        render();
    } else if(mode === "ongoing") {
         // 진행 중인 아이템을 보여줌 -> task.isComplete=false
         for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
         }
         render();
         // console.log("진행중", filterList);
    } else if(mode === "finish") {
        // 끝나는 케이스 -> task.isComplete=true
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
   }
    render();      
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9); // 랜덤 ID 생성
}

