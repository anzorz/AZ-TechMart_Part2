/**
 * Author: M Anzor Yousuf (Student ID: 102849043)
 * Target: enquire.html and payment.html
 * Purpose: Data Validation and Data Transfer
 * Created: 01/09/2024
 * Last Updated: 01/09/2024
 */

"use strict";

// Function to validate enquiry form data
function validate() {
    var errMsg = "";
    var result = true;
    var quantity = document.getElementById("quantity").value;
    var state = document.getElementById("state").value;
    var postcode = document.getElementById("postcode").value;
    var postchar1 = postcode.substring(0, 1); // Get the first character of the postcode

    // Validate quantity as a positive integer
    if (!quantity || quantity <= 0 || !Number.isInteger(Number(quantity))) {
        errMsg += "Quantity must be a positive integer.\n";
        result = false;
    }

    // Validate state and postcode match
    switch (state) {
        case "VIC":
            if (!(postchar1 == "3" || postchar1 == "8")) {
                errMsg += "Invalid state or postcode for Victoria.\n";
                result = false;
            }
            break;
        case "NSW":
            if (!(postchar1 == "1" || postchar1 == "2")) {
                errMsg += "Invalid state or postcode for New South Wales.\n";
                result = false;
            }
            break;
        case "QLD":
            if (!(postchar1 == "4" || postchar1 == "9")) {
                errMsg += "Invalid state or postcode for Queensland.\n";
                result = false;
            }
            break;
        case "NT":
            if (!(postchar1 == "0")) {
                errMsg += "Invalid state or postcode for Northern Territory.\n";
                result = false;
            }
            break;
        case "WA":
            if (!(postchar1 == "6")) {
                errMsg += "Invalid state or postcode for Western Australia.\n";
                result = false;
            }
            break;
        case "SA":
            if (!(postchar1 == "5")) {
                errMsg += "Invalid state or postcode for South Australia.\n";
                result = false;
            }
            break;
        case "TAS":
            if (!(postchar1 == "7")) {
                errMsg += "Invalid state or postcode for Tasmania.\n";
                result = false;
            }
            break;
        case "ACT":
            if (!(postchar1 == "0")) {
                errMsg += "Invalid state or postcode for Australian Capital Territory.\n";
                result = false;
            }
            break;
        default:
            errMsg += "Please select a valid state.\n";
            result = false;
            break;
    }

    // If there are any error messages, display them
    if (errMsg !== "") {
        alert(errMsg);
    }

    return result;
}

// Function to store data from enquiry form to client-side storage
function storeEnquiryData() {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const street = document.getElementById("street").value;
    const suburb = document.getElementById("suburb").value;
    const state = document.getElementById("state").value;
    const postcode = document.getElementById("postcode").value;
    const phone = document.getElementById("phone").value;
    const contactMethod = document.querySelector('input[name="contact"]:checked').value;
    const selectedProducts = Array.from(document.querySelectorAll('input[name="products"]:checked')).map(input => input.value);
    const quantity = document.getElementById("quantity").value;

    // Store data in sessionStorage
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("street", street);
    sessionStorage.setItem("suburb", suburb);
    sessionStorage.setItem("state", state);
    sessionStorage.setItem("postcode", postcode);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("contactMethod", contactMethod);
    sessionStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    sessionStorage.setItem("quantity", quantity);

    return true; // Ensure the form can proceed
}

