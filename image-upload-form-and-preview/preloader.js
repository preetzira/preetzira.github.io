(oFReader = new FileReader()),
  (rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i);

oFReader.onload = function (oFREvent) {
  var img = new Image();
  img.onload = function () {
    document.getElementById('originalImg').src = img.src;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    document.getElementById('uploadPreview').src = canvas.toDataURL();
  };
  img.src = oFREvent.target.result;
};

function loadImageFile() {
  if (document.getElementById('uploadImage').files.length === 0) {
    return;
  }
  var oFile = document.getElementById('uploadImage').files[0];
  if (!rFilter.test(oFile.type)) {
    alert('You must select a valid image file!');
    return;
  }
  oFReader.readAsDataURL(oFile);
}
