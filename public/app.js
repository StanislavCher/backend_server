// console.log('Hello from app.js')
document.addEventListener('click', (event) => {


    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        // console.log( event.target.closest('li'))
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const newTitle = prompt('введите новое название', event.target.dataset.title)
        // console.log( event.target.closest('li'))
        if (newTitle !== null) {
            edit(id, newTitle).then(() => {
                event.target.closest('li').children.namedItem('note-name').innerText = newTitle
            })
        }
    }
})

async function remove(id){
    await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, newTitle) {
    const reqBody = {
        id: id,
        title: newTitle
    }
    // console.log(reqBody)
    await fetch('/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    // await fetch(`/?id=${id}&title=${newTitle}`, { method: 'PUT' })
}