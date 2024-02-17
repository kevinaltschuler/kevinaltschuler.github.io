import * as pdfjsDist from "./pdf.mjs";
import * as pdfjsWorker from "./pdf.worker.mjs";

// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = "./img/resume10.pdf";

// Loaded via <script> tag, create shortcut to access PDF.js exports.
// The workerSrc property shall be specified.
pdfjsDist.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Asynchronous download of PDF
var loadingTask = pdfjsDist.getDocument(url);
loadingTask.promise.then(
  function (pdf) {
    console.log("PDF loaded");

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function (page) {
      console.log("Page loaded");

      var scale = 4;
      var viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById("the-canvas");
      var context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.style.width = "45%";
      canvas.height = viewport.height;
      canvas.style.height = "auto";

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log("Page rendered");
      });
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
