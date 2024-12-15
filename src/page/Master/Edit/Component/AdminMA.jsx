import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2';
import { Api } from "@/util/api";
import Select from 'react-select';

function generateRandomPassword(length = 8) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

// function StaffList() {
const StaffList = forwardRef((props, ref) => {
    console.log('props:', props)

    const { userid } = useParams();
    const id = userid;
    const [role, setRole] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [accessToken, setaccessToken] = useState("");
    const [modalAddStaff, setModaladdStaff] = useState(false);
    const [modalEditStaff, setModalEditStaff] = useState(false);
    const [modalPasswordEditStaff, setModalPasswordEditStaff] = useState(false);
    const [randomPin, setRandonpin] = useState(generateRandomPassword());
    
    const [formData, setFormData] = useState({
        username: '',
        pin: randomPin,
        name: '',
        lastName: '',
        password: randomPin,
        roleId: null,
        remark: ''
    });
    const [editFormData, setEditFormData] = useState({
        username: '',
        name: '',
        lastName: '',
        roleId: null
    });
    const [selectAddUser, setselectAddUser] = useState('');
    const [editStaffId, setEditStaffId] = useState(null);

    const loggedInUser = localStorage.getItem("loggedInUser");
    const navigate = useNavigate();

    const fetchRolesData = async () => {
        let res = await Api("GET", "/staff-master/roles", {});
        if (res.status === 'success') {
            setRole(res.roles);
        }
    };

    const fetchStaffsData = async () => {
        let res = await Api("GET", `/master-setting-staffma/${userid}`, {});
        if (res.status === 'success') {
            setStaffs(res.staffs);
        }
    };

    useEffect(() => {
        if (loggedInUser) {
            setaccessToken(JSON.parse(loggedInUser).accessToken);
            setIsloading(false);
            fetchRolesData();
            fetchStaffsData();
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (role.length > 0) {
            setselectAddUser(role[0].id);
            setFormData((prevState) => ({
                ...prevState,
                roleId: role[0].id,
                type: role[0].roleNameEn
            }));
        }
    }, [role]);

    useEffect(() => {
        const initialState = {};
        staffs.forEach((staff) => {
            initialState[staff.id] = staff.status === 'A';
        });
        setCheckboxStates(initialState);
    }, [staffs]);

    const handleCheckboxChange = (id) => {
        setCheckboxStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setselectAddUser(selectedOption.value);
        setFormData((prevState) => ({
            ...prevState,
            roleId: selectedOption.value
        }));
    };

    const handleEditSelectChange = (selectedOption) => {
        setEditFormData((prevState) => ({
            ...prevState,
            roleId: selectedOption.value
        }));
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        try {
            let res = await Api("POST", `/staff-master-ma`, {
                username: `${formData.username}.${props.datamember.brandcode}`,
                pin: formData.password,
                name: formData.name,
                lastName: formData.name,
                type: formData.type,
                roleId: formData.roleId,
                remark: formData.username,
                MasterSettings_id: Number(id)
            });
            if (res.status === 'success') {
                fetchStaffsData();
                setModaladdStaff(false);
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: "เพิ่มพนักงานสำเร็จ",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "แจ้งเตือน!",
                text: "เกิดข้อผิดพลาดในการเพิ่มพนักงาน",
                icon: "error"
            });
        }
    };

    const handleDeleteMasterStaff = async (staffid) => {
        // e.preventDefault();
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบพนักงานนี้หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ใช่, ลบเลย!",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await Api("DELETE", `/staff-master-ma/${staffid}`, {});
                    if (res.status === 'success') {
                        fetchStaffsData();
                        setModaladdStaff(false);
                        Swal.fire({
                            title: "แจ้งเตือน!",
                            text: "ลบพนักงานสำเร็จ",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "แจ้งเตือน!",
                        text: "เกิดข้อผิดพลาดในการลบพนักงาน",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleEditStaff = async (e) => {
        e.preventDefault();
        try {
            let res = await Api("PATCH", `/staff-master/${editStaffId}`, {
                username: editFormData.username,
                name: editFormData.name,
                lastName: editFormData.lastName,
                roleId: editFormData.roleId
            });
            if (res.status === 'success') {
                fetchStaffsData();
                setModalEditStaff(false);
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: "แก้ไขพนักงานสำเร็จ",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "แจ้งเตือน!",
                text: "เกิดข้อผิดพลาดในการแก้ไขพนักงาน",
                icon: "error"
            });
        }
    };

    const handleEditPasswordStaff = async (e) => {
        e.preventDefault();
        try {
            let res = await Api("PATCH", `/staff-master/change-pin/${editStaffId}`, {
                newPin: formData.password
            });
            if (res.status === 'success') {
                fetchStaffsData();
                setModalPasswordEditStaff(false);
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: "แก้ไขพนักงานสำเร็จ",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "แจ้งเตือน!",
                text: "เกิดข้อผิดพลาดในการแก้ไขพนักงาน",
                icon: "error"
            });
        }
    };

    const handleRandomPassword = () => {
        const randomPassword = generateRandomPassword();
        setFormData((prevState) => ({
            ...prevState,
            password: randomPassword
        }));
        console.log(randomPassword);
    };

    const openEditModal = (data) => {
        setEditStaffId(data.id);
        setEditFormData({
            username: data.username,
            name: data.name,
            lastName: data.lastName,
            roleId: data.roleId
        });
        setModalEditStaff(true);
    };

    const openEditPasswordModal = (data) => {
        setEditStaffId(data.id);
        setModalPasswordEditStaff(true);
    };

    const options = role.map(({ id, roleNameTh }) => ({
        value: id,
        label: roleNameTh,
    }));

    const getRoleClass = (role) => {
        switch (role) {
            case 'เจ้าของเว็บ':
                return 'bg-lime-600';
            case 'หัวหน้างาน':
                return 'bg-amber-500';
            case 'การตลาด':
                return 'bg-red-500';
            case 'คอลเซ็นเตอร์':
                return 'bg-gray-500';
            default:
                return 'bg-gray-900'; // Default color
        }
    };

    return (
        <div className="py-2">
            <div className="flex mt-[4.7rem] md:mt-0">
                <div className="content">
                    <div className="grid grid-cols-12 mt-5">
                        <div className="col-span-12 sm:col-span-12">
                            <div className="box px-5 pb-5">
                                <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                                    <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
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
                                            className="feather feather-file-text w-6 h-6 mr-3 text-blue-800 inline"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1={16} y1={13} x2={8} y2={13} />
                                            <line x1={16} y1={17} x2={8} y2={17} />
                                            <polyline points="10 9 9 9 8 9" />
                                        </svg>{" "}
                                        รายชื่อแอดมิน MA ทั้งหมด
                                    </h2>
                                    <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                                        <button
                                            className="btn bg-green-600 text-white font-display"
                                            type="button"
                                            onClick={() => setModaladdStaff(true)}
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
                                                className="feather feather-user-plus mr-1.5"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <line x1={20} y1={8} x2={20} y2={14} />
                                                <line x1={23} y1={11} x2={17} y2={11} />
                                            </svg>{" "}
                                            เพิ่มแอดมิน MA
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="text-xs border w-full">
                                        <thead>
                                            <tr className="text-sm bg-gray-700 dark:bg-dark-1 text-white px-half">
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center">
                                                    #
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center">
                                                    สถานะ
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-left w-48">
                                                    ยูสเซอร์เข้าระบบ
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center w-32">
                                                    ประเภท
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-left">
                                                    ชื่อ
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center w-40">
                                                    ล็อกอินล่าสุด
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center w-40">
                                                    วันที่สร้าง
                                                </th>
                                                <th className="px-2 py-1 border dark:border-dark-5 whitespace-nowrap font-display text-center w-36">
                                                    แก้ไข
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {staffs && staffs.map((data, index) => (
                                                <tr key={data.id} className="hover:bg-yellow-100 px-half even:bg-blue-50">
                                                    <td className="px-2 py-1 border text-center w-14 number-display">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-2 py-1 border text-center w-20">
                                                        <div className="relative flex justify-center items-center h-5">
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={checkboxStates[data.id] || false}
                                                                    onChange={() => handleCheckboxChange(data.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-1 border min-w-max">{data.username}</td>
                                                    <td className="px-2 py-1 border">
                                                        <div className="min-w-max flex justify-center">
                                                            <span className={`rounded-md text-xs text-white px-2 py-0.5 w-24 text-center block ${getRoleClass(data.MasterStaff_RoleRoleNameTh)}`}>
                                                                {data.MasterStaff_RoleRoleNameTh}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-1 border min-w-max">
                                                        <div className="min-w-max">{data.name}</div>
                                                    </td>
                                                    <td className="px-2 py-1 border number-display text-center text-xs font-medium text-neutral-500">
                                                        {data.lastLogin}
                                                    </td>
                                                    <td className="px-2 py-1 border number-display text-center text-xs italic text-slate-500">
                                                        {data.createdAt}
                                                    </td>
                                                    <td className="px-2 py-1 border">
                                                        <div className="flex items-center w-28">
                                                            <div className="flex flex-col items-center w-28">
                                                                <button
                                                                    className="btn btn-primary-soft flex mb-2 px-2 w-[59px] btn py-1 text-xs"
                                                                    type="button"
                                                                    onClick={() => openEditModal(data)}
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
                                                                        className="feather feather-edit-2 w-2.5"
                                                                    >
                                                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                                                    </svg>
                                                                    <span className="pl-1">แก้ไข</span>
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary-soft flex px-2 w-[59px] btn py-1 text-xs"
                                                                    type="button"
                                                                    onClick={() => openEditPasswordModal(data)}
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
                                                                        className="feather feather-edit-2 w-2.5"
                                                                    >
                                                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                                                    </svg>
                                                                    <span className="pl-1">รหัสผ่าน</span>
                                                                </button>
                                                            </div>

                                                            <button
                                                                className="btn btn-danger-soft flex px-2 btn py-1 text-xs"
                                                                type="button"
                                                                onClick={() => handleDeleteMasterStaff(data.id)}
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
                                                                    className="feather feather-trash-2"
                                                                >
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                    <line x1={10} y1={11} x2={10} y2={17} />
                                                                    <line x1={14} y1={11} x2={14} y2={17} />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr
                                                className="bg-yellow-50 py-2 text-center"
                                                style={{ display: "none" }}
                                            >
                                                <td className="px-2 py-1" colSpan={9}>
                                                    ไม่มีข้อมูล
                                                </td>
                                            </tr>
                                            <tr style={{ display: "none" }}>
                                                <td colSpan={9} className="px-2 py-1 text-center">
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
                                                                className="feather feather-loader w-8 h-8 block text-blue-500"
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
                                        <ul className="Pagination">
                                            <li className="PaginationControl">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="Control"
                                                >
                                                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z" />
                                                </svg>
                                            </li>
                                            <li className="PaginationControl">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="Control"
                                                >
                                                    <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
                                                </svg>
                                            </li>
                                            <li>
                                                <button
                                                    className="Page Page-active"
                                                    type="button"
                                                    aria-label="Go to page 1"
                                                    style={{ backgroundColor: "rgb(220, 237, 255)" }}
                                                >
                                                    1
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="Page"
                                                    type="button"
                                                    aria-label="Go to page 2"
                                                    style={{ backgroundColor: "transparent" }}
                                                >
                                                    2
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="Page"
                                                    type="button"
                                                    aria-label="Go to page 3"
                                                    style={{ backgroundColor: "transparent" }}
                                                >
                                                    3
                                                </button>
                                            </li>
                                            <li className="PaginationControl">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="Control Control-active"
                                                >
                                                    <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                                                </svg>
                                            </li>
                                            <li className="PaginationControl">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="Control Control-active"
                                                >
                                                    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41M16 6h2v12h-2V6z" />
                                                </svg>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* เพิ่มพนักงาน */}
                    <div
                        data-backdrop="static"
                        className="modal overflow-y-auto show z-[60] m-0 p-0"
                        style={{ display: !modalAddStaff ? 'none' : '' }}
                    >
                        <div className="w-11/12 sm:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12 modal-xl modal-dialog mx-auto my-3 flex justify-center items-center">
                            <div className="modal-content">
                                <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                                    <h2 className="font-medium font-display mr-auto text-lg">
                                        เพิ่มแอดมิน MA
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
                                        className="feather feather-x cursor-pointer"
                                        onClick={() => setModaladdStaff(false)}
                                    >
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                                <div className="intro-y p-4 box">
                                    <form noValidate="">
                                        <div className="grid grid-cols-12 sm:col-span-6">
                                            <div className="col-span-12 sm:col-span-6 sm:pr-4">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="input-name"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">ชื่อ</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="input-name"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="name"
                                                            placeholder="ชื่อ"
                                                            type="text"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="input-username"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">username</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="input-username"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="username"
                                                            placeholder="username"
                                                            type="text"
                                                            value={formData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-0 w-full">
                                                    <div className="flex justify-between">
                                                        <label htmlFor="input-username" className="form-label flex items-center">
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">Username</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group flex items-center border rounded border-gray-300">
                                                        <input
                                                            id="input-username"
                                                            className="z-0 px-4 py-2 intro-x login__input form-control focus:outline-none flex-1"
                                                            name="username"
                                                            placeholder="username"
                                                            type="text"
                                                            value={formData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="px-4 py-2 bg-gray-100 text-gray-500 border-l"> .{props.datamember.brandcode} </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="input-role"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">สิทธิ</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <Select
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            classNamePrefix="select"
                                                            defaultValue={options[0]}
                                                            value={options.find(option => option.value === selectAddUser)}
                                                            onChange={handleSelectChange}
                                                            options={options}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="input-password"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">รหัสผ่าน</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="input-password"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="password"
                                                            placeholder="รหัสผ่าน"
                                                            type="text"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-10 mt-2 lowercase text-xs">
                                                        <div className="text-danger col-span-7" />
                                                        <div
                                                            className="underline cursor-pointer text-blue-500 col-span-3 text-end min-w-max block"
                                                            onClick={handleRandomPassword}
                                                        >
                                                            สุ่มรหัสผ่าน
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button
                                                className="btn btn-primary btn-md"
                                                type="submit"
                                                onClick={handleAddStaff}
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
                                                    className="feather feather-plus-circle"
                                                >
                                                    <circle cx={12} cy={12} r={10} />
                                                    <line x1={12} y1={8} x2={12} y2={16} />
                                                    <line x1={8} y1={12} x2={16} y2={12} />
                                                </svg>
                                                <span className="pl-1">เพิ่ม</span>
                                            </button>
                                            <button
                                                className="btn btn-outline-dark ml-3 btn-md"
                                                type="button"
                                                onClick={() => setModaladdStaff(false)}
                                            >
                                                <span className="pl-1">ปิด</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* จบ เพิ่มพนักงาน */}
                    {/* แก้ไขพนักงาน */}
                    <div
                        data-backdrop="static"
                        className="modal overflow-y-auto show z-[60] m-0 p-0"
                        style={{ display: !modalEditStaff ? 'none' : '' }}
                    >
                        <div className="w-11/12 sm:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12 modal-xl modal-dialog mx-auto my-3 flex justify-center items-center">
                            <div className="modal-content">
                                <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                                    <h2 className="font-medium font-display mr-auto text-lg">
                                        แก้ไขพนักงาน MA
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
                                        className="feather feather-x cursor-pointer"
                                        onClick={() => setModalEditStaff(false)}
                                    >
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                                <div className="intro-y p-4 box">
                                    <form noValidate="">
                                        <div className="grid grid-cols-12 sm:col-span-6">
                                            <div className="col-span-12 sm:col-span-6 sm:pr-4">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="edit-input-name"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">ชื่อ</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="edit-input-name"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="name"
                                                            placeholder="ชื่อ"
                                                            type="text"
                                                            value={editFormData.name}
                                                            onChange={handleEditInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="edit-input-username"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">username</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="edit-input-username"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="username"
                                                            placeholder="username"
                                                            type="text"
                                                            value={editFormData.username}
                                                            onChange={handleEditInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="edit-input-role"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">สิทธิ</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <Select
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            classNamePrefix="select"
                                                            value={options.find(option => option.value === editFormData.roleId)}
                                                            onChange={handleEditSelectChange}
                                                            options={options}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button
                                                className="btn btn-primary btn-md"
                                                type="submit"
                                                onClick={handleEditStaff}
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
                                                    className="feather feather-save"
                                                >
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v13a2 2 0 0 1-2 2z" />
                                                    <polyline points="17 21 17 13 7 13 7 21" />
                                                    <polyline points="7 3 7 8 15 8" />
                                                </svg>
                                                <span className="pl-1">บันทึก</span>
                                            </button>
                                            <button
                                                className="btn btn-outline-dark ml-3 btn-md"
                                                type="button"
                                                onClick={() => setModalEditStaff(false)}
                                            >
                                                <span className="pl-1">ปิด</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* จบ แก้ไขพนักงาน */}

                    {/* แก้ไขรหัสผ่านพนักงาน */}
                    <div
                        data-backdrop="static"
                        className="modal overflow-y-auto show z-[60] m-0 p-0"
                        style={{ display: !modalPasswordEditStaff ? 'none' : '' }}
                    >
                        <div className="w-11/12 sm:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12 modal-xl modal-dialog mx-auto my-3 flex justify-center items-center">
                            <div className="modal-content">
                                <div className="bg-secondary modal-header flex justify-between sticky top-0 rounded-t-md z-50">
                                    <h2 className="font-medium font-display mr-auto text-lg">
                                        แก้ไขรหัสผ่านแอดมิน MA
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
                                        className="feather feather-x cursor-pointer"
                                        onClick={() => setModalPasswordEditStaff(false)}
                                    >
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                                <div className="intro-y p-4 box">
                                    <form noValidate="">
                                        <div className="grid grid-cols-12 sm:col-span-6">

                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="py-1 w-full">
                                                    <div className="flex justify-between">
                                                        <label
                                                            htmlFor="input-password"
                                                            className="form-label flex items-center"
                                                        >
                                                            <span className="text-danger">*</span>
                                                            <span className="!pl-1">รหัสผ่าน</span>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            id="input-password"
                                                            className="z-0 !rounded px-4 intro-x login__input form-control border-gray-300 block focus:outline-none"
                                                            name="password"
                                                            placeholder="รหัสผ่าน"
                                                            type="text"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-10 mt-2 lowercase text-xs">
                                                        <div className="text-danger col-span-7" />
                                                        <div
                                                            className="underline cursor-pointer text-blue-500 col-span-3 text-end min-w-max block"
                                                            onClick={handleRandomPassword}
                                                        >
                                                            สุ่มรหัสผ่าน
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-5 flex justify-end">
                                            <button
                                                className="btn btn-primary btn-md"
                                                type="submit"
                                                onClick={handleEditPasswordStaff}
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
                                                    className="feather feather-save"
                                                >
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v13a2 2 0 0 1-2 2z" />
                                                    <polyline points="17 21 17 13 7 13 7 21" />
                                                    <polyline points="7 3 7 8 15 8" />
                                                </svg>
                                                <span className="pl-1">บันทึก</span>
                                            </button>
                                            <button
                                                className="btn btn-outline-dark ml-3 btn-md"
                                                type="button"
                                                onClick={() => setModalPasswordEditStaff(false)}
                                            >
                                                <span className="pl-1">ปิด</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* จบ แก้ไขรหัสผ่านพนักงาน */}
                </div>
            </div>
        </div>
    );
}
)

export default StaffList;
