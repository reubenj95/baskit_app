interface AscDescProps {
  icon: string
  handleChange: () => void
}
function AscDesc(Props: AscDescProps) {
  return (
    <label htmlFor="ascdesc">
      <input
        type="checkbox"
        name="ascdesc"
        id="ascdesc"
        onChange={Props.handleChange}
      />
      <i className={`fa-solid ${Props.icon}`} />
    </label>
  )
}
export default AscDesc
