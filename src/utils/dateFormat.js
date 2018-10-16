function dateFormat(date) {
  const _date = new Date(date)
  const y = _date.getFullYear()
  const m = _date.getMonth() + 1
  const d = _date.getDay()
  const h = _date.getHours()
  const mm = _date.getMinutes()
  const s = _date.getSeconds()
  return `${y}-${m}-${d} ${h}:${mm}:${s}`
}
export default dateFormat
