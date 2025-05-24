export const getStatusBadge = (status: string) => {
  const statusMap: { [key: string]: string } = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Qualified: 'bg-green-100 text-green-800',
    Lost: 'bg-red-100 text-red-800',
    Initiated: 'bg-gray-100 text-gray-800',
    'Call Me Later': 'bg-orange-100 text-orange-800',
    'Profile Sent': 'bg-purple-100 text-purple-800',
    'Quotation Sent': 'bg-teal-100 text-teal-800',
    'Business Done': 'bg-indigo-100 text-indigo-800',
    'Not Interested': 'bg-pink-100 text-pink-800',
    'Phone Not Received': 'bg-gray-300 text-gray-800',
  };

  return statusMap[status] || 'bg-gray-100 text-gray-800'; 
};