// Referências aos elementos do HTML
const form = document.getElementById('itemForm'); // Pegamos o formulário pelo ID para manipular seus dados.
const itemList = document.getElementById('itemList'); // Pegamos o elemento onde a lista de itens será exibida.
let editingItemId = null; // Variável para armazenar o ID do item que estamos editando. Inicialmente é null (nenhum item editado).

// Função para carregar e exibir os itens armazenados no Local Storage
function loadItems() {
  // Recupera os itens do Local Storage e converte para um array, ou cria um array vazio caso não haja dados
  const items = JSON.parse(localStorage.getItem('items')) || [];
  
  // Limpa o conteúdo atual da lista de itens na página
  itemList.innerHTML = '';

  // Para cada item na lista de itens recuperada do Local Storage
  items.forEach(item => {
    // Cria um novo item de lista (<li>) para exibir
    const li = document.createElement('li');
    // Define o texto do item (nome + descrição)
    li.innerText = `${item.name}: ${item.description}`;

    // Cria o botão de "Editar"
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar'; // Define o texto do botão
    editButton.onclick = () => editItem(item); // Chama a função editItem quando o botão é clicado

    // Cria o botão de "Excluir"
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir'; // Define o texto do botão
    deleteButton.onclick = () => deleteItem(item); // Chama a função deleteItem quando o botão é clicado

    // Adiciona os botões de edição e exclusão ao item da lista
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Adiciona o item à lista de itens na interface
    itemList.appendChild(li);
  });
}

// Função que é chamada ao enviar o formulário
function addItem(event) {
  event.preventDefault(); // Impede o envio padrão do formulário (evita o recarregamento da página)

  // Captura os valores inseridos no formulário
  const name = document.getElementById('name').value; // Nome do item
  const description = document.getElementById('description').value; // Descrição do item

  // Verifica se ambos os campos foram preenchidos
  if (!name || !description) {
    alert('Por favor, preencha todos os campos!'); // Se não, exibe um alerta
    return; // Interrompe a execução da função
  }

  // Cria o objeto com os dados do novo item
  const newItem = { name, description };

  // Recupera os itens armazenados no Local Storage, ou um array vazio caso não existam
  let items = JSON.parse(localStorage.getItem('items')) || [];

  if (editingItemId) {
    // Se estamos editando um item, mapeamos os itens e atualizamos o item com o ID igual a editingItemId
    items = items.map(item =>
      item.id === editingItemId ? { ...item, name, description } : item
    );
    editingItemId = null; // Limpa o ID de edição após a atualização
  } else {
    // Se estamos criando um novo item, geramos um ID único baseado no timestamp
    newItem.id = Date.now();
    // Adiciona o novo item à lista de itens
    items.push(newItem);
  }

  // Salva a lista de itens atualizada no Local Storage
  localStorage.setItem('items', JSON.stringify(items));
  // Exibe uma mensagem de sucesso, dependendo se o item foi adicionado ou atualizado
  alert(editingItemId ? 'Item atualizado!' : 'Item adicionado!');
  // Recarrega os itens na interface
  loadItems();
  // Reseta o formulário
  resetForm();
}

// Função chamada quando o botão "Editar" de um item é clicado
function editItem(item) {
  // Preenche os campos do formulário com os dados do item que estamos editando
  document.getElementById('name').value = item.name; 
  document.getElementById('description').value = item.description;
  // Define o ID do item sendo editado
  editingItemId = item.id;

  // Modifica o texto do botão para "Editar Item"
  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Editar Item'; 
  // Modifica o evento de clique para que chame a função updateItem ao invés de addItem
  submitButton.setAttribute('onclick', 'updateItem(event)');
}

// Função chamada quando o botão "Editar Item" é clicado
function updateItem(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário

  // Captura os novos valores para nome e descrição
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Valida se ambos os campos foram preenchidos
  if (!name || !description) {
    alert('Por favor, preencha todos os campos!'); // Exibe um alerta se algum campo estiver vazio
    return; // Interrompe a execução da função
  }

  // Recupera os itens do Local Storage
  let items = JSON.parse(localStorage.getItem('items')) || [];

  // Mapeia a lista de itens, atualizando o item com o ID igual ao editingItemId
  items = items.map(item =>
    item.id === editingItemId ? { ...item, name, description } : item
  );

  // Salva a lista de itens atualizada no Local Storage
  localStorage.setItem('items', JSON.stringify(items));
  // Exibe uma mensagem de sucesso
  alert('Item atualizado!');
  // Recarrega os itens na interface
  loadItems();
  // Reseta o formulário
  resetForm();
}

// Função chamada quando o botão "Excluir" de um item é clicado
function deleteItem(item) {
  // Pergunta ao usuário se ele tem certeza de que deseja excluir o item
  if (confirm('Tem certeza que deseja excluir este item?')) {
    // Recupera a lista de itens
    let items = JSON.parse(localStorage.getItem('items')) || [];
    // Filtra o item a ser excluído, removendo o item com o ID igual ao do item a ser excluído
    items = items.filter(i => i.id !== item.id);
    // Salva a lista de itens atualizada (sem o item excluído) no Local Storage
    localStorage.setItem('items', JSON.stringify(items));
    // Exibe uma mensagem informando que o item foi excluído
    alert('Item excluído!');
    // Recarrega a lista de itens na interface
    loadItems();
  }
}

// Função chamada para limpar os campos de entrada do formulário
function resetForm() {
  // Limpa os valores dos campos de nome e descrição
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  // Reseta a variável de edição
  editingItemId = null;

  // Restaura o texto do botão para "Adicionar Item"
  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Adicionar Item';
  // Reseta a função chamada pelo botão para "adicionar item" novamente
  submitButton.setAttribute('onclick', 'addItem(event)');
}

// Esta função é chamada automaticamente quando a página é carregada
window.onload = loadItems; // Chama a função loadItems para carregar e exibir os itens do Local Storage

// Adiciona o evento de envio ao formulário, chamando a função addItem
form.addEventListener('submit', addItem);
