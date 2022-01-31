//Listen for submit button
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //Hide the results
  document.querySelector('#results').style.display = 'none';
  //Show the loader
  document.querySelector('#loading').style.display = 'block'
  
  setTimeout(calculateResults, 2000);

  e.preventDefault()
});

//Calculate results
function calculateResults() {
  
  //UI Vars
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')


  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;

  //Compute monthly payment
  const x = Math.pow(1+ calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
  //show the results
  document.querySelector('#results').style.display = 'block';
  //hide the loader
  document.querySelector('#loading').style.display = 'none'
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);
  }
  else{
    showError("Please check your mumbers");
  }
  
}


function showError(error){
    //show the results
    document.querySelector('#results').style.display = 'none';
    //hide the loader
    document.querySelector('#loading').style.display = 'none'
  //Create a div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading 
  card.insertBefore(errorDiv, heading)

  //Clear error after 3 seconds
  setTimeout(clearError,3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}

