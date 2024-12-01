
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { API } from '../Configs/Configs'

function App() {
    const [isLoading, setIsloading] = useState(true)

    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    useEffect(() => {
        if (!loggedInUser) {
            setIsloading(false)
        } else {
            navigate("/dashboard");
        }
    }, []);

    // const [mobilephone, setMobilephone] = useState("1111111111")
    // const [pin, setPin] = useState("111111")
    const [prefix, setPrefix] = useState("")
    const [mobilephone, setMobilephone] = useState("")
    const [pin, setPin] = useState("")

    const handlePrefixChange = (event) => {
        setPrefix(event.target.value);
    };

    const handleMobilephoneChange = (event) => {
        setMobilephone(event.target.value);
    };

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const loginHandle = async (e) => {
        e.preventDefault();
        // try {
        //     await axios.post(`${API}/staff/login`, { "mobilephone": mobilephone, "pin": pin, "prefix": prefix }).then(res => {
        //         console.log('res:', res.data)
        //         if (res.data.statusCode === 200) {
        //             localStorage.setItem('loggedInUser', JSON.stringify(res.data))
        //             const Toast = Swal.mixin({
        //                 toast: true,
        //                 position: "top-end",
        //                 showConfirmButton: false,
        //                 timer: 3000,
        //                 timerProgressBar: true,
        //                 didOpen: (toast) => {
        //                     toast.onmouseenter = Swal.stopTimer;
        //                     toast.onmouseleave = Swal.resumeTimer;
        //                 }
        //             });
        //             Toast.fire({
        //                 icon: "success",
        //                 title: "Signed in successfully"
        //             });
        //             navigate("/dashboard")
        //         } else {
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "error",
        //                 title: "ผิดพลาด",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //         }

        //     })
        // } catch (error) {
        //     console.log(error)
        //     console.log(error.response.data.details)
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "ผิดพลาด",
        //         text: error.response.data.details,
        //         showConfirmButton: false,
        //         timer: 1500
        //     });

        // }
        console.log('2')
    }

    if (!isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
    <div className="container">
        {/* Centering the logo */}
        <div className="flex justify-center my-8">
            <img src="/img/logo.png" width={350} alt="Bizboo Master Manager Logo"/>
        </div>

        <div className="bg-white dark:bg-dark-1 px-5 sm:px-8 py-8 rounded-md shadow-md xl:shadow-none w-full">
            <h2 className="font-bold text-2xl xl:text-3xl text-center xl:text-left font-display">
                เข้าสู่ระบบ Bizboo Master Manager
            </h2>
            <form className="mt-8" onSubmit={loginHandle}>

                {/* Input for Username */}
                <div className="py-1">
                    <label htmlFor="mobilephone" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <div className="input-group">
                        <input
                            className="rounded py-3 text-center px-4 form-control border-gray-300 block focus:outline-none w-full"
                            name="Username"
                            placeholder="Username"
                            type="text"
                            autoComplete="off"
                            value={mobilephone}
                            onChange={handleMobilephoneChange}
                            required
                        />
                    </div>
                </div>

                {/* Input for Password */}
                <div className="py-1">
                    <label htmlFor="pin" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            className="rounded py-3 text-center px-4 form-control border-gray-300 block focus:outline-none w-full"
                            name="Password"
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={pin}
                            onChange={handlePinChange}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-2 text-center">
                    <button
                        type="submit"
                        className="btn btn-primary btn-elevated py-3 px-4 w-full font-display"
                        style={{ color: 'white' }}
                    >
                        เข้าสู่ระบบ
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

        )

    // return (
    //     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
    //         <div className="container max-w-md mx-auto">
    //             <div className="bg-white px-8 py-10 rounded-2xl shadow-2xl w-full">
    //                 <h2 className="font-bold text-4xl text-center text-pink-700 font-display tracking-wide">
    //                     เข้าสู่ระบบ
    //                 </h2>
    //                 <p className="text-center text-gray-600 mt-4 mb-8">
    //                     ยินดีต้อนรับกลับ! กรอกข้อมูลเพื่อเข้าสู่ระบบ
    //                 </p>
    //                 <form noValidate className="space-y-6" onSubmit={loginHandle}>

    //                     {/* Input for Prefix */}
    //                     <div className="py-1">
    //                         <label htmlFor="prefix" className="block text-pink-700 text-lg font-semibold mb-2">
    //                             รหัสประเทศ (Prefix)
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-full py-3 text-center px-6 form-control border-gray-300 block focus:ring-pink-500 focus:border-pink-500 w-full text-pink-900 bg-pink-100"
    //                                 name="prefix"
    //                                 placeholder="รหัสประเทศ"
    //                                 type="text"
    //                                 autoComplete="off"
    //                                 value={prefix}
    //                                 disabled
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Input for Mobilephone */}
    //                     <div className="py-1">
    //                         <label htmlFor="mobilephone" className="block text-pink-700 text-lg font-semibold mb-2">
    //                             เบอร์โทรศัพท์มือถือ
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-full py-3 text-center px-6 form-control border-gray-300 block focus:ring-pink-500 focus:border-pink-500 w-full text-pink-900 bg-pink-100"
    //                                 name="mobilephone"
    //                                 placeholder="เบอร์โทรศัพท์"
    //                                 type="text"
    //                                 autoComplete="off"
    //                                 value={mobilephone}
    //                                 onChange={handleMobilephoneChange}
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Input for PIN */}
    //                     <div className="py-1">
    //                         <label htmlFor="pin" className="block text-pink-700 text-lg font-semibold mb-2">
    //                             รหัส PIN
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-full py-3 text-center px-6 form-control border-gray-300 block focus:ring-pink-500 focus:border-pink-500 w-full text-pink-900 bg-pink-100"
    //                                 name="pin"
    //                                 placeholder="รหัส PIN"
    //                                 type="password"
    //                                 autoComplete="off"
    //                                 value={pin}
    //                                 onChange={handlePinChange}
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Submit Button */}
    //                     <div className="mt-8">
    //                         <button
    //                             type="submit"
    //                             className="w-full py-3 px-6 rounded-full bg-pink-700 hover:bg-pink-800 text-white font-bold text-xl shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
    //                         >
    //                             เข้าสู่ระบบ
    //                         </button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // )

    // return (
    //     // <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
    //     <div className="flex justify-center items-center h-screen">
    //         <div className="container max-w-md mx-auto">
    //             <div className="bg-white dark:bg-gray-800 px-5 sm:px-8 py-10 rounded-lg shadow-lg w-full">
    //                 <h2 className="font-bold text-3xl text-center text-gray-900 dark:text-white font-display">
    //                     เข้าสู่ระบบ
    //                 </h2>
    //                 <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
    //                     ยินดีต้อนรับ! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
    //                 </p>
    //                 <form noValidate className="space-y-6" onSubmit={loginHandle}>

    //                     {/* Input for Prefix */}
    //                     <div className="py-1">
    //                         <label htmlFor="prefix" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
    //                             รหัสประเทศ (Prefix)
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-lg py-3 text-center px-4 form-control border-gray-300 dark:border-gray-600 block focus:ring-blue-500 focus:border-blue-500 w-full text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
    //                                 name="prefix"
    //                                 placeholder="รหัสประเทศ"
    //                                 type="text"
    //                                 autoComplete="off"
    //                                 value={prefix}
    //                                 disabled
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Input for Mobilephone */}
    //                     <div className="py-1">
    //                         <label htmlFor="mobilephone" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
    //                             เบอร์โทรศัพท์มือถือ
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-lg py-3 text-center px-4 form-control border-gray-300 dark:border-gray-600 block focus:ring-blue-500 focus:border-blue-500 w-full text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
    //                                 name="mobilephone"
    //                                 placeholder="เบอร์โทรศัพท์"
    //                                 type="text"
    //                                 autoComplete="off"
    //                                 value={mobilephone}
    //                                 onChange={handleMobilephoneChange}
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Input for PIN */}
    //                     <div className="py-1">
    //                         <label htmlFor="pin" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
    //                             รหัส PIN
    //                         </label>
    //                         <div className="input-group">
    //                             <input
    //                                 className="rounded-lg py-3 text-center px-4 form-control border-gray-300 dark:border-gray-600 block focus:ring-blue-500 focus:border-blue-500 w-full text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
    //                                 name="pin"
    //                                 placeholder="รหัส PIN"
    //                                 type="password"
    //                                 autoComplete="off"
    //                                 value={pin}
    //                                 onChange={handlePinChange}
    //                             />
    //                         </div>
    //                     </div>

    //                     {/* Submit Button */}
    //                     <div className="mt-4">
    //                         <button
    //                             type="submit"
    //                             className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md focus:ring-4 focus:ring-blue-500 transition ease-in-out duration-300"
    //                         >
    //                             เข้าสู่ระบบ
    //                         </button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // )

}

export default App
