module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("contracts", [
      {
        ContractID: 1,
        CustomerID: 1,
        FamiliarID: 1,
        status: "Signed",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        ContractID: 2,
        CustomerID: 2,
        FamiliarID: 2,
        status: "Pending",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("contracts", null, {});
  }
};
