import shutil
import subprocess
import re

def increment_version(version):
    """ Increment the patch number in a semantic version string """
    major, minor, patch = map(int, version.split('.'))
    return f'{major}.{minor}.{patch + 1}'

def update_version_in_file(file_path, new_version):
    """ Update the version in the setup.py file """
    with open(file_path, 'r') as file:
        content = file.read()

    # This assumes `version='x.y.z'` format; adjust regex as needed
    new_content = re.sub(r"(version=['\"])(\d+\.\d+\.\d+)(['\"])", f"\\g<1>{new_version}\\g<3>", content)

    with open(file_path, 'w') as file:
        file.write(new_content)

def main():
    # Step 1: Delete /dist/* contents
    shutil.rmtree('dist', ignore_errors=True)

    # Step 2: Increment version in setup.py
    setup_path = 'setup.py'
    
    with open(setup_path, 'r') as file:
        content = file.read()
        current_version = re.search(r"version=['\"](\d+\.\d+\.\d+)['\"]", content).group(1)
    
    new_version = increment_version(current_version)
    update_version_in_file(setup_path, new_version)

    # Step 3: Run sdist and bdist_wheel
    subprocess.run(['python', 'setup.py', 'sdist', 'bdist_wheel'], check=True)

    # Step 4: Upload with twine
    subprocess.run(['python3', '-m', 'twine', 'upload', 'dist/*'], check=True)

if __name__ == '__main__':
    main()
