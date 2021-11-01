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

`
In the database the information should be stored in this way - 
{
    title:"My First Form",
    description:"My first description",
    data:{
        'question1':{
            questionText:'This is Question 1',
            options:['Option 1', 'Option 2', 'Option 3']
        },
        'question2':{
            questionText:'This is Question 2',
            options:['Option 1', 'Option 2', 'Option 3']
        }
    }
}
`

let form = document.getElementById('questionForm')

form.addEventListener('submit', function(e){
    e.preventDefault();
    let children = form.children
    let formData = {
        title:children[2].querySelector('[name=title]').value,
        description:children[2].querySelector('[name=description]').value,
        data:function(){
            let data = {}
            if (children.length>4){
                for (let i=3; i<children.length-1;i++){
                    let options = [];
                    let questionText = children[i].querySelector('.question').value
                    let all_options = children[i].querySelector('.allOptions').children
    
                    for (let j=0; j<all_options.length;j++){
                        let option = all_options[j].querySelector('.option').value
                        options.push(option)
                    }
    
                    data[`question${i-2}`] = {} // 3-2 = 1
                    data[`question${i-2}`]['questionText'] = questionText;
                    data[`question${i-2}`]['options'] = options;
    
                }
            }
            return data
        }(),
    };

    console.log(formData)

    fetch(form.action, {
        method:'POST',
        body:JSON.stringify({
            formData:formData
        }),
        headers:{
            "X-CSRFToken":get_csrftoken(document.cookie),
        }
    }).then(response=>response.json()).then(json=>console.log(json));
    
})

function get_csrftoken(cookie){
    let pat = /csrftoken=(\w+)(?:;?)/gm;
    return pat.exec(cookie)[1];
}