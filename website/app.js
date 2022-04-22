
/* Global Variables */
// OpenWeatherMap base URL
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
// My personal API key
const apiKey = '&appid=931959d8b1a6f716457f8173fdb2fa05&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
// added one to month because it was starting from 0 (January was equal 0)
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// callback function that will call the async GET to get the data
function action(e){
    const zip = document.getElementById('zip').value;
    getTemp(baseURL, zip, apiKey)
// chain Promises to add the api data and the data entered by user    
    .then(function (data){
        postTemp('/add', {
            date: newDate,
            // choosing the temperature from the data from API
            temp: data.list[0].main.temp,
            // Take the value that users put
            content: document.getElementById('feelings').value
        })
        // chain promise to update the ui dynamically
        // update the data and show it on the wep
        updateUI()
    })
        }
// an event listener and a callback function to excute when it is clicked
        document.getElementById('generate').addEventListener('click', action);

// Get request to the OpenWeatherMap API data 
// Get weather using zip code 
const getTemp = async (baseURL, zip, key)=>{
// Get request with the parameters
    const get = await fetch(baseURL+zip+key)
    try{
// Turn (parse) JSON response into JS opject
    const data = await get.json();
// return the data
    return data;
// If there is error console it    
    } catch(error){
        console.log("error", error);
    }
    }

// Post request to add API data
// function recieves a bath and object
//The object data inclube three values it is above in chaining promises
const postTemp = async (url ="", data ={})=>{
const post = await fetch (url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});
try{
// turn parsed data into JS    
    const newData = await post.json();
    console.log(newData);
// retun the new data after the user input     
    return newData;
} catch (error){
    console.log("error", error);
}
};

// this function retrive data from the app
const updateUI = async ()=>{
  const update = await fetch ('/get');
  try{
    // turn the final data into Js   
    const all = await update.json();
    // select the items we need from the DOM (index.html)
    document.getElementById('date').innerHTML ="Date is : " + all.date;
    document.getElementById('temp').innerHTML ="Temp is : " + all.temp+' C';
    document.getElementById('content').innerHTML ="My feeling : " + all.content;
    document.getElementById('powered').innerHTML="Powered by : Ahmed Nabil &#128519";
    document.getElementById('thanks').innerHTML = "Thanks for using this app &#129305&#128525";
  }catch(error){
    console.log("error", error);
  }
}
