// WEEK 1 - DAY 3: LAB | Ironhack Cart [MFAP-1]


// ITERATION 1
function updateSubtotal(product) {
  const price = parseFloat(product.querySelector('.price span').innerText);
  const quantity = product.querySelector('.quantity input').value;
  const currentSubtotal = price * quantity;
  // getting the subtotal element
  const subtotalSlot = product.querySelector('.subtotal span');
  // updating the subtotal in the HTML:
  subtotalSlot.innerText = currentSubtotal.toFixed(2);
  return currentSubtotal;
}

function calculateAll() {
  // ITERATION 2
  const productsList = document.getElementsByClassName('product');
  let totalSum = 0; // variable required for accumulating the Total Sum of the products
  for (let i = 0; i < productsList.length; i++) {
    totalSum += updateSubtotal(productsList[i]);
  }
  // ITERATION 3
  // getting the total element
  const totalSlot = document.querySelector('#total-value span');
  // updating the Total in the HTML:
  totalSlot.innerText = totalSum.toFixed(2);
}

// ITERATION 4
function removeProduct(elementGrandparent) {
  // getting the table body element
  const tableBodyElement = document.getElementById('table-body');
  // removing the current clicked element from the table
  tableBodyElement.removeChild(elementGrandparent);

  // update the total price after excluding the current item
  calculateAll();

}
  //  REMOVE: TRY ONE
// function removeProduct(event) {
//   // we need to acess the current element's (btn) grandparent for removal (tr)
//   const elementGrandparent = event.currentTarget.parentElement.parentElement; 
//   // getting the table body element
//   const tableBodyElement = document.getElementById('table-body');
//   // removing the current clicked element from the table
//   tableBodyElement.removeChild(elementGrandparent);

//   // update the total price after excluding the current item
//   calculateAll();
// }




// ITERATION 5
function clearInputArea() {
  document.getElementById('new-product-name').value = '';
  document.querySelector('.create-product #new-product-price').value = '';
}

function createProduct() {
  // getting the new product information
  const newProductName = document.getElementById('new-product-name').value;
  const newProductPrice = document.querySelector('.create-product #new-product-price').valueAsNumber.toFixed(2);
  
  // Creating the new product as a table row (tr)
  const newTr = 
  `<tr class="product">
  <td class="name">
    <span>${newProductName}</span>
  </td>
  <td class="price">$<span>${newProductPrice}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0.00</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>`;

  // Appeding the new product to the table body
  const tableBodyElement = document.getElementById('table-body');
  tableBodyElement.innerHTML += newTr;

  // Clear the input values for the next creation
  clearInputArea(newProductName, newProductPrice);
}


// Listeners
window.addEventListener('load', () => {
  // To calculate subtotals and totals when the calculate btn is clicked
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  
  //  REMOVE: TRY ONE
  // to remove itens from the list thru the remove btns
  // const removeBtns = document.querySelectorAll('.btn-remove');
  // for (let i = 0; i < removeBtns.length; i++) {
  //   removeBtns[i].addEventListener('click', removeProduct);
  // }  
});

// event delegation: tracking the click on the 'remove' btn
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-remove') ) { // if the click is on the 'remove btn':
     // we need to acess the current element's (btn) grandparent for removal (tr)
    const elementGrandparent = event.target.parentElement.parentElement; 
    // calling th function to remove it
    removeProduct(elementGrandparent); // remove that 'li' element from the ul
  }
});


// To create an item when the Create btn is clicked
const createProductBtn = document.getElementById('create');
createProductBtn.addEventListener('click', createProduct);