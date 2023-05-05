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


deckSelecionado = 'geral';
nivelSelecionado = 'iniciante';

carregaPagina();

deck.forEach(element => {
    element.addEventListener('click', () => {
        deckSelecionado = element.attributes.value.value;
        carregaPagina();
    })
});

nivel.forEach(element => {
    element.addEventListener('click', () => {
        nivelSelecionado = element.attributes.value.value;
        carregaPagina();
        mudaMenu();
    })
});


function carregaPagina(){
    if(deckSelecionado === 'geral'){
        lista = JSON.parse(localStorage.getItem('dicionario')) || [];
    }else{
        lista = JSON.parse(localStorage.getItem('revisar')) || [];
    }
    
    if(nivelSelecionado ==="iniciante"){
        lista = lista.slice(0, 1000);
    }
    if(nivelSelecionado ==="intermediario"){
        lista = lista.slice(0, 3000);
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
    totalPalavras.innerHTML = lista.length;

    const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
    totalPalavrasAprenidas.innerHTML = lista__conhecidas.length;
}
    
const deletar = document.querySelector('[deletar]');
const criar = document.querySelector('[criar]');

deletar.addEventListener('click', () => {
    var palavras = JSON.parse(localStorage.getItem('dicionarioOriginal'));
    localStorage.setItem('dicionario', JSON.stringify(palavras));
    localStorage.setItem('conhecidas', JSON.stringify([]));
    mudaMenu();
    carregaPagina();
})


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


buttoms.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        if(evento.target.value === '+'){
            mudaFundo();
        }

        if(evento.target.attributes.value.value === 'conheco'){ 
            lista__conhecidas.push(palavraGerada);
       
            localStorage.setItem('conhecidas', JSON.stringify(lista__conhecidas));

            index = lista.indexOf(palavraGerada);
            lista.splice(index, 1);
            
            localStorage.setItem('dicionario', JSON.stringify(lista));

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



 
