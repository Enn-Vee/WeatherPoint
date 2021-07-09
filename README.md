# What is Weather Point? 
Weather Point is a website where users can interact with a map to get time and weather data on a place they clicked on. <br> 
Users can log in and out of the website through Google OAuth 2.0. While logged in, users can bookmark the place they currently marked for easier access later on!<br>
The front-end of the application is made with React along with Redux to handle states between the map and the information component. Redux is also used to share user state between components.<br>
The app utilizes the OpenWeatherMap API to get weather information. To get the timezone based on latitude and longitude,  TimeZoneDB API is used. 
![Image of Weather Point](https://user-images.githubusercontent.com/39471477/124543533-6ec30c80-ddf3-11eb-95dd-ed0e8f903ffc.png)

# How do I build it on my local machine?
The main focus of the project was to learn more about Docker in order to make development and deployment much easier to do.
In order to build it on your machine,  there are a few prerequisites.

## Prerequisites
1.) [Docker](https://www.docker.com/products/docker-desktop)

2.) [Google API Key](https://console.cloud.google.com/)
* There are a couple of things to be done here.<br>
  1.) Make a project <br>
  2.) Enable Google Maps API which can be seen under the APIs tab.<br>
  3.) Get OAuth Credentials under the Credentials tab.
  4.) While making the credentials, add http://localhost:4000 to the URIs.
  5.) Add http://localhost:4000/auth/google/callback to the authorized redirect URIs.
  6.) You should be able to get your client ID and secret by looking at the top right of the screen.

3.) [OpenWeatherMap API key](https://openweathermap.org/)

4.) [TimeZoneDB API Key](https://timezonedb.com/)

## What do I do next?

1.) Clone the repository in your machine.

2.) Make a frontend.env file and a backend.env file in the root folder.

3.) The frontend.env file must have the following keys: 

* REACT_APP_GOOGLE_API_KEY(This is the API key that you got from Google)

4.) The backend.env file must have the following keys:

* GOOGLE_CLIENT_ID (OAuth 2.0 Client ID from Google)
* GOOGLE_CLIENT_SECRET (OAuth 2.0 Client Secret from Google)
* SESSION_SECRET (For the purposes of this project, any string will do)
* OPENWEATHERMAP_API_KEY (The API key you got from OpenWeatherMap)
* TIMEZONEDB_API_KEY (The API key you got from TimezoneDB)

5.) Once the environment variables are set, go to the root folder where docker-compose.yml is in then run 
```
docker compose up --build
```

6.) Once it is finished loading, the website should be accessible at localhost:3000.
