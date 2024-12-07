import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import axios from 'axios';

import { API } from './Configs/Configs';

const Layout = () => {
    const location = useLocation();
    console.log("location.pathname:", location.pathname);
    const hash = location.hash.replace('#', '');
    console.log("hash:", hash);

    const [accessToken, setaccessToken] = useState("")

    const [soundAlertEnable, setSoundAlertEnable] = useState(true)

    const [isLoading, setIsloading] = useState(true)
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser === null) {
        localStorage.setItem('loggedInUser', "");
        navigate("/");
    }
    // console.log('nav loggedInUser:', JSON.parse(loggedInUser))
    // console.log('nav loggedInUser accessToken:')
    // console.log('nav loggedInUser accessToken:', JSON.parse(loggedInUser).accessToken)

    useEffect(() => {
        if (loggedInUser) {
            setaccessToken(JSON.parse(loggedInUser).accessToken)
            setIsloading(false)
        } else {
            navigate("/");
        }
    }, []);

    const [dropdownProfile, setdropdownProfile] = useState(false)
    const handleDropdownProfile = () => {
        setdropdownProfile(!dropdownProfile)
    }

    const logoutHandle = () => {
        localStorage.setItem('loggedInUser', "");
        navigate("/");
    }


    // ฟังก์ชันเล่นเสียง
    const playSound = () => {
        if (!sound) {
            const newSound = new Howl({
                src: ['AlertSound.mp3']
            });
            setSound(newSound);
            newSound.play();
        } else {
            sound.play();
        }
    };


    const [data, setData] = useState(null);
    const [sound, setSound] = useState(null);
    const getBankDepositWithdrawWait = () => {
        axios.get(`${API}/v2/bankdepositwithdrawwait?q=&itemsPerPage=10&page=1`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(loggedInUser).accessToken}`,
            }
        })
            .then(response => {
                if (response.data && response.data.data.length > 0) {
                    setData(response.data);
                    console.log("soundAlertEnable=", soundAlertEnable)
                    if (soundAlertEnable === true) {
                        playSound();
                    }

                }

            })
            .catch(error => {
                logoutHandle();
            });
    }



    useEffect(() => {
        const interval = setInterval(getBankDepositWithdrawWait, 5000);
        return () => clearInterval(interval);
    }, [sound, soundAlertEnable]);


    return (
        <div>
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
                        <button className="flex items-center p-2 transition duration-300 ease-in-out hover:bg-primarydark:hover:bg-dark-3 rounded-md w-full focus:outline-none" onClick={logoutHandle}>
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

            {/* bg-green-700 */}
            <div className='' >
                <div className="py-2">
                    <div className="mobile-menu md:hidden">
                        <div className="mobile-menu-bar">
                            <a href="/" className="flex mr-auto">
                                <img alt="logo" className="w-6" src="/img/logo.png" />
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
                            <a href="" className="mobile-menu-toggler">
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
                            <ul
                                className="py-5 v-leave-active v-leave-to"
                                style={{ display: "none" }}
                            >
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-grid"
                                            >
                                                <rect x={3} y={3} width={7} height={7} />
                                                <rect x={14} y={3} width={7} height={7} />
                                                <rect x={14} y={14} width={7} height={7} />
                                                <rect x={3} y={14} width={7} height={7} />
                                            </svg>
                                        </div>
                                        <div className="menu__title">ภาพรวม </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="/tx-job" className="menu menu--active">
                                        <div className="menu__icon">
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
                                                className="feather feather-package"
                                            >
                                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                <line x1={12} y1="22.08" x2={12} y2={12} />
                                            </svg>
                                        </div>
                                        <div className="menu__title">รายการ ฝาก-ถอน </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-list"
                                            >
                                                <line x1={8} y1={6} x2={21} y2={6} />
                                                <line x1={8} y1={12} x2={21} y2={12} />
                                                <line x1={8} y1={18} x2={21} y2={18} />
                                                <line x1={3} y1={6} x2="3.01" y2={6} />
                                                <line x1={3} y1={12} x2="3.01" y2={12} />
                                                <line x1={3} y1={18} x2="3.01" y2={18} />
                                            </svg>
                                        </div>
                                        <div className="menu__title">โอนมือ/โยกเงิน </div>
                                    </a>

                                </li>


                                {/* <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-clipboard"
                                            >
                                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                                <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            ตรวจสอบสลิป{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li> */}
                                <li>
                                    <a href="/history/topup" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-clock"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">ประวัติ ฝาก-ถอน</div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-users"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx={9} cy={7} r={4} />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            ข้อมูลสมาชิก{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-award"
                                            >
                                                <circle cx={12} cy={8} r={7} />
                                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            โปรโมชั่น{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-trending-up"
                                            >
                                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                                <polyline points="17 6 23 6 23 12" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            รายงาน{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-user-check"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <polyline points="17 11 19 13 23 9" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            พนักงาน{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-settings"
                                            >
                                                <circle cx={12} cy={12} r={3} />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">
                                            ตั้งค่า{" "}
                                            <div className="menu__sub-icon">
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
                                                    className="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                </li>
                            </ul>

                            <ul
                                className="pt-5 pb-32 v-leave-active v-leave-to"
                                style={{ display: "none" }}
                            >
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-file-text"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1={16} y1={13} x2={8} y2={13} />
                                                <line x1={16} y1={17} x2={8} y2={17} />
                                                <polyline points="10 9 9 9 8 9" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">ค่าบริการ </div>
                                    </a>

                                </li>
                                <li>
                                    <a href="" className="menu">
                                        <div className="menu__icon">
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
                                                className="feather feather-book-open"
                                            >
                                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                            </svg>
                                        </div>
                                        <div className="menu__title">คู่มือการใช้งาน </div>
                                    </a>

                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="flex mt-[4.7rem] md:mt-0">
                        <nav className="side-nav uppercase whitespace-nowrap font-bold  text-white">
                            <a href="/dashboard" className="intro-x flex items-center pl-5 pt-4">
                                <img
                                    alt="SMARTKING PLUS"
                                    className="w-23"
                                    src="/img/logo.png"
                                />
                            </a>
                            <div className="side-nav__divider mt-6 mb-3" />
                            <ul>
                                <li>

                                    <a href="/dashboard" className={`side-menu !pl-5 ${location.pathname === "/dashboard" && 'side-menu--active'}`}>
                                        <div className="side-menu__icon">
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
                                                className="feather feather-grid"
                                            >
                                                <rect x={3} y={3} width={7} height={7} />
                                                <rect x={14} y={3} width={7} height={7} />
                                                <rect x={14} y={14} width={7} height={7} />
                                                <rect x={3} y={14} width={7} height={7} />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">ภาพรวม</span>

                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <div className="text-white text-xs font-display py-3">
                                        จัดการเว็บมาสเตอร์
                                    </div>
                                    <a href="/master/list" className={`side-menu !pl-5 ${location.pathname === "/master/list" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-package"
                                            >
                                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                <line x1={12} y1="22.08" x2={12} y2={12} />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">รายการ เว็บมาสเตอร์</span>

                                        </div>
                                    </a>
                                </li>

                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        ข้อมูลการเงิน
                                    </div>
                                    <a href="/tx-job" className={`side-menu !pl-5 ${location.pathname === "/tx-job" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-package"
                                            >
                                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                <line x1={12} y1="22.08" x2={12} y2={12} />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">รายการ ฝาก-ถอน</span>

                                        </div>
                                    </a>
                                </li> */}

                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        จัดการธนาคาร
                                    </div>
                                    <a href="/bank" className={`side-menu !pl-5 ${location.pathname === "/bank" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-package"
                                            >
                                                <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                <line x1={12} y1="22.08" x2={12} y2={12} />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">จัดการธนาคาร</span>

                                        </div>
                                    </a>
                                </li> */}

                                {/* <li>
                                    <a href="/transfer" className={`side-menu !pl-5 ${location.pathname === "/transfer" && 'side-menu--active'}`}>
                                        <div className="side-menu__icon">
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
                                                className="feather feather-list"
                                            >
                                                <line x1={8} y1={6} x2={21} y2={6} />
                                                <line x1={8} y1={12} x2={21} y2={12} />
                                                <line x1={8} y1={18} x2={21} y2={18} />
                                                <line x1={3} y1={6} x2="3.01" y2={6} />
                                                <line x1={3} y1={12} x2="3.01" y2={12} />
                                                <line x1={3} y1={18} x2="3.01" y2={18} />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">โอนมือ/โยกเงิน</span>

                                        </div>
                                    </a>
                                </li> */}

                                {/* <li>
                                    <a href="/history/topup" className={`side-menu !pl-5 ${location.pathname === "/history/topup" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-clock"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">ประวัติ ฝาก-ถอน </span>

                                        </div>
                                    </a>
                                    <div className="side-nav__divider my-3" />
                                </li> */}

                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        ข้อมูลสมาชิก
                                    </div>
                                    <a href="/member/list" className={`side-menu !pl-5 ${location.pathname === "/member/list" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-users"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx={9} cy={7} r={4} />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">รายชื่อสมาชิก</span>

                                        </div>
                                    </a>
                                    <a href="/member/recent" className={`side-menu !pl-5 ${location.pathname === "/member/recent" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-user-plus"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx={8.5} cy={7} r={4} />
                                                <line x1="20" y1="8" x2="20" y2="14" />
                                                <line x1="23" y1="11" x2="17" y2="11" />
                                            </svg>

                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">รายชื่อสมาชิกใหม่</span>
                                        </div>
                                    </a>
                                    <div className="side-nav__divider my-3" />
                                </li> */}

                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        ข้อมูลพนักงาน
                                    </div>
                                    <a href="/staff/list" className={`side-menu !pl-5 ${location.pathname === "/staff/list" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-user-check"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <polyline points="17 11 19 13 23 9" />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">รายชื่อพนักงาน</span>
                                        </div>
                                    </a>

                                    <div className="side-nav__divider my-3" />
                                </li> */}


                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        รายงาน
                                    </div>
                                    <a href="/report/monthly" className={`side-menu !pl-5 ${location.pathname === "/report/monthly" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-trending-up"
                                            >
                                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                                <polyline points="17 6 23 6 23 12" />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">สรุปยอดรายเดือน</span>
                                        </div>
                                    </a>
                                    <div className="side-nav__divider my-3" />
                                </li> */}

                                {/* <li>
                                    <div className="text-white text-xs font-display py-3">
                                        ตั้งค่า
                                    </div>
                                    <a href="/settings/system" className={`side-menu !pl-5 ${location.pathname === "/settings/system" && 'side-menu--active'}`} >
                                        <div className="side-menu__icon">
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
                                                className="feather feather-settings"
                                            >
                                                <circle cx={12} cy={12} r={3} />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>
                                        </div>
                                        <div className="side-menu__title">
                                            <span className="font-display">ตั้งค่าระบบ</span>

                                        </div>
                                    </a>
                                    <div className="side-nav__divider my-3" />
                                </li> */}
                            </ul>

                        </nav>
                        <div className="content">
                            <div className="z-10 top-bar justify-end">
                                {/* <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
                                    <span className="inline-flex items-center">
                                        <a href="/" className="router-link-active underline min-w-max">
                                            หน้าหลัก
                                        </a>
                                        <span
                                            className="text-gray-600 mr-4 min-w-max"
                                            style={{ display: "none" }}
                                        >
                                            หน้าหลัก
                                        </span>
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
                                            className="feather feather-chevron-right breadcrumb__icon breadcrumb__icon"
                                        >
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </span>
                                    <span className="inline-flex items-center">

                                        <span className="text-gray-600 mr-4 min-w-max">
                                            รายการฝาก / ถอน
                                        </span>
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
                                            className="feather feather-chevron-right breadcrumb__icon breadcrumb__icon"
                                            style={{ display: "none" }}
                                        >
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </span>
                                </div> */}

                                <div className="pl-2 pr-1 mt-1">
                                    <div className="flex items-center gap-3 min-w-max">
                                        <div
                                            className="flex flex-col items-center cursor-pointer hover:text-green-600 hover:text-red-600"
                                            onClick={() => setSoundAlertEnable(!soundAlertEnable)}
                                        >
                                            <div className="form-check form-switch">

                                                {!soundAlertEnable ? <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    aria-hidden="true"
                                                    role="img"
                                                    width={14}
                                                    height={14}
                                                    viewBox="0 0 24 24"
                                                    className="iconify iconify--akar-icons"
                                                >
                                                    <g
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeWidth={2}
                                                    >
                                                        <path d="m22 15l-6-6m6 0l-6 6" />
                                                        <path
                                                            strokeLinejoin="round"
                                                            d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041"
                                                        />
                                                    </g>
                                                </svg>
                                                    :
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        aria-hidden="true"
                                                        role="img"
                                                        width={14}
                                                        height={14}
                                                        viewBox="0 0 24 24"
                                                        className="iconify iconify--akar-icons"
                                                    >
                                                        <path
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041M16 8.5c1.333 1.778 1.333 5.222 0 7M19 5c3.988 3.808 4.012 10.217 0 14"
                                                        />
                                                    </svg>
                                                }


                                            </div>
                                            <div className="font-display font-medium text-[10px] text-center cursor-pointer">
                                                เสียงแจ้งเตือน
                                                {/* ใบงานสำเร็จ */}
                                            </div>
                                        </div>
                                        <div className="border-l border-black/20 h-[32px]" />

                                    </div>
                                </div>
                                <div
                                    className="dropdown"
                                    data-tw-placement="bottom-end"
                                    style={{ position: "relative" }}
                                >
                                    <button
                                        className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110 flex items-center justify-center bg-primary"
                                        aria-expanded="false"
                                        data-tw-toggle="dropdown"
                                        onClick={handleDropdownProfile}
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
                                            className="feather feather-user text-white text-white"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx={12} cy={7} r={4} />
                                        </svg>
                                    </button>

                                </div>
                            </div>

                            {/* พื้นที่แสดง */}
                            <main style={{ padding: '0px' }}>
                                <Outlet />
                            </main>


                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Layout;
