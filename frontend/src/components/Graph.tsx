import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { DetailedProductLogs as ProductLogs } from '../types/productLogs';
import responsiveStyles from '../functions/responsive';

interface DashboardGraphProps {
  data: ProductLogs[];
  dateSelected: Dayjs | null;
}

export default function DashboardGraph({
  data,
  dateSelected,
}: DashboardGraphProps) {
  const styles = responsiveStyles();
  const slicedData = data.slice(0, 10);
  const hasData = data && data.length > 0;

  return (
    <ResponsiveContainer width="100%" height="100%">
      {hasData ? (
        <BarChart data={slicedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'black' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="storeStock" name="Store Stock" fill="midnightblue" />
          <Bar dataKey="warehouseStock" name="Warehouse Stock" fill="green" />
          <Bar dataKey="overallSoldStocks" name="Stocks Sold" fill="red" />
        </BarChart>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          border="3px solid"
          borderRadius={5}
          borderColor="gray"
          sx={{
            height: '75%',
            width: '75%',
            ml: styles.margLeft,
            mt: 5,
          }}
        >
          <Typography fontFamily="Poppins" fontSize={25}>
            No Stock Changes on {dateSelected?.format('MMMM DD, YYYY')}
          </Typography>
        </Grid>
      )}
    </ResponsiveContainer>
  );
}
