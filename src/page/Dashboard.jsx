import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { Select } from '@headlessui/react'

import axios from 'axios';
import { API } from '../Configs/Configs';
import { formatCurrency, formatCurrencyFloat } from "@/util/format";

const validPeriods = [
    { value: 'today', label: 'วันนี้' },
    { value: 'yesterday', label: 'เมื่อวาน' },
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'lastWeek', label: 'สัปดาห์ที่แล้ว' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'lastMonth', label: 'เดือนที่แล้ว' }
];

const getLabel = (value) => {
    const period = validPeriods.find(period => period.value === value);
    return period ? period.label : 'ไม่พบข้อมูล';
};

function Dashboard() {
    const [period, setPeriod] = useState("today")
    const [dashboarddata, setDashboarddata] = useState([])


    const [isLoading, setIsloading] = useState(true)
    const [dataLoading, setDataLoading] = useState(false)
    const [accessToken, setaccessToken] = useState("")

    const [users, setUsers] = useState([])
    const [pagination, setPagination] = useState([])

    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    useEffect(() => {
        if (loggedInUser) {
            setaccessToken(JSON.parse(loggedInUser).accessToken)
            setIsloading(false)
        } else {
            navigate("/");
        }
    }, []);

    const fetchDashboard = () => {
        // axios.get(`${API}/dashboard?period=${period}`, {
        axios.get(`${API}/dashboard`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            }
        })
            .then(response => {
                console.log(response.data)
                setDashboarddata(response.data.data)
                setDataLoading(false);
            })
            .catch(error => {
            });
    }

    useEffect(() => {
        if (accessToken !== "") {
            if (loggedInUser && !isLoading) {
                fetchDashboard();
            }
        }
    }, [isLoading, accessToken]);
    const getData = () => {
        setDataLoading(true);
        fetchDashboard();
    }

    useEffect(() => {
        getData();
    }, [period]);

    useEffect(() => {

        console.log(dashboarddata ? 'Loadding' : 'Success')
    }, [dashboarddata]);
    const handelSelectPeriod = (e) => {
        setPeriod(e.target.value);
    }
    // const [dashboarddata, setDashboarddata] = useState([])

    const [dropdownProfile, setdropdownProfile] = useState(false)

    function spinnerLoad() {
        return (
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
        )
    }
    if (!isLoading)
        return (
            <div className="py-2">
                <div className="flex mt-[4.7rem] md:mt-0">
                    <div className="content">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 xxl:col-span-9">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 mt-5">
                                        <div className="intro-y flex items-center">
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 flex items-center justify-center"
                                                type="button"
                                                onClick={getData}
                                                disabled={dataLoading}
                                            >
                                                {dataLoading === false ? (
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
                                                        className="w-4 h-4 mr-2"
                                                    >
                                                        <polyline points="1 4 1 10 7 10" />
                                                        <polyline points="23 20 23 14 17 14" />
                                                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                                                    </svg>
                                                ) : (
                                                    spinnerLoad()
                                                )}
                                                <span>อัพเดทข้อมูล</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="grid text-red-500">
                                            กำลังอยู่ในการพัฒนา
                                        </div>
                                        <div className="grid grid-cols-12 gap-6 bg-th">


                                            {/* <div className="p-1 rounded-lg border border-yellow-300 bg-gradient-to-tr from-yellow-400 to-yellow-50 shadow-xl col-span-12 xl:col-span-6 2xl:col-span-3">
                                                <div className="p-3 border-b-2 border-yellow-300">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h1 className="text-xl font-display font-medium">กำไร</h1>
                                                        <div className="w-40">
                                                            <div className="relative mt-1">
                                                                <Select name="status" aria-label="Project status" data-hover
                                                                    id="headlessui-listbox-button-17"
                                                                    className="relative w-full cursor-pointer rounded-lg bg-black bg-opacity-20 px-4 text-sm font-medium py-2 pl-3 pr-10 text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border data-[hover]:shadow data-[focus]:bg-blue-500"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                    data-headlessui-state=""
                                                                    onChange={handelSelectPeriod}
                                                                >
                                                                    <option value="today">วันนี้</option>
                                                                    <option value="yesterday">เมื่อวาน</option>
                                                                    <option value="week">สัปดาห์นี้</option>
                                                                    <option value="lastWeek">สัปดาห์ที่แล้ว</option>
                                                                    <option value="month">เดือนนี้</option>
                                                                    <option value="lastMonth">เดือนที่แล้ว</option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="h-8">
                                                        {dataLoading === false ? <h2 className={`text-${dashboarddata.profit >= 0 ? "green" : "red"}-500 text-2xl font-semibold font-display`}>
                                                            {formatCurrencyFloat(parseFloat(dashboarddata.profit))} THB
                                                        </h2> : spinnerLoad()}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="p-3">
                                                        <h1 className="mb-4 text-lg font-display font-medium">
                                                            ฝาก
                                                        </h1>
                                                        <div className="h-6">
                                                            {dataLoading === false ? <h2 className="text-lg font-semibold text-blue-600">
                                                                {formatCurrencyFloat(parseFloat(dashboarddata.depositAmountToday))}
                                                            </h2> : spinnerLoad()}
                                                        </div>
                                                    </div>
                                                    <div className="p-3">
                                                        <h1 className="mb-4 text-lg font-display font-medium">
                                                            ถอน
                                                        </h1>
                                                        <div className="h-6">
                                                            {dataLoading === false ? <h2 className="text-lg font-semibold text-red-600">
                                                                {formatCurrencyFloat(parseFloat(dashboarddata.withdrawAmountToday))}
                                                            </h2> : spinnerLoad()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* สมัครใหม่วันนี้ */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-user-plus report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
                                                            >
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx="8.5" cy={7} r={4} />
                                                                <line x1={20} y1={8} x2={20} y2={14} />
                                                                <line x1={23} y1={11} x2={17} y2={11} />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    สมัครใหม่{getLabel(period)}
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.usersToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* สมาชิกฝากแรกวันนี้ */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    สมาชิกฝากแรกวันนี้
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.newUsersNoDepositCountToday)}({formatCurrency(dashboarddata.newUsersNoDepositAmountToday)} บาท)</span> : spinnerLoad()}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* ยอดฝากประจำวัน */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดฝากประจำวัน
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.depositAmountToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* ยอดถอนประจำวัน */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดถอนประจำวัน
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.withdrawAmountToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* กำไรประจำวัน */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-800"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    งบดุล(วันนี้)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.profitToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* งบดุล (เมื่อวาน) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-800"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    งบดุล(เมื่อวาน)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.profitYesterday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* งบดุลประจำเดือน (บาท) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-800"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    งบดุล(สัปดาห์นี้)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.profitWeek)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* งบดุลประจำเดือน (บาท) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-800"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    งบดุล(เดือนนี้)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.profitMonth)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* จำนวนลูกค้าฝากวันนี้ (คน/ครั้ง) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-users report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    จำนวนลูกค้าฝาก{getLabel(period)}(คน/ครั้ง)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.depositsUserToday)}/{formatCurrency(dashboarddata.depositsCountToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* จำนวนลูกค้าฝากเมื่อวาน (คน) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-users report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    จำนวนลูกค้าฝากเมื่อวานนี้(คน/ครั้ง)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.depositsUserYesterday)}/{formatCurrency(dashboarddata.depositsCountYesterday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* ลูกค้าสมัครใหม่เมื่อวาน (คน) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-users report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ลูกค้าสมัครใหม่เมื่อวาน(คน)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.usersYesterday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* สมัครใหม่สัปดาห์นี้(คน) */}
                                            {/* สมัครใหม่เดือนนี้(คน) */}
                                            {/* <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="box p-3 border">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
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
                                                                className="feather feather-users h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                        </div>

                                                        <div className="ml-auto text-right w-full">
                                                            <div className="mb-0">
                                                                <div className="mt-0 font-display text-lg lg:text-xl font-medium flex items-center justify-end">
                                                                    <div className="text-4xl font-bold leading-8 my-6 mr-2">
                                                                        {dataLoading === false ? <span>{formatCurrency(dashboarddata.usersWeek)}</span> : spinnerLoad()}
                                                                    </div>
                                                                    <span>สมัครใหม่สัปดาห์นี้(คน)</span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-0">
                                                                <div className="mt-0 font-display text-lg lg:text-xl font-medium flex items-center justify-end">
                                                                    <div className="text-4xl font-bold leading-8 my-6 mr-2">
                                                                        {dataLoading === false ? <span>{formatCurrency(dashboarddata.usersMonth)}</span> : spinnerLoad()}
                                                                    </div>
                                                                    <span>สมัครใหม่เดือนนี้(คน)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* ยอดฝากรวม (เมื่อวาน) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดฝากรวม(เมื่อวาน)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.depositAmountYesterday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* ยอดถอนรวม (เมื่อวาน) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดถอนรวม(เมื่อวาน)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.withdrawAmountYesterday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* ยอดฝากประจำเดือน (บาท) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดฝากประจำเดือน(บาท)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.depositAmountMonth)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* ยอดถอนประจำเดือน (บาท) */}
                                            {/* <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
                                                <div className="report-box- zoom-in- shadow-xl">
                                                    <div className="box p-5 border">
                                                        <div className="flex">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-600"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดถอนประจำเดือน(บาท)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.withdrawAmountMonth)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                        </div>
                                    </div>

                                    <div className="col-span-12 xl:col-span-4 mt-3">

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                {dropdownProfile && <div
                    className="dropdown-menu !w-48 show"
                    id="_nfgw9au9l"
                    style={{
                        width: 192,
                        position: "absolute",
                        inset: "0px 0px auto auto",
                        margin: 0,
                        transform: "translate(-52px, 70.6667px)"
                    }}
                    data-popper-placement="bottom-end"
                >
                    <ul className="dropdown-content bg-primary dark:bg-dark-6 text-white">
                        <div className="p-4 border-b border-white/[0.08] dark:border-dark-3">
                            <div className="font-medium">miler@99XBET/</div>
                            <div className="text-xs text-slate-200 mt-0.5 dark:text-gray-600">
                                พาร์ทเนอร์: 99XBET/
                            </div>
                        </div>
                        <div className="p-2">
                            <li>
                                <div className="dropdown-item cursor-pointer hover:bg-primary dark:hover:bg-dark-3">
                                    <a
                                        href="/profile"
                                        className="flex items-center transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md"
                                    >
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
                                            className="feather feather-user w-4 h-4 mr-2 w-4 h-4 mr-2"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx={12} cy={7} r={4} />
                                        </svg>{" "}
                                        โปรไฟล์
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown-item cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md cursor-pointer capitalize">
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
                                        className="feather feather-lock w-4 h-4 mr-2 w-4 h-4 mr-2"
                                    >
                                        <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>{" "}
                                    เปลี่ยนรหัสผ่าน
                                </div>
                            </li>

                        </div>
                        <div className="p-2 border-t border-white/[0.08] dark:border-dark-3">
                            <button className="flex items-center p-2 transition duration-300 ease-in-out hover:bg-primarydark:hover:bg-dark-3 rounded-md w-full focus:outline-none">
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
                                    className="feather feather-toggle-right w-4 h-4 mr-2 w-4 h-4 mr-2"
                                >
                                    <rect x={1} y={5} width={22} height={14} rx={7} ry={7} />
                                    <circle cx={16} cy={12} r={3} />
                                </svg>{" "}
                                ออกจากระบบ
                            </button>
                        </div>
                    </ul>
                </div>}




            </div>


        )
}

export default Dashboard
