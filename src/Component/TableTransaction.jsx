import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment, useRef, useCallback, forwardRef } from "react";

import { getCurrentTimeInUTC7, formatTimeDifference } from '../Model/Function';
import { bankLabelImage, bankColor, bankLabel } from '../Model/Bank';
import { formatCurrency } from "@/util/format";


const TableTransaction = forwardRef((props, ref) => {
    console.log('TableTransaction props:', props)
    console.log('TableTransaction props:', props.transaction.length)

    return (
        <div className="grid grid-cols-12">
            <div className="intro-y box col-span-12 sm:col-span-12">
                <div className="overflow-x-auto">
                    <table className="text-xs w-full">
                        <thead>
                            <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm">
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border">
                                    #
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium">
                                    ช่องทาง
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-center">
                                    ประเภท
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-right">
                                    จำนวนเงิน
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-center">
                                    เวลารายการ
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium">
                                    ยุสเซอร์
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-left">
                                    ชื่อลูกค้า
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-left">
                                    บัญชีเว็บ
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-center">
                                    สถานะ
                                </th>
                                <th className="py-1 px-2 whitespace-nowrap border text-left">
                                    ทำรายการ
                                </th>
                                <th className="px-2 py-1 dark:border-dark-5 whitespace-nowrap border font-medium text-left">
                                    หมายเหตุ
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.transaction.length !== 0 &&
                                props.transaction.map((data, index) => {
                                    console.log(data)
                                    // if (data.remarkLc !== 'bot-withdraw with api gg system')
                                    return (<tr className={`bg-${data.type == "deposit" ? 'green' : 'red'}-50 hover:bg-yellow-100 px-half border-gray-300`}>
                                        <td className="px-2 py-1 border text-center w-10">
                                            {index + 1} <span className="text-mobile text-gray-500">#{data.logid}</span>
                                        </td>
                                        <td className="px-2 py-1 border text-center">
                                            <div className="w-28">
                                                <div className="flex items-center gap-1 ml-3 relative cursor-pointer">
                                                    <div className="w-4 h-4">
                                                        <img
                                                            src="data:image/png;base64,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"
                                                            alt={data.typecheck == "freecredit" ? "Free Credit" : data.typecheck == "auto" ? "Auto" : data.typecheck == "gateway" ? "PG" : "Staff"}
                                                        />
                                                    </div>
                                                    <span className="flex items-center bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5">
                                                        {data.typecheck == "freecredit" ? "Free Credit" : data.typecheck == "auto" ? "Auto" : data.typecheck == "gateway" ? "PG" : "Staff"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-1 border text-center w-20">
                                            <div className="w-20">
                                                <span className={`bg-${data.type == "deposit" ? 'green' : 'red'}-600 text-white rounded-full px-2.5 py-1 text-xs`}>
                                                    {data.type == "deposit" ? (data.typecheck == 'freecredit' ? 'เครดิตฟรี' : 'ฝาก') : 'ถอน'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-1 border text-right number-display">
                                            {formatCurrency(data.amountLc)}
                                        </td>
                                        <td className="px-2 py-1 border text-center number-display">
                                            <div className="w-24">
                                                <span className="block">
                                                    {/* 19/07/23{" "}
                                                    <span className="pl-1 items-center font-semibold">
                                                        17:08
                                                    </span> */}
{/* 63632 */}
                                                    {getCurrentTimeInUTC7(data.depositWithdrawTime,7)}
                                                </span>
                                                <span className="block text-xs font-light">
                                                    {formatTimeDifference(new Date(data.depositWithdrawTime),7)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-2 border">
                                            <span>{data.user}</span>
                                        </td>
                                        <td className="px-2 py-1 border text-center border-b relative">
                                            <div className="flex items-center justify-between w-60">
                                                {data?.bankName !== null ? <div>
                                                    <div className="flex items-center text-left pl-1 w-48 relative">
                                                        <div
                                                            className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                            style={data?.bankName !== null ? { backgroundColor: `${bankColor[data?.bankName.toUpperCase()]}` } : null}
                                                        >
                                                            <img
                                                                className="rounded w-7 h-7 object-contain"
                                                                src={data?.bankName !== null ? bankLabelImage[data?.bankName.toUpperCase()] : null}
                                                                alt={data?.bankName !== null ? bankLabelImage[data?.bankName.toUpperCase()] : null}
                                                            />
                                                        </div>
                                                        <div className="pl-2">
                                                            <div className="flex items-center">
                                                                {data.accountNumber}
                                                            </div>
                                                            <div>{data.accountName}</div>
                                                        </div>
                                                    </div>
                                                </div> : ""}
                                            </div>
                                        </td>
                                        <td className="px-2 py-1 border text-center">
                                            {data.bankserviceBankName !== null ? data.typecheck !== "gateway" ? <div className="flex items-center text-left pl-1 w-48 relative">
                                                <div
                                                    className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                    style={data?.bankserviceBankName !== null ? { backgroundColor: `${bankColor[data?.bankserviceBankName.toUpperCase()]}` } : null}
                                                >
                                                    <img
                                                        className="rounded w-7 h-7 object-contain"
                                                        src={data?.bankserviceBankName !== null ? bankLabelImage[data?.bankserviceBankName.toUpperCase()] : null}
                                                        alt={data?.bankserviceBankName !== null ? bankLabelImage[data?.bankserviceBankName.toUpperCase()] : null}
                                                    />
                                                </div>
                                                <div className="pl-2">
                                                    <div className="flex items-center">
                                                        {data.bankserviceaccountNo}
                                                    </div>
                                                    <div>{data.bankserviceaccountName}</div>
                                                </div>
                                            </div> : <div className="flex items-center text-left pl-1 w-48 relative">
                                                <div
                                                    className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                                                >
                                                    <img
                                                        className="w-8 h-8 object-contain"
                                                        src="/img/smk88pay.197c334b.svg"
                                                        alt="smk88pay"
                                                    />
                                                </div>
                                                <div className="pl-2">
                                                    Payment Gateway
                                                </div>
                                            </div> : ""}

                                        </td>
                                        <td className="px-2 py-1 border border-b">
                                            <div className="flex items-center">
                                                {/* className={data.statusLc === 3 ? "text-danger bg-red-100 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center" : "text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center"} */}
                                                <span className={`${data.statusLc === 3 ? "text-danger bg-red-100" : "text-green-800 bg-lime-300"} px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center`}>
                                                    {data.statusLc === 3 ? "ยกเลิก" : "สำเร็จ"}
                                                </span>
                                            </div>
                                        </td>
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
                                                    <span className={`bg-${data.staffName === null ? "blue-500" : "gray-700"} text-white px-1.5 py-0.5 text-xs rounded-md before:text-blue-500 before:absolute before:left-[18px]`}>
                                                        {data.staffName === null ? "Auto" : data.staffName}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center gap-1 ml-3 relative mt-1"
                                                    style={{ display: (data.statusLc === 5 || data.statusLc === 6 || data.statusLc === 11) ? "" : "none" }}>
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

                                                        {data.staffName}  ({data.statusLc === 5 ? "ฝากมือ" : data.statusLc === 11 ? "ทิ้ง" : "โอนมือ"})
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 ml-3 relative mt-1" style={{ display: data.statusLc === 11 ? "" : "none" }}>

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
                                        <td className="px-2 py-1 border border-b">
                                            <div className="w-60 flex flex-col">

                                                หมายเหตุ : {data.remarkLc}
                                            </div>
                                        </td>
                                    </tr>)
                                })
                            }
                            <tr
                                className="bg-yellow-50 py-2 text-center"
                                style={{ display: props.transaction.length !== 0 ? "none" : "" }}
                            >
                                <td colSpan={18} className="py-1">
                                    ไม่มีข้อมูล
                                </td>
                            </tr>
                            {/* <tr style={{ display: props.transaction.length === 0 ? "none" : "" }}>
                                <td colSpan={18} className="text-center py-1">
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
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
)

export default TableTransaction;