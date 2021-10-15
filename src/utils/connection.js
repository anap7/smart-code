const { MongoClient } = require('mongodb');
const { MONGODB_URI, DATABASE } = process.env

if (!MONGODB_URI || !DATABASE) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

async function connectToDatabase() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  const client = new MongoClient(MONGODB_URI, opts);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    return client.db(DATABASE);

  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  connectToDatabase
}