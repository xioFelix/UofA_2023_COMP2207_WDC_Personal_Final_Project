var homepage = new Vue({
    el: "#products",
    data: {
        products: [],
        selectedISBN: '',  // 用于保存当前选中的图书ISBN
        message: '',  // 用于保存用户输入的消息
        buyer: 'Buyer1',  // 硬编码的买家信息
        seller: '',  // 卖家信息，将从产品数据中获取
    },
    methods: {
        openContactForm: function(product) {
            this.selectedISBN = product.ISBN;  // 保存当前选中的图书ISBN
            this.seller = product.seller;  // 从产品数据中获取卖家信息
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
                    message: this.message,
                    buyer: this.buyer,
                    seller: this.seller
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
            this.seller = '';
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
