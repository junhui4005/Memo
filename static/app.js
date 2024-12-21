readMemo();

async function editMemo(event){
    const memo_id = event.target.dataset.id;
    const editInput = prompt("수정할 값을 입력하세요.");
    const res = await fetch(`/memos/${memo_id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id:memo_id,
            content: editInput,
        }),
    });
    readMemo();
}


async function deleteMemo(event){
    const id = event.target.dataset.id;
    const res = await fetch(`/memos/${id}`,{
        method: "DELETE",
    });
    readMemo();
}

function displayMemos(memos){
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");
    li.innerText = `${memos.content}`;

    const editBtn = document.createElement("button");
    editBtn.innerText = "수정하기";
    editBtn.addEventListener("click", editMemo);
    editBtn.dataset.id = memos.id;
    
    const delBtn = document.createElement("button");
    delBtn.innerText = "삭제하기";
    delBtn.addEventListener("click", deleteMemo);
    delBtn.dataset.id = memos.id;

    ul.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
}

async function readMemo(){
    const res = await fetch('/memos');
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemos);
}


async function createMemo(value){
    const res = await fetch("/memos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime().toString(), // id값이 str이므로 new Date().getTime() + toString()
            content: value,
        }),
    });
    readMemo();
}


function handleSubmit(event){
    event.preventDefault();
    const input = document.querySelector("#memo-input");
    createMemo(input.value);
    input.value = "";
}
const form = document.querySelector('#memo-form');

form.addEventListener("submit", handleSubmit);