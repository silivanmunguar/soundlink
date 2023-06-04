# SoundLink

This is the repository for the SoundLink project. This project is a web application and extention that allows users to share their music with friends across different music platforms.

# Table of Contents

- [About the project](#about-the-project)

- [Table of Contents](#table-of-contents)

- [Setting up your development environment](#Setting-up-your-development-environment)

  - [Introduction:](#introduction)

  - [Prerequisites:](#prerequisites)

  - [Getting Started:](#getting-started)

  - [Installing Dependencies:](#installing-dependencies)

  - [Runing the tests:](#runing-the-tests)

  - [Contributing:](#contributing)

  - [License:](#license)

# Setting up your development environment:

## Introduction:

This document will guide you through the process of setting up your development environment for the SoundLink project.
this project is a web application that allows users to share their music with friends across different music platforms. This setup will allow you to run the project locally on your machine. All the instruction assume the following:

- You are using a Linux (Ubuntu 18.04 LTS or higher) or Windows 10 or higher (with [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) enabled) machine.
- You are using [Visual Studio Code](https://code.visualstudio.com/) (or any other IDE of your choice).
- You have some basic knowledge of the command line and git commands (clone, pull, push, etc). If you are not familiar with these commands, please take a look at the [Git Handbook](https://guides.github.com/introduction/git-handbook/).

# Prerequisites:

- Install [Git](https://git-scm.com/downloads)
- [Node.js (LTS version)](https://nodejs.org/en/download/)
- npm (comes with Node.js)
- Linux (Ubuntu 18.04 LTS or higher) or Windows 10 or higher (with [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) enabled)
- Set up your [SSH keys](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for GitHub

  - Paste the following command in your terminal to check if you already have an SSH key:

    ```bash
    ls -al ~/.ssh
    ```

    If you already have an SSH key, you will see a file in the output that starts with `id_rsa` or `id_ed25519` and ends with `.pub`. If you don't have an SSH key, you will see an error message. If you don't have an SSH key, you can generate one using the following command:

    ```bash
        ssh-keygen
    ```

    - Press Enter to accept the default file location.
    - At the prompt, type a secure passphrase. For more information, see [Working with SSH key passphrases](https://docs.github.com/en/github/authenticating-to-github/working-with-ssh-key-passphrases).

  - Copy and Paste the SSH key into your GitHub account settings. For more information, see [Adding a new SSH key to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).

    Your key is located in the file `~/.ssh/id_rsa.pub`. Copy the contents of the file and paste it into your GitHub account settings.

    You can see the contents of the file using the following command:

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

    Copy the output and paste it into your GitHub account settings. As a reminder, you can access your GitHub account settings by clicking on your profile picture in the top right corner of the GitHub website and selecting **Settings**. Then, click on **SSH and GPG keys** in the left sidebar.

    After you have added your SSH key to your GitHub account, you can test your connection using the following command:

    ```bash
    ssh -T
    ```

    It will ask you to confirm that you want to connect to GitHub. Type `yes` and press Enter. If you have set up your SSH key correctly, you will see the following message:

    ```bash
    Hi <your username>! You've successfully authenticated, but GitHub does not provide shell access.
    ```

    If you see a different message, please refer to the [GitHub documentation](https://docs.github.com/en/github/authenticating-to-github/troubleshooting-ssh/error-permission-denied-publickey) for troubleshooting.

- [Visual Studio Code](https://code.visualstudio.com/) (or any other IDE of your choice)

  In addition to Visual Studio Code, you will also need to install the following extensions by clicking on the **Extensions** icon in the left sidebar of Visual Studio Code and searching for the extension name or clicking on the links below:

  - Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code.

  - Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for Visual Studio Code.

  - Install the [StandardJS - JavaScript Standard Style](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs) extension for Visual Studio Code.

  - Install the [TODO](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) Highlight extension for Visual Studio Code.

# Getting Started:

Once you have installed all the pre-requisites, you can clone the repository using the following command:

```bash
git clone git@github.com:silivanmunguar/SoundLink.git
```

This will create a folder called `SoundLink` in your current directory. You can open this folder in Visual Studio Code by typing the following command:

```bash
code SoundLink
```

This will open the folder in Visual Studio Code. You can also open the folder in Visual Studio Code by clicking on **File** in the top left corner and selecting **Open Folder**. Then, navigate to the `SoundLink` folder and click on **Open**.

# Installing Dependencies:

Once you have opened the folder in Visual Studio Code, you can install the dependencies using the following command:

```bash
npm install
```

This will install all the dependencies listed in the `package.json` file. You can see the list of dependencies in the `package.json` file. You can also install dependencies individually using the following command:

```bash
npm install <package-name>
```

This will start the application on port 3000. You can access the application by navigating to `http://localhost:3000` in your browser.

# Runing the tests:

Once you have installed all the dependencies, you can run the tests using the following command:

```bash
npm test
```

This will run all the tests in the `tests` folder. You can see the list of tests in the `tests` folder. You can also run tests individually using the following command:

```bash
npm test <test-name>
```

The test script is located in the `package.json` file. It runs a standard --fix on all files to check java script syntax and formatting. It also runs the tests in the `__tests__` folder.

````bash

You might see the following error message when you run the test for the first time:

```bash
if (error?.stack) {
              ^

SyntaxError: Unexpected token '.'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/home/buzzbeebaby/SoundLink/node_modules/jest-cli/build/index.js:18:12)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
````

This is because the node_modules folder is not in your PATH. The `standard` package is installed in the `node_modules` folder and it is used to check the javascript syntax errors.

If you get this error message, or any other errors related to the `standard` pacckage you can fix it by add the `node_modules/.bin` folder to your PATH. You can do this by running the following command:

```bash
export PATH=$PATH:./node_modules/.bin
```

# Contributing:

If you would like to contribute to this project, please follow the steps below:

1. Fork the repository by clicking on the **Fork** button in the top right corner of the GitHub repository page.

2. Clone the forked repository using the following command:

   ```bash
   git clone
   ```

   This will create a folder called `SoundLink` in your current directory. You can open this folder in Visual Studio Code by typing the following command:

   ```bash
   code SoundLink
   ```

   This will open the folder in Visual Studio Code. You can also open the folder in Visual Studio Code by clicking on **File** in the top left corner and selecting **Open Folder**. Then, navigate to the `SoundLink` folder and click on **Open**.

3. Create a new branch using the following command:

   ```bash
   git checkout -b <branch-name>
   ```

   Replace `<branch-name>` with a descriptive name for your branch. For example, if you are working on a feature called `login`, you can name your branch `login`. If you are working on a bug fix, you can name your branch `bug-fix`.

4. Make your changes to the code in the `SoundLink` folder.

5. The repositry contains a number of tests that you can run to check if your code is working as expected. You are advised to run tests after you have made any changes to your code to make sure that your changes have not broken any existing functionality. You should also write tests for any new functionality that you add to the application. You can find more information about writing tests in the [Testing](#testing) section.

6. Commit your changes using the following command:

   ```bash
   git commit -m "<commit-message>"
   ```

   Replace `<commit-message>` with a descriptive commit message. For example, if you are working on a feature called `login`, you can name your commit message `Add login feature`. If you are working on a bug fix, you can name your commit message `Fix bug in login feature`.

7. Push your changes and create a pull request by clicking on the **Pull Request** button in the top right corner of the GitHub repository page.

8. Wait for your pull request to be reviewed and merged.

9. Once your pull request has been merged, you can delete your branch using the following command:

   ```bash
   git branch -d <branch-name>
   ```

   Replace `<branch-name>` with the name of your branch.

## License:

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
