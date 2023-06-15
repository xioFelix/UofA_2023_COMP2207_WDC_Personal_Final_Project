var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',
        message: '',
        user_id: '',
        seller_name: '',
        seller_id: '',
        chatHistory: [],
        showForm: false
    },
    methods: {
        openContactForm: function(product) {
            this.selectedISBN = product.ISBN;
            this.seller_name = product.seller_name;
            this.seller_id = product.seller_id;
            this.showForm = true;

            fetch('/getChatHistory', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.user_id,
                    seller_id: this.seller_id,
                }),
            })
            .then(response => response.json())
            .then(data => {
                this.chatHistory = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                    seller_id: this.seller_id
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.chatHistory.push({
                    sender: 'You',
                    message: this.message
                });
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
