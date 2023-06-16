var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',
        message: '',
        user_id: null,
        seller: '',
        showForm: false,
        chatHistory: []
    },
    methods: {
        openContactForm: function (product) {
            this.selectedISBN = product.ISBN;
            this.seller_name = product.seller_name;
            this.seller_id = product.seller_id;
            this.showForm = true;
            this.checkIfSeller(this.user_id);
        },
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
                        this.getChatHistory();
                    } else {
                        console.log('The user is a seller.');
                        this.getSellerChatHistory();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        sendMessage: function () {
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
        getChatHistory: function () {
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
        getSellerChatHistory: function () {
            fetch('/getSellerChatHistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seller_id: this.user_id
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
        checkImage: function (imageUrl) {
            if (imageUrl === null || imageUrl === 'undifined' || imageUrl === '') return './images/default.png';
            return imageUrl;
        },
        imageError: function (event) {
            event.target.src = './images/default.png';
        }
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

var header = new Vue({
    el: "#header-select",
    data: {
        users: [],
        selectedUser: null,
    },
    watch: {
        selectedUser: function (newUserId, oldUserId) {
            homepage.user_id = newUserId;
            if (homepage.showForm) {
                homepage.checkIfSeller(homepage.user_id);
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
    }
});
