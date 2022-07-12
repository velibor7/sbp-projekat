db.getCollection("tracks").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $lookup: // Equality Match
            {
                from: "artists",
                localField: "id_artists",
                foreignField: "_id",
                as: "pevaci"
            }
            
        },
        {
            $unwind : {
                path : "$pevaci"
            }
        },

        // Stage 2
        {
            $match: {
                "pevaci.name" : "Eminem"
                
            }
        },

        // Stage 3
        {
            $group: {
                "_id": "$explicit",
                count : {$sum : 1},
                avg_popularity : {$avg : "$popularity"}
                
                //<field1>: { <accumulator1> : <expression1> },
                //...
            }
        },

        // Stage 4
        {
            $project: {
                _id : 0,
                explicit : "$_id",
                "count" : 1,
                "avg_popularity" : 1
                
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);