document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {

        init(){
            //alert('pizza loading..')
            //call pizza API
            axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                .then((result)=>{
                    //console.log(result.data);
                this.pizzas= result.data.pizzas
          })
          .then(()=>{
            return this.createCart();
          })
          .then((result)=>{
            this.cartId = result.data.cart_code;
          });
        },

        createCart(){
          ///api/pizza-cart/create
          return axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
        },

        showCart(){
          const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;

          axios
            .get(url)
            .then((result) =>{
              this.cart = result.data;
            });
        },

        message: 'let eat pizza',
        username:'',
        pizzas: [],
        cartId:'',
        cart: {total : 0},

        add(pizza){
          //to be able to add pizza to the cart, I need a cart Id..
            //alert(pizza.flavour + " : " + pizza.size)
            const params = {
              cart_code : this.cartId,
              pizza_id : pizza.id
            }

            axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
              .then(()=>{
                this.message= "pizza added to the cart"
                this.showCart();
              })
              .catch(err=>alert(err));
            //alert(pizza.id)
        }

      }
    });
})