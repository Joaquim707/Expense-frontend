import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if(num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
  ? `${formattedInteger}.${fractionalPart}`
  : formattedInteger;
};

export const prepareExpenseBarChartData = (data) => {
  const chartData = data.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChart = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChart = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const expenseMap = {};

  sortedData.forEach((item) => {
    const key = moment(item.date).format("YYYY-MM-DD");
    if (!expenseMap[key]) {
      expenseMap[key] = {
        rawDate: item.date,
        month: moment(item.date).format("DD MMM"),
        amount: 0,
        categories: [],
      };
    }
    expenseMap[key].amount += Number(item.amount) || 0;
    expenseMap[key].categories.push({
      category: item.category,
      amount: Number(item.amount) || 0,
    });
  });

  return Object.values(expenseMap).sort(
    (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
  );
};
