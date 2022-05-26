const ramenMenu = document.getElementById("ramen-menu");
const mainImg = document.querySelector("#ramen-detail img");

//advanced: function for adding click event listener to an element
const addClick = function(element, data){
    element.addEventListener("click", () => {
        dispRamen(data);
    });
}

//advanced: function for displaying ramen info in #ramen-detail
const dispRamen = function(data){
    mainImg.src = data.image;
    mainImg.alt = data.name;
    document.querySelector("#ramen-detail h2").innerText = data.name;
    document.querySelector("#ramen-detail h3").textContent = data.restaurant;
    document.getElementById("rating-display").textContent = data.rating;
    document.getElementById("comment-display").textContent = data.comment;
}

//function for appending an image to div #ramen-menu
const newPic = function(data){
    const pic = document.createElement("img");
    pic.src = data.image;
    pic.alt = data.name;
    //click listener for a #ramen-menu img to display ramen data in #ramen-detail
    addClick(pic, data);
    ramenMenu.append(pic);
}

//listens for all DOM nodes to be loaded and then runs page initialization function
document.addEventListener('DOMContentLoaded', () => {
    //access objects in database to initialize page
    fetch("http://localhost:3000/ramens").then(resp => resp.json()).then(ramens => {
        //load all ramen images into div #ramen-menu
        let loaded = false;
        ramens.forEach(ramen => {
            newPic(ramen);
            if (loaded === false){
                loaded = true;
                dispRamen(ramen);
            }
        });
    });
});

//event listener for new-ramen form submit to add a newPic
const ramenForm = document.getElementById("new-ramen");
ramenForm.addEventListener("submit", e => {
    e.preventDefault();
    newRamen =
        {name: ramenForm.querySelector("#new-name").value,
        restaurant: ramenForm.querySelector("#new-restaurant").value,
        image: ramenForm.querySelector("#new-image").value,
        rating: ramenForm.querySelector("#new-rating").value,
        comment: ramenForm.querySelector("#new-comment").value};
    newPic(newRamen);
    ramenForm.reset();
})

//advanced: event listener for edit-ramen form submit to change rating and comment
const editForm = document.getElementById("edit-ramen");
editForm.addEventListener("submit", e => {
    e.preventDefault();
    updateRamen = 
        {
            rating: editForm.querySelector("#new-rating").value,
            comment: editForm.querySelector("#new-comment").value
        }
    document.getElementById("rating-display").textContent = updateRamen.rating;
    document.getElementById("comment-display").textContent = updateRamen.comment;
    //addClick() how do we update the click event listener?
    editForm.reset();
});

//advanced: delete functionality
document.querySelector("#ramen-detail img").addEventListener("click", () => {
    const pics = ramenMenu.getElementsByTagName("img");
    for (let pic of pics){
        if (pic.src === mainImg.src)
        pic.remove();
    }
});