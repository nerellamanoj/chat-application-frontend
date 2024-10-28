cmake_minimum_required(VERSION 3.10)

# Set the project name
project(frontend)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add the executable
add_executable(frontend main.cpp)  # Replace 'main.cpp' with your actual source file names
