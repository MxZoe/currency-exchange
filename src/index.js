import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from "./exchange-service";

//business logic

function displayExchange(currency, intialAmount, exchangedAmount){
  exchangedAmount = parseFloat(exchangedAmount).toFixed(2);
  $("#display").html(`$${intialAmount} USD is ${exchangedAmount} ${currency}`)
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function calculateExchange(response, currency, amount){
  let rate;
  switch (currency){
    case "EUR":
      rate = `${response.conversion_rates.EUR}`
      break;
    case "GBP":
      rate = `${response.conversion_rates.GBP}`
      break;
    case "INR":
      rate = `${response.conversion_rates.INR}`
      break;
    case "NZD":
      rate = `${response.conversion_rates.NZD}`
      break;
    case "CAD":
      rate = `${response.conversion_rates.CAD}`
      break;
  }

  return amount * rate;
}

//UI logic
$(document).ready(function(){
  $("#formOne").submit(function(event){
    
    let amount = $("#usd").val();
    let currency = $("#exchange").val();
    ExchangeService.getService(`GBP`)
    .then(function(exchangeResponse){
      if (exchangeResponse instanceof Error) {
        throw Error(`Exchange API error: ${exchangeResponse.message}`);
      }
      console.log(exchangeResponse);
      let exchangedAmount = calculateExchange(exchangeResponse, currency, amount);
      
      displayExchange(currency, amount, exchangedAmount);
    })
    .catch(function(error) {
      displayErrors(error.message)
    });
    event.preventDefault();
  });
});
