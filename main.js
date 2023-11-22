 //DOMContentLoaded event to ensure the DOM is fully loaded before manipulating it
document.addEventListener('DOMContentLoaded', function () {
   
    let body = document.body;

    let requestOne = new XMLHttpRequest();
    requestOne.open('GET', 'https://restcountries.com/v3.1/name/nepal');
    requestOne.send();

    function renderCountry(data){
          //country
          let country = document.createElement('div');
          country.className = 'country';
  
          //countryName
          let countryName = document.createElement('div');
          countryName.className = 'countryName';
          country.appendChild(countryName);
          countryName.innerText = data[0].name.common;
  
          //countryCapital
          let countryCapital = document.createElement('div');
          countryCapital.className = 'countryCapital';
          country.appendChild(countryCapital);
          countryCapital.innerText = data[0].capital;
  
          // Attaching the country element to the body
          body.appendChild(country);
    }

    requestOne.addEventListener('load', function () {
        let data = JSON.parse(this.responseText);

        renderCountry(data);
        
        //finding neighbouring country code
        let neighbourCountry = data[0].borders[0];
        
        //using neighbouring code and making another request to find data about that country
        let requestTwo = new XMLHttpRequest();
        requestTwo.open('GET', `https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
        requestTwo.send();

            requestTwo.addEventListener('load', function (){
                let dataTwo = JSON.parse(this.responseText);
                //rendering neighbour country data
                renderCountry(dataTwo);
            })
    });
});