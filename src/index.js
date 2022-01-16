import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from "./exchange-service";

//business logic

function displayExchange(currency, intialAmount, exchangedAmount){
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

  let percentage = 1/rate;
  let exchangedAmount = amount * percentage;
  return exchangedAmount;
}

//UI logic
$(document).ready(function(){
  let amount = $("#usd").val();
  let currency = $("#exchange").val();
  let exchangedAmount;
  $("#formOne").submit(function(event){
    event.preventDefault();
    ExchangeService.getService(currency)
    .then(function(exchangeResponse){
      if (exchangeResponse instanceof Error) {
        throw Error(`Unsplash API error: ${exchangeResponse.message}`);
      }
      exchangedAmount = calculateExchange(exchangeResponse, currency, amount);
      displayExchange(currency, amount, exchangedAmount);
    })
    .catch(function(error) {
      displayErrors(error.message)
    });
  });
});
