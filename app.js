const app = new Vue({
    el: '#app',
    data: {
        mensagem: "Teste",
        produtos: [],
        produto: false,
        carrinho: [],
        carrinhoAtivo: false,
        mensagemAlerta: 'Item adicionado ao carrinho!!',
        alertaAtivo: false
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
        },
        clickForaCarrinho({target, currentTarget}){
            if(target === currentTarget)
                this.carrinhoAtivo = false;
        },
        adicionarItem(){
            this.produto.estoque--;
            const {id, nome, preco} = this.produto;
            this.carrinho.push({
                id, nome, preco
            });
            this.alerta(`${nome} adicionado ao carrinho`);
        },
        removerItem(index){
            this.carrinho.splice(index,1);
        },
        checkLocalStorage(){
            if(window.localStorage.carrinho){
                this.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        },
        alerta(mensagem){
            this.mensagemAlerta = mensagem;
            this.alertaAtivo = true;
            setTimeout(() => this.alertaAtivo = false, 1500);
        },
        router(){
            const hashMensage = document.location.hash;
            if(hashMensage)
                this._fetchProduto(hashMensage.replace("#", ""));
        }

    },
    computed: {
        carrinhoTotal(){
            let total = 0;
            if(this.carrinho.length)
                this.carrinho.forEach(item => {
                    total += item.preco;
                })
            return total;
        }
    },
    created(){
        this.fetchProdutos();
        this.router();
        this.checkLocalStorage();
    },
    watch: {
        carrinho(){
            window.localStorage.carrinho = JSON.stringify(this.carrinho); 
        },
        produto(){
            document.title = this.produto.nome || "Techno";
            const hashMensage = this.produto.id || "";
            history.pushState(null,null, `#${hashMensage}`);
        }
    }
})