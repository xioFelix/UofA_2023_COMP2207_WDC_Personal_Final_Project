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

var dragElement = document.getElementById("floating-panel");

dragElement.onmousedown = function(event) {
  // 在 mousedown 事件中，记录下鼠标的初始位置
  var startX = event.clientX;
  var startY = event.clientY;

  var rect = dragElement.getBoundingClientRect();
  // 记录下元素的初始位置
  var startLeft = rect.left;
  var startTop = rect.top;

  function onMouseMove(event) {
    // 在 mousemove 事件中，计算鼠标移动的距离，并改变元素的位置
    var shiftX = event.clientX - startX;
    var shiftY = event.clientY - startY;

    dragElement.style.left = startLeft + shiftX + 'px';
    dragElement.style.top = startTop + shiftY + 'px';
  }

  // 在 mousedown 事件中，添加 mousemove 和 mouseup 事件监听器
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', function() {
    // 在 mouseup 事件中，移除 mousemove 和 mouseup 事件监听器
    document.removeEventListener('mousemove', onMouseMove);
  });

  // 阻止默认事件，避免选中 dragElement 内的文本时发生拖动
  event.preventDefault();
};
