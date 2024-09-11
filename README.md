# Secure REST API for Membership Data Submission


A serverless REST API built on AWS & serverless framework, designed to handle user data securely. The API supports both data submission and retrieval, and includes comprehensive security measures to protect against common attacks. The architecture follows a clean separation of concerns with controllers, services, repositories, and models.

## :ledger: Index

- [About](#beginner-about)
- [Tech Stack](#techstack-techstack)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)  
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
  - [Features](#exclamation-features)  
- [FAQ](#question-faq)
- [Resources](#page_facing_up-resources)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

##  :beginner: About
The API allows submission of various data types (text, email, boolean, phone number) and securely stores and retrieves this data. It is built with security best practices in mind, including protection against SQL injection, XSS, CSRF, and DDoS attacks. Additionally this project uses a variation of MVC design pattern called Controller-Service-Repository for clean separation of concerns.

##  :techstack: Techonology Stack
This project is built & tested using Serverless, AWS CLI, AWS Lambda, AWS ApiGateway, AWS DynamoDB, AWS SNS, NodeJS & PostMan.

## :zap: Usage
This section outlines how to use the REST API.

###  :electric_plug: Installation
1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```
2. Install dependencies:
   ```
   npm install
   ```

###  :package: Commands
- To run the project locally:
  ```
  serverless offline start
  ```
- To deploy the project to AWS:
  ```
  serverless deploy
  ```
- To remove the service from AWS:
  ```
  serverless remove
  ```

### :notebook: Pre-Requisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A modern web browser
- AWS CLI

###  :nut_and_bolt: Development Environment
1. Fork and clone the repository.
2. Install dependencies using `npm install`.
3. Start the development lcoally using `serverless offline start`.
4. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console).

###  :file_folder: File Structure
```
function/
└── userFunction/
    ├── controller.mjs  # Handles API request logic
    ├── service.mjs     # Business logic for data processing
    ├── repository.mjs  # Database interaction (SQL/NoSQL)
    ├── model.mjs       # Data model for user data schema
    └── handler.mjs     # Entry point for Lambda functions
serverless.yml          # Contains declaration of apis, plugins, resources, rate limit set up
```

| No | File Name | Details 
|----|------------|-------|
| 1  | controller.mjs | Manages HTTP requests and interacts with service functions |
| 2  | service.mjs | Implements business rules, handles validation, and calls the repository |
| 3  | repository.mjs | Handles all interactions with the database (CRUD operations) |
| 4  | model.mjs   | Defines the schema and data model for the collected user data |
| 5  | handler.mjs | Integrates the Lambda function logic and routes requests to controllers |

###  :hammer: Build
To build and deploy the project to AWS:
1. Run serverless deploy
2. The deployed API can be accessed via the API Gateway URL provided after deployment.

## :cherry_blossom: Community

We welcome contributions from the community! Here's how you can get involved:

###  :fire: Contribution

1. **Report a bug** 
   If you find a bug, please report it [here](link-to-issues).

2. **Request a feature** 
   You can request new features [here](link-to-feature-requests).

3. **Create a pull request** 
   Pick up any open issues or implement new features by creating a pull request.

### :cactus: Branches

1. **`main`** is the production branch.
2. **`develop`** is the active development branch.

### :exclamation: Features
1. Input Validation: All input data is validated server-side to ensure integrity and to avoid common attacks.
2. Rate Limiting: AWS API Gateway is configured with rate limiting to protect against DDoS attacks.
3. API Protection: API Keys are used to ensure only authorized users with access can make requests.
4. Notifications: An email is sent upon successful data submission to notify the subscriber via AWS SNS. **Note: Only verified email will be notified for any post requests made.
5. CRUD Operations: This api supports POST & GET request of membership data.
6. Flow: User submits a post request with valid data object -> validation & authorization check -> succeeds -> data gets stored in DynamoDB Table -> email notification is broadcasted to subscribers

## :question: FAQ
1. **Q: How do I implement this project on AWS?**
   A: 1. Set up a root user, set up an IAM user.
      2. Run command 'aws configure' and enter access & secret key of IAM user.
      3. Follow along the installation and deployment instructions above.
      4. Note** : Ensure root user provides necessary access to IAM user.

##  :page_facing_up: Resources
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)


## :star2: Credit/Acknowledgment
- This project was inspired by various security implementations in the AWS ecosystem.
- Thanks to all contributors who have helped shape this project.

##  :lock: License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
