const iniciar = document.querySelector('[iniciar]');
configuraInicio();


//funão que irá mostrar as caixas de seleção 
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
 
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            verificaSelect();
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


//função que verifica se todas as caixas de seleção foram preenchidas 
function verificaSelect(){
    const qtd = document.querySelectorAll('.same-as-selected');
    if(qtd.length >1){
        iniciar.classList.remove('disabled');
    }
}


//função que vai fazer as configurações iniciais do programa 
function configuraInicio(){
    const inicio = document.querySelector('.inicio');
    const words = document.querySelector('.palavras');
    const phrasal = document.querySelector('.phrasal');

    //verifica se as configurações iniciais foram setadas no local storage 
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes')) || [];

    //se as configurações inicias não foram setadas, impede a exibição das demais telas, além da inicial 
    if(configuracoes.length != 0){
        habilitaTela(configuracoes[1]);
        setaVariaveis(configuracoes);

    }else{
        habilitaTela('inicio');
        iniciar.addEventListener('click', () => {
            const nivel__selected = document.querySelector('.seletor__nivel');
            const deck__selected = document.querySelector('.seletor__deck');
            const selecionados = [];
            selecionados.push(nivel__selected.value, deck__selected.value)
            habilitaTela(deck__selected.value);
            setaVariaveis(selecionados);
        })
        
    }
}

const deck = document.querySelectorAll('[deck]');
//Essa função permite selecionar o Deck, se é o geral (contém todas as palavras) ou se é o revisar (contém as palavras marcadas para revisão)
deck.forEach(element => {
  element.addEventListener('click', () => {
    deckSelecionado = element.attributes.value.value;

    if(page === 'palavras'){
        carregaPaginaPalavras(nivelSelecionado, deckSelecionado);
    }else{
        carregaPaginaPhrasal(nivelSelecionado, deckSelecionado);
    }    
  })
});


function setaVariaveis(configuracoes){
    localStorage.setItem('configuracoes', JSON.stringify(configuracoes)); 
    carregaPagina(configuracoes);  
}


function habilitaTela(telaPassada){
    const telas = document.querySelectorAll('[tela]');
    const tela = document.querySelector(`.${telaPassada}`);

    telas.forEach(element => {
        if(telaPassada != element.attributes.value.value){
            element.style.display = "none";
        }else{
            if(element.attributes.value.value === 'inicio'){
                tela.style.display = "flex";
            }else{
                tela.style.display = "block";
            }
        }
    });
}

function carregaPagina(configuracoes){
  if(configuracoes[1] === "palavras"){
    page = 'palavras'
    carregaPaginaPalavras(configuracoes[0], 'geral');
  }
  if(configuracoes[1] === "phrasal"){
    page = 'phrasal'
    carregaPaginaPhrasal(configuracoes[0], 'phrasal');
}
}

function mudaFundo(pagina){
  if(pagina ==='palavras'){
      const fundo = document.querySelector('.sobrepor');
      const botao = document.querySelector('.conhecida__simples');
      const opcoes = document.querySelector('[buttomPalavra]');

      fundo.classList.toggle("aparece__fundo");
      botao.classList.toggle("aparece__botao");
      opcoes.classList.toggle("aparece__fundo");
    }
    if(pagina ==='phrasal'){
      const fundo = document.querySelector('.sobrepor');
      const botao = document.querySelector('.conhecida__simples__phrasal');
      const opcoes = document.querySelector('[buttomPhrasal]');

      fundo.classList.toggle("aparece__fundo");
      botao.classList.toggle("aparece__botao");
      opcoes.classList.toggle("aparece__fundo");
    }
    if(pagina ==='menu' ){
      const fundo = document.querySelector('.sobrepor');
      fundo.classList.toggle("aparece__fundo");
    }

}

function modal(){
  // Cria o elemento de modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Atenção!</h2>
      <p class="p__modal">Não há itens a serem revisados.</p>
      <button class="modal-close-btn">Fechar</button>
    </div>
  `;

  // Adiciona a modal ao corpo da página
  document.body.appendChild(modal);

  
  // Adiciona um atraso de 100ms antes de adicionar as classes de animação
  setTimeout(() => {
    modal.classList.add('modal-fade-in');
  }, 100);

  // Seleciona o botão de fechar a modal
  const closeButton = modal.querySelector('.modal-close-btn');

  // Adiciona um ouvinte de eventos para fechar a modal quando o botão é clicado
  closeButton.addEventListener('click', () => {
    modal.classList.remove('modal-fade-in');
    setTimeout(() => {
      modal.remove();
    }, 500);
  });
}

const container = document.querySelector('.container');
container.addEventListener('click', () => {
    mudaMenu();
})

function mudaMenu(){
    const bars = document.querySelectorAll('.bar');
    container.classList.toggle("change");

    bars.forEach(element => {
      element.classList.toggle("bar__color");
    });
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu-ativo'); // Alterna a classe para ativar a animação
    page ="menu";
    mudaFundo('menu');
}
