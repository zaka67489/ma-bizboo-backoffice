import { useNavigate } from "react-router-dom";
import { useEffect, useState ,Fragment,useRef,useCallback } from 'react';
import {Api} from '@/util/api';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Minput(props = {required:'*'}){

  const [inputget, setinput] = useState("")
  const inputHandle = (e) => {
    setinput(`${e.target.value}`)
    props.callback(`${e.target.value}`)
  }
  const [msgerror,setmsgerror] = useState("")
  //demo <Minput callback={cacallback} required="*" label="วัน/เวลาโอน" type="datetime" error="" disabled="" /> <Minput callback={cacallback} required="*" label="หมายเหตุ" placeholder="หมายเหตุ" type="text" error="" disabled=""/>
  return(<div className="col-span-12">
        <div className="py-1" placeholder={props?.label}>
          <div className="flex justify-between">
            <label htmlFor="input-state-3" className="form-label">
              <span id="input-state-3" className="text-red-600">
                {props?.required}{" "}
              </span>{" "}
              {props?.label}
            </label>
          </div>
         
          {
            {
              "":<></>,
              "text":<><div className="input-group">
                          <input
                            className="z-0 !rounded px-4 intro-x- login__input form-control border-gray-300 block focus:outline-none z-0 z-0 !rounded"
                            placeholder={props?.placeholder}
                            type="text"
                            maxLength=""
                            autoComplete="off"
                            value={inputget}
                            onChange={inputHandle}
                            required
                            disabled={props.disabled ?? false}
                          />
                        </div>
                  </>,
               "number":<><div className="input-group">
                          <input
                            autoComplete="off"
                            className="border-gray-300 intro-x- form-control border block focus:outline-none z-0"
                            placeholder={props?.placeholder}
                            type="number"
                            inputMode="decimal"
                            min="0"
                            value={inputget}
                            onChange={inputHandle}
                            disabled={props.disabled ?? false}
                            required
                          />
                        </div>
                  </>,
              "datetime": <><div
                        className="dp__main dp__theme_light text-xs"
                        mode="dateTime"
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
                                name="transferAt"
                                autoComplete="off"
                                type="datetime-local"
                                onChange={inputHandle}
                                value={inputget}
                                disabled={props.disabled ?? false}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div></>
            }[props.type]
          }

          <div className="mt-1 mb-5 relative- text-red-600">{msgerror}</div>

        </div>
      </div>)
}