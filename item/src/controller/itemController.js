const path = require('path')
const fs = require('fs')

const itemsPath = path.join(__dirname, '../../../db', 'itemsDb.json')
// post request
const createItem = async (req, res) => {
    try {
        const requestItem = req.body
        let itemsData;
        itemsData = await fs.promises.readFile(itemsPath, "utf8");
        if (!itemsData) {
          itemsData = "[]";
        }
        const items = JSON.parse(itemsData);
        const highestId = items.reduce((maxId, item) => Math.max(maxId, parseInt(item.id)), 0);
        const id = highestId + 1;
        const newItem = {
            id, name: (requestItem.name).toLowerCase(), price: requestItem.price, size: (requestItem.size).toLowerCase()
        }
        items.push(newItem);
        await fs.promises.writeFile(
          itemsPath,
          JSON.stringify(items, null, 2),
          "utf8"
        );
        return res.status(201).send({
            message: 'Item created successful',
            data: {item: newItem}
        })
    } catch (error) {
        console.error(error)
    }
}

// get request
const getItems = async (req, res) => {
    try {
        const {name} = req.query;
    
        const itemsData = await fs.promises.readFile(itemsPath, "utf8");
        let items = JSON.parse(itemsData);
        if (name){
            const nameCase = name.toLowerCase();
            items = items.filter((item) => item.name === nameCase )
        } 
        return res.status(200).send({
            message: 'Item fetched successfully',
            data: items
        })
    } catch (error) {
        console.error(error)
    }
}

const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const convertId = Number(id)
        const itemsData = await fs.promises.readFile(itemsPath, "utf8");
        let items = JSON.parse(itemsData);
        const findItem = items.find((item) => item.id === convertId)
        if (findItem){
            return res.status(200).send({
                message: 'Item Fetched',
                data: {item: findItem}
            })
        } else{
            res.status(404).send({
                message: 'Item not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
}

// update item

const updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const convertId = Number(id)
        const itemsData = await fs.promises.readFile(itemsPath, "utf8");
        let items = JSON.parse(itemsData);
        const foundIndex = items.findIndex((item) => item.id === convertId) 
        const update = req.body;
        if (foundIndex < 0) {
            return res.status(404).send({
                message: `id : ${id} not found`
            })
        }
        // items[foundIndex] = {
        //     id: convertId, name: update.name.toLowerCase(), price: update.price, size: update.size.toLowerCase()
        // }
        
        items[foundIndex] = {...items[foundIndex], ...update}
        await fs.promises.writeFile(itemsPath, 
            JSON.stringify(items, null, 2), 'utf8');
        return res.status(200).send({
            message: "Item updated Successfully",
            data: {item: items} 
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        const convertId = Number(id)
        const itemsData = await fs.promises.readFile(itemsPath, "utf8");
        let items = JSON.parse(itemsData);
        const foundIndex = items.findIndex((item) => item.id === convertId)
        if (foundIndex < 0) {
            return res.status(404).send({
                message: `id : ${id} not found`
            })
        }
        const deleteItem = items.splice(foundIndex, 1)[0]
        await fs.promises.writeFile(itemsPath,
            JSON.stringify(items, null, 2), 'utf8')
        
        return res.status(200).send({
            message: 'Item deleted successfully',
            data: {deletedItem: deleteItem}
        })

    } catch (error) {
        console.error(error)
    }
}






module.exports = {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}