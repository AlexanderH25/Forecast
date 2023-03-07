const key ='682500PcukwQUtq1UDd6XimUfAmBA5HL';

//get weather information
const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query)
    const data = await response.json();
    console.log(data[0])
    return data[0]; 
};

//get city information
const getCity =  async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query);
    const data = await response.json();
    // data returns an array but with 0 is the closest match
    return data[0];
}


// getCity('Sofia').then(data => {
//     //Getting the id from the getCity function
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// })
// .catch(err => console.log(err));
