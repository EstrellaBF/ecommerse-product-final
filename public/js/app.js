// Valor por defecto
getItem("cama");

const btnSearch = $("#search-item");
btnSearch.on("click", function() {
  let inputProduct = $("#input-search").val();
  console.log(inputProduct);
  getItem(inputProduct);
});

function getItem(inputProduct) {
  $.ajax({
    url: `https://api.mercadolibre.com/sites/MPE/search?q=${inputProduct}`,
    contentType: "application/json",
    method: "GET",
    success: function(response) {
      const results = response.results;
      $.each(results, function(i, obj) {
        console.log(obj);
        const title = obj.title;
        const id = obj.id;
        const availableQuantity = obj.available_quantity;
        const price = obj.price;
        const imageUrl = obj.thumbnail;
        // Agregando al DOM desde el API
        templateProduct(title, id, availableQuantity, price, imageUrl);
      });
    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
}

function templateProduct(title, id, availableQuantity, price, imageUrl) {
  $("#container-products").append(`<div class="card">
    <div class="ui fluid image">
      <div class="ui teal ribbon large label">
        <p>S/.
          <span>${price}</span>
        </p>
      </div>
      <img src=${imageUrl}">
    </div>
    <div class="content">
      <a class="header" href="./views/verProducto.html?product_id=${id}">${title}</a>
      <div class="meta">
        <span class="date">id: ${id}</span>
      </div>
      <div class="description">
        <p>Disponibles: ${availableQuantity}</p>
      </div>
    </div>
  </div>`);
}
