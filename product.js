document.addEventListener("DOMContentLoaded", async () => {
    // 1. Holen der Produkt-ID aus der URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
  
    if (isNaN(productId)) return;
  
    try {
        // 2. Holen der Produkt- und Verkäufer-Daten
        const [productRes, sellerRes] = await Promise.all([
            fetch('articel.json'),
            fetch('seller.json')
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

    // 4. Dropdown-Menü Funktionalität
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Event listener für das Öffnen und Schließen des Dropdowns
    dropdownButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert, dass das Menü sofort geschlossen wird, wenn es angeklickt wird
        dropdownMenu.classList.toggle('show'); // Toggle der Anzeige
    });

    // Schließt das Dropdown-Menü, wenn irgendwo außerhalb des Menüs geklickt wird
    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});