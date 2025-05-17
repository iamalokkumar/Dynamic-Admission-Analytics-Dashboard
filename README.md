# Dynamic Admission Analytics Dashboard

A responsive and interactive Admission Analytics Dashboard designed specifically for a university's admin portal. This dashboard enables administrators to efficiently monitor and analyze the university's admission process through clear metrics and visualizations.

---

## Features

1. **Key Metrics Display**  
   Shows important admission figures including Total Applicants, Verified Applicants, and Rejected Applicants for a quick overview.

2. **Program-wise Data Visualization**  
   Bar chart representation of application data segmented by different academic programs.

3. **Application Trend Analysis**  
   Line chart illustrating the trend of applications over time, helping to identify patterns and peak periods.

4. **Customizable Date Range Filter**  
   Allows admins to filter the application trends by selecting specific date ranges.

5. **Dynamic Metric Highlighting**  
   Metrics dynamically change colors based on thresholds:  
   - Counts greater than 500 are highlighted in **orange**.  
   - Counts exceeding 1000 are highlighted in **red**.

6. **Real-time Data Refresh**  
   A refresh button to re-fetch and update the dashboard data instantly.

7. **Responsive Design**  
   Optimized layout that adapts seamlessly across desktop, tablet, and mobile devices.

8. **Graceful Fallback UI**  
   Displays user-friendly messages or placeholders when no data is available.

---

## Technologies Used

1. **React** — Functional components and React Hooks (`useEffect`, `useState`, `useMemo`) for state management and lifecycle handling.

2. **Material-UI (MUI)** — Provides a sleek, consistent UI with theming and responsive design components.

3. **Recharts** — Interactive and customizable charts for effective data visualization.

4. **Axios** — Handles API calls to fetch data. The project uses a mock endpoint simulating backend responses for development and testing.

---

## Getting Started

To run this project locally:

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/admission-analytics-dashboard.git
