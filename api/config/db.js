import { Sequelize } from "sequelize";

// Create a new Sequelize instance
// const sequelize = new Sequelize('peheabmy_mcpc-admin', 'peheabmy_fsd_admin', 'Kitchener121!', {
//     host: '96.125.174.19',
//     dialect: 'mysql',
//   });

const sequelize = new Sequelize('postgres://fsd_admin:1QPo1FhVQoAMlaYHBDtzTyKuS0MzEKdN@dpg-cijd1jlgkuvhnnedcdtg-a.oregon-postgres.render.com/mcpc_admin_db')

// Test the database connection
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
});


// Sync the model with the database
sequelize.sync()
.then(() => {
    console.log('Database synced successfully.');
})
.catch((err) => {
    console.error('Unable to sync database:', err);
});


// sequelize.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT })
//   .then((tables) => {
//     console.log(tables);
//   })
//   .catch((err) => {
//     console.error('Unable to get tables:', err);
//   });


export default sequelize