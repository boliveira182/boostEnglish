//const lista_trad = prompt("Digite as palavras");
//const newText = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
//const traducao = newText.split(".");
//console.log(traducao);

var lista = JSON.parse(localStorage.getItem('dicionario')) || [];
const lista__conhecidas = JSON.parse(localStorage.getItem('conhecidas')) || [];
const buttoms = document.querySelectorAll('[buttom]');

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
            window.open(`https://www.linguee.com.br/portugues-ingles/search?source=auto&query=${palavraGerada}`, '_blank');
        }else{
            window.location.reload();
        }
        
    })
})


 
 
 
