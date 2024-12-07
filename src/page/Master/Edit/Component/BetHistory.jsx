
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
    
    
    
    
    
    
    <div className="grid grid-cols-5 gap-3 items-center">
      <div className="py-1">
        <div className="flex justify-between">
          <label htmlFor="input-state-3" className="form-label">
            ประเภท
          </label>
          
        </div>
        <div className="errorMessage">
          <select
            className="tom-select non-searchable"
            id=""
            name="viewMethods"
            field="[object Object]"
            hidden="true"
          >
            <option disabled="" value="">
              เลือกประเภท
            </option>
            <option value={0}>เวลาคิดผล</option>
            <option value={1}>เวลาเดิมพัน</option>
          </select>
          <select
            className="tom-select non-searchable tomselected"
            id="tomselect-44"
            name="viewMethods"
            field="[object Object]"
            tabIndex={-1}
            hidden="hidden"
          >
            <option value={0} selected="true">
              เวลาคิดผล
            </option>
            <option disabled="" value="">
              เลือกประเภท
            </option>
            <option value={1}>เวลาเดิมพัน</option>
          </select>
          <div className="ts-control tom-select non-searchable single input-hidden">
            <div className="items ts-input full has-items">
              <div data-value={0} className="item">
                เวลาคิดผล
              </div>
              <input
                type="select-one"
                autoComplete="off"
                size={1}
                tabIndex={0}
                role="combobox"
                haspopup="listbox"
                aria-expanded="false"
                aria-controls="tomselect-44-ts-dropdown"
                id="tomselect-44-tomselected"
              />
            </div>
            <div
              className="ts-dropdown single tom-select non-searchable"
              style={{ display: "none" }}
            >
              <div
                role="listbox"
                id="tomselect-44-ts-dropdown"
                tabIndex={-1}
                className="ts-dropdown-content"
              />
            </div>
          </div>
        </div>
        <div className="relative"></div>
      </div>
      <div className="mt-1">
        <label htmlFor="filter-date-event" className="form-label mb-1">
          วันที่
        </label>
        <div>
          <div className="py-1 p-0" placeholder="วันที่">
            <div className="flex justify-between">
              
              
            </div>
            <div
              className="dp__main dp__theme_light text-xs"
              mode="date"
              is24hr=""
              type="datetime"
            >
              <div
                aria-label="Datepicker input"
                role="textbox"
                aria-multiline="false"
                aria-disabled="false"
                aria-readonly="false"
              >
                
                <div className="dp__input_wrap">
                  <div className="input-group">
                    
                    <input
                      className="z-0 text-sm px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 text-sm"
                      name="date"
                      type="text"
                      autoComplete="off"
                    />
                    
                  </div>
                  
                  
                  
                  
                  
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="w-44">
        <label htmlFor="filter-date-event" className="form-label mb-1">
          เวลา
        </label>
        <div>
          <div className="dp__main dp__theme_light p-0">
            <div
              aria-label="Datepicker input"
              role="textbox"
              aria-multiline="false"
              aria-disabled="false"
              aria-readonly="false"
            >
              
              <div className="dp__input_wrap">
                
                <input
                  name="time"
                  className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                  inputMode="none"
                  placeholder=""
                  autoComplete="off"
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
                
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  className="dp__icon dp__clear_icon dp__input_icons"
                >
                  <path d="M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z" />
                  <path d="M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" />
                </svg>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 my-4 gap-3">
      <div className="border-l-4 flex flex-col pl-3 shadow-sm">
        <span>จำนวนเงิน</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
          <span className="text-xs ml-2 mt-2 text-gray-500">THB</span>
        </div>
      </div>
      <div className="border-l-4 flex flex-col pl-3 shadow-sm">
        <span>ได้เสีย</span>
        <div className="flex items-center h-10">
          <span className="text-2xl font-semibold">0</span>
          <span className="text-xs ml-2 mt-2 text-gray-500">THB</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-12">
      <div className="intro-y col-span-12 sm:col-span-12">
        <div className="overflow-x-auto">
          <table className="text-xs text-left w-full" limit={40}>
            <thead>
              <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display">
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  {" "}
                  #{" "}
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  ไอดีเดิมพัน
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  วันที่
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  เกม
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  รายละเอียด
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  จำนวนเงิน
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  ได้เสีย
                </th>
                <th className="py-1 px-2 border border-b-2 dark:border-dark-5 whitespace-nowrap text-center">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="px-2 bg-yellow-50 py-2 text-center">
                <td colSpan={8}>ไม่มีข้อมูล</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    
    
    
  </div>
</div>


            
        </form>

    )
}

export default MemberList
