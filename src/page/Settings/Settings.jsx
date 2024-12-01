
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { ApiCall } from "@/util/api";
function SettingPages() {


    const navigate = useNavigate();

    const [isLoading, setIsloading] = useState(true)
    const [accessToken, setaccessToken] = useState("")
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        if (loggedInUser) {
            setaccessToken(JSON.parse(loggedInUser).accessToken)
            setIsloading(false)
        } else {
            navigate("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        UseDepositWithdraw: false,
        brand: '',
        linkEmployee: '',
        userPerBankaccount: 0,
        minDeposit: 0,
        maxDeposit: 0,
        isDepositWithout: false,
        maxWithdrawAuto: 0,
        withdrawCash: 0,
        minWithdraw: 0,
        maxWithdraw: 0,
        turnoverVal: 0,
        limitWithdraw: 0,
        twoFactor: false,
        registerTruemoney: false
    });


    const fetchDataSetting = async () => {
        let res = await ApiCall("GET", "/systemgeneral", {});
        // setbankservice(res.data);
        setFormData(res.data)
        console.log("systemgeneral: ", res.data);
    };


    useEffect(() => {
        if (loggedInUser && !isLoading) {
            // //console.log("loggedInUser:", accessToken)
            fetchDataSetting();
        }
    }, [isLoading]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await ApiCall("PUT", "/systemgeneral", formData);
            if (res.status === "success") {
                Swal.fire('สำเร็จ', 'บันทึกข้อมูลสำเร็จ', 'success');
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
            }
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
        }
    };

    // return (
    //     <div className="py-2">
    //         <div className="flex mt-[4.7rem] md:mt-0" >
    //             <div className="content">

    //                 <div className="col-span-12 mt-5">
    //                     <div className="post overflow-hidden- box h-auto rounded-t-lg">
    //                         <div className="grid lg:flex lg:flex-wrap grid-cols-12 nav nav-tabs flex-col sm:flex-row bg-primary dark:bg-dark-2 text-white rounded-t-lg">
    //                             <div className="col-span-6 sm:col-span-4">
    //                                 <div
    //                                     type="button"
    //                                     className="bg-white text-gray-800 w-full lg:w-auto px-3 sm:px-5 py-4 text-center flex justify-center items-center rounded-tl-lg cursor-pointer"
    //                                 >
    //                                     <svg
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         width="16px"
    //                                         height="16px"
    //                                         viewBox="0 0 24 24"
    //                                         fill="none"
    //                                         stroke="currentColor"
    //                                         strokeWidth={2}
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         className="feather feather-settings w-4 h-4 mr-2 w-4 h-4 mr-2"
    //                                     >
    //                                         <circle cx={12} cy={12} r={3} />
    //                                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    //                                     </svg>{" "}
    //                                     ทั่วไป
    //                                 </div>
    //                             </div>
    //                             <div className="col-span-6 sm:col-span-4">
    //                                 <div className="w-full lg:w-auto px-3 sm:px-5 py-4 text-center flex justify-center items-center cursor-pointer">
    //                                     <svg
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         width="16px"
    //                                         height="16px"
    //                                         viewBox="0 0 24 24"
    //                                         fill="none"
    //                                         stroke="currentColor"
    //                                         strokeWidth={2}
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         className="feather feather-layers w-4 h-4 mr-2 w-4 h-4 mr-2"
    //                                     >
    //                                         <polygon points="12 2 2 7 12 12 22 7 12 2" />
    //                                         <polyline points="2 17 12 22 22 17" />
    //                                         <polyline points="2 12 12 17 22 12" />
    //                                     </svg>
    //                                     แนะนำเพื่อน
    //                                 </div>
    //                             </div>
    //                             <div className="col-span-6 sm:col-span-4">
    //                                 <div className="w-full lg:w-auto px-3 sm:px-5 py-4 text-center flex justify-center items-center cursor-pointer">
    //                                     <svg
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         width="16px"
    //                                         height="16px"
    //                                         viewBox="0 0 24 24"
    //                                         fill="none"
    //                                         stroke="currentColor"
    //                                         strokeWidth={2}
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         className="feather feather-repeat w-4 h-4 mr-2 w-4 h-4 mr-2"
    //                                     >
    //                                         <polyline points="17 1 21 5 17 9" />
    //                                         <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    //                                         <polyline points="7 23 3 19 7 15" />
    //                                         <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    //                                     </svg>{" "}
    //                                     คืนยอดเสีย
    //                                 </div>
    //                             </div>

    //                             <div className="col-span-6 sm:col-span-4">
    //                                 <div className="w-full lg:w-auto px-3 sm:px-5 py-4 text-center flex justify-center items-center cursor-pointer">
    //                                     <svg
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         xmlnsXlink="http://www.w3.org/1999/xlink"
    //                                         aria-hidden="true"
    //                                         role="img"
    //                                         className="mr-2 iconify iconify--fluent"
    //                                         width={20}
    //                                         height={20}
    //                                         viewBox="0 0 16 16"
    //                                     >
    //                                         <path
    //                                             fill="currentColor"
    //                                             d="M10 7a2 2 0 1 1-4 0a2 2 0 0 1 4 0M1 4.75C1 3.784 1.784 3 2.75 3h10.5c.966 0 1.75.784 1.75 1.75v.435a2.3 2.3 0 0 0-1-.183V4.75a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75H5v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 .958.714a2.07 2.07 0 0 0-1.841.66l-.545.608c-.27.301-.443.653-.522 1.018h-5.3A1.75 1.75 0 0 1 1 11.25zm11.584 2.831l.283-.75c.258-.68 1.062-1.016 1.74-.727l.388.166c.473.202.865.568.947 1.06c.457 2.725-1.908 6.601-4.63 7.59c-.492.178-1.023.04-1.445-.246l-.346-.235a1.184 1.184 0 0 1-.204-1.79l.545-.607a1.07 1.07 0 0 1 1.034-.323l1.225.29q1.457-.91 1.562-2.56l-.878-.86a.94.94 0 0 1-.221-1.008"
    //                                         />
    //                                     </svg>{" "}
    //                                     ช่องทางการติดต่อ
    //                                 </div>
    //                             </div>

    //                             <div className="col-span-6 sm:col-span-4">
    //                                 <div
    //                                     className="w-full lg:w-auto px-3 sm:px-5 py-4 text-center flex justify-center items-center cursor-pointer"
    //                                     to="/setting/marketing"
    //                                 >
    //                                     <svg
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         width="16px"
    //                                         height="16px"
    //                                         viewBox="0 0 24 24"
    //                                         fill="none"
    //                                         stroke="currentColor"
    //                                         strokeWidth={2}
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         className="feather feather-share-2 w-4 h-4 mr-2 w-4 h-4 mr-2"
    //                                     >
    //                                         <circle cx={18} cy={5} r={3} />
    //                                         <circle cx={6} cy={12} r={3} />
    //                                         <circle cx={18} cy={19} r={3} />
    //                                         <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    //                                         <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    //                                     </svg>{" "}
    //                                     ช่องทางการตลาด
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="post__content tab-content">
    //                             <div
    //                                 id="content"
    //                                 className="tab-pane p-5 active"
    //                                 role="tabpanel"
    //                                 aria-labelledby="content-tab"
    //                             >
    //                                 <div className="grid grid-cols-12 xl:gap-6">
    //                                     <div className="intro-y col-span-12">
    //                                         <div className="flex flex-col sm:flex-row items-center pb-3 border-b-2 border-blue-800">
    //                                             <h1 className="font-bold text-neutral-600 uppercase text-lg font-display mr-auto flex items-center">
    //                                                 <svg
    //                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                     width="16px"
    //                                                     height="16px"
    //                                                     viewBox="0 0 24 24"
    //                                                     fill="none"
    //                                                     stroke="currentColor"
    //                                                     strokeWidth={2}
    //                                                     strokeLinecap="round"
    //                                                     strokeLinejoin="round"
    //                                                     className="feather feather-settings w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
    //                                                 >
    //                                                     <circle cx={12} cy={12} r={3} />
    //                                                     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    //                                                 </svg>{" "}
    //                                                 ตั้งค่าระบบ
    //                                             </h1>
    //                                         </div>

    //                                         <div className="mt-5 py-4 px-5 shadow rounded-r-lg bg-blue-50 border-l-8 border-blue-500 text-base">
    //                                             <div className="font-semibold mb-1.5 text-lg">Login URL</div>
    //                                             <ul className="list-inside list-disc">
    //                                                 <li>
    //                                                     ลิงค์หน้าบ้าน:{" "}
    //                                                     <a
    //                                                         href={formData.linkEmployee}
    //                                                         target="_blank"
    //                                                         rel="noopener noreferrer"
    //                                                         className="underline hover:text-blue-500 font-semibold"
    //                                                     >
    //                                                         {formData.linkEmployee}
    //                                                     </a>
    //                                                 </li>
    //                                             </ul>
    //                                         </div>
    //                                         <div className="intro-y">
    //                                             <form onSubmit={handleSubmit} noValidate="">
    //                                                 <div className="grid grid-cols-12">
    //                                                     <div className="col-span-12 flex items-center">
    //                                                         <div className="form-check form-switch my-5">
    //                                                             <input
    //                                                                 id="force-withdraw-all"
    //                                                                 className="form-check-input"
    //                                                                 type="checkbox"
    //                                                                 name="UseDepositWithdraw"
    //                                                                 checked={formData.UseDepositWithdraw}
    //                                                                 onChange={handleChange}
    //                                                             />
    //                                                             <div className="ml-2">
    //                                                                 <label
    //                                                                     htmlFor="force-withdraw-all"
    //                                                                     className="form-check-label ml-0"
    //                                                                 >
    //                                                                     ใช้งานหน้าฝาก-ถอน
    //                                                                 </label>
    //                                                                 <span className="block text-xs text-gray-400">
    //                                                                     เปิดใช้งานหน้าฝาก-ถอน
    //                                                                 </span>
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="col-span-12 sm:col-span-6 sm:pr-6 3xl:pr-4">
    //                                                         <div className="py-1 w-full">
    //                                                             <div className="flex justify-between">
    //                                                                 <label
    //                                                                     htmlFor="input-state-3"
    //                                                                     className="form-label flex items-center"
    //                                                                 >
    //                                                                     <span className="!pl-1">แบรนด์</span>

    //                                                                 </label>
    //                                                             </div>
    //                                                             <div className="input-group">

    //                                                                 <input
    //                                                                     className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
    //                                                                     placeholder="แบรนด์"
    //                                                                     type="text"
    //                                                                     maxLength=""
    //                                                                     autoComplete="off"
    //                                                                     data-mask="G*"
    //                                                                     data-mask-inited="true"
    //                                                                     data-mask-raw-value=""

    //                                                                     name="brand"
    //                                                                     value={formData.brand}
    //                                                                     onChange={handleChange}
    //                                                                 />

    //                                                             </div>
    //                                                             <div className="mb-5 relative">


    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="col-span-12 sm:col-span-6 sm:pr-6 3xl:pr-4">
    //                                                         <div className="py-1">
    //                                                             <div className="flex justify-between">
    //                                                                 <label className="form-label flex items-center">
    //                                                                     <span>
    //                                                                         <i className="text-danger">* </i>{" "}
    //                                                                         จำนวนยูสเซอร์ต่อชื่อบัญชีธนาคาร
    //                                                                     </span>

    //                                                                 </label>

    //                                                             </div>
    //                                                             <div className="input-group">

    //                                                                 <input
    //                                                                     type="number"
    //                                                                     autoComplete="off"
    //                                                                     className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                     inputMode="decimal"

    //                                                                     name="userPerBankaccount"
    //                                                                     value={formData.userPerBankaccount}
    //                                                                     onChange={handleChange}
    //                                                                 />
    //                                                                 <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                     ยูสเซอร์เนม
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="mb-5 relative"></div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="border-b mt-2 mb-6" />
    //                                                 <div className="grid grid-cols-1 lg:grid-cols-2">
    //                                                     <div className="lg:pr-6 3xl:pr-4">
    //                                                         <div className="border-b-2 border-green-600 mb-3">
    //                                                             <h2 className="text-lg font-display mr-auto text-green-600">
    //                                                                 ตั้งค่าการอนุมัติการฝากอัตโนมัติ
    //                                                             </h2>
    //                                                         </div>
    //                                                         <div className="grid grid-cols-12 grid-rows-2">
    //                                                             <div className="col-span-12 sm:col-span-6 lg:col-span-12 2xl:col-span-6 sm:mr-4 lg:mr-0 2xl:mr-4">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำนวนฝากเงินขั้นต่ำ
    //                                                                             </span>

    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"

    //                                                                             type="number"
    //                                                                             name="minDeposit"
    //                                                                             value={formData.minDeposit}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="col-span-12 sm:col-span-6 lg:col-span-12 2xl:col-span-6">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำนวนฝากเงินสูงสุด
    //                                                                             </span>

    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"

    //                                                                             type="number"
    //                                                                             name="maxDeposit"
    //                                                                             value={formData.maxDeposit}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="col-span-12 flex items-center">
    //                                                                 <div className="form-check form-switch">
    //                                                                     <input
    //                                                                         id="is-forced-match"
    //                                                                         className="form-check-input"
    //                                                                         type="checkbox"

    //                                                                         name="isDepositWithout"
    //                                                                         checked={formData.isDepositWithout}
    //                                                                         onChange={handleChange}

    //                                                                     />
    //                                                                     <div className="ml-2">
    //                                                                         <label
    //                                                                             className="form-check-label flex items-center ml-0"
    //                                                                             htmlFor="is-forced-match"
    //                                                                         >
    //                                                                             {" "}
    //                                                                             โอนเงินโดยไม่ต้องเข้าหน้าฝาก{" "}
    //                                                                         </label>
    //                                                                         <span className="block text-xs text-gray-400">
    //                                                                             ลูกค้าสามารถโอนเงินทำได้โดยไม่ต้องเข้าหน้าฝากเงิน
    //                                                                         </span>
    //                                                                     </div>
    //                                                                 </div>
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="">
    //                                                         <div className="border-b-2 border-red-600 mb-3">
    //                                                             <h2 className="text-lg font-display mr-auto text-red-600">
    //                                                                 ตั้งค่าอนุมัติถอนเงินอัตโนมัติ
    //                                                             </h2>
    //                                                         </div>
    //                                                         <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
    //                                                             <div className="">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 ตั้งค่าถอนสูงสุดโดยระบบออโต้
    //                                                                             </span>

    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"

    //                                                                             type="number"
    //                                                                             name="maxWithdrawAuto"
    //                                                                             value={formData.maxWithdrawAuto}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำนวนการถอนเงินสด / ต่อวัน
    //                                                                             </span>
    //                                                                             <div className="relative flex flex-col items-center group cursor-pointer">
    //                                                                                 <svg
    //                                                                                     className="w-4 h-4"
    //                                                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                                                     viewBox="0 0 20 20"
    //                                                                                     fill="currentColor"
    //                                                                                 >
    //                                                                                     <path
    //                                                                                         fillRule="evenodd"
    //                                                                                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
    //                                                                                         clipRule="evenodd"
    //                                                                                     />
    //                                                                                 </svg>
    //                                                                                 <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
    //                                                                                     <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
    //                                                                                         ยอดถอนรวมทั้งหมดที่สมาชิก สามารถถอนได้ต่อวัน
    //                                                                                     </span>
    //                                                                                 </div>
    //                                                                             </div>
    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"
    //                                                                             type="number"
    //                                                                             name="withdrawCash"
    //                                                                             value={formData.withdrawCash}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำนวนถอนเงินขั้นต่ำ
    //                                                                             </span>

    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"
    //                                                                             type="number"
    //                                                                             name="minWithdraw"
    //                                                                             value={formData.minWithdraw}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำนวนถอนเงินสูงสุด
    //                                                                             </span>

    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"
    //                                                                             type="number"
    //                                                                             name="maxWithdraw"
    //                                                                             value={formData.maxWithdraw}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             THB
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div className="">
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 ยอดเทิร์นโอเวอร์ที่ต้องทำก่อนถอน
    //                                                                             </span>
    //                                                                             <div className="relative flex flex-col items-center group cursor-pointer">
    //                                                                                 <svg
    //                                                                                     className="w-4 h-4"
    //                                                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                                                     viewBox="0 0 20 20"
    //                                                                                     fill="currentColor"
    //                                                                                 >
    //                                                                                     <path
    //                                                                                         fillRule="evenodd"
    //                                                                                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
    //                                                                                         clipRule="evenodd"
    //                                                                                     />
    //                                                                                 </svg>
    //                                                                                 <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
    //                                                                                     <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
    //                                                                                         ทุกยอดฝากจะถูกบังคับให้ทำเทิร์นโอเวอร์
    //                                                                                         จึงจะถอนได้หากไม่ต้องตั้งค่าให้ปรับเป็น 0
    //                                                                                         หากต้องการให้ลูกค้าทำเทิร์น 50% ให้ใส่เป็น
    //                                                                                         0.5
    //                                                                                     </span>
    //                                                                                 </div>
    //                                                                             </div>
    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"
    //                                                                             type="number"
    //                                                                             name="turnoverVal"
    //                                                                             value={formData.turnoverVal}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             เท่า
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                             <div>
    //                                                                 <div className="py-1">
    //                                                                     <div className="flex justify-between">
    //                                                                         <label className="form-label flex items-center">
    //                                                                             <span>
    //                                                                                 <i className="text-danger">* </i>{" "}
    //                                                                                 จำกัดจำนวนการถอนเงิน / วัน
    //                                                                             </span>
    //                                                                             <div className="relative flex flex-col items-center group cursor-pointer">
    //                                                                                 <svg
    //                                                                                     className="w-4 h-4"
    //                                                                                     xmlns="http://www.w3.org/2000/svg"
    //                                                                                     viewBox="0 0 20 20"
    //                                                                                     fill="currentColor"
    //                                                                                 >
    //                                                                                     <path
    //                                                                                         fillRule="evenodd"
    //                                                                                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
    //                                                                                         clipRule="evenodd"
    //                                                                                     />
    //                                                                                 </svg>
    //                                                                                 <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
    //                                                                                     <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
    //                                                                                         จำนวนครั้งที่สมาชิก สามารถถอนได้ต่อวัน
    //                                                                                     </span>
    //                                                                                 </div>
    //                                                                             </div>
    //                                                                         </label>

    //                                                                     </div>
    //                                                                     <div className="input-group">

    //                                                                         <input
    //                                                                             autoComplete="off"
    //                                                                             className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
    //                                                                             inputMode="decimal"
    //                                                                             type="number"
    //                                                                             name="limitWithdraw"
    //                                                                             value={formData.limitWithdraw}
    //                                                                             onChange={handleChange}
    //                                                                         />
    //                                                                         <div className="input-group-text uppercase whitespace-nowrap">
    //                                                                             ครั้ง
    //                                                                         </div>
    //                                                                     </div>
    //                                                                     <div className="mb-5 relative"></div>
    //                                                                 </div>
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="border-b-2 border-teal-600 mb-3">
    //                                                     <h2 className="text-lg font-display mr-auto text-teal-600">
    //                                                         ตั้งค่าความปลอดภัย
    //                                                     </h2>
    //                                                 </div>
    //                                                 <div>
    //                                                     <div className="form-check form-switch">
    //                                                         <input
    //                                                             id="is-forced-match"
    //                                                             className="form-check-input"
    //                                                             type="checkbox"

    //                                                             name="twoFactor"
    //                                                             checked={formData.twoFactor}
    //                                                             onChange={handleChange}

    //                                                         />
    //                                                         <div className="ml-2">
    //                                                             <label
    //                                                                 className="form-check-label flex items-center ml-0"
    //                                                                 htmlFor="is-forced-match"
    //                                                             >
    //                                                                 ใช้งานการยืนยันตัวตนแบบสองชั้น (2FA)
    //                                                             </label>
    //                                                             <span className="block text-xs text-gray-400">
    //                                                                 เปิดให้พนักงานเข้าสู่ระบบต้องยืนยันตัวตนแบบสองชั้น
    //                                                             </span>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="border-b-2 border-orange-500 mt-6 mb-3">
    //                                                     <h2 className="text-lg font-display mr-auto text-orange-500">
    //                                                         ตั้งค่าสมัครผ่านทรูมันนี่
    //                                                     </h2>
    //                                                 </div>
    //                                                 <div className="mb-6">
    //                                                     <div className="form-check form-switch">
    //                                                         <input
    //                                                             id="is-forced-match"
    //                                                             className="form-check-input"
    //                                                             type="checkbox"
    //                                                             name="registerTruemoney"
    //                                                             checked={formData.registerTruemoney}
    //                                                             onChange={handleChange}
    //                                                         />
    //                                                         <div className="ml-2">
    //                                                             <label
    //                                                                 className="form-check-label flex items-center ml-0"
    //                                                                 htmlFor="is-forced-match"
    //                                                             >
    //                                                                 เปิด/ปิด สมัครผ่านทรูมันนี่
    //                                                             </label>
    //                                                             <span className="block text-xs text-gray-400">
    //                                                                 ปิดสมัครผ่านทรูมันนี่
    //                                                             </span>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="flex justify-end mt-5">
    //                                                     <button
    //                                                         className="btn btn-primary btn btn-md btn btn-primary"
    //                                                         type="submit"
    //                                                     >
    //                                                         <svg
    //                                                             xmlns="http://www.w3.org/2000/svg"
    //                                                             width="16px"
    //                                                             height="16px"
    //                                                             viewBox="0 0 24 24"
    //                                                             fill="none"
    //                                                             stroke="currentColor"
    //                                                             strokeWidth={2}
    //                                                             strokeLinecap="round"
    //                                                             strokeLinejoin="round"
    //                                                             className="feather feather-save"
    //                                                         >
    //                                                             <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    //                                                             <polyline points="17 21 17 13 7 13 7 21" />
    //                                                             <polyline points="7 3 7 8 15 8" />
    //                                                         </svg>
    //                                                         <span className="pl-1">บันทึกข้อมูล</span>
    //                                                     </button>
    //                                                 </div>
    //                                             </form>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    const [selectedTab, setSelectedTab] = useState('ทั่วไป');

    const tabs = [
      { label: "ทั่วไป", icon: "settings" },
      { label: "แนะนำเพื่อน", icon: "layers" },
      { label: "คืนยอดเสีย", icon: "repeat" },
      { label: "ช่องทางการติดต่อ", icon: "contact" },
      { label: "ช่องทางการตลาด", icon: "share-2" },
    ];
    
    return (
        <div className="py-6 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Navigation Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="space-y-4">
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-md cursor-pointer shadow-md transition-colors ${
                          selectedTab === tab.label
                            ? 'bg-green-700 text-white'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        onClick={() => setSelectedTab(tab.label)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-settings w-5 h-5 mr-3"
                        >
                          <use xlinkHref={`#${tab.icon}`} />
                        </svg>
                        <span className="font-semibold">{tab.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End of Navigation Tabs */}
    
              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    {selectedTab}
                  </h2>
    
                  {/* Content for "ทั่วไป" */}
                  {selectedTab === "ทั่วไป" && (
                    <div>
                      <div className="bg-gray-100 p-5 rounded-lg shadow-inner mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Login URL
                        </h3>
                        <p className="text-sm text-gray-600">
                          ลิงค์หน้าบ้าน:{" "}
                          <a
                            href={formData.linkEmployee}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {formData.linkEmployee}
                          </a>
                        </p>
                      </div>
    
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* General Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="brand"
                              className="block text-sm font-medium text-gray-700"
                            >
                              แบรนด์
                            </label>
                            <input
                              id="brand"
                              name="brand"
                              type="text"
                              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={formData.brand}
                              onChange={handleChange}
                            />
                          </div>
    
                          <div>
                            <label
                              htmlFor="userPerBankaccount"
                              className="block text-sm font-medium text-gray-700"
                            >
                              จำนวนยูสเซอร์ต่อชื่อบัญชีธนาคาร
                            </label>
                            <input
                              id="userPerBankaccount"
                              name="userPerBankaccount"
                              type="number"
                              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={formData.userPerBankaccount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
    
                        <div className="border-b-2 border-gray-200 my-6"></div>
    
                        {/* Deposit Settings */}
                        <div>
                          <h3 className="text-lg font-semibold text-green-600 mb-4">
                            ตั้งค่าการอนุมัติการฝากอัตโนมัติ
                          </h3>
    
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="minDeposit"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำนวนฝากเงินขั้นต่ำ
                              </label>
                              <input
                                id="minDeposit"
                                name="minDeposit"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                value={formData.minDeposit}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="maxDeposit"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำนวนฝากเงินสูงสุด
                              </label>
                              <input
                                id="maxDeposit"
                                name="maxDeposit"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                value={formData.maxDeposit}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div className="col-span-2 flex items-center">
                              <input
                                id="isDepositWithout"
                                name="isDepositWithout"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                checked={formData.isDepositWithout}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="isDepositWithout"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                โอนเงินโดยไม่ต้องเข้าหน้าฝาก
                              </label>
                            </div>
                          </div>
                        </div>
    
                        <div className="border-b-2 border-gray-200 my-6"></div>
    
                        {/* Withdraw Settings */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-600 mb-4">
                            ตั้งค่าอนุมัติถอนเงินอัตโนมัติ
                          </h3>
    
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="maxWithdrawAuto"
                                className="block text-sm font-medium text-gray-700"
                              >
                                ตั้งค่าถอนสูงสุดโดยระบบออโต้
                              </label>
                              <input
                                id="maxWithdrawAuto"
                                name="maxWithdrawAuto"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.maxWithdrawAuto}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="withdrawCash"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำนวนการถอนเงินสด / ต่อวัน
                              </label>
                              <input
                                id="withdrawCash"
                                name="withdrawCash"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.withdrawCash}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="minWithdraw"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำนวนถอนเงินขั้นต่ำ
                              </label>
                              <input
                                id="minWithdraw"
                                name="minWithdraw"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.minWithdraw}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="maxWithdraw"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำนวนถอนเงินสูงสุด
                              </label>
                              <input
                                id="maxWithdraw"
                                name="maxWithdraw"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.maxWithdraw}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="turnoverVal"
                                className="block text-sm font-medium text-gray-700"
                              >
                                ยอดเทิร์นโอเวอร์ที่ต้องทำก่อนถอน
                              </label>
                              <input
                                id="turnoverVal"
                                name="turnoverVal"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.turnoverVal}
                                onChange={handleChange}
                              />
                            </div>
    
                            <div>
                              <label
                                htmlFor="limitWithdraw"
                                className="block text-sm font-medium text-gray-700"
                              >
                                จำกัดจำนวนการถอนเงิน / วัน
                              </label>
                              <input
                                id="limitWithdraw"
                                name="limitWithdraw"
                                type="number"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                value={formData.limitWithdraw}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
    
                        <div className="border-b-2 border-gray-200 my-6"></div>
    
                        {/* Security Settings */}
                        <div>
                          <h3 className="text-lg font-semibold text-teal-600 mb-4">
                            ตั้งค่าความปลอดภัย
                          </h3>
    
                          <div className="flex items-center">
                            <input
                              id="twoFactor"
                              name="twoFactor"
                              type="checkbox"
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                              checked={formData.twoFactor}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="twoFactor"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              ใช้งานการยืนยันตัวตนแบบสองชั้น (2FA)
                            </label>
                          </div>
                        </div>
    
                        <div className="border-b-2 border-gray-200 my-6"></div>
    
                        {/* TrueMoney Settings */}
                        <div>
                          <h3 className="text-lg font-semibold text-orange-600 mb-4">
                            ตั้งค่าสมัครผ่านทรูมันนี่
                          </h3>
    
                          <div className="flex items-center">
                            <input
                              id="registerTruemoney"
                              name="registerTruemoney"
                              type="checkbox"
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              checked={formData.registerTruemoney}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="registerTruemoney"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              เปิด/ปิด สมัครผ่านทรูมันนี่
                            </label>
                          </div>
                        </div>
    
                        <div className="flex justify-end mt-8">
                          <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-save mr-2"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                              <polyline points="17 21 17 13 7 13 7 21" />
                              <polyline points="7 3 7 8 15 8" />
                            </svg>
                            บันทึกข้อมูล
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
    
                  {/* Content for other tabs */}
                  {selectedTab !== "ทั่วไป" && (
                    <div>
                      <p className="text-gray-600">ไม่มีข้อมูลในแท็บนี้</p>
                    </div>
                  )}
                </div>
              </div>
              {/* End of Content */}
            </div>
          </div>
        </div>
      );
      
}

export default SettingPages
