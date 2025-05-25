  export const downloadFile = (fileURL: string, filename?: string) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = filename || "download.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };