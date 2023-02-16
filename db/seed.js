const db = require("./");
const format = require('pg-format');

const seed = ({ shopData, treasureData }) => {
	return db.query(`DROP TABLE IF EXISTS treasures;`)
	.then(() => {
	return db.query(`DROP TABLE IF EXISTS shops;`)
	.then(()=>{
	return db.query(`CREATE TABLE shops (
				shop_id SERIAL PRIMARY KEY,
				shop_name VARCHAR NOT NULL,
				owner VARCHAR NOT NULL,
				slogan VARCHAR 
			);`)
		})
	.then(()=>{
	return db.query(`CREATE TABLE treasures (
			treasures_id SERIAL PRIMARY KEY,
			treasures_name VARCHAR NOT NULL,
			colour VARCHAR NOT NULL,
			age INT,
			const_at_auction FLOAT,
			shop_id INT REFERENCES shops(shop_id)
			);`)
		})
	.then(()=>{
		const formattedShops= shopData.map((shop)=>{
			return [shop.shop_name, shop.owner, shop.slogan];
		})
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
	.then(({rows: shops})=>{
		const formattedTreasures= treasureData.map((treasure)=>{
			const {treasure_name, colour, age, cost_at_auction, shop} = treasure;
			
			const {shop_name} = shops.find(
				(findShop) => findShop.shop_name === shop
			);
				return [treasure_name, colour, age, cost_at_auction, shop_name]
		});
			
			const queryStr =format (
				`
				INSERT INTO treasures
				(treasure_name, colour, age, cost_at_auction, shop, shop_id)
				VALUES %L
				RETURNING *`,
				formattedTreasures
			);
			return db.query(queryStr);
	})

		// drop any existing shops table
	})
	// then: create some new tables - but which first and why?
	// then: insert the raw data into the tables.
};

module.exports = seed;
