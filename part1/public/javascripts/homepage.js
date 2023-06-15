var homepage = new Vue({
    el: "#products",
    data: {
        products: []
    },
    mounted: function () {
        fetch('/allBooks')
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
});
