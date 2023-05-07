//para funcionar corretamente, tem que copiar o texto e retirar pontos nos locais corretos 

const textoRecebido = prompt("Digite a lista");

// a função abaixo elimina a quebra de linha 
function replaceLineBreaksWithSpace(text) {
    return text.replace(/(\r\n|\n|\r)/gm, ' ');
  }
  
const textoComEspacos = replaceLineBreaksWithSpace(textoRecebido);

//depois obtém a lista, separada por (.)
texto_traduzido = obterLIsta(textoComEspacos);

//retira espaço inicial caso haja 
stringSemEspaco = retiraEspacoInicial(texto_traduzido);

//retira elementos vazios, caso hajam 
listaSemElementoVazio = retiraVazio(stringSemEspaco);


// cria uma lista com os índices de letras maiúsculas
indicesComLetraMaiuscula = [];
listaSemElementoVazio.forEach(element => {
    indicesComLetraMaiuscula.push(findUppercaseIndices(element));
   
    function findUppercaseIndices(strings) {
        const indices = [];
       
        for (let i = 0; i < strings.length; i++) {
            const string = strings[i];
            
            if (isUpperCase(string)) {
                indices.push(i);
            }
        }

        return indices;
    }
});


//imprime na tela a lista organizada [phrasel verb, significado, exemplo] 
console.log(organizaLista(listaSemElementoVazio,indicesComLetraMaiuscula)); // [1, 3]



function obterLIsta(listaSemElementoVazio){
    const traducao = listaSemElementoVazio.split(".");
    return traducao;
}

function isUpperCase(str) {
    return str.length === 1 && str.match(/[A-Z]/) && str === str.toUpperCase();
}


function retiraEspacoInicial(textoComEspacos){
    const listaSemEspacoInicial = []
    textoComEspacos.forEach(element => {
        listaSemEspacoInicial.push(element.trimStart());
    });
    return listaSemEspacoInicial; 
}

function retiraVazio(stringSemEspaco){
    const listaSemVazio = []
    stringSemEspaco.forEach(element => {
        if(element != ""){
            listaSemVazio.push(element);
        }
    });
    return listaSemVazio; 
}

function organizaLista(listaSemElementoVazio,indicesComLetraMaiuscula){
    listaFinal = [];

    console.log(listaSemElementoVazio);
    for (let index = 0; index < listaSemElementoVazio.length; index++) {
        const element = listaSemElementoVazio[index];
        const segIndex = indicesComLetraMaiuscula[1];
        listaFinal.push([element.substring(indicesComLetraMaiuscula[0], indicesComLetraMaiuscula[index][1]-1), element.substring(indicesComLetraMaiuscula[index][1], element.length), listaSemElementoVazio[index+1]]);
        index++;
    }
    return listaFinal;

}






// listaTempo = [];

// mudaLista(minhaLista);
// function mudaLista(minhaLista){
//     minhaLista.forEach(element => {

//         indice = minhaLista.indexOf(element);
//         var resto = indice % 2;
//         if (resto == 0) {
//             // console.log(n + " par");
//             listaTempo.push(element);
//         } else {
           
//         }
//     });
//     console.log(listaTempo);
// }