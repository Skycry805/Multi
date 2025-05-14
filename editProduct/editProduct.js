document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('articelid'), 10);
  if (isNaN(productId)) return;

  try {
    const productRes = await fetch('/articel.json');
    const products = await productRes.json();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Titel und Beschreibung
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-description').textContent = product.description;

    // Bildprüfung
    if (product.image_url && product.image_url.trim() !== '') {
      const img = document.getElementById('product-image');
      img.src = product.image_url;
      img.alt = product.title;
      img.style.display = 'block';
    } else {
      document.getElementById('image-upload-container').style.display = 'block';
    }

  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
});

document.getElementById('image-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
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