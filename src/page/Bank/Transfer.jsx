import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Swal from "sweetalert2";
import { bankLabelImage, bankColor, BankName } from "@/util/util";
import {  bankLabel } from '@/Model/Bank';
import { Api } from "@/util/api";
import DropDown from "@/Component/Dropdown";
import Modal from "@/Component/Modal";
import { differenceInCalendarQuarters } from "date-fns";
import { DateTh } from "@/util/util";
import Select from 'react-select'

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const modalReset = {
  size: "modal-xl",
  showbtn: true,
  type: "save",
  title: "เพิ่มบัญชีธนาคาร",
};

function Transfer() {
  const [modalAddBank, setModalAddBank] = useState(false);
  const [configModal, setconfigModal] = useState(modalReset);
  const [isLoading, setIsloading] = useState(true);
  const [accessToken, setaccessToken] = useState("");
  const [checkLoading, setcheckLoading] = useState(false);
  const [reData, setresData] = useState([]);
  const [reDataList, setresDatalist] = useState([]);

  const navigate = useNavigate();
  const [loadComponent, setComponent] = useState(null);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [transactionResult, settransactionResult] = useState([]);

  const [pageState, setPageState] = useState(1);

  const [valUpdate, setvalUpdate] = useState({});

  const [selectMenu, isetSelectMenu] = useState({
    key: 0,
    title: "",
  });

  

  useEffect(() => {
    if (loggedInUser) {
      setaccessToken(JSON.parse(loggedInUser).accessToken);
      setIsloading(false);
      fetchdata();
    } else {
      navigate("/");
    }
  }, []);

  const fetchdata = async () => {
    setIsloading(true);
    let res = await Api("POST", "/listTransfer", {});
    setresData(res.data);

    let reswe = await Api("GET", "/bankservice", {});
    let onres = reswe.data.filter(
      (x) => x.isDelete === 0
    );

    let defultres = await Promise.all(
      onres.map((x) => {
        return {
          key: x.id,
          title: `${x.accountNo} ${x.accountName}`,
          data: x,
        };
      })
    );

    setresDatalist(defultres);

    isetSelectMenu(defultres[0])

    console.log(selectMenu);

    setIsloading(false);
  };

  const options = Object.entries(bankLabel).map(([value, label]) => ({
      value,
      label,
  }));

  const [selectAddUser, setselectAddUser] = useState(options[0].value)

  const setSelectMenu = (item) => {
    
    isetSelectMenu(item);
    console.log(`selectMenu`,selectMenu)
  };
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(100);
  const [remark, setremark] = useState('');

  const checkBank = async () => {
    console.log(selectAddUser)

    let check =await Api("POST", "https://bankbein.bizboo.com/checkbank", {
      bankCode: selectAddUser,
      accountNumber: accountNumber
    });
    console.log(`check.data =>`,check)
    if(check !== null){
      ConfirmTransfer(check)
    }
    
  }

  const renderStatus = (st) => {
    if(st === 1){
      return <span className="text-green-800 bg-lime-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
      {/**/} สำเร็จ
    </span>
    }
    else if(st === 0){
      return <span className="text-red-800 bg-red-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
      {/**/} กำลังตรวจสอบ
    </span>
    }
    else if(st === 4){
      return <span className="text-red-800 bg-red-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
      {/**/} กำลังโอน
    </span>
    }
    else if(st === 3){
      return <span className="text-red-800 bg-red-300 px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center">
      {/**/} ไม่สามารถทำรายการได้
    </span>
    }
  } 


  const ConfirmTransfer = async (check) => {
    
    let dataFind = selectMenu.data;
    Swal.fire({
      title: `ยืนยันการโอนเงิน `,
      html: `<hr className="h-px my-3 bg-gray-200 border-0 ">
<div className="flex justify-center items-center text-gray-700 mt-3"><div className="flex rounded px-10"><div className="p-0.5 lex-shrink-0 flex justify-center items-center shadow w-16 h-16 rounded-lg" style="background-color: ${bankColor[dataFind?.bankName?.toUpperCase()]};
width: 40px;
margin: auto;
margin-top: 10px;
margin-bottom: 10px;
">
<img className="w-16 h-16 rounded-lg object-contain img-icon" src="${bankLabelImage[dataFind?.bankName.toUpperCase()]}" alt="" >
</div>
<div className="pl-5"><div className="text-left font-semibold">${dataFind?.bankName}</div><div className="text-left">${dataFind?.accountName}</div><div className="text-left">${dataFind?.accountNo}</div>

ไปยัง บัญชี ${selectAddUser} ${accountNumber} ${check?.fullname}

<div className="text-left">จำนวนเงิน ${amount} บาท</div>

</div></div></div>
<hr className="h-px my-3 bg-gray-200 border-0 ">`,
      icon: "warning",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed === true) {


        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        let body =  {
          'type':'transfer',
          'status':0,
          'bankName':selectAddUser,
          'accountName':check?.fullname,
          'accountNumber':accountNumber,
          'amount':Number(amount),
          'remark':remark,
          'approveBy':loggedInUser?.userData?.id,
          'bankserviceId':dataFind.id
        }
        Api("POST", "/createTransfer",{
          ...body,
          logsBody:body
        }).then(eres => {
          if(eres.status === 'success'){
            Swal.fire("สถานะการบันทึก", "สร้างรายการสำเร็จรอโอน", "success")
          }
          else{
            Swal.fire("สถานะการบันทึก", "ไม่สามารถสร้างรายการได้", "warning")
          }

          fetchdata();
        });
      }
    });
  }


  const reModal = (e) => {
    setModalAddBank(e);
    setComponent(null);
    setconfigModal(modalReset);
  };

  const Update = (e = null) => {
    console.log(e);
    let _valUpdate = e || valUpdate;

    const titleType = [
      { name: "updatebank", title: "ยืนยันการแก้ไขบัญชี" },
      { name: "addbank", title: "ยืนยันการเพิ่มบัญชี" },
    ];

    const findtitle = titleType.find((x) => x.name === _valUpdate?.type);

    if (findtitle?.title === undefined) {
      Swal.fire("สถานะการบันทึก", "ไม่พบรายการบันทึกข้อมูล", "warning").then(
        (x) => {
          reModal(false);
        }
      );
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
        if (_valUpdate?.type === "updatebank") {
          console.log(e);
          Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then((x) => {
            reModal(false);
          });
        } else if (_valUpdate?.type === "addbank") {
          // console.log(`adbank`,e);
          // console.log(`_valUpdate`,_valUpdate);
          let res = await Api("POST", "/bankserviceCreate", {
            deviceId: _valUpdate.respone.deviceiD,
            pin: _valUpdate.respone.pinnumber,
            accountName: "-",
            phonenumber: "-",
            accountNo: _valUpdate.respone.accountNumber,
            accountType: _valUpdate.respone.typeBank,
            status: 0,
            bankName: "scb",
          });

          if (res.data) {
            Swal.fire("สถานะการบันทึก", "ทำรายการสำเร็จ", "success").then(
              (x) => {
                reModal(false);
              }
            );
          }
        } else {
          // console.log(_valUpdate)
          Swal.fire(
            "สถานะการบันทึก",
            `ทำรายการสำเร็จ ${_valUpdate?.type}`,
            "warning"
          ).then((x) => {
            reModal(false);
          });
        }
      }
    });
  };

  const UpdateBank = (e) => {
    console.log("UpdateBank", e);
    setvalUpdate(e);
  };

  const UpdateOther = (e) => {
    console.log("UpdateOther", e);
    setvalUpdate(e);

    Update(e);
  };

  const ShowModal = (text = "", child = null, config = {}) => {
    setconfigModal({ ...configModal, title: text, ...config });
    setModalAddBank(true);
    setComponent(child);
  };

  const TransferAuto = (listitem = null) => {
    let onDisplay = "";
    console.log(listitem);

    return <></>;
  };

  const updateBankservice = async (id, e, type = "deposit") => {
    let tragetValue = e.target.checked === false ? 0 : 1;
    let res = await Api("POST", "/bankserviceUpdate", {
      id: id,
      status: tragetValue,
      type: type,
    });
    console.log(res.data);
  };

  return (
    <div className="py-2">
      <Modal
        show={modalAddBank}
        res={reModal}
        update={Update}
        child={loadComponent}
        config={configModal}
      />

      <div>
        <div className="grid grid-cols-12 mt-5">
          <div className="col-span-12 sm:col-span-12">
            <div className="box px-5 pb-5">
              <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
                <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
                  โอนมือ/โยกเงิน
                </h2>
                <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <div className="flex gap-2">
                    <a
                      href="/transfer-list"
                      className="inline-flex align-middle items-center btn bg-blue-500 text-white py-1 px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="mr-1 iconify iconify--gg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1M4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm2 5h2v2H6zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-3 4H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-2 3H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                          clipRule="evenodd"
                        />
                      </svg>{" "}
                      ประวัติการโอน
                    </a>
                    <a
                      href="/bank"
                      className="inline-flex align-middle items-center btn bg-gray-700 text-white py-1 px-2"
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
                        className="feather feather-settings pr-1 pr-1"
                      >
                        <circle cx={12} cy={12} r={3} />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      ตั้งค่าบัญชีธนาคาร
                    </a>
                  </div>
                </div>
              </div>
              <div className="max-w-md mx-auto">
                <div className="font-semibold font-display mb-2">
                  ตัวเลือกโยกเงิน
                </div>
                <div className="flex gap-4 pb-4">
                  <div className="flex flex-col items-center justify-center font-display font-semibold text-sm cursor-pointer min-w-max">
                    <div className="rounded-lg py-2 px-8 mb-2 hover:bg-gradient-to-tr hover:from-primary hover:to-primary/70 bg-gradient-to-tr from-primary to-primary/70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="w-10 h-10 text-white iconify iconify--mdi"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7z"
                        />
                      </svg>
                    </div>{" "}
                    โอนผ่านธนาคาร
                  </div>
                  {/* <div className="flex flex-col items-center justify-center font-display font-semibold text-sm cursor-pointer min-w-max">
                <div className="rounded-lg py-2 px-8 mb-2 hover:bg-gradient-to-tr hover:from-primary hover:to-primary/70 bg-slate-100">
                  <img
                    src="/img/smk88pay-in.62e588a0.svg"
                    className="w-12 h-10"
                    alt=""
                  />
                </div>{" "}
                โยกเงินเข้า SMKPAY
              </div>
              <div className="flex flex-col items-center justify-center font-display font-semibold text-sm cursor-pointer min-w-max">
                <div className="rounded-lg py-2 px-8 mb-2 hover:bg-gradient-to-tr hover:from-primary hover:to-primary/70 bg-slate-100">
                  <img
                    src="/img/smk88pay-out.828c3dc4.svg"
                    className="w-12 h-10"
                    alt=""
                  />
                </div>{" "}
                โยกเงินออก SMKPAY
              </div> */}
                </div>
                <div>
                  <h2 className="font-semibold font-display leading-8">
                    โอนเงินจากบัญชี
                  </h2>
                  <form noValidate="" className="post box p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full">
                        <label
                          htmlFor="bank"
                          className="form-label flex justify-between"
                        >
                          <span>
                            <span className="text-theme-6 text-red-500">
                              *{" "}
                            </span>
                            ธนาคาร
                          </span>
                          <span className="font-normal block">
                            ยอดเงินคงเหลือ: {selectMenu?.data?.balance} THB
                          </span>
                        </label>

                        <Menu as="div" className={`relative block text-left`}>
                          <div>
                            <MenuButton
                              className={`dropdown-toggle h-10 overflow-hidden image-fit flex items-center justify-start hover:bg-primary hover:text-white border border-primary p-2 rounded font-medium text-sm shadow-md w-full `}
                            >
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400 mr-1"
                                aria-hidden="true"
                              />
                              {selectMenu?.title}
                            </MenuButton>
                          </div>

                          <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <MenuItems
                              className="absolute right-0 z-50 mt-2 w-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm  "
                              data-popper-placement="bottom-end"
                              style={{
                                zIndex: 9999,
                                position: "absolute",
                                inset: "0px 0px auto auto",
                                margin: 0,
                                // transform: "translate3d(0px, 32px, 0px)",
                              }}
                            >
                              <div className="p-2 border-b border-gray-200 dark:border-dark-3">
                                <div className="font-bold text-sm ">
                                  {selectMenu?.title}
                                </div>
                              </div>
                              <div className="py-1" >
                                {reDataList.map((item, index) => {
                                  return (
                                    <MenuItem
                                      
                                      onClick={(value) => setSelectMenu(item)}
                                      key={`dropsdownList_${index}`}
                                    >
                                      {({ focus }) => (
                                        <button
                                          type="button"
                                          
                                          className={classNames(
                                            focus
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block w-full px-4 py-2 text-left text-sm border-b border-gray-200 dark:border-dark-3"
                                          )}
                                        >

                                          <div className="flex">
                                          <div
                                            className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7 mr-3"
                                            style={{
                                              backgroundColor:
                                                bankColor[
                                                  item.data.bankName.toUpperCase()
                                                ],
                                            }}
                                          >
                                            <div className="col">
                                            <img
                                              className="rounded w-7 h-7 object-contain"
                                              src={
                                                bankLabelImage[
                                                  item.data.bankName.toUpperCase()
                                                ]
                                              }
                                              alt={item.data.bankName}
                                            />
                                            </div>

                                              
                                          </div>
                                          <div className="mt-1">
                                          {item?.title}
                                          </div>
                                          </div>
                                        </button>
                                      )}
                                    </MenuItem>
                                  );
                                })}
                              </div>
                            </MenuItems>
                          </Transition>
                        </Menu>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary btn btn-md btn btn-primary"
                        style={{ display: "none" }}
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
                          className="feather feather-play mr-1 mr-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="pl-1">เริ่มโอน</span>
                      </button>
                    </div>
                  </form>
                  {/**/}
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">{/**/}</div>
                  <div className="col-span-12">
                    <h2 className="font-semibold font-display leading-8">
                      โอนเงินไปยังบัญชี
                    </h2>
                    <div className="post box h-auto rounded-t-lg">
                      <div className="grid lg:flex lg:flex-wrap grid-cols-12 nav nav-tabs flex-col sm:flex-row dark:bg-dark-2 p-4">
                        <div className="flex gap-4">
                        
                          <div className="flex flex-col items-center justify-center font-display font-semibold cursor-pointer min-w-max" style={{ display:"none" }}>
                            <div className="bg-slate-100 rounded-lg py-2 px-8 mb-2 hover:bg-gradient-to-tr hover:from-primary hover:to-primary/70">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="w-10 h-10 iconify iconify--fluent"
                                width="1em"
                                height="1em"
                                viewBox="0 0 28 28"
                              >
                                <path
                                  fill="currentColor"
                                  d="M3 19v.715C3 23.434 7.211 26 13 26q.51-.001 1.003-.029L14 25.94v-1.472q-.489.031-1 .032c-5.111 0-8.5-2.111-8.5-4.785V19l.007-.145A1.5 1.5 0 0 1 6 17.5h10.19l1.761-1.5H6a3 3 0 0 0-3 3m10-5a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-10.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9m6.61 12.406a1.376 1.376 0 0 1 1.781 0l4.125 3.506c.307.261.484.644.484 1.048v5.483c0 .584-.474 1.058-1.058 1.058h-1.385a1.06 1.06 0 0 1-1.058-1.058v-3.096a.846.846 0 0 0-.842-.846h-2.315a.845.845 0 0 0-.842.846v3.096c0 .584-.474 1.058-1.058 1.058h-1.385a1.06 1.06 0 0 1-1.058-1.058V20.46c0-.403.177-.786.484-1.048l4.125-3.506z"
                                />
                              </svg>
                            </div>{" "}
                            ธนาคารลูกค้า
                          </div>
                          <div className="flex flex-col items-center justify-center font-display font-semibold cursor-pointer min-w-max">
                            <div className="bg-slate-100 rounded-lg py-2 px-8 mb-2 hover:bg-gradient-to-tr hover:from-primary hover:to-primary/70 bg-gradient-to-tr from-primary to-primary/70 text-gray-800">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="w-10 h-10 text-white iconify iconify--tabler"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <path d="M9 21v-6a2 2 0 0 1 2-2h1.6" />
                                  <path d="m20 11l-8-8l-9 9h2v7a2 2 0 0 0 2 2h4.159M16 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V16m0 4v1.5m3.032-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75" />
                                </g>
                              </svg>
                            </div>{" "}
                            กำหนดเอง
                          </div>
                          {/**/}
                        </div>
                      </div>
                      <div className="post__content tab-content">
                        <div
                          id="content"
                          className="tab-pane p-5 active"
                          role="tabpanel"
                          aria-labelledby="content-tab"
                        >
                          <div className="intro-y">
                            <form noValidate="">
                              <div className="mb-5">
                                <label htmlFor="bank" className="form-label">
                                  <span className="text-red-600">* </span>ธนาคาร
                                </label>
                                <div className="w-full mt-1" id="bank">
                                
                                  <div
                                    className="relative mt-1"
                                    data-headlessui-state=""
                                    value="[object Object]"
                                  >
                                    <div className="relative">
                                      <div className="relative">
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={options[0]}
                                            // value={selectAddUser}
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
                                    {/**/}
                                  </div>
                                </div>
                              </div>

                              <div className="mb-2">
                                <label htmlFor="bank" className="form-label">
                                  <span className="text-red-600">* </span>หมายเหตุ
                                </label>
                                <div className="w-full mt-1" id="bank">
                                
                                  <div
                                    className="relative mt-1"
                                    data-headlessui-state=""
                                    value="[object Object]"
                                  >
                                    <div className="relative">
                                      <div className="relative">
                                      <input
                                      className="z-0 !rounded w-full !px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded w-full "
                                      name="remark"
                                      placeholder="หมายเหตุ"
                                      defaultValue={remark}
                                      type="text"
                                      onChange={(e) => setremark(e.target.value)}
                                    />  
                                      
                                    </div>
                                    {/**/}
                                  </div>
                                </div>
                              </div>
                              </div>

                              <div className="flex items-center">

                              <div className="py-1 w-full mr-1">
                                  <div className="flex justify-between">
                                    <label
                                      htmlFor="input-state-3"
                                      className="form-label flex items-center"
                                    >
                                      <span className="text-danger">*</span>
                                      <span className="!pl-1">จำนวนเงิน</span>
                                      {/**/}
                                    </label>
                                    {/**/}
                                  </div>
                                  <div className="input-group">
                                    {/**/}
                                    <input
                                      className="z-0 !rounded w-full !border-danger px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded w-full !border-danger"
                                      name="amount"
                                      placeholder="Amount"
                                      type="number"
                                      defaultValue={amount}
                                      onChange={(e) => setAmount(e.target.value)}
                                    />
                                    {/**/}
                                  </div>
                                  <div className="mb-5 relative">
                                    {/**/}
                                    {/**/}
                                  </div>
                                </div>

                                <div className="py-1 w-full">
                                  <div className="flex justify-between">
                                    <label
                                      htmlFor="input-state-3"
                                      className="form-label flex items-center"
                                    >
                                      <span className="text-danger">*</span>
                                      <span className="!pl-1">เลขที่บัญชี</span>
                                      {/**/}
                                    </label>
                                    {/**/}
                                  </div>
                                  <div className="input-group">
                                    {/**/}
                                    <input
                                      className="z-0 !rounded w-full !border-danger px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded w-full !border-danger"
                                      name="accountNumber"
                                      placeholder="Account Number"
                                      type="text"
                                      maxLength=""
                                      autoComplete="off"
                                      data-mask="###-######-#"
                                      data-mask-inited="true"
                                      data-mask-raw-value=""
                                      onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                    {/**/}
                                  </div>
                                  <div className="mb-5 relative">
                                    {/**/}
                                    {/**/}
                                  </div>
                                </div>
                                <button
                                  disabled=""
                                  className="btn-twitter btn ml-3 h-[38px] min-w-max mt-2 disabled:bg-gray-500 disabled:border-gray-500 btn btn-md btn-twitter btn ml-3 h-[38px] min-w-max mt-2 disabled:bg-gray-500 disabled:border-gray-500 bg-green-600"
                                  type="button"
                                  onClick={() => checkBank()}
                                >
                                  <span className="pl-1">ตรวจสอบ</span>
                                </button>
                              </div>
                              {/**/}
                              {/* <div className="flex items-center justify-center">
                                
                                <button
                                  type="button"
                                  className="btn btn-outline-dark ml-4 btn btn-md btn btn-outline-dark ml-4"
                                >
                                  <span className="pl-1">กลับ</span>
                                </button>
                              </div> */}
                            </form>
                          </div>
                          {/**/}
                          {/**/}
                          {/**/}
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
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-12 sm:col-span-12">
          <div className="box px-5 pb-5">
            <div className="flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary">
              <h2 className="text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold">
                ประวัติการโอน 100 รายการล่าสุด
              </h2>
              <div className="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0" >
              <button
                    className="btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0 btn btn-md btn btn-dark-soft px-2 py-1 border-dark mt-3 sm:mt-0"
                    type="button"
                    onClick={() => fetchdata()}
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
            <div className="overflow-x-auto">
              <table className="text-xs text-left w-full border">
                <thead>
                  <tr className="bg-gray-700 dark:bg-dark-1 text-white px-half font-display">
                    <th className="px-2 py-1 font-medium whitespace-nowrap border text-center">
                      #
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border" >-</th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border text-center">
                      สถานะ
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border text-center">
                      จำนวนเงิน
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border text-center">
                      คิวอาร์โค้ด
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border">
                      ทำรายการโดย
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border">
                      โอนจากบัญชี
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border">
                      โอนเงินไปยังบัญชี
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border text-center">
                      เวลารายการ
                    </th>
                    <th className="px-2 py-1 font-medium whitespace-nowrap border">
                      หมายเหตุ
                    </th>
                  </tr>
                </thead>
                <tbody style={{
                      display: isLoading === false ? "" : "none",
                    }}>
                  {reData?.map((data, index) => {
                    return (
                      <tr
                        className="hover:bg-yellow-100 px-half"
                        key={`_transfer_${index}`}
                      >
                        <td className="px-2 py-1 border text-center w-10">
                          {index + 1}{" "}
                          <span className="text-mobile text-gray-500">
                            #{data.id}
                          </span>
                        </td>
                        <td className="px-2 py-1 border number-display bg-gray-50/50">
                          <div className="flex items-center justify-end gap-3">
                            {/**/}
                            {/**/}
                          </div>
                        </td>
                        <td className="px-2 py-1 border text-center">
                          <div className="flex items-center">

                            {renderStatus(data.status )}
                            
                          </div>
                        </td>
                        <td className="px-2 py-1 border text-right number-display">
                          {data.amount}
                        </td>
                        <td className="px-2 py-1 border text-right number-display relative">
                          {data.qr !== '' ?
                          <>
                          <div className="group rounded-full flex items-center justify-center">
                            <div className="w-20 flex items-center justify-center">
                              <img
                              src={`https://quickchart.io/qr?text=${data.qr}`}
                              alt="qr code"
                              className="w-10 h-10 object-center cursor-pointer"
                            />
                            </div>
                            <div className="hidden group-hover:flex justify-center cursor-pointer absolute top-8 bg-gray-700 text-white rounded px-1 before:content-['⬥'] before:pt-2 before:text-gray-700 before:absolute before:bottom-2 before:left-1/2" onClick={() => window.open(`https://quickchart.io/qr?text=${data.qr}`)}>
                              ดูคิวอาร์โค้ด
                            </div>
                          </div> 
                          
                          <div className="text-center" onClick={() => window.open(`https://qrbank.99xbet.com/?qrid=${data.id}`)}>
                            <div className="inline-flex align-middle items-center btn bg-blue-500 text-white py-1 px-2">
                            ขอ slip
                            </div>
                          </div>
                          </>: <div className="group rounded-full flex items-center justify-center">-</div> }
                        </td>
                        <td className="px-2 py-1 border w-36">
                          <div className="flex items-center gap-1 ml-3 relative">
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
                              className="feather feather-user w-4 h-4 inline w-4 h-4 inline"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                            <span className="bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5">
                              {data.staffname}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1 ml-3 relative"
                            style={{ display: "none" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              className="iconify iconify--fluent"
                            >
                              <path
                                fill="currentColor"
                                d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h6.294l.326-1H6.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3.583a1.42 1.42 0 0 1 1 .016V4.5A1.5 1.5 0 0 0 13.5 3h-3zm-2 9h1.908a1.42 1.42 0 0 0-.408.997v.006H5.31a.81.81 0 0 0-.81.81v.437c0 .69.131 1.456.802 2.069C5.99 16.446 7.34 17 10 17c1.55 0 2.655-.188 3.444-.47a1.4 1.4 0 0 0 .678.419a1.3 1.3 0 0 0-.117.439c-.916.367-2.137.59-3.755.61V18h-.5v-.002c-2.616-.033-4.195-.595-5.122-1.44c-.875-.8-1.089-1.777-1.123-2.556H3.5v-.69c0-.999.81-1.809 1.81-1.809H8.5zm6.378-2.218l.348 1.071a2.2 2.2 0 0 0 1.399 1.397l1.071.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.65-.977a2.2 2.2 0 0 0-.748-.426l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.765a1.58 1.58 0 0 1-.984.998l-.765.248a.303.303 0 0 0-.146.46c.036.05.087.09.146.11l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57zm-6.174-.527l.07.053Z"
                              />
                            </svg>
                            <span className="bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]">
                              {" "}
                              Auto{" "}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1 ml-3 relative mt-1"
                            style={{ display: "none" }}
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
                              className="feather feather-user-check w-4 h-4 inline w-4 h-4 inline"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="8.5" cy={7} r={4} />
                              <polyline points="17 11 19 13 23 9" />
                            </svg>
                            <span className="bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap">
                              {" "}
                              ()
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-1 border-b">
                          <div className="flex items-center text-left pl-1 w-48 relative !w-40">
                            <div
                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                              style={{
                                backgroundColor:
                                  bankColor[
                                    data.bankserviceBankname.toUpperCase()
                                  ],
                              }}
                            >
                              <img
                                className="rounded w-7 h-7 object-contain"
                                src={
                                  bankLabelImage[
                                    data.bankserviceBankname.toUpperCase()
                                  ]
                                }
                                alt={data.bankserviceBankname}
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">
                                {data.accountNo} {/**/}
                              </div>
                              <div>{data.bankserviceaccountName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-1 border number-display">
                          <div className="flex items-center text-left pl-1 w-48 relative !w-40">
                            <div
                              className="p-0.5 lex-shrink-0 flex justify-center items-center shadow rounded w-7 h-7"
                              style={{
                                backgroundColor:
                                  bankColor[data.bankName.toUpperCase()],
                              }}
                            >
                              <img
                                className="rounded w-7 h-7 object-contain"
                                src={
                                  bankLabelImage[data.bankName.toUpperCase()]
                                }
                                alt={data.bankName}
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">
                                {data.accountNumber} {/**/}
                              </div>
                              <div>{data.accountName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-1 border text-center number-display w-36">
                          <div className="w-24">
                            <span className="block">
                              {DateTh(data.updatedAt)}{" "}
                              {/* <span className="pl-1 items-center font-semibold">
                          21:20
                        </span> */}
                            </span>
                            <span className="block text-xs font-light"></span>
                          </div>
                        </td>
                        <td className="px-2 py-1 border number-display w-40">
                          <div className="flex">
                            <div className="w-60 flex flex-col">
                              {/**/}
                              <span className="text-xs text-gray-500">
                                {data.remark}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
