(function() {
    var openFileElement = document.getElementById('openFile');
    openFileElement.onclick = function(event) {
        var path = window.prompt("Enter js file name","/data/host/projects/personalProjects/fun/jseditor/scratch.js");
        document.getElementById('ff-int-path').value = path;
        self.port.emit("openFile", path);
        return false;
    };

    var saveFileElement = document.getElementById('saveFile');
    saveFileElement.onclick = function(event) {
        document.defaultView.postMessage("copyOld", "*");
        return false;
    }


    self.port.on("fileContents", function(text) {
        document.getElementById('ff-int-field').value = text;
        document.defaultView.postMessage("readNew", "*");
    });

    document.defaultView.addEventListener("message", function(event) {
        if (event.data == "readOld") {
            self.port.emit("saveFile", {"path":document.getElementById('ff-int-path').value, "contents":document.getElementById('ff-int-field').value});
        }
    });
}());