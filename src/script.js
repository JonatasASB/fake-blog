//https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carergando...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let json = await response.json()

    if (json.length > 0) {
        postArea.innerHTML = '';
        for (let post in json) {
            let postDiv = document.createElement('div')
            let postTitle = document.createElement('h2')
            let postBody = document.createElement('p')
            let postBar = document.createElement('hr')
            postDiv.classList.add(`post-${json[post].id}`)
            postTitle.textContent = json[post].title
            postBody.textContent = json[post].body
            postDiv.appendChild(postTitle)
            postDiv.appendChild(postBody)
            postDiv.appendChild(postBar)
            postArea.appendChild(postDiv)
            
            
        }
    } else {
        postArea.innerHTML = 'Nenhum post encontrado'
    }
}

async function addNewPost(title, body) {
    await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        });
        document.querySelector('#text').value = ''
        document.querySelector('#body').value = ''
    readPosts()
}

document.querySelector('#insert-button').addEventListener('click', () => {
    let title = document.querySelector('#text').value
    let body = document.querySelector('#body').value

    if (title.length <= 0 || body.length <= 0) {
        if (document.querySelector('fieldset .warning')) {
            document.querySelector('fieldset .warning').remove()
        }
        let warning = document.createElement('p')
        document.querySelector('fieldset').appendChild(warning).style.color = 'red'
        warning.classList.add('warning')
        warning.innerHTML = 'Preencha todos os campos' 
    } else {
        let warningElement = document.querySelector('fieldset .warning')
        if (warningElement) {
            warningElement.remove()
        }
        addNewPost(title, body)
    }
})

readPosts()