# iNeedMaster

Contact <br/>
Email: alexandrucermac@gmail.com <br/>
Phone number: 0743939803

View live demo: <a href="https://ineedmaster.vercel.app">ineedmaster.vercel.app</a>

Mention: The back end is implemented using Spring Boot and is stored in another GitHub repository. **[Click here to open repository](https://github.com/alexcermac/ineedmaster)**

### Table of contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage/Flow diagrams](#usage/flow-diagrams)
5. [Demo accounts](#demo-accounts)
6. [Future updates, problems, things that need to be fixed](#future-updates-problems-things-that-need-to-be-fixed)

## <a name="description"></a> Description

This project it is a platform whose main purpose is to connect clients who need certain services with masters who offer services such as plumber, electrician, builder, and so on. The platform provides authentication functionality and allows users to create accounts with the role of client or master. Customers can search for services available in a specific city according to certain filters such as categories and subcategories of services, and they can make a reservation for these services if they are registered and authenticated on the platform. Masters can create new services that they offer, and accept or refuse reservations (Tasks) made by customers.

## <a name="technologies"></a> Technologies

-   React (with Next.js)
-   Tailwind CSS
-   Typescript
-   Zustand

## <a name="installation"></a> Installation

First you have to run the backend server from [this repository](https://github.com/alexcermac/ineedmaster) to be able to make requests from this project.
Make sure that you have in .env file this variable with this value: NEXT_PUBLIC_URL_PREFIX="http://localhost:8080"

After the server is started, run the development server of this project:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## <a name="usage/flow-diagrams"></a> Usage/Flow diagrams

Customer flow diagram

![customer flow diagram](/readme_images/customer_flow_diagram.jpg?raw=true)

Master flow diagram

![master flow diagram](/readme_images/master_flow_diagram.jpg?raw=true)

## <a name="demo-accounts"></a> Demo accounts

With these demo accounts you can view some dummy data + play a little bit with the platform.

### Master:

email: demo_master@gmail.com <br>
password: pass

### Customer:

email: demo_customer@gmail.com <br>
password: pass

## <a name=""></a> Future updates, problems, things that need to be fixed

-   For Solution Cards component display either an icon that represents the category of the current solution or an image that master uploaded.
