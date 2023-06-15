var homepage = new Vue({
    el: "#products",
    data: {
        product: []
    }
});

window.onload = function () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var books = JSON.parse(this.responseText);
            var booksDiv = document.getElementById('books');
            for (var i = 0; i < books.length; i++) {
                booksDiv.innerHTML += '<h2>' + books[i].title + '</h2>' +
                    '<p>Author: ' + books[i].author + '</p>' +
                    '<p>Price: ' + books[i].price + '</p>' +
                    '<img src="' + books[i].image + '" alt="Book Image">';
            }
        }
    };

    xhttp.open("GET", "/allBooks", true);
    xhttp.send();
}