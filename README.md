Email app using React+ Context frontend, Node.js + Express backend

# Install Locally

```bash
$ git clone https://github.com/lomri123/Omri-Levi-12-07-2020
$ cd omri-unicargo
$ npx lerna bootstrap
$ yarn install
```

# Develop

```bash
$ cd packages/client-portal-api-server
$ yarn start
# separate terminal
$ cd packages/client-portal-web-client
$ yarn start
```

# Yarn & Lerna

This project utilies Lerna and Yarn workspaces to handle package management and publishing. To install any dependency inside a specific package, use yarn "as usual":

```bash
$ cd packages/PACKAGE_NAME
$ yarn add SOME_NPM_PACKAGE
```

To install a dependency in the root folder:

```bash
$ yarn add --dev SOME_NPM_PACKAGE -W
```
