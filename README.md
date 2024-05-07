# Plant Shop

Welcome to the Plant Shop repository. Please follow the steps below to get started.

## Setup plant-shop database

Step 1: Start your local MySQL database server using the CLI or your operating system's GUI.

Step 2: Move into the directory where you saved the plant-shop folder, using the command line tool you’re most comfortable with.

**Note:** For Windows users, we recommend completing parts 1 and 2 using the Command Prompt. For Mac users, the Visual Studio Code terminal works well.

Step 3: Run the following command. This should set up your plant-shop database. Replace the `<YOUR_USERNAME>` placeholder with your MySQL username. Enter your password once prompted.

```bash
mysql -u <YOUR_USERNAME> -p < ./database.sql
```

## Check database status

Step 4: You can log into MySQL using the following command. Replace the `<YOUR_USERNAME>` placeholder with your MySQL username.

```bash
mysql -u <YOUR_USERNAME> -p
```

Step 5: Then run the following SQL command:

```bash
SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE table_schema= 'plant_shop_database';
```

**Note:** If the setup was successful, your output should look like the following:

```bash
+------------+------------+
| TABLE_NAME | TABLE_ROWS |
+------------+------------+
| CartItem   |          0 |
| Plant      |          4 |
| PlantSize  |         12 |
+------------+------------+
```

Step 6: Exit MySQL by executing the following SQL command:

```bash
EXIT;
```

## Setup database connection

**Note:** If your MySQL username and password is not `root` and `1234` respectively, you can use the following steps to setup up the database connection using your own MySQL credentials.

Step 7: Open the `.env` file.

Step 8: Fill in the following sections:

- For the `DB_USER`, enter your MySQL username.
- For the `DB_PASSWORD`, enter your MySQL password.

**Note:** It is not mandatory to fill out the other fields to run the web server in your local environment.

## Start Node.js web server

Step 7: Run the following command in your terminal to install all the dependencies:

```bash
npm install
```

Step 8: Start the Node.js server by running the following command:

```bash
npm start
```

Step 9: Once the web server is running, you can access the website via `http://localhost:3000` in your web browser.
