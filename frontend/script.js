const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
let editingItemId = null; // Para controlar qual item está sendo editado

// Função para carregar os itens do Local Storage
function loadItems() {
  // Recupera a lista de itens armazenados no Local Storage (se existir)
  const items = JSON.parse(localStorage.getItem('items')) || [];
  
  itemList.innerHTML = ''; // Limpa a lista de itens na interface

  items.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name}: ${item.description}`;

    // Adiciona os botões de Editar e Excluir
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.onclick = () => editItem(item);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.onclick = () => deleteItem(item);

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    itemList.appendChild(li);
  });
}

// Função para adicionar ou atualizar um item
function addItem(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  if (!name || !description) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const newItem = { name, description };

  let items = JSON.parse(localStorage.getItem('items')) || []; // Pega os itens do Local Storage ou cria uma lista vazia

  if (editingItemId) {
    // Se estamos editando, vamos substituir o item existente
    items = items.map(item => 
      item.id === editingItemId ? { ...item, name, description } : item
    );
    editingItemId = null; // Reseta o ID após a edição
  } else {
    // Se não estamos editando, adicionamos um novo item
    newItem.id = Date.now(); // Adiciona um ID único baseado no timestamp
    items.push(newItem);
  }

  // Salva a lista de itens no Local Storage
  localStorage.setItem('items', JSON.stringify(items));

  alert(editingItemId ? 'Item atualizado!' : 'Item adicionado!');
  loadItems(); // Recarrega os itens
  resetForm(); // Reseta o formulário
}

// Função para editar um item
function editItem(item) {
  document.getElementById('name').value = item.name;
  document.getElementById('description').value = item.description;
  editingItemId = item.id; // Define o ID do item a ser editado

  // Altera o texto do botão de "Adicionar" para "Editar"
  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Editar Item';
  submitButton.setAttribute('onclick', 'updateItem(event)'); // Alteramos a função de clique para a de atualização
}

// Função para atualizar um item (ao invés de adicionar)
function updateItem(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  if (!name || !description) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  let items = JSON.parse(localStorage.getItem('items')) || [];

  // Atualiza o item com o id correspondente
  items = items.map(item =>
    item.id === editingItemId ? { ...item, name, description } : item
  );

  // Salva novamente os itens no Local Storage
  localStorage.setItem('items', JSON.stringify(items));

  alert('Item atualizado!');
  loadItems(); // Recarrega a lista de itens
  resetForm(); // Reseta o formulário
}

// Função para excluir um item
function deleteItem(item) {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    let items = JSON.parse(localStorage.getItem('items')) || []; // Pega os itens do Local Storage

    // Filtra o item a ser excluído
    items = items.filter(i => i.id !== item.id);

    // Atualiza o Local Storage
    localStorage.setItem('items', JSON.stringify(items));

    alert('Item excluído!');
    loadItems(); // Recarrega a lista de itens
  }
}

// Função para resetar o formulário
function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  editingItemId = null; // Reseta o ID do item sendo editado

  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Adicionar Item'; // Restaura o texto do botão para "Adicionar"
  submitButton.setAttribute('onclick', 'addItem(event)'); // Reseta a função de clique para "Adicionar"
}

// Ao carregar a página, carregue os itens automaticamente do Local Storage
window.onload = loadItems;

// Adiciona o evento de envio do formulário
form.addEventListener('submit', addItem);
