# EECS_4413_Ecommerce_Project

## Created by: Ammad Qureshi, Ethan Mackay, Nicholas Lachhman, Ryan Loi

Steps to download and run locally:

1. Clone the repo:
   `git clone https://github.com/Ammadq87/EECS_4413_Ecommerce_Project.git`

2. Open the project in a code editor (Eg. VSCode):

```
cd EECS_4413_Ecommerce_Project
code .
```

3.  Checkout development branch, the main branch is used for production server, the development branch is up to date with changes

```
git checkout development
```

4.  Rename `.env.sample` to `.env` and replace with the following info:

```
PORT = 3001
MONGO_URI = mongodb+srv://NicholasL1:EECS4413ecommerceproj@eecs4413-cluster.ayaqwdg.mongodb.net/EECS4413-Database?retryWrites=true&w=majority&appName=EECS4413-Cluster
JWT_SECRET = 5af53784373e542ee1c6c27b4eab72d337b93164b7f39a38aa74e72b008b6b6c50cf34230fe2575ccd1be639bfbe9da0d24a119c32065cee484eb831a21a5c55
```

5.  Download dependencies and run the server in frontend and backend folders:

```
cd backend
npm i
npm run dev

cd frontend
npm i
npm run dev
```

6. Access the `http://localhost:3000` in your browser, you can now browse 6ixkicks!

7. Admin Credentials
Email: admin@mail.com
Password: 1

Github Repo: https://github.com/Ammadq87/EECS_4413_Ecommerce_Project/tree/development

Online URL: https://6ixkicks.vercel.app/

## Disclaimer: The public application runs the features fine, however, because we utilized a free deployment service, we cannot set cookies on the client side due to security issues. We utilize cookies in our login and signup, therefore there is no way to login and signup on the public server. The only way around this is to use a paid deployment service such as Heroku, or purchase a custom domain to use with your application.

## Therefore, please test the application by cloning the repo and following the steps above!
