cmake_minimum_required(VERSION 3.4.1)

# Add a shared library called "native-lib"
add_library(native-lib
            SHARED
            native-lib.cpp)  # Replace with the name of your C++ source file

# Find the log library for Android
find_library(log-lib
             log)

# Link the native-lib library with the log library
target_link_libraries(native-lib
                      ${log-lib})
