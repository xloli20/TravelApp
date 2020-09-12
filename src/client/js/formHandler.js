import fetch from "node-fetch";
var validUrl = require('valid-url')

export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    console.log("::: Form Submitted :::")
    if (validUrl.isUri(formText)) {
        fetch('http://localhost:8000/sentimentAnalysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: formText })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById('subjectivity').innerHTML = data.apiData.subjectivity;
                document.getElementById('confidence').innerHTML = data.apiData.confidence;
                document.getElementById('irony').innerHTML = data.apiData.irony;
            })

    } else {
        alert('enter a valid url!')
    }
}
