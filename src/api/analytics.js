import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios, { delayResponse: 500 });

mock.onGet('/api/v1/analytics/admissions').reply(200, {
  totalApplicants: 1200,
  verifiedApplicants: 950,
  rejectedApplicants: 150,
  applicationsPerProgram: [
    { program: 'CS', applicants: 400 },
    { program: 'IT', applicants: 300 },
    { program: 'ECE', applicants: 250 },
    { program: 'ME', applicants: 250 },
  ],
  applicationTrends: [
    { date: '2025-05-01', applicants: 100 },
    { date: '2025-05-02', applicants: 120 },
    { date: '2025-05-03', applicants: 150 },
    { date: '2025-05-04', applicants: 180 },
    { date: '2025-05-05', applicants: 160 },
  ],
});

export const fetchAdmissionAnalytics = async () => {
  const response = await axios.get('/api/v1/analytics/admissions');
  return response.data;
};
