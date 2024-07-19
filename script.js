document.addEventListener('DOMContentLoaded', () => {
    fetch('countries.txt')
        .then(response => response.text())
        .then(text => {
            const countries = text.trim().split('\n');
            const datalist = document.getElementById('countries');
            countries.forEach(country => {
                const [countryName] = country.split(',');
                const option = document.createElement('option');
                option.value = countryName;
                datalist.appendChild(option);
            });
        });
});

const fees = {
    "high-income": {
        "professional": 50,
        "postgrad": 20,
        "undergrad": 15,
        "highschool": 10
    },
    "low-middle-income": {
        "professional": 30,
        "postgrad": 10,
        "undergrad": 5,
        "highschool": 5
    },
    "low-income": {
        "professional": 20,
        "postgrad": 5,
        "undergrad": 5,
        "highschool": 5
    }
};

function calculateFee() {
    const country = document.getElementById('country').value;
    const category = document.getElementById('category').value;

    fetch('countries.txt')
        .then(response => response.text())
        .then(text => {
            const countries = text.trim().split('\n');
            const countryInfo = countries.find(c => c.startsWith(country));
            if (!countryInfo) {
                alert('Country not found.');
                return;
            }

            const [, incomeLevel] = countryInfo.split(',');

            let feeCategory;
            if (incomeLevel === 'High-income') {
                feeCategory = 'high-income';
            } else if (incomeLevel === 'Upper-middle-income' || incomeLevel === 'Lower-middle-income') {
                feeCategory = 'low-middle-income';
            } else {
                feeCategory = 'low-income';
            }

            const fee = fees[feeCategory][category];
            document.getElementById('fee').textContent = `Fee: $${fee}`;
            document.getElementById('payLink').style.display = 'block';
        });
}
