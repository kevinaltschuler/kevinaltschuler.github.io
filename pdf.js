import * as pdfjsDist from "./pdf.mjs";
import * as pdfjsWorker from "./pdf.worker.mjs";

// Wait for DOM to be ready
function loadPDF() {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = "./img/resume12.idml.pdf";

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

        // Get the page dimensions at scale 1
        var viewport = page.getViewport({ scale: 1 });

        // Calculate the scale to fit the page nicely on the screen
        // Use 90% of viewport width on mobile, 80% on tablet/desktop, max 1000px
        var maxWidth = Math.min(window.innerWidth * 0.9, 1000);
        var scale = maxWidth / viewport.width;

        // Recalculate viewport with the responsive scale
        viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("the-canvas");
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }
        var context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Set CSS dimensions to match canvas dimensions for crisp rendering
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        canvas.style.maxWidth = "90vw";
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
}

// Load PDF when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPDF);
} else {
  loadPDF();
}
