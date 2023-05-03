//const lista_trad = prompt("Digite as palavras");
//const newText = lista_trad.replace(/(\r\n|\n|\r)/gm, ".");
//const traducao = newText.split(".");
//console.log(traducao);

const buttoms = document.querySelectorAll('[buttom]');
const card = document.querySelector('.card');
const card__traduzido = document.querySelector('.card__traduzido');

carregaPagina();

function carregaPagina(){
    lista = JSON.parse(localStorage.getItem('dicionario')) || [];
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

    const deletar = document.querySelector('[deletar]');
    const criar = document.querySelector('[criar]');

    deletar.addEventListener('click', (evento) => {
        evento.preventDefault();

        var palavras = JSON.parse(localStorage.getItem('dicionarioOriginal'));
        localStorage.setItem('dicionario', JSON.stringify(palavras));

        localStorage.setItem('conhecidas', JSON.stringify([]));
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
}
    


buttoms.forEach((elements) => {
    elements.addEventListener('click', (evento) => {
        evento.preventDefault();

        const form = document.querySelector('.sobrepor');
        const conhecida__simples = document.querySelector('.conhecida__simples');
        const botoes = document.querySelector('.botoes');

        if(evento.target.value === '+'){
            if(form.style.display != "block"){
                form.style.display = "block";
                conhecida__simples.style.display = "none";
                botoes.style.display = "flex";
            }else{
                form.style.display = "none";
                conhecida__simples.style.display = "block";
                botoes.style.display = "none";
            }
        }

        if(evento.target.attributes.value.value === 'conheco'){ 
            lista__conhecidas.push(palavraGerada);
       
            localStorage.setItem('conhecidas', JSON.stringify(lista__conhecidas));

            index = lista.indexOf(palavraGerada);
            lista.splice(index, 1);
            
            localStorage.setItem('dicionario', JSON.stringify(lista));

            form.style.display = "none";
            conhecida__simples.style.display = "block";
            botoes.style.display = "none";

            card.style.display = "flex";
            card__traduzido.style.display = "none";
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
        if(evento.target.attributes.class.value === 'sobrepor'){ 
            form.style.display = "none";
            conhecida__simples.style.display = "block";
            botoes.style.display = "none";
        }  

        if(evento.target.attributes.value.value === 'revisar'){ 
            lista__revisar.push(palavraGerada);
            console.log(lista__revisar)
            localStorage.setItem('revisar', JSON.stringify(lista__revisar));

            form.style.display = "none";
            conhecida__simples.style.display = "block";
            botoes.style.display = "none";

            card.style.display = "flex";
            card__traduzido.style.display = "none";
            carregaPagina();
        }     
    })
})



 
 