// Function to load data onto the payment page
function loadPaymentData() {
    // Retrieve stored data
    const customerName = `${sessionStorage.getItem("firstName") || ''} ${sessionStorage.getItem("lastName") || ''}`;
    const customerEmail = sessionStorage.getItem("email") || '';
    const customerAddress = `${sessionStorage.getItem("street") || ''}, ${sessionStorage.getItem("suburb") || ''}, ${sessionStorage.getItem("state") || ''} ${sessionStorage.getItem("postcode") || ''}`;
    
    // Populate the payment page with retrieved data
    document.getElementById("customerName").textContent = customerName;
    document.getElementById("customerEmail").textContent = customerEmail;
    document.getElementById("customerAddress").textContent = customerAddress;

    // Get selected products and quantity
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts") || "[]");
    const quantity = Number(sessionStorage.getItem("quantity") || 0);

    // Display selected product and quantity
    document.getElementById("selectedProduct").textContent = selectedProducts.join(", ");
    document.getElementById("productQuantity").textContent = quantity;

    // Calculate and display total price
    let totalPrice = 0;
    selectedProducts.forEach(product => {
        totalPrice += getProductPrice(product) * quantity;
    });
    document.getElementById("totalPrice").textContent = `$${totalPrice}`;
}

// Function to get the price of a selected product
function getProductPrice(productName) {
    const productPrices = {
        "Samsung M8": 949,
        "LG 32SQ730S": 549,
        "Samsung Odyssey G5": 497,
        "LG 32UN880-B": 949,
        "Acer Nitro XZ322Q V": 388,
        "Acer EI491CR": 1239,
        "MSI 34 MAG 345CQR": 638
    };
    return productPrices[productName] || 0;
}

// Attach event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to the form on enquire.html to store data on submit
    var enquiryForm = document.querySelector('.enquiry-form form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (event) {
            if (!validate()) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                storeEnquiryData(); // Store data if validation passes
            }
        });
    }


     // Attach event listener for cancel order button
     const cancelOrderBtn = document.getElementById('cancelOrderBtn');
     if (cancelOrderBtn) {
         cancelOrderBtn.addEventListener('click', cancelOrder);
     }
 
     // Load payment data when payment.html loads
     if (document.getElementById('customerName')) {
         loadPaymentData();
     }
     // Attach validation to payment form submit**
    const paymentForm = document.querySelector('.payment-section form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function (event) {
            if (!validatePaymentForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }
});

// Function to validate payment form data
function validatePaymentForm() {
    const cardType = document.getElementById("cardType").value;
    const cardName = document.getElementById("cardName").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    let errorMessage = "";

    // Validate credit card type selection
    if (!["Visa", "Mastercard", "American Express"].includes(cardType)) {
        errorMessage += "Please select a valid credit card type.\n";
    }

    // Validate name on card: alphabetic, up to 40 characters
    if (!/^[A-Za-z\s]{1,40}$/.test(cardName)) {
        errorMessage += "Name on credit card must be alphabetic and up to 40 characters.\n";
    }

    // Validate card number based on type
    if (!validateCardNumber(cardType, cardNumber)) {
        errorMessage += "Invalid credit card number for the selected card type.\n";
    }

    // Validate expiry date format MM-YY
    if (!/^\d{2}-\d{2}$/.test(expiryDate)) {
        errorMessage += "Expiry date must be in the format MM-YY.\n";
    }

    // Validate CVV: exactly 3 digits
    if (!/^\d{3}$/.test(cvv)) {
        errorMessage += "CVV must be exactly 3 digits.\n";
    }

    if (errorMessage) {
        alert(errorMessage);  // Display all errors
        return false;
    }
    return true;
}

// Function to validate credit card number based on type
function validateCardNumber(cardType, cardNumber) {
    const visaRegex = /^4\d{15}$/; // Visa: 16 digits starting with 4
    const mastercardRegex = /^5[1-5]\d{14}$/; // MasterCard: 16 digits starting with 51-55
    const amexRegex = /^3[47]\d{13}$/; // American Express: 15 digits starting with 34 or 37

    switch (cardType) {
        case "Visa":
            return visaRegex.test(cardNumber);
        case "Mastercard":
            return mastercardRegex.test(cardNumber);
        case "American Express":
            return amexRegex.test(cardNumber);
        default:
            return false;
    }
}

// Function to clear stored data and redirect to the home page
function cancelOrder() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
