const app = new Vue({
    el: '#app',
    data: {
        mensagem: "Teste",
        produtos: [],
        produto: false
    },
    filters: {
        numeroPreco(value){
            return value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        }
    },
    methods: {
        fetchProdutos(){
            fetch("./api/produtos.json")
                .then( r => r.json())
                .then(r => {
                    this.produtos = r;
                });
        },

        _fetchProduto(id){
            fetch(`./api/produtos/${id}/dados.json`)
                .then( r => r.json())
                .then(r => {
                    this.produto = r;
                });
        },
        abrirModal(id){
            this._fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        fecharModal({target, currentTarget}){
            if(target === currentTarget)
                this.produto = false;
        }

    },
    created(){
        this.fetchProdutos();
    }
})