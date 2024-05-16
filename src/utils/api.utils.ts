import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_ENDPOINT: Record<string, string> = {
    DEVELOPMENT: 'https://xpt.suitcoin.ai/',
    PRODUCTION: 'https://xpt.suitcoin.ai/',
}

export const ApiCall = (payload: AxiosRequestConfig): Promise<AxiosResponse> => {
    const _axios = axios.create();
    const environment = import.meta.env.MODE.toUpperCase();
    payload.baseURL = API_ENDPOINT[environment];

    let axiosPayload = {
        url: payload.url || '',
        method: payload.method || 'get',
        baseURL: payload.baseURL || '',
        headers: payload.headers || {},
        params: payload.params || {},
        data: payload.data || {},
    };

    console.log(
        `[${axiosPayload.method.toUpperCase()}] Request for API:`,
        ' ',
        axiosPayload.baseURL + axiosPayload.url,
        ' ',
        payload
    );

    return new Promise(function (resolve, reject) {
        _axios(axiosPayload)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                let errorResponse = error.response?.data || error.message;

                if (typeof errorResponse === 'object' && errorResponse.error) {
                    errorResponse = errorResponse.error;
                }
                errorResponse = errorResponse ?? 'Some error occurred';

                if (errorResponse === 'Invalid Token') {
                    localStorage.clear();
                    window.location.href = window.location.origin;
                }

                reject(error);
            });
    });
};
