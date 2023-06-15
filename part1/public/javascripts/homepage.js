var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',
        message: '',
        user: '1',
        seller: '',
        showForm: false
    },
    methods: {
        openContactForm: function(product) {
            this.selectedISBN = product.ISBN;
            this.seller = product.seller_name;
            this.showForm = true;
        },
        sendMessage: function() {
            fetch('/contactSeller', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ISBN: this.selectedISBN,
                    message: this.message,
                    user_id: this.user_id,
                    seller: this.seller_name
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.showForm = false;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.selectedISBN = '';
            this.message = '';
            this.seller = '';
        },
    },
        mounted: function () {
        fetch('/allAds')
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
});
