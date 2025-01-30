import fs from "fs";

const writeData = (data, file) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};


const readData = (file) => {
    try {
        console.log(file)
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};



export { readData, writeData };
