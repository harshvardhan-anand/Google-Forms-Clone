// insertAdjacentElement - https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
// Accessing form fields using JS - https://www.javascripttutorial.net/javascript-dom/javascript-form/
// Convert Html collection to array - https://stackoverflow.com/a/222847
// AJAX in Django - https://docs.djangoproject.com/en/3.2/ref/csrf/#setting-the-token-on-the-ajax-request
// Post Request with JS - https://www.geeksforgeeks.org/get-and-post-method-using-fetch-api/

var count = 0;

function addQuestion(IdOfClickedAddQuesButton, autoScroll=true) {
    // IdOfClickedAddQuesButton is required to track where to add new question i.e below which div
    let q_id = `question${count}`
    let addQuestionButtonId = `addQByQ${q_id}`
    let addOptionButtonId = `${q_id}_addOpt`
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
    // window.scrollTo(0,document.body.scrollHeight);
    return [addQuestionButtonId, addOptionButtonId]; // We need this for re-rendering the form for edit.
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

// We will use class "question" to grab all question in the form

var form = document.getElementById('questionForm')

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop default behaviour
    let children = form.children;
    let formData = {
        title: children[2].querySelector('[name=title]').value,
        description: children[2].querySelector('[name=description]').value,
        data: function () {
            if (children.length > 3) {
                // Grab all question div from the DOM
                data = {}
                for (let i = 3; i < children.length; i++) {
                    var options = [];

                    var questionText = children[i].querySelector('.question').value;

                    // all_option we will have all the options provided for the selected question(children[i]).
                    let all_options = children[i].querySelector('.allOptions').children

                    for (let i = 0; i < all_options.length; i++) {
                        // collecting value of options
                        let option = all_options[i].querySelector('.option').value
                        options.push(option);
                    }
                    data[`question${i - 2}`] = {}; // indexing is from 1 because 3-2 is 1 you can also use 0 i.e i-3
                    data[`question${i - 2}`]['questionText'] = questionText;
                    data[`question${i - 2}`]['options'] = options;
                }
                return data
            }
        }(),
    };

    console.log(formData)

    fetch(form.action, {
        method: 'POST',
        body: JSON.stringify({
            formData: formData
        }),
        headers: {
            "X-CSRFToken": get_csrftoken(document.cookie)
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));
});

function get_csrftoken(cookie) {
    // we need csrf token from cookies, so extract it with regexp
    let pat = /csrftoken=(\w+)(?:;?)/gm;
    return pat.exec(cookie)[1];
}
