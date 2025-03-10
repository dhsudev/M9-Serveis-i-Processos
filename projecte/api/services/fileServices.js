import fs from "fs";
import logServices from "./logServices.js";

const writeData = (file, data) => {
    try {
        logServices.info(`Trying add in ${file} this object: `);
        fs.writeFileSync(file, JSON.stringify(data));
        logServices.success(`Data added successfully in ${file}`);
    } catch (error) {
        logServices.error(error);
    }
};

// Not useful bc the new data needs to be inside the list
const appendData = (file, data) => {
    try {
        logServices.info(`Trying add in ${file} this object: `);
        console.log(data);
        fs.writeFileSync(file, JSON.stringify(data), { flag: 'a+' });
        logServices.success(`Data added successfully in ${file}`);
    } catch (error) {
        logServices.error(error);
    }
};

const readData = (file) => {
    try {
        logServices.info(`Reading data from ${file}`);
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (error) {
        logServices.error(error);
    }
};



export { readData, writeData, appendData };
