const productModel = require("../models/ProductModel");

module.exports.getProducts = async (req, res) => {
    try {
        const todo = await productModel.find().lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports.getProductById = async (req, res) => {
    try {
        const todo = await productModel.findById(req.params.id).lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports.saveProducts = async (req, res) => {
    const { text } = req.body;

    try {
        const todo = await productModel.create({ text });
        console.log("Added Successfully...");
        console.log(todo);
        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports.deleteProductstesting = async (req, res) => {
    console.log("id ---> ", req.params.id);

    try {
        const todo = await productModel.findByIdAndDelete(req.params.id).lean();
        console.log("Deleted Successfully...");
        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports.updateProducts = async (req, res) => {
    const { _id, text } = req.body;

    try {
        const todo = await productModel.findByIdAndUpdate(_id, { text }).lean();
        console.log("Updated Successfully...");
        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}