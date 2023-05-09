

function carregaPaginaPhrasal(nivel, deckSelecionado){
    nivelSelecionado = nivel;
    page = 'phrasal';
    deckSelect = deckSelecionado;

    const telas = document.querySelectorAll('[significado]');
    limpaTelas(telas);

    lista = JSON.parse(localStorage.getItem('dicionario__phrasal')) || [];
    const indices = JSON.parse(localStorage.getItem('indices__phrasal')) || [];
    var tamanho = 0;

    if(lista.length === 0){
        lista = geraPhrasesVerbs();
        localStorage.setItem('dicionario__phrasal', JSON.stringify(lista));
    }

    if(deckSelect == 'revisar'){
        lista = JSON.parse(localStorage.getItem('revisar__phrasal')) || [];
        tamanho = lista.length;
    }else{
        resultado = selecionaNivel(nivelSelecionado, indices, lista);
        lista = resultado[0];
        tamanho =  resultado[1];
    }

    palavra = Math.floor(Math.random() * lista.length);

    preencheDadosNaTelaPhrasal(palavra, lista, tamanho);

}

function limpaTelas(telas){
    telas.forEach(element => {
        element.classList.add('zeraAltura');
        element.classList.remove('aumentaAltura');
    });
}

//função responsável por preencher os dados na tela 
function preencheDadosNaTelaPhrasal(palavra, lista, tamanho){
    const mostraPalavra = document.querySelector('[phrasal]');
    const mostraRestantes = document.querySelector('[restantes__phrasal]');
    const aprendidas__phrasal = document.querySelector('[aprendidas__phrasal]');
    const conhecidas__phrasal = JSON.parse(localStorage.getItem('conhecidas__phrasal')) || [];

    if(lista != 0){
        if(lista[palavra][0].length > 11){
            card.style.fontSize='0.6em';
        }

        mostraPalavra.innerHTML = lista[palavra][0];

        palavraGerada = lista[palavra][0];

        mostraRestantes.innerHTML = lista.length;
        aprendidas__phrasal.innerHTML = conhecidas__phrasal.length;
    }else{
        modal();
    }
}



// Selecione o botão e a div e campo significado
var meuBotao = document.querySelectorAll('[botao__phrasal]');
var significado = document.querySelectorAll('[significado]');


//funçõa que escuta o click das opções disponíveis na tela 
meuBotao.forEach(element => {
    // Adicione um evento de clique ao botão
    element.addEventListener("click", function() {  
        const conteudo = element.attributes.value.value;
        var result = verificaDiv(conteudo);
        const local = result[0];
        const valor = result[1]
        local.innerHTML = valor;
        mudaDiv(local);
    });
});

//funcção que verificaq qual div foi acionada 
function verificaDiv(conteudo){
    const cont = conteudo;
    var local = '';
    var valor ='';
    if(cont === 'significado'){
        valor = lista[palavra][1]
        local = document.querySelector(`[${cont}]`);
    }
    if(cont === 'exemplo'){
        valor = lista[palavra][2];
        local = document.querySelector(`[${cont}]`);
    }
    if(cont === 'traducao'){
        valor = lista[palavra][2];
        local = document.querySelector(`[${cont}]`);
    }
    return [local, valor];
}

//função que exibe ou remove a div selecionada 
function mudaDiv(local){
    // Verifica se a classe existe no elemento HTML
    if (local.classList.contains('zeraAltura')) {
        // Se a classe existir, remove-a do elemento HTML
        local.classList.remove('zeraAltura');
        local.classList.add('aumentaAltura');
    } else {
        // Se a classe não existir, adiciona-a ao elemento HTML
        local.classList.add('zeraAltura');
        local.classList.remove('aumentaAltura');
    }
}

const buttomsPhrasal = document.querySelectorAll('[buttom]');
//função que escuta o click nos botões na tela e executa as funções correspondentes
buttomsPhrasal.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        if(evento.target.value === 'phrasal+'){
                mudaFundo('phrasal');
        }

        if(evento.target.attributes.value.value === 'conheco__phrasal'){ 
            addicionaNaLista(palavraGerada, 'conhecidas__phrasal');
            romeveDoDicionario(palavraGerada, nivelSelecionado, 'dicionario__phrasal');

            mudaFundo('phrasal');
            carregaPaginaPhrasal(nivelSelecionado, deckSelect);           
        } 

        if(evento.target.value === 'minerar__phrasal'){  
            window.open(`https://www.linguee.com.br/portugues-ingles/search?source=auto&query=${lista[palavra][0]}`, '_blank');
        }
        if(evento.target.value === 'atualizar__phrasal'){ 
            carregaPaginaPhrasal(nivelSelecionado, deckSelect);
        }  

        if(evento.target.attributes.value.value === 'revisar__phrasal'){ 
            addicionaNaLista(palavraGerada, 'revisar__phrasal');
            mudaFundo('phrasal');
            carregaPaginaPhrasal(nivelSelecionado, deckSelect);
        }     
    })
})
