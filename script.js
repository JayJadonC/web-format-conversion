// OnlineConvertFree API的URL和API密钥
const API_URL = 'https://api-tasker.onlineconvertfree.com/api/upload';
const API_KEY = 'cb5f580f0375f29cf19bef365b30a22b';

/**
 * 文件格式转换
 *
 * @param {string} sourceId 原始文件元素ID
 * @param {string} target 目标格式
 */
async function formatConverter(sourceId, target) {
    const sourceFile = document.getElementById(sourceId).files[0];
    const formData = new FormData();
    formData.append("file", sourceFile);
    formData.append("to", target);
    formData.append("compress", "");
    formData.append("token", API_KEY);
    fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: formData
    }).then(response => {

        if (!response.ok) {
            throw new Error("无法转换文件！");
        }
        return response.json();
    }).then(
        json => {
            if (json.STATUS === "READY") {
                const downloadLink = document.createElement("a");
                downloadLink.href = json.CONVERTED_FILE;
                downloadLink.click();
            } else {
                throw new Error("未能获取转换后的文件！");
            }
        }
    ).catch(console.error);
}

// PDF转Word
function pdfToWord() {
    const input = document.getElementById('pdf-file');
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('output_format', 'docx');

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const url = data.result.url;
                const a = document.createElement('a');
                a.href = url;
                a.download = 'converted.docx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                console.error('Error:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}
