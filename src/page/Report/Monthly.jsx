import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './monthly.css';
import { API } from '../../Configs/Configs';
import { formatCurrency } from '@/util/format'

import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// ต้องลงทะเบียน elements ที่จะใช้งานกับ Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

function ReportChart({ dailySummary }) {
    // ข้อมูลสำหรับ Line Chart
    const lineChartData = {
        labels: dailySummary.map(data => data.day),  // ใช้ข้อมูลวันที่เป็น label
        datasets: [
            {
                label: 'ฝาก',
                data: dailySummary.map(data => data.deposit),  // ข้อมูลยอดฝาก
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                tension: 0.4, // เพิ่มความโค้งของเส้น
                pointRadius: 5, // ขนาดของจุด
                pointBackgroundColor: 'green', // สีของจุด
                pointHoverRadius: 7, // ขนาดของจุดเมื่อ hover
            },
            {
                label: 'ถอน',
                data: dailySummary.map(data => data.withdraw),  // ข้อมูลยอดถอน
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0.4, // เพิ่มความโค้งของเส้น
                pointRadius: 5, // ขนาดของจุด
                pointBackgroundColor: 'red', // สีของจุด
                pointHoverRadius: 7, // ขนาดของจุดเมื่อ hover
            },
            {
                label: 'สมัครใหม่',
                data: dailySummary.map(data => data.newUsers),  // ข้อมูลยอดถอน
                borderColor: 'purple',
                backgroundColor: 'rgba(100, 100, 100, 0.1)',
                tension: 0.4, // เพิ่มความโค้งของเส้น
                pointRadius: 5, // ขนาดของจุด
                pointBackgroundColor: 'purple', // สีของจุด
                pointHoverRadius: 7, // ขนาดของจุดเมื่อ hover
            },
            {
                label: 'สมัครฝากแรก',
                data: dailySummary.map(data => data.newUsersWithDeposit),  // ข้อมูลยอดถอน
                borderColor: 'orange',
                backgroundColor: 'rgba(100, 100, 100, 0.1)',
                tension: 0.4, // เพิ่มความโค้งของเส้น
                pointRadius: 5, // ขนาดของจุด
                pointBackgroundColor: 'orange', // สีของจุด
                pointHoverRadius: 7, // ขนาดของจุดเมื่อ hover
            },
            {
                label: 'ยอดฝากแรก',
                data: dailySummary.map(data => data.firstDepositAmount),  // ข้อมูลยอดถอน
                borderColor: 'blue',
                backgroundColor: 'rgba(100, 100, 100, 0.1)',
                tension: 0.4, // เพิ่มความโค้งของเส้น
                pointRadius: 5, // ขนาดของจุด
                pointBackgroundColor: 'blue', // สีของจุด
                pointHoverRadius: 7, // ขนาดของจุดเมื่อ hover
            }
        ],
    };

    // ข้อมูลสำหรับ Doughnut Chart
    const doughnutChartData = {
        labels: ['ฝาก', 'ถอน'],
        datasets: [
            {
                label: 'ยอดรวม',
                data: [
                    dailySummary.reduce((total, data) => total + data.deposit, 0),  // รวมยอดฝากทั้งหมด
                    dailySummary.reduce((total, data) => total + data.withdraw, 0), // รวมยอดถอนทั้งหมด
                ],
                backgroundColor: ['green', 'red', 'orange'],
                hoverBackgroundColor: ['lightgreen', 'lightcoral', 'red'],
            }
        ],
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            {/* กราฟเส้น (Line Chart) */}
            <div className="col-span-12 lg:col-span-7 mt-6">
                <div className="chartjs-size-monitor">
                    <div className="chartjs-size-monitor-expand">
                        <div className="" />
                    </div>
                    <div className="chartjs-size-monitor-shrink">
                        <div className="" />
                    </div>
                </div>
                <Line
                    data={lineChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,  // ปิดการรักษาสัดส่วน
                        interaction: {
                            mode: 'index',  // แสดงข้อมูลทุก dataset ที่ตำแหน่งเดียวกัน
                            intersect: false,  // ไม่ต้องรอให้จุดตรงกันพอดีถึงจะแสดง tooltip
                        },
                        plugins: {
                            legend: {
                                position: 'top',  // กำหนดตำแหน่งของ legend
                                labels: {
                                    boxWidth: 20,  // กำหนดขนาดของกล่องสีใน legend
                                    font: {
                                        size: 12,  // ปรับขนาดตัวอักษร
                                    }
                                }
                            },
                            tooltip: {
                                enabled: true,
                                mode: 'index',  // แสดงข้อมูลทุกชุดในตำแหน่งเดียวกัน
                                callbacks: {
                                    label: function (context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        label += new Intl.NumberFormat().format(context.raw);  // แสดงตัวเลขพร้อม format
                                        return label;
                                    },
                                    title: function (context) {
                                        return 'วันที่: ' + context[0].label;  // แสดงวันที่ที่ hover
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,  // เริ่มจาก 0
                                ticks: {
                                    callback: function (value) {
                                        return new Intl.NumberFormat().format(value);  // เพิ่มคอมมาใน y-axis
                                    }
                                }
                            }
                        }
                    }}
                    style={{ display: 'block', height: '400px', width: '100%' }}  // ปรับขนาดกราฟ
                />
            </div>

            {/* กราฟวงกลม (Doughnut Chart) */}
            <div className="col-span-12 lg:col-span-5 mt-6">
                <div className="chartjs-size-monitor">
                    <div className="chartjs-size-monitor-expand">
                        <div className="" />
                    </div>
                    <div className="chartjs-size-monitor-shrink">
                        <div className="" />
                    </div>
                </div>
                <Doughnut
                    data={doughnutChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,  // ปิดการรักษาสัดส่วน
                        plugins: {
                            legend: {
                                position: 'top',  // กำหนดตำแหน่งของ legend
                                labels: {
                                    boxWidth: 20,  // กำหนดขนาดของกล่องสีใน legend
                                    font: {
                                        size: 12,  // ปรับขนาดตัวอักษร
                                    }
                                }
                            }
                        }
                    }}
                    style={{ display: 'block', height: '300px', width: '100%' }}  // ปรับขนาดกราฟ
                />
            </div>
        </div>
    );
}

