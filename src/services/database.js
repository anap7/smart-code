import { connectToDatabase } from '../utils/connection';
import { createCompletedDate } from '../services/helpers';
const ObjectId = require('mongodb').ObjectId;

export async function generateQRCodeNumber() {
  try {
    const db = await connectToDatabase();

    const collection = db.collection('orders');

    let randomNumber = 420000;
    let qrcodeNumberString = `QR${randomNumber}`;
    const codeNumberList = [];

    const searchResult = await collection.find();

    const arr = await searchResult.toArray();

    for (let index in arr) {
      codeNumberList.push(arr[index].codeNumber);
    }

    do  {
      const number = ((Math.floor(Math.random() * 700) + 1) * (Math.floor(Math.random() * 5) + 1));
      randomNumber = randomNumber + number;
      qrcodeNumberString = `QR${randomNumber}`;
    } while (codeNumberList.includes(qrcodeNumberString));

    return JSON.stringify({ success: 'Novo número gerado', codeNumber: qrcodeNumberString });
  } catch (e) {
    return JSON.stringify({ error: 'Não encontrado' });
  }
}

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

export async function attachedOrder(data, id) {
  try {
    const db = await connectToDatabase();
    const currentDate = createCompletedDate();

    const collection = db.collection('orders');
    
    const table = collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: { 
          ...data,
          orderAttachedAt: currentDate,
          ordersUpdateList: [
            {
              orderNumber: data?.orderNumber,
              updatedAt: currentDate,
              status: 'attached',
            }
          ] 
        },
      },
      { upsert: true }
    )

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
        $set: { 
          ...data
        },
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