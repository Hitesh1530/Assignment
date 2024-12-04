const { MongoClient } = require('mongodb');

// MongoDB connection URI and database name
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string if using MongoDB Atlas
const dbName = 'FoxStudios';

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select database and collection
        const db = client.db(dbName);
        const collection = db.collection('FoxStudios');

        // CRUD operations

        // Create (Insert Documents)
        const insertResult = await collection.insertMany([
            { name: "Harry potter and the order of the phonenix", img:"https://bit.ly/2lcnSwz", summary: "Harry Potter and Dumbledore's warning about the returb of Lord Voldemort" },
            { name: "The Land of Rings: The Fellowship of the Ring", img:"https://bit.ly/2tC1Lcg", summary: "A young hobbit, frodo, who has found the One Ring that belongs to the Dark Lord Sauron" },
            { name: "Avengers: Endgame", img:"https://bit.ly/2Pzczlb", summary: "Adrift in space with no food or water, Tony stark sends message to Pepper pots as his oxygen supply starts to " }
        ]);
        console.log("Inserted Documents:", insertResult.insertedCount);

        // Read (Find Documents)
        const documents = await collection.find({}).toArray();
        console.log("Found Documents:", documents);

        // Update (Modify Documents)
        const updateResult = await collection.updateOne(
            { name: "Harry potter and the order of the phonenix" },
            { $set: { name : "Harry Potter" } }
        );
        console.log("Updated Documents:", updateResult.modifiedCount);

        // Delete (Remove Documents)
        const deleteResult = await collection.deleteOne({ name: "Avengers: Endgame" });
        console.log("Deleted Documents:", deleteResult.deletedCount);

        // Read (FindOne Documents)
        const findOneResult = await collection.findOne({ name: "The Land of Rings: The Fellowship of the Ring" });
        if (findOneResult) {
            console.log("Found One Document:", findOneResult);
        } else {
            console.log("No document found");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed");
    }
}

main().catch(console.error);
