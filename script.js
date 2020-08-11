let modalqt = 1;

const c = (el)=> { return document.querySelector(el);} //Retorna o item.

/*const c = (el)=> document.querySelector(el); //A mesma coisa do de cima.*/

const cs = (el)=> document.querySelectorAll(el)//Retorna uma array com os itens que achou.""

pizzaJson.map((item, index)=>{
  let pizzaitem = c('.models .pizza-item').cloneNode(true)//Clona para a variável o que está na div 'pizza-item.

  //Não importa a ordem que colocarmos aqui, ele exibe do jeito que está no html.

  pizzaitem.setAttribute('data-key', index);//Adicionando um atributo para cada pizza. O index chamado 'data-key'.
  pizzaitem.querySelector('.pizza-item--img img').src = item.img;//Substitui no 'scr' e não mais no innerHMTL
  pizzaitem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//tofixed(2) define duas casas depois da vígula.
  pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaitem.querySelector('a').addEventListener('click', (e)=>{//São todos os eventos que ocorrerão ao clicar no imagem da pizza.
    e.preventDefault();//Previne contra evento padrão.
    
    //Criando uma varável que vai receber o index de cada pizza.
    //Estamos buscando um elemento anterior o 'e' ou 'a' ao usar o target. Depois pegamos o atributo 'data-key' com o getAttribute.
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalqt = 1;

    c('.pizzaBig img').src = pizzaJson[key].img;
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    c('.pizzaInfo--size.selected').classList.remove('selected');//Estamos removendo a seleção do tamanho da pizza. Toda vez que voltar.
    
    cs('.pizzaInfo--size').forEach((size, sizeindex)=>{//Ele está pecorrendo todos os elementos de 'pizzaInfo--size'.
      if (sizeindex == 2) {//Está selecionando o tamanho grande de pizza. Pois o index dele é 2.
        size.classList.add('selected');//Está adicionando a classe 'selected' no index 2.
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeindex];//Está substituindo o 'span' pelo tamnho da pizza. No caso sizes[sizeindex].
    });

    c('.pizzaInfo--qt').innerHTML = modalqt;




    c('.pizzaWindowArea').style.opacity = 0;//Transparente.
    c('.pizzaWindowArea').style.display = 'flex';//Torna visível ao usuário. Pois está 'none' de padrão.
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;//Após 200 milisegundos ele mostra 'opacity 1'.
    }, 200);//Tempo em milisegundos.
  })

  c('.pizza-area').append(pizzaitem);//Adiciona 'pizzaitem' no html de ' pizza-area'

});