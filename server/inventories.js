const uuid = require('uuid').v4;

function makeInventoryList() {
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    const id4 = uuid();
    const id5 = uuid();
    const id6 = uuid();

    const inventoryList = {};
    const inventories = {
        [id1]: {
            id: id1,
            name: 'Pick Homeroom Music',
            point: 5
        },
        [id2]: {
            id: id2,
            name: 'Homework Pass',
            point: 10
        },
        [id3]: {
            id: id3,
            name: 'Game Time in Class',
            point: 3
        },
        [id4]: {
            id: id4,
            name: 'Bonus Points for Exam',
            point: 25
        },
        [id5]: {
            id: id5,
            name: '$5 Starbucks Gift Card',
            point: 25
        },
        [id6]: {
            id: id6,
            name: 'Virtual Scavenger Hunt',
            point: 100
        }
    };

    inventoryList.containInventory = function containInventory(id) {
        return !!inventories[id];
    };

    inventoryList.getInventories = function getInventories() {
        return inventories;
    };

    inventoryList.addInventory = function addInventory(name, point) {
        const id = uuid();
        inventories[id] = {
            id,
            name,
            point
        };
        return id;
    };

    inventoryList.getInventory = function getInventory(id) {
        return inventories[id];
    };

    return inventoryList;
};

module.exports = {
    makeInventoryList,
};
