const app = new Vue({
    el: '#app',
    data: {
        mensagem: "Teste",
        produtos: [],
    },
    methods: {
        fetchProdutos(){
            fetch("./api/produtos.json")
                .then( r => r.json())
                .then(r => {
                    this.produtos = r;
                });
        }
    },
    created(){
        this.fetchProdutos();
    }
})