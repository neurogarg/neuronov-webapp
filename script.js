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
        "professional":
