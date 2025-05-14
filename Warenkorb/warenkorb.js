document.addEventListener("DOMContentLoaded", () => {    /*laden der Daten nach laden der Website */
    
    function loadArticles () {
        fetch('warenkorb.json')  /*URL der API*/
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('product-card');
    
            /*auslesen der JSON*/
            data.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product';
                

            /*hinzufügen der HTML Elemente in die vorhandene Website*/
            item.innerHTML = `
                    <img src="${product.image_url}" alt="${product.title}">

                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">Preis: ${product.price} €</p>

                        <div class="product-actions">
                        <label for="quantity-${product.id}">Menge:</label>
                        <select id="quantity-${product.id}" class="quantity-select">
                            ${[...Array(product.amount)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
                        </select>

                        <button onclick="addToCart(${product.id})" class="add-to-cart-btn">In den Warenkorb</button>
                        <button onclick="deleteProduct(${product.id})" class="delete-btn">Löschen</button>
                        </div>
                    </div>
            `;
            /*unten anhängen */
            list.appendChild(item);
            });
        })
        .catch(err => {
            console.error('Fehler beim Laden der Produkte:', err);
        });
    }
    loadArticles();
  });

  function deleteArticel (id){

  }





function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});