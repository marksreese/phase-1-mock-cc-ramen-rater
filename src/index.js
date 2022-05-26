const ramenMenu = document.getElementById("ramen-menu");
//function for appending an image to div #ramen-menu
const newPic = function(obj){
    const pic = document.createElement("img");
    pic.src = obj.image;
    pic.alt = obj.name;
    //click listener for a #ramen-menu img to display ramen data in #ramen-detail
    pic.addEventListener("click", () => {
        const mainImg = document.querySelector("#ramen-detail img");
        mainImg.src = obj.image;
        mainImg.alt = obj.name;
        document.querySelector("#ramen-detail h2").innerText = obj.name;
        document.querySelector("#ramen-detail h3").textContent = obj.restaurant;
        document.getElementById("rating-display").textContent = obj.rating;
        document.getElementById("comment-display").textContent = obj.comment;
    });
    ramenMenu.append(pic);
}

const init = () => {
    //access objects in database to initialize page
    fetch("http://localhost:3000/ramens").then(resp => resp.json()).then(ramens => {
        //load all ramen images into div #ramen-menu
        ramens.forEach(ramen => {
            newPic(ramen);
        });
    });
}

//listens for all DOM nodes to be loaded and then runs page initialization function
document.addEventListener('DOMContentLoaded', init);
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