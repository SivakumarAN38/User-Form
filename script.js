const formData = document.getElementById("formid")
const userName = document.getElementById("name")
const userEmail = document.getElementById("email")
const userNo = document.getElementById("number")
const userDetails = document.getElementById("details")

let users = JSON.parse(localStorage.getItem("users")) || []
let editIndex = null

displayUsers()

formData.addEventListener("submit", function(event){
    event.preventDefault()

    const user = {
        name: userName.value,
        email: userEmail.value,
        number: userNo.value
    }

    if(editIndex === null){
        users.push(user)
    }else{
        users[editIndex] = user
        editIndex = null
    }

    localStorage.setItem("users", JSON.stringify(users))

    displayUsers()
    formData.reset()
})

function displayUsers(){
    userDetails.innerHTML = ""

    users.forEach((u,index)=>{

        const card = document.createElement("div")
        card.className = "card"

        card.innerHTML = `
        <h3>${u.name}</h3>
        <p>${u.email}</p>
        <p>${u.number}</p>

        <div class="actions">
            <button class="edit" onclick="editUser(${index})">Edit</button>
            <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </div>
        `

        userDetails.appendChild(card)
    })
}

function deleteUser(index){
    users.splice(index,1)
    localStorage.setItem("users", JSON.stringify(users))
    displayUsers()
}

function editUser(index){
    const user = users[index]

    userName.value = user.name
    userEmail.value = user.email
    userNo.value = user.number

    editIndex = index
}