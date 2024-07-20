import pandas as pd
import numpy as np
df = pd.read_csv("countries.csv", encoding="ISO-8859-1")

df = df.dropna(how='all').reset_index(drop=True) ## remove all those rows which are empty

columns_to_check = ['Category', 'Unnamed: 2']

categ = df[df[columns_to_check].isna().sum(axis=1) == 2] 
categ = categ.loc[:,"Country Name"]

index_income = list(categ.index)
index_income.append(len(df))
index_income = [(index_income[i]+1, index_income[i + 1]-1) for i in range(len(index_income) - 1)]

import math

def is_not_nan(x):
    if isinstance(x, str) and x.lower() == 'nan':
        return False
    if isinstance(x, float) and math.isnan(x):
        return False
    return True

countries_dict = {}
i = 0
for start,end in index_income:
    econ = list(categ)[i].split(" (")[0]
    econ = econ.capitalize() ## formatting categories
    
    list_of_countries = np.concatenate(df.loc[start:end].values).tolist()

    ## cleaning list
    cleaned_list = list(filter(is_not_nan, list_of_countries))
    # Remove the specific substring ' \xa0'
    cleaned_list = [s.replace('\xa0', '') for s in cleaned_list]

    ## remove space at end of the country name
    cleaned_list = [i.rstrip() for i in cleaned_list]
    
    countries_dict[econ] = cleaned_list
    i +=1
    
text_lines = []
for key, values in countries_dict.items():
    for value in values:
        text_lines.append(f"{value}, {key}")

text = "\n".join(text_lines)

with open('countries.txt', 'w') as file:
    file.write(text)