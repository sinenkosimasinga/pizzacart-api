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
        },
        message: 'let eat pizza',
        pizzas: [],
        add(pizza){
            alert(JSON.stringify(pizza))
        }

      }
    });
})