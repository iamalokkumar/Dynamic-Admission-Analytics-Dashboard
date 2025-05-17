

import React, { useState, useEffect, useMemo } from 'react';
import { fetchAdmissionAnalytics } from '../api/analytics';
import {
  Card,
  Typography,
  Grid,
  TextField,
  Box,
  Paper,
  Stack,
  Button,
  Tooltip,
  useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const AdmissionDashboard = () => {
  const theme = useTheme();

  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchAdmissionAnalytics();
      setData(result);

    
      if (result?.applicationTrends?.length) {
        setFromDate(result.applicationTrends[0].date);
        setToDate(result.applicationTrends[result.applicationTrends.length - 1].date);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTrends = useMemo(() => {
    if (!data?.applicationTrends || !fromDate || !toDate) return data?.applicationTrends || [];
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return data.applicationTrends.filter((item) => {
      const date = new Date(item.date);
      return date >= from && date <= to;
    });
  }, [data, fromDate, toDate]);

  const highlightColor = (count) => {
    if (count > 1000) return theme.palette.error.main;
    if (count > 500) return theme.palette.warning.main;
    return theme.palette.text.primary;
  };

  const cardData = [
    {
      label: 'Total Applicants',
      value: data?.totalApplicants || 0,
      icon: <GroupsIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      bgColor: theme.palette.primary.light,
    },
    {
      label: 'Verified Applicants',
      value: data?.verifiedApplicants || 0,
      icon: <VerifiedUserIcon fontSize="large" sx={{ color: theme.palette.success.main }} />,
      bgColor: theme.palette.success.light,
    },
    {
      label: 'Rejected Applicants',
      value: data?.rejectedApplicants || 0,
      icon: <HighlightOffIcon fontSize="large" sx={{ color: theme.palette.error.main }} />,
      bgColor: theme.palette.error.light,
    },
  ];

  if (loading)
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          color: theme.palette.text.secondary,
        }}
      >
        Loading...
      </Box>
    );

  if (!data)
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          color: theme.palette.text.secondary,
        }}
      >
        No data available
      </Box>
    );

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        p: { xs: 3, md: 5 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 3,
          textAlign: 'center',
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          fontWeight: 700,
          letterSpacing: 1,
          fontSize: { xs: '1.8rem', md: '2.4rem' },
          boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
        }}
      >
        Admission Analytics Dashboard
      </Paper>

     
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Tooltip title="Refresh analytics data">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadData}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.light,
                borderColor: theme.palette.primary.dark,
              },
            }}
          >
            Refresh Data
          </Button>
        </Tooltip>
      </Box>

   
      <Grid container spacing={4} justifyContent="center" mb={6}>
        {cardData?.map((card, idx) => (
          <Grid item xs={12} sm={4} key={idx} display="flex" justifyContent="center">
            <Card
              elevation={3}
              sx={{
                maxWidth: 320,
                borderRadius: 3,
                px: 3,
                py: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: card.bgColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: `0 0 8px ${card.bgColor}`,
                }}
              >
                {card.icon}
              </Box>
              <Box flexGrow={1}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textTransform: 'uppercase', letterSpacing: 0.7 }}
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ color: highlightColor(card.value), mt: 0.5 }}
                >
                  {card.value.toLocaleString()}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

   
      <Grid container spacing={5} justifyContent="center" alignItems="flex-start" mb={5}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Application Trends
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
              <TextField
                fullWidth
                label="From"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <TextField
                fullWidth
                label="To"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Stack>

            <Box sx={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredTrends}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    minTickGap={20}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                    allowDecimals={false}
                  />
                  <RechartTooltip
                    contentStyle={{ borderRadius: 8, boxShadow: theme.shadows[3] }}
                    labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <Line
                    type="monotone"
                    dataKey="applicants"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Applications Per Program
            </Typography>
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.applicationsPerProgram}>
                  <XAxis
                    dataKey="program"
                    tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartTooltip
                    contentStyle={{ borderRadius: 8, boxShadow: theme.shadows[3] }}
                  />
                  <Bar
                    dataKey="applicants"
                    fill={theme.palette.primary.main}
                    radius={[6, 6, 0, 0]}
                    barSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdmissionDashboard;
