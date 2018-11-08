// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({message: 'Welcome to the Node.js Express REST API!'});
    });

    // Display all users
    app.get('/users', (request, response) => {
		
        pool.query('SELECT * FROM customers', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
		
		
		
    });
	
	
	 // Display all users
    app.get('/login', (request, response) => {
		
		var input = request.query.input;
		
		let MailidsPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       let MobileidPattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

		
		if (MailidsPattern.test(input)) {
			 pool.query('SELECT * FROM customers where EmailID ="'+input+'" ', (error, result) => {
           if (error) throw error;

          response.send(result);
      });
			
		}else {		
		if(MobileidPattern.test(input)){
			 pool.query('SELECT * FROM customers where ContactNo ="'+input+'" ', (error, result) => {
           if (error) throw error;

          response.send(result);
		 
      });
		
		}
		
	}
	
		
		//console.log('input value '+input);
		
     
				
		
    });

	//count check 
	
	
	 app.get('/checkAlreadyExist', (request, response) => {
		
		var input = request.query.input;
		
		let MailidsPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       let MobileidPattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

		
		if (MailidsPattern.test(input)) {
			 pool.query('SELECT COUNT(*) as count FROM customers where EmailID ="'+input+'" ', (error, results) => {
           if (error) throw error;
          response.send(results);
      });
			
		}else {		
		if(MobileidPattern.test(input)){
			 pool.query('SELECT COUNT(*) as count FROM customers where ContactNo ="'+input+'" ', (error, results) => {
           if (error) throw error;
		   

          response.send(results);
		 
      });
		
		}
		
	}
	
		
		//console.log('input value '+input);
		
     
				
		
    });
	
	
	
	//insert product
	
	 // Add a new user
    app.post('/placeOrder', (request, response) => {
        pool.query('INSERT INTO orderdetails SET ?', request.body, (error, result) => {
			
            if (error) throw error;

					console.log("orderrrrr"+JSON.Stringfy(request.body.order_date));
					
			
			pool.query('INSERT INTO ref_orderdetails (order_date,customer_id) values("'+request.body.order_date+'","'+request.body.customer_id+'") ',(error,result)=>{
				
				
            response.status(201).send(`Product placed  with  order ID: ${result}`);
			
			});
			});
			
        });
    
		
		
		
	
	app.get('/getAllProducts',(request,response) =>{
		
		pool.query('select * from product_temp p  left join product_review pr on(p.product_id = pr.product_id) join product_image pi on (p.product_id=pi.ProductID) order by Product_rating desc',(error,result) =>{
			if(error) throw error;
		response.send(result);	
		});
	});
	
	
	
	app.get('/getOrderDetails',(request,response) =>{
		
		var CustomerID = request.query.CustomerID;
		pool.query('SELECT * FROM orderdetails where CustomerID ="'+CustomerID+'"',(error,result) =>{
			if(error) throw error;
			
			response.send(result);
		}
	}
	
	
	

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;