// 文件转换功能
function showDownloadLink(resultFile, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(resultFile);
    downloadLink.download = fileName;
    downloadLink.textContent = '下载转换结果';
    downloadLink.style.display = 'block';
    downloadLink.style.marginTop = '10px';
    return downloadLink;
}

document.addEventListener('DOMContentLoaded', function() {
    // PDF转Word
    const pdfToWordForm = document.getElementById('pdf-to-word-form');
    if (pdfToWordForm) {
        pdfToWordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('pdf-file');
            const resultArea = pdfToWordForm.querySelector('.result-area');
            
            if (fileInput.files.length > 0) {
                resultArea.textContent = '正在转换...';
                try {
                    // 这里将调用PDF转Word的代码
                    const resultFile = new Blob(['转换结果内容'], { type: 'application/msword' });
                    resultArea.textContent = '转换成功！';
                    resultArea.appendChild(showDownloadLink(resultFile, 'converted.docx'));
                } catch (error) {
                    resultArea.textContent = '转换失败：' + error.message;
                }
            }
        });
    }

    // Word转PDF
    const wordToPdfForm = document.getElementById('word-to-pdf-form');
    if (wordToPdfForm) {
        wordToPdfForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('word-file');
            const resultArea = wordToPdfForm.querySelector('.result-area');
            
            if (fileInput.files.length > 0) {
                resultArea.textContent = '正在转换...';
                try {
                    // 这里将调用Word转PDF的代码
                    const resultFile = new Blob(['转换结果内容'], { type: 'application/pdf' });
                    resultArea.textContent = '转换成功！';
                    resultArea.appendChild(showDownloadLink(resultFile, 'converted.pdf'));
                } catch (error) {
                    resultArea.textContent = '转换失败：' + error.message;
                }
            }
        });
    }

    // PPT转PDF
    const pptToPdfForm = document.getElementById('ppt-to-pdf-form');
    if (pptToPdfForm) {
        pptToPdfForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('ppt-file');
            const resultArea = pptToPdfForm.querySelector('.result-area');
            
            if (fileInput.files.length > 0) {
                resultArea.textContent = '正在转换...';
                try {
                    // 这里将调用PPT转PDF的代码
                    const resultFile = new Blob(['转换结果内容'], { type: 'application/pdf' });
                    resultArea.textContent = '转换成功！';
                    resultArea.appendChild(showDownloadLink(resultFile, 'converted.pdf'));
                } catch (error) {
                    resultArea.textContent = '转换失败：' + error.message;
                }
            }
        });
    }

    // PDF转PPT
    const pdfToPptForm = document.getElementById('pdf-to-ppt-form');
    if (pdfToPptForm) {
        pdfToPptForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('pdf-file');
            const resultArea = pdfToPptForm.querySelector('.result-area');
            
            if (fileInput.files.length > 0) {
                resultArea.textContent = '正在转换...';
                try {
                    // 这里将调用PDF转PPT的代码
                    const resultFile = new Blob(['转换结果内容'], { type: 'application/vnd.ms-powerpoint' });
                    resultArea.textContent = '转换成功！';
                    resultArea.appendChild(showDownloadLink(resultFile, 'converted.pptx'));
                } catch (error) {
                    resultArea.textContent = '转换失败：' + error.message;
                }
            }
        });
    }
});
