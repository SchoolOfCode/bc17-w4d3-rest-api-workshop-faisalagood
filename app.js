import express from "express";

import {
  deleteAstronautById,
  updateAstronautById,
  getAstronautsByName,
  replaceAstronautById,
  getAstronauts,
  createAstronaut,
  getAstronautById,
} from "./models/astronauts.js";

const app = express();

app.use(express.json());

/* 

All json responses for this tasks should follow the pattern:

res.json({
  "success": boolean,
  "payload": returnedData
})

*/

// Task 1

/* Write a request handler to return the correct response when a `GET` request is received to `/astronauts`. Choose the appropriate 
function from the imported functions at the top of the `app.js` to get your data. */

app.get('/astronauts', async (req, res) => {
	if (req.query.name) {
    let astrosByName = await getAstronautsByName(req.query.name);

		if (astrosByName) {
			res.json({
				success: true,
				payload: astrosByName[0]
			})
		} else {
			res.json({
				success: false,
				payload: `Cannot GET astronauts with name ${req.query.name} please blame Tom for not normalising the name fields if your submitted name was all lowercase, hes working from a dodgy van somewhere I think :)`
			})
		}
	} else {

		let allAstros = await getAstronauts();
		
		if (allAstros) {
			res.json({
				success: true,
				payload: await getAstronauts()
			})
		} else {
			res.json({
				success: false,
				payload: `Cannot GET astronauts, blame Tom Pauley at tom.pauley@schoolofcode.co.uk and tell him Other Faisal sent you.`
			})
		}
	}
})

// Task 2

/* Write a request handler to return the correct response and perform the correct action when a `POST` request is received to 
`/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action. */

app.post('/astronauts', async (req, res) => {
	let postedAstro = await createAstronaut(req.body);
	
	if (postedAstro) {
		res.json({
			success: true,
			payload: await createAstronaut(req.body)
		});
	} else {
		res.json({
			success: false,
			payload: `Cannot POST astronaut with body ${req.body}`
		})
	}
})

// Task 3

/* Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the 
appropriate path. */

app.get('/astronauts/:id', async (req, res) => {
	let astroman = await getAstronautById(req.params.id);
	if (astroman) {
		res.json({
			success: true,
			payload: astroman
		});
	} else {
		res.json({
			success: false,
			payload: `Cannot GET astronaut with id ${req.params.id}`
		})
	}
})

// Task 4

/* Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.put('/astronauts/:id', async (req, res) => {
	let replacedAstro = await replaceAstronautById(req.params.id, req.body);

	if (replacedAstro) {
		res.json({
			success: true,
			payload: replacedAstro
		})
	} else {
		console.error(replacedAstro);
		res.json({
			success: false,
			payload: `Cannot PUT astronaut with id ${req.params.id}`
		})
	}
})

// Task 5

/* Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.delete('/astronauts/:id', async (req, res) => {
	let astroDeleted = await deleteAstronautById(req.params.id);
	
	if (astroDeleted) {
		res.json({
			success: true,
			payload: astroDeleted
		});
	} else {
		res.json({
			success: false,
			payload: `Cannot DELETE astronaut with id ${req.params.id}`

		})
	}
})

// Task 6

/* Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.patch('/astronauts/:id', async (req, res) => {
	let patchedAstronaut =  await updateAstronautById(req.params.id, req.body);

	if (patchedAstronaut) {
		res.json({
			success: true,
			payload: patchedAstronaut
		})
	} else {
		res.json({
			success: false,
			payload: `Cannot PATCH astronaut with id ${req.params.id}`
		})
	}
	
})

export default app;
