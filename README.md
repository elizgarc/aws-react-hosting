# Bad Bank App
> Section 2 Final Project MIT Full Stack Professional Certificate Program

## Description
Create a small Front End Banking Application with React.

- Build, test, and deploy a React application
- Design and build UI components using React
- Deploy a React application using Amazon Web Services

This project was started during week 18 of the MIT xPro Full Stack Professional Certificate Program. The **goals for the week 18 project** were to create the shell of a front end single page application using React and React-Router.

The **goals for the final project** were to use the React single page application shell and utilize React functional components to put simple forms on multiple pages, verify form inputs, display success/error messages, save user data using React Context, display a record of all user submissions and transactions. No security implementation is part of this project.

### Goals:
1. Navigation Bar
    - Required links: Home Page, Create Account Page, Deposit Page, Withdraw Page, All Data Page
    - Optional links: Login Page
    - Use React Router (Hash Router) for navigation links
    - Style navigation with Bootstrap
    - Include a style effect such as highlighting current page or on hover informational popovers
2. Home Page
    - Put content on a Bootstrap Card
    - Include bank title, welcome message and an image
3. Create Account Page
    - Content on a Bootstrap Card
    - Form layout includes: Name input, Email input, Password input, "Create Account" button
    - Form function includes:
        - Submit button disabled until all input fields contain content
        - Name validation: alert if name input is blank
        - Email validation: alert if email input is blank or not valid email
        - Password validation: alert if password is less than 8 characters
        - Success message: display a success message on new account created completion
        - Add another account: success message should display the option to add another account
        - Cleared form: Create Account form should be cleared after successful completion and validation reset
        - Save data: User data should be saved to All Users Context
4. Deposit Page
    - Content on a Bootstrap Card
    - Display user current bank balance at top of Card
    - Form layout includes: Deposit Amount input, and Deposit button
    - Form function includes:
        - Deposit button is disabled until the Deposit Amount input contains content
        - Negative Deposit alert: user receives alert if attempted deposit amount is negative
        - Not a Number alert: user receives alert if attempted deposit amount is not a valid USD number
        - Success message: display a success message upon successful deposit to account
        - Update balance: add the deposit amount to the current account
        - Saved updated balance infomation to All Users Context
5. Withdraw Page
    - Content on a Bootstrap Card
    - Display user current bank balance at top of Card
    - Form layout includes: Withdraw Amount input, and Withdraw button
    - Form function includes:
        - Withdraw button is disabled until the Withdraw Amount input contains content
        - Negative Withdraw alert: user receives alert if attempted withdrawal amount is negative
        - Not a Number alert: user receives alert if attempted withdrawal amount is not a valid USD number
        - Overdraft alert: user receives alert if attempted withdrawal amount is greater than current account balance
        - Success message: display a success message upon successful withdrawal to account
        - Update balance: add the withdrawal amount to the current account
        - Saved updated balance infomation to All Users Context
6. All Data Page
    - Display data with Bootstrap formating (instead of raw JSON)
    - All new accounts must be added to the All Users Context and displayed on the All Data page

### Refactoring:
1. Login function
    - I included a login page that allows the user to switch accounts with the correct email/password combination. Any bank deposits/withdrawals will then be made on that newly logged in account
    - Login page displays an error message if the email does not exist in registed users or the password does not match the supplied email
    - User Context includes a "loggedIn" property to keep track of which account is currently active
2. All transactions saved and displayed
    - In addition to saving all new accounts to the User Context, I am saving a record of each transaction made to a "transactionHistory" property for the account in User Context
    - The All Data page shows the transaction history as nested tables under the matching account
3. Custom styling
    - In addition to using Bootstrap styling, I modified th color scheme to a simple custom one
    - Also made sure to have navbar and other elements be optimized for mobile browsing

## To Run
This project can be viewed on a web browser at:
- GitHub Pages deployment: [kparsonsdesign.github.io/badbank/](https://kparsonsdesign.github.io/badbank/)
- Amazon Web Services deployment: [https://katherine-parsons-bankingapp.s3.us-east-1.amazonaws.com/index.html](https://katherine-parsons-bankingapp.s3.us-east-1.amazonaws.com/index.html)
- Amazon Amplify App continuous deployment from GitHub repo: [https://master.d2gn8uf333xpvj.amplifyapp.com/](https://master.d2gn8uf333xpvj.amplifyapp.com/)

## Roadmap
1. Include buttons on some of the pages/routes navigate to other pages, in addition to the navbar navigation.
2. Redesign application to have a more professional/traditional bank user interface instead of the many separate "pages" that this project currently requires

## Disclaimer
This is a project developed as a student in the Front-End with React section of the MIT xPro Full Stack Development with MERN, Professional Certificate in Coding Program. This project uses React, ReactRouter, ReactBootstrap and Bootstrap. I make no claim over any content from any of the aforementioned sources.

## License
MIT License Copyright (c) 2022 Elizabeth Garcia
