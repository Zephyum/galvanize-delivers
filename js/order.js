$(document).ready(() => {

  // $(".button-collapse").sideNav();
  // $(".modal-trigger").leanModal();
  // $('button[name="order"]').prop("disabled",true);
  // var listOfPrices = [];

  //shopping cart
  // $('.card').click((function() {
  //   var target = $(event.target).parent('.card');
  //   var item = $('target').parent().find("h6").html();
  //   var price = $('target').parent().find("p").html();
  //   $('tbody').append(`<tr><td><i class="material-icons">clear</i> ${item}</td><td class="right-align price">${price}</td</tr>`);
  //   getPrice();
  // }));
  cart = [];
  // add to cart
  $('.addBtn').click((event) => {
    event.preventDefault();
    // console.log("you clicked", event.target);
    let card = $(event.target).parent().parent();
    let price = card.find('.price').html();
    let title = card.find('.card-title').html();

    // console.log('price is', price);
    // console.log('title is', title);

    addToCart({
      price,
      title
    });
  });

  // remove from cart
  $('.striped').click('.remove', (event) => {
    let title = $(event.target).data("title");
    // console.log("title in remove", title);
    removeFromCart(title);
  });

  function removeFromCart(title) {
    let existingItem = findInCart(title);
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--;
    }

    renderCart();
  }

  function addToCart(item) {
    // check if in cart, if so update
    let existingItem = findInCart(item.title);

    if (existingItem) {
      // console.log("item exists", existingItem);
      existingItem.quantity++;
    } else {
      // else add to cart with qty of 1
      item.quantity = 1;
      cart.push(item);
    }

    // console.log('cart', cart);

    renderCart();
  }

  function findInCart(title) {
    let existingItem = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i];
      }
    }
    return existingItem;
  }

  function renderCart() {
    // find table
    let tbody = $('.striped tbody');

    // clear out all order data
    tbody.children().remove();

    // re-render tbody
    let subtotal = 0;
    for (item of cart) {
      let price = parsePrice(item.price);

      if (item.quantity > 0) {
        tbody.append(`<tr>
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>${formatPrice(price)}</td>
            <td><a class="btn btn-primary remove-item" data-title="${item.title}">Remove</a></td>
          </tr>`);
      }
      subtotal += price * +(item.quantity);
    }

    // do calculate
    console.log("subtotal", subtotal);
    $('#subtotal').text(formatPrice(subtotal));

    // function tax(subtotal){
    let tax = (subtotal * 0.08845);
    // console.log(tax);
    $('#tax').text(formatPrice(tax));
    // }

    let total = (subtotal + tax);
    $('#total').text(formatPrice(total));
  }


  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''));
  }

  function formatPrice(price) {
    // console.log("formatPrice price is", price);
    return '$' + price.toFixed(2);
  }

  // enable submit button when form fields are entered
  $("form").keyup(function() {
    let entries = false;
    let requiredFields = $("form input:required").toArray();
    if (requiredFields.every(value => value.value !== "")) {
      $("button[name='order']").prop("disabled", false);
      $("button[name='order']").toggleClass("disabled");
    }
    $("button[name='order']").click(function() {
      event.preventDefault();
      Materialize.toast('Someone is on their way with your food!', 5000, 'rounded');
      window.setTimeout(function() {
        location.reload();
      }, 3000);
    });
  });


  $('.parallax').parallax();
})
