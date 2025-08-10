document.getElementById("compressBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("upload");
    const quality = parseFloat(document.getElementById("quality").value);

    if (!fileInput.files.length) {
        alert("Please upload an image first.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Keep same size
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Compress and convert to JPEG
            canvas.toBlob(
                (blob) => {
                    const compressedUrl = URL.createObjectURL(blob);

                    // Show preview
                    document.getElementById("outputImage").src = compressedUrl;

                    // Enable download
                    const downloadLink = document.getElementById("downloadLink");
                    downloadLink.href = compressedUrl;
                    downloadLink.style.display = "inline-block";
                },
                "image/jpeg",
                quality
            );
        };
    };

    reader.readAsDataURL(file);
});
