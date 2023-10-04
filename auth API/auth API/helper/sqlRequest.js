import db from './sqlConn.js';

const queries = {
    async getModels() {
        return  db.query(`select * from "freezbe.freezbe"`);
    },
    async getComponents() {
        return  db.query(`select * from "freezbe.components"`);
    },
    async getRecipes() {
        return  db.query(`select * from "freezbe.recipe"`);
    },

    async addModel({name, desc, price, series, component, weight}) {
        return  db.query(`insert into "freezbe.freezbe" 
        values 
        ('${name}', 
        '${desc}', 
        ${price}, 
        '${series}', 
        '${component}', 
        ${weight})`);
    },
    async addComponent({name, desc}) {
        return  db.query(`insert into "freezbe.components" 
        values 
        ('${name}', 
        '${desc}')`);
    },
    async addRecipe({name, desc, freezbeModel, stages, test}) {
        return  db.query(`insert into "freezbe.recipe" 
        values 
        ('${name}', 
        '${desc}', 
        '${freezbeModel}', 
        ${stages}, 
        '${test}')`);
    },

    async modifyComponent({id, name, desc}) {
        return  db.query(
        `update "freezbe.components"
        SET "name" = '${name}',
        "desc" = '${desc}'
        WHERE id = ${id}`);
    },
    async modifyRecipe({id, name, desc, freezbeModel, stages, test}) {
        return  db.query(`update "freezbe.recipe"
        SET "name" = '${name}',
        "desc" = '${desc}',
        "freezbe" = '${freezbeModel}',
        "stages" = ${stages},
        "test" = '${test}'
        WHERE id = ${id}`);
    },
    async modifyModel({id ,name, desc, price, series, component, weight}) {
        return  db.query(`update "freezbe.freezbe"
        SET "name" = '${name}',
        "desc" = '${desc}',
        "price" = ${price},
        "type" = '${series}',
        "component" = '${component}',
        "weight" = ${weight}
        WHERE id = ${id}`);
    },

    async deleteModel({id}) {
        return db.query(`delete from "freezbe.freezbe" where id=${id}`)
    },
    async deleteComponent({id}) {
        return db.query(`delete from "freezbe.components" where id=${id}`)
    },
    async deleteRecipe({id}) {
        return db.query(`delete from "freezbe.recipe" where id=${id}`)
    }
}

export default queries;