let collection;

export function init(db) {
  collection = db.collection("college");
}

export const getAllStudents = async () =>
  await collection.find().toArray()

export const addStudent = async ({_id, name, password}) => {
  const exists = await collection.findOne({_id});
  if (exists) {
    return false;
  }
  await collection.insertOne({_id, name, password, scores: {}});
  return true;
}

export const deleteStudent = async (_id) =>
  await collection.findOneAndDelete({_id})

export const findStudent = async (_id) =>
  await collection.findOne({_id})

export const updateStudent = async (_id, data) =>
  await collection.findOneAndUpdate(
    {_id},
    {$set: data},
    {returnDocument: 'after'}
  )

export const addScore = async (_id, {exam, score}) =>
  await collection.findOneAndUpdate(
    {_id},
    {$set: {[`scores.${exam}`]: score}}
  )


export const getStudentsByName = async (name) =>
  await collection.find({name}).toArray()
