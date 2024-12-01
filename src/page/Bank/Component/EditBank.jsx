// edit
import { useNavigate } from "react-router-dom";
import {
    useEffect,
    useState,
    Fragment,
    useRef,
    useCallback,
    forwardRef,
  } from "react";
import {Api} from '@/util/api';
import axios from 'axios';
import DropDown from "@/Component/Dropdown";

const EditTable = forwardRef((props, ref) => {
    const dataFind = props.reData.find((x) => x.id === props.id);
    console.log(`dataFind`,dataFind);
    const [checkedUpdate, setcheckedUpdate] = useState(dataFind.status);
    const [amountToday, setAmountoday] = useState(dataFind.transferMax);
    const [remark, setremark] = useState(dataFind.prefix);
    const [accountType, setaccountType] = useState(dataFind.accountType);

    const updateProps = () => {
      console.log('accountType',accountType)
      props.callback({
        type:'updatebank',
        amountToday:amountToday,
        checkedUpdate:checkedUpdate,
        title:`${dataFind.accountNo} ${dataFind.accountName}`,
        remark:remark,
        accountType:accountType,
        respone:{
          id:dataFind.id,
          status:checkedUpdate,
          transferMax:amountToday,
          accountType:accountType
        }
     })
    }

    const Acctype = [
      {key:"BOTH",title:"ทั้งฝากและถอน"},
      {key:"DEPOSIT",title:"บัญชีฝาก"},
      {key:"WITHDRAW",title:"บัญชีถอน"}
    ]

    const callbackSet = (e) => {
      // console.log('e',e);
      let finSet = Acctype.find(x => x.title === e.title);
      // console.log(`finSet.key`,finSet.key)
      setaccountType(finSet.key)
    }

    useEffect(() => {
      updateProps()
    },[amountToday,checkedUpdate,accountType])

    return (
      <div>
        <div className="flex flex-col mb-3">
          <div className="form-check form-switch">
            <input
              id="active-edit-modal"
              className="form-check-input"
              type="checkbox"
              defaultChecked={checkedUpdate}
              onChange={() => setcheckedUpdate(!checkedUpdate)}
            />
            <label htmlFor="active-edit-modal" className="form-check-label">
              เปิดใช้
            </label>
          </div>
        </div>
        <div className="grid grid-cols-12">
     
          <div className="col-span-12 sm:col-span-6 sm:pr-4">
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
                  className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                  name="accountName"
                  placeholder="Account Name"
                  type="text"
                  defaultValue={dataFind.accountName}
                  maxLength=""
                  autoComplete="off"
                  data-mask="G*"
                  data-mask-inited="true"
                  data-mask-raw-value="น.ส. เปียว พึ่งขุนทด"
                  readOnly
                />
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 sm:pr-4">
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
                  className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                  name="accountNumber"
                  placeholder="Account Name"
                  defaultValue={dataFind.accountNo}
                  disabled=""
                  type="text"
                  maxLength=""
                  autoComplete="off"
                  data-mask="###-######-#"
                  data-mask-inited="true"
                  data-mask-raw-value={dataFind.accountNo}
                  readOnly
                />
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 sm:pr-4" style={{display:'none'}}>
            <div className="py-1 w-full">
              <div className="flex justify-between">
                <label
                  htmlFor="input-state-3"
                  className="form-label flex items-center"
                >
                  <span className="!pl-1">หมายเหตุ</span>
                </label>
              </div>
              <div className="input-group">
                <input
                  className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                  name="notes"
                  placeholder="หมายเหตุ / Notes"
                  type="text"
                  maxLength=""
                  autoComplete="off"
                  data-mask="G*"
                  data-mask-inited="true"
                  data-mask-raw-value=""
                  defaultValue={remark}
                  onChange={(e) => setremark(e.target.value)}
                />
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 sm:pr-4">
            <div className="py-1">
              <div className="flex justify-between">
                <label className="form-label flex items-center">
                  <span> ยอดเงิน</span>
                </label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  autoComplete="off"
                  disabled=""
                  className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                  name="balance"
                  defaultValue={dataFind.balance}
                  inputMode="decimal"
                  readOnly
                />
                <div className="input-group-text uppercase whitespace-nowrap">
                  THB
                </div>
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
        </div>
        <div className="border-t pb-2">
          <div className="col-span-12 sm:col-span-6 sm:pr-4">
            <div className="py-1">
              <div className="flex justify-between">
                <label className="form-label flex items-center">
                  <span> วงเงินทำรายการต่อวัน</span>
                </label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  autoComplete="off"
                  className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                  name="withdrawLimit"
                  inputMode="decimal"
                  defaultValue={amountToday}
                  onChange={(e) => setAmountoday(e.target.value)}
                />
                <div className="input-group-text uppercase whitespace-nowrap">
                  THB
                </div>
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
        </div>

        <div className="border-t pb-2">
          <div className="col-span-12 sm:col-span-6 sm:pr-4">
            <div className="py-1">
              <div className="flex justify-between">
                <label className="form-label flex items-center">
                  <span> ตั้งค่าประเภทบัญชี </span>
                </label>
              </div>
              <div className="input-group">
              <DropDown text={Acctype.find(x => x.key === accountType).title} subtext="เลือกบัญชี" className="w-full" data={[
                    {key:"BOTH",title:"ทั้งฝากและถอน"},
                    {key:"DEPOSIT",title:"บัญชีฝาก"},
                    {key:"WITHDRAW",title:"บัญชีถอน"}
                  ]} callback={callbackSet} />
              </div>
              <div className="mb-5 relative"></div>
            </div>
          </div>
        </div>

      </div>
    );
});

export default EditTable;