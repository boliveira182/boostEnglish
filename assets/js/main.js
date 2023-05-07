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
    habilitaTela('inicio');


    //se as configurações inicias não foram setadas, impede a exibição das demais telas, além da inicial 
    if(configuracoes.length != 0){
        habilitaTela(configuracoes[1]);
        setaVariaveis(configuracoes);

    }else{
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
      carregaPaginaPalavras(configuracoes[0], 'geral');
  }
}
