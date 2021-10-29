let count = 0;

function addQuestion(IdOfClickedAddQuesButton, autoScroll=true) {
    let q_id = `question${count}` // question0
    let addQuestionButtonId = `addQByQ${q_id}` //addQByQquestion0
    let addOptionButtonId = `${q_id}_addOpt` // [question0, addOpt]
    let newNode = document.createElement("div");
    newNode.classList.add('card', 'mt-3')
    newNode.setAttribute('id', q_id)
    newNode.innerHTML = `
        <input type='hidden' name='q_id' value=${q_id}>
        <div class="card-header">
            Question
        </div>
        <div class="card-body">
            <div class="form-floating mb-3">
                <input type="text" class="form-control question" id="q_${q_id}" placeholder="Type your question" name='question'>
                <label for="q_${q_id}">Type your question</label>
            </div>
            <div id=${q_id}_option class='mb-2 allOptions'></div>
            <button type='button' id=${addOptionButtonId} onClick="addOption(this.id)"> Add Option </button> 
            <br>
            <button type='button' class='mt-3' id=${addQuestionButtonId}> Add Question </button>
            <button type='button' id='${q_id}_delQ' onClick="deleteQuestion(this.id)" class='mb-2'> Delete Question </button>
        </div>
    `
    if (IdOfClickedAddQuesButton == 'addQuestion') {
        document.getElementById(IdOfClickedAddQuesButton).parentElement.insertAdjacentElement('afterend', newNode); // Add question to form
    } else {
        document.getElementById(IdOfClickedAddQuesButton).parentElement.parentElement.insertAdjacentElement('afterend', newNode); // Add question to form
    }
    document.getElementById(addQuestionButtonId).addEventListener("click", function () {
        addQuestion(addQuestionButtonId)
    });
    count += 1;
    if (autoScroll){
        document.getElementById(addQuestionButtonId).parentElement.scrollIntoView({ block: "end" })
    }
    return [addQuestionButtonId, addOptionButtonId];
}

document.getElementById("addQuestion").addEventListener("click", function () {
    addQuestion("addQuestion")
});

function addOption(button_id) {
    let q_id = button_id.split('_')[0]
    let option_id = `option_${parseInt(Math.random() * 100000)}_${q_id}`
    let node = document.createElement("div");
    node.classList.add('form-check')
    node.innerHTML = `
        <input class="form-check-input" type="radio" id="${option_id}_radio" name="${q_id}">
        <label class="form-check-label" for="${option_id}_radio">
            <input class="form-control option" type="text" placeholder="Option" id='${option_id}'>
        </label>
    `
    document.getElementById(`${q_id}_option`).appendChild(node); // Add option to Question
    return option_id;
}

function deleteQuestion(button_id) {
    let q_id = button_id.split('_')[0]
    document.getElementById(`${q_id}`).remove(); // Remove Question
}