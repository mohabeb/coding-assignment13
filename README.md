# Coding Assignment 13 — UI Component Library Build Checks

**Student:** Mohamed Habeeb  
**Course:** WEBD-3012  
**Required container name:** `Habeeb_Mohamed_coding_assignment13`  
**Required container working directory:** `/Habeeb_Mohamed_ui_garden_build_checks`  
**Required website address:** `http://127.0.0.1:8018`

## 1. What this project contains

This project extends the Assignment 12 React component library by adding a complete code-quality workflow:

- A reusable React UI component library: Button, Card, Input, Badge, and Alert.
- Prettier formatting checks.
- ESLint JavaScript and React checks supplied through Create React App.
- Jest and React Testing Library tests.
- Husky pre-commit checks that block a commit when any required check fails.
- GitHub Actions checks that repeat the same checks after every push or pull request.
- A multi-stage Dockerfile that creates and serves an optimized production build on port 8018.

## 2. Project structure

```text
Habeeb_Mohamed_coding_assignment13/
├── .github/workflows/code-quality.yml
├── .husky/pre-commit
├── public/index.html
├── src/
│   ├── components/
│   │   ├── Alert.js / Alert.css / Alert.test.js
│   │   ├── Badge.js / Badge.css
│   │   ├── Button.js / Button.css / Button.test.js
│   │   ├── Card.js / Card.css
│   │   ├── Input.js / Input.css / Input.test.js
│   │   └── index.js
│   ├── App.js / App.css / App.test.js
│   ├── index.js / index.css
│   └── setupTests.js
├── .dockerignore
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
└── README.md
```

## 3. Prerequisites

Install and start the following before the demonstration:

1. Node.js 18 or newer.
2. Git.
3. Docker Desktop. Confirm that the Docker whale icon shows that Docker is running.
4. A GitHub account and repository for this assignment.

Check the installations:

```bash
node --version
npm --version
git --version
docker --version
```

## 4. First-time local setup

Open File Explorer, open the extracted assignment folder, click the address bar, type `cmd`, and press Enter.

A submitted ZIP normally does not contain Git history. Initialize Git **before** installing packages so the Husky hook can be installed:

```bash
git init
npm install
```

Confirm that Husky installed the Git hook:

```bash
git config core.hooksPath
```

Expected result:

```text
.husky/_
```

When packages were installed before `git init`, run this after initializing Git:

```bash
npm run prepare
```

## 5. Run the React application locally for development

```bash
npm start
```

The development version normally opens at:

```text
http://localhost:3000
```

Press `Ctrl + C` to stop the development server.

## 6. Run every quality check manually

Run all three required checks with one command:

```bash
npm run quality
```

This command runs the following in order:

```bash
npm run format:check
npm run lint
npm run test:ci
```

Expected successful results:

- Prettier reports that all matched files use Prettier formatting.
- ESLint finishes with no errors and no warnings.
- Jest reports that all test suites and tests passed.

Create the optimized production build:

```bash
npm run build
```

The generated static production files are placed in the `build` folder.

## 7. How Husky blocks a bad commit

The file `.husky/pre-commit` runs this sequence before Git creates a commit:

```text
Prettier check → ESLint check → tests
```

Stage the project and create a commit:

```bash
git add .
git commit -m "Complete Assignment 13 quality workflow"
```

Before Git completes the commit, the terminal displays the three checks. The commit is created only when every check passes. When any command returns an error, Husky stops immediately and Git does not create the commit.

When demonstrating a failed check, restore the intentionally modified file before the final push.

## 8. GitHub Actions continuous integration

The workflow file is:

```text
.github/workflows/code-quality.yml
```

It runs on every push and pull request to `main` or `master`. The remote workflow performs:

1. Repository checkout.
2. Node.js 20 setup.
3. Dependency installation with `npm ci`.
4. Prettier check.
5. ESLint check.
6. Tests.
7. React production build.
8. Docker image build.

This remote layer is important because a local hook can be bypassed with `git commit --no-verify`. Even when that happens, GitHub Actions repeats the checks and marks the workflow as failed when the code does not pass.

