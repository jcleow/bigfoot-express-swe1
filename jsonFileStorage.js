import { readFile, writeFile } from 'fs';
// read a file. call the callback with the file contents
export function read(filename, callback) {
  const whenFileIsRead = (error, jsonContent) => {
    // check for reading errors
    if (error) {
      console.log('reading error', error);
      return;
    }

    // start dealing with the JSON

    // parse the string into a *real* JavaScript object
    const content = JSON.parse(jsonContent);

    // call the function that got passed in
    callback(content);
  };

  // read the file
  readFile(filename, 'utf-8', whenFileIsRead);
}

// write a file with the object passed in
export function write(filename, content, callback) {
  const outputContent = JSON.stringify(content);

  writeFile(filename, outputContent, (writingError) => {
    if (writingError) {
      console.log('error writing', writingError);
    } else {
      // file written successfully
      console.log('success!');
      callback();
    }
  });
}
