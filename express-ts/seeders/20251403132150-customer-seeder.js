module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("customers", [
      { CustomerID: 1, GroupID: 1, name: "Marcus Hale", img: "marcus.png" },
      { CustomerID: 2, GroupID: 2, name: "Elara Sunwood", img: "elara.png" }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("customers", null, {});
  }
};
