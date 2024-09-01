/**
 * Author: M Anzor Yousuf (Student ID: 102849043)
 * Target: enquire.html and payment.html
 * Purpose: Data Validation and Data Transfer
 * Created: 01/09/2024
 * Last Updated: 01/09/2024
 */

"use strict";

// Enhancement 1: Checkbox for "Billing Address Different from Delivery Address"
document.addEventListener("DOMContentLoaded", function () {
    const billingCheckbox = document.getElementById("billing-checkbox");
    const billingAddressSection = document.getElementById("billing-address-section");

    if (billingCheckbox) {
        billingCheckbox.addEventListener("change", function () {
            if (billingCheckbox.checked) {
                billingAddressSection.style.display = "block"; // Show billing address fields
            } else {
                billingAddressSection.style.display = "none"; // Hide billing address fields
            }
        });
    }
});

//  Enhancement 2: concatenate first and last names and prefill Name on card
document.addEventListener("DOMContentLoaded", function () {
    const firstNameInput = document.getElementById("firstname");
    const lastNameInput = document.getElementById("lastname");

    if (firstNameInput && lastNameInput) {
        const updateFullName = function () {
            const fullName = `${firstNameInput.value} ${lastNameInput.value}`.trim();
            sessionStorage.setItem("customerFullName", fullName); 
        };

        firstNameInput.addEventListener("input", updateFullName);
        lastNameInput.addEventListener("input", updateFullName);
    }

    const cardNameInput = document.getElementById("cardName");

    if (cardNameInput) {
        const storedFullName = sessionStorage.getItem("customerFullName");
        if (storedFullName) {
            cardNameInput.value = storedFullName; // Pre-fill the name on card
        }
    }

});