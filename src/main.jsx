
import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import "./index.css";

import useAuth from './auth/useAuth';

import TransactionPage from "./page/Transaction";
import Dashboard from "./page/Dashboard";
import LoginPage from "./page/Login";

// 
import MemberListPage from "./page/Member/List";
import MemberRecentPage from "./page/Member/Recent";
import MemberRankingPage from "./page/Member/Ranking";
import MemberEditPage from "./page/Member/Edit/Edit";

import StaffListPage from "./page/Staff/List";

import ReportMonthlyPage from "./page/Report/Monthly";

// bank
import Bank from "./page/Bank/List";

// transfer
import Transfer from "./page/Bank/Transfer";

// Setting
import SettingsPage from "./page/Settings/Settings";

// History
import HistoryTopupPage from "./page/History/Topup";

import ErrorPage from "./error-page";
import Layout from "./Layout";

const root = createRoot(document.getElementById("root"));
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Layout />, // ใช้ Layout ที่สร้างขึ้น
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "tx-job",
          element: <TransactionPage />,
        },
        {
          path: "history",
          children: [
            {
              path: "topup",
              element: <HistoryTopupPage />,
            },
          ],
        },
        {
          path: "member",
          children: [
            {
              path: "list",
              element: <MemberListPage />,
            },
            {
              path: "recent",
              element: <MemberRecentPage />,
            },
            {
              path: "ranking",
              element: <MemberRankingPage />,
            },
            {
              path: "edit/:userid",
              element: <MemberEditPage />,
            },
          ],
        },
        {
          path: "staff",
          children: [
            {
              path: "list",
              element: <StaffListPage />,
            }
          ],
        },
        {
          path: "report",
          children: [
            {
              path: "monthly",
              element: <ReportMonthlyPage />,
            }
          ],
        },
        {
          path: "bank",
          element: <Bank />,
        },
        {
          path: "transfer",
          element: <Transfer />,
        },
        {
          path: "settings",

          children: [
            {
              path: "system",
              element: <SettingsPage />,
            },
          ]
          // element: < />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

};

root.render(<App />);
