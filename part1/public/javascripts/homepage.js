var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',
        message: ''
    },
    methods: {
        openContactForm: function(ISBN) {
            this.selectedISBN = ISBN;
        },
        sendMessage: function() {
            fetch('/contactSeller', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ISBN: this.selectedISBN,
                    message: this.message
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.selectedISBN = '';
            this.message = '';
        },
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
