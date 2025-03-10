// Mock data for the food waste dashboard
const mockData = {
  summary: {
    today: {
      totalFoodServed: 150,
      totalFoodWasted: 15,
      topWastedItem: {
        name: 'Biryani',
        amount: 4,
        unit: 'kg',
      },
      mostEfficientDay: {
        day: 'Morning',
        wastePercentage: 5,
      },
      leastEfficientDay: {
        day: 'Evening',
        wastePercentage: 15,
      },
      averageCostOfWaste: 4500,
    },
    week: {
      totalFoodServed: 450,
      totalFoodWasted: 45,
      topWastedItem: {
        name: 'Biryani',
        amount: 12,
        unit: 'kg',
      },
      mostEfficientDay: {
        day: 'Tuesday',
        wastePercentage: 5,
      },
      leastEfficientDay: {
        day: 'Saturday',
        wastePercentage: 15,
      },
      averageCostOfWaste: 12500,
    },
    month: {
      totalFoodServed: 1800,
      totalFoodWasted: 180,
      topWastedItem: {
        name: 'Biryani',
        amount: 48,
        unit: 'kg',
      },
      mostEfficientDay: {
        day: 'Tuesday',
        wastePercentage: 5,
      },
      leastEfficientDay: {
        day: 'Saturday',
        wastePercentage: 15,
      },
      averageCostOfWaste: 50000,
    },
  },
  wastageAnalytics: {
    today: {
      all: {
        dailyTrends: [
          { date: '9:00 AM', waste: 2 },
          { date: '10:00 AM', waste: 3 },
          { date: '11:00 AM', waste: 1 },
          { date: '12:00 PM', waste: 4 },
          { date: '1:00 PM', waste: 2 },
          { date: '2:00 PM', waste: 3 },
          { date: '3:00 PM', waste: 1 },
        ],
        totalWaste: 16,
        wasteCost: 4500,
        mostWastedItem: { name: 'Biryani', amount: 4 },
        efficiency: 92,
        mostWastedItems: [
          { name: 'Biryani', amount: 4, unit: 'kg' },
          { name: 'Rice', amount: 3, unit: 'kg' },
          { name: 'Curry', amount: 2, unit: 'kg' },
        ],
        locationWaste: {
          'Venue A': 8,
          'Venue B': 5,
          'Venue C': 3,
        },
      },
      'venue-a': {
        dailyTrends: [
          { date: '9:00 AM', waste: 1 },
          { date: '10:00 AM', waste: 1.5 },
          { date: '11:00 AM', waste: 0.5 },
          { date: '12:00 PM', waste: 2 },
          { date: '1:00 PM', waste: 1 },
          { date: '2:00 PM', waste: 1.5 },
          { date: '3:00 PM', waste: 0.5 },
        ],
        totalWaste: 8,
        wasteCost: 2200,
        mostWastedItem: { name: 'Biryani', amount: 2 },
        efficiency: 91,
        mostWastedItems: [
          { name: 'Biryani', amount: 2, unit: 'kg' },
          { name: 'Rice', amount: 1.5, unit: 'kg' },
          { name: 'Curry', amount: 1, unit: 'kg' },
        ],
      },
      'venue-b': {
        dailyTrends: [
          { date: '9:00 AM', waste: 0.6 },
          { date: '10:00 AM', waste: 0.9 },
          { date: '11:00 AM', waste: 0.3 },
          { date: '12:00 PM', waste: 1.2 },
          { date: '1:00 PM', waste: 0.6 },
          { date: '2:00 PM', waste: 0.9 },
          { date: '3:00 PM', waste: 0.3 },
        ],
        totalWaste: 5,
        wasteCost: 1400,
        mostWastedItem: { name: 'Rice', amount: 1.5 },
        efficiency: 93,
        mostWastedItems: [
          { name: 'Rice', amount: 1.5, unit: 'kg' },
          { name: 'Biryani', amount: 1.2, unit: 'kg' },
          { name: 'Curry', amount: 0.8, unit: 'kg' },
        ],
      },
      'venue-c': {
        dailyTrends: [
          { date: '9:00 AM', waste: 0.4 },
          { date: '10:00 AM', waste: 0.6 },
          { date: '11:00 AM', waste: 0.2 },
          { date: '12:00 PM', waste: 0.8 },
          { date: '1:00 PM', waste: 0.4 },
          { date: '2:00 PM', waste: 0.6 },
          { date: '3:00 PM', waste: 0.2 },
        ],
        totalWaste: 3,
        wasteCost: 900,
        mostWastedItem: { name: 'Curry', amount: 1 },
        efficiency: 94,
        mostWastedItems: [
          { name: 'Curry', amount: 1, unit: 'kg' },
          { name: 'Rice', amount: 0.8, unit: 'kg' },
          { name: 'Biryani', amount: 0.6, unit: 'kg' },
        ],
      },
    },
    week: {
      all: {
        dailyTrends: [
          { date: 'Mon', waste: 12 },
          { date: 'Tue', waste: 15 },
          { date: 'Wed', waste: 8 },
          { date: 'Thu', waste: 10 },
          { date: 'Fri', waste: 7 },
          { date: 'Sat', waste: 14 },
          { date: 'Sun', waste: 9 },
        ],
        totalWaste: 75,
        wasteCost: 12500,
        mostWastedItem: { name: 'Biryani', amount: 12 },
        efficiency: 90,
        mostWastedItems: [
          { name: 'Biryani', amount: 12, unit: 'kg' },
          { name: 'Rice', amount: 8, unit: 'kg' },
          { name: 'Curry', amount: 6, unit: 'kg' },
        ],
        locationWaste: {
          'Venue A': 35,
          'Venue B': 25,
          'Venue C': 15,
        },
      },
      'venue-a': {
        dailyTrends: [
          { date: 'Mon', waste: 5 },
          { date: 'Tue', waste: 7 },
          { date: 'Wed', waste: 4 },
          { date: 'Thu', waste: 6 },
          { date: 'Fri', waste: 3 },
          { date: 'Sat', waste: 6 },
          { date: 'Sun', waste: 4 },
        ],
        totalWaste: 35,
        wasteCost: 5800,
        mostWastedItem: { name: 'Biryani', amount: 6 },
        efficiency: 89,
        mostWastedItems: [
          { name: 'Biryani', amount: 6, unit: 'kg' },
          { name: 'Rice', amount: 4, unit: 'kg' },
          { name: 'Curry', amount: 3, unit: 'kg' },
        ],
      },
      'venue-b': {
        dailyTrends: [
          { date: 'Mon', waste: 4 },
          { date: 'Tue', waste: 5 },
          { date: 'Wed', waste: 2 },
          { date: 'Thu', waste: 3 },
          { date: 'Fri', waste: 2 },
          { date: 'Sat', waste: 5 },
          { date: 'Sun', waste: 4 },
        ],
        totalWaste: 25,
        wasteCost: 4200,
        mostWastedItem: { name: 'Rice', amount: 4 },
        efficiency: 91,
        mostWastedItems: [
          { name: 'Rice', amount: 4, unit: 'kg' },
          { name: 'Biryani', amount: 3, unit: 'kg' },
          { name: 'Curry', amount: 2, unit: 'kg' },
        ],
      },
      'venue-c': {
        dailyTrends: [
          { date: 'Mon', waste: 3 },
          { date: 'Tue', waste: 3 },
          { date: 'Wed', waste: 2 },
          { date: 'Thu', waste: 1 },
          { date: 'Fri', waste: 2 },
          { date: 'Sat', waste: 3 },
          { date: 'Sun', waste: 1 },
        ],
        totalWaste: 15,
        wasteCost: 2500,
        mostWastedItem: { name: 'Curry', amount: 3 },
        efficiency: 93,
        mostWastedItems: [
          { name: 'Curry', amount: 3, unit: 'kg' },
          { name: 'Rice', amount: 2, unit: 'kg' },
          { name: 'Biryani', amount: 1.5, unit: 'kg' },
        ],
      },
    },
    month: {
      all: {
        dailyTrends: [
          { date: 'Week 1', waste: 45 },
          { date: 'Week 2', waste: 52 },
          { date: 'Week 3', waste: 38 },
          { date: 'Week 4', waste: 45 },
        ],
        totalWaste: 180,
        wasteCost: 50000,
        mostWastedItem: { name: 'Biryani', amount: 48 },
        efficiency: 88,
        mostWastedItems: [
          { name: 'Biryani', amount: 48, unit: 'kg' },
          { name: 'Rice', amount: 32, unit: 'kg' },
          { name: 'Curry', amount: 24, unit: 'kg' },
        ],
        locationWaste: {
          'Venue A': 85,
          'Venue B': 60,
          'Venue C': 35,
        },
      },
      'venue-a': {
        dailyTrends: [
          { date: 'Week 1', waste: 20 },
          { date: 'Week 2', waste: 25 },
          { date: 'Week 3', waste: 18 },
          { date: 'Week 4', waste: 22 },
        ],
        totalWaste: 85,
        wasteCost: 23500,
        mostWastedItem: { name: 'Biryani', amount: 24 },
        efficiency: 87,
        mostWastedItems: [
          { name: 'Biryani', amount: 24, unit: 'kg' },
          { name: 'Rice', amount: 16, unit: 'kg' },
          { name: 'Curry', amount: 12, unit: 'kg' },
        ],
      },
      'venue-b': {
        dailyTrends: [
          { date: 'Week 1', waste: 15 },
          { date: 'Week 2', waste: 18 },
          { date: 'Week 3', waste: 12 },
          { date: 'Week 4', waste: 15 },
        ],
        totalWaste: 60,
        wasteCost: 16500,
        mostWastedItem: { name: 'Rice', amount: 18 },
        efficiency: 89,
        mostWastedItems: [
          { name: 'Rice', amount: 18, unit: 'kg' },
          { name: 'Biryani', amount: 15, unit: 'kg' },
          { name: 'Curry', amount: 8, unit: 'kg' },
        ],
      },
      'venue-c': {
        dailyTrends: [
          { date: 'Week 1', waste: 10 },
          { date: 'Week 2', waste: 9 },
          { date: 'Week 3', waste: 8 },
          { date: 'Week 4', waste: 8 },
        ],
        totalWaste: 35,
        wasteCost: 10000,
        mostWastedItem: { name: 'Curry', amount: 12 },
        efficiency: 92,
        mostWastedItems: [
          { name: 'Curry', amount: 12, unit: 'kg' },
          { name: 'Rice', amount: 8, unit: 'kg' },
          { name: 'Biryani', amount: 6, unit: 'kg' },
        ],
      },
    },
    leastWastedItems: [
      { name: 'Salad', amount: 2, unit: 'kg' },
      { name: 'Bread', amount: 3, unit: 'kg' },
      { name: 'Dessert', amount: 4, unit: 'kg' },
    ],
  },
  mealAnalysis: {
    breakfast: { waste: 15, served: 150 },
    lunch: { waste: 20, served: 200 },
    dinner: { waste: 10, served: 100 },
  },
  inventory: {
    lowStockItems: [
      { name: 'Rice', quantity: 5, unit: 'kg', threshold: 10 },
      { name: 'Oil', quantity: 2, unit: 'L', threshold: 5 },
    ],
    usageTrends: {
      'Rice': [10, 12, 8, 15, 9, 11, 13],
      'Oil': [2, 3, 2, 4, 3, 2, 3],
    },
    purchaseRecommendations: [
      { item: 'Rice', quantity: 15, unit: 'kg' },
      { item: 'Oil', quantity: 5, unit: 'L' },
    ],
  },
  reports: {
    daily: {
      '2024-03-10': {
        summary: {
          totalServed: 450,
          totalWaste: 45,
          costSaved: 5000,
          efficiency: 90,
        },
        mealData: [
          { name: 'Breakfast', served: 150, waste: 15 },
          { name: 'Lunch', served: 200, waste: 20 },
          { name: 'Dinner', served: 100, waste: 10 },
        ],
        detailedReport: [
          { mealType: 'Breakfast', served: 150, waste: 15, efficiency: 90, costImpact: 1500 },
          { mealType: 'Lunch', served: 200, waste: 20, efficiency: 90, costImpact: 2000 },
          { mealType: 'Dinner', served: 100, waste: 10, efficiency: 90, costImpact: 1500 },
        ],
      },
    },
    weekly: {
      '2024-03-10': {
        summary: {
          totalServed: 3150,
          totalWaste: 280,
          costSaved: 35000,
          efficiency: 91,
        },
        trends: [
          { day: 'Mon', served: 420, waste: 42 },
          { day: 'Tue', served: 450, waste: 38 },
          { day: 'Wed', served: 480, waste: 45 },
          { day: 'Thu', served: 460, waste: 40 },
          { day: 'Fri', served: 500, waste: 48 },
          { day: 'Sat', served: 480, waste: 52 },
          { day: 'Sun', served: 420, waste: 44 },
        ],
        detailedReport: [
          { mealType: 'Breakfast', served: 1050, waste: 95, efficiency: 91, costImpact: 10500 },
          { mealType: 'Lunch', served: 1400, waste: 120, efficiency: 91, costImpact: 14000 },
          { mealType: 'Dinner', served: 700, waste: 65, efficiency: 91, costImpact: 10500 },
        ],
      },
    },
    monthly: {
      '2024-03-10': {
        summary: {
          totalServed: 13500,
          totalWaste: 1200,
          costSaved: 150000,
          efficiency: 92,
        },
        trends: [
          { week: 'Week 1', served: 3200, waste: 280 },
          { week: 'Week 2', served: 3400, waste: 310 },
          { week: 'Week 3', served: 3500, waste: 300 },
          { week: 'Week 4', served: 3400, waste: 310 },
        ],
        detailedReport: [
          { mealType: 'Breakfast', served: 4500, waste: 400, efficiency: 91, costImpact: 45000 },
          { mealType: 'Lunch', served: 6000, waste: 520, efficiency: 91, costImpact: 60000 },
          { mealType: 'Dinner', served: 3000, waste: 280, efficiency: 91, costImpact: 45000 },
        ],
      },
    },
  },
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const api = {
  getSummary: async (dateRange = 'today') => {
    await delay(500);
    return mockData.summary[dateRange];
  },

  getWastageAnalytics: async (dateRange = 'today', venue = 'all') => {
    await delay(700);
    return mockData.wastageAnalytics[dateRange][venue];
  },

  getMealAnalysis: async () => {
    await delay(600);
    return mockData.mealAnalysis;
  },

  getInventory: async () => {
    await delay(800);
    return mockData.inventory;
  },

  getCostInsights: async (dateRange = 'today', category = 'all') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const costData = {
      today: {
        costMetrics: [
          { title: 'Total Food Cost', amount: 85000, trend: 5.2, period: 'day' },
          { title: 'Waste Cost', amount: 12500, trend: -3.1, period: 'day' },
          { title: 'Average Cost per Meal', amount: 165, trend: 2.8, period: 'day' },
          { title: 'Cost Savings', amount: 9500, trend: 8.4, period: 'day' },
        ],
        monthlyCosts: [
          { month: '9 AM', food: 8500, labor: 15000, overhead: 7000 },
          { month: '12 PM', food: 12000, labor: 18000, overhead: 8000 },
          { month: '3 PM', food: 9500, labor: 16000, overhead: 7500 },
          { month: '6 PM', food: 11000, labor: 17000, overhead: 8000 },
        ],
      },
      week: {
        costMetrics: [
          { title: 'Total Food Cost', amount: 165000, trend: 8.5, period: 'week' },
          { title: 'Waste Cost', amount: 22500, trend: -5.3, period: 'week' },
          { title: 'Average Cost per Meal', amount: 175, trend: 4.2, period: 'week' },
          { title: 'Cost Savings', amount: 18900, trend: 12.7, period: 'week' },
        ],
        monthlyCosts: [
          { month: 'Mon', food: 45000, labor: 75000, overhead: 35000 },
          { month: 'Tue', food: 48000, labor: 78000, overhead: 36000 },
          { month: 'Wed', food: 42000, labor: 72000, overhead: 34000 },
          { month: 'Thu', food: 46000, labor: 76000, overhead: 35500 },
          { month: 'Fri', food: 49000, labor: 79000, overhead: 36500 },
          { month: 'Sat', food: 52000, labor: 82000, overhead: 38000 },
          { month: 'Sun', food: 43000, labor: 73000, overhead: 34500 },
        ],
      },
      month: {
        costMetrics: [
          { title: 'Total Food Cost', amount: 245000, trend: 12.5, period: 'month' },
          { title: 'Waste Cost', amount: 32500, trend: -8.3, period: 'month' },
          { title: 'Average Cost per Meal', amount: 180, trend: 5.2, period: 'month' },
          { title: 'Cost Savings', amount: 28900, trend: 15.7, period: 'month' },
        ],
        monthlyCosts: [
          { month: 'Week 1', food: 220000, labor: 150000, overhead: 80000 },
          { month: 'Week 2', food: 235000, labor: 155000, overhead: 82000 },
          { month: 'Week 3', food: 228000, labor: 152000, overhead: 81000 },
          { month: 'Week 4', food: 245000, labor: 158000, overhead: 83000 },
        ],
      },
    };

    const commonData = {
      costBreakdown: [
        { name: 'Raw Materials', value: 45 },
        { name: 'Labor', value: 30 },
        { name: 'Overhead', value: 15 },
        { name: 'Waste', value: 10 },
      ],
      savingsOpportunities: [
        {
          title: 'Bulk Purchasing',
          amount: 15000,
          description: 'Implement bulk purchasing for commonly used ingredients',
          priority: 'high',
        },
        {
          title: 'Menu Optimization',
          amount: 12000,
          description: 'Adjust menu items based on ingredient costs and popularity',
          priority: 'medium',
        },
        {
          title: 'Inventory Management',
          amount: 8500,
          description: 'Improve storage and rotation practices',
          priority: 'low',
        },
      ],
      costAlerts: [
        {
          severity: 'high',
          message: 'Vegetable costs have increased by 18% compared to last month',
        },
        {
          severity: 'medium',
          message: 'Labor costs trending higher than budget in evening shifts',
        },
        {
          severity: 'low',
          message: 'New supplier contract could reduce dairy costs by 12%',
        },
      ],
    };

    // Filter data based on category if not 'all'
    if (category !== 'all') {
      const filteredData = {
        ...costData[dateRange],
        monthlyCosts: costData[dateRange].monthlyCosts.map(cost => ({
          month: cost.month,
          [category]: cost[category],
        })),
      };
      return { ...filteredData, ...commonData };
    }

    return { ...costData[dateRange], ...commonData };
  },

  getReport: async (type = 'daily', date = new Date().toISOString().split('T')[0]) => {
    await delay(700);
    return mockData.reports[type][date] || mockData.reports[type]['2024-03-10'];
  },

  // Add more API endpoints as needed
}; 