
import { useNavigate } from "react-router-dom";
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { getCurrentTimeInUTC7, formatTimeDifference,formatDateTime } from '../../../../Model/Function';
import { bankLabelImage, bankColor, bankLabel } from '../../../../Model/Bank';

import { formatCurrency } from "@/util/format";
import { ApiCall } from "@/util/api";
import { API } from '../../../../Configs/Configs';
import Select from 'react-select'


// import { bankLabelImage, bankColor, bankLabel } from '../../Model/Bank';
const MemberList = forwardRef((props, ref) => {
    console.log('props:', props)

    useImperativeHandle(ref, () => ({
        saveData() {
            console.log('props:', props)
            console.log('accessToken:', props.accesstoken)
            console.log("Save data function called");
            console.log("formData:",formData);
            axios.patch(`${API}/user/${props.datamember.id}`, {
                name: formData.fullname,
                passkey: formData.pin,
                url: formData.url,
                ref: formData.ref,
                phonenumber: formData.phonenumber,
                line: formData.lineId
            }, {
                headers: {
                    "Authorization": `Bearer ${props.accesstoken}`
                }
            })
                .then(response => {
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
                    if (props.onSuccess) {
                        props.onSuccess();
                    }
                    Toast.fire({
                        icon: "success",
                        title: "รายการสำเร็จ"
                    });
                })
                .catch(error => {
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
                });
        }
    }));
    const [modalAddBank, setmodalAddBank] = useState(false)
    const handleModalAddBank = () => {
        setmodalAddBank(true)
    }


    const options = Object.entries(bankLabel).map(([value, label]) => ({
        value,
        label,
    }));
    const [selectAddUser, setselectAddUser] = useState(options[0].value)
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [loadingCheckBank, setLoadingCheckBank] = useState(false);




    // value={accountName}
    // onChange={(e) => setAccountName(e.target.value)}
    const handleCheckUserBank = async (e) => {
        e.preventDefault();
        console.log('selectAddUser:', selectAddUser)
        console.log('accountNumber:', accountNumber)
        console.log('accountName:', accountName)
        console.log('datamember:', props.datamember.id)

        if (accountNumber.length !== 0) {
            setLoadingCheckBank(true)
            axios.post(`https://bankbein.bizboo.com/checkbank`, {
                bankCode: selectAddUser,
                accountNumber: accountNumber
            }).then((res) => {
                console.log(res.data)
                if (res.data === null) {
                    console.log("error")

                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: "ไม่พบข้อมูลบัญชี",
                        icon: "error"
                    });
                    setLoadingCheckBank(false)
                } else {
                    console.log(res.data)
                    setAccountName(res.data.fullname)
                    // Swal.fire({
                    //     title: "แจ้งเตือน",
                    //     text: "สำเร็จ",
                    //     icon: "success"
                    // });
                    setLoadingCheckBank(false)
                }
            }).catch((error) => {
                console.error(error)
                setLoadingCheckBank(false)
            })

            // let res = await ApiCall("POST", "/userbank", {
            //     userId: `${props.datamember.id}`, // api99xbeth0povl
            //     bankName: selectAddUser,
            //     accountName: accountName,
            //     accountNumber: accountNumber
            // });
            // console.log("res handelSubmitAddUserBank: ", res);
            // console.log("res handelSubmitAddUserBank: ", res.status);
            // if (res.status === "success") {
            //     if (props.onSuccess) {
            //         setmodalAddBank(false)
            //         props.onSuccess();
            //     }
            // }
        } else {
            Swal.fire({
                title: "แจ้งเตือน",
                text: "ผิดพลาด กรุณากรอกเลขบัญชี",
                icon: "error"
            });
        }


        // console.log("handelSubmitAddUserBank: ", res.data);

        // setbankservice(res.data);
    }


    const handelSubmitAddUserBank = async (e) => {
        e.preventDefault();
        console.log('selectAddUser:', selectAddUser)
        console.log('accountNumber:', accountNumber)
        console.log('accountName:', accountName)
        console.log('datamember:', props.datamember.id)


        let res = await ApiCall("POST", "/userbank", {
            userId: `${props.datamember.id}`, // api99xbeth0povl
            bankName: selectAddUser,
            accountName: accountName,
            accountNumber: accountNumber
        });
        console.log("res handelSubmitAddUserBank: ", res);
        console.log("res handelSubmitAddUserBank: ", res.status);
        if (res.status === "success") {
            if (props.onSuccess) {
                setmodalAddBank(false)
                props.onSuccess();
            }
        }
        console.log("handelSubmitAddUserBank: ", res.data);

        // setbankservice(res.data);
    }


    const handleSetDefaultBank = async (data) => {
        console.log("handleSetDefaultBank: ", data);

        Swal.fire({
            title: "ยืนยัน?",
            text: "ยืนยันการเปลี่ยนบัญชีหลัก",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await ApiCall("PATCH", `/userbank/set-default/${data.id}`, {
                    userId: `${props.datamember.id}`,
                });
                if (res.status === "success") {
                    if (props.onSuccess) {
                        setmodalAddBank(false)
                        props.onSuccess();

                    }
                } else {
                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: "ผิดพลาด กรุณาติดต่อแอดมิน",
                        icon: "success"
                    });
                    setmodalAddBank(false)
                    props.onSuccess();
                }
            }
        });


    }

    const handleDeleteUserBank = async (data) => {
        console.log("handleDeleteUserBank: ", data);

        Swal.fire({
            title: "ยืนยัน?",
            text: "ยืนยันการลบบัญชี",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {

                let res = await ApiCall("DELETE", `/userbank/${data.id}`, {
                    userId: `${props.datamember.id}`,
                });
                if (res.status === "success") {
                    if (props.onSuccess) {
                        setmodalAddBank(false)
                        props.onSuccess();
                    }
                } else {
                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: "ผิดพลาด กรุณาติดต่อแอดมิน",
                        icon: "success"
                    });
                    setmodalAddBank(false)
                    props.onSuccess();
                }
            }
        });

    }

    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        ip: "",
        pin: "",
        url: "",
        notes: "",
        phonenumber: "",
        lineId: ""
    });

    const [bank, setBank] = useState([]);
    useEffect(() => {
        if (props.datamember) {
            // console.log('props.datamember',props.datamember);
            setFormData({
                username: props.datamember.userId,
                fullname: props.datamember.name,
                ip: props.datamember.ip,
                pin: props.datamember.passkey,
                passkeyweb:props.datamember.passkeyweb,
                url: props.datamember.url,
                ref: props.datamember.ref,
                phonenumber: props.datamember.phonenumber,
                lineId: props.datamember.line
            });

            setBank(props.datamember.bank);
        }
    }, [props.datamember]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        console.log('formData:', formData)
    }, [formData])


    const saveUser = () => {
        // props.accessToken



    }

    return (
        <div>
            <div className="post__content tab-content">
                <div
                    id="content"
                    className="tab-pane p-5 active"
                    role="tabpanel"
                    aria-labelledby="content-tab"
                >
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                        <div className="rounded-lg shadow-lg col-span-3">
                            <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                <h1 className="text-base font-display mr-auto text-white flex items-center">
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
                                        className="feather feather-user w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                    </svg>{" "}
                                    ข้อมูลพื้นฐาน สร้างสมาชิก
                                </h1>
                            </div>
                            <div className="grid grid-cols-12 gap-4 p-4">
                                {/* <div className="flex items-center mb-3 col-span-12 form-check form-switch">
                                    <label htmlFor="is-active" className="form-label pr-3 mb-0">
                                        เปิดใช้
                                    </label>
                                    <input
                                        id="is-active"
                                        className="form-check-input"
                                        type="checkbox"
                                    />
                                </div> */}
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">ยูสเซอร์เนม</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="ยูสเซอร์เนม (Username)"
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="G*"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                disabled={true}
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">ชื่อ-สกุล</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="ชื่อ-สกุล"
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="G*"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1" placeholder="วันเกิด (วัน/เดือน/ปี)">
                                        <div className="flex justify-between">
                                            <label htmlFor="input-state-3" className="form-label">
                                                <span id="input-state-3" className="text-red-600">
                                                    *{" "}
                                                </span>{" "}
                                                วันเกิด (วัน/เดือน/ปี)
                                            </label>
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
                                                            name="dateOfBirth"
                                                            type="text"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div className="mb-5 relative- text-red-600">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1">
                                        <div className="flex justify-between">
                                            <label htmlFor="input-state-3" className="form-label">
                                                ช่องทางการสมัคร
                                            </label>
                                            
                                        </div>
                                        <div className="errorMessage">
                                            <select
                                                className="tom-select non-searchable"
                                                id=""
                                                name="channel"
                                                field="[object Object]"
                                                hidden="true"
                                            >
                                                <option value="เพื่อนแนะนำ">เพื่อนแนะนำ</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Google">Google</option>
                                            </select>
                                            <select
                                                className="tom-select non-searchable tomselected"
                                                id="tomselect-3"
                                                name="channel"
                                                field="[object Object]"
                                                tabIndex={-1}
                                                hidden="hidden"
                                            >
                                                <option value="เพื่อนแนะนำ" selected="true">
                                                    เพื่อนแนะนำ
                                                </option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Google">Google</option>
                                            </select>
                                            <div className="ts-control tom-select non-searchable single input-hidden">
                                                <div className="items ts-input full has-items">
                                                    <div data-value="เพื่อนแนะนำ" className="item">
                                                        เพื่อนแนะนำ
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
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">Register IP</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="Register IP"
                                                disabled={true}
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="G*"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                name="ip"
                                                value={formData.ip}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">Pincode [เข้า WEB]</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="จำนวน 6 หลัก"
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="######"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                name="pin"
                                                value={formData.passkeyweb}
                                                onChange={handleInputChange}
                                                disabled
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">Pincode [เข้า GG]</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="จำนวน 6 หลัก"
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="######"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                name="pin"
                                                value={formData.pin}
                                                onChange={handleInputChange}
                                                disabled
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1">
                                        <div className="flex justify-between">
                                            <label htmlFor="input-state-3" className="form-label">
                                                สถานะ
                                            </label>
                                            
                                        </div>
                                        <div className="errorMessage">
                                            <select
                                                className="tom-select non-searchable"
                                                id=""
                                                name="status"
                                                field="[object Object]"
                                                hidden="true"
                                            >
                                                <option value={1}>ปกติ</option>
                                                <option value={2}>ไม่เคลื่อนไหว</option>
                                                <option value={5}>เฝ้าระวัง</option>
                                                <option value={6}>ระงับ</option>
                                            </select>
                                            <select
                                                className="tom-select non-searchable tomselected"
                                                id="tomselect-4"
                                                name="status"
                                                field="[object Object]"
                                                tabIndex={-1}
                                                hidden="hidden"
                                            >
                                                <option value={1} selected="true">
                                                    ปกติ
                                                </option>
                                                <option value={2}>ไม่เคลื่อนไหว</option>
                                                <option value={5}>เฝ้าระวัง</option>
                                                <option value={6}>ระงับ</option>
                                            </select>
                                            <div className="ts-control tom-select non-searchable single input-hidden">
                                                <div className="items ts-input full has-items">
                                                    <div data-value={1} className="item">
                                                        ปกติ
                                                    </div>
                                                    <input
                                                        type="select-one"
                                                        autoComplete="off"
                                                        size={1}
                                                        tabIndex={0}
                                                        role="combobox"
                                                        haspopup="listbox"
                                                        aria-expanded="false"
                                                        aria-controls="tomselect-4-ts-dropdown"
                                                        id="tomselect-4-tomselected"
                                                    />
                                                </div>
                                                <div
                                                    className="ts-dropdown single tom-select non-searchable"
                                                    style={{ display: "none" }}
                                                >
                                                    <div
                                                        role="listbox"
                                                        id="tomselect-4-ts-dropdown"
                                                        tabIndex={-1}
                                                        className="ts-dropdown-content"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5 relative"></div>
                                    </div>
                                </div> */}
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="py-1 w-full">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="input-state-3"
                                                className="form-label flex items-center"
                                            >

                                                <span className="!pl-1">URL</span>

                                            </label>

                                        </div>
                                        <div className="input-group">

                                            <input
                                                className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                placeholder="URL"
                                                type="text"
                                                maxLength=""
                                                autoComplete="off"
                                                data-mask="G*"
                                                data-mask-inited="true"
                                                data-mask-raw-value=""
                                                disabled

                                                name="url"
                                                value={formData.url}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                        <div className="mb-5 relative">


                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex flex-col border-b pb-4">
                                        <label
                                            className="form-check-label mt-0 mx-0 mb-2"
                                            htmlFor="notes"
                                        >
                                            หมายเหตุ
                                        </label>
                                        <textarea
                                            placeholder="หมายเหตุ"
                                            className="border rounded p-3"
                                            name="ref"
                                            value={formData.ref}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 text-xs">
                                {/* <span className="">ยอดเสียปัจจุบัน: 4</span> */}
                                <div className="pt-0 mt-0">
                                    <span className="block">
                                        {/* สมัครเมื่อ: 28/05/2024 (2 วันที่แล้ว){" "} */}
                                        สมัครเมื่อ: {formatDateTime(props.datamember.createdAt,14)} {" "}
                                    </span>
                                    <span className="block">ฝากครั้งแรก: {formatCurrency(props.datamember.firstDeposit)} THB</span>
                                    <span className="block">ฝากรวม: {props.datamember.depositCount} ครั้ง, {formatCurrency(props.datamember.totalDeposit)} THB</span>
                                    <span className="block">ถอนรวม: {props.datamember.withdrawCount} ครั้ง, {formatCurrency(props.datamember.totalWithdraw)} THB</span>
                                    <span className="block">ดุล: {formatCurrency(props.datamember.totalDeposit - props.datamember.totalWithdraw)}  THB</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="rounded-lg shadow-lg mb-4">
                                <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                    <h1 className="text-base font-display mr-auto text-white flex items-center">
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
                                            className="feather feather-file-minus w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1={9} y1={15} x2={15} y2={15} />
                                        </svg>{" "}
                                        บัญชีธนาคาร
                                    </h1>
                                    <button
                                        className="font-medium btn bg-green-600 border border-green-600 text-white font-display btn btn-md font-medium btn bg-green-600 border border-green-600 text-white font-display"
                                        type="button"
                                        onClick={handleModalAddBank}
                                    >
                                        เพิ่มบัญชี
                                    </button>
                                </div>
                                <div className="p-4">
                                    {bank && bank.map((data) => {
                                        /*
                                                                    style={{ backgroundColor: `${bankColor[data?.bankName.toUpperCase()]}` }}
                                                                >
                                                                    <img
                                                                        className="h-4 w-4 object-contain"

                                                                        src={bankLabelImage[data?.bankName.toUpperCase()]}
                                                                        alt={data?.bankName.toUpperCase()}
                                        */
                                        return (
                                            <div className="flex items-center gap-2 mb-2">
                                                {/* <p onClick={() => console.log(data)}>{data.id}</p> */}
                                                <div
                                                    className="p-0.5 flex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded"
                                                    style={{ backgroundColor: `${bankColor[data?.bankName.toUpperCase()]}` }}
                                                >
                                                    <img
                                                        className="w-8 h-8 rounded object-contain"
                                                        src={bankLabelImage[data?.bankName.toUpperCase()]}
                                                        alt={data?.bankName.toUpperCase()}
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-start">
                                                    <div>{data.bankName}</div>
                                                    <div className="flex items-center text-xs lg:text-sm">
                                                        <div>{data.accountName}</div>
                                                        <div className="pl-1">({data.accountNumber})</div>
                                                    </div>
                                                </div>
                                                <button
                                                    className={data.default ? `ml-auto font-medium btn bg-green-600 border border-green-600 text-white font-display btn btn-md`
                                                        : `ml-auto font-medium btn bg-blue-600 border border-blue-600 text-white font-display btn btn-md`
                                                    }
                                                    type="button"
                                                    onClick={() => handleSetDefaultBank(data)}
                                                    disabled={data.default}
                                                >
                                                    {data.default ? "บัญชีหลัก" : "ตั้งเป็นบัญชีหลัก"}
                                                </button>
                                                {!data.default && <button
                                                    className={`font-medium btn bg-red-600 border border-red-600 text-white font-display btn btn-md`}
                                                    type="button"
                                                    onClick={() => handleDeleteUserBank(data)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20px" // Adjusted size
                                                        height="20px" // Adjusted size
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-trash-2"
                                                    >
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                        <path d="M10 11v6" />
                                                        <path d="M14 11v6" />
                                                        <rect x="5" y="3" width="14" height="4" rx="1" ry="1" />
                                                    </svg>
                                                </button>}
                                            </div>
                                        );

                                    })}

                                </div>
                            </div>
                            <div className="rounded-lg shadow-lg mb-4">
                                <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                    <h1 className="text-base font-display mr-auto text-white flex items-center">
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
                                            className="feather feather-phone w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>{" "}
                                        การติดต่อ
                                    </h1>
                                </div>
                                <div className="grid grid-cols-12 gap-4 p-4">
                                    <div className="col-span-12">

                                        <div className="py-1">
                                            <label htmlFor="phone" className="form-label">
                                                เบอร์โทร
                                            </label>
                                            <div className="input-group">

                                                <input
                                                    className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                    placeholder="เบอร์โทร"
                                                    type="text"
                                                    maxLength=""
                                                    autoComplete="off"
                                                    data-mask="G*"
                                                    data-mask-inited="true"
                                                    data-mask-raw-value=""
                                                    name="phonenumber"
                                                    value={formData.phonenumber}
                                                    onChange={handleInputChange}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="py-1 w-full">
                                            <div className="flex justify-between">
                                                <label
                                                    htmlFor="input-state-3"
                                                    className="form-label flex items-center"
                                                >
                                                    <span className="!pl-1">ไลน์ไอดี</span>

                                                </label>

                                            </div>
                                            <div className="input-group">

                                                <input
                                                    className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                                                    placeholder="ไลน์ไอดี"
                                                    type="text"
                                                    maxLength=""
                                                    autoComplete="off"
                                                    data-mask="G*"
                                                    data-mask-inited="true"
                                                    data-mask-raw-value=""
                                                    name="lineId"
                                                    value={formData.lineId}
                                                    onChange={handleInputChange}
                                                />

                                            </div>
                                            <div className="mb-5 relative">


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="rounded-lg shadow-lg mb-4">
                                <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                    <h1 className="text-base font-display mr-auto text-white flex items-center">
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
                                            className="feather feather-settings w-4 h-4 mr-3 text-white w-4 h-4 mr-3 text-white"
                                        >
                                            <circle cx={12} cy={12} r={3} />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>{" "}
                                        ตั้งค่าเกม
                                    </h1>
                                </div>
                                <div className="p-4 relative w-full">
                                    <span className="flex items-center">
                                        เปิดเกมทั้งหมด
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
                                            className="feather feather-chevrons-right mx-1 mx-1"
                                        >
                                            <polyline points="13 17 18 12 13 7" />
                                            <polyline points="6 17 11 12 6 7" />
                                        </svg>{" "}
                                        SLOT, SPORT, CASINO{" "}
                                    </span>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            className="btn btn-dark w-36 shadow btn btn-md btn btn-dark w-36 shadow"
                                            type="button"
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
                                                className="feather feather-crosshair mr-2 mr-2"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <line x1={22} y1={12} x2={18} y2={12} />
                                                <line x1={6} y1={12} x2={2} y2={12} />
                                                <line x1={12} y1={6} x2={12} y2={2} />
                                                <line x1={12} y1={22} x2={12} y2={18} />
                                            </svg>
                                            <span className="pl-1">เปิดเกมทั้งหมด</span>
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="rounded-lg shadow-lg">
                                <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                    <h1 className="text-base font-display mr-auto text-white flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true"
                                            role="img"
                                            className="mr-2 iconify iconify--ri"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M9.335 11.502h2.17a4.5 4.5 0 0 1 4.5 4.5H9.004v1h8v-1a5.578 5.578 0 0 0-.885-3h2.886a5 5 0 0 1 4.516 2.852c-2.365 3.12-6.194 5.149-10.516 5.149c-2.761 0-5.1-.59-7-1.625v-9.304a6.968 6.968 0 0 1 3.33 1.428m-4.33 7.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm13-14a3 3 0 1 1 0 6a3 3 0 0 1 0-6m-7-3a3 3 0 1 1 0 6a3 3 0 0 1 0-6"
                                            />
                                        </svg>{" "}
                                        ตั้งค่าคอมมิชชั่น (แนะนำเพื่อน)
                                    </h1>
                                </div>
                                <div className="grid grid-cols-12 gap-4 p-4">
                                    <div className="col-span-12">
                                        <div className="py-1">
                                            <label
                                                htmlFor="setting-member-comm"
                                                className="form-label"
                                            >
                                                เปอร์เซ็นค่าคอมมิชชั่น
                                            </label>
                                            <div className="rounded h-[38px] border px-4 py-2 relative bg-[#f1f5f9]">
                                                5
                                                <div className="absolute top-2.5 right-2.5 flex self-center cursor-pointer">
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
                                                        className="feather feather-edit"
                                                    >
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="rounded-lg shadow-lg">
                                <div className="flex flex-col sm:flex-row items-center px-3 py-1.5 bg-gray-600 border-gray-200 rounded-t">
                                    <h1 className="text-base font-display mr-auto text-white flex items-center">
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
                                            className="feather feather-star mr-2 mr-2"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>{" "}
                                        ตั้งค่าระดับสมาชิก
                                    </h1>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center flex-wrap gap-1">
                                        <div className="py-1 w-full">
                                            <label
                                                htmlFor="setting-member-comm"
                                                className="form-label"
                                            >
                                                กลุ่มลูกค้า
                                            </label>
                                            <div className="rounded h-[38px] border px-4 py-2 relative bg-[#f1f5f9]">
                                                ฝากเงินแล้ว (Silver){" "}
                                                <div className="absolute top-2.5 right-2.5 flex self-center cursor-pointer">
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
                                                        className="feather feather-edit"
                                                    >
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
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

            <div
                data-backdrop="static"
                style={{ display: modalAddBank ? "" : "none" }}
                className="modal overflow-y-auto show z-[60] m-0 p-0"
            >
                <div className="w-11/12 lg:w-8/12 xl:w-5/12 2xl:w-4/12 modal-dialog mx-auto my-3 flex justify-center items-center">
                    <div className="modal-content">
                        <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                            <h2 className="font-medium font-display mr-auto text-lg">
                                เพิ่มบัญชี
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
                                onClick={() => setmodalAddBank(false)}
                            >
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>
                        {/* <form noValidate="" className="p-4" > */}
                        <form noValidate="" className="p-4" onSubmit={handelSubmitAddUserBank}>
                            {/* <div className="flex gap-6 mb-5">
                            </div> */}

                            <div className="col-span-12 sm:col-span-6">
                                <label htmlFor="bank" className="form-label">
                                    <span className="text-danger">* </span>ธนาคาร
                                </label>
                                <div className="w-full mt-1" id="bank">
                                    <div className="relative mt-1" data-headlessui-state="">
                                        <div className="relative w-full">
                                            <Select
                                                className="basic-single w-full"
                                                classNamePrefix="select"
                                                defaultValue={options[0]}
                                                onChange={(e) => setselectAddUser(e.value)}
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={false}
                                                name="bankadduser"
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="py-1">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="form-label flex items-center">
                                        <span>
                                            <i className="text-danger">* </i> เลขบัญชี
                                        </span>
                                    </label>
                                    <button
                                        className="btn btn-warning ml-auto disabled:bg-gray-500 disabled:border-gray-500"
                                        onClick={handleCheckUserBank}
                                    >
                                        {loadingCheckBank && <div
                                            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                            role="status">
                                            <span
                                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>}

                                        {!loadingCheckBank && <span className="pl-0">เช็คบัญชี</span>}
                                    </button>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="border-gray-300 form-control border block focus:outline-none z-0"
                                        name="accountNumber"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-5 relative"></div>
                            </div>

                            <div className="py-1">
                                <div className="flex justify-between">
                                    <label className="form-label flex items-center">
                                        <span>
                                            <i className="text-danger">* </i> ชื่อบัญชี
                                        </span>
                                    </label>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="border-gray-300 form-control border block focus:outline-none z-0"
                                        name="accountName"
                                        inputMode="text"
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-5 relative"></div>
                            </div>







                            <div className="flex justify-end pt-4 border-t">
                                <button
                                    type="submit"
                                    className="btn btn-primary mr-4 disabled:bg-gray-500 disabled:border-gray-500"
                                >
                                    <span className="pl-1">บันทึก</span>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    type="button"
                                    onClick={() => setmodalAddBank(false)}
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


        </div >

    )
})

export default MemberList
