# Test case generator API

### To Run

1. Create a `.env` in `/backend/`
   1. add `PORT=5000` to `.env`
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to run the server

### Implemented routes

| Route    | Method | Status Code | Return                             |
| -------- | ------ | ----------- | ---------------------------------- |
| /        | GET    | 200         | `{message: 'Test Case Generator'}` |
| /api/v1/ | GET    | 200         | `{message: 'Test Case Generator'}` |

To add routes add code to the `src/app/routes/index.js` file
General format of a route is

```
  router.<METHOD>('<route_name>', (req, res) => {
    // perform task

    //send a json response
  	res.json({
  		message: 'Test Case Generator',
  	});
  })
```
