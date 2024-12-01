import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Swal from "sweetalert2";
import { bankLabelImage, bankColor, BankName } from "@/util/util";
import { Api } from "@/util/api";
import DropDown from "@/Component/Dropdown";
import Modal from "@/Component/Modal";
import MTable from "@/Component/MTable";
import TableTransaction from "@/Component/TableTransaction";

// edit
import EditTable from "./Component/EditBank";

const modalReset = {
  size: "modal-xl",
  showbtn: true,
  type: "save",
  title: "เพิ่มบัญชีธนาคาร",
};

const AddBanks = (props = {}) => {

  
  const [pageaddbank, osetpageAddbank] = useState(props.ispageState);
  const [typeBank,setTypeBank] = useState({});
  const [typeBankMain,setTypeBankMain] = useState({key:"SCB",title:"SCB"});
  const [accountNumber,setaccountNumber] = useState('');

  const [accountName,setaccountName] = useState('');
  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');
  const [phonenumber,setphonenumber] = useState('');

  const [pinnumber,setpinnumber] = useState('');
  const [deviceiD,setdeviceiD] = useState('');

  const setpageAddbank = (page) => {

    if(typeBank?.key === undefined && page === 2){
      Swal.fire("แจ้งเดือน", "กรุณาระบุข้อมูลให้ถูกต้อง", "warning");
    }
    else if(typeBankMain?.key === undefined && page === 3){
      Swal.fire("แจ้งเดือน", "กรุณาระบุข้อมูลให้ถูกต้อง", "warning");
    }
    else if((accountNumber.length < 10 || pinnumber.length < 6 || deviceiD.length < 10) && page === 3){
      Swal.fire("แจ้งเดือน", "กรุณาระบุข้อมูลเลขบัญชี PIN DeviceID ให้ถูกต้อง", "warning");
    }
    else{
      if(page < 3){
        osetpageAddbank(page);

      }
      else{
        props.callback({
          type:'addbank',
          title:`เพิ่มธนาคาร - ${accountNumber}`,
          respone:{
            id:null,
            accountNumber:accountNumber,
            accountName:accountName,
            user:user,
            password:password,
            phonenumber:phonenumber,
            typeBank:typeBank?.key,
            typeBankMain:typeBankMain?.key,
            pinnumber:pinnumber,
            deviceiD:deviceiD,
            step:pageaddbank
          }
       })
      }
    }
  }

  const callbackSet = (e) => {
    setTypeBank(e)
  }


  const callbackBank = (e) => {
    setTypeBankMain(e)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="mx-4 px-4 pb-2 pt-4 flex items-center">
        <div className="flex items-center text-primary relative">
          <div className={pageaddbank === 1 ? `border-primary text-primary rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 border-primary flex justify-center items-center` : `border-primary text-primary rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 border-primary flex justify-center items-center text-gray-500  border-gray-300`}>
            <span className="font-medium">1</span>
          </div>
          <div className={pageaddbank === 1 ? `text-blue-500 absolute top-0 -ml-12 text-center mt-10 w-32 text-xs font-medium text-primary` :  `text-gray-500 absolute top-0 -ml-12 text-center mt-10 w-32 text-xs font-medium text-primary`}>
            ประเภทบัญชี
          </div>
        </div>
        <div className={pageaddbank === 2 ? `flex-auto border-t-2 transition duration-500 ease-in-out border-primary ` : `flex-auto border-t-2 transition duration-500 ease-in-out border-primary border-gray-300` } />
        <div className={pageaddbank === 2 ? `flex items-center  relative text-blue-500 border-primary` : `flex items-center text-gray-500 relative`}>
          <div className="text-gray-500 rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 flex justify-center items-center">
            <span className="font-medium">2</span>
          </div>
          <div className={pageaddbank === 2 ? `absolute top-0 -ml-12 text-center mt-10 w-32 text-xs font-medium text-blue-500 ` : `text-gray-500 absolute top-0 -ml-12 text-center mt-10 w-32 text-xs font-medium`}>
            ยืนยันบัญชีธนาคาร
          </div>
        </div>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
        <div className="flex items-center text-gray-500 relative">
          <div className="text-gray-500 rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 flex justify-center items-center">
            <span className="font-medium">3</span>
          </div>
          <div className="text-gray-500 absolute top-0 -ml-12 text-center mt-10 w-32 text-xs font-medium">
            ตั้งค่าการใช้งาน
          </div>
        </div>
      </div>
      <div className="pb-5 pt-8">
        <div
          className="px-5"
          style={{ display: pageaddbank === 1 ? "" : "none" }}
        >
          <div className="py-1">
            <div className="flex justify-between">
              <label htmlFor="input-state-3" className="form-label">
                <span className="text-danger">* </span>ประเภทบัญชี
              </label>
            </div>
            <div className="errorMessage">
              <select
                className="tom-select non-searchable"
                id=""
                name="bankKind"
                field="[object Object]"
                hidden="true"
              >
                <option disabled="" value="">
                  เลือกประเภทบัญชี
                </option>
                <option value="true">บัญชีออโต้</option>
                <option value="false">บัญชีโยกเงิน</option>
              </select>
              <select
                className="tom-select non-searchable tomselected"
                id="tomselect-44"
                name="bankKind"
                field="[object Object]"
                tabIndex={-1}
                hidden="hidden"
              >
                <option value="true" selected="true">
                  บัญชีออโต้
                </option>
                <option disabled="" value="">
                  เลือกประเภทบัญชี
                </option>
                <option value="false">บัญชีโยกเงิน</option>
              </select>
              <div className="ts-control tom-select non-searchable single input-hidden">
              <DropDown text="เลือกบัญชี" subtext="เลือกบัญชี" className="w-full" data={[
                    {key:"BOTH",title:"ทั้งฝากและถอน"},
                    {key:"DEPOSIT",title:"บัญชีฝาก"},
                    {key:"WITHDRAW",title:"บัญชีถอน"}
                  ]} callback={callbackSet} />
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
            <div className="mb-5 relative"></div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary btn btn-md btn btn-primary"
              type="button"
              onClick={() => setpageAddbank(2)}
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
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="pl-1">ถัดไป</span>
            </button>
          </div>
        </div>
        <div style={{ display: pageaddbank === 2 ? "" : "none" }}>
          <form noValidate="" className="p-5 py-0">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-5">
                <label htmlFor="bank" className="form-label">
                  <span className="text-danger">* </span>ธนาคาร
                </label>
                <div className="w-full mt-1" id="bank">
                  <div className="relative mt-1" data-headlessui-state="">
                    <div className="relative">
                      <div className="relative">
                      <DropDown text="SCB" subtext="SCB" className="w-full" data={[
                        {key:"SCB",title:"SCB"},
                        {key:"BAY",title:"กรุงศรีอยุธยา"}
                      ]} callback={callbackBank}/>
                      </div>
                      <button
                        id="headlessui-combobox-button-14"
                        type="button"
                        tabIndex={-1}
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-headlessui-state=""
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
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
                          className="feather feather-chevron-down dark:text-sk-grey-500 dark:text-sk-grey-500"
                          name="arrow-drop-down-fill"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">เลขที่บัญชี</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="accountNumber"
                      placeholder="ระบุ 10-11 หลัก"
                      // onKeyDown={(event) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      defaultValue={accountNumber}
                      onInput={(e) => setaccountNumber(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">PIN [หากไม่มี ใส 000000]</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="pinnumber"
                      placeholder="ระบุ 6 หลัก"
                      // onKeyDown={(event) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      defaultValue={pinnumber}
                      onInput={(e) => setpinnumber(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">Device ID [หากไม่มี ใส 0000000000]</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="deviceiD"
                      placeholder="ระบุ UUID d3c448bb-9e6a-4dcd-a74e-90ba2fdc15d0 หลัก"
                      defaultValue={deviceiD}
                      onInput={(e) => setdeviceiD(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>


              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">ชื่อบัญชี</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="accountName"
                      placeholder="ระบุ ชื่อบัญชี"
                      defaultValue={accountName}
                      onInput={(e) => setaccountName(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>


              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">เบอร์โทร</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="phonenumber"
                      placeholder="ระบุ เบอร์โทร"
                      defaultValue={phonenumber}
                      onInput={(e) => setphonenumber(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">User line หรือ User bank</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="userline"
                      placeholder="ระบุ userlineid"
                      defaultValue={user}
                      onInput={(e) => setUser(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5">
                <div className="py-1 w-full">
                  <div className="flex justify-between">
                    <label
                      htmlFor="input-state-3"
                      className="form-label flex items-center"
                    >
                      <span className="text-danger">*</span>
                      <span className="!pl-1">Password line หรือ Password Bank</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <input
                      className="px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 !rounded"
                      name="passwordline"
                      placeholder="ระบุ PasswordLine"
                      defaultValue={password}
                      onInput={(e) => setPassword(e.target.value)}
                      disabled=""
                      type="text"
                      maxLength=""
                      autoComplete="off"
                      data-mask="G*"
                      data-mask-inited="true"
                      data-mask-raw-value=""
                    />
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>

              <div className="col-span-12 flex items-center mt-2.5 sm:col-span-2">
                <button
                  className="btn bg-green-600 text-white w-full font-display btn btn-md bt font-display"
                  type="button"
                  onClick={() => setpageAddbank(3)}
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
                    className="feather feather-search"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                  </svg>
                  <span className="pl-1">ตรวจสอบ</span>
                </button>
              </div>
            </div>
          </form>

          <div className="flex justify-between pt-5 px-5">
            <button
              className="btn btn-outline-dark btn btn-md btn btn-outline-dark"
              type="button"
              onClick={() => setpageAddbank(1)}
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
                className="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="pl-1">ย้อนกลับ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddAuto = (props = {}) => {
  return (
    <>
      <form noValidate="" className="p-5">
        <div>
          <div className="mb-5">
            <label htmlFor="bank-auto-deposit-input" className="form-label">
              <span className="text-theme-6 text-red-500">* </span>
              {props?.title || `เลือกบัญชีธนาคารฝากออโต้` }
            </label>
            <div className="w-full" id="bank-auto-deposit-input">
              <div className="relative mt-1" data-headlessui-state="">
                <div className="relative">
                  <div className="relative">
                    {/**/}

                    <DropDown text="เลือกบัญชี" subtext="เลือกบัญชี" className="w-full" data={
                      props.reData.map((item) =>
                      ({
                        key:item.id,
                        title: `${item.bankName.toUpperCase()} ${item.accountNo} ${item.accountName}`
                      })
                      )}/>

                  </div>
                </div>
                {/**/}
              </div>
            </div>
          </div>
          <div className="py-1 w-full">
            <div className="flex justify-between">
              <label htmlFor="input-state-3" className="form-label">
                <span className="text-danger">* </span>ระดับสมาชิก
              </label>
              {/**/}
            </div>
            <div className="errorMessage">
             
              <div className="ts-control tom-select non-searchable single input-hidden">
              <DropDown text="ทุกคน" subtext="ทุกคน" className="w-full" data={[
                    {key:"ทุกคน",title:"ทุกคน"}
                  ]}/>
                <div
                  className="ts-dropdown single tom-select non-searchable"
                  style={{ display: "none" }}
                >
                  <div
                    role="listbox"
                    id="tomselect-21-ts-dropdown"
                    tabIndex={-1}
                    className="ts-dropdown-content"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5 relative">{/**/}</div>
          </div>
        </div>
      </form>
    </>
  );
};

function BankList() {
  const [modalAddBank, setModalAddBank] = useState(false);
  const [configModal, setconfigModal] = useState(modalReset);
  const [isLoading, setIsloading] = useState(true);
  const [accessToken, setaccessToken] = useState("");
  const [checkLoading, setcheckLoading] = useState(false);
  const [reData, setresData] = useState([]);
  const [reDataList, setresDatalist] = useState([]);

  const [reDataPayment, setreDataPayment] = useState([]);

  const navigate = useNavigate();
  const [loadComponent, setComponent] = useState(null);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [transactionResult, settransactionResult] = useState([]);

  const [pageState, setPageState] = useState(1);

  const [valUpdate, setvalUpdate] = useState({});

  const [resconfig,setResconfig] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setaccessToken(JSON.parse(loggedInUser).accessToken);
      fetchdataConfig();
        setIsloading(false);
        fetchdata();
        fetchdataPayment("WEB");
      
    } else {
      navigate("/");
    }
  }, []);

  const fetchdata = async () => {
    let res = await Api("GET", "/bankservice", {});
    setresData(res.data);
    setresDatalist(res.data);
    console.log(res.data);
  };

  const fetchdataConfig = async () => {
    let res = await Api("GET", "/configsite", {});
    let xConfig = res.data.find(x => (x?.ConfigName === "withdrawbank" && x?.Configstatus === 1));
    // console.log(xConfig);
    setResconfig(xConfig);
    // console.log(res.data);
    // console.log(resconfig);
  };

  const fetchdataPayment = async (chanel = "WEB", bankid = "") => {
    let res = await Api("POST", "/bankpayment?limit=100", {
      chanel: chanel,
      bankid: bankid,
    });
    setreDataPayment(res.data);
    console.log(res.data);
    return res.data;
  };

  const DeleteBank = async (id) => {

    let res = await Api("POST", "/bankserviceCreateUpdate", {
      id:id,
      isDelete:1,
    });

    if(res.data){
      Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then((x) => {
        reModal(false);
        fetchdata();
        fetchdataPayment("WEB");
        fetchdataConfig();
      });
    }

    // Swal.fire("สถานะการลบ", "ทำรายการสำเร็จ [ปิดการใช้งาน]", "success");
  };

  const updateBankReplace = (id) => {
    let dataFind = reData.find((x) => x.id === id);
    Swal.fire({
      title: "ยืนยันการแทนที่ข้อมูลการถอน",
      html: `<hr className="h-px my-3 bg-gray-200 border-0 ">
       เป็น บัญชีธนาคาร
<div className="flex justify-center items-center text-gray-700 mt-3"><div className="flex rounded px-10"><div className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-16 h-16 rounded-lg" style="background-color: ${bankColor[dataFind?.bankName?.toUpperCase()]};
width: 40px;
margin: auto;
margin-top: 10px;
margin-bottom: 10px;
">
<img className="w-16 h-16 rounded-lg object-contain img-icon" src="${bankLabelImage[dataFind?.bankName.toUpperCase()]}" alt="" ></div><div className="pl-5"><div className="text-left font-semibold">${dataFind?.bankName}</div><div className="text-left">${dataFind?.accountName}</div><div className="text-left">${dataFind?.accountNo}</div></div></div></div>
<hr className="h-px my-3 bg-gray-200 border-0 ">`,
      icon: "warning",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed === true) {
        updateBankservicestatuswd(id, true , 'withdraw')
      }
    });
  }

  const Delbank = async (id) => {
    let dataFind = reData.find((x) => x.id === id);
    Swal.fire({
      title: "ยืนยันการลบ",
      html: `<hr className="h-px my-3 bg-gray-200 border-0 ">
<div className="flex justify-center items-center text-gray-700 mt-3"><div className="flex rounded px-10"><div className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-16 h-16 rounded-lg" style="background-color: ${bankColor[dataFind?.bankName?.toUpperCase()]};
width: 40px;
margin: auto;
margin-top: 10px;
margin-bottom: 10px;
"><img className="w-16 h-16 rounded-lg object-contain img-icon" src="${bankLabelImage[dataFind?.bankName.toUpperCase()]}" alt="" ></div><div className="pl-5"><div className="text-left font-semibold">${dataFind?.bankName}</div><div className="text-left">${dataFind?.accountName}</div><div className="text-left">${dataFind?.accountNo}</div></div></div></div>
<hr className="h-px my-3 bg-gray-200 border-0 ">`,
      icon: "warning",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed === true) {
        DeleteBank(id);
      }
    });
  };

  const reModal = (e) => {
    setModalAddBank(e);
    setComponent(null);
    setconfigModal(modalReset);
  };

  // Update
  /* 
  {
    type:"updatebankshoweb",
    title:"ยืนยันการบันทึก แสดงหน้าฝาก-ถอน",
    isShowWeb:1
  }
  */
  const Update = (e = null) => {
    console.log(e);
    let _valUpdate = e || valUpdate
    
    const titleType = [
      {name:'updatebank',title:'ยืนยันการแก้ไขบัญชี'},
      {name:'updatebankshoweb',title:'ยืนยันการบันทึก แสดงหน้าฝาก-ถอน'},
      {name:'addbank',title:'ยืนยันการเพิ่มบัญชี'},
    ];

    const findtitle = titleType.find(x => x.name === _valUpdate?.type);

    if(findtitle?.title === undefined){
      Swal.fire("สถานะการบันทึก", "ไม่พบรายการบันทึกข้อมูล", "warning").then((x) => {
        reModal(false);
      });
      return;
    }

    Swal.fire({
      title: `ยืนยันการบันทึก`,
      html: `<hr className="h-px my-3 bg-gray-200 border-0 ">
      <p>${_valUpdate?.title}</p>
      <hr className="h-px my-3 bg-gray-200 border-0 ">`,
      icon: "warning",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed === true) {
        if(_valUpdate?.type === 'updatebank'){
          // console.log(e)
          console.log('_valUpdate',_valUpdate);
          let res = await Api("POST", "/bankserviceCreateUpdate", {
            id:_valUpdate.respone.id,
            accountType:_valUpdate.respone.accountType,
            
          });
 
          if(res.data){
            Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then((x) => {
              reModal(false);
              fetchdata();
              fetchdataPayment("WEB");
              fetchdataConfig();
            });
          }

        }
        else if(_valUpdate?.type === 'updatebankshoweb'){
          console.log(e)
          Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ xxx", "success").then((x) => {
            reModal(false);
          });
        }
        else if(_valUpdate?.type === 'addbank'){
          // console.log(`adbank`,e);
          // console.log(`_valUpdate`,_valUpdate);
          let res = await Api("POST", "/bankserviceCreate", {
            deviceId:_valUpdate.respone.deviceiD,
            pin:_valUpdate.respone.pinnumber,
            accountName:_valUpdate.respone.accountName,
            phonenumber:_valUpdate.respone.phonenumber,
            user:_valUpdate.respone.user,
            pass:_valUpdate.respone.password,
            accountNo:_valUpdate.respone.accountNumber,
            accountType:_valUpdate.respone.typeBank,
            balance:0,
            status:0,
            bankName:'scb'
          });

          if(res.data){
            Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then((x) => {
              reModal(false);
              fetchdata();
              fetchdataPayment("WEB");
              fetchdataConfig();
            });
          }
        }
        else{
          // console.log(_valUpdate)
          Swal.fire("สถานะการบันทึก", `ทำรายการสำเร็จ ${_valUpdate?.type}`, "warning").then((x) => {
            reModal(false);
          });
        }
      }
    });
  };

  const UpdateBank = (e) => {
    console.log('UpdateBank',e);
    setvalUpdate(e);

    // Update(e)
  };

  const UpdateOther = (e) => {
    console.log('UpdateOther',e)
    setvalUpdate(e);

    Update(e)

  };


  const updateisWithdraw = async (id ,e) => {

    let tragetValue = (e.target.checked === false) ? 0 : 1;

    let objUpdate = {
      id:id,
      isWithdraw:tragetValue,
    }

    if(tragetValue === 0){
      objUpdate = {
        id:id,
        isWithdraw:tragetValue,
        autoWithdraw:0
      }
    }

    let res = await Api("POST", "/bankserviceCreateUpdate", objUpdate);

    if(res.data){
      Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then((x) => {
        reModal(false);
        fetchdata();
        fetchdataPayment("WEB");
        fetchdataConfig();
      });
    }
  }

  const ShowModal = (text = "", child = null, config = {}) => {
    setconfigModal({ ...configModal, title: text, ...config });
    setModalAddBank(true);
    setComponent(child);
  };

  const TransferAuto = (listitem = null) => {
    let onDisplay = "";
    console.log(listitem);

    return (
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2 flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold col-span-2 text-center">
              การโยกเงินอัตโนมัติ (จากบัญชีนี้)
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
              className="feather feather-chevrons-right"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
            <div className="flex py-1 px-1.5 gap-2 items-center">
              <div
                className="p-0.5 lex-shrink-0 flex justify-center items-center shadow h-6 w-6 rounded"
                style={{
                  backgroundColor: bankColor[listitem.bankName.toUpperCase()],
                }}
              >
                <img
                  className="h-6 w-6 object-contain"
                  src={bankLabelImage[listitem.bankName.toUpperCase()]}
                  alt={listitem.bankName}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs block">{listitem?.accountName}</span>
                <span className="text-xs block">{listitem?.accountNo}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 mb-5 mt-5">
          <div className="form-check form-switch">
            <input
              id="active-transfer-modal"
              className="form-check-input"
              type="checkbox"
            />
            <label htmlFor="active-transfer-modal" className="form-check-label">
              ปิด
            </label>
          </div>
        </div>
        <div className="col-span-2">
          <div className="py-1">
            <div className="flex justify-between">
              <label htmlFor="input-state-3" className="form-label">
                <span className="text-danger">* </span>วิธีการโอน
              </label>
            </div>
            <div className="errorMessage">
              <select
                className="tom-select non-searchable"
                id=""
                name="transferKind"
                field="[object Object]"
                hidden="true"
              >
                <option disabled="" value="">
                  เลือกวิธีการโอน
                </option>
                <option value={1}>สุ่มบัญชี</option>
                <option value={2}>วนบัญชี</option>
              </select>
              <select
                className="tom-select non-searchable tomselected"
                id="tomselect-21"
                name="transferKind"
                field="[object Object]"
                tabIndex={-1}
                hidden="hidden"
              >
                <option value={1} selected="true">
                  สุ่มบัญชี
                </option>
                <option disabled="" value="">
                  เลือกวิธีการโอน
                </option>
                <option value={2}>วนบัญชี</option>
              </select>
              <div className="ts-control tom-select non-searchable single input-hidden">
                <div className="items ts-input full has-items">
                  <div data-value={1} className="item">
                    สุ่มบัญชี
                  </div>
                  <input
                    type="select-one"
                    autoComplete="off"
                    size={1}
                    tabIndex={0}
                    role="combobox"
                    haspopup="listbox"
                    aria-expanded="false"
                    aria-controls="tomselect-21-ts-dropdown"
                    id="tomselect-21-tomselected"
                  />
                </div>
                <div
                  className="ts-dropdown single tom-select non-searchable"
                  style={{ display: "none" }}
                >
                  <div
                    role="listbox"
                    id="tomselect-21-ts-dropdown"
                    tabIndex={-1}
                    className="ts-dropdown-content"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5 relative"></div>
          </div>
        </div>
        <div
          className="col-span-2 wrap-bank-saving relative"
          style={{ display: onDisplay }}
        >
          <label
            htmlFor="bank-saving-id-tomselected"
            className="text-gray-500 absolute bottom-3 left-2.5 z-50 cursor-pointer"
            id="bank-saving-id-ts-label"
          >
            เลือกบัญชีธนาคาร
          </label>
          <div className="py-1">
            <div className="flex justify-between">
              <label htmlFor="input-state-3" className="form-label">
                <span className="text-danger">* </span>ไปยังเลขบัญชี
              </label>
            </div>
            <div className="errorMessage">
              <select
                multiple=""
                className="tom-select non-searchable"
                id="bank-saving-id"
                name="bankSavingList"
                field="[object Object]"
                hidden="true"
              >
                <option disabled="" value={448}>
                  SCB-นางสาว สุกัญญา เปลี่ยววิญญา
                </option>
                <option disabled="" value={1117}>
                  SCB-นางสาว กัลยารัตน์ สินเพ็ง
                </option>
                <option disabled="" value={1462}>
                  SCB-นาง แจ๋วแหวว ธุระพันธ์
                </option>
                <option value={1497}>SCB-นาง ปาณิสรา วรรณะอยู่</option>
                <option value={453}>TTB-น.ส. ปรียาพร จันทร์ทอง</option>
              </select>
              <select
                multiple="multiple"
                className="tom-select non-searchable tomselected"
                id="bank-saving-id"
                name="bankSavingList"
                field="[object Object]"
                tabIndex={-1}
                hidden="hidden"
              >
                <option disabled="" value={448}>
                  SCB-นางสาว สุกัญญา เปลี่ยววิญญา
                </option>
                <option disabled="" value={1117}>
                  SCB-นางสาว กัลยารัตน์ สินเพ็ง
                </option>
                <option disabled="" value={1462}>
                  SCB-นาง แจ๋วแหวว ธุระพันธ์
                </option>
                <option value={1497}>SCB-นาง ปาณิสรา วรรณะอยู่</option>
                <option value={453}>TTB-น.ส. ปรียาพร จันทร์ทอง</option>
              </select>
              <div className="ts-control tom-select non-searchable multi plugin-remove_button">
                <div className="items ts-input not-full">
                  <input
                    type="select-multiple"
                    autoComplete="off"
                    size={1}
                    tabIndex={0}
                    role="combobox"
                    haspopup="listbox"
                    aria-expanded="false"
                    aria-controls="bank-saving-id-ts-dropdown"
                    id="bank-saving-id-tomselected"
                  />
                </div>
                <div
                  className="ts-dropdown multi tom-select non-searchable plugin-remove_button"
                  style={{ display: "none" }}
                >
                  <div
                    role="listbox"
                    id="bank-saving-id-ts-dropdown"
                    tabIndex={-1}
                    className="ts-dropdown-content"
                  />
                </div>
              </div>
            </div>
            <div className="relative"></div>
          </div>
        </div>
        <div className="col-span-2" style={{ display: onDisplay }}>
          <div className="my-2">รายการธนาคารที่เลือก</div>
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded" />
        </div>
        <div className="col-span-2 pt-5" style={{ display: onDisplay }}>
          <div className="col-span-2 font-semibold">
            <label className="form-label flex items-center">
              <span className="mr-1">
                <i className="text-danger">* </i>
              </span>{" "}
              จำนวนเพดาน (โอนออกหากถึงระบุ){" "}
              <div className="relative flex flex-col items-center group cursor-pointer">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                  <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                    หากตั้งค่าระว่าง 1,000 - 1,500 เมื่อยอดเงินถึง 1,000
                    แต่ไม่เกิน 1,500 จะสุ่มโอนออก หากยอดเงินเกิน 1,500
                    ระบบจะโอนออกทันที
                  </span>
                </div>
              </div>
            </label>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-11 gap-x-4">
              <div className="col-span-5">
                <div className="py-1">
                  <div className="flex justify-between"></div>
                  <div className="input-group">
                    <input
                      type="text"
                      autoComplete="off"
                      className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                      name="ceilingAmountMin"
                      inputMode="decimal"
                    />
                    <div className="input-group-text uppercase whitespace-nowrap">
                      THB
                    </div>
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>
              <div className="col-span-1 text-center mt-3.5">ถึง</div>
              <div className="col-span-5">
                <div className="py-1">
                  <div className="flex justify-between"></div>
                  <div className="input-group">
                    <input
                      type="text"
                      autoComplete="off"
                      className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                      name="ceilingAmountMax"
                      inputMode="decimal"
                    />
                    <div className="input-group-text uppercase whitespace-nowrap">
                      THB
                    </div>
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2" style={{ display: onDisplay }}>
          <div className="col-span-2 font-semibold">
            <label className="form-label flex items-center">
              <span className="mr-1">
                <i className="text-danger">* </i>
              </span>{" "}
              เหลือติดบัญชี{" "}
              <div className="relative flex flex-col items-center group cursor-pointer">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="bottom-0 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                  <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                    หากตั้งค่าระว่าง 0 - 100 ระบบจะสุ่มโอนออก
                    ให้เหลือยอดเงินในบัญชีระหว่าง 0 - 100 บาท
                  </span>
                </div>
              </div>
            </label>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-11 gap-x-4">
              <div className="col-span-5">
                <div className="py-1">
                  <div className="flex justify-between"></div>
                  <div className="input-group">
                    <input
                      type="text"
                      autoComplete="off"
                      className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                      name="remainAmountMin"
                      inputMode="decimal"
                    />
                    <div className="input-group-text uppercase whitespace-nowrap">
                      THB
                    </div>
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>
              <div className="col-span-1 text-center mt-3.5">ถึง</div>
              <div className="col-span-5">
                <div className="py-1">
                  <div className="flex justify-between"></div>
                  <div className="input-group">
                    <input
                      type="text"
                      autoComplete="off"
                      className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                      name="remainAmountMax"
                      inputMode="decimal"
                    />
                    <div className="input-group-text uppercase whitespace-nowrap">
                      THB
                    </div>
                  </div>
                  <div className="mb-5 relative"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const updateBankservice = async (id , e , type = 'deposit') => {
    let tragetValue = (e.target.checked === false) ? 0 : 1;
    let res = await Api("POST", "/bankserviceUpdate", {
      id:id,
      status:tragetValue,
      type:type
    });
    console.log(res.data);
  }

  const updateBankservicestatuswd = async (id , e , type = 'deposit') => {
    let tragetValue = (e === false) ? 0 : 1;
    let res = await Api("POST", "/bankserviceUpdate", {
      id:id,
      status:tragetValue,
      statuswd:tragetValue,
      type:type
    });
    console.log(res.data);
  }

  const updateStatus = async (id = 0,req = {}) => {
    let res = await Api("PUT", `/bankservice/${id}?check=false`, req);
    console.log(res.data);
  }


  const lineCheck = async (id) => {
    // let res = await Api("POST", "/bankserviceCreateUpdate", objUpdate);

    console.log(id)
    // if(res.data){
      Swal.fire("สถานะการตรวจสอบ", "กำลังพัฒนา", "warning").then((x) => {
        // reModal(false);
        // fetchdata();
        // fetchdataPayment("WEB");
        // fetchdataConfig();
      });
    // }
  } 

  return (
    <div className="py-2">
      <Modal
        show={modalAddBank}
        res={reModal}
        update={Update}
        child={loadComponent}
        config={configModal}
      />

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
                  className="feather feather-home w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>{" "}
                บัญชีธนาคารเว็บ{" "}
                <div
                  className="dropdown"
                  data-tw-placement="bottom-end"
                  style={{ position: "relative" ,display:"none" }}
                >
                  <DropDown text="ทั้งหมด" subtext="เลือกประเภทบัญชี" data={[
                    {key:"ทั้งหมด",title:"ทั้งหมด"},
                    {key:"บัญชีฝาก",title:"บัญชีฝาก"},
                    {key:"บัญชีถอน",title:"บัญชีถอน"}
                  ]} />

                  <div
                    className="dropdown-menu !w-48 !right-0"
                    id="_2c0dx0fs8"
                    data-popper-placement="bottom-end"
                    style={{
                      position: "absolute",
                      inset: "0px 0px auto auto",
                      margin: 0,
                      transform: "translate3d(0px, 32px, 0px)",
                    }}
                  >
                    <ul className="dropdown-content bg-white border border-gray-100">
                      <div className="p-2 border-b border-gray-200 dark:border-dark-3">
                        <div className="font-medium">เลือกประเภทบัญชี</div>
                      </div>
                      <div className="pt-2">
                        <li>
                          <div className="dropdown-item cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-gray-200 rounded-md cursor-pointer">
                            <span className="pl-7">ทั้งหมด</span>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-gray-200 rounded-md cursor-pointer">
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
                              className="feather feather-check"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="pl-3">บัญชีออโต้</span>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-gray-200 rounded-md cursor-pointer">
                            <span className="pl-7">บัญชีโยกเงิน</span>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </h2>
              <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                <button
                  className="btn bg-green-600 text-white font-display"
                  onClick={() =>
                    ShowModal(
                      "เพิ่มบัญชีธนาคาร",
                      <AddBanks ispageState={pageState} callback={UpdateOther} reData={reData}/>,
                      { size: "modal-xl", showbtn: false }
                    )
                  }
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
                    className="feather feather-user-plus mr-1.5 mr-1.5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <line x1={20} y1={8} x2={20} y2={14} />
                    <line x1={23} y1={11} x2={17} y2={11} />
                  </svg>{" "}
                  เพิ่มบัญชีธนาคาร
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-700 dark:bg-dark-1 text-white px-half text-sm">
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
                      <div>#</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>สถานะ</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>แก้ไข</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>ลบ</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
                      <div>ประเภทบัญชี</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>ธนาคาร</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>ชื่อบัญชี</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
                      <div>เลขที่บัญชี</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-right">
                      <div>ยอดเงิน</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>หมายเหตุ</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-left">
                      <div>Prefix</div>
                    </th>
                    <th className="px-2 py-1 border border-b-2 dark:border-dark-5 whitespace-nowrap font-display text-center">
                      <div>Bank Api</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reData.map((item) => (
                    <tr
                      className="hover:bg-yellow-100 px-half"
                      key={`banklist_${item.id}`}
                    >
                      <td className="px-2 py-1 border text-center p-0 w-16">
                        {item.id}
                      </td>
                      <td className="px-2 py-1 border text-center w-16">
                        <div className="relative flex justify-center items-center">
                          {item.status === 1 ? (
                            <div className="form-check form-switch">
                              <span>
                                <div className="py-1 border rounded-full h-[18px] w-[28px] flex items-center px-0.5 duration-500 shadow-inner justify-end bg-green-700">
                                  <div className="rounded-full bg-white w-[12px] h-[12px]" />
                                </div>
                              </span>
                            </div>
                          ) : (
                            <div className="relative flex justify-center items-center">
                              <div className="form-check form-switch">
                                <span>
                                  <div className="py-1 border rounded-full h-[18px] w-[28px] flex items-center px-0.5 duration-500 shadow-inner justify-start bg-gray-300">
                                    <div className="rounded-full bg-white w-[12px] h-[12px]"></div>
                                  </div>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-center w-16">
                        <div className="relative flex justify-center items-center">
                          <button
                            className="btn bg-blue-100 border border-blue-100 hover:bg-blue-50 p-1 w-6 h-6"
                            onClick={() =>
                              ShowModal(
                                "แก้ไข BANK",
                                <EditTable
                                  reData={reData}
                                  id={item.id}
                                  callback={UpdateBank}
                                />,
                                {
                                  size: "",
                                }
                              )
                            }
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
                              className="feather feather-edit w-3.4 h-3.5 text-blue-500 w-3.4 h-3.5 text-blue-500"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-center w-16">
                        <button
                          className="btn btn-danger-soft p-1 w-6 h-6"
                          // onClick={() => Delbank(item.id)}
                          onClick={() =>
                            ShowModal(
                              "แก้ไข BANK",
                              <EditTable
                                reData={reData}
                                id={item.id}
                                callback={UpdateBank}
                              />,
                              {
                                size: "",
                              }
                            )
                          }
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
                            className="feather feather-trash-2 w-3.4 h-3.5 w-3.4 h-3.5"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1={10} y1={11} x2={10} y2={17} />
                            <line x1={14} y1={11} x2={14} y2={17} />
                          </svg>
                        </button>
                      </td>
                      <td className="px-2 py-1 border text-center w-24">
                        <div className="flex justify-center">
                          <div className="bg-blue-100 text-blue-500 min-w-max px-2 py-1.5 rounded-full w-24 text-xs">
                            บัญชีออโต้
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-center w-56">
                        <div className="flex items-center min-w-max xl:w-full">
                          <div
                            className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-5 mr-2"
                            style={{
                              backgroundColor:
                                bankColor[item.bankName.toUpperCase()],
                            }}
                          >
                            <img
                              className="rounded w-5 object-contain"
                              src={bankLabelImage[item.bankName.toUpperCase()]}
                              alt={item.bankName}
                            />
                          </div>{" "}
                          {BankName.find((x) => x.short === item.bankName)
                            ?.shortName ?? "GATE WAY"}{" "}
                          <div className="ml-1.5">
                            <div className="group relative">
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
                                className="feather feather-smartphone cursor-pointer cursor-pointer"
                              >
                                <rect
                                  x={5}
                                  y={2}
                                  width={14}
                                  height={20}
                                  rx={2}
                                  ry={2}
                                />
                                <line x1={12} y1={18} x2="12.01" y2={18} />
                              </svg>
                              <div className="absolute -top-0.5 left-6 text-xs hidden min-w-max group-hover:block p-1 rounded bg-gray-600 text-white before:content-['⬥'] before:text-gray-600 before:absolute before:top-1 before:-left-1.5">
                                {" "}
                                {item.bankName.toUpperCase()}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-1 border text-left w-48">
                        <div className="min-w-max w-48 xl:w-full">
                          {item.accountName}
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-center number-display w-36">
                        <div className="min-w-max w-32 xl:w-full">
                          {item.accountNo}
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-right w-24">
                        <div className="min-w-max">{item.balance}</div>
                      </td>
                      <td className="px-2 py-1 border text-center w-56">
                        <div className="min-w-max w-56 xl:w-full">*</div>
                      </td>
                      <td className="px-2 py-1 border text-center w-56">
                        <div className="min-w-max w-56 xl:w-full">
                          {item?.prefix}
                        </div>
                      </td>
                      <td className="px-2 py-1 border text-center w-36">
                        <span className="font-display text-green-600 flex justify-center items-center">
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
                            className="feather feather-check mr-0.5 mr-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>{" "}
                          สำเร็จ
                        </span>
                      </td>
                    </tr>
                  ))}

                  <tr
                    className="bg-yellow-50 py-2 text-center"
                    style={{ display: "none" }}
                  >
                    <td colSpan={9}>ไม่มีข้อมูล</td>
                  </tr>
                  <tr
                    style={{
                      display: isLoading === true ? "table-row" : "none",
                    }}
                  >
                    <td colSpan={11} className="text-center">
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
      </div>

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
                  className="feather feather-settings w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                >
                  <circle cx={12} cy={12} r={3} />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>{" "}
                ตั้งค่าบัญชี ฝาก-ถอน อัตโนมัติ
              </h2>
              <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0" />
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-6 lg:pr-2 mb-5 lg:mb-0">
                <div className="grid grid-cols-12">
                  <div className="intro-y col-span-12">
                    <div className="intro-y box">
                      <div className="flex justify-between items-center pl-2.5 pr-1 py-1 rounded-t bg-emerald-600 mb-3">
                        <h1 className="text-base font-semibold font-display text-white mr-auto flex items-center">
                          บัญชีเงินฝากอัตโนมัติ
                        </h1>
                        <div className="flex gap-1">
                          <button
                            className="btn rounded btn-dark shadow-xl px-1.5 py-0.5 font-display btn btn-md btn rounded btn-dark shadow-xl px-1.5 py-0.5 font-display"
                            type="button"
                            style={{ display: "none" }}
                            onClick={() =>
                              ShowModal("ตั้งค่าการโอนบัญชีฝาก", null, {
                                size: "",
                              })
                            }
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
                              className="feather feather-settings w-3 h-3 w-3 h-3"
                            >
                              <circle cx={12} cy={12} r={3} />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            <span className="pl-1">แบบวน</span>
                          </button>
                          <div className="border-l border-white/30" />
                          <button
                            style={{ display: "none" }}
                            className="btn rounded btn-warning px-1.5 py-1 font-display btn btn-md btn rounded btn-warning px-1.5 py-1 font-display"
                            type="button"
                            onClick={() =>
                              ShowModal("เพิ่มธนาคาร ฝากออโต้", <AddAuto callback={UpdateBank} reData={reData} />, {
                                size: "",
                              })
                            }
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
                              className="feather feather-plus-circle w-3 h-3 w-3 h-3"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={8} x2={12} y2={16} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                            <span className="pl-1">จัดการบัญชี</span>
                          </button>
                        </div>
                      </div>
                      <div className="px-3 pb-3">
                        {reDataList.filter(x => x.accountType === 'DEPOSIT' || x.accountType === 'BOTH').map((item) => (
                          <div key={`banklistwd_${item.id}`}>
                            {item.bankName !== "GATEWAY" ? (
                              <div className="border-green-600 border border-l-8 shadow-sm rounded-lg relative text-xs overflow-hidden mb-3">
                                <div className="px-2 py-1.5 text-center font-display font-medium flex justify-between bg-gray-100">
                                  <div className="flex justify-start items-center">
                                    <div className="form-check form-switch">
                                      <div className="w-[26px] relative flex items-center justify-center">
                                        <input
                                          id="active-1655"
                                          className="form-check-input z-10"
                                          type="checkbox"
                                          defaultChecked={
                                            item.status === 1 ? true : false
                                          }
                                          readOnly
                                          onChange={e => updateBankservice(item.id, e , 'deposit') }
                                        />
                                      </div>
                                      <label
                                        htmlFor="active-1655"
                                        className="form-check-label"
                                      >
                                        เปิดใช้งาน
                                      </label>
                                    </div>
                                  </div>
                                  <button
                                    className="btn btn-danger px-1 py-1 font-medium w-14 border-danger btn btn-md btn btn-danger px-1 py-1 font-medium w-14 border-danger"
                                    type="button"
                                    // onClick={() => Delbank(item.id)}
                                    onClick={() =>
                                      ShowModal(
                                        "แก้ไข BANK",
                                        <EditTable
                                          reData={reData}
                                          id={item.id}
                                          callback={UpdateBank}
                                        />,
                                        {
                                          size: "",
                                        }
                                      )
                                    }
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
                                      className="feather feather-trash-2 w-3 h-3 w-3 h-3"
                                    >
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      <line x1={10} y1={11} x2={10} y2={17} />
                                      <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>
                                    <span className="pl-1">ลบ</span>
                                  </button>
                                </div>

                                <div className="grid grid-cols-12 px-2 pb-2 pt-2">
                                  <div className="col-span-12 sm:col-span-7 pb-3 sm:pb-0 border-l-2 sm:border-none border-gray-100">
                                    <div className="flex items-center gap-3">
                                      <div className="rounded-l-none sm:rounded-bl-none sm:rounded-l-lg flex flex-col items-center bg-gray-100 rounded-lg p-2 w-24">
                                        <div
                                          className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded-lg"
                                          style={{
                                            backgroundColor:
                                              bankColor[
                                                item.bankName.toUpperCase()
                                              ],
                                          }}
                                        >
                                          <img
                                            className="w-8 h-8 object-contain"
                                            src={
                                              bankLabelImage[
                                                item.bankName.toUpperCase()
                                              ]
                                            }
                                            alt={item.bankName}
                                          />
                                        </div>
                                        <div className="mt-1 text-xs text-center">
                                          {BankName.find(
                                            (x) => x.short === item.bankName
                                          )?.shortName ?? "GATE WAY"}{" "}
                                        </div>
                                      </div>
                                      <div className="text-xs">
                                        <div>{item.BankName}</div>
                                        <div>{item.accountName}</div>
                                        <div className="flex items-center">
                                          <div>
                                            {item.balance}{" "}
                                            <span className="text-[10px]">
                                              THB
                                            </span>
                                          </div>
                                          {/* <div className="relative flex flex-col items-center group cursor-pointer block">
                                            <button className="btn ml-1 p-0.5 border w-5 h-5">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                aria-hidden="true"
                                                role="img"
                                                className="w-2.5 h-2.5 iconify iconify--material-symbols"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M4 20v-2h2.75l-.4-.35q-1.225-1.225-1.787-2.662T4 12.05q0-2.775 1.663-4.937T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"
                                                />
                                              </svg>
                                            </button>
                                            <div className="bottom-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                              <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                อัปเดตยอดเงิน
                                              </span>
                                            </div>
                                          </div> */}
                                          <div className="relative flex flex-col items-center group cursor-pointer block">
                                            <button
                                              className="btn ml-1 p-0.5 border w-5 h-5"
                                              onClick={() => {
                                                fetchdataPayment(
                                                  "WEB",
                                                  item.id
                                                ).then((res) => {
                                                  ShowModal(
                                                    "รายการเดินบัญชี > BANK",
                                                    <MTable
                                                      transaction={res}
                                                    />,
                                                    {
                                                      size: "modal-xl",
                                                      showbtn: false,
                                                    }
                                                  );
                                                });
                                              }}
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
                                                className="feather feather-list w-2.5 h-2.5 w-2.5 h-2.5"
                                              >
                                                <line
                                                  x1={8}
                                                  y1={6}
                                                  x2={21}
                                                  y2={6}
                                                />
                                                <line
                                                  x1={8}
                                                  y1={12}
                                                  x2={21}
                                                  y2={12}
                                                />
                                                <line
                                                  x1={8}
                                                  y1={18}
                                                  x2={21}
                                                  y2={18}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={6}
                                                  x2="3.01"
                                                  y2={6}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={12}
                                                  x2="3.01"
                                                  y2={12}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={18}
                                                  x2="3.01"
                                                  y2={18}
                                                />
                                              </svg>
                                            </button>
                                            <div className="bottom-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                              <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                ดูรายการเดินบัญชี
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-6 sm:col-span-5 flex justify-center items-center border-l-2 sm:border-none border-gray-100">
                                    <div className="flex flex-col justify-start gap-y-2">
                                      <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              id={`show-player-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              
                                              defaultChecked={
                                                item.isShowWeb === 1 ? true : false
                                              }
                                              onChange={e => updateStatus(item.id,{isShowWeb:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`show-player-${item.id}`}
                                            className="form-check-label"
                                          >
                                            แสดงหน้าฝากของเว็บ
                                          </label>
                                        </div>
                                      </div>
                                      {/* <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              disabled=""
                                              id={`show-player1-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              defaultChecked={item.autoBalance === 1 ? true : false}
                                              onChange={e => updateStatus(item.id,{autoBalance:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`show-player1-${item.id}`}
                                            className="form-check-label"
                                          >
                                            ดึงยอด AUTO
                                          </label>
                                        </div>
                                      </div>

                                      <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              disabled=""
                                              id={`show-player2-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              defaultChecked={item.autoTransaction === 1 ? true : false}
                                              onChange={e => updateStatus(item.id,{autoTransaction:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`show-player2-${item.id}`}
                                            className="form-check-label"
                                          >
                                            ดึงยอด STATEMENT AUTO
                                          </label>
                                        </div>
                                      </div> */}

                                    </div>
                                  </div>
                                  <div className="col-span-12 border-l-2 border-gray-100 mt-3">
                                    <div className="border-t-2 border-gray-100 p-3 mt-3" style={{
                                      display:'none'
                                    }}>
                                      <div className="flex justify-between items-center gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <button
                                            className="btn btn-dark-soft px-2 py-1 min-w-max border-dark btn btn-md btn btn-dark-soft px-2 py-1 min-w-max border-dark"
                                            type="button"
                                            onClick={() =>
                                              ShowModal(
                                                "ตั้งค่าการโยกเงินออโต้",
                                                TransferAuto(item),
                                                { size: "" }
                                              )
                                            }
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
                                              className="feather feather-settings w-3 h-3 w-3 h-3"
                                            >
                                              <circle cx={12} cy={12} r={3} />
                                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>
                                            <span className="pl-1">
                                              ตั้งค่าโยกเงินออโต้
                                            </span>
                                          </button>
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
                                            className="feather feather-chevrons-right"
                                          >
                                            <polyline points="13 17 18 12 13 7" />
                                            <polyline points="6 17 11 12 6 7" />
                                          </svg>
                                          <div className="rounded h-[20px] flex items-center px-0.5 duration-500 shadow-inner justify-start bg-gray-400">
                                            <span className="text-white text-xs px-1">
                                              ปิด
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="border-t-2 border-gray-100 p-3 flex gap-2">
                                      <h3 className="font-semibold font-display min-w-max text-sm mt-0.5">
                                        ตรวจสอบบัญชี และ LOGIN LINE
                                      </h3>
                                      <button
                                        className="btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0 btn btn-md btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0"
                                        type="button"
                                        onClick={() => lineCheck(item.id)}
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
                                          className="feather feather-settings w-3 h-3 w-3 h-3"
                                        >
                                          <circle cx={12} cy={12} r={3} />
                                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="border-green-600 border border-l-8 shadow-sm rounded-lg relative text-xs overflow-hidden mb-3">
                                <div className="px-2 py-1.5 text-center font-display font-medium flex justify-between bg-gray-100">
                                  <div className="flex justify-start items-center">
                                    <div className="form-check form-switch">
                                      <div className="w-[26px] relative flex items-center justify-center">
                                        <input
                                          id="active-787"
                                          className="form-check-input z-10"
                                          type="checkbox"
                                          defaultChecked={
                                            item.status === 1 ? true : false
                                          }
                                          onChange={e => updateBankservice(item.id, e , 'deposit') }
                                          readOnly
                                        />
                                      </div>
                                      <label
                                        htmlFor="active-787"
                                        className="form-check-label"
                                      >
                                        เปิดใช้งาน
                                      </label>
                                    </div>
                                  </div>
                                  <button
                                    className="btn btn-danger px-1 py-1 font-medium w-14 border-danger btn btn-md btn btn-danger px-1 py-1 font-medium w-14 border-danger"
                                    type="button"
                                    // onClick={() => Delbank(item.id)}
                                    onClick={() =>
                                      ShowModal(
                                        "แก้ไข BANK",
                                        <EditTable
                                          reData={reData}
                                          id={item.id}
                                          callback={UpdateBank}
                                        />,
                                        {
                                          size: "",
                                        }
                                      )
                                    }
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
                                      className="feather feather-trash-2 w-3 h-3 w-3 h-3"
                                    >
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      <line x1={10} y1={11} x2={10} y2={17} />
                                      <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>
                                    <span className="pl-1">ลบ</span>
                                  </button>
                                </div>

                                <div className="grid grid-cols-12 px-2 pb-2 pt-2">
                                  <div className="col-span-12 sm:col-span-7 pb-3 sm:pb-0 border-l-2 sm:border-none border-gray-100">
                                    <div className="flex items-center gap-3">
                                      <div className="rounded-l-none sm:rounded-bl-none sm:rounded-l-lg flex flex-col items-center bg-gray-100 rounded-lg p-2 w-24">
                                        <div
                                          className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded-lg"
                                          style={{
                                            backgroundColor:
                                              bankColor[
                                                item.bankName.toUpperCase()
                                              ],
                                          }}
                                        >
                                          <img
                                            className="w-8 h-8 object-contain"
                                            src={
                                              bankLabelImage[
                                                item.bankName.toUpperCase()
                                              ]
                                            }
                                            alt={item.bankName}
                                          />
                                        </div>
                                        <div className="mt-1 text-xs text-center">
                                          {BankName.find(
                                            (x) => x.short === item.bankName
                                          )?.shortName ?? "GATE WAY"}{" "}
                                        </div>
                                      </div>
                                      <div className="text-xs">
                                        <div>Payment Gateway</div>
                                        <div />
                                        <div className="flex items-center">
                                          <div>
                                            {item.balance}{" "}
                                            <span className="text-[10px]">
                                              THB
                                            </span>
                                          </div>

                                          <div className="relative flex flex-col items-center group cursor-pointer block">
                                            <button
                                              className="btn ml-1 p-0.5 border w-5 h-5"
                                              onClick={() => {
                                                fetchdataPayment("GATEWAY",item.id).then(res => {
                                                ShowModal(
                                                  "รายการเดินบัญชี > Payment Gateway",
                                                  <MTable
                                                    transaction={res}
                                                  />,
                                                  {
                                                    size: "modal-xl",
                                                    showbtn: false,
                                                  }
                                                );
                                                });
                                                
                                              }}
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
                                                className="feather feather-list w-2.5 h-2.5 w-2.5 h-2.5"
                                              >
                                                <line
                                                  x1={8}
                                                  y1={6}
                                                  x2={21}
                                                  y2={6}
                                                />
                                                <line
                                                  x1={8}
                                                  y1={12}
                                                  x2={21}
                                                  y2={12}
                                                />
                                                <line
                                                  x1={8}
                                                  y1={18}
                                                  x2={21}
                                                  y2={18}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={6}
                                                  x2="3.01"
                                                  y2={6}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={12}
                                                  x2="3.01"
                                                  y2={12}
                                                />
                                                <line
                                                  x1={3}
                                                  y1={18}
                                                  x2="3.01"
                                                  y2={18}
                                                />
                                              </svg>
                                            </button>
                                            <div className="bottom-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                              <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                ดูรายการเดินบัญชี
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-12 border-l-2 border-gray-100">
                                    <div className="mt-3 border-t-2 border-gray-100 p-3 flex gap-2">
                                      <h3 className="font-semibold font-display min-w-max text-sm mt-0.5">
                                        ระดับสมาชิก: ทุกคน
                                      </h3>
                                    </div>
                                    <div className="border-t-2 border-gray-100 px-3 pt-1 pb-1">
                                      <ul className="list-disc list-inside">
                                        <li className="leading-5 relative">
                                          ค่าธรรมเนียมฝากเงิน: 2.5%{" "}
                                          <span className="inline-flex absolute ml-1">
                                            <div className="relative flex flex-col items-center group cursor-pointer inline">
                                              <svg
                                                className="w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <div className="bottom-0.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                                <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                                  ยอดฝาก x ค่าธรรมเนียมฝากเงิน:
                                                  2.5%
                                                </span>
                                              </div>
                                            </div>
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 lg:pl-2">
                <div className="grid grid-cols-12">
                  <div className="intro-y col-span-12">
                    <div className="intro-y box">
                      <div className="flex justify-between items-center pl-2.5 pr-1 py-1 rounded-t bg-red-600 mb-3">
                        <h1 className="text-base font-semibold font-display mr-auto text-white flex items-center">
                          บัญชีถอนอัตโนมัติ
                        </h1>
                        <div className="flex gap-1">
                          <button
                            className="btn rounded btn-dark shadow-xl px-1.5 py-0.5 font-display btn btn-md btn rounded btn-dark shadow-xl px-1.5 py-0.5 font-display"
                            type="button"
                            style={{ display: "none" }}
                            onClick={() =>
                              ShowModal("ตั้งค่าการโอนบัญชีถอน", null, {
                                size: "",
                              })
                            }
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
                              className="feather feather-settings w-3 h-3 w-3 h-3"
                            >
                              <circle cx={12} cy={12} r={3} />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            <span className="pl-1">แบบวน</span>
                          </button>
                          <div className="border-l border-white/30" />
                          <button
                            style={{ display: "none" }}
                            className="btn btn-warning rounded px-1.5 py-1 font-display btn btn-md btn btn-warning rounded px-1.5 py-1 font-display"
                            type="button"
                            onClick={() =>
                              ShowModal("เพิ่มธนาคาร ถอนออโต้", <AddAuto callback={UpdateBank} reData={reData} title="เพิ่มธนาคาร ถอนออโต้" />, {
                                size: "",
                              })
                            }
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
                              className="feather feather-plus-circle w-3 h-3 w-3 h-3"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={8} x2={12} y2={16} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                            <span className="pl-1">จัดการบัญชี</span>
                          </button>
                        </div>
                      </div>
                      <div className="px-3 pb-3">
                        {reDataList.filter(x => x.accountType === 'WITHDRAW' || x.accountType === 'BOTH').map((item) => (
                          <div
                            className="border-green-600 border border-l-8 shadow-sm rounded-lg relative text-xs overflow-hidden mb-3"
                            key={`banklistd_${item.id}`}
                          >
                            <div className="px-2 py-1.5 text-center font-display font-medium flex justify-between bg-gray-100">
                              <div className="flex justify-start items-center">
                                <div className="form-check form-switch">
                                  <div className="w-[26px] relative flex items-center justify-center">
                                    <input
                                      id="active-1656"
                                      className="form-check-input z-10"
                                      type="checkbox"
                                      defaultChecked={
                                        (item.isWithdraw === 1) ? true : false
                                      }
                                      onChange={e => updateisWithdraw(item.id,e)}
                                      readOnly
                                    />
                                  </div>
                                  <label
                                    htmlFor="active-1656"
                                    className="form-check-label"
                                  >
                                    เปิดใช้งาน
                                  </label>
                                </div>
                              </div>
                              <button
                                className="btn btn-danger px-1 py-1 font-medium w-14 border-danger btn btn-md btn btn-danger px-1 py-1 font-medium w-14 border-danger"
                                type="button"
                                // onClick={() => Delbank(item.id)}
                                onClick={() =>
                                  ShowModal(
                                    "แก้ไข BANK",
                                    <EditTable
                                      reData={reData}
                                      id={item.id}
                                      callback={UpdateBank}
                                    />,
                                    {
                                      size: "",
                                    }
                                  )
                                }
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
                                  className="feather feather-trash-2 w-3 h-3 w-3 h-3"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1={10} y1={11} x2={10} y2={17} />
                                  <line x1={14} y1={11} x2={14} y2={17} />
                                </svg>
                                <span className="pl-1">ลบ</span>
                              </button>
                            </div>
                            
                            
                            <div className="grid grid-cols-12 px-2 pb-2 pt-2">
                              <div className="col-span-6 sm:col-span-7 pb-3 sm:pb-0 border-l-2 sm:border-none border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className="rounded-l-none sm:rounded-bl-none sm:rounded-l-lg flex flex-col items-center bg-gray-100 rounded-lg p-2 w-24">
                                    <div
                                      className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-8 h-8 rounded-lg"
                                      style={{
                                        backgroundColor:
                                          bankColor[
                                            item.bankName.toUpperCase()
                                          ],
                                      }}
                                    >
                                      <img
                                        className="w-8 h-8 object-contain"
                                        src={
                                          bankLabelImage[
                                            item.bankName.toUpperCase()
                                          ]
                                        }
                                        alt={item.bankName}
                                      />
                                    </div>
                                    <div className="mt-1 text-xs text-center">
                                      {BankName.find(
                                        (x) => x.short === item.bankName
                                      )?.shortName ?? "GATE WAY"}{" "}
                                    </div>
                                  </div>
                                  <div className="text-xs">
                                    <div>{item.accountName}</div>
                                    <div>{item.accountNo}</div>
                                    <div className="flex items-center">
                                      <div>
                                        {item.balance}{" "}
                                        <span className="text-[10px]">THB</span>
                                      </div>
                                      <div className="relative flex flex-col items-center group cursor-pointer block">
                                        <button className="btn ml-1 p-0.5 border w-5 h-5">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true"
                                            role="img"
                                            className="w-2.5 h-2.5 iconify iconify--material-symbols"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M4 20v-2h2.75l-.4-.35q-1.225-1.225-1.787-2.662T4 12.05q0-2.775 1.663-4.937T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"
                                            />
                                          </svg>
                                        </button>
                                        <div className="bottom-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                          <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                            อัปเดตยอดเงิน
                                          </span>
                                        </div>
                                      </div>
                                      <div className="relative flex flex-col items-center group cursor-pointer block">
                                        <button
                                          className="btn ml-1 p-0.5 border w-5 h-5"

                                          onClick={() => {
                                            fetchdataPayment(
                                              "WEB",
                                              item.id
                                            ).then((res) => {
                                              ShowModal(
                                                "รายการเดินบัญชี > BANK",
                                                <MTable
                                                  transaction={res}
                                                />,
                                                {
                                                  size: "modal-xl",
                                                  showbtn: false,
                                                }
                                              );
                                            });
                                          }}

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
                                            className="feather feather-list w-2.5 h-2.5 w-2.5 h-2.5"
                                          >
                                            <line
                                              x1={8}
                                              y1={6}
                                              x2={21}
                                              y2={6}
                                            />
                                            <line
                                              x1={8}
                                              y1={12}
                                              x2={21}
                                              y2={12}
                                            />
                                            <line
                                              x1={8}
                                              y1={18}
                                              x2={21}
                                              y2={18}
                                            />
                                            <line
                                              x1={3}
                                              y1={6}
                                              x2="3.01"
                                              y2={6}
                                            />
                                            <line
                                              x1={3}
                                              y1={12}
                                              x2="3.01"
                                              y2={12}
                                            />
                                            <line
                                              x1={3}
                                              y1={18}
                                              x2="3.01"
                                              y2={18}
                                            />
                                          </svg>
                                        </button>
                                        <div className="bottom-2.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                          <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                            ดูรายการเดินบัญชี
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-6 sm:col-span-5 flex justify-center items-center border-l-2 sm:border-none border-gray-100">
                                    <div className="flex flex-col justify-start gap-y-2">
                                      <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              id={`wshow-player-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              
                                              defaultChecked={
                                                item.autoWithdraw === 1 ? true : false
                                              }
                                              onChange={e => updateStatus(item.id,{autoWithdraw:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`wshow-player-${item.id}`}
                                            className="form-check-label"
                                          >
                                            เปิดใช้ถอนสลับบัญชี
                                          </label>
                                        </div>
                                      </div>

                                      <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              disabled=""
                                              id={`wshow-player1-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              defaultChecked={item.autoBalance === 1 ? true : false}
                                              onChange={e => updateStatus(item.id,{autoBalance:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`wshow-player1-${item.id}`}
                                            className="form-check-label"
                                          >
                                            ดึงยอด AUTO
                                          </label>
                                        </div>
                                      </div>

                                      <div className="flex justify-start items-center">
                                        <div className="form-check form-switch">
                                          <div className="w-[26px] relative flex items-center justify-center">
                                            <input
                                              disabled=""
                                              id={`wshow-player2-${item.id}`}
                                              className="form-check-input z-10"
                                              type="checkbox"
                                              defaultChecked={item.autoTransaction === 1 ? true : false}
                                              onChange={e => updateStatus(item.id,{autoTransaction:(e.target.checked === false ? 0 : 1)}) }
                                            />
                                          </div>
                                          <label
                                            htmlFor={`wshow-player2-${item.id}`}
                                            className="form-check-label"
                                          >
                                            ดึงยอด STATEMENT AUTO
                                          </label>
                                        </div>
                                      </div>

                                    </div>
                                  </div>

                              <div className="col-span-12 border-l-2 border-gray-100">
                                <div className="mt-3 border-t-2 border-gray-100 p-3 flex gap-2">
                                  <h3 className="font-semibold font-display min-w-max text-sm mt-0.5">
                                    ทับรายการถอน ช่อง (รอดำเนินการ)
                                  </h3>
                                  <button
                                    className="btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0 btn btn-md btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0"
                                    type="button"
                                    onClick={() => updateBankReplace(item.id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      aria-hidden="true"
                                      role="img"
                                      className="w-2.5 h-2.5 iconify iconify--material-symbols"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M4 20v-2h2.75l-.4-.35q-1.225-1.225-1.787-2.662T4 12.05q0-2.775 1.663-4.937T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"
                                      />
                                    </svg>  
                                  </button>
                                </div>
                              </div>
                              <div className="col-span-12 border-l-2 border-gray-100">
                                <div className="border-t-2 border-gray-100 px-3 pt-1 pb-1">
                                  <ul className="list-disc list-inside">
                                    <li className="leading-5 relative">
                                      ค่าธรรมเนียมถอนเงิน: 0%{" "}
                                      <span className="inline-flex absolute ml-1">
                                        <div className="relative flex flex-col items-center group cursor-pointer inline">
                                          <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          <div className="w-[234px] bottom-0.5 absolute group-hover:flex flex-col items-center mb-3.5 hidden w-56">
                                            <span className="rounded relative z-20 p-2 text-xs text-white whitespace-no-wrap bg-gray-700 shadow-lg leading-normal">
                                              ยอดถอน x ค่าธรรมเนียมถอนเงิน: 0%
                                            </span>
                                          </div>
                                        </div>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-5" style={{ display: "none" }}>
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
                  className="feather feather-settings w-6 h-6 mr-3 text-blue-800 inline w-6 h-6 mr-3 text-blue-800 inline"
                >
                  <circle cx={12} cy={12} r={3} />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>{" "}
                ตั้งค่าบัญชี ฝาก-ถอน มือ
              </h2>
              <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0" />
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-6 lg:pr-2 mb-5 lg:mb-0">
                <div className="grid grid-cols-12">
                  <div className="intro-y col-span-12">
                    <div className="intro-y box">
                      <div className="flex justify-between items-center pl-2.5 pr-1 py-1 rounded-t bg-emerald-600 mb-3">
                        <h1 className="text-base font-semibold font-display text-white mr-auto flex items-center">
                          บัญชีเงินฝาก
                        </h1>
                        <button
                        
                          className="btn rounded btn-warning px-1.5 py-1 font-display btn btn-md btn rounded btn-warning px-1.5 py-1 font-display"
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
                            className="feather feather-plus-circle w-3 h-3 w-3 h-3"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={12} y1={8} x2={12} y2={16} />
                            <line x1={8} y1={12} x2={16} y2={12} />
                          </svg>
                          <span className="pl-1">จัดการบัญชี</span>
                        </button>
                      </div>
                      <div className="px-3 pb-3">
                        <div className="py-4 bg-gray-50 rounded text-center text-gray-500 font-display">
                          ไม่มีข้อมูล
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:pl-2">
                <div className="grid grid-cols-12">
                  <div className="intro-y col-span-12">
                    <div className="intro-y box">
                      <div className="flex justify-between items-center pl-2.5 pr-1 py-1 rounded-t bg-red-600 mb-3">
                        <h1 className="text-base font-semibold font-display mr-auto text-white flex items-center">
                          บัญชีถอน
                        </h1>
                        <button
                        
                          className="btn btn-warning rounded px-1.5 py-1 font-display btn btn-md btn btn-warning rounded px-1.5 py-1 font-display"
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
                            className="feather feather-plus-circle w-3 h-3 w-3 h-3"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={12} y1={8} x2={12} y2={16} />
                            <line x1={8} y1={12} x2={16} y2={12} />
                          </svg>
                          <span className="pl-1">จัดการบัญชี</span>
                        </button>
                      </div>
                      <div className="px-3 pb-3">
                        <div className="py-4 bg-gray-50 rounded text-center text-gray-500 font-display">
                          ไม่มีข้อมูล
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankList;
