let countryData = []; // Define outside to be accessible in both fetch and submit

document.addEventListener('DOMContentLoaded', function () {
    // Load the country data from the text file
    fetch('countries.txt')
        .then(response => response.text())
        .then(data => {
            // Process the text file data
            countryData = data.trim().split('\n').map(line => {
                const parts = line.split(',');
                const country = parts[0];
                const income = parts[parts.length - 1];
                return { country: country.trim(), income: income.trim() };
            });

            const countrySelect = document.getElementById('country');

            countryData.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.country;
                option.textContent = `${entry.country} (${entry.income})`;
                countrySelect.appendChild(option);
            });

            // Initialize Selectize.js
            $('#country').selectize({
                create: false,
                sortField: 'text',
                searchField: ['value', 'text']
            });
        });

    document.getElementById('feeForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const category = document.getElementById('category').value;

        // Find the country data from the list
        const countryInfo = countryData.find(c => c.country === country);
        const incomeLevel = countryInfo ? countryInfo.income : null;

    let fee;
    let ticket;

    if (incomeLevel === 'High-income economies') {
        if (category === 'professional') {
            fee = '$50';
            ticket = "Professional (HIC)";
        } else if (category === 'postgrad') {
            fee = '$20';
            ticket = "Post-grad (HIC)";
        } else if (category === 'undergrad') {
            fee = '$15';
            ticket = "Pre-grad (HIC)";
        } else if (category === 'highschool') {
            fee = '$10';
            ticket = "High-school (HIC)";
        }
    } else {
        // all others are low-income economies
        if (category === 'professional') {
            fee = '$30';
            ticket = "Professional (LMIC)";
        } else if (category === 'postgrad') {
            fee = '$15';
            ticket = "Post-grad (LMIC)";
        } else if (category === 'undergrad') {
            fee = '$10';
            ticket = "Pre-grad (LMIC)";
        } else if (category === 'highschool') {
            fee = '$5';
            ticket = "High-school (LMIC)";
        }
    }


        document.getElementById('result').textContent = `The abstract handling fee is ${fee}. Please choose ${ticket} tickets.`;
        document.getElementById('payButton').style.display = 'inline';
    });

});

$(document).ready(function() {
  $('#category').selectize({
    render: {
      option: function(item, escape) {
        return '<div style="line-height: 2; font-size: 1.2em; padding: 5px;">' + escape(item.text) + '</div>';
      }
    }
  });
});