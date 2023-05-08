

function carregaPaginaPhrasal(nivel, deckSelecionado){
    nivelSelecionado = nivel;
    deckSelect = deckSelecionado;

    lista = JSON.parse(localStorage.getItem('dicionario__phrasal')) || [];
    const indices = JSON.parse(localStorage.getItem('indices__phrasal')) || [];
    var tamanho = 0;

    if(lista.length === 0){
        lista = geraPhrasesVerbs();
        localStorage.setItem('dicionario__phrasal', JSON.stringify(lista));
    }

    if(deckSelect == 'revisar'){
        lista = JSON.parse(localStorage.getItem('revisar')) || [];
        tamanho = lista.length;
    }else{
        resultado = selecionaNivel(nivelSelecionado, indices, lista);
        lista = resultado[0];
        tamanho =  resultado[1];
    }

    palavra = Math.floor(Math.random() * lista.length);

    preencheDadosNaTelaPhrasal(palavra, lista, tamanho);

}

function preencheDadosNaTelaPhrasal(palavra, lista, tamanho){
    const mostraPalavra = document.querySelector('[phrasal]');
    const aprendidas__phrasal = JSON.parse(localStorage.getItem('conhecidas__phrasal')) || [];

    if(lista[palavra][0].length > 11){
        card.style.fontSize='0.6em';
    }
    preencheConteudo(mostraPalavra, lista[palavra][0]);
    // preencheConteudo(mostraPalavra, lista[palavra][0]);
    // const totalPalavras = document.querySelector('[restantes]');
    // totalPalavras.innerHTML = tamanho;

    // const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
    // totalPalavrasAprenidas.innerHTML = aprendidas.length;
}

function preencheConteudo(local, conteudo){
    local.innerHTML = conteudo;
}


// Selecione o botão e a div e campo significado
var meuBotao = document.querySelectorAll('[botao__phrasal]');
var significado = document.querySelectorAll('[significado]');


meuBotao.forEach(element => {
    // Adicione um evento de clique ao botão
    element.addEventListener("click", function() {
        const conteudo = element.attributes.value.value;
        var valor = [];
        var local =";"
        if(conteudo === 'significado'){
            valor = lista[palavra][1]
            local = document.querySelector(`[${conteudo}]`);
        }
        if(conteudo === 'exemplo'){
            valor = lista[palavra][2];
            local = document.querySelector(`[${conteudo}]`);
        }
        if(conteudo === 'traducao'){
            valor = lista[palavra][2];
            local = document.querySelector(`[${conteudo}]`);
        }
        console.log(valor);
        preencheConteudo(local, valor);

        // Se a div estiver oculta, mostre-a com animação
        if (local.style.height === "0px") {
            local.style.height = "100px"; // Defina a altura desejada da div
        }
        // Se a div estiver visível, oculte-a com animação
        else {
            local.style.height = "0";
        }
    });
});
