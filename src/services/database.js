import { connectToDatabase } from '../utils/connection';
const ObjectId = require('mongodb').ObjectId;

export async function saveQRCode(data) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const result = await collection.insertOne(data);

    return result;

  } catch (e) {
    return JSON.stringify({ error: 'Não encontrado' });
  }
}

export async function saveOrder(data) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const table = await collection.insertOne(data);

    return table;

  } catch (error) {
    return { error: error };
  }
}

export async function updateOrder(data, id) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const table = collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: { ...data },
      },
      { upsert: true }
    )

    return table;

  } catch (error) {
    return { error: error };
  }
}

export async function getQRCode(searchObj) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const result = await collection.findOne(
      searchObj
    );

    return result;

  } catch (error) {
    return { error: error };
  }
}

export async function getOrder(orderNumber) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const result = await collection.findOne(
      { orderNumber: orderNumber }
    );

    return result;

  } catch (error) {
    return { error: error };
  }
}

export async function getOrderData(searchObj) {

  if (Object.keys(searchObj).length == 0) {
    return { error: "Void" };
  }

  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const result = await collection.findOne(
      { ...searchObj }
    );

    if (!result) {
      return { error: "Not Found" };
    }

    return result;

  } catch (error) {
    return { error: error };
  }
}