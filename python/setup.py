from setuptools import setup, find_packages

setup(
    name='bytez',  # Name of your package
    version='0.2.19',
    packages=find_packages(),
    description='Python API client for Bytez service',
    long_description=open('./readme.md').read(),
    long_description_content_type='text/markdown',
    author='Bytez',
    url='https://github.com/bytez-com/docs',
    install_requires=[
        'requests>=2.32.1',  # Allow any 2.x version of requests
    ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
    ],
)