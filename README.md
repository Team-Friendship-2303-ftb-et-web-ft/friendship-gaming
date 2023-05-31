Welcome to our premier ecommerce website, dedicated to bringing you the best selection of video games available online. Our platform is a gaming enthusiast's paradise, designed to cater to every gamer's needs.

Navigating our website is a breeze, thanks to our intuitive interface and advanced search filters. Whether you're searching for a specific game, genre, or even a particular developer you'll find it effortlessly with our user-friendly tools.

To enhance your shopping experience, we provide detailed game descriptions giving you valuable insights before making a purchase. Our goal is to help you make informed decisions and find games that match your preferences perfectly.

With a commitment to customer satisfaction, we prioritize security and convenience. Rest assured that your personal information is handled securely.

Upon reaching the checkout page, you'll find a clear and concise summary of your selected items, along with their prices, quantities, and any applicable discounts or promotions. You can easily review and modify your order before proceeding.

For returning customers, we offer a convenient one-click checkout option, saving you time and effort. Your shipping and billing information can be securely stored for future purchases, allowing for a swift and hassle-free experience.

Join our thriving community of gamers and explore the world of video games like never before. Whether you're a casual player or a hardcore gamer, our ecommerce website is your go-to destination for all your gaming needs. Start browsing now and unleash your gaming passion!

# Vite PERN Browser Boilerplate

A simple boilerplate for the PERN stack using Vite.js. It includes Node-Postgres v8.8, Express, React 18, React Router DOM v6.6, Morgan, Axios, jsonwebtoken, bcrypt, dotenv, and Nodemon.

This boilerplate was made using the official [Vite](https://vitejs.dev) template(`npm create vite@latest my-app -- --template react`) for the client. Then, the backend was built around it. You can find more templates to scaffold your project using Vite, [here](https://github.com/vitejs/vite/tree/main/packages/create-vite) or community templates on [Awesome Vite.js](https://github.com/vitejs/awesome-vite#templates).

## Tools

- [Vite](https://vitejs.dev)
- [React](https://reactjs.org/)
- [Node-Postgres](https://node-postgres.com/)
- [Express](https://expressjs.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [Axios](https://axios-http.com/docs/intro)
- [Morgan](https://www.npmjs.com/package/morgan)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Installation

```bash
npx degit seanhagstrom/Vite-PERN my-app
```

```bash
cd my-app
cd client && npm install
cd .. && npm install
npm run start:dev
```

> The above installation should remove the `.git` history. If it didn't run the following script:

```bash
rm -rf .git
```

> Once the `.git` history has been erased, initialize the project as a git repository with the following command:

```bash
git init
```

> Before you run `npm run seed`, you'll need to update the package.json name to the name of your db and create your database in `psql`. You can do this from the CLI with the following command:

```bash
createdb your_database_name
```

Happy coding!
Testing testing