
var allProducts = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dot-net-day6-lab.vercel.app/');
xhr.send();

xhr.onload = function () {
    allProducts = JSON.parse(xhr.response);

    for (let i = 0; i < allProducts.length; i++) {
        let prd = allProducts[i];

        var stockMsg = "";
        if (prd.stock === 0) stockMsg = "<p style='color: red;'>out of stock</p>";
        else if (prd.stock === 1) stockMsg = "<p style='color: red;'>last piece</p>";

        document.getElementById('container').innerHTML += `
            <a class='prd-container' href='details.html?id=${prd.id}'>
                <img class='prd-img' src='${prd.images[0]}'> 
                <h2>${prd.title}</h2>
                ${stockMsg}
            </a>
        `;
    }

    var images = document.querySelectorAll('.prd-img');
    for (let img of images) {
        let index = Number(img.getAttribute('data-id'));
        let count = 0;

        img.addEventListener('mouseover', function () {
            count++;
            if (count === allProducts[index].images.length) {
                count = 0;
            }
            img.src = allProducts[index].images[count];
        });
    }
};