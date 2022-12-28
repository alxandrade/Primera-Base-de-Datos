// Creamos el string connection a MySQL
export const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce",
    },
    pool: { min: 0, max: 10 },
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./database/ecommerce.sqlite",      
    },
    useNullAsDefault: true,
  },
};
