const { client,
    createTables,
    createCustomer,
    createRestaurant,
    fetchCustomer,
    fetchRestaurant,
    createReservation,
    fetchReservation,
    destroyReservation
 } = require('./db');


const express = require('express');
const app = express();
app.use(express.json());


app.get('/api/customer', async(req, res, next)=> {
    try {
      res.send(await fetchCustomer());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.get('/api/restaurant', async(req, res, next)=> {
    try {
      res.send(await fetchRestaurant());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.get('/api/Reservation', async(req, res, next)=> {
    try {
      res.send(await fetchReservation());
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/api/vacations/:id', async(req, res, next)=> {
    try {
      await destroyReservation(req.params.id);
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/api/vacation', async(req, res, next)=>{
    try{
        res.sendStatus(201).send(await createReservation(req.param.id));
        
    }
    catch(ex){
        next(ex);
    }
  });

const init = async()=> {
await client.connect();
console.log('connected to database');
await createTables();
console.log('tables created');
const [Mike, Joe, Jesse, OutBack, OliveGarden, Chipotle, Panera] = await Promise.all([
createCustomer('Mike'),
createCustomer('Joe'),
createCustomer('Jesse'),
createRestaurant('OutBack'),
createRestaurant('Olive Garden'),
createRestaurant('Chipotle'),
createRestaurant('Panera')
]);
console.log(`Jesse has an id of ${Jesse.id}`);
console.log(`OutBack has an id of ${OutBack.id}`);
console.log(await fetchCustomer());
console.log(await fetchRestaurant());

await Promise.all([
createReservation({ customer_id: Mike.id, place_id: OutBack.id, date: '04/01/2024'}),
createReservation({ customer_id: Joe.id, place_id: Panera.id, date: '04/15/2024'}),
createReservation({ customer_id: Jesse.id, place_id: Chipotle.id, date: '07/04/2024'}),
createReservation({ customer_id: Jesse.id, place_id: OutBack.id, date: '10/31/2024'}),
]);
const reservation = await fetchReservation();
console.log(reservation);
await destroyReservation(reservation[0],id);
console.log(await fetchReservation());

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));  

};

init();




