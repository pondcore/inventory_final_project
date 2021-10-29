import axios from 'axios';

async function getProvince() {
    const provinces = await axios({
        method: 'get',
        url: `/v1/thailand/provinces`,
        baseURL: 'https://thaiaddressapi-thaikub.herokuapp.com/'
    });
    return provinces;
}


async function getDistrict(provinceName) {
    return await axios({
        method: 'get',
        url: `/v1/thailand/provinces/${provinceName}/district`,
        baseURL: 'https://thaiaddressapi-thaikub.herokuapp.com/'
    });
}

async function getSubdistrict(provinceName, districtName) {
    return await axios({
        method: 'get',
        url: `/v1/thailand/provinces/${provinceName}/district`,
        baseURL: 'https://thaiaddressapi-thaikub.herokuapp.com/'
    });
}

const addressApi = { getProvince, getDistrict, getSubdistrict };

export default addressApi;
