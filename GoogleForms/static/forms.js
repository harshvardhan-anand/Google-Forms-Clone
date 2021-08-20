var count = 0;
var q_id;

function addQuestion() {
    q_id = `question${count}`
    let node = document.createElement("div");
    node.classList.add('card', 'mt-5')
    node.setAttribute('id', q_id)
    node.innerHTML = `
        <input type='hidden' name='q_id' value=${q_id}>
        <div class="card-header">
            Question
        </div>
        <div class="card-body">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Type your question" name='question'>
                <label for="floatingInput">Type your question</label>
            </div>
            <div id=${q_id}_option class='mb-2'></div>
            <button type='button' id=${q_id}_addOpt onClick="addOption(this.id)"> Add Option </button> 
            <br>
            <button type='button' class='mt-3' id='addQuestion'> Add Question </button>
            <button type='button' id='${q_id}_delQ' onClick="deleteQuestion(this.id)"> Delete Question </button>
        </div>
    `
    document.getElementById('questionForm').appendChild(node); // Add question to form
    count += 1;
}

function addOption(button_id) {
    let q_id = button_id.split('_')[0]
    let node = document.createElement("div");
    node.classList.add('form-check')
    node.innerHTML = `
        <input class="form-check-input" type="radio" id="flexRadioDefault1">
        <label class="form-check-label" for="flexRadioDefault1">
            <input class="form-control" type="text" placeholder="Default input" aria-label="default input example" name="${q_id}">
        </label>
    `
    document.getElementById(`${q_id}_option`).appendChild(node); // Add option to Question
}


function deleteQuestion(button_id) {
    let q_id = button_id.split('_')[0]
    document.getElementById(`${q_id}`).remove(); // Remove Question
}

document.getElementById("questionForm").addEventListener("click", addQuestion);
