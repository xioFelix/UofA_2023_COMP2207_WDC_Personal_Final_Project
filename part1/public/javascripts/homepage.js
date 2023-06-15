var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',  // 新增用于保存当前选中的图书ISBN
        message: ''  // 新增用于保存用户输入的消息
    },
    methods: {
        openContactForm: function(ISBN) {
            this.selectedISBN = ISBN;  // 保存当前选中的图书ISBN
        },
        sendMessage: function() {
            // 在这里，你可以使用 AJAX 将消息发送到服务器
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
