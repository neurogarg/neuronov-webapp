from flask import Flask, render_template, request

app = Flask(__name__)

# Country categories
country_categories = {
    'high_income': ['USA', 'UK', 'Germany', 'Japan'],
    'low_middle_income': ['India', 'Nigeria', 'Brazil', 'Bangladesh']
}

# Fees structure
fees = {
    'high_income': {'professional': 50, 'postgrad': 20, 'undergrad': 15, 'highschool': 10},
    'low_middle_income': {'professional': 30, 'postgrad': 15, 'undergrad': 10, 'highschool': 5}
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    country = request.form['country']
    category = request.form['category']
    
    if country in country_categories['high_income']:
        fee = fees['high_income'][category]
    else:
        fee = fees['low_middle_income'][category]
    
    return render_template('result.html', fee=fee)

if __name__ == '__main__':
    app.run(debug=True)
