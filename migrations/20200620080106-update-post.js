'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {

      await queryInterface.addColumn("post", "tags", {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      transaction.rollback()
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {

      await queryInterface.removeColumn("post", "tags", { transaction })

      await transaction.commit()
    } catch (error) {
      transaction.rollback()
      throw error
    }
  }
};
