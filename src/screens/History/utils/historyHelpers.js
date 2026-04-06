// TODO: Expand when backend is ready

export const formatDate = (date) => {
  // TODO: Format Firebase timestamp
  return '--';
};

export const formatTime = (date) => {
  // TODO: Format Firebase timestamp
  return '--:--';
};

export const formatKwh = (value) => {
  if (!value) return '0.00 kWh';
  return `${value.toFixed(2)} kWh`;
};

export const formatCost = (value) => {
  if (!value) return '₱0.00';
  return `₱${value.toFixed(2)}`;
};

export const filterByDateRange = (data, startDate, endDate) => {
  // TODO: Implement date range filter when backend is ready
  return data;
};