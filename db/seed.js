const db = require("./");
const format = require("pg-format");
const { shopsObj, formatTreasures } = require("./utils");

const seed = ({ shopData, treasureData }) => {
  return db.query(`DROP TABLE IF EXISTS treasures;`).then(() => {
    return db
      .query(`DROP TABLE IF EXISTS shops;`)
      .then(() => {
        return db.query(`CREATE TABLE shops (
				shop_id SERIAL PRIMARY KEY,
				shop_name VARCHAR NOT NULL,
				owner VARCHAR NOT NULL,
				slogan VARCHAR 
			);`);
      })
      .then(() => {
        return db.query(`CREATE TABLE treasures (
			treasure_id SERIAL PRIMARY KEY,
			treasure_name VARCHAR NOT NULL,
			colour VARCHAR NOT NULL,
			age INT,
			cost_at_auction FLOAT,
			shop_id INT REFERENCES shops(shop_id)
			);`);
      })
      .then(() => {
        const formattedShops = shopData.map((shop) => {
          return [shop.shop_name, shop.owner, shop.slogan];
        });
        const queryStr = format(
          `
				INSERT INTO shops
				(shop_name, owner, slogan)
				VALUES %L
				RETURNING *`,
          formattedShops
        );
        return db.query(queryStr);
      })
      .then(({ rows: shops }) => {
        //1. create the shopRefObj
        //2. create the formattedtreasures
        //3. insert it to DB.

        // const formattedTreasures= treasureData.map((treasure)=>{
        // 	const {treasure_name, colour, age, cost_at_auction, shop_id} = treasure;

        // const {shop_name} = shops.find(
        // 	(findShop) => findShop.shop_name === shop
        // );

        // line 44 find shop_name in shops obj.
        //line 45 find shop_name from shops that matched with  ===
        // return [treasure_name, colour, age, cost_at_auction, shop_id]
        const shopRefObject = shopsObj(shops);
        const treasureArr = formatTreasures(treasureData, shopRefObject);

        const queryStr = format(
          `
			INSERT INTO treasures
			(treasure_name, colour, age, cost_at_auction, shop_id)
			VALUES %L
			RETURNING *`,
          treasureArr
        );
        return db.query(queryStr);
      });
  });
};

// drop any existing shops table

// then: create some new tables - but which first and why?
// then: insert the raw data into the tables.

module.exports = seed;
