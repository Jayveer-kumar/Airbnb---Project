document.addEventListener("DOMContentLoaded",async function(){
  // try{
  //  let response=await fetch("/http://localhost:8080/Listing/:id");
  //  let data=response.json();
  //  let mapApi=data.mapApi;
  //  async function getCoordinates(address){
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapApi}`;
  //   try {
  //       let response = await fetch(url);
  //       let data = await response.json();
  //       if (data.status === "OK") {
  //           let location = data.results[0].geometry.location;
  //           return location;
  //       } else {
  //           console.error("Location not found!");
  //       }
  //   } catch (error) {
  //       console.error("Error fetching coordinates:", error);
  //   }
  // } 
  
  
  // function initMap() {
  //   var mapOptions = {
  //       center: { lat: 28.7041, lng: 77.1025 }, // Default Delhi location
  //       zoom: 10
  //   };
  
  //   let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // }


})

function initMap() {
  var mapOptions = {
      center: { lat: 28.7041, lng: 77.1025 }, // Default Delhi location
      zoom: 10
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
}