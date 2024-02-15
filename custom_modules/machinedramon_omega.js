const { mysqlSettings } = require('../config.json');
const mysql = require("mysql2/promise");

const db = mysql.createPool(mysqlSettings);

module.exports = { addWant, addHave, deleteWant, deleteHave, updateWant, updateHave };

async function addWant(options, discordID) {

    try {
        const [cardnumber, qtd] = await destructure(options);
        await db.query(`INSERT INTO Discord_Wants VALUES (?, ?, ?);`, [cardnumber, discordID, qtd]);
    }
    catch {
        return "An error has occured!";
    }

    return "Want added successfully!";
}

async function addHave(options, discordID) {

    try {
        const [cardnumber, qtd] = await destructure(options);
        await db.query(`INSERT INTO Discord_Haves VALUES (?, ?, ?);`, [cardnumber, discordID, qtd]);
    }
    catch {
        return "An error has occured!";
    }

    return "Have added successfully!";
}

async function deleteWant(cardnumber, discordID) {

    try {
        await db.query(`DELETE FROM Discord_Wants WHERE cardnumber = ? AND discord = ?`, [cardnumber, discordID]);
    }
    catch {
        return "An error has occured!";
    }

    return "Want deleted succesfully!";
}

async function deleteHave(cardnumber, discordID) {

    try {
        await db.query(`DELETE FROM Discord_Haves WHERE cardnumber = ? AND discord = ?`, [cardnumber, discordID]);
    }
    catch {
        return "An error has occured!";
    }

    return "Have deleted succesfully!";
}

async function updateWant(options, discordID) {

    try {
        const [cardnumber, qtd] = await destructure(options);
        
        if(qtd > 0)
            await db.query(`UPDATE Discord_Wants SET qtd = ? WHERE cardnumber = ? AND discord = ?`, [qtd, cardnumber, discordID]);
        else
            return await deleteWant(cardnumber, discordID);
    }
    catch {
        return "An error has occured!";
    }

    return "Want updated successfully!";
}

async function updateHave(options, discordID) {

    try {
        const [cardnumber, qtd] = await destructure(options);
        
        if(qtd > 0)
            await db.query(`UPDATE Discord_Haves SET qtd = ? WHERE cardnumber = ? AND discord = ?`, [qtd, cardnumber, discordID]);
        else
            return await deleteHave(cardnumber, discordID);
    }
    catch {
        return "An error has occured!";
    }

    return "Want updated successfully!";
}

async function destructure(optionArray) {

    const qtd = await optionArray.find(item => item.name === "quantity").value;
    const cardnumber = await optionArray.find(item => item.name === "card_id").value.toUpperCase();

    return [cardnumber, qtd];
}