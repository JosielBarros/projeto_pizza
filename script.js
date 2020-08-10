const c = (el)=> { return document.querySelector(el);} //Retorna o item.

/*const c = (el)=> document.querySelector(el); //A mesma coisa do de cima.*/

const cs = (el)=> document.querySelectorAll(el)//Retorna uma array com os itens que achou.""

pizzaJson.map((item, index)=>{
  let pizzaitem = c('.models .pizza-item').cloneNode(true)//Clona para a variável o que está na div 'pizza-item.

  //Não importa a ordem que colocarmos aqui, ele exibe do jeito que está no html.

  
  pizzaitem.querySelector('.pizza-item--img img').src = item.img;//Substitui no 'scr' e não mais no innerHMTL
  pizzaitem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//tofixed(2) define duas casas depois da vígula.
  pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaitem.querySelector('a').addEventListener('click', (e)=>{
    e.preventDefault();//Previne contra evento padrão.

    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex';//Torna visível ao usuário. Pois está 'none' de padrão.
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;//Após 200 milisegundos ele mostra 'opacity 1'.
    }, 200);//Tempo em milisegundos.
  })

  c('.pizza-area').append(pizzaitem);//Adiciona 'pizzaitem' no html de ' pizza-area'

});