
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function MemberList() {
    return (
        <form noValidate="">

<div className="post__content tab-content">
  <div
    id="content"
    className="tab-pane p-5 active"
    role="tabpanel"
    aria-labelledby="content-tab"
  >
    
    
    
    
    
    
    
    
    <div className="p-3 bg-gray-50 rounded mb-4">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label font-semibold flex items-center">
          ค้นหาตามช่วงเวลา
        </label>
      </div>
      
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-4 gap-3">
      <div className="border-l-4 flex flex-col pl-3 border-blue-500">
        <span>สมัครสมาชิกใหม่</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">1</span>
        </div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 border-green-600">
        <span>ฝาก</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">240</span>
        </div>
        <div className="text-sm text-gray-600">จำนวน: 1 คน</div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 border-red-500">
        <span>ถอน</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">500</span>
        </div>
        <div className="text-sm text-gray-600">จำนวน: 1 คน</div>
      </div>
    </div>
    <div className="overflow-auto">
      <table className="text-xs w-full">
        <thead>
          <tr className="bg-slate-700 dark:bg-dark-1 text-white px-half text-sm">
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>#</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>ใช้งาน</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>ยูสเซอร์เนม</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>เบอร์โทร</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
              <div>ชื่อ-สกุล</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>วันที่สมัคร</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-right">
              <div>ฝาก</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-right">
              <div>ถอน</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-right">
              <div>คงเหลือ</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-yellow-100 px-half">
            <td className="border text-center px-1 py-1 w-16">
              1 <span className="text-mobile text-gray-500">#471235</span>
            </td>
            <td className="border text-center px-1 py-1">
              <div className="flex justify-center">
                <div className="border rounded-full h-[18px] w-[28px] flex items-center px-0.5 duration-500 shadow-inner cursor-not-allowed justify-end bg-green-700">
                  <div className="rounded-full bg-white w-[12px] h-[12px]" />
                </div>
              </div>
            </td>
            <td className="border text-center px-1 py-1">
              <div className="min-w-max">wgssk199XBET967356843</div>
            </td>
            <td className="border text-center px-1 py-1">096-735-6843</td>
            <td className="border text-left px-1 py-1">
              <div className="min-w-max">นางสาว วิลาวัณย์ เมณฑ์กูล</div>
            </td>
            <td className="border text-center px-1 py-1">14/07/23 09:48</td>
            <td className="border text-right px-1 py-1">240</td>
            <td className="border text-right px-1 py-1 text-red-600">-500</td>
            <td className="border text-right px-1 py-1 text-red-600">-260</td>
          </tr>
          <tr
            className="bg-yellow-50 py-2 text-center"
            style={{ display: "none" }}
          >
            <td colSpan={9}>ไม่มีข้อมูล</td>
          </tr>
          <tr style={{ display: "none" }}>
            <td colSpan={9} className="text-center">
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
                กำลังโหลดข้อมูล . . .{" "}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
    
    
  </div>
</div>

            
        </form>

    )
}

export default MemberList
