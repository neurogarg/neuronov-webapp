document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const countries = [
        'USA', 'UK', 'Germany', 'Japan', 'India', 'Nigeria', 'Brazil', 'Bangladesh'
        // Add more countries as needed
    ];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.text = country;
        countrySelect.appendChild(option);
    });

    // Initialize Selectize.js on the country select element
    $('#country').selectize({
        create: false,
        sortField: 'text'
    });

    document.getElementById('feeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const country = document.getElementById('country').value;
        const category = document.getElementById('category').value;
        
        const highIncomeCountries = ['USA', 'UK', 'Germany', 'Japan'];
        const lowMiddleIncomeCountries = ['India', 'Nigeria', 'Brazil', 'Bangladesh'];
        
        const fees = {
            'high_income': {'professional': 50, 'postgrad': 20, 'undergrad': 15, 'highschool': 10},
            'low_middle_income': {'professional': 30, 'postgrad': 15, 'undergrad': 10, 'highschool': 5}
        };
        
        let feeCategory;
        if (highIncomeCountries.includes(country)) {
            feeCategory = 'high_income';
        } else if (lowMiddleIncomeCountries.includes(country)) {
            feeCategory = 'low_middle_income';
        } else {
            feeCategory = 'low_middle_income'; // Default to low/middle income if not listed
        }
        
        const fee = fees[feeCategory][category];
        
        document.getElementById('result').innerText = `The fee is $${fee}.`;
    });
});
