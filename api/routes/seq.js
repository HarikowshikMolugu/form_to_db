import React from 'react'

function seq() {
  // Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('mynew', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  // Define the form data model
  const FormData = sequelize.define('FormData', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkboxValues: {
      type: DataTypes.TEXT,
    },
    radioValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Sync the model with the database (create the table if it doesn't exist)
  sequelize.sync().then(() => {
    console.log('Table created or already exists');
  }).catch((error) => {
    console.error('Error syncing the model with the database:', error);
  });
}

export default seq