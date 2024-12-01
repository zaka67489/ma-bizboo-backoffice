import axios from 'axios';
import Swal from 'sweetalert2'
import { API as endpoint, AGENTAPI } from '../Configs/Configs';
export const Api = async (method = 'post', url = '', data = {}) => {
	const apiCall = axios.create({
		baseURL: endpoint,
		// withCredentials: true,
	});

	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

	apiCall.defaults.headers = {
		'apikey': '99xbetcsrfvalidate',
		"Authorization": `Bearer ${loggedInUser?.accessToken}`,
	}

	try {
		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: url,
			data: data
		};
		let res = await apiCall.request(config);

		if (res.status === 200) {
			return res.data;
		}
		else {
			console.log(res);
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "ผิดพลาด",
				showConfirmButton: false,
				timer: 1500
			});
			return res?.data;
		}
	}
	catch (e) {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "ผิดพลาด",
			html: e.toString(),
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}

export const ApiAgent = async (method = 'post', url = '', data = {}) => {
	const apiCall = axios.create({
		baseURL: AGENTAPI,
		// withCredentials: true,
	});

	apiCall.defaults.headers = {
		"apikey": `developercoconut`,
	}

	try {
		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: url,
			data: data
		};
		let res = await apiCall.request(config);

		if (res.status === 200) {
			return res.data;
		}
		else {
			console.log(res);
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "ผิดพลาด",
				showConfirmButton: false,
				timer: 1500
			});
			return res?.data;
		}
	}
	catch (e) {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "ผิดพลาด",
			html: e.toString(),
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}


export const ApiCall = async (method = 'post', url = '', data = {}) => {
	const apiCall = axios.create({
		baseURL: endpoint,
		// withCredentials: true,
	});

	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

	apiCall.defaults.headers = {
		'apikey': '99xbetcsrfvalidate',
		"Authorization": `Bearer ${loggedInUser?.accessToken}`,
	}

	try {
		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: url,
			data: data
		};
		let res = await apiCall.request(config);
		
		if (res.status === 200 || res.status === 201 || res.status === "success") {
			return res.data;
		}
		else {
			console.log(res);
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "ผิดพลาด",
				showConfirmButton: false,
				timer: 1500
			});
			return res?.data;
		}
	}
	catch (e) {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "ผิดพลาด",
			html: e.toString(),
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}
}