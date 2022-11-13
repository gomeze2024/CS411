from django.shortcuts import render
import requests


# There are two API calls we'll use from OpenWeather:
#   Call Current Weather Data: http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
#       - lat = Latitude
#       - lon = Longitude
#       - appid = API Key
#
#   Call Coordinates by Location Name: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
#       - q = City Name
#       - limit = Number of Locations in API Response (MAX 5)
#       - appid = API Key
#
#   Call Coordinates by Zip Code: http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid={API key}
#       - zip = Zip Code, Country
#       - appid = API Key
#
#
# For example for Boston q = Boston and zip = 02134,US:
#       - http://api.openweathermap.org/geo/1.0/direct?q=Boston&limit=5&appid=537275397b9037ad50e8da9814692add
#       - http://api.openweathermap.org/geo/1.0/zip?zip=02134,US&appid=537275397b9037ad50e8da9814692add
# From these calls we can retrieve lat and lon (42.3535,-71.1329) to access the current weather:
#       - http://api.openweathermap.org/data/2.5/weather?lat=42.3535&lon=-71.1329&appid=537275397b9037ad50e8da9814692add
# This API call will show us the current weather, which we can print for the user:
#       - weather.main = Group of weather parameters (Rain, Snow, Extreme etc.)
#       - weather.description = Weather condition within the group
#       - main.temp = Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
#       - main.feels_like = Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
# There are many more responses we can put to use.


# Asks user for zip code and country. Returns/prints city name and current temperature.
def get_weather_2():
#   We can use the zip code and country
    zip = input('Enter Zip Code (ex: 02134):\n') 
    country = input('Enter Country (ex: US):\n')
#   appid = Unique API key on account page
    appid = '537275397b9037ad50e8da9814692add'
#    print ("\nZip Code: ",zip)
#    print ("\nCountry: ",country)
#    print ("\nAPI Key: ",appid)

#   Create URL using the zip & country to find the coordinates (lat & lon)
    CoordinateURL = ('http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + (',') + country + '&appid=' + appid)
#    print ("\nThe URL used to find coordinates: ", CoordinateURL)

#   API call to get coordinates
    response = requests.get(CoordinateURL).json()     # 'response' is now a dictionary with information about the location
#    print ("\nFull Response\n",response)
#   Get lat and lon from response dictionary
    lat = response['lat']
    lon = response['lon']
    location = response['name']
#    print ("\nLatitude and Longitude\n",lat,lon)

#   Create URL to access weather
#   Added ("&units=Imperial") so that temperature is in Fahrenheit
    WeatherURL = ('http://api.openweathermap.org/data/2.5/weather?lat=' + str(lat) + '&lon=' + str(lon) + '&appid=' + appid + '&units=Imperial')
#    print ("\nThe URL used to find the weather: ", WeatherURL)

#   API call to get weather (temperature)
    response2 = requests.get(WeatherURL).json()
#    print ("\nFull Response (2)\n",response2)
    
#   Get weather info
    weather_main = response2['weather'][0]["main"]
    #weather_description = response2['weather'][0]["description"]
    main = response2["main"]
    #["temp"]
    #temp_feels_like = ["main"]
    #["feels_like"]

    print ("\nThe Weather In",location,",",zip,":\n","Temperature: ",main['temp'],chr(176),"F")
#    print ("Temperature: ",main['temp'])
#    print ("Feels Like: ", main['feels_like'])
#    print ("Low: ", main['temp_min'])
#    print ("High: ", main['temp_max'])
#    print ("Humidity: ", main['humidity'])


def get_news_2():
    api_key = 'pub_13171ec2935c971700ae44d5ab454b14e2bf3'
    # language english
    language = 'en'
    # category world
    category = 'world'

    newsURL = "https://newsdata.io/api/1/news?apikey=" + str(api_key) + "&language=" + str(language) + "&category=" + str(category)    
    response = requests.get(newsURL).json()
# there are 4 main keys in the response: status, totalResults, results, and nextPage
    keys = response.keys()
    print ("\nkeys\n",keys)

    status = response["status"]
    print ("\nstatus\n",status)

    totalResults = response["totalResults"]
    print ("\ntotalResults\n",totalResults)

    # the results contain everything; too much. We will only show the titles of articles
    results = response["results"]
    print (len(results))

    print ("\nTitles:")
    # can show max 10 titles
    for x in range(10):
        print(results[x]["title"])

    print ("\nnextPage\n",response["nextPage"])


def main():
    """
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        print('Getting the upcoming 10 events')
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=10, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
            return

        # Prints the start and name of the next 10 events
        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            print(start, event['summary'])

    except HttpError as error:
        print('An error occurred: %s' % error)


if __name__ == '__main__':
    main()


def get_weather():
    query = requests.args.get('Boston') # after the get i just put boston as an example but i am not sure how to make to like current location
    api_key = '537275397b9037ad50e8da9814692add'
    response = requests.get("https://openweathermap.org/api", headers ={"Authorization": api_key})

    output = []
    for weather in responses.json()['weather']:
        output.append(weather['src']['original'])
    
    print (output)

def get_news():
    query = requests.get('News') #same thing here dont know hwo to get current news
    api_key = 'pub_13171ec2935c971700ae44d5ab454b14e2bf3'
    response = requests.get("https://newsdata.io/search-news", headers ={"Authorization": api_key})

    output = []
    for news in response.json()['News']:
        output.append(news['src']['original'])
    
    print (output)


#google calendar api was not popping up for me so if u find one just put in the quotes i left blank
def get_calendar():
    query = requests.get('Day') #same shit here 
    api_key = 'AIzaSyAXjToh5jVHclejTaMm0X58EpB7xJWdYOk'
    response = requests.get("https://www.googleapis.com/calendar/v3", headers ={"Authorization": api_key})

    output = []
    for day in response.json()['day']:
        output.append(day['src']['original'])
    
    print (output)


print ("\nFINDING YOUR WEATHER\n")
get_weather_2()
print ("\nGETTING NEWS\n")
get_news_2()
print ("\nANALYZING CALENDAR")