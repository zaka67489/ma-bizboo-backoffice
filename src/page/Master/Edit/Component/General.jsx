
import { useNavigate } from "react-router-dom";
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { getCurrentTimeInUTC7, formatTimeDifference, formatDateTime } from '../../../../Model/Function';
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
            console.log("formData:", formData);
            axios.put(`${API}/master-settings/${props.datamember.id}`, formData, {
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
        id: "",
        domainname: "",
        afbApiUri: "",
        brandcode: "",
        agent: "",
        agentKey: "",
        DATABASE_URL: "",
        SECKEY: "",
        VERSION: "",
        REDISSERVER: "",
        REDISPORT: "",
        APIKEY: "",
        BANKURL: "",
        AGENTURL: "",
        MAINIP: "",
        logo: "",
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        if (props.datamember) {
            // console.log('props.datamember',props.datamember);
            setFormData(props.datamember);
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

    const handleChangeEditMaster = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [newLogo, setNewLogo] = useState(null);

    const handleLogoChange = (e) => {
        setNewLogo(e.target.files[0]);
    };
    
    const handleUploadLogo = async () => {
        if (!newLogo) {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "กรุณาเลือกไฟล์โลโก้ก่อน!",
            icon: "warning",
          });
          return;
        }
      
        const formData = new FormData();
        formData.append("file", newLogo);
      
        try {
          let res = await ApiCall("PUT", `/master-settings/${props.datamember.id}/logo`, formData);
      
          if (res.status === "success") {
            Swal.fire({
              title: "สำเร็จ",
              text: "อัปโหลดโลโก้สำเร็จ!",
              icon: "success",
            });
            if (props.onSuccess) {
              props.onSuccess(); // อัปเดตโลโก้ใหม่ในหน้าจอ
            }
          } else {
            Swal.fire({
              title: "แจ้งเตือน",
              text: "ผิดพลาด กรุณาติดต่อแอดมิน",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error uploading logo:", error);
          Swal.fire({
            title: "ข้อผิดพลาด",
            text: "ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง",
            icon: "error",
          });
        }
      };
      

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
                                    ข้อมูลพื้นฐาน เว็บมาสเตอร์
                                </h1>
                            </div>
                            <div className="grid grid-cols-12 gap-4 p-4">
                                {Object.keys(formData)
                                    .filter((key) => !['id', 'logo', 'updatedAt', 'createdAt'].includes(key))
                                    .map((key) => (
                                        <div className="col-span-12 sm:col-span-6">
                                            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                                                {key}
                                            </label>
                                            <input
                                                type="text"
                                                name={key}
                                                id={key}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={formData[key]}
                                                onChange={handleChangeEditMaster}
                                                placeholder={`Enter ${key}`}
                                                required
                                            />
                                        </div>
                                    ))}




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
                                            className="feather feather-image w-4 h-4 mr-3 text-white"
                                        >
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>{" "}
                                        จัดการโลโก้
                                    </h1>
                                </div>
                                <div className="grid grid-cols-12 gap-4 p-4">
                                    <div className="col-span-12">
                                        <div className="py-1">
                                            <label htmlFor="current-logo" className="form-label">
                                                โลโก้ปัจจุบัน
                                            </label>
                                            <img
                                                id="current-logo"
                                                width={140}
                                                src={`${API}/${props.datamember.logo}`}
                                                alt="Current Logo"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="py-1 w-full">
                                            <label htmlFor="new-logo" className="form-label flex items-center">
                                                <span className="!pl-1">แก้ไขโลโก้</span>
                                            </label>
                                            <input
                                                id="new-logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                                className="mt-2"
                                            />
                                            <button
                                                onClick={handleUploadLogo}
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                อัปโหลดโลโก้ใหม่
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

                        <form noValidate="" className="p-4" onSubmit={handelSubmitAddUserBank}>


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
