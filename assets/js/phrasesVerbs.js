

function carregaPaginaPhrasal(nivel, deckSelecionado){
    nivelSelecionado = nivel;
    deckSelect = deckSelecionado;

    var lista = JSON.parse(localStorage.getItem('dicionario__phrasal')) || [];
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
    const significado = document.querySelector('[significado]');
    const aprendidas__phrasal = JSON.parse(localStorage.getItem('conhecidas__phrasal')) || [];

    // if(lista[palavra][0].length > 11){
    //     card.style.fontSize='0.6em';
    // }

    mostraPalavra.innerHTML = lista[palavra][0];
    significado.innerHTML = lista[palavra][1];
    palavraGerada = lista[palavra];

    // const totalPalavras = document.querySelector('[restantes]');
    // totalPalavras.innerHTML = tamanho;

    // const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
    // totalPalavrasAprenidas.innerHTML = aprendidas.length;
}


// Selecione o botão e a div
var meuBotao = document.querySelectorAll('[botao__phrasal]');
var minhaDiv = document.querySelector('[conteudo]');


meuBotao.forEach(element => {
    // Adicione um evento de clique ao botão
    element.addEventListener("click", function() {
        // Se a div estiver oculta, mostre-a com animação
        if (minhaDiv.style.height === "0px") {
            minhaDiv.style.height = "100px"; // Defina a altura desejada da div
        }
        // Se a div estiver visível, oculte-a com animação
        else {
            minhaDiv.style.height = "0";
        }
    });
});
