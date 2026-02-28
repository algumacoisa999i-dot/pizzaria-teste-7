let carrinho = [];
let taxaEntrega = 5;

function adicionar(nome, preco){
  let itemExistente = carrinho.find(i=>i.nome===nome);
  if(itemExistente){
    itemExistente.qtd++;
  } else {
    carrinho.push({nome, preco, qtd:1});
  }
  atualizar();
}

function atualizar(){
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item,index)=>{
    total += item.preco*item.qtd;
    lista.innerHTML += `
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco} x ${item.qtd} 
        <button onclick="diminuir(${index})">-</button>
        <button onclick="aumentar(${index})">+</button>
        <button onclick="remover(${index})">❌</button>
      </div><hr>
    `;
  });

  document.getElementById("contador").innerText = carrinho.length;
  document.getElementById("total").innerText = total + taxaEntrega;
}

function aumentar(i){ carrinho[i].qtd++; atualizar(); }
function diminuir(i){ if(carrinho[i].qtd>1){ carrinho[i].qtd--; } else { carrinho.splice(i,1);} atualizar(); }
function remover(i){ carrinho.splice(i,1); atualizar(); }
function toggleCarrinho(){ document.getElementById("carrinho").classList.toggle("ativo"); }

function aplicarCupom(){
  let cupom = document.getElementById("cupom").value.toUpperCase();
  let total = 0;
  carrinho.forEach(item=> total += item.preco*item.qtd);
  total += taxaEntrega;

  if(cupom === "PROMO10"){
    total = total*0.9;
    alert("Cupom 10% aplicado!");
  } else {
    alert("Cupom inválido");
  }

  document.getElementById("total").innerText = total.toFixed(2);
}

function finalizarPedido(){
  let endereco = document.getElementById("endereco").value;
  if(endereco===""){ alert("Digite o endereço!"); return; }

  // Monta mensagem pro WhatsApp
  let msg = "Olá, quero fazer o pedido:%0A";
  carrinho.forEach(item=>{
    msg += `${item.nome} x${item.qtd} - R$ ${item.preco*item.qtd}%0A`;
  });
  let total = 0;
  carrinho.forEach(item=> total += item.preco*item.qtd);
  total += taxaEntrega;
  msg += `Entrega: R$ ${taxaEntrega}%0ATotal: R$ ${total}%0AEndereço: ${endereco}`;

  // Abre WhatsApp
  window.open("https://wa.me/5585984273819?text="+msg);
}
