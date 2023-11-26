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
        const title = event.target.dataset.title
        event.target.closest('li').innerHTML = editLi(id, title)
        // const newTitle = prompt('введите новое название', event.target.dataset.title)
        // console.log( event.target.closest('li'))

        // if (newTitle !== null) {
        //     edit(id, newTitle).then(() => {
        //         event.target.closest('li').children.namedItem('note-name').innerText = newTitle
        //     })
        // }
    } else
    if (event.target.dataset.type === 'edit-true') {
        const id = event.target.dataset.id
        const title = event.target.closest('li').querySelector('input').value
        // console.log(title);
        if (title !== null) {
            edit(id, title).then(() => {
                event.target.closest('li').innerHTML = layoutLi(id, title)
            })
        }
    }
    else
    if (event.target.dataset.type === 'edit-false') {
        const id = event.target.dataset.id
        const title = event.target.dataset.title
        event.target.closest('li').innerHTML = layoutLi(id, title)
    }
})

const editLi = (id, title) => {
    return `<div class="justify-content-left">
                <input type="text" class="form-control" name="text-edit" id="text-edit" value="${title}"/>
             </div>
             <div class="justify-content-right">
                <button type="submit" class="btn btn-success" data-type="edit-true" data-id="${id}">Сохранить</button>
                <button type="submit" class="btn btn-danger" data-type="edit-false" data-id="${id}" data-title="${title}">Отменить</button>                
            </div>`
}
const layoutLi = (id, title) => {
    return `<div id="note-name" class="justify-content-left">
                <span>${title}</span>
             </div>
             <div class="justify-content-right">
                <button type="submit" class="btn btn-primary" data-type="edit" data-id="${id}" data-title="${title}">Редактировать</button>
                <button type="submit" class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>                
            </div>`
}

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