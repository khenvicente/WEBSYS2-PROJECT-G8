module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("wizards", [
      { WizardID: 1, name: "Aldren the Arcane", img: "aldren.png" },
      { WizardID: 2, name: "Seraphina Stormborn", img: "seraphina.png" }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("wizards", null, {});
  }
};
