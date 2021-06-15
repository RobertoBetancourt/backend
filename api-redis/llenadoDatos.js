const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const fetch = require("node-fetch");

// A `main` function so that we can use async/await
async function main() {
  const response = await fetch(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json"
  );
  const countriesData = await response.json();

  for (let i = 0; i < countriesData.length; i++) {
    const newCountry = await prisma.country.create({
      data: {
        name: countriesData[i].country,
      },
    });
    console.log(`Created new user: ${newCountry.name} (ID: ${newCountry.id})`);
  }
}

main().catch((e) => console.error(e));
