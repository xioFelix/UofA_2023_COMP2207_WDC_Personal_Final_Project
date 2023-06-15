var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        users: [],
        selectedISBN: '',
        message: '',
        user_id: '',
        selectedUser: null,
        seller: '',
        showForm: false,
        chatHistory: []
    },
    methods: {
        openContactForm: function(product) {
            this.selectedISBN = product.ISBN;
            this.seller_name = product.seller_name;
            this.seller_id = product.seller_id;
            this.user_id = this.selectedUser;
            this.showForm = true;
            this.getChatHistory(); this.checkIfSeller(this.selectedUser); // Check if the selected user is a seller
        },
        // Rest of the code remains the same...
        checkIfSeller: function (user_id) {
            fetch('/checkIfSeller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.length === 0) {
                        console.log('The user is not a seller.');
                    } else {
                        console.log('The user is a seller.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
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
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            this.showForm = false;
            this.getChatHistory();
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
    .then((response) => response.json())
    .then((data) => {
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
            .then((response) => response.json())
            .then((data) => {
                this.users = data;
            })
            .catch((err) => {
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
