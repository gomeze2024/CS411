import requests

def set_comment(condition):
  if (condition == "Thunderstorm"):
    comment = "If you have to go outside, make sure to stay away from tall objects."
  elif (condition == "Drizzle"):
    comment = "Pitter patter. Pitter patter."
  elif (condition == "Snow"):
    comment = "Woah it's snowing. I love fresh snow"
  elif (condition == "Clouds"):
    comment = "Just another cloudy day."
  elif (condition == "Clear"):
    comment = "The weather's clear. Make sure to gets lots done!"
  else:
    comment = "Woah. Stay safe out there"
  return comment

# Function to handle the request to the OpenWeatherMap API
def get_weather(zip_code):
    api_key = config("WEATHER_KEY")
    # URL for the OpenWeatherMap API
    url = "http://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zip_code, api_key)
    # Send the request and get the response
    response = requests.get(url)
    condition = response.json()['weather'][0]['main']
    comment = set_comment(condition)

    weather_data = {
        "location": response.json()['name'],
        "temperature": response.json()['main']['temp'],
        "description": response.json()['weather'][0]['description'],
        "high": response.json()['main']['temp_max'],
        "low": response.json()['main']['temp_min'],
        "comment": comment
    }
    # Return the temperature in Fahrenheit
    return weather_data


# Function to handle the request to the NewsData.io API
def get_news():
  language = 'en'
  category = 'world'

  api_key = config("NEWS_KEY")
  url = "https://newsdata.io/api/1/news?apikey={}&language={}&category={}".format(api_key, language, category)
  response = requests.get(url)
  results = response.json()['results']
  news_data = {
    "News 1": (response.json()['results'][0]['title'], response.json()['results'][0]['country'][0], response.json()['results'][0]['description']),
    "News 2": (response.json()['results'][1]['title'], response.json()['results'][1]['country'][0], response.json()['results'][1]['description']),
    "News 3": (response.json()['results'][2]['title'], response.json()['results'][2]['country'][0], response.json()['results'][2]['description']),
    "News 4": (response.json()['results'][3]['title'], response.json()['results'][3]['country'][0], response.json()['results'][3]['description']),
    "News 5": (response.json()['results'][4]['title'], response.json()['results'][4]['country'][0], response.json()['results'][4]['description'])
    }
  
  return news_data

