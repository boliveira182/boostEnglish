// const lista_trad = prompt("Digite as palavras");
// const newText = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
// const traducao = newText.split(".");
// console.log(traducao);

const buttoms = document.querySelectorAll('[buttom]');
const geral = document.querySelector('[geral]');
const revisar = document.querySelector('[revisar]');
const card = document.querySelector('.card');
const card__traduzido = document.querySelector('.card__traduzido');
const nivel__select = document.querySelector('.nivel');
const deck = document.querySelectorAll('[deck]');
const container = document.querySelector('.container');
const menu__lista = document.querySelectorAll('.menu__lista');
const nivel = document.querySelectorAll('[nivel]');
const deletar = document.querySelector('[deletar]');
const criar = document.querySelector('[criar]');

setaVariaveis();

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
    localStorage.setItem('indices', JSON.stringify(['1000', '3000', '10000']));
    window.location.reload();
})


//Essa função permite selecionar o Deck, se é o geral (contém todas as palavras) ou se é o revisar (contém as palavras marcadas para revisão)
deck.forEach(element => {
    element.addEventListener('click', () => {
        deckSelecionado = element.attributes.value.value;
        carregaPagina();
    })
});

//Função que permite selecionar o nível de difículdade do programa
nivel.forEach(element => {
    element.addEventListener('click', () => {
        nivelSelecionado = element.attributes.value.value;
        carregaPagina();
        mudaMenu();
    })
});



carregaPagina();
function carregaPagina(){
    tamanho = JSON.parse(localStorage.getItem('indices')) || [];
    revisao = 'nao';

    if(deckSelecionado === 'geral'){
        lista__completa = JSON.parse(localStorage.getItem('dicionario')) || [];
        lista = lista__completa;
        revisao = "nao"; 
    }else{
        lista = JSON.parse(localStorage.getItem('revisar')) || [];
        lista__revisao = lista.length;
        revisao = "sim";
    }
    
    if(nivelSelecionado ==="iniciante"){  
        itens = tamanho[0];
        lista = lista.slice(0, itens);
        indice = [tamanho[0]-1, tamanho[1]-1, tamanho[2]-1]
    }
    if(nivelSelecionado ==="intermediario"){
        itens = tamanho[1];
        lista = lista.slice(0, itens);
        indice = [tamanho[0], tamanho[1]-1, tamanho[2]-1]
    }
    if(nivelSelecionado ==="avancado"){
        itens = tamanho[2];
        indice = [tamanho[0], tamanho[1], tamanho[2]-1]
    }

    lista__conhecidas = JSON.parse(localStorage.getItem('conhecidas')) || [];
    lista__revisar = JSON.parse(localStorage.getItem('revisar')) || [];
    
    if(lista.length === 0){
        lista = preencheLista();
        localStorage.setItem('dicionario', JSON.stringify(lista));
    }

    palavra = Math.floor(Math.random() * lista.length);
    const mostraPalavra = document.querySelector('[palavra]');

    if(lista[palavra][0].length > 11){
        card.style.fontSize='0.6em';
    }
    mostraPalavra.innerHTML = lista[palavra][0];

    const mostraPalavra_trad = document.querySelector('[palavra_trad]');
    if(lista[palavra][1].length > 11){
        card__traduzido.style.fontSize='0.6em';
    }
    mostraPalavra_trad.innerHTML = lista[palavra][1];

    palavraGerada = lista[palavra];

    const totalPalavras = document.querySelector('[total]');

    if(revisao ==='sim'){
        totalPalavras.innerHTML = lista__revisao;
    }else{
        totalPalavras.innerHTML = lista.length;
    }
    
    const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
    totalPalavrasAprenidas.innerHTML = lista__conhecidas.length;
}
    
buttoms.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        if(evento.target.value === '+'){
            mudaFundo();
        }

        if(evento.target.attributes.value.value === 'conheco'){ 
            lista__conhecidas.push(palavraGerada);
       
            localStorage.setItem('conhecidas', JSON.stringify(lista__conhecidas));

            index = lista__completa.indexOf(palavraGerada);
            lista__completa.splice(index, 1);
            
            localStorage.setItem('dicionario', JSON.stringify(lista__completa));

            localStorage.setItem('indices', JSON.stringify(indice));

            if(revisao ==="sim"){
                index = lista__revisar.indexOf(palavraGerada);
                lista__revisar.splice(index, 1);
                localStorage.setItem('revisar', JSON.stringify(lista__revisar));
            }

            card.style.display = "flex";
            card__traduzido.style.display = "none";

            mudaFundo(); 
            carregaPagina();           
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
            carregaPagina();
        }  

        if(evento.target.attributes.class.value === 'sobrepor aparece__fundo'){ 
            mudaFundo();
        }  

        if(evento.target.attributes.value.value === 'revisar'){ 
            lista__revisar.push(palavraGerada);
            console.log(lista__revisar)
            localStorage.setItem('revisar', JSON.stringify(lista__revisar));
            mudaFundo();
            carregaPagina();
        }     
    })
})


container.addEventListener('click', () => {
    mudaMenu();
})

function mudaMenu(){
    container.classList.toggle("change");
    nivel__select.classList.toggle("aparece__nivel");

    menu__lista.forEach(element => {
        element.classList.toggle("aparece__lista");
    });
}

const fundo = document.querySelector('.sobrepor');
const botao = document.querySelector('.conhecida__simples');
const opcoes = document.querySelector('.botoes');

function mudaFundo(){
    fundo.classList.toggle("aparece__fundo");
    botao.classList.toggle("aparece__botao");
    opcoes.classList.toggle("aparece__fundo");
}

function setaVariaveis(){
    deckSelecionado = 'geral';
    nivelSelecionado = 'iniciante';
}


 
