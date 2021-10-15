import { connectToDatabase } from '../utils/connection';
const ObjectId = require('mongodb').ObjectId;

export async function saveQRCode(data) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('qrcode');

    const result = await collection.insertOne(data);

    return result;

  } catch (e) {
    return JSON.stringify({ error: 'Não encontrado' });
  }
}

export async function getQRCode(qrcode) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('qrcode');

    const result = await collection.findOne(
      { QRCodeNumber: qrcode }
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

export async function saveOrder(data) {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    const table = await collection.insertOne(data);

    return table;

  } catch (error) {
    return { error : error };
  }
}