let modalqt = 1;
let cart = [];
let modalkey = 0;

const c = (el)=> { return document.querySelector(el);} //Retorna o item.

/*const c = (el)=> document.querySelector(el); //A mesma coisa do de cima.*/

const cs = (el)=> document.querySelectorAll(el)//Retorna uma array com os itens que achou. Usado para executar em mais de um item.

//ESTAMOS MAPEANDO AS DIFERENTES PIZZAS QUE ESTÃO NO PIZZAJSON
//DENTRO DESSE BLOCO DE CÓDIGO VAI TUDO SOBRE AS INFORMAÇÕES DAS PIZZAS TANTO NA TELA DE ESCOLHA DE SABOR, QUANDO NA ESCOLHA DE QUANTIDADES
pizzaJson.map((item, index)=>{
  let pizzaitem = c('.models .pizza-item').cloneNode(true)//Clona para a variável o que está na div 'pizza-item.

  //Não importa a ordem que colocarmos aqui, ele exibe do jeito que está no html.
  pizzaitem.setAttribute('data-key', index);//Adicionando um atributo para cada pizza. O index chamado 'data-key'.
  pizzaitem.querySelector('.pizza-item--img img').src = item.img;//Substitui no 'scr' e não mais no innerHMTL
  pizzaitem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;//tofixed(2) define duas casas depois da vígula.
  pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description;

  //EVENTO DE CLICK PARA ABRIR O MODAL
  pizzaitem.querySelector('a').addEventListener('click', (e)=>{//São todos os eventos que ocorrerão ao clicar no imagem da pizza.
    e.preventDefault();//Previne contra evento padrão.
    
    //Criando uma varável que vai receber o index de cada pizza.
    //Estamos buscando um elemento anterior o 'e' ou 'a' ao usar o target. Depois pegamos o atributo 'data-key' com o getAttribute.
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalqt = 1;//Sempre quando abrir o modal de ecolha de pizzas, ele reseta a quantidade de pizza para 1.
    modalkey = key;

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

    c('.pizzaInfo--qt').innerHTML = modalqt;//Substituindo a quantidade de pizza por uma variável.

    c('.pizzaWindowArea').style.opacity = 0;//Transparente.
    c('.pizzaWindowArea').style.display = 'flex';//Torna visível ao usuário. Pois está 'none' de padrão.
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;//Após 200 milisegundos ele mostra 'opacity 1'.
    }, 200);//Tempo em milisegundos.
  })

  c('.pizza-area').append(pizzaitem);//Adiciona 'pizzaitem' no html de ' pizza-area'

});

//EVENTOS DO MODAL

function closemodal (){//Função para sumir o modal da tela.
  c('.pizzaWindowArea').style.opacity = 0;//Para sumir tem que ter opacity 0. Ele fica tranparente. 
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';//Depois de meio segundo ele some de vez da tela.
  }, 500);//Meio segundo.
};

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{//Ele executa nos dois elementos.
  item.addEventListener('click', closemodal);//Ao clicar nos elementos ele executa a função 'closemodal'
});

//EVENTOS DOS BUTÕES DE QUANTIDADE
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
      if(modalqt > 1){//Quantidade não pode ser menor do que 1.
        modalqt --;//Subtrai 1 a cada clique.
        c('.pizzaInfo--qt').innerHTML = modalqt;//Exibe quantidade atualizada.
      };
});
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
  modalqt++;//Soma 1.
  c('.pizzaInfo--qt').innerHTML = modalqt;//Exibe na tela a quantidade atualizada.
});

//EVENTO DE CLICK QUE ALTERA O TAMANHO DAS PIZZAS
cs('.pizzaInfo--size').forEach((size, sizeindex)=>{
  size.addEventListener('click', ()=>{//Ao clicar no tamanho da pizza ele executa algo.
    c('.pizzaInfo--size.selected').classList.remove('selected');//Remove o elemnto que tiver a class 'selected'.
    size.classList.add('selected');//Adiciona a class'selected' no elemento que foi clicado.
  });
});

