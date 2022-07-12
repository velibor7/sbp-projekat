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
            
            // Uncorrelated Subqueries
            // (supported as of MongoDB 3.6)
            // {
            //    from: "<collection to join>",
            //    let: { <var_1>: <expression>, …, <var_n>: <expression> },
            //    pipeline: [ <pipeline to execute on the collection to join> ],
            //    as: "<output array field>"
            // }
            
            // Correlated Subqueries
            // (supported as of MongoDB 5.0)
            // {
            //    from: "<foreign collection>",
            //    localField: "<field from local collection's documents>",
            //    foreignField: "<field from foreign collection's documents>",
            //    let: { <var_1>: <expression>, …, <var_n>: <expression> },
            //    pipeline: [ <pipeline to run> ],
            //    as: "<output array field>"
            // }
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
                path: "$pevaci.genres"
            }
        },

        // Stage 4
        {
            $match: {
                "pevaci.genres" : "techno"
                
            }
        },

        // Stage 5
        {
            $group: {
                _id: {date : {$year : "$release_date"}, name: "$name" },
                popularity : {$avg : "$popularity"}
            }
        },

        // Stage 6
        {
            $project: {
                // specifications
                _id : 0, name : "$_id.name", date : "$_id.date", popularity : 1
            }
        },

        // Stage 7
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