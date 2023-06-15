var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        users: [],
        selectedISBN: '',
        message: '',
        user_id: 'Please manual select the user',
        selectedUser: null,
        seller: '',
        showForm: false,
        chatHistory: [],
    },
    methods: {
        openContactForm: function(product) {
            this.selectedISBN = product.ISBN;
            this.seller_name = product.seller_name;
            this.seller_id = product.seller_id;
            this.user_id = this.selectedUser;
            this.showForm = true;
            this.getChatHistory();
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
                this.showForm = false;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.selectedISBN = '';
            this.message = '';
            this.seller = '';
        },
        getChatHistory: function() {
        fetch('/getChatHistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.user_id
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.chatHistory = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        },
    },
    watch: {
        selectedUser: function(newUserId, oldUserId) {
            this.user_id = newUserId;
            if (this.showForm) {
                this.getChatHistory();
            }
        }
    },
    mounted: function () {
        fetch('/allUsers')
            .then(response => response.json())
            .then(data => {
                this.users = data;
            })
            .catch(err => {
                console.error('Error:', err);
            });

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
