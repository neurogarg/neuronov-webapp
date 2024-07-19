document.addEventListener('DOMContentLoaded', function() {
    // Load the country data from the text file
    fetch('countries.txt')
        .then(response => response.text())
        .then(data => {
            const countryData = data.split('\n').map(line => line.split(','));
            const countrySelect = document.getElementById('country');

            countryData.forEach(country => {
                const option = document.createElement('option');
                option.value = country[0];
                option.textContent = `${country[0]} (${country[1]}, ${country[2]})`;
                countrySelect.appendChild(option);
            });

            // Initialize Selectize.js
            $('#country').selectize({
                create: false,
                sortField: 'text',
                searchField: ['value', 'text']
            });
        });

    document.getElementById('feeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const category = document.getElementById('category').value;

        // Find the country data from the list
        const countryInfo = countryData.find(c => c[0] === country);
        const incomeLevel = countryInfo ? countryInfo[2] : null;

        let fee;
        if (incomeLevel === 'High-income') {
            if (category === 'professional') fee = '$50';
            else if (category === 'postgrad') fee = '$20';
            else if (category === 'undergrad') fee = '$15';
            else if (category === 'highschool') fee = '$10';
        } else {
            if (category === 'professional') fee = '$30';
            else if (category === 'postgrad') fee = '$15';
            else if (category === 'undergrad') fee = '$10';
            else if (category === 'highschool') fee = '$5';
        }

        document.getElementById('result').textContent = `The abstract handling fee is ${fee}.`;
        document.getElementById('payButton').style.display = 'inline';
    });
});
