# file-system-browser-example
Real time file system in the browser for fun.

## Get Started

### Prerequisites
 - Node.js >= 14
 - yarn installed globally
 ```bash
npm install -g yarn
```

#### Clone the repo
```bash
git clone https://github.com/alexdaube/file-system-browser-example
```

#### Go to the root of the project
```bash
cd file-system-browser-example
```

#### Install project dependencies
```bash
yarn install
```

#### Run the project locally in development mode
```bash
yarn dev
```

#### Run the project locally in production mode
Make sure to build the project at
least once before calling the start command
```bash
yarn build
yarn start
```

### Command arguments
You can enter up to 2 arguments.
Internally, it joins all the arguments together 
to form the file system root directory 
If provided, it will use the first absolute 
path it finds as the base url for the root directory.
Otherwise, it will use the root of the project 
as the root directory.

#### WIth no arguments
```bash
// Will open with "/user/code/my-project" as the root directory
yarn start
```

#### With a relative path
```bash
// Will open with "/user/code" as the root directory
yarn start ..
```

#### With an absolute path
```bash
// Will open with "/user/code/my-other-project" as the root directory
yarn start /user/code/my-other-project
```

#### With both an absolute path and a relative path
```bash
// Will open with "/user/code/my-other-project" as the root directory
yarn start /user/code/my-other-project/dir ..
```