## 9. Push the project to GitHub

Create an empty GitHub repository, for example:

```text
coding-assignment13
```

Then run these commands. Replace the URL only when your repository has a different name:

```bash
git branch -M main
git remote add origin https://github.com/mohabeb/coding-assignment13.git
git add .
git commit -m "Complete Assignment 13 quality workflow"
git push -u origin main
```

Open the repository in GitHub, click **Actions**, and open the latest run. A green check mark means the workflow passed. A red X means at least one required check failed; open the failed step to read the error.

## 10. Build the Docker image

Make sure Docker Desktop is running. From the assignment folder, run:

```bash
docker build -t habeeb_mohamed_coding_assignment13 .
```

The Dockerfile uses two stages:

1. **Build stage:** installs the locked dependencies with `npm ci`, runs Prettier, ESLint, tests, and creates the React production build.
2. **Production stage:** copies only the final build files into Nginx and serves them on port 8018.

A failed quality check also stops the Docker image build.

## 11. Run the required Docker container

Remove an older container with the same name when necessary:

```bash
docker rm -f Habeeb_Mohamed_coding_assignment13
```

Start the required container:

```bash
docker run -d -p 8018:8018 --name Habeeb_Mohamed_coding_assignment13 habeeb_mohamed_coding_assignment13
```

Open either address:

```text
http://127.0.0.1:8018
http://localhost:8018
```

Confirm the required name, port, and status:

```bash
docker ps
```

Confirm the required working directory inside the container:

```bash
docker exec Habeeb_Mohamed_coding_assignment13 pwd
```

Expected result:

```text
/Habeeb_Mohamed_ui_garden_build_checks
```

Check the container health and labels:

```bash
docker inspect Habeeb_Mohamed_coding_assignment13
```

## 12. Stop, restart, and remove the container

Stop:

```bash
docker stop Habeeb_Mohamed_coding_assignment13
```

Restart without rebuilding:

```bash
docker start Habeeb_Mohamed_coding_assignment13
```

Remove:

```bash
docker rm -f Habeeb_Mohamed_coding_assignment13
```

Remove the image only when a completely fresh build is needed:

```bash
docker image rm habeeb_mohamed_coding_assignment13
```

## 13. Troubleshooting

### `container name is already in use`

```bash
docker rm -f Habeeb_Mohamed_coding_assignment13
```

Then run the container command again.

### Port 8018 is already in use

Find and stop the older container:

```bash
docker ps
```

Then:

```bash
docker stop Habeeb_Mohamed_coding_assignment13
```

### Husky does not run during commit

```bash
git init
npm run prepare
git config core.hooksPath
```

The last command should display `.husky/_`.

### Prettier fails

Automatically format the supported files:

```bash
npm run format
```

Then run:

```bash
npm run quality
```

### ESLint fails

Read the file name, line number, and rule in the terminal. Correct the reported JavaScript problem and run:

```bash
npm run lint
```

### Tests fail

Read the failed test name and the difference between expected and received results. Correct the component or its test, then run:

```bash
npm run test:ci
```

### GitHub Actions does not appear

Confirm that `.github/workflows/code-quality.yml` is committed and pushed to the default branch. Then open the repository's **Actions** tab.

## 14. Submission contents

Submit to the LEARN Dropbox:

1. `Dockerfile`
2. `README.md`
3. The assignment ZIP when the Dropbox accepts or requests the complete project
4. A working GitHub repository link

Do not submit `node_modules`, `build`, `.git`, or another ZIP inside the project ZIP.

## 15. One-sentence assignment explanation

This assignment adds two layers of automated protection to my React UI component library: Husky blocks bad local commits, while GitHub Actions repeats Prettier, ESLint, tests, the production build, and the Docker build after code is pushed.
## Dependency compatibility note

This project pins `eslint-plugin-jest` to version `25.6.0` because Create React App 5 can encounter a `jest/globals` environment error with version `25.7.0` during Linux/Docker builds.

