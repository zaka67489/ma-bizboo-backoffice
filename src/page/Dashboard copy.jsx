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
        axios.get(`${API}/dashboard?period=${period}`, {
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
                                                className="btn btn-outline-dark font-medium truncate btn font-display w-32 h-9 disabled:border-gray-400 btn btn-md btn btn-outline-dark font-medium truncate btn font-display w-32 h-9 disabled:border-gray-400"
                                                type="button"
                                                onClick={getData}
                                                disabled={dataLoading}
                                            >
                                                {dataLoading === false ? <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16px"
                                                    height="16px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-refresh-ccw w-4 h-4 mr-3 w-4 h-4 mr-3"
                                                >
                                                    <polyline points="1 4 1 10 7 10" />
                                                    <polyline points="23 20 23 14 17 14" />
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                                                </svg> : spinnerLoad()}
                                                อัพเดทข้อมูล
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-6 bg-th">
                                            <div className="p-1 rounded-lg border border-yellow-300 bg-gradient-to-tr from-yellow-400 to-yellow-50 shadow-xl col-span-12 xl:col-span-6 2xl:col-span-3">
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
                                                                {/* {dashboarddata.depositAmountToday} */}
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
                                                                {/* {dashboarddata.withdrawAmountToday} */}
                                                                {formatCurrencyFloat(parseFloat(dashboarddata.withdrawAmountToday))}
                                                            </h2> : spinnerLoad()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-user-plus report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600 report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-600"
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
                                                        <div className="border-green-600 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าสมัครใหม่{getLabel(period)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-gift report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-blue-500 report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-blue-500"
                                                            >
                                                                <polyline points="20 12 20 22 4 22 4 12" />
                                                                <rect x={2} y={7} width={20} height={5} />
                                                                <line x1={12} y1={22} x2={12} y2={7} />
                                                                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                                                                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    สมัคร-ฝากเงิน{getLabel(period)}
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">


                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.newDepositsToday)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-blue-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าสมัครใหม่ฝากเงิน{getLabel(period)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-users report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500 report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ลูกค้าทั้งหมด
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.alluser)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-red-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าทั้งหมดในระบบ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-users report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500 report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx={9} cy={7} r={4} />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    จำนวนลูกค้าฝาก{getLabel(period)}(คน)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.newDepositsUser)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="border-red-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าทั้งหมดในระบบ
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-500"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    จำนวนที่ฝาก{getLabel(period)}(ครั้ง)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.countDepositsUser)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="border-red-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าทั้งหมดในระบบ
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    จำนวนที่ถอน{getLabel(period)}(ครั้ง)
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.countWithdrawUser)}</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="border-red-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าทั้งหมดในระบบ
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-red-500"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>
                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    ยอดถอนประจำเดือน
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>{formatCurrency(dashboarddata.withdrawAmountMonth)}</span> : spinnerLoad()}

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="border-red-500 mt-1 border-t-4 pt-2 text-lg">
                                                            ลูกค้าทั้งหมดในระบบ
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-6 2xl:col-span-3 intro-y">
                                                {/* <div className="report-box- zoom-in- shadow-xl">
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
                                                                className="feather feather-dollar-sign report-box__icon h-10 w-10 sm:w-6 sm:h-6 lg:h-10 lg:w-10 text-green-500"
                                                            >
                                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
                                                            </svg>


                                                            <div className="ml-auto text-right mb-8">
                                                                <div className="mt-1 font-display text-lg lg:text-xl font-medium">
                                                                    งบดุลประจำเดือน
                                                                </div>
                                                                <div className="text-4xl font-bold leading-8 my-6">
                                                                    {dataLoading === false ? <span>0</span> : spinnerLoad()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-span-12 xl:col-span-8 mt-3">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="intro-y box col-span-12 sm:col-span-6-">
                                                <div className="flex flex-col sm:flex-row items-center px-5 pt-4 pb-2">
                                                    <h2 className="text-center mx-auto font-display flex items-center">
                                                        THB ฝากเงิน/ถอนเงิน
                                                    </h2>
                                                </div>
                                                <div className="p-3">
                                                    <div className="preview">
                                                        <div className="chartjs-size-monitor">
                                                            <div className="chartjs-size-monitor-expand">
                                                                <div className="" />
                                                            </div>
                                                            <div className="chartjs-size-monitor-shrink">
                                                                <div className="" />
                                                            </div>
                                                        </div>

                                                        <canvas
                                                            width={541}
                                                            height={270}
                                                            style={{ display: "block", height: 361, width: 722 }}
                                                            className="chartjs-render-monitor"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="intro-y box col-span-12 sm:col-span-6-">
                                                <div className="flex flex-col sm:flex-row items-center px-5 pt-4 pb-2">
                                                    <h2 className="text-center mx-auto font-display flex items-center">
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
                                                            className="feather feather-user-plus mr-1 mr-1"
                                                        >
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                            <circle cx="8.5" cy={7} r={4} />
                                                            <line x1={20} y1={8} x2={20} y2={14} />
                                                            <line x1={23} y1={11} x2={17} y2={11} />
                                                        </svg>{" "}
                                                        สมัครใหม่/สมัครแล้วฝากเงิน
                                                    </h2>
                                                </div>
                                                <div className="p-3">
                                                    <div className="preview">
                                                        <div className="chartjs-size-monitor">
                                                            <div className="chartjs-size-monitor-expand">
                                                                <div className="" />
                                                            </div>
                                                            <div className="chartjs-size-monitor-shrink">
                                                                <div className="" />
                                                            </div>
                                                        </div>

                                                        <canvas
                                                            width={541}
                                                            height={270}
                                                            style={{ display: "block", height: 361, width: 722 }}
                                                            className="chartjs-render-monitor"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-span-12 xl:col-span-4 mt-3">
                                        <div className="bg-white shadow-md rounded-lg w-full">
                                            <div className="px-5 pt-5 pb-6">
                                                <div className="flex items-center">
                                                    <div className="text-lg font-medium font-display truncate mr-5">
                                                        รายการ ฝาก-ถอน ล่าสุด
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-5 pb-5">
                                                <div className="grid grid-cols-12 gap-y-6 active">
                                                    <div className="col-span-12 sm:col-span-6 md:col-span-6 xl:col-span-12 2xl:col-span-6">
                                                        <div className="flex items-center" trend="up">
                                                            <img
                                                                className="object-cover w-12"
                                                                src="data:image/png;base64,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"
                                                                alt="deposit"
                                                            />
                                                            <div className="pl-4">
                                                                <div className="text-slate-500 font-display">ฝาก</div>
                                                                <div className="mt-1.5 flex items-center">
                                                                    <div className="text-lg">
                                                                        {dataLoading === false ? <div>{dashboarddata.countDepositsUser}<span className="text-gray-600 text-xs pl-2">
                                                                            รายการ
                                                                        </span></div> : spinnerLoad()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 sm:col-span-6 md:col-span-6 xl:col-span-12 2xl:col-span-6">
                                                        <div className="flex items-center" trend="up">
                                                            <img
                                                                className="object-cover w-12"
                                                                src="data:image/png;base64,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"
                                                                alt="withdraw"
                                                            />
                                                            <div className="pl-4">
                                                                <div className="text-slate-500 font-display">ถอน</div>
                                                                <div className="mt-1.5 flex items-center">
                                                                    <div className="text-lg">
                                                                        {dataLoading === false ? <div>{dashboarddata.countWithdrawUser}<span className="text-gray-600 text-xs pl-2">
                                                                            รายการ
                                                                        </span></div> : spinnerLoad()}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 sm:col-span-6 md:col-span-6 xl:col-span-12 2xl:col-span-6">
                                                        <div
                                                            className="flex items-center"
                                                            percentage={100}
                                                            trend="up"
                                                        >
                                                            <img
                                                                className="object-cover w-12"
                                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAOwAAADsAEnxA+tAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAADVhJREFUeJztnWuMnFUZx3/PO9Pdbcvagm3FcFGIFCwkagAp9LI7S9mbbGnAhRgRUYn4xRBQiWghGASNBjRqoiaIlyoWVojcOrvLsjNbCzRQoqgVBCMgiJeCQLeX3Z2Z9/HDbHVpuu/1vLdlfkk/zTnPebbnf8553nOFBg0aNGjQoEGDBg0avLWQpB2IG93S08xieyG1/GJsXQiAJXvJVV/ndWuv9BYnE3YxVuacALTUfhgsOAmrthxbliOciMgJqL4LOBzIuZioAa8h8gKqz6A8g/Bn1HqWqepT0jW8N/q/Ij4yLwDd0beA8amzQFYjrALWAM0RFVdD5HfY9ghiPUylslXOGXkjorJiIZMC0JGz30F+3kVAP3AGMC8hVyrAdpAB5tXukFXD/07Ij8BkRgBaam9BWvpALgHtIrlKn40aUEJkE/b+u6VQ3pO0Q15IvQB027pjqeY/B3wSOCxpfzyyB7iNfPVmWT3yt6SdcSK1AtBS13sQ+SxwOdGN6VFTATZjyddlbfFPSTtzKFInAN3aswLbvhFkPWAl7Y8hbOAe1P6SFIafTtqZmaRGAPVovnI1whfJbot3owJ8nxa5VlYWdyftDKREAFru6QO+B3ps0r7ExMuIXMPa4iYRNElHEhWAjnUeg1o/ATqS9CNBRlD5hBSKLyXlQGICqLd6/THw9qR8SAmvovalUhi+P4nCYxeAltrz0LIR4VrmTpAXFgW+y9LWL8jJA1NxFhyrAHSs8zjUuhM4Lc5yM8TjKBdKYfD5uAqMTQBa6jwFsQaBo+IqM6P8E5FeaSv+No7CYumCtdTdjljbaFS+F45EdauWO8+Jo7DIBaClng8jDAKLoi4rALum/6WNw8C6T0e7Loi6oEgFoKWuyxDdTHomdl4EuQm1TmeftEj74DJpH1zGPmlBrdOBrwGJfZIdRDOW3KGlrsuiLCSyGKDe8nUz7hsw4mA/cANNrd+Wswb2OyXUR/rnU9lzFaobgZZ43HOkhq0XScfQXVEYj0QA9TGfIun4D3wVZYMUBrf5yaSjvWdg2fcCyyLyyw9TYJ8r7cMPmjZsXABa6n0/Yo8BbzNtOwB7sHWldAztDJJZR7tOxpLtpGMZ+g1sbZOOoSdNGjUaA+hY53GIXSQdlQ/w6aCVDyAdQzsRvdykQyFYhCVFfaj3XSaNGhOA7jh1HmrdDhxpymY4dKu0D/4yrBVpG7od8DV8RMg7ydkDurO/yZRBcz3A3iXfAFYasxca6+vGTAlfM2YrPKeza9yYP0YEoGPdvahcYcKWIcbR/eYCJntiGBg3Zi88V+po13kmDIUWQH1Jl5+Rkr0FdXSbFMpVU9akUK4iPGLKngEES27VUs/RYQ2F7wHq6/kpW9KVF42bVE3b5s4liP44rJFQAtBy90dI52YO86d3JAKb4Vmn5e7+MAYCC0C3rW8Fvhmm8MgQMX9mwI7AphluqR+HC0bwHqA2dR1pXd1TNT8kSdqGuf9xNFbLl4NmDiQA3dqzAiVNUf/BRFBZklYBgHKVljpPCpI1WA9g2zeSvqNZ/0ciqCzhCOM2zdGEWDcEyehbAHWlyfoghcVGFEOA6hLjNs1yvm7tWeE3k/8eQOSaQPniJYruOr1DQB0L2/6c30y+Jm+m9/H/BTA2Fx0ZS1ubTe2w1Z39Tewaz8LNIRXy1ff4OZDqryWr9QWyUPkA/95rbsx+dXfaW/8B5lHLXekng2cB6FDnQuATvl1KCq2Zq7RqqgPAN6PyKd3Rt8Brcu89QEtuA+nYGOGNXM5gq7XSHgDOpJXxiucg3bsA1P5oIHeSQm1zAshF8FURJSKe68qTAPThzmUgsexTN4bJT0FN8STQIdHuep25460HqMpHgHwYl2LHsgwKIGM9AOSpWB/2ktDjECChVpwSwWSlpXsW8NAIF3pJ5ioA3dG3AOX08B7FjclWK1kKAusoZ3r5GnDvAXZX1pCVb/+ZGF0PyNwQANDE7sqZboncBWDRZsSduFGDU7fpXQp2Jke7WxIvMYCrkXRi8isgowLQkAKYnv3L6GUOlsHATQ43ZytWPugWBzj3AM3WCtK87u+Ivl01/E7luo1MxgAATeybctwo4iwAkeVG3YmXPCPrwh9RK29YRNbmQGZSc65DZwHYeoJRZ+KmpTl8y7Uns9r667g0YpcegCz3AFAzsCKY0+xNAr0J50bs9hVwokFP4sc2MIOXvWngg3GsQzcBGD2KHDs5AzN4JtcUkuE4px/dBJCWc/7B0EYPgEsdzioALbW3kNlPwGmMVF7mBdDkdJ+AQw/Qmp3dP7NhGVgPyNxegEPwxu5Z63J2AViTrZE4EycmeoCsrgPMZH9u1rp06AHy2e8BjOzlnwM9gFUNIoA5gJEl4czHAI44CKCaiWfPHDETwWdfAHZ+1uttZheA3ZymO3GC0hAAwPxaAAEwnv0eAFrDXKk2nTf7sdCit81al7MKQArlCeqvXGWbMEfEsnMkzIkppzOSbkFgKp42C0WYI2JZOhI2O46PW7vtB3jepCeJEOqIWKaOhM3Gc04/OgtA9RmjriRBmCNiWTsSdmgc69BFAM6ZM0GYT8G5MA2MPOv0q7MALOfMmSDMcm72VwJde/G3wBAQohKtOTAHkAsjgEn7T2T+UzDMEJD17WBMsaDJ8bVyRwFI1/BeYIdRl+Im1HpABs8EvpnH5LT79jkl8LIYVDbjS0KEOdWT+aVgKbmlcBeASNmEKwmyQkfOfoffTFrqPRLF9717qULcG6/7gYeJ2sM0WxWyuz3sCPLzntNy9z/8ZbPfCcyPxKN4mGTeYY+6JfJ0dErL3b8BVod2qUGclKV9sOCWyOuGkIGQzjSIHbnTSypvArDkl2T+c/AtRQXNe2q0ngQga4u7QEfC+dQgRgalcN8rXhJ63xMo1i8Cu9MgXkQ815V3AUzUfg3MhV1Cc51xFubv85rYswCmZwVvC+RSgzi51W32byb+toXnqzczt4LB3bjsmMkYU6jc4ieDLwFM30Of5VigBgygdh+V6mJpH1wk7YOLqVaWAOcD9wKarIshUDZJofiSnyy+79DRsQ+9F639kcwdKtGnsPVj0jH8hGOqsc6zUGsTcHxMjpmiRs5aIWu2+FrC912J0vbAU8A9fvMlzGPk8qvcKh9A2oYfwZKVwJMx+GWSu/1WPgRtxZL7MmDkOZbokX9RrayXNQ+85jnH2uIu8tX1wKsROmaSSXLWxiAZAwmg3gvIt4PkjR3haln30L98Z6vHO9dF4FEU3BKk9UOYcVz33wD4CjgS4O/Y+28PnFsnbgP+Y86dSHiRSfvGoJkDC0AK5T2IfD5o/njQLWGekZ8+HTVk0CHzqFw1PUcTiFCRvLQV70B4KIyNSBEDgZxIioNBeVAKxV+FsRD+U86WS0lvsOQ58IvYRhS8Qi0X+hW30AKQQvEl1L6UVE6gSPhrbtRO48ZQRfi4nH3/38MaMjKZI4Xh+4FvmbBlFjnFgJH0XZYp3Cxtg1tMmDI3m7e09RrgcWP2TKB6bpgbw/XO/hxIr0mXDLCdhbu+ZMqYMQHIyQNTKBcCPjdfRsq7GeveEDj3st2XAGkaAl4mX71ITnvC2IJc6Pv0D0ZHu96HJWPAItO2A/JXWuQDsrLo664D3dqzFFt/CxwVkV8+0dexpE3WDv7epFXjCzrSMfQkygZgwrTtgBzPhL3Zz1Ux9ZfSdIDUVD4T2NYG05UPEa3oSWGwjK0XU19+TQHSwyvjo7pt3bFuKXXsnBPYU9mGpuaxrBq2XiwdxbEojBsfAmaipa7LEPkBkIuyHB/sA36IrT+lcOYfRK63AVSvtxjbfgZwMXAZ6Xkmr4bqZ6QwdGtUBUQqAAAd7boAS34BNEddlk/eAH0ZJAccDXh+cj0mJhA+Km2Dd0dZSOQCANDRnjYsvYf0BIZpZxzsC6R9+MGoC4pFAABa6jwFsYrUW1uD2fkHavVKYcvv4igstm1dUhj+IzVrNfBYXGVmkO3kqyvjqnyIeV+fnL3lBXRiFcpXADvOslOOAt9haWvb9EaU2IhtCDgYLXWtQ6yfg/o+uz/HeAVbL5WOoQeSKDyxnb1SGBpBOQ14K585HKaWf39SlQ8J9gAz0XJPH+h3yforZd55GZFrpK34s6QdSYUAYHr6dbxyNcIXSd+cgSkqwPfJN22U1fem4jr+1AjgADrafSIWX6V+Uidjh09mxQbuImdtDLp7NypSJ4AD6G8+dDy12hXAp4GWpP0JSAXYjNo3SWHY8b6+pEitAA6gY53HgFyFyqeArLxkNo7oj7Ctm/2e1Yub1AvgAFpqb0HmnwP6MeA80rNgc4AaUEJkE/b+u6VQzsRdCpkRwEy01LcEa+oikH6UlSQXNE4CjwIDVCt3yLqH0ro7elYyKYCZ6CP985kcPxVLVqG6DlhDdIKoIvIktj2CWA+Tn1dOSzQflMwL4GB0R98C9k2dRE2WI7IcOBH0BODdwGLcL7ycon5pxPP1u/btp1F5lpw+w4Kmp/3cvpEF5pwA3NCd/U38Z99C4HBsXQiAJXuB1zhiwV6nB5YaNGjQoEGDBg0aNGjQIPv8Fx5T25VmEuyRAAAAAElFTkSuQmCC"
                                                                alt="warning"
                                                            />
                                                            <div className="pl-4">
                                                                <div className="text-slate-500 font-display">
                                                                    ค้าง
                                                                </div>
                                                                <div className="mt-1.5 flex items-center">
                                                                    <div className="text-lg">
                                                                        {dataLoading === false ? <div>0<span className="text-gray-600 text-xs pl-2">
                                                                            รายการ
                                                                        </span></div> : spinnerLoad()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 sm:col-span-6 md:col-span-6 xl:col-span-12 2xl:col-span-6">
                                                        <div
                                                            className="flex items-center"
                                                            percentage={2}
                                                            trend="up"
                                                        >
                                                            <img
                                                                className="object-cover w-12"
                                                                src="data:image/png;base64,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"
                                                                alt="warning"
                                                            />
                                                            <div className="pl-4">
                                                                <div className="text-slate-500 font-display">
                                                                    สำเร็จ
                                                                </div>
                                                                <div className="mt-1.5 flex items-center">
                                                                    <div className="text-lg">
                                                                        {dataLoading === false ? <div>{parseInt(dashboarddata.countDepositsUser) + parseInt(dashboarddata.countWithdrawUser)}<span className="text-gray-600 text-xs pl-2">
                                                                            รายการ
                                                                        </span></div> : spinnerLoad()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="intro-y flex items-center h-10 mt-5">
                                            <h2 className="text-lg font-medium truncate mr-5">
                                                รายการ ฝาก-ถอน ล่าสุด
                                            </h2>
                                        </div>
                                        <div className="mt-5">
                                            <div className="intro-y">
                                                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                    <div
                                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded"
                                                        style={{ backgroundColor: "rgb(19, 143, 45)" }}
                                                    >
                                                        <img
                                                            className="w-8 h-8 object-contain"
                                                            src="/img/kbank.8be896ac.svg"
                                                            alt="kbank"
                                                        />
                                                    </div>

                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">น.ส. ทิพวรรณ ลิ้มศิริ</div>

                                                        <div className="text-slate-500 text-xs mt-0.5">
                                                            2 นาทีที่แล้ว
                                                        </div>
                                                    </div>
                                                    <div className="bg-green-600 py-1 px-2 rounded-full text-xs text-white cursor-pointer font-medium">
                                                        ฝาก 40
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="intro-y">
                                                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                    <div
                                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded"
                                                        style={{ backgroundColor: "rgb(235, 25, 141)" }}
                                                    >
                                                        <img
                                                            className="w-8 h-8 object-contain"
                                                            src="/img/gsb.693d5157.svg"
                                                            alt="gsb"
                                                        />
                                                    </div>

                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">นาง อนุชกุล อยู่ทอง</div>

                                                        <div className="text-slate-500 text-xs mt-0.5">
                                                            1 ชั่วโมงที่แล้ว
                                                        </div>
                                                    </div>
                                                    <div className="bg-red-600 py-1 px-2 rounded-full text-xs text-white cursor-pointer font-medium">
                                                        ถอน 300
                                                    </div>
                                                </div>

                                            </div>
                                            <a
                                                href="/tx-job"
                                                className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                                            >
                                                ดูทั้งหมด
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-12 mt-5">
                                    <div className="col-span-12 sm:col-span-12">
                                        <div className="box px-5 pb-5">
                                            <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                                                <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        aria-hidden="true"
                                                        role="img"
                                                        className="text-blue-800 mr-3 iconify iconify--fluent-mdl2"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 2048 2048"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M2048 0v64q0 167-25 310t-80 273t-137 248t-201 238q-38 38-77 75t-81 72h-210q75-54 143-112t134-124q99-101 173-203t124-213t76-234t32-265q-142 5-265 31t-233 77t-213 123t-203 173q-100 97-182 204T668 962l356 355v248q-138 80-279 156l-418-418q76-141 156-279H256V722l572-191v1q127-136 252-236t264-166t295-98t345-32zM973 1447l-372-372q-29 51-57 102t-58 102v1l282 282h1q51-29 102-57t102-58M558 896q29-46 58-91t62-89l-294 98v82zm978-128q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-53 20-99t55-82t81-55t100-20q53 0 99 20t82 55t55 81t20 100m-384 0q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50m-896 768q53 0 99 20t82 55t55 81t20 100q0 53-20 99t-55 82t-81 55t-100 20H0v-256q0-53 20-99t55-82t81-55t100-20m0 384q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50v128zm1152-128v-128h640v128zm0-256v-128h640v128zm-256 512v-128h128v128zm0-512v-128h128v128zm256 512v-128h640v128zm-256-256v-128h128v128z"
                                                        />
                                                    </svg>{" "}
                                                    รายการอัปเดตล่าสุด
                                                </h2>
                                                <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0" />
                                            </div>
                                            <div className="rounded-lg">
                                                <div className="pb-3">
                                                    <div className="font-semibold text-lg flex items-center">
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
                                                            className="feather feather-star mr-1 w-6 h-6 mr-1 w-6 h-6"
                                                        >
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>{" "}
                                                        11/04/24 18:00{" "}
                                                        <span className="text-xs text-gray-800 ml-0.5 font-light">
                                                            {" "}
                                                            (ล่าสุด){" "}
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mt-3">
                                                        <div className="prose prose-sm prose-headings:mb-2">
                                                            <h4>หน้าแดชบอร์ด</h4>
                                                            <ul>
                                                                <li>ปรับปรุงปฎิทินและการเลือกเวลา</li>
                                                                <li>ปรับปรุงการแสดงผลหน้าตั้งค่าโปรโมชั่น</li>
                                                                <li>ปรับปรุงระบบลงทะเบียนธนาคาร KPLUS</li>
                                                                <li>ปรับปรุงระบบละทะเบียนธนาคาร SCB Easy App</li>
                                                                <li>เพิ่มการตั้งค่าวงเงินสูงสุด KPLUS</li>
                                                                <li>
                                                                    ปรับปรุงการแสดงผลโปรโมชั่นที่เข้าร่วมของสมาชิก
                                                                </li>
                                                                <li>
                                                                    เพิ่มการตั้งค่าโปรโมชั่นโค้ดให้ไม่แสดงหน้าสมาชิก
                                                                </li>
                                                                <li>เพิ่มแสดงผลสมาชิกฝากถอนสูงสุด 100 อันดับ</li>
                                                                <li>
                                                                    ปรับปรุงการแสดงผลหน้าโยกเงินด้วย Payment Gateway
                                                                </li>
                                                                <li>เพิ่มการตั้งค่าระดับสมาชิก</li>
                                                                <li>ปรับปรุงหน้าชำระค่าบริการ</li>
                                                                <li>ปรับปรุงการแสดงผลหน้ารายงานเครดิต</li>
                                                                <li>เพิ่มคู่มือการลงทะเบียน KPLUS</li>
                                                                <li>เพิ่มตั้งค่าระดับสมาชิกให้บัญชีฝากถอนได้</li>
                                                                <li>เพิ่มคู่มือวิธีตั้งค่า Google analytics</li>
                                                                <li>เพิ่มคู่มือวิธีชำระค่าบริการ</li>
                                                            </ul>
                                                            <h4>หน้าสมาชิก</h4>
                                                            <ul>
                                                                <li>ปรับปรุงการแสดงผลหน้าโปรโมชั่น</li>
                                                                <li>ปรับปรุงหน้าฝากถอนเงิน</li>
                                                                <li>เพิ่มวิธีฝากถอนเงิน</li>
                                                                <li>เพิ่มวิธีแก้บล็อคเว็บไซต์</li>
                                                                <li>ปรับปรุงการแสดงผลหน้าเข้าร่วมโปรโมชั่น</li>
                                                            </ul>
                                                            <p>
                                                                <br />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pb-3">
                                                    <div className="border-t-2  pt-3 mt-3 font-semibold text-lg flex items-center">
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
                                                            className="feather feather-star mr-1 w-6 h-6 mr-1 w-6 h-6"
                                                        >
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>{" "}
                                                        27/03/24 14:00
                                                    </div>
                                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mt-3">
                                                        <div className="prose prose-sm prose-headings:mb-2">
                                                            <h4>หน้าแดชบอร์ด</h4>
                                                            <ul>
                                                                <li>
                                                                    ปรับปรุงระบบโปรโมชั่นใหม่เพิ่มตั้งค่าถอนสูงสุดแบบมีเงื่อนไข
                                                                </li>
                                                                <li>เพิ่มโปรโมชั่นโค้ด</li>
                                                                <li>ปรับปรุงการตั้งค่าสมาชิก</li>
                                                                <li>ปรับปรุงการแสดงผลหน้ารายการพาร์ทเนอร์</li>
                                                                <li>เพิ่มการชำระเงินผ่าน USDT TRC-20</li>
                                                            </ul>
                                                            <h4>หน้าสมาชิก</h4>
                                                            <ul>
                                                                <li>ปรับปรุงการแสดงผลยอดเสีย</li>
                                                                <li>เพิ่มโปรโมชั่นโค้ด</li>
                                                                <li>เพิ่มวิธีแก้บล็อกเว็บไซต์</li>
                                                                <li>ปรับปรุงการแสดงผลรายการเกมส์</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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
                            <div className="font-medium">miler@99XBET</div>
                            <div className="text-xs text-slate-200 mt-0.5 dark:text-gray-600">
                                พาร์ทเนอร์: 99XBET
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
