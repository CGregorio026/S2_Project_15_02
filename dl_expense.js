"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Christian Gregorio 
    Date: 4.19.19 
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

//upon opening the window, it will run an anonymous function which will loop through every input in the travel exp table, and run the calcExp for each time it detects a change. upon clicking the submit button, it will then run the validate summary function.
window.onload = function () {
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].onchange = calcExp;
      }
      document.getElementById("submitButton").onclick = validateSummary;
}

// checks to see if the data is valid
function validateSummary() {
      var summary = document.getElementById("summary");
      // if there is nothing in the field, then it includes text to tell the user to enter the summary of the trip. otherwise, make it a blank statement
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report.");
      } else {
            summary.setCustomValidity("");
      }
}

//sums the values of input elements using te sumclass parameter
function calcClass(sumClass) {
      // includes calls the sumclass and puts it under one variable name
      var sumFields = document.getElementsByClassName(sumClass);
      // starts off the value of this variable as 0.
      var sumTotal = 0;
      // loops through every item of the sumClass class, and taking the value of the input, then adding it to the itemvalue.
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (!isNaN(itemValue)) {
                  sumTotal += itemValue;
            }
      }
      return sumTotal;
}

//Calculates the travel expenses for each column and row (category and date)
function calcExp() {
      // grabs the value of the entire table
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      // loops through the table and checks the amount of the subtotal, running it through the format number function to get the data in a number to 2 decimals
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }

      //turns the value calculated from the for loop to a number, which will then be converted into a format supporting a dollar value (US  currency).
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}

function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}