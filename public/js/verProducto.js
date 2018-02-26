$(document).ready(function() {
  var $amountProduct = $(".amount-product");
  var productId = getParameterByName('product_id');
  console.log(productId);

  $.ajax({
    url: `https://api.mercadolibre.com/items/${productId}?access_token=APP_USR-4292162118521145-022606-3ecd599a8baeee0c815b2da69327bb92__A_C__-206830841`,
    contentType: 'application/json',
    method: 'get',
    success: function(response) {
      const results = response.results;
      console.log(response);
      const title = response.title;
      const urlImage = response.pictures[0]['url'];
      const price = response.price;
      const availableQuantity = response.available_quantity;
      const id = response.id;
      const sellerAddress = response.seller_address.city.name;
      templateProduct(
        id,
        title,
        urlImage,
        price,
        availableQuantity,
        sellerAddress
      );


    },
    fail: function(request) {
      if (request) {
        alert(request.message);
      }
    }
  });

  function templateProduct(
    id,
    title,
    urlImage,
    price,
    availableQuantity,
    sellerAddress
  ) {
    $('#product').append(`
      <div class="ui eight wide column">
        <div class="ui fluid image">
          <img src="${urlImage}">
        </div>
      </div>
      <div class="ui eight wide column" id="container-count">
        <h3 class="ui header">
          ${title}
          <div class="sub header details-product">
            <span>
              Disponible: 
              <b>${availableQuantity}</b>
            </span>
            <span>
              ${id}
            </span>
          </div>
        </h3>
        <p>
          ${sellerAddress}
        </p>
        <!-- EDITANTO CLASE PARA JALAR EL PRECIO -->
        <h2 class="ui header">
          S/.
          <span class="amount-product">${price}</span>
          <div class="sub header">Agrega al carrito!</div>
        </h2>
        <br>
        <div class="quantity">
          <h5>Cantidad</h5>
          <input type="number" min="1" max="9" step="1" value="1">
          <!--<div class="quantity-nav">
            <div class="quantity-button quantity-up">
              <b>+</b>
            </div>
            <div class="quantity-button quantity-down">
              <b>-</b>
            </div>
          </div>-->
        </div>
        <div class="ui blue labeled icon button" id="add-cart">
          Agregar al carrito
          <i class="add icon"></i>
        </div>
      </div>`);
  }
  

  /* $(".quantity").each(function() {
    const spinner = $(this);
    const input = spinner.find('input[type="number"]');
    const btnUp = spinner.find(".quantity-up");
    const btnDown = spinner.find(".quantity-down");
    const min = input.attr("min");
    const max = input.attr("max");

    btnUp.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }

      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });
 */
  // Evento para guardar la cantidad de productos seleccionados en el local storage
  // y mostrando en el carrito
  $(document).on("click", "#add-cart", function() {
    console.log("boton carrito");
    let quantityPicked = $(".quantity")
      .find("input")
      .val();
    localStorage.setItem("quantity-item", quantityPicked);
    $("#cart-quatity").text(quantityPicked);
  });
});
