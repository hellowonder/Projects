const ul = document.querySelector('ul');

var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1) //January is 0!
var yyyy = today.getFullYear();



fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=363&date=${dd}-${mm}-${yyyy}`)
.then(data => {
    // console.log(data);
    return data.json();
}).then(parseData =>{
    // console.log(parseData);
    
    for(let listOfHospital of parseData.sessions){
        if(listOfHospital.avilable_capacity > 0){

            let name = document.createElement('p')
            name.innerHTML = `Hospital Name: ${listOfHospital.name}`
            ul.append(name)

            let address = document.createElement('p')
            address.innerHTML = `Hospital Address: ${listOfHospital.address}`
            ul.append(address)

            let pincode = document.createElement('p')
            pincode.innerHTML = `Pincode: ${listOfHospital.pincode}`
            ul.append(pincode)

            let vaccine = document.querySelector('p')
            vaccine.innerHTML = `Vaccine: ${listOfHospital.vaccine}`
            ul.append(vaccine)

            let avilable_capacity = document.createElement('p')
            avilable_capacity.innerHTML = `No of Avilable Shots: ${listOfHospital.avilable_capacity}`
            ul.append(avilable_capacity)

            let slots = document.createElement('p')
            slots.innerHTML = `Slots: ${listOfHospital.slots}`
            ul.append(slots)

            let hr =  document.createElement('hr')
            slots.append(hr)

        }

        // console.log(listOfHospital)
    }
}).catch(err => {
    console.log("Error");
    console.log(err);
})


