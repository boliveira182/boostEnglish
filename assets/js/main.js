//const lista_trad = prompt("Digite as palavras");
//const newText = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
//const traducao = newText.split(".");
//console.log(traducao);

var lista = JSON.parse(localStorage.getItem('dicionario')) || [];
const lista__conhecidas = JSON.parse(localStorage.getItem('conhecidas')) || [];
const buttoms = document.querySelectorAll('[buttom]');
const botao__original = document.querySelector('.original');
const botao__traducao = document.querySelector('.desconhecida');

if(lista.length === 0){
    lista = preencheLista();
    localStorage.setItem('dicionario', JSON.stringify(lista));
}

const palavra = Math.floor(Math.random() * lista.length);

const mostraPalavra = document.querySelector('[palavra]');
mostraPalavra.innerHTML = lista[palavra][0];

const palavraGerada = lista[palavra];

const totalPalavras = document.querySelector('[total]');
totalPalavras.innerHTML = lista.length;

const totalPalavrasAprenidas = document.querySelector('[aprendidas]');
totalPalavrasAprenidas.innerHTML = lista__conhecidas.length;

buttoms.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        if(evento.target.value === 'conheco'){
            lista__conhecidas.push(palavraGerada);
            localStorage.setItem('conhecidas', JSON.stringify(lista__conhecidas));

            index = lista.indexOf(palavraGerada);
            lista.splice(index, 1);
            
            localStorage.setItem('dicionario', JSON.stringify(lista));

            window.location.reload();

        }
        if(evento.target.value === 'desconheco'){
            mostraPalavra.innerHTML = lista[palavra][1];
            botao__original.style.display = "inline";
            botao__traducao.style.display = "none";
        }
        if(evento.target.value === 'original'){
            mostraPalavra.innerHTML = lista[palavra][0];
            botao__original.style.display = "none";
            botao__traducao.style.display = "inline";
        }
        if(evento.target.value === 'minerar'){  
            window.open(`https://www.linguee.com.br/portugues-ingles/search?source=auto&query=${lista[palavra][0]}`, '_blank');
        }
        if(evento.target.value === 'atualizar'){ 
            window.location.reload();
        }
        
    })
})


 
 
 
