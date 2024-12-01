
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
    
    
    
    
    
    
    
    <div className="overflow-auto">
      <table className="text-xs w-full">
        <thead>
          <tr className="bg-slate-700 dark:bg-dark-1 text-white px-half text-sm">
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div>#</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
              <div>ธนาคารลูกค้า</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
              <div>ธนาคารพาร์ทเนอร์</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
              <div>รายละเอียดบัญชี</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
              <div>ทำรายการโดย</div>
            </th>
            <th className="border border-b-2 py-1 px-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
              <div />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-yellow-50 py-2 text-center" style={{}}>
            <td colSpan={8}>ไม่มีข้อมูล</td>
          </tr>
          <tr style={{ display: "none" }}>
            <td colSpan={8} className="text-center">
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
