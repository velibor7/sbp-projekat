db.getCollection("tracks").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $lookup: {
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
        },

        // Stage 2
        {
            $match: {
                // enter query here
                "pevaci.followers": {$gt: 1000},
                            "name": /^A/
            }
        },

        // Stage 3
        {
            $group: {
                "_id" :{date: {$year : "$release_date"}},
                            avg_length: {$avg: "$duration_ms"}
            }
        },

        // Stage 4
        {
            $sort: {
            "_id.date": -1
            }
        },

        // Stage 5
        {
            $project: {
             date: "$_id.date",
                            avg_length: 1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
