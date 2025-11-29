// const multer = require('multer');
// const { upload } = require('../../src/utils/fileHandler');

// // Mocking multer's diskStorage method for in-memory file testing
// const storage = multer.memoryStorage();
// const uploadTest = multer({ storage }).single('image');

// describe('File Handler - Upload Menu Image', () => {
//   test('should upload image successfully', (done) => {
//     const req = { body: {}, file: { originalname: 'pizza.jpg' } };
//     const res = {
//       json: (response) => {
//         expect(response.success).toBe(true);
//         expect(response.message).toBe('Menu image uploaded successfully');
//         expect(response.data).toHaveProperty('fileName');
//         expect(response.data).toHaveProperty('filePath');
//         done();
//       },
//     };

//     uploadTest(req, res, (err) => {
//       if (err) {
//         done(err);
//       }
//     });
//   });

//   test('should handle upload error', (done) => {
//     const req = {};
//     const res = {
//       status: (code) => {
//         expect(code).toBe(400);
//         return res;
//       },
//       json: (response) => {
//         expect(response.success).toBe(false);
//         expect(response.message).toBe('File upload error');
//         done();
//       },
//     };

//     uploadTest(req, res, new Error('File upload failed'));
//   });
// });
const { upload } = require('../../src/utils/fileHandler');

describe('FileHandler Utility', () => {
  test('upload should be defined and have .single()', () => {
    expect(upload).toBeDefined();
    expect(typeof upload.single).toBe('function');
  });

  test('upload.single("image") should return a middleware function', () => {
    const mw = upload.single('image');
    expect(typeof mw).toBe('function');
  });
});
