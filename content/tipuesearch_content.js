var tipuesearch = {"pages": [{'title': 'About', 'text': 'Repo:  https://github.com/mdewcm2023/5j-5jgx \n site:  https://mdewcm2023.github.io/5j-5jgx \n on cad2:  http://cad2.cycu.org/~yen/5jgx/', 'tags': '', 'url': 'About.html'}, {'title': 'Downloads', 'text': 'OBS:  https://obsproject.com/download \n Virtualbox:  https://www.virtualbox.org/wiki/Downloads \n wcm_portable_w2-5.7z  (下載 220MB 解開後 880MB) \n', 'tags': '', 'url': 'Downloads.html'}, {'title': 'OBS', 'text': '議題: 如何設定鍵盤快捷鍵, 讓啟動與關閉錄影過程不會顯示在錄製的影片中. \n 議題: 手機可以做為 OBS 的一個 camera 來源嗎? \n 議題: OBS 可以透過 Youtube 或其他雲端網站進行 live streaming (現場串流直播) \n 利用程式控制 OBS: \n https://docs.obsproject.com/scripting   \n', 'tags': '', 'url': 'OBS.html'}, {'title': 'Upload', 'text': '準備在 Server 端加上 image files rename 功能. \n Since the resolution of mobile phone camera is quite high, in order to get the resonable resolution images file upload for cmsimde based CMS, image files needed to reduce before uploading. \n Add the following functions to axuploader.js: \n // Function to resize an image\nfunction resizeImage(file, maxWidth, callback) {\n  // Create a new FileReader object\n  const reader = new FileReader();\n\n  // Add an event listener to the FileReader object that listens for when the file is loaded\n  reader.addEventListener("load", () => {\n    // Create a new image object\n    const img = new Image();\n\n      // Add an event listener to the image object that listens for when the image is loaded\n      img.addEventListener("load", () => {\n      var ratio = Math.min(maxWidth / img.width);\n      // Create a new canvas object\n      const canvas = document.createElement("canvas");\n\n      // Set the canvas width and height to the new width and height of the image\n\t  canvas.width = img.width * ratio;\n\t  canvas.height = img.height * ratio;\n\n      // Draw the image onto the canvas with the new width and height\n      const ctx = canvas.getContext("2d");\n      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);\n\n      // Convert the canvas to a data URL\n      const dataUrl = canvas.toDataURL("image/jpeg");\n\n      // Create a new file object from the data URL\n      const resizedFile = dataURLtoFile(dataUrl, file.name);\n\n      // Return the resized file\n      callback(resizedFile);\n    });\n\n    // Set the source of the image object to the data URL of the file\n    img.src = reader.result;\n  });\n\n  // Read the file as a data URL\n  reader.readAsDataURL(file);\n}\n\n// Function to convert a data URL to a file object\nfunction dataURLtoFile(dataUrl, filename) {\n  const arr = dataUrl.split(",");\n  const mime = arr[0].match(/:(.*?);/)[1];\n  const bstr = atob(arr[1]);\n  let n = bstr.length;\n  const u8arr = new Uint8Array(n);\n  while (n--) {\n    u8arr[n] = bstr.charCodeAt(n);\n  }\n  return new File([u8arr], filename, { type: mime });\n}', 'tags': '', 'url': 'Upload.html'}, {'title': 'ax5', 'text': 'using ax5: \n var uploader = new ax5.ui.uploader({\n  target: $(\'[data-ax5uploader="basic"]\'),\n  form: {\n    action: "/upload",\n    fileName: "file"\n  },\n  multiple: true,\n  manualUpload: true,\n  onprogress: function () {},\n  onuploaderror: function () {},\n  onuploaded: function () {}\n});\n\nuploader.on(\'beforeUpload\', function () {\n  var files = uploader.getFiles();\n  for (var i = 0; i < files.length; i++) {\n    var file = files[i];\n    var extension = file.name.split(\'.\').pop().toLowerCase();\n    if (extension == \'jpg\' || extension == \'png\' || extension == \'gif\') {\n      var img = new Image();\n      img.src = window.URL.createObjectURL(file);\n      img.onload = function () {\n        if (this.width > 800) {\n          var canvas = document.createElement(\'canvas\');\n          var ctx = canvas.getContext(\'2d\');\n          var ratio = 800 / this.width;\n          canvas.width = this.width * ratio;\n          canvas.height = this.height * ratio;\n          ctx.drawImage(this, 0, 0, canvas.width, canvas.height);\n          canvas.toBlob(function (blob) {\n            file = new File([blob], file.name, {type: file.type});\n          });\n        }\n      };\n    }\n  }\n});\n \n html side: \n <!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>My Web Application</title>\n\t<!-- include ax5 library from CDN -->\n\t<script src="https://cdn.rawgit.com/ax5ui/ax5core/master/dist/ax5core.min.js"></script>\n\t<script src="https://cdn.rawgit.com/ax5ui/ax5ui-datepicker/master/dist/ax5ui-datepicker.min.js"></script>\n\t<link rel="stylesheet" href="https://cdn.rawgit.com/ax5ui/ax5ui-datepicker/master/dist/ax5ui-datepicker.css">\n</head>\n<body>\n\t<!-- your web application content goes here -->\n</body>\n</html>\n \n ax5 works with Brython: \n from browser import document, alert\nimport ax5.ui.datepicker as datepicker\n\n# create a datepicker component\ndp = datepicker.create(\n  document["datepicker"],\n  {"mode": "date", "selectMode": "day", "control": {"left": "<", "yearTmpl": "%s", "monthTmpl": "%s"}},\n  {"onStateChanged": lambda e: alert(e["state"]["focusedDate"])},\n  {"minDate": "2020-01-01", "maxDate": "2023-12-31", "defaultDate": "2023-04-27"}\n)\n\n# show the datepicker component when the button is clicked\ndef show_datepicker(ev):\n  dp.popup()\n\ndocument["btn-show-datepicker"].bind("click", show_datepicker)\n \n html side: \n <!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>My Brython App</title>\n  <script src="https://cdn.jsdelivr.net/npm/brython@3.9.12/brython.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/ax5core@1.12.2/dist/ax5core.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/ax5ui-datepicker@1.0.1/dist/ax5ui-datepicker.min.js"></script>\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ax5ui-datepicker@1.0.1/dist/ax5ui-datepicker.css">\n</head>\n<body onload="brython()">\n  <button id="btn-show-datepicker">Show Datepicker</button>\n  <div id="datepicker"></div>\n  <script type="text/python">\n    # your Python code goes here\n  </script>\n</body>\n</html>\n \n Create pull-down menu by using ax5 and Brython: \n from browser import document, alert\nimport ax5.ui.menu as menu\n\n# define the menu items\nmenu_items = [\n    {"label": "Item 1", "value": "item1"},\n    {"label": "Item 2", "value": "item2"},\n    {"label": "Item 3", "value": "item3"},\n    {"label": "Item 4", "value": "item4"}\n]\n\n# create the menu component\nm = menu.create(\n    document["menu"],\n    {"theme": "default", "direction": "auto", "offset": {"left": 0, "top": 0}},\n    {"onSelect": lambda e: alert(e["selected"])},\n    menu_items\n)\n\n# show the menu component when the button is clicked\ndef show_menu(ev):\n    m.popup()\n\ndocument["btn-show-menu"].bind("click", show_menu)\n \n html side: \n <!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>My Brython App</title>\n    <script src="https://cdn.jsdelivr.net/npm/brython@3.9.12/brython.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/ax5core@1.12.2/dist/ax5core.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/ax5ui-menu@1.0.7/dist/ax5ui-menu.min.js"></script>\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ax5ui-menu@1.0.7/dist/ax5ui-menu.css">\n</head>\n<body onload="brython()">\n    <button id="btn-show-menu">Show Menu</button>\n    <div id="menu"></div>\n    <script type="text/python">\n        # your Python code goes here\n    </script>\n</body>\n</html>\n \n Using axios: \n from browser import document, ajax\nimport axios\n\n# function to handle form submission\ndef submit_form(ev):\n    ev.preventDefault()  # prevent default form submission\n    form_data = FormData(document["my-form"])  # create FormData object from form\n    axios.post("/submit", data=form_data)  # send form data to Flask server\n\ndocument["my-form"].bind("submit", submit_form)\n \n Flask side: \n from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.route(\'/submit\', methods=[\'POST\'])\ndef submit():\n    file = request.files[\'file\']  # get the file object from the request\n    # process the file object here\n    return \'File uploaded successfully\'\n\nif __name__ == \'__main__\':\n    app.run()\n \n Using axios and Brython to GET: \n import axios\n\naxios.get(\'https://api.example.com/data\')\n    .then(function(response) {\n        console.log(response.data);\n    })\n    .catch(function(error) {\n        console.error(error);\n    });\n \n axios and traditional XMLHttpRequest (XHR) (also known as AJAX) are both ways to make HTTP requests in JavaScript. While both can be used to accomplish similar tasks, axios provides a number of advantages over traditional AJAX: \n \n Promise-based API: axios uses a promise-based API, which makes it easier to manage asynchronous code and handle errors. \n Automatic request cancellation: axios allows you to cancel requests that are in progress, which can help to improve performance and reduce network traffic. \n Intercepting requests and responses: axios allows you to intercept requests and responses, which can be useful for adding authentication headers, logging, or modifying requests or responses. \n Support for Cross-site requests: axios includes built-in support for cross-site requests (CSRF) protection, which is important for security when making requests to a different domain than the one hosting the page. \n Simpler syntax: axios provides a simpler and more consistent API for making requests than traditional AJAX. \n \n Overall, axios provides a more modern and convenient way to make HTTP requests than traditional AJAX, and is widely used and well-documented. However, there are still situations where traditional AJAX may be more appropriate, depending on the specific requirements of your application. \n axios was developed by Matt Zabriskie, a web developer based in New York City. It was originally released in 2014 as an alternative to the jQuery.ajax() function, and has since become a popular library for making HTTP requests in JavaScript applications. The project is open source and hosted on GitHub, where it is maintained by a community of contributors. The library is licensed under the MIT license, which allows for free use and modification of the code in both open source and commercial projects.', 'tags': '', 'url': 'ax5.html'}, {'title': 'Games', 'text': 'Learn Python and Javascript: \n Python: \n python_beginners.pdf \n Programming Microcontrollers with Python  (2021) (必須使用校園網路(Proxy or VPN) 才能下載) \n Learn Raspberry Pi Programming with Python  (2014) (必須使用校園網路(Proxy or VPN) 才能下載) \n Javascript: \n Build Your Own 2D Game Engine and Create Great Web Games  (2022) (必須使用校園網路(Proxy or VPN) 才能下載) \n Brython:  https://brython.info/ \n https://brython.info/gallery/bricks_py.html \n https://brython.info/gallery/3Dwalker.html \n https://bmsleight.github.io/brython-blocks/ \n https://brython.info/gallery/taquin.html \n https://github.com/BrythonServer/ggame \n https://mde.tw/wcm2023/content/Reeborg.html', 'tags': '', 'url': 'Games.html'}, {'title': 'w11', 'text': 'pj2bg5  ( repo ) pj2bg9  ( repo ) pj2bg10  ( repo ) pj2bg1  ( repo ) pj2bg2  ( repo ) pj2bg13  ( repo ) pj2bg15  ( repo ) pj2bg8  ( repo ) pj2bg16  ( repo ) pj2bg3  ( repo ) pj2bg14  ( repo ) 60 pj2bg7  ( repo ) pj2bg4  ( repo ) pj2bg11  ( repo ) pj2bg12  ( repo ) pj2bg6  ( repo )\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', 'tags': '', 'url': 'w11.html'}, {'title': 'Git', 'text': 'fatal: \xa0Could not resolve host: github.com \n 發生原因: 目前的網路設定無法與 github.com 網站連線 \n 解決方法: \n 若使用 https 連線, 請檢查 home_ipv6 目錄下的 .gitconfig, 可能沒有設定 http.proxy \n 若使用 SSH 連線, 請檢查 Putty 設定的 session 中 Proxy, 可能沒有設定 http 對應的代理主機', 'tags': '', 'url': 'Git.html'}, {'title': 'cmsimde', 'text': "準備利用\xa0 https://stackoverflow.com/questions/23945494/use-html5-to-resize-an-image-before-upload \xa0中所提供的方法在 5j-5jgx 倉儲中的 cmsimde 進行修改, 以便 resize image before uploading. \n To resize an image before uploading it using the jQuery AXuploader, you can use the following steps: \n \n Load the image using the FileReader API. \n Create an Image object and set its src property to the result of the FileReader API. \n for the onload event of the Image object to fire, indicating that the image has been fully loaded. \n Create a canvas element and set its dimensions to the desired size of the resized image. \n Draw the image onto the canvas using the drawImage method, passing in the Image object as the source and the canvas as the destination. \n Convert the canvas to a data URI using the toDataURL method. \n Convert the data URI to a Blob using the dataURItoBlob function. \n \n Here's an example implementation of the above steps: \n // define the maximum dimensions of the resized image\nconst MAX_WIDTH = 800;\nconst MAX_HEIGHT = 800;\n\n// define the dataURItoBlob function\nfunction dataURItoBlob(dataURI) {\n  const byteString = atob(dataURI.split(',')[1]);\n  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];\n  const ab = new ArrayBuffer(byteString.length);\n  const ia = new Uint8Array(ab);\n  for (let i = 0; i < byteString.length; i++) {\n    ia[i] = byteString.charCodeAt(i);\n  }\n  return new Blob([ab], { type: mimeString });\n}\n\n// handle the file upload\n$('#file-input').on('change', function() {\n  const file = this.files[0];\n  const reader = new FileReader();\n  reader.readAsDataURL(file);\n  reader.onload = function() {\n    const img = new Image();\n    img.onload = function() {\n      let width = img.width;\n      let height = img.height;\n\n      // calculate the new dimensions of the resized image\n      if (width > height) {\n        if (width > MAX_WIDTH) {\n          height *= MAX_WIDTH / width;\n          width = MAX_WIDTH;\n        }\n      } else {\n        if (height > MAX_HEIGHT) {\n          width *= MAX_HEIGHT / height;\n          height = MAX_HEIGHT;\n        }\n      }\n\n      // create a canvas and draw the resized image onto it\n      const canvas = document.createElement('canvas');\n      canvas.width = width;\n      canvas.height = height;\n      const ctx = canvas.getContext('2d');\n      ctx.drawImage(img, 0, 0, width, height);\n\n      // convert the canvas to a data URI and then to a Blob\n      const dataURL = canvas.toDataURL(file.type);\n      const blob = dataURItoBlob(dataURL);\n\n      // upload the resized image using the AXuploader\n      $.axuploader({\n        url: 'upload.php',\n        data: {\n          file: blob\n        },\n        success: function(response) {\n          console.log('Upload successful:', response);\n        },\n        error: function(xhr) {\n          console.error('Upload failed:', xhr.responseText);\n        }\n      });\n    };\n    img.src = reader.result;\n  };\n});\n \n In the above code, the MAX_WIDTH and MAX_HEIGHT constants define the maximum dimensions of the resized image. The dataURItoBlob function is a utility function that converts a data URI to a Blob. The change event of the file input element is handled to perform the image resizing and upload using the AXuploader. \n If server side is Flask based: \n from flask import Flask, request\nimport base64\nimport uuid\nimport os\n\napp = Flask(__name__)\n\n@app.route('/upload', methods=['POST'])\ndef upload():\n    if 'file' in request.files:\n        file = request.files['file']\n        # process the uploaded file\n        if file:\n            # decode the base64 data\n            data = base64.b64decode(request.form['file_data'])\n\n            # save the data to a file\n            filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1]\n            with open(os.path.join('uploads', filename), 'wb') as f:\n                f.write(data)\n\n            return 'Upload successful'\n    return 'Upload failed'\n \n In the above code, the Flask server defines a route /upload that receives a POST request containing the uploaded file data as a base64-encoded string in the request body. The code decodes the base64 data, generates a unique filename, and saves the data to a file in the uploads directory. The filename is returned as a response to indicate the successful upload. \n To make a request to this Flask endpoint from the client-side using jQuery AXuploader, you can modify the data option in the $.axuploader method to include the base64-encoded data: \n $.axuploader({\n    url: '/upload',\n    data: {\n        file_data: canvas.toDataURL(file.type).split(',')[1] // pass the base64-encoded data\n    },\n    success: function(response) {\n        console.log('Upload successful:', response);\n    },\n    error: function(xhr) {\n        console.error('Upload failed:', xhr.responseText);\n    }\n});\n \n In the above code, the file_data field is added to the data option of the $.axuploader method and its value is set to the base64-encoded data URI of the resized image. This data is sent to the Flask server as the request body of the POST request. The Flask server can then decode this data and save it to a file as shown in the previous code snippet. \n If file is uploaded chunk by chunk: \n Python \n from flask import Flask, request\nimport base64\nimport uuid\nimport os\n\napp = Flask(__name__)\n\n@app.route('/upload', methods=['POST'])\ndef upload():\n    if 'file' in request.files:\n        file = request.files['file']\n        # process the uploaded file\n        if file:\n            # initialize the data buffer\n            data = b''\n            # read the chunks and append to the buffer\n            while True:\n                chunk = file.read(1024 * 1024) # read 1MB chunk\n                if not chunk:\n                    break\n                data += chunk\n\n            # decode the base64 data\n            data = base64.b64decode(request.form['file_data'])\n\n            # save the data to a file\n            filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1]\n            with open(os.path.join('uploads', filename), 'wb') as f:\n                f.write(data)\n\n            return 'Upload successful'\n    return 'Upload failed'\n \n Javascript: \n $.axuploader({\n    url: '/upload',\n    data: {\n        file_data: canvas.toDataURL(file.type).split(',')[1] // pass the base64-encoded data\n    },\n    chunkSize: 1024 * 1024, // upload in 1MB chunks\n    success: function(response) {\n        console.log('Upload successful:', response);\n    },\n    error: function(xhr) {\n        console.error('Upload failed:', xhr.responseText);\n    }\n});\n \n", 'tags': '', 'url': 'cmsimde.html'}, {'title': 'Brython', 'text': 'https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation (Python 採 4 個 Spaces 縮排, 以界定執行範圍) \n Variables ( Python Keywords ) \n Comments (# 單行註解, 三個單引號或三個雙引號標註多行註解) \n Numbers  (整數 int(), 浮點數 float()) \n Strings  (字串) \n print (Python 內建函式,  print()  函式) \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris Rotating Block \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n \n', 'tags': '', 'url': 'Brython.html'}, {'title': 'Brython_ex2', 'text': 'This code uses the Euler method to approximate the solution to the ODE dy/dx = x - y with an initial condition of y0 = 1.0. The solution is calculated for a range of x values from 0 to 5. \n \n \n \n \n Solve ODE: \n from browser import document\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new paragraph element and set its text content to the solution\np = document.createElement(\'p\')\np.textContent = f"The solution to the ODE is: {y}"\n\n# Append the paragraph element to the body of the webpage\ndocument.body.appendChild(p) \n \n \n \n \n \n Brython environment and  Plotly.js : \n <script src="./../cmsimde/static/brython.js"></script>\n<script src="./../cmsimde/static/brython_stdlib.js"></script>\n<script>// <![CDATA[\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\']});\n}\n// ]]></script>\n<p id="brython_div"></p> \n Brython programe with Plotly.js: \n from browser import document, window\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new div element to hold the plot\n#plot_div = document.createElement(\'div\')\n#plot_div.id = \'plot\'\n#document.body.appendChild(plot_div)\nplot_div = document["brython_div"]\n\n# Plot the solution using plotly.js\ndata = [{\'x\': x, \'y\': y}]\nwindow.Plotly.newPlot(\'brython_div\', data) \n This code defines a function dy_dx that represents the mass-spring-damper ordinary differential equation. The Euler method is used to solve this equation for a range of x values from 0 to 20 with initial conditions of y0 = [1.0, 0.0]. The solution is then plotted on the webpage using  plotly.js . \n \n \n This code defines a function dy_dx that represents the mass-spring-damper system with a PID controller. The gains of the PID controller are set to Kp = 10.0, Ki = 1.0, and Kd = 0.5. The Euler method is used to solve this system of equations for a range of x values from 0 to 20 with initial conditions of y0 = [0.0, 0.0, 0.0, 0.0]. The response of the system is then plotted on the webpage using  plotly.js . \n \n \n \n \n \n \n \n STL part viewer \n \n \n Using  sine-cosine algorithm  to optimize with constraints in Brython: \n <!DOCTYPE html>\n<html>\n<head>\n    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3/dist/brython_stdlib"></script>\n</head>\n<body onload="brython()">\n\n<div id="output"></div>\n\n<script type="text/python">\nfrom browser import document\nfrom random import random, uniform\nfrom math import sin, cos, pi\n\n# Define the objective function\ndef objective_function(x):\n    return x[0]**2 + x[1]**2\n\n# Define the constraint functions\ndef constraint1(x):\n    return x[0] + x[1] - 2\n\ndef constraint2(x):\n    return 1 - x[0] - x[1]\n\n# Define the penalty function\ndef penalty_function(x):\n    penalty = 0\n    if constraint1(x) > 0:\n        penalty += constraint1(x)\n    if constraint2(x) > 0:\n        penalty += constraint2(x)\n    return penalty\n\n# Define the fitness function\ndef fitness_function(x):\n    return objective_function(x) + penalty_function(x)\n\n# Define the sine cosine algorithm\ndef sine_cosine_algorithm(fitness_function, dimension, lower_bound, upper_bound, population_size, max_iterations):\n    # Initialize the population\n    population = [[uniform(lower_bound, upper_bound) for _ in range(dimension)] for _ in range(population_size)]\n    population_fitness = [fitness_function(individual) for individual in population]\n\n    # Initialize the best solution\n    best_solution = population[0]\n    best_fitness = population_fitness[0]\n\n    # Main loop of the algorithm\n    for iteration in range(max_iterations):\n        # Calculate the value of a and r1\n        a = 2 - iteration * (2 / max_iterations)\n        r1 = 2 * pi * random()\n\n        # Update the population\n        for i in range(population_size):\n            # Calculate the value of r2, r3 and r4\n            r2 = 2 * random()\n            r3 = 2 * random()\n            r4 = random()\n\n            # Update the individual\n            for j in range(dimension):\n                if r4 < 0.5:\n                    population[i][j] += r1 * sin(r2) * abs(r3 * best_solution[j] - population[i][j])\n                else:\n                    population[i][j] += r1 * cos(r2) * abs(r3 * best_solution[j] - population[i][j])\n\n                # Make sure the individual is within the bounds\n                if population[i][j] < lower_bound:\n                    population[i][j] = lower_bound\n                elif population[i][j] > upper_bound:\n                    population[i][j] = upper_bound\n\n            # Calculate the fitness of the individual\n            population_fitness[i] = fitness_function(population[i])\n\n            # Update the best solution\n            if population_fitness[i] < best_fitness:\n                best_solution = population[i]\n                best_fitness = population_fitness[i]\n\n        # Print the current iteration and best fitness\n        print(f\'Iteration: {iteration + 1}, Best Fitness: {best_fitness:.6f}\')\n\n    return best_solution\n\n# Run the sine cosine algorithm to solve the optimization problem with constraints\nbest_solution = sine_cosine_algorithm(fitness_function, dimension=2, lower_bound=-10, upper_bound=10, population_size=50, max_iterations=100)\n\n# Print the result\noutput_div = document[\'output\']\noutput_div.text = f\'Best Solution: {best_solution}\'\n</script>\n\n<script src="https://cdn.jsdelivr.net/npm/brython@3/dist/brython"></script>\n</body>\n</html> \n Plot the result by using  plotly.js : \n <!DOCTYPE html>\n<html>\n<head>\n    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3/dist/brython_stdlib"></script>\n    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>\n</head>\n<body onload="brython()">\n\n<div id="output"></div>\n<div id="plot"></div>\n\n<script type="text/python">\nfrom browser import document\nfrom random import random, uniform\nfrom math import sin, cos, pi\n\n# Define the objective function\ndef objective_function(x):\n    return x[0]**2 + x[1]**2\n\n# Define the constraint functions\ndef constraint1(x):\n    return x[0] + x[1] - 2\n\ndef constraint2(x):\n    return 1 - x[0] - x[1]\n\n# Define the penalty function\ndef penalty_function(x):\n    penalty = 0\n    if constraint1(x) > 0:\n        penalty += constraint1(x)\n    if constraint2(x) > 0:\n        penalty += constraint2(x)\n    return penalty\n\n# Define the fitness function\ndef fitness_function(x):\n    return objective_function(x) + penalty_function(x)\n\n# Define the sine cosine algorithm\ndef sine_cosine_algorithm(fitness_function, dimension, lower_bound, upper_bound, population_size, max_iterations):\n    # Initialize the population\n    population = [[uniform(lower_bound, upper_bound) for _ in range(dimension)] for _ in range(population_size)]\n    population_fitness = [fitness_function(individual) for individual in population]\n\n    # Initialize the best solution\n    best_solution = population[0]\n    best_fitness = population_fitness[0]\n\n    # Main loop of the algorithm\n    for iteration in range(max_iterations):\n        # Calculate the value of a and r1\n        a = 2 - iteration * (2 / max_iterations)\n        r1 = 2 * pi * random()\n\n        # Update the population\n        for i in range(population_size):\n            # Calculate the value of r2, r3 and r4\n            r2 = 2 * random()\n            r3 = 2 * random()\n            r4 = random()\n\n            # Update the individual\n            for j in range(dimension):\n                if r4 < 0.5:\n                    population[i][j] += r1 * sin(r2) * abs(r3 * best_solution[j] - population[i][j])\n                else:\n                    population[i][j] += r1 * cos(r2) * abs(r3 * best_solution[j] - population[i][j])\n\n                # Make sure the individual is within the bounds\n                if population[i][j] < lower_bound:\n                    population[i][j] = lower_bound\n                elif population[i][j] > upper_bound:\n                    population[i][j] = upper_bound\n\n            # Calculate the fitness of the individual\n            population_fitness[i] = fitness_function(population[i])\n\n            # Update the best solution\n            if population_fitness[i] < best_fitness:\n                best_solution = population[i]\n                best_fitness = population_fitness[i]\n\n        # Print the current iteration and best fitness\n        print(f\'Iteration: {iteration + 1}, Best Fitness: {best_fitness:.6f}\')\n\n    return best_solution\n\n# Run the sine cosine algorithm to solve the optimization problem with constraints\nbest_solution = sine_cosine_algorithm(fitness_function, dimension=2, lower_bound=-10, upper_bound=10, population_size=50, max_iterations=100)\n\n# Print the result\noutput_div = document[\'output\']\noutput_div.text = f\'Best Solution: {best_solution}\'\n\n# Plot the result using Plotly.js\ndata = [\n    {\n        \'x\': [best_solution[0]],\n        \'y\': [best_solution[1]],\n        \'mode\': \'markers\',\n        \'marker\': {\'size\': 12},\n        \'name\': \'Best Solution\'\n    }\n]\n\nlayout = {\n    \'xaxis\': {\'range\': [-10, 10]},\n    \'yaxis\': {\'range\': [-10, 10]},\n}\n\nPlotly.newPlot(\'plot\', data, layout)\n</script>\n\n<script src="https://cdn.jsdelivr.net/npm/brython@3/dist/brython"></script>\n</body>\n</html> \n', 'tags': '', 'url': 'Brython_ex2.html'}]};