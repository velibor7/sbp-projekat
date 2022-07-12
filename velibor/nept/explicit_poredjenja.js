db.getCollection("tracks").aggregate(

    // Pipeline
    [
    	//Stage 0
    	{
    	$lookup: // Equality Match
            {
                from: "artists",
                localField: "id_artists",
                foreignField: "_id",
                as: "pevaci"
            }
        },
        // Stage 1
        {
            $match: {
                // enter query here
                "pevaci.followers": {$gt: 2000}
            }
        },

        // Stage 2
        {
            $group: {
                _id: "$explicit",
                avg_dancebility: {$avg: "$danceability"},
                avg_tempo: {$avg: "$tempo"},
                avg_loudness: {$avg: "$loudness"},
                count: { $sum: 1}
                //<field1>: { <accumulator1> : <expression1> },
                //...
            }
        },

        // Stage 3
        {
            $project: {
                // specifications
                "_id": 0,
                "explicit": "$_id",
                avg_dancebility: "$avg_dancebility",
                avg_tempo: "$avg_tempo",
                avg_loudness: "$avg_loudness",
                count: "$count"
                
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
