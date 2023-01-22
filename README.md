# tmx-converter
Application to upload a TMX file and convert it into a clean CSV version.

## UI
Simple UI with an upload button that only accepts TMX files

## Steps
1. Take a TMX file
2. Extract the origin and target language
3. Save each language code in a separate array
4. Extract all origin/target segment pairs
5. Determine if segments are clean by evaluating length and presence of special characters
6. Create array for clean segments
7. Create array for dirty segments
8. Use both arrays to populate CSV files (clean and dirty version)
9. Return both CSV files via a downloadable link

