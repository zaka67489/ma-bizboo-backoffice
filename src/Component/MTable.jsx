import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { getCurrentTimeInUTC7, formatTimeDifference } from "@/Model/Function";
import { bankLabelImage, bankColor, bankLabel } from "@/Model/Bank";
import { Api } from "@/util/api";
import {DateTh} from "@/util/util";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MTable = forwardRef((props, ref) => {
  return (
    <div className="grid grid-cols-12">
      <div className="intro-y box col-span-12 sm:col-span-12">
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark-1 px-half font-display">
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  #
                </th>
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  เวลารายการ
                </th>
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  ประเภท
                </th>
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  จำนวนเงิน
                </th>
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  อธิบาย
                </th>
                <th className="px-1 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center text-sm font-semibold">
                  ยอดที่ใช้งานแล้ว
                </th>
              </tr>
            </thead>
            <tbody>
              {props.transaction?.length !== 0 &&
                props.transaction?.map((data, index) => {
                  return (
                    <tr className={`hover:bg-yellow-100 px-half ${data.userId !== null ? '!bg-green-50' : ''}`} key={`tabletransactions_${index}`}>
                      <td className="py-1 border text-center w-10">{index+1}</td>
                      <td className="py-1 border w-32 text-left">
                        <div>{DateTh(data.transactionTime,0)}</div>
                      </td>
                      <td className="py-1 border w-16">
                        <div className="flex justify-center">
                          <span className={` ${data.transactionType === "Deposit" ? "bg-green-600" : " bg-red-600"}  text-white rounded-full px-2.5 py-1 text-xs`}>
                            {data.transactionType === "Deposit" ? "ฝาก" : "ถอน"}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-right w-32">
                      {data.transactionType === "Deposit" ? <span className="text-green-600">{data.transactionType === "Deposit" ? "+" : "-"} {data.amount}</span> : <span className="text-red-600">{data.transactionType === "Deposit" ? "+" : "-"} {data.amount}</span>}
                        
                      </td>
                      <td className="px-2 py-1 border">
                        <div className="w-80 lg:w-auto">
                          {data.detail}
                        </div>
                      </td>
                      <td className="px-2 py-1 border">
                        <div className="flex justify-center">
                          {data.userId !== null ? 
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
                            className="feather feather-check text-green-600 text-green-600"
                            name="check-line"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg> : <span>-</span>}

                        </div>
                      </td>
                    </tr>
                  );
                })}
              {/* <tr className="hover:bg-yellow-100 px-half !bg-green-50">
                <td className="py-1 border text-center w-10">2</td>
                <td className="py-1 border w-32 text-center">
                  <div>09/06/24 00:41:28</div>
                </td>
                <td className="py-1 border w-16">
                  <div className="flex justify-center">
                    <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs">
                      ถอน
                    </span>
                  </div>
                </td>
                <td className="px-2 py-1 border text-right w-32">
                  <span className="text-red-600">- 400</span>
                </td>
                <td className="px-2 py-1 border">
                  <div className="w-80 lg:w-auto">
                    โอนเงิน K PLUS ธ.กรุงไทย xxx-x-x0828-x น.ส.ชุติกาญจน์ สัสนาม
                  </div>
                </td>
                <td className="px-2 py-1 border">
                  <div className="flex justify-center">
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
                      className="feather feather-check text-green-600 text-green-600"
                      name="check-line"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </td>
              </tr> */}
              <tr
                className="bg-yellow-50 py-2 text-center"
                style={{ display: props.transaction.length !== 0 ? "none" : "" }}
              >
                <td colSpan={7}>ไม่มีข้อมูล</td>
              </tr>
              <tr style={{ display: "none"}}>
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
            </tbody>
          </table>
          <div className="flex justify-center pb-2 pt-4">
            <ul className="Pagination" data-v-2a30deb0="">
              <li className="PaginationControl" data-v-2a30deb0="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="Control"
                  data-v-2a30deb0=""
                >
                  <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z" />
                </svg>
              </li>
              <li className="PaginationControl" data-v-2a30deb0="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="Control"
                  data-v-2a30deb0=""
                >
                  <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
                </svg>
              </li>
              <li data-v-060ca318="" data-v-2a30deb0="">
                <button
                  className="Page Page-active"
                  type="button"
                  aria-label="Go to page 1"
                  data-v-060ca318=""
                  style={{ backgroundColor: "rgb(220, 237, 255)" }}
                >
                  1
                </button>
              </li>
              <li className="PaginationControl" data-v-2a30deb0="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="Control Control-active"
                  data-v-2a30deb0=""
                >
                  <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                </svg>
              </li>
              <li className="PaginationControl" data-v-2a30deb0="">
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
        <div className="text-gray-600 text-xs px-6 pb-6 text-center">
          รายการจะอัพเดตขณะออโต้ทำงานอยู่
        </div>
      </div>
    </div>
  );
});

export default MTable;
