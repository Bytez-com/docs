# Setting Up the Julia Environment

To set up the required environment with the specified packages, follow these steps in the Julia REPL.

To start the Julia REPL, simply run the command `julia`

1. **Activate a New Project Environment**:
   
   ```julia
   using Pkg
   Pkg.activate(".")
   ```

   This command will create a new environment in the current directory, where `Project.toml` and `Manifest.toml` files will store the dependencies.

2. **Add the Required Packages**:

   Run the following command to install all necessary packages:

   ```julia
   Pkg.add(["Bytez", "HTTP", "Images", "Colors", "FileIO", "Luxor", "Base64"])
   ```

3. **Instantiate the Environment**:

   If you have a `Project.toml` and `Manifest.toml` file (such as the ones included in this repository), you can use `instantiate` to install all the exact dependencies:

   ```julia
   Pkg.instantiate()
   ```

4. **Verify Installation**:

   To ensure that all packages were installed correctly, you can test importing each package:

   ```julia
   using Bytez, HTTP, Images, Colors, FileIO, Luxor, Base64
   ```