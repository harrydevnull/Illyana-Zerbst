function submitCheckout() {
   $('#myModal').modal()

   return false;
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
 }

 function triggerEvent(selector, event) {
   let evt = new Event(event, {
      bubbles: true,
      cancelable: true
   })

   document.querySelector(selector).dispatchEvent(evt);
 }


function fillWithSimulation(selector, newValue, timeout) {
   return new Promise((resolve, reject) => {
      const time = timeout || getRandomInt(100, 150);
      let idx = 0;

      const iv = setInterval(() => {
         if (idx > newValue.length) {
            clearInterval(iv);
            triggerEvent(selector, 'input');
            resolve();
            return;
         } else {
            try {
               $(selector).val(newValue.substring(0, idx++));
            } catch(err) {
               reject(err);
            }
         }
      }, time);
   })
}

function fillFromList(selector, newValue) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         try {
            $(selector).val(newValue);
            triggerEvent(selector, 'change');
            resolve();
         } catch(err) {
            reject(err);
         }
      }, 250);
   })
   
}

// function autoFill() {
//    Promise.all([
//       fillWithSimulation('#firstName', 'Josh'),
//       fillWithSimulation('#lastName', 'McLaren'),
//       fillWithSimulation('#username', 'JML'),
//       fillWithSimulation('#email', 'josh-mclaren@eval.corp', 50),
//       fillWithSimulation('#address', '280 Passaic Street', 80),
//       fillFromList('#country', 'United States'),
//       fillFromList('#state', 'California'),
//       fillWithSimulation('#zip', '90210'),
//       fillWithSimulation('#cc-name', 'Dr. Josh McLaren', 80),
//       fillWithSimulation('#cc-number', '5256 8695 3208 3944', 80),
//       fillWithSimulation('#cc-expiration', '12/2022'),
//       fillWithSimulation('#cc-cvv', '016')
//    ]).then(() => {
//       console.log('filled all elements!');
//    }).catch(console.error)
// }

function getCreditCardData() {
   let years = [2019, 2020, 2021, 2022, 2023]

   let cc = `${faker.random.number() % 10000} ${faker.random.number() % 10000} ${faker.random.number() % 10000} ${faker.random.number() % 10000}`
  
   let month = Math.floor(Math.random() * 12) + 1;
   let year = years[Math.floor(Math.random() * 5)];
   let exp = `${month}/${year}`;
  
   let cvv = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

   return {cc, exp, cvv};
}

function autoFill() {
   let firstName = faker.name.firstName();
   let lastName = faker.name.lastName();
   let username = `${firstName}.${lastName}${Math.floor(Math.random() * 10) + 1}${Math.floor(Math.random() * 10) + 1}`;

   let {cc, exp, cvv} = getCreditCardData();

   Promise.all([
      fillWithSimulation('#firstName', firstName),
      fillWithSimulation('#lastName', lastName),
      fillWithSimulation('#username', username),
      fillWithSimulation('#email', faker.internet.email(), 50),
      fillWithSimulation('#address', faker.address.streetAddress(), 80),
      fillFromList('#country', 'United States'),
      fillFromList('#state', 'California'),
      fillWithSimulation('#zip', faker.address.zipCode()),
      fillWithSimulation('#cc-name', `${faker.name.prefix()} ${firstName} ${lastName}`, 80),
      fillWithSimulation('#cc-number', cc, 80),
      fillWithSimulation('#cc-expiration', exp),
      fillWithSimulation('#cc-cvv', cvv)
   ]).then(() => {
      console.log('filled all elements!');
   }).catch(console.error)
}