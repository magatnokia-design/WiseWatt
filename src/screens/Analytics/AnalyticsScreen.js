// Analytics Screen - Design Only
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { FONTS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

const TABS = ['Daily', 'Weekly', 'Monthly'];

// Custom Simple Bar Chart Component (no library)
const SimpleBarChart = ({ data, labels }) => {
  const maxValue = Math.max(...data, 1); // Avoid division by zero
  
  return (
    <View style={styles.customChart}>
      <View style={styles.chartBars}>
        {data.map((value, index) => {
          const barHeight = maxValue > 0 ? (value / maxValue) * 150 : 0;
          return (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.barValue}>{value}</Text>
              <View style={styles.barWrapper}>
                <View style={[styles.bar, { height: barHeight || 4 }]} />
              </View>
              <Text style={styles.barLabel}>{labels[index]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const StatCard = ({ label, value, icon, trend }) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {trend !== undefined && (
      <View style={styles.trendContainer}>
        <Text style={[styles.trendText, trend > 0 ? styles.trendUp : styles.trendDown]}>
          {trend > 0 ? '↑' : trend < 0 ? '↓' : '–'} {Math.abs(trend)}%
        </Text>
      </View>
    )}
  </View>
);

const OutletComparisonCard = ({ outlet1, outlet2 }) => {
  const total = parseFloat(outlet1) + parseFloat(outlet2);
  const outlet1Percent = total > 0 ? (parseFloat(outlet1) / total) * 100 : 50;
  
  return (
    <View style={styles.comparisonCard}>
      <Text style={styles.comparisonTitle}>Outlet Comparison</Text>
      <View style={styles.comparisonRow}>
        <View style={styles.comparisonItem}>
          <View style={[styles.comparisonDot, { backgroundColor: COLORS.primary }]} />
          <View style={styles.comparisonInfo}>
            <Text style={styles.comparisonLabel}>Outlet 1</Text>
            <Text style={styles.comparisonValue}>{outlet1} kWh</Text>
          </View>
        </View>
        <View style={styles.comparisonItem}>
          <View style={[styles.comparisonDot, { backgroundColor: COLORS.primaryLight }]} />
          <View style={styles.comparisonInfo}>
            <Text style={styles.comparisonLabel}>Outlet 2</Text>
            <Text style={styles.comparisonValue}>{outlet2} kWh</Text>
          </View>
        </View>
      </View>
      <View style={styles.comparisonBar}>
        <View style={[styles.comparisonFill, { 
          width: `${outlet1Percent}%`, 
          backgroundColor: COLORS.primary 
        }]} />
        <View style={[styles.comparisonFill, { 
          width: `${100 - outlet1Percent}%`, 
          backgroundColor: COLORS.primaryLight 
        }]} />
      </View>
    </View>
  );
};

export const AnalyticsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Daily');

  // Dummy chart data - all zeros
  const chartLabels = selectedTab === 'Daily' 
    ? ['12AM', '6AM', '12PM', '6PM']
    : selectedTab === 'Weekly'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
  const chartData = selectedTab === 'Daily' 
    ? [0, 0, 0, 0]
    : selectedTab === 'Weekly'
    ? [0, 0, 0, 0, 0, 0, 0]
    : [0, 0, 0, 0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Track your energy consumption</Text>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Total Energy Usage</Text>
            <View style={styles.summaryBadge}>
              <Text style={styles.summaryBadgeText}>{selectedTab}</Text>
            </View>
          </View>
          <Text style={styles.summaryValue}>0.00 kWh</Text>
          <Text style={styles.summarySubValue}>₱0.00 estimated cost</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Energy Consumption</Text>
            <View style={styles.peakBadge}>
              <Text style={styles.peakBadgeText}>Peak: 0 kWh</Text>
            </View>
          </View>
          <SimpleBarChart data={chartData} labels={chartLabels} />
        </View>

        {/* Statistics Grid */}
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="⚡"
            label="Total Usage"
            value="0.00 kWh"
            trend={0}
          />
          <StatCard
            icon="📊"
            label="Average"
            value="0.00 kWh"
            trend={0}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon="📈"
            label="Peak Usage"
            value="0.00 kWh"
          />
          <StatCard
            icon="🕐"
            label="Peak Hour"
            value="12:00 AM"
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon="💰"
            label="Total Cost"
            value="₱0.00"
            trend={0}
          />
          <StatCard
            icon="💡"
            label="Best Day"
            value="N/A"
          />
        </View>

        {/* Outlet Comparison */}
        <Text style={styles.sectionTitle}>Outlet Comparison</Text>
        <OutletComparisonCard outlet1="0.00" outlet2="0.00" />

        {/* Budget Progress */}
        <View style={styles.budgetProgressCard}>
          <View style={styles.budgetProgressHeader}>
            <Text style={styles.budgetProgressTitle}>Budget Progress</Text>
            <Text style={styles.budgetProgressPercent}>0%</Text>
          </View>
          <View style={styles.budgetProgressBar}>
            <View style={[styles.budgetProgressFill, { width: '0%' }]} />
          </View>
          <View style={styles.budgetProgressFooter}>
            <Text style={styles.budgetProgressText}>₱0.00 used</Text>
            <Text style={styles.budgetProgressText}>₱0.00 remaining</Text>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>💡 Insights</Text>
          <Text style={styles.insightsText}>
            No data available yet. Connect your appliances to start tracking energy usage.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  subtitle: {
    ...FONTS.small,
    color: COLORS.textLight,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    margin: SIZES.padding,
    padding: SIZES.padding * 1.5,
    borderRadius: SIZES.radius * 1.5,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    ...FONTS.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  summaryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryBadgeText: {
    ...FONTS.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  summarySubValue: {
    ...FONTS.body,
    color: COLORS.white,
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    ...FONTS.h4,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  peakBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  peakBadgeText: {
    ...FONTS.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  customChart: {
    paddingVertical: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barValue: {
    ...FONTS.small,
    color: COLORS.textDark,
    fontWeight: '600',
    marginBottom: 4,
  },
  barWrapper: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
  },
  bar: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    ...FONTS.small,
    color: COLORS.textLight,
    marginTop: 8,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.textDark,
    fontWeight: 'bold',
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statLabel: {
    ...FONTS.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statValue: {
    ...FONTS.h4,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  trendContainer: {
    marginTop: 4,
  },
  trendText: {
    ...FONTS.small,
    fontWeight: '600',
  },
  trendUp: {
    color: COLORS.error,
  },
  trendDown: {
    color: COLORS.success,
  },
  comparisonCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  comparisonTitle: {
    ...FONTS.h4,
    color: COLORS.textDark,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  comparisonDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  comparisonInfo: {
    flex: 1,
  },
  comparisonLabel: {
    ...FONTS.small,
    color: COLORS.textLight,
  },
  comparisonValue: {
    ...FONTS.body,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  comparisonBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  comparisonFill: {
    height: '100%',
  },
  budgetProgressCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  budgetProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetProgressTitle: {
    ...FONTS.h4,
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  budgetProgressPercent: {
    ...FONTS.h4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  budgetProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  budgetProgressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetProgressText: {
    ...FONTS.small,
    color: COLORS.textLight,
  },
  insightsCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    opacity: 0.9,
  },
  insightsTitle: {
    ...FONTS.body,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  insightsText: {
    ...FONTS.small,
    color: COLORS.white,
    lineHeight: 20,
  },
});