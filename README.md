# tmx-converter
Application to upload a TMX file and convert it into a csv version.

## UI
Simple UI with an upload button that only accepts TMX files

## Steps
1. Take a TMX file
2. Extract the origin and target language
3. Save each language code in a separate array
4. Extract all origin segments and push them to the origin language array
5. Extract all target segments and push them to the target language array
6. Use both arrays to populate a csv file
7. Return the csv file