//EVENTO DE CLICK PARA ADICIONAR ELEMENTOS NO CARRINHO
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
  let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));//Estamos pegando o data-key da pizza selecioanda. Ou seja, o tamanho.
  //parseInt-- Transforma de string em número.

  let identifier = pizzaJson[modalkey].id+'-'+size;//Pega do 'id' da pizza específica de acordo com o 'modalkey'. E depois o tamanho da pizza que foi selecionada.

  let key = cart.findIndex((item)=>item.identifier == identifier);//Ele pesquisa o index do elemento. Se tiver index ele retorna o mesmo. Senão tiver ele retorna '-1'.
  //findIndex procura por alguns item que colocamos. Se encontrar retorna o index do item. Se não encontar não encontrar retorna '-1.'
  
  if (key > -1) {
    cart[key].qt += modalqt;//Soma a quantidade de pizzas de determinado 'key' que está no carrinho com a nova quantidade do mesmo 'key'.
  } else { 
    cart.push({//Estamos enviando ou empurando estas informações para a variável 'cart'.
      identifier,
      id:pizzaJson[modalkey].id,//Pegamos o 'id' do pizzajson com referência no 'modalkey', no caso o nome da pizza. E enviamos para 'id'. 
      size:size,//Usamos o tamanho da pizza baseado na variável criada a cima.
      qt:modalqt//Enviamos a quantidade definida na variável 'modalqt'.
    });
  }
  updatecart();//Atualiza  carrinho de compras na lateral da página.
  closemodal();//Ao final executamos a função para fechar o modal.
});

function updatecart(){
  if(cart.length > 0){//Verifica se existe alguns elemento no cart.
    c('aside').classList.add('show');//Adiciona a classe 'show' em 'aside'.
    c('.cart').innerHTML = '';
    /*Zera as informações que estão aparecendo no carrinho. Mas elas continuam na array 'cart' e quando clicar para
    adicionar outras pizzas ele busca as informações da array 'cart' e exibe novamente.*/

    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    
    for( let i in cart){//Para todos os itens que estão em 'cart' representados pelo 'i' faça...
      let pizzaitem = pizzaJson.find((item)=> item.id == cart[i].id)/* O find trás o item verificado no pizzajson. 
      Neste caso se o id do item do pizzaJson for igual ao id dos itens em cart, ele retorna o próprio item do pizzaJson.*/

      let cartitem = c('.models .cart--item').cloneNode(true);//Clonando as informações de 'models cart--item' em cartitem.

      subtotal += pizzaitem.price * cart[i].qt;//Ele multiplica o valor da pizza pela quantidade daquele item específico que esta no carrinho.
      /*o subtotal recebe ele mais a multiplicação dos itens pelo valor*/

      let pizzasizename;
      switch (cart[i].size) {//Escolhe o size da pizza de acordo com o index.
        case 0:
          pizzasizename = 'P';
          break;
        case 1:
          pizzasizename = 'M';
          break;
        case 2:
          pizzasizename = 'G';
        break;
      }
      
      let pizzaname = `${pizzaitem.name}(${pizzasizename})`;//Busca o nome que está no pizzaJson e o símbolo do tamanho.

      cartitem.querySelector('img').src = pizzaitem.img;//Adicionamos ao 'src' da 'img' do cartitem as informações de 'pizzaitem' que foram retiradas de pizzaJson.
      cartitem.querySelector('.cart--item-nome').innerHTML = pizzaname;//Exibe o nome da pizza.
      cartitem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;//Exibe a quantidade do carrinho de acordo com a pizza.

      cartitem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
        if(cart[i].qt > 1){//Só subtrai a qauntidade se > 1.
          cart[i].qt --;
        }
        else{
          cart.splice(i, 1);//Caso não seja >1 ele retira 1 item'i' do carrinho.
        }
        updatecart();
      });
      cartitem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
        cart[i].qt ++;//Adiciona mais 1 cada click.
        updatecart();
      });
      


      c('.cart').append(cartitem);
      //Adiciona as informações de 'cartitem' em '.cart'. Essas informações vieram de 'models .cart--item' e foram adicionadas em cartitem.


    }

    desconto = subtotal * 0.1;//10% de desconto.
    total = subtotal - desconto;

    c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;//Substitui a classe pela variável.
    c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


  }
  else{
    c('aside').classList.remove('show');
  }
};
