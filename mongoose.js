const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test', {

        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

// module.exports = connectDB;


// const mongoose = require('mongoose');


// Define the schema for Person
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
async function createAndSavePerson() {
    try {
        const person = new Person({
            name: 'John Doe',
            age: 30,
            favoriteFoods: ['Pizza', 'Pasta'],
        });
        const savedPerson = await person.save();
        console.log("Saved person:", savedPerson);
    } catch (err) {
        console.error("Error saving person:", err);
    }
}

// Create Many Records with model.create()
async function createManyPeople(arrayOfPeople) {
    try {
        const people = await Person.create(arrayOfPeople);
        console.log("Created people:", people);
    } catch (err) {
        console.error("Error creating people:", err);
    }
}

// Use model.find() to Search Your Database
async function findPeopleByName(name) {
    try {
        const people = await Person.find({ name });
        console.log("People found:", people);
    } catch (err) {
        console.error("Error finding people by name:", err);
    }
}

// Use model.findOne() to Return a Single Matching Document from Your Database
async function findOneByFavoriteFood(food) {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log("Person found with favorite food:", person);
    } catch (err) {
        console.error("Error finding person by favorite food:", err);
    }
}

// Use model.findById() to Search Your Database By _id
async function findPersonById(personId) {
    try {
        const person = await Person.findById(personId);
        console.log("Person found by ID:", person);
    } catch (err) {
        console.error("Error finding person by ID:", err);
    }
}

// Perform Classic Updates by Running Find, Edit, then Save
async function addFoodAndSave(personId, food) {
    try {
        const person = await Person.findById(personId);
        person.favoriteFoods.push(food);
        const updatedPerson = await person.save();
        console.log("Updated person:", updatedPerson);
    } catch (err) {
        console.error("Error updating person:", err);
    }
}

// Perform New Updates on a Document Using model.findOneAndUpdate()
async function updateAgeByName(personName, newAge) {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },
            { age: newAge },
            { new: true }
        );
        console.log("Updated age by name:", updatedPerson);
    } catch (err) {
        console.error("Error updating age by name:", err);
    }
}

// Delete One Document Using model.findByIdAndRemove
async function deletePersonById(personId) {
    try {
        const deletedPerson = await Person.findByIdAndRemove(personId);
        console.log("Deleted person by ID:", deletedPerson);
    } catch (err) {
        console.error("Error deleting person by ID:", err);
    }
}

// MongoDB and Mongoose - Delete Many Documents with model.deleteMany()
async function deleteManyByName(name) {
    try {
        const result = await Person.deleteMany({ name });
        console.log("Deleted people with name:", result);
    } catch (err) {
        console.error("Error deleting people by name:", err);
    }
}

// Chain Search Query Helpers to Narrow Search Results
async function findPeopleWhoLikeFood(food) {
    try {
        const people = await Person.find({ favoriteFoods: food })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec();
        console.log("People who like food:", people);
    } catch (err) {
        console.error("Error finding people who like food:", err);
    }
}