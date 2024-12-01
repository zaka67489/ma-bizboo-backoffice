
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import axios from 'axios';
import { API } from '../../Configs/Configs';

import { startOfMonth } from 'date-fns';
import { getCurrentTimeInUTC7, formatTimeDifference } from '../../Model/Function';
import { bankLabelImage, bankColor, bankLabel } from '../../Model/Bank';

import { DateRangePicker } from 'react-date-range';
import Select from 'react-select'


const TransactionTable = ({ historyTopup }) => {
    return (
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold">
                    <th className="py-1 px-2 whitespace-nowrap border text-center">
                        #
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-center">
                        ประเภท
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-right">
                        จำนวนเงิน
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-center">
                        ยูสเซอร์
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        ชื่อลูกค้า
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        บัญชีเว็บ
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        สถานะ
                    </th>
                    {/* <th className="py-1 px-2 whitespace-nowrap border text-left">
                        เวลาธนาคาร
                    </th> */}
                    {/* <th className="py-1 px-2 whitespace-nowrap border text-left">
                        เวลาระบบ
                    </th> */}
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        เวลา
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        ทำรายการ
                    </th>
                    <th className="py-1 px-2 whitespace-nowrap border text-left">
                        หมายเหตุ
                    </th>
                </tr>
            </thead>
            <tbody>
                {historyTopup.map((item, index) => (
                    <tr key={item.logid} className="hover:bg-yellow-100">
                        <td className="py-1 px-2 border text-center">{item.logid}</td>
                        {/* <td className="py-1 px-2 border text-center">{index + 1}</td>logid */}
                        <td className="py-1 px-2 border text-center">
                            <div className="w-20">
                                {item.type === "deposit" ? (
                                    <span className="bg-green-600 text-white rounded-full px-2.5 py-1 text-xs">
                                        ฝาก
                                    </span>
                                ) : (
                                    <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs">
                                        ถอน
                                    </span>
                                )}
                            </div>
                        </td>
                        <td className="py-1 px-2 border text-right">{item.amountLc.toLocaleString()}</td>
                        <td className="py-1 px-2 border text-center">
                            <a href={`/member/edit/${item.userId}#general`} className="text-blue-500 underline">
                                {item.user}
                            </a>
                        </td>
                        <td className="py-1 px-2 border text-center">
                            <div>
                                <div className="flex items-center text-left pl-1 w-48 relative">
                                    <div
                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                        style={{ backgroundColor: `${bankColor[item?.bankName?.toUpperCase()]}` }}
                                    >
                                        <img
                                            className="rounded w-7 h-7 object-contain"
                                            src={bankLabelImage[item?.bankName?.toUpperCase()]}
                                            alt={item?.bankName?.toUpperCase()}
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <div className="flex items-center">{item.accountNumber} </div>
                                        <div>{item.accountName}</div>
                                    </div>
                                </div>


                            </div>
                        </td>
                        <td className="py-1 px-2 border text-center">
                            <div>
                                <div className="flex items-center text-left pl-1 w-48 relative">
                                    <div
                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                        style={{ backgroundColor: `${bankColor[item?.bankserviceBankName?.toUpperCase()]}` }}
                                    >
                                        <img
                                            className="rounded w-7 h-7 object-contain"
                                            src={bankLabelImage[item?.bankserviceBankName?.toUpperCase()]}
                                            alt={item?.bankserviceBankName?.toUpperCase()}
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <div className="flex items-center">{item.bankserviceaccountNo} </div>
                                        <div>{item.bankserviceaccountName}</div>
                                    </div>
                                </div>


                            </div>
                        </td>

                        {item.statusLc === 1 ? <td className="py-1 px-2 border text-center">
                            <span className="text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs">
                                {item.statusLc === 1 ? "สำเร็จ" : "รอดำเนินการ"}
                            </span>
                        </td> : null}
                        {item.statusLc === 3 ? <td className="py-1 px-2 border text-center">
                            <span className="text-white bg-red-500 px-3 py-1 rounded-full min-w-max text-xs">
                                ยกเลิก
                            </span>
                        </td> : null}


                        <td className="py-1 px-2 border text-center number-display w-40">
                            <div className="flex justify-center">
                                <div className="w-24">
                                    <span className="block">
                                        {getCurrentTimeInUTC7(item.depositWithdrawTime, 14)}
                                    </span>
                                    <span className="block text-xs font-light">
                                        {formatTimeDifference(new Date(item.depositWithdrawTime), 14)}
                                    </span>
                                </div>
                            </div>
                        </td>
                        {/* <td className="p-2 text-center border">
                            <div className="min-w-max">
                                <div className="flex items-center gap-1 ml-3 relative"
                                    style={{ display: "none" }}>
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
                                        className="feather feather-user w-4 h-4 inline w-4 h-4 inline"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                    </svg>
                                    <span className="bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5">
                                        Auto
                                    </span>
                                </div>
                                <div
                                    className="flex items-center gap-1 ml-3 relative"
                                    style={{ display: "none" }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        className="iconify iconify--fluent"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                        />
                                    </svg>
                                    <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]">
                                        {" "}
                                        Auto{" "}
                                    </span>
                                </div>
                                <div
                                    className="flex items-center gap-1 ml-3 relative mt-1"
                                    style={{ display: "none" }}
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
                                        className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <polyline points="17 11 19 13 23 9" />
                                    </svg>
                                    <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                                        undefined (โอนมือ)
                                    </span>
                                </div>
                            </div>
                        </td> */}

                        <td className="p-2 border text-center">
                            <div className="min-w-max">
                                <div className="flex items-center gap-1 ml-3 relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        className="iconify iconify--fluent"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                        />
                                    </svg>
                                    <span className={`bg-${item.staffName === null ? "blue-500" : "gray-700"} text-white px-1.5 py-0.5 text-xs rounded-md before:text-blue-500 before:absolute before:left-[18px]`}>
                                        {item.staffName === null ? "Auto" : item.staffName}
                                    </span>
                                </div>
                                <div
                                    className="flex items-center gap-1 ml-3 relative mt-1"
                                    style={{ display: (item.statusLc === 5 || item.statusLc === 6 || item.statusLc === 11) ? "" : "none" }}>
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
                                        className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <polyline points="17 11 19 13 23 9" />
                                    </svg>
                                    <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">

                                        {item.staffName}  ({item.statusLc === 5 ? "ฝากมือ" : item.statusLc === 11 ? "ทิ้ง" : "โอนมือ"})
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 ml-3 relative mt-1" style={{ display: item.statusLc === 11 ? "" : "none" }}>

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
                                        className="feather feather-trash-2 w-3 w-3"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14H6L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                    </svg>
                                    <span className="bg-red-600 text-white px-1.5 py-0.5 text-xs rounded-md before:text-red-600 before:absolute before:left-[14px] whitespace-nowrap">
                                        ทิ้ง
                                    </span>
                                </div>
                            </div>
                        </td>


                        <td className="p-2 border-b">
                            <div className="w-60 flex flex-col">
                                <span className="flex">
                                    {/* <span className="hover:underline cursor-pointer hover:text-blue-500"> */}
                                    <span className=" ">
                                        หมายเหตุ:{item.remarkLc}
                                    </span>
                                    {/* <div className="relative">
                                        <div className="relative flex flex-col items-center group cursor-pointer mr-1 block text-gray-800">
                                            <svg
                                                className="w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div className="right-10 top-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                    BANK_INTERNAL_ERROR(info):
                                                    เกิดข้อผิดพลาด
                                                    ไม่สามารถเชื่อมต่อธนาคารได้
                                                    กรุณาตรวจสอบรายการฝากถอน
                                                    ก่อนทำรายการใหม่
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                </span>

                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};


function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
const MemberList = () => {
    // function MemberList

    const [isLoading, setIsloading] = useState(true)
    const [accessToken, setaccessToken] = useState("")

    const [users, setUsers] = useState([])
    const [historyTopup, setHistoryTopup] = useState([])
    const [pagination, setPagination] = useState([])
    const [apiresult, setApiresult] = useState([])

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

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const optionsTypes = [
        { value: "", label: "ทั้งหมด" },
        { value: "deposit", label: "ฝาก" },
        { value: "withdraw", label: "ถอน" }
    ]

    const [selectoptionsTypes, setselectoptionsTypes] = useState(optionsTypes[0].value)


    const optionsStatusValue = [
        { value: "", label: "ทั้งหมด" },
        { value: "1", label: "สำเร็จ" },
        // { value: "pending", label: "กำลังดำเนินการ" },
        { value: "3", label: "ยกเลิก" }
    ]
    const [selectstatusValue, setselectstatusValue] = useState(optionsStatusValue[0].value)



    useEffect(() => {
        if (loggedInUser && !isLoading) {
            getHistoryTopup();
        }
    }, [isLoading]);

    const [currentPage, setCurrentPage] = useState(pagination.currentPage);


    useEffect(() => {
        setCurrentPage(pagination.currentPage);
    }, [pagination.currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= pagination.totalPages) {
            setCurrentPage(page);
            getHistoryTopup(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const total = pagination.totalPages;
        const current = pagination.currentPage;
        const delta = 2;

        const range = {
            start: Math.max(2, current - delta),
            end: Math.min(total - 1, current + delta)
        };

        if (total === 1) {
            pageNumbers.push(1);
        } else {
            if (range.start > 2) {
                pageNumbers.push(1, '...');
            } else {
                pageNumbers.push(1);
            }

            for (let i = range.start; i <= range.end; i++) {
                pageNumbers.push(i);
            }

            if (range.end < total - 1) {
                pageNumbers.push('...', total);
            } else {
                pageNumbers.push(total);
            }
        }

        return pageNumbers.map((number, index) => (
            <li key={index} data-v-060ca318="" data-v-2a30deb0="">
                {number === '...' ? (
                    <span className="DotsHolder" data-v-060ca318="">
                        <svg
                            viewBox="0 0 8 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="Dots"
                            data-v-060ca318=""
                        >
                            <path
                                d="M2.24 1c0 .556-.445 1-1 1-.556 0-1-.444-1-1s.444-1 1-1c.555 0 1 .444 1 1zm5.333 0c0 .556-.444 1-1 1-.555 0-1-.444-1-1s.445-1 1-1c.556 0 1 .444 1 1z"
                                fill="#BBB"
                            />
                        </svg>
                    </span>
                ) : (
                    <button
                        className={`Page ${currentPage === number ? 'Page-active' : ''}`}
                        type="button"
                        aria-label={`Go to page ${number}`}
                        data-v-060ca318=""
                        style={{ backgroundColor: currentPage === number ? 'rgb(220, 237, 255)' : 'transparent' }}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                )}
            </li>
        ));
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0');
    }

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [state, setState] = useState([
        {
            startDate: startOfMonth(new Date()),
            endDate: new Date(),
            // endDate: addOneDay(new Date()),
            key: 'selection'
        }
    ]);

    const openDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    }

    const handleDateChange = (item) => {
        setState([item.selection]);
    }


    const getData = () => {
        console.log("getData usertransaction");

        const datefrom = formatDateToYYYYMMDD(state[0].startDate);
        const dateto = formatDateToYYYYMMDD(state[0].endDate);
        // console.log('datefrom:', datefrom)
        // console.log('dateto:', dateto)

        // axios.get(`${API}/user/credit-transaction/${userid}?type=${selectAddUser}&datefrom=${datefrom}&dateto=${add1day(dateto)}`, {
        //   headers: {
        //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
        //   }
        // })
        //   .then(response => {
        //     console.log("response getData usertransaction :", response.data)
        //     if (response.data.status === "success") {
        //       setCredittransactionResult(response.data.data)
        //       setSummaryResult(response.data.summary)
        //     }

        //   })
        //   .catch(error => {
        //     console.error("getData errorr :", error)
        //   });
    };

    const [startdate, setstartdate] = useState("")
    const [enddate, setenddate] = useState("")
    /*
    startDateFilter: 2024-09-30T17:00:00.000Z
    endDateFilter  : 2024-10-30T16:59:59.999Z
    */
    const handleOkClick = () => {

        setIsDatePickerOpen(false);
        getData();

        const datefrom = formatDateToYYYYMMDD(state[0].startDate);
        const dateto = formatDateToYYYYMMDD(state[0].endDate);
        console.log('datefrom:', datefrom)
        console.log('dateto:', dateto)

        setstartdate(datefrom);
        setenddate(dateto);

    }
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        })
    };

    const [staffSearch, setstaffSearch] = useState("")
    const [userSearch, setuserSearch] = useState("")

    const getHistoryTopup = (page = 1) => {
        axios.get(`${API}/history-topup?limit=20&page=${page}&q=${searchTerm}&type=${selectoptionsTypes}&status=${selectstatusValue}&startdate=${startdate}&enddate=${enddate}&userSearch=${userSearch}&staffSearch=${staffSearch}`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            }
        })
            .then(response => {
                console.log('response:', response.data.data)
                setHistoryTopup(response.data.data)
                setPagination(response.data.pagination)
                setApiresult(response.data)
            })
            .catch(error => {
            });
    }

    return (
        <div className="py-2">
            <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href="/" className="flex mr-auto">
                        <img alt="logo" className="w-6" src="/img/sk-logo.d7690f4b.png" />
                    </a>
                    <div className="min-w-max">
                        <div className="text-xs py-1 text-right flex items-center justify-end cursor-pointer mr-2">
                            <div className="inline-block relative cursor-pointer lg:mr-0">
                                <div className="flex pl-2.5 w-full">
                                    <img
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 mr-1"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQTc2OEEzMEQyNjExRTZCMUY3RUM5QkZGRjUxQTFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyQTc2OEE0MEQyNjExRTZCMUY3RUM5QkZGRjUxQTFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJBNzY4QTEwRDI2MTFFNkIxRjdFQzlCRkZGNTFBMUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJBNzY4QTIwRDI2MTFFNkIxRjdFQzlCRkZGNTFBMUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Id/R6AAAR3UlEQVR42uyd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"
                                        alt="th"
                                    />



                                </div>
                                <nav className="hidden absolute text-gray-700 pt-1 w-36 bg-white border border-gray-100 right-0 top-10 rounded nav-language__index">
                                    <div className="cursor-pointer flex items-center py-1 px-2">
                                        <img
                                            width={16}
                                            height={16}
                                            className="w-6 h-6 block"
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQTc2OEEzMEQyNjExRTZCMUY3RUM5QkZGRjUxQTFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyQTc2OEE0MEQyNjExRTZCMUY3RUM5QkZGRjUxQTFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJBNzY4QTEwRDI2MTFFNkIxRjdFQzlCRkZGNTFBMUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJBNzY4QTIwRDI2MTFFNkIxRjdFQzlCRkZGNTFBMUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Id/R6AAAR3UlEQVR42uyd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"
                                            alt=""
                                        />
                                        <div className="pl-2">Thai</div>
                                    </div>
                                    <div className="cursor-pointer flex items-center py-1 px-2 border-gray-100 border-t">
                                        <img
                                            width={16}
                                            height={16}
                                            className="w-6 h-6 block"
                                            src="/img/en.10017916.png"
                                            alt=""
                                        />
                                        <div className="pl-2">English</div>
                                    </div>
                                    <div className="cursor-pointer flex items-center py-1 px-2 border-gray-100 border-t">
                                        <img
                                            width={16}
                                            height={16}
                                            className="w-6 h-6 block"
                                            src="data:image/png;base64,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"
                                            alt=""
                                        />
                                        <div className="pl-2">Laos</div>
                                    </div>
                                    <div className="cursor-pointer flex items-center py-1 px-2 border-gray-100 border-t">
                                        <img
                                            width={16}
                                            height={16}
                                            className="w-6 h-6 block"
                                            src="/img/cn.b9e2cb2f.png"
                                            alt=""
                                        />
                                        <div className="pl-2">Chinese</div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
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
                        className="feather feather-bar-chart-2 w-8 h-8 text-white transform -rotate-90 w-8 h-8 text-white transform -rotate-90"
                    >
                        <line x1={18} y1={20} x2={18} y2={10} />
                        <line x1={12} y1={20} x2={12} y2={4} />
                        <line x1={6} y1={20} x2={6} y2={14} />
                    </svg>
                </div>
                <div className="scrollable">
                    <a href="javascript:;" className="mobile-menu-toggler">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            icon-name="x-circle"
                            data-lucide="x-circle"
                            className="lucide lucide-x-circle w-8 h-8 text-white transform -rotate-90"
                        >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={15} y1={9} x2={9} y2={15} />
                            <line x1={9} y1={9} x2={15} y2={15} />
                        </svg>
                    </a>


                </div>
            </div>
            <div className="flex mt-[4.7rem] md:mt-0">

                <div className="content">

                    {/* <form noValidate=""> */}
                    <div className="flex flex-wrap mb-3 box p-5 mt-5">
                        <div className="ml-3">
                            <div className="flex justify-between">
                                <label htmlFor="input-state-3" className="form-label">
                                    ช่วงเวลา
                                </label>

                            </div>
                            <div className="w-64">
                                <div className="dp__main dp__theme_light">
                                    <div aria-label="Datepicker input" role="textbox" aria-multiline="false" aria-disabled="false" aria-readonly="false">
                                        <div className="dp__input_wrap">
                                            <input
                                                name="date"
                                                className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                                                inputMode="none"
                                                placeholder=""
                                                autoComplete="off"
                                                value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
                                                onClick={openDatePicker}
                                            />
                                            <svg
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={32}
                                                height={32}
                                                viewBox="0 0 32 32"
                                                className="dp__icon dp__input_icon dp__input_icons"
                                            >
                                                <path d="M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" />
                                                <path d="M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
                                                <path d="M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" />
                                                <path d="M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isDatePickerOpen && (
                                <div className="absolute z-50 mt-2 bg-white p-4 shadow-lg border">
                                    <DateRangePicker
                                        onChange={handleDateChange}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        ranges={state}
                                        direction="horizontal"
                                    />
                                    <button onClick={handleOkClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                                        OK
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="ml-3">
                            <div className="flex justify-between">
                                <label htmlFor="input-state-3" className="form-label">
                                    ประเภทรายการ
                                </label>


                            </div>
                            <div className="w-64">
                                <div className="dp__main dp__theme_light">
                                    <div aria-label="Datepicker input" role="textbox" aria-multiline="false" aria-disabled="false" aria-readonly="false">
                                        <div className="dp__input_wrap">
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                defaultValue={optionsTypes[0]}
                                                onChange={(e) => setselectoptionsTypes(e.value)}
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={false}
                                                name="credit"
                                                options={optionsTypes}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-3">
                            <div className="flex justify-between">
                                <label htmlFor="input-state-3" className="form-label">
                                    สถานะรายการ
                                </label>
                            </div>
                            <div className="w-64">
                                <div className="dp__main dp__theme_light">
                                    <div aria-label="Datepicker input" role="textbox" aria-multiline="false" aria-disabled="false" aria-readonly="false">
                                        <div className="dp__input_wrap">
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                defaultValue={optionsStatusValue[0]}
                                                // value={selectAddUser}
                                                onChange={(e) => setselectstatusValue(e.value)}
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={false}
                                                name="credit"
                                                options={optionsStatusValue}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ml-3">
                                <div className="py-1 w-40">
                                    <div className="flex justify-between">
                                        <label htmlFor="input-state-3" className="form-label">
                                            ประเภทรายการ
                                        </label>
                                    </div>
                                    <div className="errorMessage">
                                        <select
                                            className="tom-select non-searchable"
                                            id=""
                                            name="topupTypeValue"
                                            field="[object Object]"
                                            hidden="true"
                                        >
                                            <option value="all">ทั้งหมด</option>
                                            <option value="deposit">ฝาก</option>
                                            <option value="withdraw">ถอน</option>
                                        </select>
                                        <select
                                            className="tom-select non-searchable tomselected"
                                            id="tomselect-2"
                                            name="topupTypeValue"
                                            field="[object Object]"
                                            tabIndex={-1}
                                            hidden="hidden"
                                        >
                                            <option value="all" selected="true">
                                                ทั้งหมด
                                            </option>
                                            <option value="deposit">ฝาก</option>
                                            <option value="withdraw">ถอน</option>
                                        </select>
                                        <div className="ts-control tom-select non-searchable single input-hidden">
                                            <div className="items ts-input full has-items">
                                                <div data-value="all" className="item">
                                                    ทั้งหมด
                                                </div>
                                                <input
                                                    type="select-one"
                                                    autoComplete="off"
                                                    size={1}
                                                    tabIndex={0}
                                                    role="combobox"
                                                    haspopup="listbox"
                                                    aria-expanded="false"
                                                    aria-controls="tomselect-2-ts-dropdown"
                                                    id="tomselect-2-tomselected"
                                                />
                                            </div>
                                            <div
                                                className="ts-dropdown single tom-select non-searchable"
                                                style={{ display: "none" }}
                                            >
                                                <div
                                                    role="listbox"
                                                    id="tomselect-2-ts-dropdown"
                                                    tabIndex={-1}
                                                    className="ts-dropdown-content"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5 relative"></div>
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="py-1 w-40">
                                    <div className="flex justify-between">
                                        <label htmlFor="input-state-3" className="form-label">
                                            สถานะรายการ
                                        </label>

                                    </div>
                                    <div className="errorMessage">
                                        <select
                                            className="tom-select non-searchable"
                                            id=""
                                            name="statusValue"
                                            field="[object Object]"
                                            hidden="true"
                                        >
                                            <option value="all">ทั้งหมด</option>
                                            <option value="done">สำเร็จ</option>
                                            <option value="pending">กำลังดำเนินการ</option>
                                            <option value="cancel">ยกเลิก</option>
                                        </select>
                                        <select
                                            className="tom-select non-searchable tomselected"
                                            id="tomselect-3"
                                            name="statusValue"
                                            field="[object Object]"
                                            tabIndex={-1}
                                            hidden="hidden"
                                        >
                                            <option value="all" selected="true">
                                                ทั้งหมด
                                            </option>
                                            <option value="done">สำเร็จ</option>
                                            <option value="pending">กำลังดำเนินการ</option>
                                            <option value="cancel">ยกเลิก</option>
                                        </select>
                                        <div className="ts-control tom-select non-searchable single input-hidden">
                                            <div className="items ts-input full has-items">
                                                <div data-value="all" className="item">
                                                    ทั้งหมด
                                                </div>
                                                <input
                                                    type="select-one"
                                                    autoComplete="off"
                                                    size={1}
                                                    tabIndex={0}
                                                    role="combobox"
                                                    haspopup="listbox"
                                                    aria-expanded="false"
                                                    aria-controls="tomselect-3-ts-dropdown"
                                                    id="tomselect-3-tomselected"
                                                />
                                            </div>
                                            <div
                                                className="ts-dropdown single tom-select non-searchable"
                                                style={{ display: "none" }}
                                            >
                                                <div
                                                    role="listbox"
                                                    id="tomselect-3-ts-dropdown"
                                                    tabIndex={-1}
                                                    className="ts-dropdown-content"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5 relative"></div>
                                </div>
                            </div> */}

                        <div className="ml-3">
                            <div className="flex justify-between">
                                <label htmlFor="input-state-3" className="form-label">
                                    ยูสเซอร์ / ชื่อ-เลขบัญชี ลูกค้า
                                </label>
                            </div>
                            <div className="w-80">
                                <div className="dp__main dp__theme_light">
                                    <div aria-label="Datepicker input" role="textbox">
                                        <div className="dp__input_wrap">
                                            <input
                                                className="rounded w-full px-4 form-control border-gray-300 block focus:outline-none"
                                                name="jobId"
                                                placeholder="ยูสเซอร์ / ชื่อ-เลขบัญชี ลูกค้า"
                                                type="text"
                                                autoComplete="off"
                                                data-mask="G*"
                                                // value={userSearch}
                                                onChange={(e) => setuserSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-3">
                            <div className="flex justify-between">
                                <label htmlFor="search-member" className="form-label">
                                    พนักงาน <span className="text-red-600 text-xs">(3 อักษรขึ้นไป)</span>
                                </label>
                            </div>
                            <div className="w-80">
                                <div className="dp__main dp__theme_light">
                                    <div aria-label="Datepicker input" role="textbox">
                                        <div className="dp__input_wrap">
                                            <input
                                                id="search-member"
                                                // tabIndex={-1}
                                                type="text"
                                                className="px-4 form-control rounded border-gray-300 block focus:outline-none mt-1"
                                                // autoComplete="off"
                                                placeholder="ค้นหาพนักงาน"
                                                // value={staffSearch}
                                                onChange={(e) => setstaffSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ml-3">
                                <div className="py-1 w-full">
                                    <div className="flex justify-between">
                                        <label
                                            htmlFor="input-state-3"
                                            className="form-label flex items-center"
                                        >

                                            <span className="!pl-1">ยูสเซอร์ / ชื่อ-เลขบัญชี ลูกค้า</span>

                                        </label>

                                    </div>
                                    <div className="input-group">

                                        <input
                                            className="z-0 !rounded w-80 px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded w-80"
                                            name="jobId"
                                            placeholder="ยูสเซอร์ / ชื่อ-เลขบัญชี ลูกค้า"
                                            type="text"
                                            maxLength=""
                                            autoComplete="off"
                                            data-mask="G*"
                                            data-mask-inited="true"
                                            data-mask-raw-value=""
                                        />

                                    </div>
                                    <div className="mb-5 relative">


                                    </div>
                                </div>
                            </div> */}
                        {/* <div className="ml-3">
                                <div>
                                    <div className="relative">
                                        <label htmlFor="search-member" className="form-label">
                                            พนักงาน{" "}
                                            <span className="text-red-600 text-xs">(3 อักษรขึ้นไป)</span>
                                        </label>
                                        <input
                                            id="search-member"
                                            tabIndex={-1}
                                            type="text"
                                            className="px-4 form-control rounded border-gray-300 block focus:outline-none z-0 mt-1 mb-6"
                                            autoComplete="off"
                                            placeholder="ค้นหาพนักงาน"
                                        />



                                    </div>
                                </div>
                            </div> */}
                        <div className="ml-3">
                            <button
                                type="submit"
                                className="btn btn-primary mt-8 w-full btn btn-md btn btn-primary mt-8 w-full"
                                onClick={() => getHistoryTopup(currentPage)}
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
                                    className="feather feather-search"
                                >
                                    <circle cx={11} cy={11} r={8} />
                                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                                </svg>
                                <span className="pl-1">ค้นหา</span>
                            </button>
                        </div>
                    </div>
                    {/* </form> */}
                    <div className="box p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                            <div className="border-green-600 border-l-4 flex flex-col pl-3">
                                <span>แจ้งฝากเงิน</span>
                                <div className="flex items-center h-10">
                                    <span className="text-2xl font-semibold">
                                        {apiresult.totalDepositAmount !== undefined
                                            ? Number(apiresult.totalDepositAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                            : "0.00"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    จำนวน: {apiresult.totalDepositCount !== undefined ? apiresult.totalDepositCount.toLocaleString() : "0"} รายการ
                                </div>
                            </div>

                            <div className="border-red-600 border-l-4 flex flex-col pl-3">
                                <span>แจ้งถอนเงิน</span>
                                <div className="flex items-center h-10">
                                    <span className="text-2xl font-semibold">
                                        {apiresult.totalWithdrawAmount !== undefined
                                            ? Number(apiresult.totalWithdrawAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                            : "0.00"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    จำนวน: {apiresult.totalWithdrawCount !== undefined ? apiresult.totalWithdrawCount.toLocaleString() : "0"} รายการ
                                </div>
                            </div>


                            {/* <div className="border-yellow-400 border-l-4 flex flex-col pl-3">
                                <span>โบนัส</span>
                                <div className="flex items-center h-10">
                                    <span className="text-2xl font-semibold">กำลังดำเนินการ</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mt-5">
                        <div className="col-span-12 sm:col-span-12">
                            <div className="box px-5 pb-5">
                                <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                                    <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
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
                                            className="feather feather-file-text w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1={16} y1={13} x2={8} y2={13} />
                                            <line x1={16} y1={17} x2={8} y2={17} />
                                            <polyline points="10 9 9 9 8 9" />
                                        </svg>
                                    </h2>
                                    <h2 className="uppercase">ประวัติ ฝาก-ถอนเงิน</h2>
                                    <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                                        <button className="btn btn-primary w-8 h-8 rounded ml-2" onClick={() => getHistoryTopup(currentPage)}>
                                            <div className="relative flex flex-col items-center group cursor-pointer block text-gray-800">
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
                                                    className="feather feather-refresh-cw text-white px-0.5 text-white px-0.5"
                                                >
                                                    <polyline points="23 4 23 10 17 10" />
                                                    <polyline points="1 20 1 14 7 14" />
                                                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                                </svg>
                                                <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                    <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                        รีเฟรช
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>


                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-12">
                                        <div className="intro-y box col-span-12 sm:col-span-12">
                                            <div className="overflow-x-auto">
                                                {/* <table className="text-xs w-full border">
                                                    <thead>
                                                        <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold">
                                                            <th className="py-1 px-2 whitespace-nowrap border text-center">
                                                                #
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-center">
                                                                ประเภท
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-right">
                                                                จำนวนเงิน
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-center">
                                                                ยูสเซอร์
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                ชื่อลูกค้า
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                บัญชีเว็บ
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                สถานะ
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                เวลาธนาคาร
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                เวลาระบบ
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                ทำรายการ
                                                            </th>
                                                            <th className="py-1 px-2 whitespace-nowrap border text-left">
                                                                หมายเหตุ
                                                            </th>
                                                        </tr>
                                                    </thead> */}
                                                {/* <tbody> */}

                                                <TransactionTable historyTopup={historyTopup} />
                                                {/* {historyTopup} */}
                                                {/* <tr className="px-2 hover:bg-yellow-100 px-half">
                                                            <td className="py-1 px-2 border text-center w-10">
                                                                8{" "}
                                                                <span className="text-mobile text-gray-500">
                                                                    #28474281
                                                                </span>
                                                            </td>
                                                            <td className="py-1 px-2 border-b text-center">
                                                                <div className="w-20">
                                                                    <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs">
                                                                        ถอน
                                                                    </span>

                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-right number-display">
                                                                2,000
                                                            </td>
                                                            <td className="py-1 px-2 border-b text-center">
                                                                <span className="flex items-center relative group">
                                                                    <a
                                                                        href="/member/edit/539179#general"
                                                                        className="text-blue-500 underline"
                                                                    >
                                                                        wgssk14e6d23b1
                                                                    </a>

                                                                </span>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display relative">
                                                                <div className="flex items-center justify-between w-60">
                                                                    <div>

                                                                        <div>
                                                                            <div className="flex items-center text-left pl-1 w-48 relative">
                                                                                <div
                                                                                    className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                                                    style={{
                                                                                        backgroundColor: "rgb(19, 143, 45)"
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        className="rounded w-7 h-7 object-contain"
                                                                                        src="/img/kbank.8be896ac.svg"
                                                                                        alt="kbank"
                                                                                    />
                                                                                </div>
                                                                                <div className="pl-2">
                                                                                    <div className="flex items-center">
                                                                                        1571759817
                                                                                    </div>
                                                                                    <div>นาย ธนดล ยอดชาญ</div>
                                                                                </div>
                                                                            </div>
                                                                            <span
                                                                                className="text-left flex items-center"
                                                                                style={{ display: "none" }}
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
                                                                                    className="feather feather-user h-6 w-6 mx-1.5 h-6 w-6 mx-1.5"
                                                                                >
                                                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                                    <circle cx={12} cy={7} r={4} />
                                                                                </svg>
                                                                                นาย ธนดล ยอดชาญ
                                                                            </span>
                                                                            <div
                                                                                className="flex items-center"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="p-2 bg-amber-100 rounded">
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
                                                                                        className="feather feather-credit-card"
                                                                                    >
                                                                                        <rect
                                                                                            x={1}
                                                                                            y={4}
                                                                                            width={22}
                                                                                            height={16}
                                                                                            rx={2}
                                                                                            ry={2}
                                                                                        />
                                                                                        <line x1={1} y1={10} x2={23} y2={10} />
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="ml-2 text-left inline custom__line-clamp-2 break-words w-56">
                                                                                    โอนเงิน K PLUS ธ.กสิกรไทย xxx-x-x5981-x
                                                                                    นาย ธนดล ยอดชาญ
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="">
                                                                        <div className="group rounded-full flex items-center justify-center">
                                                                            <div className="w-12 flex items-center justify-center">
                                                                                <img
                                                                                    src="data:image/png;base64,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"
                                                                                    alt="qr code"
                                                                                    className="w-9 h-9 object-center cursor-pointer"
                                                                                />
                                                                            </div>
                                                                            <div className="hidden group-hover:flex justify-center cursor-pointer absolute top-8 bg-gray-700 text-white rounded px-1 before:content-['⬥'] before:pt-2 before:text-gray-700 before:absolute w-[70px] before:bottom-2 before:left-1/2">
                                                                                ดูคิวอาร์โค้ด
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center">
                                                                <div className="flex items-center text-left pl-1 w-48 relative">
                                                                    <div
                                                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                                        style={{ backgroundColor: "rgb(19, 143, 45)" }}
                                                                    >
                                                                        <img
                                                                            className="rounded w-7 h-7 object-contain"
                                                                            src="/img/kbank.8be896ac.svg"
                                                                            alt="kbank"
                                                                        />
                                                                    </div>
                                                                    <div className="pl-2">
                                                                        <div className="flex items-center">
                                                                            1902414599{" "}
                                                                            <div className="group rounded-full w-4 h-4 hover:bg-gray-100 flex items-center justify-center mr-1 cursor-pointer">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                    aria-hidden="true"
                                                                                    role="img"
                                                                                    className="w-3.5 h-3.5 iconify iconify--material-symbols"
                                                                                    width="1em"
                                                                                    height="1em"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path
                                                                                        fill="currentColor"
                                                                                        d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                                                                                    />
                                                                                </svg>
                                                                                <div className="hidden group-hover:block absolute top-0 -right-1 bg-gray-700 text-white rounded px-1 before:content-['⬥'] before:text-gray-700 before:absolute before:-left-[0.3rem]">
                                                                                    รายละเอียด
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>นาย ประพันธุ์ มีเย็น</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center">
                                                                <div className="flex items-center">
                                                                    <span className="text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                                                                        สำเร็จ
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display">
                                                                <div className="w-24">
                                                                    <span className="block">
                                                                        05/09/24{" "}
                                                                        <span className="pl-1 items-center font-semibold">
                                                                            16:47
                                                                        </span>
                                                                    </span>
                                                                    <span className="block text-xs font-light">
                                                                        (1 ชั่วโมงที่แล้ว)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display">
                                                                <div className="w-24">
                                                                    <span className="block">
                                                                        05/09/24{" "}
                                                                        <span className="pl-1 items-center font-semibold">
                                                                            16:41
                                                                        </span>
                                                                    </span>
                                                                    <span className="block text-xs font-light">
                                                                        (1 ชั่วโมงที่แล้ว)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 text-center border">
                                                                <div className="min-w-max">
                                                                    <div className="flex items-center gap-1 ml-3 relative">
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
                                                                            className="feather feather-user w-4 h-4 inline w-4 h-4 inline"
                                                                        >
                                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                            <circle cx={12} cy={7} r={4} />
                                                                        </svg>
                                                                        <span className="bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5">
                                                                            aea
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="flex items-center gap-1 ml-3 relative"
                                                                        style={{ display: "none" }}
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            aria-hidden="true"
                                                                            role="img"
                                                                            width={20}
                                                                            height={20}
                                                                            viewBox="0 0 20 20"
                                                                            className="iconify iconify--fluent"
                                                                        >
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                                                            />
                                                                        </svg>
                                                                        <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]">
                                                                            {" "}
                                                                            Auto{" "}
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="flex items-center gap-1 ml-3 relative mt-1"
                                                                        style={{ display: "none" }}
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
                                                                            className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                                                                        >
                                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                            <circle cx="8.5" cy={7} r={4} />
                                                                            <polyline points="17 11 19 13 23 9" />
                                                                        </svg>
                                                                        <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                                                                            undefined (โอนมือ)
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 border-b">
                                                                <div className="w-60 flex flex-col">
                                                                    <span className="flex">
                                                                        <span className="hover:underline cursor-pointer hover:text-blue-500">
                                                                            ธนาคารเกิดข้อผิดพลาด
                                                                        </span>
                                                                        <div className="relative">
                                                                            <div className="relative flex flex-col items-center group cursor-pointer mr-1 block text-gray-800">
                                                                                <svg
                                                                                    className="w-4 h-4"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                                                        clipRule="evenodd"
                                                                                    />
                                                                                </svg>
                                                                                <div className="right-10 top-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                                                    <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                                                        BANK_INTERNAL_ERROR(info):
                                                                                        เกิดข้อผิดพลาด
                                                                                        ไม่สามารถเชื่อมต่อธนาคารได้
                                                                                        กรุณาตรวจสอบรายการฝากถอน
                                                                                        ก่อนทำรายการใหม่
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </span>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="px-2 hover:bg-yellow-100 px-half">
                                                            <td className="py-1 px-2 border text-center w-10">
                                                                9{" "}
                                                                <span className="text-mobile text-gray-500">
                                                                    #28474162
                                                                </span>
                                                            </td>
                                                            <td className="py-1 px-2 border-b text-center">
                                                                <div className="w-20">
                                                                    <span className="bg-green-600 text-white rounded-full px-2.5 py-1 text-xs">
                                                                        ฝาก
                                                                    </span>

                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-right number-display">
                                                                2,000
                                                            </td>
                                                            <td className="py-1 px-2 border-b text-center">
                                                                <span className="flex items-center relative group">
                                                                    <a
                                                                        href="/member/edit/539179#general"
                                                                        className="text-blue-500 underline"
                                                                    >
                                                                        wgssk14e6d23b1
                                                                    </a>

                                                                </span>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display relative">
                                                                <div className="flex items-center justify-between w-60">
                                                                    <div>

                                                                        <div>
                                                                            <div
                                                                                className="flex items-center text-left pl-1 w-48 relative"
                                                                                style={{ display: "none" }}
                                                                            >

                                                                                <div className="pl-2">
                                                                                    <div>-</div>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-left flex items-center">
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
                                                                                    className="feather feather-user h-6 w-6 mx-1.5 h-6 w-6 mx-1.5"
                                                                                >
                                                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                                    <circle cx={12} cy={7} r={4} />
                                                                                </svg>
                                                                                นาย ธนดล ยอดชาญ
                                                                            </span>
                                                                            <div
                                                                                className="flex items-center"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="p-2 bg-amber-100 rounded">
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
                                                                                        className="feather feather-credit-card"
                                                                                    >
                                                                                        <rect
                                                                                            x={1}
                                                                                            y={4}
                                                                                            width={22}
                                                                                            height={16}
                                                                                            rx={2}
                                                                                            ry={2}
                                                                                        />
                                                                                        <line x1={1} y1={10} x2={23} y2={10} />
                                                                                    </svg>
                                                                                </div>
                                                                                <span className="ml-2 text-left inline custom__line-clamp-2 break-words w-56">
                                                                                    -
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center">
                                                                <div className="flex items-center text-left pl-1 w-48 relative">
                                                                    <div
                                                                        className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                                        style={{
                                                                            backgroundColor: "rgb(255, 255, 255)"
                                                                        }}
                                                                    >
                                                                        <img
                                                                            className="rounded w-7 h-7 object-contain"
                                                                            src="/img/smk88pay.c63ba326.svg"
                                                                            alt="smk88pay"
                                                                        />
                                                                    </div>
                                                                    <div className="pl-2">
                                                                        <div className="flex items-center"> </div>
                                                                        <div>Payment Gateway</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center">
                                                                <div className="flex items-center">
                                                                    <span className="text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
                                                                        สำเร็จ
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display">
                                                                <div className="w-24">
                                                                    <span className="block">
                                                                        05/09/24{" "}
                                                                        <span className="pl-1 items-center font-semibold">
                                                                            16:38
                                                                        </span>
                                                                    </span>
                                                                    <span className="block text-xs font-light">
                                                                        (1 ชั่วโมงที่แล้ว)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-1 px-2 border text-center number-display">
                                                                <div className="w-24">
                                                                    <span className="block">
                                                                        05/09/24{" "}
                                                                        <span className="pl-1 items-center font-semibold">
                                                                            16:38
                                                                        </span>
                                                                    </span>
                                                                    <span className="block text-xs font-light">
                                                                        (1 ชั่วโมงที่แล้ว)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 text-center border">
                                                                <div className="min-w-max">
                                                                    <div className="flex items-center gap-1 ml-3 relative">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            aria-hidden="true"
                                                                            role="img"
                                                                            width={20}
                                                                            height={20}
                                                                            viewBox="0 0 20 20"
                                                                            className="iconify iconify--fluent"
                                                                        >
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                                                                            />
                                                                        </svg>
                                                                        <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]">
                                                                            {" "}
                                                                            Auto{" "}
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="flex items-center gap-1 ml-3 relative mt-1"
                                                                        style={{ display: "none" }}
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
                                                                            className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                                                                        >
                                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                            <circle cx="8.5" cy={7} r={4} />
                                                                            <polyline points="17 11 19 13 23 9" />
                                                                        </svg>
                                                                        <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                                                                            undefined (ฝากมือ)
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 border-b">
                                                                <div className="w-60 flex flex-col">


                                                                </div>
                                                            </td>
                                                        </tr> */}

                                                {/* <tr
                                                            className="px-2 bg-yellow-50 py-2 text-center"
                                                            style={{ display: "none" }}
                                                        >
                                                            <td colSpan={18}>ไม่มีข้อมูล</td>
                                                        </tr>
                                                        <tr className="px-2" style={{ display: "none" }}>
                                                            <td colSpan={18} className="text-center">
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
                                                                            <line
                                                                                x1="4.93"
                                                                                y1="4.93"
                                                                                x2="7.76"
                                                                                y2="7.76"
                                                                            />
                                                                            <line
                                                                                x1="16.24"
                                                                                y1="16.24"
                                                                                x2="19.07"
                                                                                y2="19.07"
                                                                            />
                                                                            <line x1={2} y1={12} x2={6} y2={12} />
                                                                            <line x1={18} y1={12} x2={22} y2={12} />
                                                                            <line
                                                                                x1="4.93"
                                                                                y1="19.07"
                                                                                x2="7.76"
                                                                                y2="16.24"
                                                                            />
                                                                            <line
                                                                                x1="16.24"
                                                                                y1="7.76"
                                                                                x2="19.07"
                                                                                y2="4.93"
                                                                            />
                                                                        </svg>
                                                                    </svg>
                                                                    กำลังโหลดข้อมูล . . .
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center pb-2 pt-4">
                                    <ul className="Pagination" data-v-2a30deb0="">
                                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(1)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="Control Control-active"
                                                data-v-2a30deb0=""
                                            >
                                                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z" />
                                            </svg>
                                        </li>
                                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(currentPage - 1)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="Control Control-active"
                                                data-v-2a30deb0=""
                                            >
                                                <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
                                            </svg>
                                        </li>
                                        {renderPageNumbers()}
                                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(currentPage + 1)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="Control Control-active"
                                                data-v-2a30deb0=""
                                            >
                                                <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                                            </svg>
                                        </li>
                                        <li className="PaginationControl" data-v-2a30deb0="" onClick={() => handlePageChange(pagination.totalPages)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="Control Control-active"
                                                data-v-2a30deb0=""
                                            >
                                                <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41M16 6h2v12h-2V6z" />
                                            </svg>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default MemberList;