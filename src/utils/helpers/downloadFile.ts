  export const downloadFile = (fileURL: string, filename?: string) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = filename || "download.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  export const downloadBlobFile = (blob: Blob, filename = "download.xlsx") => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // clean up
};
