db.getCollection("spotify").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $unwind: {
                "path" : "$pevaci"
                
            }
        },

        // Stage 2
        {
            $unwind: {
                "path" : "$pevaci.genres"
            }
        },

        // Stage 3
        {
            $match: {
                "pevaci.genres" : "techno" 
            }
        },

        // Stage 4
        {
            $group: {
                _id: {date : {$year : "$release_date"}, name: "$name" },
                popularity : {$avg : "$popularity"}
            }
        },

        // Stage 5
        {
            $project: {
                // specifications
                _id : 0, name : "$_id.name", date : "$_id.date", popularity : 1
            }
        },

        // Stage 6
        {
            $sort: {
               
                date : -1,
                popularity : -1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);