'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const familiars = [];

    for (let i = 1; i <= 20; i++) {
      familiars.push({
        GroupID: null, // random GroupID between 1-5
        name: `Familiar ${i}`,
        img: `familiar_${i}.png`,
        species: ["Dragon", "Fox", "Cat", "Owl", "Wolf"][Math.floor(Math.random() * 5)],
        size: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)],
        color: ["Red", "Blue", "Green", "White", "Black"][Math.floor(Math.random() * 5)],
        pattern: ["Striped", "Spotted", "Plain"][Math.floor(Math.random() * 3)],
        personality: ["Brave", "Cunning", "Friendly", "Shy", "Curious"][Math.floor(Math.random() * 5)],
        rarity: ["Common", "Uncommon", "Rare", "Epic"][Math.floor(Math.random() * 4)],
        typing: JSON.stringify(
          ["Fire", "Water", "Earth", "Air", "Magic"].sort(() => 0.5 - Math.random()).slice(0, 2)
        ),
      });
    }

    await queryInterface.bulkInsert('familiars', familiars, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('familiars', null, {});
  }
};
