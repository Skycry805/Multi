document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
  
    if (isNaN(productId)) return;
  
    try {
        // 2. Holen der Produkt- und Verkäufer-Daten
        const [productRes, sellerRes] = await Promise.all([
            fetch('/articel.json'),
            fetch('/seller.json')
        ]);
  
        const [products, sellers] = await Promise.all([
            productRes.json(),
            sellerRes.json()
        ]);
  
        const product = products.find(p => p.id === productId);
        if (!product) return;
  
        const seller = sellers.find(s => s.id === product.seller_id);
  
        // 3. Füllen der Produktinformationen im HTML
        document.getElementById('product-image').src = product.image_url;
        document.getElementById('product-image').alt = product.title;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
  
        if (seller) {
            document.getElementById('seller-name').textContent = `Name: ${seller.name}`;
            document.getElementById('seller-rating').textContent = `Bewertung: ${seller.rating}`;
            document.getElementById('seller-contact').textContent = `Kontakt: ${seller.contact}`;
        }
  
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }

});

function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Klick außerhalb schließt Dropdown
window.addEventListener("click", function(event) {
  if (!event.target.closest('.dropdown')) {
    document.getElementById("dropdown-menu").classList.remove("show");
  }
});