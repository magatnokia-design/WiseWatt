import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../../../constants/colors';
import { formatKwh, formatCost } from '../utils/historyHelpers';

const EMPTY_USAGE = [];

const UsageHistoryItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.usageItem, { width: width - 32 }]}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateDay}>{item.day || '--'}</Text>
        <Text style={styles.dateMonth}>{item.month || '---'}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.usageInfo}>
        <View style={styles.usageRow}>
          <Text style={styles.usageLabel}>Outlet 1</Text>
          <Text style={styles.usageValue}>{formatKwh(item.outlet1Kwh)}</Text>
        </View>
        <View style={styles.usageRow}>
          <Text style={styles.usageLabel}>Outlet 2</Text>
          <Text style={styles.usageValue}>{formatKwh(item.outlet2Kwh)}</Text>
        </View>
      </View>
      <View style={styles.costContainer}>
        <Text style={styles.costLabel}>Total Cost</Text>
        <Text style={styles.costValue}>{formatCost(item.totalCost)}</Text>
        <Text style={styles.totalKwh}>{formatKwh(item.totalKwh)}</Text>
      </View>
    </View>
  );
};

const UsageHistory = ({ usage = EMPTY_USAGE }) => {
  const renderItem = useCallback(({ item }) => (
    <UsageHistoryItem item={item} />
  ), []);

  const renderEmpty = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Usage Records Yet</Text>
      <Text style={styles.emptySub}>Daily energy usage will appear here</Text>
    </View>
  ), []);

  return (
    <FlatList
      data={usage}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  usageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    width: 40,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  dateMonth: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  usageInfo: {
    flex: 1,
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  usageLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  usageValue: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
  },
  costContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  costLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  costValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 2,
  },
  totalKwh: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default UsageHistory;