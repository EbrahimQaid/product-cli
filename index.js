#!/usr/bin/env node

import fs from "node:fs";
import { Command } from "commander";
import inquirer from "inquirer";

const program = new Command();
const file_Path = "product.json";

const questions = [
  {
    type: "input",
    name: "name",
    message: "Enter product name:",
  },
  {
    type: "input",
    name: "price",
    message: "Enter product price:",
  },
];

// ==========================
// Add Product
// ==========================

program
  .command("add")
  .alias("a")
  .description("Add a new product")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync()) {
        fs.readFile(file_Path, "utf8", (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          const products = JSON.parse(data);
          products.push(answers);

          fs.writeFile(file_Path, JSON.stringify(products), "utf8", (err) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log("Product added success.");
          });
        });
      } else {
        fs.writeFile(file_Path, JSON.stringify([answers]), "utf8", (err) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log(" Product added success.");
        });
      }
    });
  });

// ==========================
// List Products
// ==========================

program
  .command("list")
  .alias("l")
  .description("Display all products")
  .action(() => {
    if (!fs.existsSync(file_Path)) {
      console.log("No products found.");
      return;
    }

    fs.readFile(file_Path, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      console.table(JSON.parse(data));
    });
  });

program.parse();
