const User = require('../../models/user')
const Yelp = require('../../models/yelp')

module.exports = {
    search,
    create,
    index,
    delete: deleteYelpEvent,
    update
}

async function search(req, res) {
    try {
        const key = process.env.REACT_APP_TEMPYELPKEY
        const url = `https://api.yelp.com/v3/businesses/search?location=${req.body.location}&term=${req.body.search}&sort_by=best_match&limit=20`
        const yelpApiDataRequest = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${key}`
            }
        });
        console.log("fetch(url, key):", url, key);
        if (!yelpApiDataRequest.ok) {
            console.error(`Yelp API error: ${yelpApiDataRequest.status} - ${yelpApiDataRequest.statusText}`);
            throw new Error(`Failed to fetch Yelp data: ${yelpApiDataRequest.statusText}`);
        }
        const yelpApiDataResponse = await yelpApiDataRequest.json();
        console.log(yelpApiDataResponse)
        res.status(200).json(yelpApiDataResponse)
    } catch (error) {
        console.log("ERROR:", error)
        res.status(400).json(error);
    }
}

async function create(req, res) {
    try {
        console.log("REQ_BODY FROM CREATE FXN", req.body)
        const userID = await User.findById(req.user._id)
        console.log("USER FROM CONTROLER:", req.user)
        req.body.user = userID;
        const yelpCreateEvent = await Yelp.create(req.body)
        console.log("yelpCreateEvent:", yelpCreateEvent)
        res.status(200).json(yelpCreateEvent)
        console.log("yelpCreateEvent:", yelpCreateEvent)
    } catch (err) { console.log(err)
        res.status(400).json(err);
    }
}



async function index(req, res) {
    if (req.user) {
        const restaurants = await Yelp.find({user : req.user._id})
        res.json(restaurants)
    }
}

async function deleteYelpEvent(req, res) {
    try {
        const yelpEventDlt = await Yelp.findByIdAndDelete(req.params.id)
        if (!yelpEventDlt) {
            return res.status(404).json({ err: "Event not found" });
        }
        res.status(200).json(yelpEventDlt)
    } catch (eror) {
        res.status(400).json(eror);
    }
}

async function update(req, res) {
    try {
        const yelpEvent = await Yelp.findOne({ '_id': req.params.id })
        if (!yelpEvent) {
            return res.status(404).json({ err: "Event not found" });
        }
        yelpEvent.status = req.body.status;
        await yelpEvent.save();
        res.json(yelpEvent)
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
    }
}


