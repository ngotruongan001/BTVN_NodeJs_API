const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const FoodModel = require('./models/FoodModel.js');

mongoose.connect(
    'mongodb+srv://dbUser:ngotruongan21@cluster0.kh8h0.mongodb.net/TEST?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to MongoDB');
    },
);

app.use(express.json());
app.use(cors());
app.use(cors({ origin: true, credentials: true }));

// api
// POST
app.post('/api/food', async (req, res) => {
    try {
        const newFood = new FoodModel(req.body);
        const newFoodNew = await newFood.save();
        return res.status(200).json(newFoodNew);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
});

app.get('/api/foods', async (req, res) => {
    try {
        const foodList = await FoodModel.find();
        return res.status(200).json(foodList);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
});

app.get('/api/food/:id', async (req, res) => {
    try {
        const foodObj = await FoodModel.findById(req.params.id);
        return res.status(200).json(foodObj);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
});

app.put('/api/food/:id', async (req, res) => {
    try {
        const foodNew = await FoodModel.findById(req.params.id);
        await foodNew.updateOne({ $set: req.body });
        res.status(200).json(foodNew);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/api/food/:id', async (req, res) => {
    try {
        const postObj = await FoodModel.findById(req.params.id);
        await postObj.deleteOne();
        res.status(200).json(postObj);
    } catch (err) {
        res.status(500).json(err);
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Backend server is running with Port ${PORT}`);
});
