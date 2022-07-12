db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                "pevaci.name" : "Eminem"
                
            }
        },

        // Stage 2
        {
            $group: {
                "_id": "$explicit",
                count : {$sum : 1},
                avg_popularity : {$avg : "$popularity"}
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);