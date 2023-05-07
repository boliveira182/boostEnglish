// const lista_trad = prompt("Digite as palavras");
// const newText = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
// const traducao = newText.split(".");
// console.log(traducao);

const buttoms = document.querySelectorAll('[buttom]');
const card = document.querySelector('.card');
const card__traduzido = document.querySelector('.card__traduzido');
const deck = document.querySelectorAll('[deck]');
const container = document.querySelector('.container');
const nivel = document.querySelectorAll('[nivel]');
const deletar = document.querySelector('[deletar]');
const criar = document.querySelector('[criar]');
const configurar = document.querySelector('[configurar]');


function carregaPaginaPalavras(nivel, deckSelecionado){
    nivelSelecionado = nivel;
    deckSelect = deckSelecionado;

    var lista = JSON.parse(localStorage.getItem('dicionario')) || [];
    const indices = JSON.parse(localStorage.getItem('indices')) || [];
    var tamanho = 0;

    if(lista.length === 0){
        lista = preencheLista();
        localStorage.setItem('dicionario', JSON.stringify(lista));
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
    preencheDadosNaTela(palavra, lista, tamanho);

}

function selecionaNivel(nivelSelecionado, indices, lista){
    indice = indices;
    if(nivelSelecionado ==="iniciante"){  
        indice = indices[0];
        lista.slice(0, indice);
    }
    if(nivelSelecionado ==="intermediario"){
        indice = indices[1];
        lista.slice(0, indice);
    }
    if(nivelSelecionado ==="avancado"){
        indice = indices[2];
    }
    return [lista, indice]; 
}

function preencheDadosNaTela(palavra, lista, tamanho){
    const mostraPalavra = document.querySelector('[palavra]');
    const mostraPalavra_trad = document.querySelector('[palavra_trad]');
    const aprendidas = JSON.parse(localStorage.getItem('conhecidas')) || [];

    if(lista[palavra][0].length > 11){
        card.style.fontSize='0.6em';
    }
    if(lista[palavra][1].length > 11){
        card__traduzido.style.fontSize='0.6em';
    }

    mostraPalavra.innerHTML = lista[palavra][0];
    mostraPalavra_trad.innerHTML = lista[palavra][1];

    palavraGerada = lista[palavra];

    const totalPalavras = document.querySelector('[restantes]');
    totalPalavras.innerHTML = tamanho;

    const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
    totalPalavrasAprenidas.innerHTML = aprendidas.length;
}


//Essa função permite a criação do banco de palavras que são mostradas aos usuários
criar.addEventListener('click', () => {
    const lista_english = prompt("Digite a lista de palavras em inglês:");
    const textEng = lista_english.replace(/(\r\n|\n|\r)/gm, ".");
    const original = textEng.split(".");

    const lista_trad = prompt("Digite a lista de palavras traduzidas:");
    const textPt = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
    const traducao = textPt.split(".");

    base = [];

    for (let index = 0; index < original.length; index++) {
        const palavraOriginal = original[index];
        const palavraTraduzida = traducao[index];

        base.push([palavraOriginal,palavraTraduzida]);
    }

    localStorage.setItem('dicionarioOriginal', JSON.stringify(base));
    localStorage.setItem('dicionario', JSON.stringify(base));
    window.location.reload();
})


//Essa função reseta os Decks e reinicia o programa
deletar.addEventListener('click', () => {
    lista = preencheLista();
    localStorage.setItem('dicionario', JSON.stringify(lista));
    localStorage.setItem('conhecidas', JSON.stringify([]));
    localStorage.setItem('configuracoes', JSON.stringify([]));
    localStorage.setItem('revisar', JSON.stringify([]));
    localStorage.setItem('indices', JSON.stringify(['1000', '3000', '10000']));
    window.location.reload();
})


//Essa função permite alterar as configurações iniciais
configurar.addEventListener('click', () => {
    inicio.style.display = "flex";
    tela.style.display = "none";
    localStorage.setItem('configuracoes', JSON.stringify(''));
    mudaMenu();
})

//Essa função permite selecionar o Deck, se é o geral (contém todas as palavras) ou se é o revisar (contém as palavras marcadas para revisão)
deck.forEach(element => {
    element.addEventListener('click', () => {
        deckSelecionado = element.attributes.value.value;
        carregaPaginaPalavras(nivelSelecionado, deckSelecionado);
    })
});

//Função que permite selecionar o nível de difículdade do programa
nivel.forEach(element => {
    element.addEventListener('click', () => {
        nivelSelecionado = element.attributes.value.value;
        carregaPaginaPalavras(nivelSelecionado, 'geral');
        mudaMenu();
    })
});

   
buttoms.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        if(evento.target.value === '+'){
            mudaFundo();
        }

        if(evento.target.attributes.value.value === 'conheco'){ 
            addicionaNaLista(palavraGerada, 'conhecidas');
            romeveDoDicionario(palavraGerada, nivelSelecionado);

            
            card.style.display = "flex";
            card__traduzido.style.display = "none";

            mudaFundo(); 
            carregaPaginaPalavras(nivelSelecionado, deckSelect);           
        } 

        if(evento.target.attributes.value.value=== 'original'){
            card.style.display = "none";
            card__traduzido.style.display = "flex";
        }
        if(evento.target.attributes.value.value=== 'traduzido'){
            card__traduzido.style.display = "none";
            card.style.display = "flex";
        }
        if(evento.target.value === 'minerar'){  
            window.open(`https://www.linguee.com.br/portugues-ingles/search?source=auto&query=${lista[palavra][0]}`, '_blank');
        }
        if(evento.target.value === 'atualizar'){ 
            card.style.display = "flex";
            card__traduzido.style.display = "none";
            carregaPaginaPalavras(nivelSelecionado, deckSelect);
        }  

        if(evento.target.attributes.class.value === 'sobrepor aparece__fundo'){ 
            mudaFundo();
        }  

        if(evento.target.attributes.value.value === 'revisar'){ 
            addicionaNaLista(palavraGerada, 'revisar');
            mudaFundo();
            carregaPaginaPalavras(nivelSelecionado, 'revisar');
        }     
    })
})


