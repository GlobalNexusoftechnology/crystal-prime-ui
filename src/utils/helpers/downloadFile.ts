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

  // New function to handle binary file downloads from URLs
  export const downloadBinaryFile = async (fileUrl: string, filename?: string) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Fallback to direct link
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = filename || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
