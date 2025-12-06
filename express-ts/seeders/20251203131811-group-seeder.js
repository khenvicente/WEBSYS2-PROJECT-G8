module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("groups", [
      {
        GroupID: 1,
        WizardID: 1,
        price: 1500,
        species_type: "Beast",
        size_range: "Small",
        color_theme: "Brown",
        pattern_type: "Spotted",
        personality_type: "Loyal",
        rarity_tier: "Common",
        typing: JSON.stringify(["Earth"])
      },
      {
        GroupID: 2,
        WizardID: 2,
        price: 3000,
        species_type: "Spirit",
        size_range: "Medium",
        color_theme: "White",
        pattern_type: "Shimmer",
        personality_type: "Calm",
        rarity_tier: "Rare",
        typing: JSON.stringify(["Light"])
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("groups", null, {});
  }
};
