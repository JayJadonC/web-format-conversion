# web-format-conversion


I have built a website that includes a simple format conversion function. Everyone is welcome to contribute.

With the participation of DRAGON1573, there are now two versions, 1.0.1.1 and 1.0.1.2. In version 1.0.1.1, you need to edit the API key and API URL in the features to achieve the file conversion function; in version 1.0.1.2, it seems that you can run it directly. 

Here are some possible solutions to achieve this functionality.

## JavaScript Code (Frontend)

In the `script.js` file, we write JavaScript code to handle file selection and conversion requests.

```javascript
document.getElementById('convert-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a PDF file first');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/convert', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('File conversion failed');
        }
        return response.blob();
    }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.docx';
        a.click();
        URL.revokeObjectURL(url);
        alert('File conversion successful, download has started');
    }).catch(error => {
        console.error('Error:', error);
        alert('File conversion failed, please try again later');
    });
});
```

## Backend Code (Node.js + Express)

On the backend, we use Node.js and the Express framework to handle file uploads and conversion logic. 

First, install the necessary dependencies:

```bash
npm install express multer pdf-to-word
```

Then, write the backend code:

```javascript
const express = require('express');
const multer = require('multer');
const pdfToWord = require('pdf-to-word');
const fs = require('fs');
const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    }
});
const upload = multer({ storage: storage });

app.post('/convert', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const inputPath = file.path;
    const outputPath = file.path.replace('.pdf', '.docx');

    pdfToWord(inputPath, outputPath, (err) => {
        if (err) {
            console.error('Error converting file:', err);
            return res.status(500).send('File conversion failed');
        }
        res.download(outputPath, 'converted.docx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error sending file');
            }
            // Delete temporary files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

You can refine and improve my program based on what I have provided. I am immensely grateful for your efforts.
