db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $unwind: {
                path: "$pevaci",
            }
        },

        // Stage 2
        {
            $unwind: {
                path: "$pevaci.genres",
            }
        },

        // Stage 3
        {
            $match: {
                "pevaci.genres" : "rock"
            }
        },

        // Stage 4
        {
            $group: {
                _id: "$name",
                popularity : {$avg : "$popularity"}
            }
        },

        // Stage 5
        {
            $project: {
                // specifications
                _id : 0, name:"$_id", popularity : 1
            }
        },

        // Stage 6
        {
            $sort: {
                popularity : -1
            }
        },

        // Stage 7
        {
            $limit: // positive integer
             5
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);