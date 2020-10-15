let addToy = false;
const TOYS_URL = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {
  // const addBtn = document.querySelector("#new-toy-btn");
  // const toyFormContainer = document.querySelector(".container");
  // addBtn.addEventListener("click", () => {
  //   // hide & seek with the form
  //   addToy = !addToy;
  //   if (addToy) {
  //     toyFormContainer.style.display = "block";
  //   } else {
  //     toyFormContainer.style.display = "none";
  //   }


  // });
  function clickHandler(){
    document.addEventListener("click", e => {
      if (e.target.matches("#new-toy-btn")){
        addBtn = e.target
        const toyFormContainer = document.querySelector(".container")
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      } else if (e.target.matches(".like-btn")) {
        likeBtn = e.target
        const likes = parseInt(likeBtn.parentElement.querySelector("p").textContent.split(" ")[0])
        const newLikes = likes + 1
        likeBtn.parentElement.querySelector("p").textContent = `${newLikes} Likes`
        const toyId = likeBtn.parentElement.dataset.toyId
  
        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({likes: newLikes})
        }
        
        fetch(TOYS_URL + toyId, options)
          .then(response => response.json())
          .then()
        
      }
    })
  }
 

  function getToys(){
    fetch(TOYS_URL)
      .then(response => response.json())
      .then(renderToys)
  }

  const renderToys = (toys) => {
    toys.forEach(toy => {
      renderToy(toy)
    });
  }

  const renderToy = (toy) => {
    buildToy(toy)
  }

  const buildToy = (toy) => {
    const toyCollection = document.querySelector('#toy-collection')
    const toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    toyId = toy.id
    toyDiv.dataset.toyId = toyId
    toyDiv.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"/>
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
      `
    toyCollection.append(toyDiv)
  }

  function submitHandler(){
    document.addEventListener("submit", e => {
      e.preventDefault()
      const form = document.querySelector('.add-toy-form')
      const name = form.name.value
      const image = form.image.value
      const newToy = {name: name, image: image, likes: 0}
      
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(newToy)
      }

      fetch(TOYS_URL, options)
        .then(response => response.json())
        .then(toy => buildToy(toy))
      
        form.reset()
    })
  }
  clickHandler()
  submitHandler()
  getToys()
});
