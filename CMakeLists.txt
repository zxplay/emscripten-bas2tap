cmake_minimum_required(VERSION 3.0.0)

set(CMAKE_C_FLAGS "-Wall")

if (EMSCRIPTEN)
  set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} --pre-js ../pre.js --post-js ../post.js -s MODULARIZE=1 -s SINGLE_FILE=1")
endif()

set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -O0")
set(CMAKE_C_FLAGS_RELEASE "${CMAKE_C_FLAGS_RELEASE} -O2")

file(GLOB SOURCES "*.c")

add_executable(bas2tap ${SOURCES})
