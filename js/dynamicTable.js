/*
File: homework4 (Part 1).js
GUI Assignment: Using the jQuery Validation Plugin.
Christian Kayego, UMass Lowell Computer Science, christian_kayego@student.uml.edu
For this is assignment, we are to use the assignment 3 that we created and use the jQuery validation plugin to
validate all data entered by the user. In case of errors, they are to be handled precisely, clear to the user as
to where the errors are and how to correct them, and also prevent the page from reloading.
Copyright (c) 2023 by Christian Kayego. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Christian Kayego on June 19, 2023 at 4:30 pm
Sources used: https://www.w3schools.com/, https://www.youtube.com/watch?v=UB1O30fR-EE, https://stackoverflow.com/
*/


// Get form and table container elements
const form = document.getElementById('inputForm');
const tableContainer = document.getElementById('tableContainer');
const loadingMessage = document.getElementById('loadingMessage');

// Add event listener to form submission
$(document).ready(function () {
  $('#inputForm').validate({
    rules: {
      startMultiplier: {
        required: true,
        number: true,
      },
      endMultiplier: {
        required: true,
        number: true,
      },
      startMultiplicand: {
        required: true,
        number: true,
      },
      endMultiplicand: {
        required: true,
        number: true,
      },
    },
    messages: {
      startMultiplier: {
        required: 'Please enter a start multiplier.',
        number: 'Please enter a valid number for the start multiplier.',
      },
      endMultiplier: {
        required: 'Please enter an end multiplier.',
        number: 'Please enter a valid number for the end multiplier.',
      },
      startMultiplicand: {
        required: 'Please enter a start multiplicand.',
        number: 'Please enter a valid number for the start multiplicand.',
      },
      endMultiplicand: {
        required: 'Please enter an end multiplicand.',
        number: 'Please enter a valid number for the end multiplicand.',
      },
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element); // Place error messages after the input element
    },
    submitHandler: function (form) {
      // Get input values
      const startMultiplier = parseInt($('#startMultiplier').val());
      const endMultiplier = parseInt($('#endMultiplier').val());
      const startMultiplicand = parseInt($('#startMultiplicand').val());
      const endMultiplicand = parseInt($('#endMultiplicand').val());

      // Clear previous table, if any
      while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
      }

      if (startMultiplier > endMultiplier) {
        // Display error message for invalid range
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Invalid range: Start multiplier should be less than or equal to end multiplier.';
        errorMessage.classList.add('error-message');
        tableContainer.appendChild(errorMessage);
      } else if (startMultiplicand > endMultiplicand) {
        // Display error message for invalid range
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Invalid range: Start multiplicand should be less than or equal to end multiplicand.';
        errorMessage.classList.add('error-message');
        tableContainer.appendChild(errorMessage);
      } else if (
        isNaN(startMultiplier) ||
        isNaN(endMultiplier) ||
        isNaN(startMultiplicand) ||
        isNaN(endMultiplicand)
      ) {
        // Display error message for non-numeric input
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please enter valid numeric values for all fields.';
        errorMessage.classList.add('error-message');
        tableContainer.appendChild(errorMessage);
      } else {
        // Generate multiplication table
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // Empty cell for top-left corner

        // Generate header row
        for (let i = startMultiplier; i <= endMultiplier; i++) {
          const headerCell = document.createElement('th');
          headerCell.textContent = i;
          headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Generate rows and cells
        for (let i = startMultiplicand; i <= endMultiplicand; i++) {
          const row = document.createElement('tr');
          const multiplicandCell = document.createElement('td');
          multiplicandCell.textContent = i;
          row.appendChild(multiplicandCell);

          for (let j = startMultiplier; j <= endMultiplier; j++) {
            const product = i * j;
            const productCell = document.createElement('td');
            productCell.textContent = product;
            row.appendChild(productCell);
          }

          table.appendChild(row);
        }

        // Append table to table container
        tableContainer.appendChild(table);
      }

      loadingMessage.style.display = 'none'; // Hide the loading message
    },
  });
});