
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import EditGeneralPage from "./Component/General";
import EditHistoryPage from "./Component/History";
import EditCreditPage from "./Component/Credit";
import EditTxrawPage from "./Component/Txraw";
import EditAffiliatePage from "./Component/Affiliate";
import EditPromotionStatusPage from "./Component/PromotionStatus";
import EditAdjustCreditPage from "./Component/AdjustCredit";
import EditBetHistoryPage from "./Component/BetHistory";

import { useNavigate, useLocation, useParams } from "react-router-dom";

import { API, AGENTAPI } from '../../../Configs/Configs';

function MemberList() {
    const { userid } = useParams();
    const location = useLocation();
    console.log("location.pathname:", location.pathname);
    const hash = location.hash.replace('#', '');
    console.log("hash:", hash);
    console.log("userid:", userid);

    const [user, setUser] = useState([])

    const editGeneralPageRef = useRef();
    const creditPageRef = useRef();
    const adjustCreditPageRef = useRef();

    // const handlecreditButtonClick = () => {
    //     console.log('handlecreditButtonClick')
    //     if (creditPageRef.current) {
    //         creditPageRef.current.fetchData();
    //     }
    // };

    const handleButtonClick = () => {
        console.log('handleButtonClick')
        if (editGeneralPageRef.current) {
            editGeneralPageRef.current.saveData();
        }
    };

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

    useEffect(() => {
        if (loggedInUser && !isLoading) {
            getData();
        }
    }, [isLoading]);

    const getData = () => {
        axios.get(`${API}/user/${userid}`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            }
        })
            .then(response => {
                console.log("response getData :", response.data)
                setUser(response.data.data)
            })
            .catch(error => {
                console.error("getData errorr :", error)
            });
    };

    const [addDecreditLoading, setaddDecreditLoading] = useState(false)
    const checkCredit = (show = false) => {
        console.log("checkCredit");

        axios.get(`${AGENTAPI}/credit/${user.userId}`, {
            headers: {
                "apikey": `developercoconut`,
            }
        })
            .then(response => {
                console.log("response checkCredit :", response.data)
                if (response.data.status === "success") {
                    // Swal.fire({
                    //     title: "",
                    //     text: `ยอดเครดิต : ${response.data.data.balance} THB`,
                    //     icon: "success"
                    // });
                    setNowBalance(response.data.data.balance)

                    setaddDecreditLoading(false)
                    if (show) {
                        Swal.fire({
                            title: `ยอดเครดิต : ${response.data.data.balance} THB`,
                            showClass: {
                                popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                            },
                            hideClass: {
                                popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                            }
                        });
                    }

                } else {
                    Swal.fire({
                        title: "ผิดพลาด",
                        text: `${response.data.message}`,
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error("checkCredit errorr :", error)
                Swal.fire({
                    title: "ผิดพลาด",
                    text: "กรุณาติดต่อผู้ดูแลระบบ",
                    icon: "error"
                });
            });
    };

    const [modalAddDeCredit, setmodalAddDeCredit] = useState(false)
    const [isAddCredit, setIsAddCredit] = useState(true); // State สำหรับการเพิ่มหรือลดเครดิต
    const [amount, setAmount] = useState(''); // State สำหรับจำนวนเงิน
    const [notes, setNotes] = useState(''); // State สำหรับหมายเหตุ

    const handleAddDeCredit = () => {
        setaddDecreditLoading(true)
        checkCredit()
        setAmount('')
        setNotes('')
        setmodalAddDeCredit(true)
    }

    const handleCreditChange = (event) => {
        setIsAddCredit(event.target.value === 'true');
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const [nowBalance, setNowBalance] = useState(0)
    const handleSubmit = (event) => {
        event.preventDefault();
        // โค้ดสำหรับจัดการเมื่อฟอร์มถูกส่ง
        console.log({ isAddCredit, amount, notes });
        console.log('user:', user.phonenumber);
        setaddDecreditLoading(true);
        axios.patch(isAddCredit ? `${API}/user/add-credit/${user.phonenumber}` : `${API}/user/deduct-credit/${user.phonenumber}`, {
            amount: amount,
            remark: notes
        }, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
            },
        })
            .then(response => {
                console.log("response handleSubmit :", response.data)
                if (response.data.status === "success") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "รายการสำเร็จ"
                    });
                    if (creditPageRef.current) {
                        creditPageRef.current.fetchData();
                    }
                    if (adjustCreditPageRef.current) {
                        adjustCreditPageRef.current.fetchData();
                    }

                    getData()
                    setmodalAddDeCredit(false)
                    setaddDecreditLoading(false)
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "รายการไม่สำเร็จ"
                    });
                }
            })
            .catch(error => {
                console.error("handleSubmit errorr :", error)
            });
    };



    // const resetPassword = () => {
    //     console.log("resetPassword", user.userId);


    //     Swal.fire({
    //         title: "ยืนยันการรีเซ็ตรหัสผ่าน",
    //         text: `ต้องการรีเซ็ตรหัสผ่านยูสเซอร์ ${user.userId}`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "ยืนยัน",
    //         cancelButtonText: "ยกเลิก",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.patch(`${API}/user/reset-pin/${user.userId}`, {pin:"123456"}, {
    //                 headers: {
    //                     "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
    //                 },
    //             })
    //                 .then(response => {
    //                     console.log("response getData :", response.data)
    //                     if (response.data.status === 'success') {
    //                         Swal.fire({
    //                             title: "แจ้งเตือน",
    //                             text: `New PIN is ${response.data.data.newpass}`,
    //                             icon: "success"
    //                         });
    //                         getData()

    //                     } else {
    //                         Swal.fire({
    //                             title: "แจ้งเตือน",
    //                             text: `ผิดพลาดกรุณาติดต่อผู้ดูแลระบบ`,
    //                             icon: "error"
    //                         });
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error("getData errorr :", error)
    //                 });
    //         }
    //     });


    // };

    const resetPassword = () => {
        console.log("resetPassword", user.userId);

        Swal.fire({
            title: "ยืนยันการรีเซ็ตรหัสผ่าน",
            text: `ต้องการรีเซ็ตรหัสผ่านยูสเซอร์ ${user.userId}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            input: 'text',
            inputPlaceholder: 'กรอกรหัสผ่านใหม่ (6 ตัวเลข)',
            inputAttributes: {
                maxlength: 6,
                minlength: 6,
                pattern: "\\d*"
            },
            preConfirm: (newPin) => {
                if (!/^\d{6}$/.test(newPin)) {
                    Swal.showValidationMessage('กรุณากรอกรหัสผ่านให้ครบ 6 ตัวเลข');
                }
                return newPin;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${API}/user/reset-pin/${user.userId}`, { pin: result.value }, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).accessToken}`,
                    },
                })
                    .then(response => {
                        console.log("response getData :", response.data)
                        if (response.data.status === 'success') {
                            Swal.fire({
                                title: "แจ้งเตือน",
                                text: `New PIN is ${response.data.data.newpass}`,
                                icon: "success"
                            });
                            getData();
                        } else {
                            Swal.fire({
                                title: "แจ้งเตือน",
                                text: `ผิดพลาดกรุณาติดต่อผู้ดูแลระบบ`,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("getData error :", error);
                    });
            }
        });
    };


    if (!isLoading) {
        return (
            <div className="py-2">
                <div className="flex mt-[4.7rem] md:mt-0" >
                    <div className="content">
                        <div className="rounded-lg overflow-hidden bg-white p-4 shadow-lg flex flex-wrap justify-between">
                            <h1 className="font-medium text-lg font-display flex items-center">
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
                                    className="feather feather-edit mr-1 mr-1"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>{" "}
                                แก้ไขลูกค้า{" "}
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
                                    className="feather feather-chevron-right mx-1 mx-1"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                                <span className="text-gray-500 text-sm">{user.userId}</span>
                            </h1>
                            <div className="flex flex-wrap gap-3.5 mt-2">

                                <button
                                    className="font-medium btn bg-gray-600 border border-gray-600 text-white font-display btn btn-md font-medium btn bg-gray-600 border border-gray-600 text-white font-display"
                                    type="button"
                                    onClick={resetPassword}
                                >
                                    รีเซ็ตรหัสผ่าน
                                </button>
                                <button
                                    className="font-medium btn bg-green-600 border border-green-600 text-white font-display btn btn-md font-medium btn bg-green-600 border border-green-600 text-white font-display"
                                    type="button"
                                    onClick={handleAddDeCredit}
                                >
                                    เพิ่ม/ลด เครดิต
                                </button>
                                <button
                                    className="font-medium btn bg-gray-600 border border-gray-600 text-white font-display btn btn-md font-medium btn bg-gray-600 border border-gray-600 text-white font-display"
                                    type="button"
                                    onClick={() => checkCredit(true)}
                                >
                                    เช็คเครดิต
                                </button>



                                {hash === "general" &&
                                    <button
                                        type="submit"
                                        className="font-medium btn btn-primary font-display w-28 btn btn-md font-medium btn btn-primary font-display w-28"
                                        onClick={handleButtonClick}
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
                                            className="feather feather-save w-3 h-3 w-3 h-3"
                                        >
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                            <polyline points="7 3 7 8 15 8" />
                                        </svg>
                                        <span className="pl-1">บันทึก</span>
                                    </button>
                                }
                            </div>
                        </div>

                        <div className="col-span-12 mt-5">
                            <div className="post overflow-hidden- box h-auto rounded-t-lg">

                                <div className="grid lg:flex lg:flex-wrap grid-cols-12 nav nav-tabs flex-col sm:flex-row bg-primary dark:bg-dark-2 text-white rounded-t-lg">
                                    <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#general"
                                            // className="router-link-active router-link-exact-active bg-white text-gray-800 w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center rounded-tl-lg"
                                            className={`router-link-active router-link-exact-active ${hash === "general" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center rounded-tl-lg`}
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
                                                className="feather feather-settings w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <circle cx={12} cy={12} r={3} />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>{" "}
                                            ข้อมูลทั่วไป
                                        </a>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#history"
                                            className={`router-link-active router-link-exact-active ${hash === "history" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-list w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <line x1={8} y1={6} x2={21} y2={6} />
                                                <line x1={8} y1={12} x2={21} y2={12} />
                                                <line x1={8} y1={18} x2={21} y2={18} />
                                                <line x1={3} y1={6} x2="3.01" y2={6} />
                                                <line x1={3} y1={12} x2="3.01" y2={12} />
                                                <line x1={3} y1={18} x2="3.01" y2={18} />
                                            </svg>{" "}
                                            รายการฝากถอน
                                        </a>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#credit"
                                            className={`router-link-active router-link-exact-active ${hash === "credit" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-bar-chart-2 w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <line x1={18} y1={20} x2={18} y2={10} />
                                                <line x1={12} y1={20} x2={12} y2={4} />
                                                <line x1={6} y1={20} x2={6} y2={14} />
                                            </svg>
                                            รายงานเครดิต
                                        </a>
                                    </div>
                                    {/* <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#tx-raw"
                                            className={`router-link-active router-link-exact-active ${hash === "tx-raw" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-file-text w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1={16} y1={13} x2={8} y2={13} />
                                                <line x1={16} y1={17} x2={8} y2={17} />
                                                <polyline points="10 9 9 9 8 9" />
                                            </svg>
                                            รายละเอียดการจำบัญชี
                                        </a>
                                    </div> */}
                                    {/* <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#affiliate"
                                            className={`router-link-active router-link-exact-active ${hash === "affiliate" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-share-2 w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <circle cx={18} cy={5} r={3} />
                                                <circle cx={6} cy={12} r={3} />
                                                <circle cx={18} cy={19} r={3} />
                                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                            </svg>{" "}
                                            สมาชิกที่แนะนำ
                                        </a>
                                    </div> */}
                                    {/* <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#promotion-status"
                                            className={`router-link-active router-link-exact-active ${hash === "promotion-status" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-award w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <circle cx={12} cy={8} r={7} />
                                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                                            </svg>{" "}
                                            โปรโมชั่นที่เข้าร่วมอยู่
                                        </a>
                                    </div> */}
                                    <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#adjust-credit"
                                            className={`router-link-active router-link-exact-active ${hash === "adjust-credit" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
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
                                                className="feather feather-book-open w-4 h-4 mr-2 w-4 h-4 mr-2"
                                            >
                                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                            </svg>
                                            รายการปรับเครดิต
                                        </a>
                                    </div>
                                    {/* <div className="col-span-6 sm:col-span-4">
                                        <a
                                            aria-current="page"
                                            href="#bet-history"
                                            className={`router-link-active router-link-exact-active ${hash === "bet-history" && 'bg-white text-gray-800'} w-full lg:w-auto px-3 sm:px-5 py-3 text-center flex justify-center items-center`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                aria-hidden="true"
                                                role="img"
                                                className="w-4 h-4 mr-2 iconify iconify--fa6-solid"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M24 56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v120h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h16V80h-8c-13.3 0-24-10.7-24-24m62.7 285.2c-6.5-7.4-18.3-6.9-24 1.2l-11.2 15.5c-7.7 10.8-22.7 13.3-33.5 5.6S4.7 340.8 12.4 330l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6.3-20.5zM224 64h256c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32m0 160h256c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32m0 160h256c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32"
                                                />
                                            </svg>{" "}
                                            ประวัติเดิมพัน
                                        </a>
                                    </div> */}

                                </div>

                                {hash === "general" ? <EditGeneralPage accesstoken={accessToken} ref={editGeneralPageRef} datamember={user} onSuccess={getData} /> :
                                    hash === "history" ? <EditHistoryPage accesstoken={accessToken} /> :
                                        hash === "credit" ? <EditCreditPage ref={creditPageRef} /> :
                                            hash === "tx-raw" ? <EditTxrawPage accesstoken={accessToken} /> :
                                                hash === "affiliate" ? <EditAffiliatePage accesstoken={accessToken} /> :
                                                    hash === "romotion-status" ? <EditPromotionStatusPage accesstoken={accessToken} /> :
                                                        hash === "adjust-credit" ? <EditAdjustCreditPage userId={user.userId} ref={adjustCreditPageRef} /> :
                                                            hash === "bet-history" ? <EditBetHistoryPage /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    data-backdrop="static"
                    style={{ display: modalAddDeCredit ? "" : "none" }}
                    className="modal overflow-y-auto show z-[60] m-0 p-0"
                >
                    <div className="w-11/12 lg:w-8/12 xl:w-5/12 2xl:w-4/12 modal-dialog mx-auto my-3 flex justify-center items-center">
                        <div className="modal-content">
                            <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                                <h2 className="font-medium font-display mr-auto text-lg">
                                    {isAddCredit ? "+ เพิ่มเครดิต" : "- ลดเครดิต"}
                                </h2>
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
                                    className="feather feather-x cursor-pointer cursor-pointer"
                                    onClick={() => setmodalAddDeCredit(false)}
                                >
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                            <div className="px-4 py-1 text-center bg-blue-200 font-display">
                                เครดิตคงเหลือ: <span className="text-lg font-semibold">{nowBalance}</span> THB
                            </div>
                            <form noValidate="" className="p-4" onSubmit={handleSubmit}>
                                <div className="flex gap-6 mb-5">
                                    <div className="mr-2 flex items-center">
                                        <input
                                            id="radio-switch-add-credit"
                                            type="radio"
                                            className="cursor-pointer"
                                            name="credit-type"
                                            value="true"
                                            checked={isAddCredit === true}
                                            onChange={handleCreditChange}
                                        />
                                        <label
                                            htmlFor="radio-switch-add-credit"
                                            className="font-semibold pl-1"
                                        >
                                            + เพิ่มเครดิต
                                        </label>
                                    </div>
                                    <div className="mt-2 mr-2 sm:mt-0 flex items-center">
                                        <input
                                            id="radio-switch-del-credit"
                                            type="radio"
                                            className="cursor-pointer"
                                            name="credit-type"
                                            value="false"
                                            checked={isAddCredit === false}
                                            onChange={handleCreditChange}
                                        />
                                        <label
                                            htmlFor="radio-switch-del-credit"
                                            className="flex items-center font-semibold pl-1"
                                        >
                                            - ลดเครดิต
                                        </label>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <div className="flex justify-between">
                                        <label className="form-label flex items-center">
                                            <span>
                                                <i className="text-danger">* </i> จำนวนเงิน
                                            </span>
                                        </label>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            autoComplete="off"
                                            className="border-gray-300 intro-x form-control border block focus:outline-none z-0"
                                            name="amount"
                                            inputMode="decimal"
                                            value={amount}
                                            onChange={handleAmountChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-5 relative"></div>
                                </div>
                                <label className="form-label flex items-center capitalize">
                                    <span>
                                        <i className="text-danger">* </i> หมายเหตุ
                                    </span>
                                </label>
                                <div className="input-group">
                                    <textarea
                                        className="w-full rounded h-24 border-gray-300 p-2"
                                        name="notes"
                                        placeholder="หมายเหตุ"
                                        value={notes}
                                        onChange={handleNotesChange}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end pt-4 border-t">
                                    <button
                                        type="submit"
                                        disabled={addDecreditLoading}
                                        className="btn btn-primary mr-4 disabled:bg-gray-500 disabled:border-gray-500"
                                    >
                                        {addDecreditLoading ? <div
                                            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                            role="status">
                                            <span
                                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span
                                            >
                                        </div> : <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-save"
                                        >
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                            <polyline points="7 3 7 8 15 8" />
                                        </svg>}


                                        <span className="pl-1">บันทึก</span>
                                    </button>
                                    <button
                                        className="btn btn-outline-dark"
                                        type="button"
                                        onClick={() => setmodalAddDeCredit(false)}
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
                                            className="feather feather-x"
                                        >
                                            <line x1={18} y1={6} x2={6} y2={18} />
                                            <line x1={6} y1={6} x2={18} y2={18} />
                                        </svg>
                                        <span className="pl-1">ปิด</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default MemberList
