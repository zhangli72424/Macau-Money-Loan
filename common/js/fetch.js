import http from './http.js'

export default function fetch(url, data, method) {
	return http({
		url,
		data,
		method
	})
}