// const formattedTreasures =shopData.map((shop)=>{
//     return shop[shop_name] = shop[shop_id]})

exports.shopsObj = (shops) => {
  const shopRefObj = {};
  shops.forEach((shop) => {
    shopRefObj[shop.shop_name] = shop.shop_id;
  });
  return shopRefObj;
};

//shop.name
//shop[name]
exports.formatTreasures = (treasureData, shopRefObj) => {
  const formattedTreasures = treasureData.map((treasure) => {
    const { treasure_name, colour, age, cost_at_auction, shop } = treasure;

    return [treasure_name, colour, age, cost_at_auction, shopRefObj[shop]];
  });
  return formattedTreasures;
};

/*
treasure
{
    treasure_name: 'Up-sized Awesome Soft Pizza',
    colour: 'turquoise',
    age: 47,
    cost_at_auction: '221.70',
    shop_name: "Luettgen Group"
  },


  shopRefObj
  {
    Luettgen Group: 89,
    Jenkins LLC: 90,

}


[{shop_id: 12, shop_name: bob's shop},{shop_id: 12, shop_name: bob's shop},{shop_id: 12, shop_name: bob's shop}]

const shopsReference = (shopArray) => {
  const shopRef = {};
  shopArray.forEach((shop) => {
    let copy = { ...shop };
    shopRef[copy.shop_name] = copy.shop_id;
  });
  return shopRef;
};
*/
