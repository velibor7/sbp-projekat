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

        // Stage 2
        {
            $unwind: {
                path: "$pevaci",
            }
        },

        // Stage 3
        {
            $unwind: {
                path: "$pevaci.genres",
            }
        },

        // Stage 4
        {
            $match: {
                "pevaci.genres" : "rock"
            }
        },

        // Stage 5
        {
            $group: {
                _id: "$name",
                popularity : {$avg : "$popularity"}
            }
        },

        // Stage 6
        {
            $project: {
                // specifications
                _id : 0, name:"$_id", popularity : 1
            }
        },

        // Stage 7
        {
            $sort: {
                popularity : -1
            }
        },

        // Stage 8
        {
            $limit: 
             5
        }
    ],

);