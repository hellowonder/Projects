const ul = document.querySelector('ul');

var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1) //January is 0!
var yyyy = today.getFullYear();

const getVaccineSlotInfo = async() => {
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=363&date=${dd}-${mm}-${yyyy}`;
    const fetchedData = await axios.get(url);

    for(let listOfHospital of fetchedData.data.sessions){
        if((listOfHospital.available_capacity_dose1 > 0) || (listOfHospital.available_capacity_dose2 > 0)){

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

            let available_capacity_dose1 = document.createElement('p')
            available_capacity_dose1.innerHTML = `Capacity Dose1: ${listOfHospital.available_capacity_dose1}`
            ul.append(available_capacity_dose1)

            let available_capacity_dose2 = document.createElement('p')
            available_capacity_dose2.innerHTML = `Capacity Dose2: ${listOfHospital.available_capacity_dose2}`
            ul.append(available_capacity_dose2)

            let available_capacity = document.createElement('p')
            available_capacity.innerHTML = `No of Avilable Shots: ${listOfHospital.available_capacity}`
            ul.append(available_capacity)

            let fee = document.createElement('p')
            fee.innerHTML = `Fee Type: ${listOfHospital.fee_type}`
            ul.append(fee)

            let min_age_limit = document.createElement('p')
            min_age_limit.innerHTML = `Minimum Age Limit: ${listOfHospital.min_age_limit}`
            ul.append(min_age_limit)

            let slots = document.createElement('p')
            slots.innerHTML = `Slots: ${listOfHospital.slots}`
            ul.append(slots)

            let hr =  document.createElement('hr')
            slots.append(hr)

            console.log(listOfHospital)

        }

        // console.log(listOfHospital)
    }

}

getVaccineSlotInfo()