function ReportMonthlyPage() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1); // +1 เพราะ getMonth() นับจาก 0
    const [year, setYear] = useState(selectedDate.getFullYear());

    const [reports, setReports] = useState({
        "depositAmountToday": 0,
        "withdrawAmountToday": 0,
        "profitToday": 0,
        "dailySummary": [],
        "monthlySummary": {
            "totalDepositMonthly": 0,
            "totalWithdrawMonthly": 0,
            "totalProfitMonthly": 0,
            "newUsers": 0,
            "newUsersWithDeposit": 0,
            "firstDepositAmount": 0
        }
    })
    console.log('month:', month)
    console.log('year:', year)
    const handleMonthYearChange = (date) => {
        setSelectedDate(date);
        setMonth(date.getMonth() + 1); // +1 เพราะ getMonth() นับจาก 0
        setYear(date.getFullYear());
    };

    const getDatasReport = (rawMonth, rawYear) => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('loggedInUser')).accessToken
            console.log('ผ่าน', accessToken)
        } catch (e) {
            console.log('ไม่ผ่าน')
            localStorage.setItem('loggedInUser', "");
            navigate("/")
        }

        axios.get(`${API}/report?month=${rawMonth}&year=${rawYear}`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            }
        })
            .then(response => {
                // setbankdepositwithdrawwait(response.data.data)
                // setbankdepositwithdrawwait(response.data.data)
                console.log('response:', response.data)
                setReports(response.data.data)
            })
            .catch(error => {
            });
    }

    useEffect(() => {
        getDatasReport(month, year);
    }, [month, year])

    console.log("reports", reports.monthlySummary.totalDepositMonthly)
    return (
        <div className="py-2">
            <div className="flex mt-[4.7rem] md:mt-0" >
                <div className="content">
                    <div className="mt-5 rounded-lg overflow-hidden bg-white p-4 shadow-lg">
                        <div className="flex items-center">
                            <label htmlFor="input-state-3" className="font-semibold pr-3">
                                เดือน/ปี:{" "}
                            </label>
                            <div className="w-40">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleMonthYearChange}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    locale="en"
                                    showFullMonthYearPicker
                                    className="custom-datepicker"
                                // className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"

                                />
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <p>Selected Month: {month}</p>
                            <p>Selected Year: {year}</p>
                        </div> */}
                    </div>
                    <div className="mt-5 rounded-lg overflow-hidden shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center px-3 py-1 bg-blue-500 border-gray-200 rounded-t">
                            <h1 className="text-base font-display mr-auto text-white flex items-center font-bold uppercase">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-bar-chart w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                >
                                    <line x1={12} y1={20} x2={12} y2={10} />
                                    <line x1={18} y1={20} x2={18} y2={4} />
                                    <line x1={6} y1={20} x2={6} y2={16} />
                                </svg>{" "}
                                สรุปยอดรายเดือน
                            </h1>
                        </div>
                        <div className="bg-white p-4 grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <div className="border shadow-lg sm:w-60 p-3.5 rounded-lg">
                                    <h3 className="text-md font-display mb-3">สรุปยอดรายเดือน</h3>
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-green-500 mr-2 " /> รวมฝาก:{" "}
                                        </div>
                                        <span className="font-medium pl-1 text-xs text-green-500">{formatCurrency(reports.monthlySummary.totalDepositMonthly, 2)}</span>
                                    </div>
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-red-500 mr-2" /> รวมถอน:{" "}
                                        </div>
                                        <span className="text-red-500 font-medium pl-1 text-xs">
                                            -{formatCurrency(reports.monthlySummary.totalWithdrawMonthly, 2)}
                                        </span>
                                    </div>
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-purple-500 mr-2" /> สมัครใหม่:{" "}
                                        </div>
                                        <span className="text-black-500 font-medium pl-1 text-xs">
                                            {formatCurrency(reports.monthlySummary.totalNewUsers, 0)}
                                        </span>
                                    </div>
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-orange-500 mr-2" /> สมัครฝากแรก:{" "}
                                        </div>
                                        <span className="text-black-500 font-medium pl-1 text-xs">
                                            {formatCurrency(reports.monthlySummary.totalNewUsersWithDeposit, 0)}
                                        </span>
                                    </div>
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-blue-500 mr-2" /> ยอดฝากแรก:{" "}
                                        </div>
                                        <span className="text-black-500 font-medium pl-1 text-xs">
                                            {formatCurrency(reports.monthlySummary.totalFirstDepositAmount, 2)}
                                        </span>
                                    </div>
                                    {/* <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-yellow-500 mr-2" /> โปรโมชั่น:{" "}
                                        </div>
                                        <span className="font-medium pl-1 text-xs">0</span>
                                    </div> */}
                                    <div className="leading-8 mb-1.5 flex items-center justify-between font-light">
                                        <div className="flex items-center text-xs">
                                            <div className="h-4 w-5 bg-gray-500 mr-2" /> ดุล:{" "}
                                        </div>
                                        <span className={`font-medium pl-1 text-xs ${reports.monthlySummary.totalProfitMonthly <= 0 && "text-red-500"}`}>
                                            {formatCurrency(reports.monthlySummary.totalProfitMonthly, 2)}
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-12 lg:col-span-12 mt-6">
                                <ReportChart dailySummary={reports.dailySummary} />
                            </div>

                        </div>
                    </div>
                    <div className="mt-5 rounded-lg overflow-hidden shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center px-3 py-1 bg-orange-500 border-gray-200 rounded-t">
                            <h1 className="text-base font-display mr-auto text-white flex items-center font-bold uppercase">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-align-justify w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                >
                                    <line x1={21} y1={10} x2={3} y2={10} />
                                    <line x1={21} y1={6} x2={3} y2={6} />
                                    <line x1={21} y1={14} x2={3} y2={14} />
                                    <line x1={21} y1={18} x2={3} y2={18} />
                                </svg>{" "}
                                รายการรายวัน
                            </h1>
                        </div>
                        <div className="bg-white p-4 overflow-auto">
                            <table className="text-xs text-left w-full">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-dark-1 px-half font-display">
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                                            {" "}
                                            #{" "}
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                                            วัน
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            ฝาก
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            ถอน
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            สมัครใหม่
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            สมัครฝากแรก
                                        </th>
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            ยอดฝากแรก
                                        </th>
                                        {/* <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            รวมโปรโมชั่น
                                        </th> */}
                                        <th className="py-1 px-2 font-medium border border-b-2 dark:border-dark-5 whitespace-nowrap text-right">
                                            รวม
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {(reports.dailySummary).map(data)} */}
                                    {/* <tr className="hover:bg-yellow-100 px-half">
                                        <td className="py-1 px-2 border text-center p-0 w-10">1</td>
                                        <td className="py-1 px-2 border uppercase w-32 text-center">
                                            2024-10-01
                                        </td>
                                        <td className="py-1 px-2 border text-right uppercase w-56">
                                            13,060
                                        </td>
                                        <td className="py-1 px-2 border text-right uppercase w-40 text-red-500">
                                            -15,105
                                        </td>
                                        <td className="py-1 px-2 border text-right uppercase w-40">
                                            <span className="text-red-500">-2,045</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-yellow-100 px-half">
                                        <td className="py-1 px-2 border text-center p-0 w-10">2</td>
                                        <td className="py-1 px-2 border uppercase w-32 text-center">
                                            2024-10-02
                                        </td>
                                        <td className="py-1 px-2 border text-right uppercase w-56">810</td>
                                        <td className="py-1 px-2 border text-right uppercase w-40">0</td>
                                        <td className="py-1 px-2 border text-right uppercase w-40">0</td>
                                        <td className="py-1 px-2 border text-right uppercase w-40">
                                            <span className="">810</span>
                                        </td>
                                    </tr> */}

                                    {(reports.dailySummary).map((data, index) => (
                                        <tr key={index} className="hover:bg-yellow-100 px-half">
                                            <td className="py-1 px-2 border text-center p-0 w-10">{index + 1}</td> {/* ลำดับที่ */}
                                            <td className="py-1 px-2 border uppercase w-32 text-center">
                                                {data.day}  {/* แสดงวันที่ */}
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-56">
                                                {formatCurrency(data.deposit)} {/* แสดงยอดฝาก */}
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-40 text-red-500">
                                                -{formatCurrency(data.withdraw)}  {/* แสดงยอดถอน */}
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-56">
                                                {formatCurrency(data.newUsers)} 
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-56">
                                                {formatCurrency(data.newUsersWithDeposit)} 
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-56">
                                                {formatCurrency(data.firstDepositAmount)} 
                                            </td>
                                            <td className="py-1 px-2 border text-right uppercase w-40">
                                                <span className={`${data.profit < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {formatCurrency(data.profit)}  {/* แสดงดุล (กำไร/ขาดทุน) */}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr
                                        className="px-2 bg-yellow-50 py-2 text-center"
                                        style={{ display: "none" }}
                                    >
                                        <td colSpan={7}>ไม่มีข้อมูล</td>
                                    </tr>
                                    <tr className="px-2" style={{ display: "none" }}>
                                        <td colSpan={7} className="text-center">
                                            <span className="text-xs">
                                                <svg className="animate-spin h-4 w-4 inline mx-2 pb-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-loader w-8 h-8 block text-blue-500 w-8 h-8 block text-blue-500"
                                                    >
                                                        <line x1={12} y1={2} x2={12} y2={6} />
                                                        <line x1={12} y1={18} x2={12} y2={22} />
                                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                                                        <line x1={2} y1={12} x2={6} y2={12} />
                                                        <line x1={18} y1={12} x2={22} y2={12} />
                                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                                                    </svg>
                                                </svg>
                                                กำลังโหลดข้อมูล . . .
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-slate-300 py-1 px-2 font-bold">
                                        <td colSpan={2} className="py-1 px-2 text-left border font-display">
                                            รวม
                                        </td>
                                        <td className="py-1 px-2 text-right border">{formatCurrency(reports.monthlySummary.totalDepositMonthly, 2)}</td>
                                        <td className="py-1 px-2 text-right border text-red-500">
                                            -{formatCurrency(reports.monthlySummary.totalWithdrawMonthly, 2)}
                                        </td>
                                        {/* <td className="py-1 px-2 text-right border">0</td> */}
                                        <td className="py-1 px-2 text-right border">{formatCurrency(reports.monthlySummary.totalNewUsers, 0)}</td>
                                        <td className="py-1 px-2 text-right border">{formatCurrency(reports.monthlySummary.totalNewUsersWithDeposit, 0)}</td>
                                        <td className="py-1 px-2 text-right border">{formatCurrency(reports.monthlySummary.totalFirstDepositAmount, 2)}</td>
                                        <td className={`py-1 px-2 text-right border ${reports.monthlySummary.totalProfitMonthly <= 0 && "text-red-500"}`}>{formatCurrency(reports.monthlySummary.totalProfitMonthly, 2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ReportMonthlyPage
