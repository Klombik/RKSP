function calculateTotals(entries) {
  return entries.reduce(
    (totals, entry) => {
      totals.calories += entry.calories;
      totals.proteins += entry.proteins;
      totals.fats += entry.fats;
      totals.carbs += entry.carbs;
      return totals;
    },
    {
      calories: 0,
      proteins: 0,
      fats: 0,
      carbs: 0
    }
  );
}

module.exports = {
  calculateTotals
};
