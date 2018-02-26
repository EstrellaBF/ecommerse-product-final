$(document).ready(function() {
  console.log($('#subtotal').find('span'));
  console.log($('#igv').find('span'));
  console.log($('#total-amount').find('span'));
  let eachQuantityBox = $('.row-product');

  
  $('#subtotal').find('span').text(Math.floor($('.total-price').find('span').text()));
  $('#igv').find('span').text(Math.floor($('#subtotal').find('span').text() - (Math.floor($('#subtotal').find('span').text()) / 1.18)));
  $('#total-amount').find('span').text(Math.floor($('#subtotal').find('span').text()) + Math.floor($('#igv').find('span').text()));



  // obteniendo lo guardado en el localStorage
  $('#quantity-selected').text(localStorage.getItem('quantity-item'));


  // Recorriendo todos los productos que se han colocado en la cesta de
  $.each(eachQuantityBox, function(i, val) {
    let $inputChange = $(val).find('.quantity input');
    let $unitPriceProduct = $(val).find('.unit-price span').text();

    $inputChange.on('change', function() {
      let $hola = $(val).find('.total-price span').text(Math.floor($unitPriceProduct * $(this).val()));
      let totalPrice = $('.total-price');
  
      $('#subtotal').find('span').text(Math.floor($(totalPrice[0]).find('span').text()) + Math.floor($(totalPrice[1]).find('span').text()));
      // console.log($('#subtotal').find('span').text());
      $('#igv').find('span').text(Math.floor($('#subtotal').find('span').text() - (Math.floor($('#subtotal').find('span').text()) / 1.18)));
      $('#total-amount').find('span').text(Math.floor($('#subtotal').find('span').text()) + Math.floor($('#igv').find('span').text()));
      
    });
  });


  // API Google Pay
  $('#to-pay').on('click', function() {
    console.log(this);
    const payMethod = [
      {
        supportedMethods: ['visa', 'pay-pal', 'mastercard']
      }
    ];

    const payDetail = {
      total: {
        label: 'total de los productos',
        amount: {
          currency: 'PEN',
          value: `${$('#total-amount').find('span').text()}`
        }
      }
    };
    const payRequest = new PaymentRequest(payMethod, payDetail);
    payRequest.show();
  });
});