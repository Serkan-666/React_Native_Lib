const getFileName = (url) => {
  const filename = url.split('/').pop();
  return filename;
};

const getFileType = (url) => {
  const fileExtension = url.split('.').pop();
  let fileType;

  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
      fileType = 'image/jpeg';
      break;
    case 'png':
      fileType = 'image/png';
      break;
    case 'gif':
      fileType = 'image/gif';
      break;
    case 'pdf':
      fileType = 'application/pdf';
      break;
    case 'doc':
    case 'docx':
      fileType = 'application/msword';
      break;
    case 'xls':
    case 'xlsx':
      fileType = 'application/vnd.ms-excel';
      break;
    case 'ppt':
    case 'pptx':
      fileType = 'application/vnd.ms-powerpoint';
      break;
    case 'txt':
      fileType = 'text/plain';
      break;
    case 'mp4':
      fileType = 'video/mp4';
      break;
    case 'mp3':
      fileType = 'audio/mpeg';
      break;
    default:
      fileType = 'application/octet-stream';
  }

  return fileType;
};
const checkImage = (url) => {
  const fileExtension = url.split('.').pop();

  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return true;
    default:
      return false;
  }
};
const checkPdf = (url) => {
  const fileExtension = url.split('.').pop();

  switch (fileExtension) {
    case 'pdf':
      return true;
    default:
      return false;
  }
};
export { checkImage, checkPdf, getFileName, getFileType };