function addicionaNaLista(palavra, lista){
    var lista__atual = JSON.parse(localStorage.getItem(`${lista}`)) || [];
    lista__atual.push(palavra);
    localStorage.setItem(`${lista}`, JSON.stringify(lista__atual));
}

function romeveDoDicionario(palavra, nivel){
    var dicionario = JSON.parse(localStorage.getItem('dicionario'));
    var conhecidas = JSON.parse(localStorage.getItem('conhecidas'));
    var indices = JSON.parse(localStorage.getItem('indices'));


    const index = dicionario.indexOf(palavra);
    dicionario.splice(index, 1);
    localStorage.setItem('dicionario', JSON.stringify(dicionario));

    const indexConhecida = dicionario.indexOf(palavra);

    if(indexConhecida>=0){
        conhecidas.splice(indexConhecida, 1);
        localStorage.setItem('conhecidas', JSON.stringify(conhecidas));
    }

    if(nivel === 'iniciante'){
        indices = [indices[0]-1, indices[1]-1, indices[2]-1]
    }
    if(nivel === 'intermediario'){
        indices = [indices[0], indices[1]-1, indices[2]-1]
    }
    if(nivel === 'avancado'){
        indices = [indices[0], indices[1], indices[2]-1]
    }
    localStorage.setItem('indices', JSON.stringify(indices));
}

container.addEventListener('click', () => {
    mudaMenu();
})

function mudaMenu(){
    const nivel__select = document.querySelector('.nivel');
    container.classList.toggle("change");
    nivel__select.classList.toggle("aparece__nivel");

    const menu__lista = document.querySelectorAll('.menu__lista');
    menu__lista.forEach(element => {
        element.classList.toggle("aparece__lista");
    });
}



function mudaFundo(){
    const fundo = document.querySelector('.sobrepor');
    const botao = document.querySelector('.conhecida__simples');
    const opcoes = document.querySelector('.botoes');

    fundo.classList.toggle("aparece__fundo");
    botao.classList.toggle("aparece__botao");
    opcoes.classList.toggle("aparece__fundo");
}



 
