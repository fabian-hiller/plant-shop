# Plant Shop

## Setup the plant-shop database:
1. Move into the directory where you saved the plant-shop folder, using the Command Line tool you’re most comfortable with.
    
    **Note:** For Windows users, we recommend completing parts 1 & 2 using the Command Prompt. For Mac users, Visual Studio Code works well.

2. Run the following command this should set up your plant-shop database. Replace the `<YOUR_USERNAME>` placeholder with your MySQL username. Enter your password once prompted.

```bash
mysql -u <YOUR_USERNAME> -p < ./database.sql
```

## Check the database is correctly imported
3. You can log into MySQL using the following command. Replace the `<YOUR_USERNAME>` placeholder with your MySQL username.
```bash
mysql -u <YOUR_USERNAME> -p
```

4. Run the following command:
```bash
SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE table_schema= 'plant_shop_database';
```
**Note:** If the command was successful, your output should look like the following:
```bash
+------------+------------+
| TABLE_NAME | TABLE_ROWS |
+------------+------------+
| cartitem   |          0 |
| plant      |          4 |
| plantsize  |         12 |
+------------+------------+
```

## Setup the database connection
**Note:** If your MySQL username and password is not `root` and `1234` respectively, you can use the following steps to setup up the database connection using your own MySQL credentials.

5. Open the `.env` file.
6. Fill in the following sections:
    - For the `DB_USER`, enter your MySQL username.
    - For the `DB_PASSWORD`, enter your MySQL password.

**Note:** It is not mandatory to fill out the other fields to run the web server in your local environment.

