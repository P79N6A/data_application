import city from './geographic/city.json';
import province from './geographic/province.json';

function getProvince(req, res) {
  return res.json(province);
}

function getCity(req, res) {
  return res.json(city[req.params.province]);
}

export default {
  'GET /mock/geographic/province': getProvince,
  'GET /mock/geographic/city/:province': getCity,
};
